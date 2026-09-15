# Genera la geografía del mapa: proyección LAEA de Europa,
# simplificación Douglas-Peucker y "lupa" suave sobre Iberia.
import json, math, sys

SCRATCH = "."  # ejecutar desde tools/mapa

# ---------- proyección Lambert azimutal equal-area (como los mapas europeos) ----------
LON0, LAT0 = math.radians(9.0), math.radians(51.0)
def laea(lon, lat):
    lon, lat = math.radians(lon), math.radians(lat)
    dl = lon - LON0
    denom = 1 + math.sin(LAT0)*math.sin(lat) + math.cos(LAT0)*math.cos(lat)*math.cos(dl)
    if denom <= 1e-9: return None
    k = math.sqrt(2.0/denom)
    x = k*math.cos(lat)*math.sin(dl)
    y = k*(math.cos(LAT0)*math.sin(lat) - math.sin(LAT0)*math.cos(lat)*math.cos(dl))
    return (x, -y)   # y hacia abajo

# ---------- ajuste al lienzo ----------
# calibra con extremos de interés
refs_fit = [(-24,66.6),(-10,36),(45,36),(31,71),(-25,63),(42,42)]
pts = [laea(*p) for p in refs_fit]
# lo decidimos con dos anclas verticales: Norte de Noruega (lat 71) y Gibraltar (36)
top = laea(20, 71)[1]; bot = laea(-5.5, 36)[1]
H_MAP = 970.0                      # alto útil dentro del lienzo 1024
S = H_MAP/(bot - top)
OY = 30 - top*S
# centra horizontalmente el meridiano central un pelín a la derecha (deja Atlántico para decorar)
OX = 800.0

def px(lon, lat):
    p = laea(lon, lat)
    return (p[0]*S + OX, p[1]*S + OY)

# ---------- lupa suave sobre Iberia ----------
BUMP_ON = True
bc = px(-3.7, 40.0)                # centro del bump (Madrid-ish)
BA, BR = 0.16, 300.0               # amplitud y radio
def bump(p):
    if not BUMP_ON: return p
    dx, dy = p[0]-bc[0], p[1]-bc[1]
    d2 = dx*dx+dy*dy
    s = 1 + BA*math.exp(-d2/(BR*BR))
    return (bc[0]+dx*s, bc[1]+dy*s)

def project(lon, lat):
    return bump(px(lon, lat))

# ---------- Douglas-Peucker ----------
def dp(points, eps):
    if len(points) < 3: return points
    keep = [False]*len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points)-1)]
    while stack:
        a, b = stack.pop()
        ax, ay = points[a]; bx, by = points[b]
        dx, dy = bx-ax, by-ay
        L2 = dx*dx+dy*dy
        dmax, imax = -1, -1
        for i in range(a+1, b):
            p = points[i]
            if L2 == 0: d = math.hypot(p[0]-ax, p[1]-ay)
            else:
                t = max(0, min(1, ((p[0]-ax)*dx+(p[1]-ay)*dy)/L2))
                d = math.hypot(p[0]-(ax+t*dx), p[1]-(ay+t*dy))
            if d > dmax: dmax, imax = d, i
        if dmax > eps:
            keep[imax] = True
            stack.append((a, imax)); stack.append((imax, b))
    return [p for p, k in zip(points, keep) if k]

# ---------- recorte burdo al viewport ampliado ----------
VB = (-700, -700, 2236, 1724)
def inside(p): return VB[0] <= p[0] <= VB[2] and VB[1] <= p[1] <= VB[3]

def clip_ring(ring):
    # conserva puntos dentro (con vecinos), une huecos con rectas (quedan fuera del clip visual)
    if not any(inside(p) for p in ring): return None
    out = []
    n = len(ring)
    for i, p in enumerate(ring):
        if inside(p) or inside(ring[(i-1) % n]) or inside(ring[(i+1) % n]):
            out.append(p)
    return out if len(out) >= 3 else None

def ring_area(r):
    s = 0
    for i in range(len(r)):
        x1, y1 = r[i]; x2, y2 = r[(i+1) % len(r)]
        s += x1*y2 - x2*y1
    return abs(s)/2

def path_of(points, close=True):
    d = f"M{points[0][0]:.1f},{points[0][1]:.1f}"
    for p in points[1:]:
        d += f" L{p[0]:.1f},{p[1]:.1f}"
    return d + (" Z" if close else "")

# ---------- procesa land ----------
# El polígono de Eurasia llega hasta Asia oriental: recortamos POR PUNTO
# en coordenadas geográficas (los tramos omitidos se puentean con rectas
# que caen fuera del área visible).
def geo_keep(lon, lat):
    return -35 <= lon <= 105 and 18 <= lat <= 84

land = json.load(open(f"{SCRATCH}/ne_50m_land.json", encoding="utf-8"))
land_paths = []
for feat in land["features"]:
    geom = feat["geometry"]
    polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
    for poly in polys:
        for ring in poly:  # anillo exterior + agujeros (lagos: los saltamos por tamaño)
            proj_pts = [project(lon, lat) for lon, lat in ring if geo_keep(lon, lat)]
            if len(proj_pts) < 4: continue
            clipped = clip_ring(proj_pts)
            if not clipped: continue
            simp = dp(clipped, 1.3)
            if len(simp) < 4: continue
            if ring_area(simp) < 40: continue   # motas
            land_paths.append(path_of(simp))

# ---------- fronteras ----------
borders = json.load(open(f"{SCRATCH}/ne_50m_borders.json", encoding="utf-8"))
border_paths = []
for feat in borders["features"]:
    geom = feat["geometry"]
    lines = geom["coordinates"] if geom["type"] == "MultiLineString" else [geom["coordinates"]]
    for line in lines:
        proj_pts = [project(lon, lat) for lon, lat in line if geo_keep(lon, lat)]
        if len(proj_pts) < 2: continue
        if not any(inside(p) for p in proj_pts): continue
        simp = dp(proj_pts, 1.6)
        if len(simp) >= 2:
            border_paths.append(path_of(simp, close=False))

# ---------- ciudades y referencias ----------
CIUDADES = {
  'vigo': (-8.72, 42.24), 'madrid': (-3.70, 40.42), 'cordoba': (-4.78, 37.89),
  'copenhague': (12.57, 55.68), 'aarhus': (10.21, 56.16), 'berlin': (13.40, 52.52),
  'praga': (14.42, 50.09), 'bratislava': (17.11, 48.15), 'tatras': (19.70, 49.17),
  'bucarest': (26.10, 44.43), 'estambul': (28.97, 41.01),
  'cervera': (-4.50, 42.87), 'segovia': (-4.12, 40.95), 'guadalajara': (-3.16, 40.63),
  'huesca': (-0.41, 42.14),
  # referencias para decorar
  'reykjavik': (-21.9, 64.15), 'londres': (-0.13, 51.5), 'dublin': (-6.26, 53.35),
  'oslo': (10.75, 59.91), 'estocolmo': (18.07, 59.33), 'helsinki': (24.94, 60.17),
  'roma': (12.48, 41.9), 'atenas': (23.73, 37.98), 'lisboa': (-9.14, 38.72),
  'paris': (2.35, 48.86), 'munich': (11.58, 48.14), 'napoles': (14.27, 40.85),
  'palermo': (13.36, 38.12), 'palma': (2.65, 39.57), 'ajaccio': (8.74, 41.93),
  'cagliari': (9.11, 39.22), 'heraklion': (25.13, 35.34), 'edimburgo': (-3.19, 55.95),
  'bergen': (5.32, 60.39), 'gdansk': (18.65, 54.35), 'marsella': (5.37, 43.30),
  'burdeos': (-0.58, 44.84), 'amsterdam': (4.90, 52.37), 'alpes': (10.0, 46.5),
  'carpatos': (24.5, 45.5), 'pirineos': (0.5, 42.7), 'sierranevada': (-3.4, 37.05),
  'tanger': (-5.8, 35.78), 'izmir': (27.14, 38.42), 'ankara': (32.86, 39.93),
  'creta_o': (23.6, 35.4), 'noruega_n': (20.0, 69.5), 'finlandia_c': (26.0, 63.0),
  'biscay': (-6.0, 45.5), 'atlantico': (-18.0, 48.0), 'tirreno': (11.5, 40.0),
  'adriatico': (15.5, 43.0), 'egeo': (25.3, 38.5), 'balcanes': (21.5, 42.5),
  'baltico': (19.0, 57.5), 'mardelnorte': (3.0, 56.0), 'mednorte_africa': (0.0, 36.5),
}
city_px = {k: project(*v) for k, v in CIUDADES.items()}

out = {
  'land': land_paths,
  'borders': border_paths,
  'cities': {k: [round(v[0],1), round(v[1],1)] for k, v in city_px.items()},
}
json.dump(out, open(f"{SCRATCH}/geo_out.json", 'w', encoding="utf-8", newline="\n"))

print("anillos tierra:", len(land_paths), "| trozos frontera:", len(border_paths))
print("bytes land:", sum(len(p) for p in land_paths))
for k in ['vigo','madrid','cordoba','copenhague','aarhus','berlin','praga','bratislava','tatras','bucarest','estambul','lisboa','reykjavik','roma','atenas','estocolmo','tanger']:
    print(f"{k:12s} {city_px[k][0]:7.1f} {city_px[k][1]:7.1f}")
