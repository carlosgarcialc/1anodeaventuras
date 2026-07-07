# Compone assets/mapa.svg (web) y assets/mapa-imprimir.svg (cuadro)
# a partir de la geografía proyectada (geo_out.json).
import json

SCRATCH = "."  # ejecutar desde tools/mapa
DEST = "../../assets"

g = json.load(open(f"{SCRATCH}/geo_out.json"))
C = g['cities']

def T(name, dx=0, dy=0):
    x, y = C[name]
    return f"translate({x+dx:.0f},{y+dy:.0f})"

# ---------------- piezas decorativas reutilizables ----------------
def pino(x, y, s=1):
    return f'<g transform="translate({x:.0f},{y:.0f}) scale({s})"><path d="M0,-16 l7,12 -4,0 6,10 -18,0 6,-10 -4,0 Z" fill="#5F7355" stroke="#4A3B2C" stroke-width="1.8" stroke-linejoin="round"/><rect x="-1.8" y="6" width="3.6" height="4" fill="#6E5B48" stroke="none"/></g>'

def arbol(x, y, s=1):  # bolita caduca
    return f'<g transform="translate({x:.0f},{y:.0f}) scale({s})"><circle cy="-7" r="8" fill="#8B9A78" stroke="#4A3B2C" stroke-width="1.8"/><path d="M0,1 L0,8" stroke="#6E5B48" stroke-width="2.4"/></g>'

def olivo(x, y, s=1):
    return (f'<g transform="translate({x:.0f},{y:.0f}) scale({s})" stroke="#4A3B2C" stroke-width="1.6">'
            f'<path d="M0,0 q-7,-2 -7,-8 q0,-7 8,-7 q1,-6 8,-6 q7,0 8,6 q8,0 8,7 q0,6 -7,8 Z" fill="#8B9A78" transform="translate(-9,0)"/>'
            f'<path d="M-1,0 l1,9 M-6,9 l12,0" fill="none"/></g>')

def montes(x, y, s=1, nieve=False):
    caps = '<path d="M-10,-7 l5,-8 5,7 M8,-5 l5,-8 5,7" fill="#F7F1E1" stroke="none"/>' if nieve else ''
    return (f'<g transform="translate({x:.0f},{y:.0f}) scale({s})">'
            f'<path d="M-22,6 l12,-18 9,12 8,-14 11,16 7,-9 8,11 -5,4 -50,0 Z" '
            f'fill="#DDCFB2" stroke="#6E5B48" stroke-width="2" stroke-linejoin="round"/>{caps}</g>')

def casita(x, y, s=1):
    return (f'<g transform="translate({x:.0f},{y:.0f}) scale({s})" stroke="#4A3B2C" stroke-width="1.8">'
            f'<rect x="-8" y="-4" width="16" height="10" fill="#F3ECDA"/>'
            f'<path d="M-10,-4 L0,-13 L10,-4 Z" fill="#B26A54"/>'
            f'<rect x="-2" y="0" width="4" height="6" fill="#6E5B48" stroke="none"/></g>')

def ola(x, y):
    return f'<path d="M{x},{y} q10,-7 20,0 q10,7 20,0" fill="none" stroke="#8FB0B5" stroke-width="2.5" stroke-linecap="round" opacity=".6"/>'

def destello(x, y, s=1):
    return (f'<path transform="translate({x},{y}) scale({s})" fill="#C9A24B" opacity=".85" '
            f'd="M0,-9 C1,-3 3,-1 9,0 C3,1 1,3 0,9 C-1,3 -3,1 -9,0 C-3,-1 -1,-3 0,-9 Z"/>')

def gaviota(x, y):
    return f'<path d="M{x},{y} q6,-6 11,0 q5,-6 11,0" fill="none" stroke="#6E5B48" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>'

def nube(x, y, s=1):
    return (f'<path transform="translate({x},{y}) scale({s})" fill="#F3ECDA" stroke="#6E5B48" stroke-width="2" opacity=".9" '
            f'd="M-24,10 q-10,0 -8,-8 q2,-7 10,-6 q2,-9 12,-9 q9,0 12,7 q9,-3 12,4 q8,0 8,6 q0,6 -9,6 Z"/>')

# ---------------- geografía ----------------
land_shadow = "\n".join(f'      <path d="{p}"/>' for p in g['land'])
land_fill  = "\n".join(f'      <path d="{p}"/>' for p in g['land'])
borders    = "\n".join(f'      <path d="{p}"/>' for p in g['borders'])

# ---------------- vegetación (manchas) ----------------
def mancha(name, dx, dy, rx, ry, rot):
    x, y = C[name]
    return f'<ellipse cx="{x+dx:.0f}" cy="{y+dy:.0f}" rx="{rx}" ry="{ry}" transform="rotate({rot} {x+dx:.0f} {y+dy:.0f})"/>'

manchas = "\n    ".join([
    mancha('madrid', -45, -35, 55, 22, -10),
    mancha('cordoba', 40, -20, 45, 18, 8),
    mancha('paris', 10, 40, 65, 26, -6),
    mancha('berlin', 40, -40, 75, 28, 4),
    mancha('munich', 30, 30, 55, 22, -5),
    mancha('bucarest', -40, -60, 70, 26, -4),
    mancha('estocolmo', -60, -30, 65, 30, -12),
    mancha('finlandia_c', 0, 0, 60, 34, 6),
    mancha('ankara', -60, 20, 70, 24, 3),
    mancha('balcanes', 0, 10, 40, 42, 20),
])

# ---------------- decoración del mar ----------------
mar_decor = "".join([
    # brújula en el Atlántico
    f'''<g transform="translate(140,470)">
      <circle r="52" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="3"/>
      <circle r="40" fill="none" stroke="#6E5B48" stroke-width="1.6"/>
      <circle r="45" fill="none" stroke="#6E5B48" stroke-width="1" stroke-dasharray="2 5"/>
      <path d="M0,-36 L10,0 L0,36 L-10,0 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2"/>
      <path d="M-36,0 L0,10 L36,0 L0,-10 Z" fill="#C9A24B" stroke="#4A3B2C" stroke-width="2" opacity=".9"/>
      <circle r="5" fill="#C9A24B" stroke="#4A3B2C" stroke-width="2"/>
      <text y="-58" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#4A3B2C" font-style="italic">N</text>
    </g>''',
    # avioncito con estela de corazón
    f'''<g transform="translate(220,600)">
      <path d="M-60,40 C-90,10 -60,-30 -20,-16 C0,-40 50,-30 44,4 C40,26 10,44 -12,52"
        fill="none" stroke="#6E5B48" stroke-width="3.5" stroke-dasharray="1 12" stroke-linecap="round"/>
      <g transform="translate(-18,56) rotate(-18)">
        <path d="M-16,4 L10,-2 L22,-11 Q25,-13 24,-9 L17,0 L22,6 L16,6 L11,2 L-8,7 Z" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.5" stroke-linejoin="round"/>
      </g>
    </g>''',
    # ballena
    f'''<g transform="{T('biscay', -195, -15)}">
      <path d="M-30,6 Q-28,-14 0,-14 Q26,-14 30,2 Q31,8 24,8 L14,6 Q18,12 26,14 Q14,20 4,12 Q-16,16 -30,6 Z" fill="#9BBAC0" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M-30,6 Q-38,4 -40,-2 Q-34,-2 -30,-4" fill="#9BBAC0" stroke="#4A3B2C" stroke-width="2.5"/>
      <circle cx="12" cy="-4" r="1.8" fill="#4A3B2C"/>
      <path d="M2,-16 q-3,-8 3,-12 M6,-17 q0,-7 6,-9" fill="none" stroke="#8FB0B5" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M6,4 q6,4 12,1" fill="none" stroke="#4A3B2C" stroke-width="1.8"/>
    </g>''',
    # veleros
    f'''<g transform="{T('biscay', 40, -40)}">
      <path d="M-22,10 h44 l-7,9 h-30 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M0,10 V-22 M0,-20 q16,3 16,14 L0,-6" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M0,-18 q-12,4 -12,12 L0,-6" fill="#C98B84" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M-34,24 q8,-6 16,0 q8,6 16,0 q8,-6 16,0" fill="none" stroke="#8FB0B5" stroke-width="2.5"/>
    </g>''',
    f'''<g transform="{T('palma', -60, 40)} scale(.85)">
      <path d="M-22,10 h44 l-7,9 h-30 Z" fill="#5F7355" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M0,10 V-22 M0,-20 q16,3 16,14 L0,-6" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M-30,24 q8,-6 16,0 q8,6 16,0" fill="none" stroke="#8FB0B5" stroke-width="2.5"/>
    </g>''',
    f'''<g transform="{T('baltico', 20, 20)} scale(.75)">
      <path d="M-22,10 h44 l-7,9 h-30 Z" fill="#C98B84" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M0,10 V-22 M0,-20 q16,3 16,14 L0,-6" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.5"/>
    </g>''',
    # vapor en el Egeo
    f'''<g transform="{T('egeo', 20, 40)} scale(.9)">
      <path d="M-24,6 h48 l-8,12 h-32 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2.5"/>
      <rect x="-12" y="-8" width="24" height="14" rx="2" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.5"/>
      <rect x="-4" y="-20" width="8" height="12" fill="#6E5B48" stroke="#4A3B2C" stroke-width="2"/>
      <path d="M0,-24 q-4,-6 2,-10 M4,-26 q-2,-5 3,-8" fill="none" stroke="#DDCFB2" stroke-width="3" stroke-linecap="round"/>
    </g>''',
    # monstruo marino amistoso (Mar del Norte)
    f'''<g fill="#8B9A78" stroke="#4A3B2C" stroke-width="2.5" transform="{T('mardelnorte', 0, 0)}">
      <path d="M-40,10 Q-34,-8 -20,-2 Q-26,10 -40,10 Z"/>
      <path d="M-8,8 Q0,-12 12,4 Q4,12 -8,8 Z"/>
      <path d="M24,6 Q30,-18 44,-6 Q46,2 38,8 Q30,10 24,6 Z"/>
      <circle cx="38" cy="-6" r="1.6" fill="#4A3B2C"/>
      <path d="M44,-2 l6,2 -6,3" fill="none" stroke-width="2"/>
    </g>''',
    # pulpito curioso (Tirreno)
    f'''<g transform="{T('tirreno', -35, 20)} scale(.8)">
      <path d="M0,-16 Q16,-16 16,0 L16,6 Q16,11 12,11 Q8,11 8,6 M-16,6 Q-16,11 -12,11 Q-8,11 -8,6 L-16,0 Q-16,-16 0,-16" fill="#C98B84" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M-9,10 q-3,10 -11,13 M0,12 q0,10 -5,15 M9,10 q4,10 12,12" fill="none" stroke="#C98B84" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="-5" cy="-4" r="1.7" fill="#4A3B2C"/><circle cx="5" cy="-4" r="1.7" fill="#4A3B2C"/>
    </g>''',
    # sirenita en su roca (estrecho danés)
    f'''<g transform="{T('copenhague', 34, 16)} scale(.8)">
      <ellipse cx="0" cy="14" rx="16" ry="7" fill="#6E5B48" stroke="#4A3B2C" stroke-width="2"/>
      <path d="M-2,10 Q-12,4 -14,-6 Q-8,-2 -4,-2 Q-8,-14 2,-18 Q10,-14 8,-4 Q12,-2 14,2 Q6,8 -2,10 Z" fill="#9BBAC0" stroke="#4A3B2C" stroke-width="2"/>
      <circle cx="4" cy="-20" r="5.5" fill="#E8C9A0" stroke="#4A3B2C" stroke-width="2"/>
      <path d="M0,-25 q4,-4 9,-1" fill="none" stroke="#B26A54" stroke-width="2.5"/>
    </g>''',
] + [ola(*p) for p in [(70,220),(150,500),(60,760),(250,720),(300,880),(120,940),(640,320),(700,180),
                        (560,720),(610,900),(760,940),(980,930),(1310,950),(1360,600),(1420,520),(680,430),
                        (900,300),(1060,340),(330,180),(520,120),(1240,140)]]
  + [gaviota(*p) for p in [(350,700),(690,240),(1050,900),(500,300),(240,850),(1300,700)]]
  + [nube(600,80,1), nube(1180,110,1), nube(70,160,.8), nube(1440,300,.75)]
  + [destello(*p) for p in [(90,450),(320,240),(660,140),(1330,220),(1460,760),(760,990),(70,660),(1240,470)]])

# ---------------- decoración de tierra ----------------
tierra_decor = "".join([
    montes(*C['pirineos'], 1, False).replace('translate(', 'translate(', 1) if False else montes(C['pirineos'][0], C['pirineos'][1], 1),
    montes(C['pirineos'][0]-55, C['pirineos'][1]+8, .7),
    montes(C['alpes'][0], C['alpes'][1], 1.15, True),
    montes(C['alpes'][0]-60, C['alpes'][1]+16, .8, True),
    montes(C['alpes'][0]+55, C['alpes'][1]-6, .75),
    montes(C['tatras'][0], C['tatras'][1]-32, .9, True),
    montes(C['carpatos'][0], C['carpatos'][1], .95),
    montes(C['carpatos'][0]+34, C['carpatos'][1]+40, .7),
    montes(C['sierranevada'][0], C['sierranevada'][1], .75),
    montes(C['edimburgo'][0]-26, C['edimburgo'][1]-34, .7),
    montes(C['bergen'][0]+30, C['bergen'][1]-20, .8, True),
    montes(C['oslo'][0]+40, C['oslo'][1]-60, .7, True),
    montes(C['balcanes'][0], C['balcanes'][1]-20, .7),
    # bosques nórdicos
    pino(C['oslo'][0]-20, C['oslo'][1]-30), pino(C['oslo'][0]+4, C['oslo'][1]-52, .8),
    pino(C['estocolmo'][0]-40, C['estocolmo'][1]-50), pino(C['estocolmo'][0]-14, C['estocolmo'][1]-70, .8),
    pino(C['bergen'][0]+56, C['bergen'][1]-60, .85),
    pino(C['helsinki'][0]-30, C['helsinki'][1]-40), pino(C['helsinki'][0]-4, C['helsinki'][1]-60, .8),
    pino(C['finlandia_c'][0]+20, C['finlandia_c'][1]-20, .9), pino(C['finlandia_c'][0]-18, C['finlandia_c'][1]+8, .75),
    pino(C['tatras'][0]-36, C['tatras'][1]+6, .85), pino(C['tatras'][0]+34, C['tatras'][1]+10, .75),
    pino(C['munich'][0]-20, C['munich'][1]+14, .8), pino(C['gdansk'][0]+20, C['gdansk'][1]+24, .8),
    pino(C['cervera'][0]+26, C['cervera'][1]-12, .7),
    # árboles bolita por el interior
    arbol(C['paris'][0]-40, C['paris'][1]+50, .9), arbol(C['paris'][0]+50, C['paris'][1]+16, .75),
    arbol(C['burdeos'][0]+30, C['burdeos'][1]+10, .85), arbol(C['berlin'][0]-60, C['berlin'][1]+30, .8),
    arbol(C['praga'][0]-50, C['praga'][1]+26, .75), arbol(C['bucarest'][0]-70, C['bucarest'][1]+20, .85),
    arbol(C['madrid'][0]-60, C['madrid'][1]+30, .8), arbol(C['londres'][0]-40, C['londres'][1]-20, .7),
    arbol(C['gdansk'][0]-50, C['gdansk'][1]+40, .8), arbol(C['balcanes'][0]+26, C['balcanes'][1]+30, .7),
    # olivos mediterráneos
    olivo(C['cordoba'][0]+50, C['cordoba'][1]-6, .9), olivo(C['lisboa'][0]+30, C['lisboa'][1]-40, .8),
    olivo(C['atenas'][0]-34, C['atenas'][1]-24, .9), olivo(C['napoles'][0]+20, C['napoles'][1]+14, .8),
    olivo(C['izmir'][0]+30, C['izmir'][1]+10, .85), olivo(C['marsella'][0]+30, C['marsella'][1]-14, .75),
    # cipreses junto a Roma
    f'''<g transform="{T('roma', 30, -44)}" stroke="#4A3B2C" stroke-width="1.8">
      <path d="M0,0 q6,10 0,26 q-6,-16 0,-26 Z" fill="#5F7355"/><path d="M0,26 l0,6" />
      <path d="M14,8 q5,9 0,22 q-5,-13 0,-22 Z" fill="#5F7355"/><path d="M14,30 l0,5"/>
    </g>''',
    # castillo del Loira, molino, ovejita, tranvía
    f'''<g transform="{T('paris', -60, 46)}" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2">
      <rect x="-16" y="-8" width="32" height="20"/>
      <rect x="-22" y="-14" width="8" height="26"/><rect x="14" y="-14" width="8" height="26"/>
      <path d="M-22,-14 l4,-8 4,8 M14,-14 l4,-8 4,8" fill="#B26A54"/>
      <rect x="-4" y="2" width="8" height="10" fill="#6E5B48"/>
    </g>''',
    f'''<g transform="{T('amsterdam', 14, -6)} scale(.8)" stroke="#4A3B2C" stroke-width="2">
      <path d="M-8,14 L-5,-8 L5,-8 L8,14 Z" fill="#B26A54"/>
      <path d="M0,-8 L-14,-22 M0,-8 L14,-22 M0,-8 L-14,6 M0,-8 L14,6" fill="none" stroke-width="2.5"/>
      <circle cx="0" cy="-8" r="2.5" fill="#C9A24B"/>
    </g>''',
    f'''<g transform="{T('londres', -60, -70)} scale(.85)" stroke="#4A3B2C" stroke-width="1.8">
      <ellipse cx="0" cy="0" rx="12" ry="8" fill="#F7F1E1"/>
      <circle cx="12" cy="-4" r="5" fill="#4A3B2C"/>
      <path d="M-8,8 l-1,6 M0,8 l0,6 M8,8 l1,6" stroke-width="2"/>
    </g>''',
    f'''<g transform="{T('lisboa', 4, -14)} scale(.8)" stroke="#4A3B2C" stroke-width="2">
      <rect x="-14" y="-10" width="28" height="18" rx="3" fill="#C9A24B"/>
      <path d="M-9,-6 h6 v7 h-6 Z M3,-6 h6 v7 h-6 Z" fill="#F3ECDA" stroke-width="1.5"/>
      <circle cx="-8" cy="10" r="3" fill="#4A3B2C"/><circle cx="8" cy="10" r="3" fill="#4A3B2C"/>
      <path d="M0,-10 L0,-16 L6,-20" fill="none" stroke-width="1.8"/>
    </g>''',
    # casitas sueltas
    casita(C['munich'][0]+46, C['munich'][1]-8, .9),
    casita(C['bucarest'][0]+40, C['bucarest'][1]-40, .85),
    casita(C['burdeos'][0]-14, C['burdeos'][1]-30, .8),
])

# ---------------- ruta del bus: Aarhus — Copenhague — Bratislava ----------------
ax, ay = C['aarhus']; cx, cy = C['copenhague']; bx, by = C['bratislava']
via1x, via1y = C['berlin'][0]+34, C['berlin'][1]+10   # esquiva el icono de Berlín
via2x, via2y = C['praga'][0]+38, C['praga'][1]+16     # y el de Praga
ruta_bus = f'''
  <g opacity=".55">
    <path d="M{ax},{ay} Q{(ax+cx)/2},{min(ay,cy)-16} {cx},{cy}"
      fill="none" stroke="#6E5B48" stroke-width="2.6" stroke-dasharray="1 9" stroke-linecap="round"/>
    <path d="M{cx},{cy} C{cx+20},{cy+60} {via1x},{via1y-40} {via1x},{via1y}
             S{via2x-10},{via2y} {via2x},{via2y} Q{bx+10},{by-30} {bx},{by}"
      fill="none" stroke="#6E5B48" stroke-width="2.6" stroke-dasharray="1 9" stroke-linecap="round"/>
  </g>
  <g transform="translate({via1x+6},{(via1y+via2y)/2 - 20}) rotate(64) scale(.62)" opacity=".9">
    <rect x="-26" y="-12" width="52" height="24" rx="5" fill="#C98B84" stroke="#4A3B2C" stroke-width="2.5"/>
    <path d="M-20,-6 h9 v8 h-9 Z M-6,-6 h9 v8 h-9 Z M8,-6 h9 v8 h-9 Z" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="1.6"/>
    <circle cx="-14" cy="14" r="4.5" fill="#4A3B2C"/><circle cx="14" cy="14" r="4.5" fill="#4A3B2C"/>
  </g>'''

# ---------------- iconos principales ----------------
def halo(name):
    x, y = C[name]
    return f'<circle cx="{x:.0f}" cy="{y:.0f}" r="34" fill="url(#halo)"/>'

iconos = f'''
  <g>{''.join(halo(n) for n in ['vigo','madrid','cordoba','copenhague','berlin','praga','bratislava','tatras','bucarest','estambul'])}</g>

  <!-- VIGO · pata de pulpo -->
  <g transform="{T('vigo')}">
    <path d="M-14,20 C-24,4 -17,-13 0,-17 C14,-20 24,-9 19,2 C15,10 5,11 3,3 C2,-2 6,-6 11,-4"
      fill="none" stroke="#4A3B2C" stroke-width="12" stroke-linecap="round"/>
    <path d="M-14,20 C-24,4 -17,-13 0,-17 C14,-20 24,-9 19,2 C15,10 5,11 3,3 C2,-2 6,-6 11,-4"
      fill="none" stroke="#C98B84" stroke-width="8" stroke-linecap="round"/>
    <g fill="#F3ECDA" stroke="#7C3B34" stroke-width="1.5">
      <circle cx="-17" cy="12" r="2.6"/><circle cx="-19" cy="1" r="2.6"/>
      <circle cx="-13" cy="-10" r="2.6"/><circle cx="-2" cy="-16" r="2.6"/>
      <circle cx="9" cy="-14" r="2.6"/><circle cx="16" cy="-6" r="2.4"/>
    </g>
  </g>

  <!-- MADRID · helado de fresa y limón -->
  <g transform="{T('madrid')}">
    <path d="M-9,2 L0,26 L9,2 Z" fill="#DDCFB2" stroke="#4A3B2C" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M-7,6 l14,0 M-5,12 l10,0 M-3,18 l6,0" stroke="#B26A54" stroke-width="1.6"/>
    <circle cx="-6" cy="-7" r="10" fill="#C98B84" stroke="#4A3B2C" stroke-width="2.5"/>
    <circle cx="7" cy="-9" r="9" fill="#E8D98F" stroke="#4A3B2C" stroke-width="2.5"/>
    <path d="M-9,2 q1,5 3,7 M8,0 q0,5 -2,7" stroke="#B26A54" stroke-width="2" fill="none"/>
    <circle cx="0" cy="-19" r="4" fill="#7C3B34" stroke="#4A3B2C" stroke-width="2"/>
    <path d="M14,-18 l5,-4 M-16,-16 l-5,-3" stroke="#C9A24B" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- CÓRDOBA · termómetro -->
  <g transform="{T('cordoba')}">
    <rect x="-5" y="-20" width="10" height="30" rx="5" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.5"/>
    <circle cx="0" cy="16" r="8" fill="#7C3B34" stroke="#4A3B2C" stroke-width="2.5"/>
    <rect x="-2.5" y="-14" width="5" height="28" rx="2.5" fill="#7C3B34"/>
    <path d="M-3,-24 l-3,-5 M0,-25 l0,-6 M3,-24 l3,-5" stroke="#B26A54" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M11,-8 q4,-3 0,-7 q-4,-4 0,-7 M17,-4 q4,-3 0,-7 q-4,-4 0,-7" fill="none" stroke="#C9A24B" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- COPENHAGUE · café pijo para llevar -->
  <g transform="{T('copenhague')}">
    <path d="M-10,-6 L10,-6 L7,18 L-7,18 Z" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="-11" y="-11" width="22" height="5" rx="2" fill="#DDCFB2" stroke="#4A3B2C" stroke-width="2.2"/>
    <path d="M-3,-11 l0,-3 6,0" fill="none" stroke="#4A3B2C" stroke-width="2"/>
    <path d="M-9,0 L9,0 L8,8 L-8,8 Z" fill="#C9A24B" stroke="#4A3B2C" stroke-width="2"/>
    <path d="M0,2 c-2,-2.5 -5.5,0 -3,2.5 l3,2.5 3,-2.5 c2.5,-2.5 -1,-5 -3,-2.5 Z" fill="#7C3B34" stroke="none"/>
    <path d="M-5,-17 q-2,-4 1,-7 M4,-17 q2,-5 -1,-8" fill="none" stroke="#6E5B48" stroke-width="2.2" stroke-linecap="round"/>
  </g>

  <!-- BERLÍN · micrófono -->
  <g transform="{T('berlin')} rotate(-24)">
    <circle cx="0" cy="-12" r="9" fill="#4A3B2C" stroke="#4A3B2C" stroke-width="2"/>
    <path d="M-8,-15 h16 M-9,-11 h18 M-7,-7 h14" stroke="#F3ECDA" stroke-width="1.4"/>
    <path d="M-4,-3 L-7,18 L7,18 L4,-3 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="-5" y="-4" width="10" height="4" rx="2" fill="#C9A24B" stroke="#4A3B2C" stroke-width="1.6"/>
    <path d="M13,-18 l4,-4 M15,-10 l6,0" stroke="#C9A24B" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- PRAGA · bola de disco -->
  <g transform="{T('praga')}">
    <path d="M0,-24 L0,-14" stroke="#4A3B2C" stroke-width="2.2"/>
    <circle cx="0" cy="0" r="13" fill="#9BBAC0" stroke="#4A3B2C" stroke-width="2.5"/>
    <path d="M-13,0 h26 M-11,-6 h22 M-11,6 h22 M0,-13 v26 M-6,-11.5 v23 M6,-11.5 v23" stroke="#F3ECDA" stroke-width="1.4"/>
    <circle cx="-4" cy="-4" r="2" fill="#F7F1E1"/>
    <path d="M-19,8 l-4,3 M19,8 l4,3 M-17,-12 l-4,-3 M17,-12 l4,-3" stroke="#C9A24B" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- BRATISLAVA · salchicha en tenedor -->
  <g transform="{T('bratislava')} rotate(-12)">
    <path d="M-14,20 L2,-2" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round"/>
    <path d="M2,-2 l-5,-8 M6,-5 l-4,-9 M10,-8 l-3,-9" stroke="#4A3B2C" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M-6,-14 Q8,-24 20,-16 Q26,-12 22,-7 Q12,1 -2,-5 Q-9,-9 -6,-14 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2.4"/>
    <path d="M0,-12 q10,-5 18,-1" stroke="#7C3B34" stroke-width="2" fill="none"/>
    <path d="M6,-24 q-1,-4 2,-6" stroke="#6E5B48" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- TATRAS · cabaña -->
  <g transform="{T('tatras')}">
    <path d="M8,-12 v-6 h5 v10" fill="#6E5B48" stroke="#4A3B2C" stroke-width="1.8"/>
    <path d="M11,-20 q4,-4 1,-8" fill="none" stroke="#DDCFB2" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M-17,4 L0,-14 L17,4 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M-14,0 Q0,-12 14,0 L12,-2 Q0,-13 -12,-2 Z" fill="#F7F1E1" stroke="none"/>
    <rect x="-13" y="4" width="26" height="13" fill="#8a6a4d" stroke="#4A3B2C" stroke-width="2.2"/>
    <path d="M-13,8.5 h26 M-13,13 h26" stroke="#6b4f37" stroke-width="1.6"/>
    <rect x="-8" y="7" width="7" height="7" fill="#E8C06B" stroke="#4A3B2C" stroke-width="1.8"/>
    <rect x="4" y="7" width="6" height="10" fill="#5b4433" stroke="#4A3B2C" stroke-width="1.8"/>
  </g>

  <!-- BUCAREST · vampiro -->
  <g transform="{T('bucarest')}">
    <path d="M-16,10 L-6,2 L-9,12 Z M16,10 L6,2 L9,12 Z" fill="#4A3B2C"/>
    <path d="M-13,14 Q-8,6 0,6 Q8,6 13,14 L10,18 L-10,18 Z" fill="#7C3B34" stroke="#4A3B2C" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="0" cy="-4" r="11" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.4"/>
    <path d="M-11,-8 Q-8,-15 0,-15 Q8,-15 11,-8 L9,-6 Q4,-11 0,-8 Q-4,-11 -9,-6 Z" fill="#4A3B2C"/>
    <circle cx="-4" cy="-4" r="1.5" fill="#4A3B2C"/><circle cx="4" cy="-4" r="1.5" fill="#4A3B2C"/>
    <path d="M-4,1 q4,3 8,0" fill="none" stroke="#4A3B2C" stroke-width="1.8"/>
    <path d="M-2.5,1.6 l1,3 M2.5,1.6 l-1,3" stroke="#F3ECDA" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- ESTAMBUL · kebab -->
  <g transform="{T('estambul')} rotate(-18)">
    <path d="M-16,2 L8,2 Q14,2 14,-3 L14,-4 Q14,-9 8,-9 L-16,-9 Q-20,-9 -20,-3.5 Q-20,2 -16,2 Z" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.4"/>
    <path d="M-14,-9 q2,6 0,11 M-7,-9 q2,6 0,11 M0,-9 q2,6 0,11" fill="none" stroke="#DDCFB2" stroke-width="1.8"/>
    <circle cx="13" cy="-8" r="4" fill="#8B9A78" stroke="#4A3B2C" stroke-width="1.8"/>
    <circle cx="18" cy="-4" r="3.6" fill="#C98B84" stroke="#4A3B2C" stroke-width="1.8"/>
    <circle cx="14" cy="0" r="3.2" fill="#B26A54" stroke="#4A3B2C" stroke-width="1.8"/>
    <path d="M20,-12 q3,-3 1,-7" fill="none" stroke="#6E5B48" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- ==== easter eggs ==== -->
  <g transform="{T('cervera')} scale(.85)" opacity=".85">
    <ellipse cx="0" cy="6" rx="10" ry="8" fill="#8a6a4d" stroke="#4A3B2C" stroke-width="1.8"/>
    <circle cx="6" cy="-5" r="6" fill="#8a6a4d" stroke="#4A3B2C" stroke-width="1.8"/>
    <circle cx="2" cy="-9" r="2" fill="#8a6a4d" stroke="#4A3B2C" stroke-width="1.5"/>
    <circle cx="10" cy="-9" r="2" fill="#8a6a4d" stroke="#4A3B2C" stroke-width="1.5"/>
    <circle cx="8" cy="-4" r="1.1" fill="#241c13"/>
    <path d="M-8,13 l-1,3 M6,13 l1,3" stroke="#4A3B2C" stroke-width="1.8"/>
  </g>
  <g transform="{T('segovia')} scale(.8)" opacity=".85">
    <ellipse cx="0" cy="8" rx="14" ry="4" fill="#DDCFB2" stroke="#6E5B48" stroke-width="1.6"/>
    <ellipse cx="-1" cy="0" rx="10" ry="6" fill="#C98B84" stroke="#4A3B2C" stroke-width="1.8"/>
    <circle cx="9" cy="-1" r="4.5" fill="#C98B84" stroke="#4A3B2C" stroke-width="1.8"/>
    <ellipse cx="11.5" cy="0" rx="1.8" ry="1.4" fill="#B26A54"/>
    <path d="M7,-5 l1,-3 3,2" fill="none" stroke="#4A3B2C" stroke-width="1.5"/>
    <path d="M-10,-4 q-3,-3 -1,-6" fill="none" stroke="#4A3B2C" stroke-width="1.5"/>
  </g>
  <g transform="{T('guadalajara')} scale(.8)" opacity=".85">
    <rect x="-13" y="-7" width="26" height="15" rx="5" fill="#9BBAC0" stroke="#4A3B2C" stroke-width="1.8"/>
    <path d="M-8,-1 q4,-3 8,0 q4,3 8,0" fill="none" stroke="#F3ECDA" stroke-width="1.8"/>
    <path d="M10,-11 v10 M15,-11 v10 M10,-8 h5" fill="none" stroke="#6E5B48" stroke-width="1.8"/>
  </g>
  <g transform="{T('huesca')} scale(.8)" opacity=".85">
    <path d="M-13,9 L0,-10 L13,9 Z" fill="#8B9A78" stroke="#4A3B2C" stroke-width="1.8"/>
    <path d="M0,-10 L0,9 M-4,9 L0,1 L4,9" fill="#5F7355" stroke="#4A3B2C" stroke-width="1.6"/>
    <path d="M-13,9 l-4,3 M13,9 l4,3" stroke="#4A3B2C" stroke-width="1.5"/>
  </g>'''

# ---------------- cartucho del título (solo versión imprimir) ----------------
cartucho = '''
  <g>
    <rect x="46" y="52" width="330" height="168" rx="8" fill="#F3ECDA" fill-opacity=".72" stroke="#6E5B48" stroke-width="2.5"/>
    <rect x="55" y="61" width="312" height="150" rx="5" fill="none" stroke="#6E5B48" stroke-width="1.2" stroke-dasharray="2 5"/>
    <text x="211" y="106" text-anchor="middle" font-family="'EB Garamond', Georgia, serif" font-style="italic" font-size="30" fill="#4A3B2C"><tspan fill="#C9A24B">1</tspan> año de</text>
    <text x="211" y="156" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-weight="900" font-style="italic" font-size="47" fill="#4A3B2C">Aventuras</text>
    <text x="211" y="194" text-anchor="middle" font-family="Caveat, 'Bradley Hand', cursive" font-size="27" fill="#6E5B48">por ahora…</text>
    <path transform="translate(78,74) scale(.8)" fill="#C9A24B" d="M0,-9 C1,-3 3,-1 9,0 C3,1 1,3 0,9 C-1,3 -3,1 -9,0 C-3,-1 -1,-3 0,-9 Z"/>
    <path transform="translate(344,196) scale(.7)" fill="#C9A24B" d="M0,-9 C1,-3 3,-1 9,0 C3,1 1,3 0,9 C-1,3 -3,1 -9,0 C-3,-1 -1,-3 0,-9 Z"/>
  </g>
  <g transform="translate(211,262)">
    <g transform="translate(-128,-6)">
      <rect x="-9" y="-16" width="18" height="32" rx="4" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2"/>
      <rect x="-6" y="-12" width="12" height="20" rx="1.5" fill="#BFD3D6" stroke="#6E5B48" stroke-width="1"/>
      <circle cx="0" cy="11.5" r="1.6" fill="#6E5B48"/>
      <path d="M14,-8 q5,8 0,16 M20,-12 q7,12 0,24" fill="none" stroke="#C9A24B" stroke-width="2.2" stroke-linecap="round"/>
    </g>
    <text x="12" y="-6" text-anchor="middle" font-family="Caveat, 'Bradley Hand', cursive" font-size="21" fill="#4A3B2C">psst: acerca el móvil a cada dibujo</text>
    <text x="12" y="18" text-anchor="middle" font-family="Caveat, 'Bradley Hand', cursive" font-size="21" fill="#4A3B2C">para abrir esa aventura ✨</text>
  </g>'''

fuentes_imprimir = '''
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&amp;family=EB+Garamond:ital@1&amp;family=Caveat:wght@700&amp;display=swap');
  </style>'''

# ---------------- plantilla común ----------------
def svg_doc(extra_head, extra_body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1024" width="1536" height="1024">
  <!-- ============================================================
       1 año de Aventuras — el mapa (beapa)
       Europa real (Natural Earth, proyección azimutal) con España
       un pelín agrandada con una "lupa" suave. Vectorial: imprime
       al tamaño que quieras.
       ============================================================ -->
  {extra_head}
  <defs>
    <filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="5"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>
    <radialGradient id="marGrad" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#C9DBDD"/>
      <stop offset="70%" stop-color="#BFD3D6"/>
      <stop offset="100%" stop-color="#A8C2C6"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F3ECDA" stop-opacity=".9"/>
      <stop offset="100%" stop-color="#F3ECDA" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="mapaClip"><rect x="16" y="16" width="1504" height="992" rx="10"/></clipPath>
  </defs>

  <rect width="1536" height="1024" fill="#EAE0CA"/>

  <g clip-path="url(#mapaClip)">
  <rect width="1536" height="1024" fill="url(#marGrad)"/>

  <g filter="url(#wobble)">
    <g fill="none" stroke="#9BBAC0" stroke-width="9" stroke-linejoin="round" opacity=".55">
{land_shadow}
    </g>
    <g fill="#EAE0CA" stroke="#6E5B48" stroke-width="2.6" stroke-linejoin="round">
{land_fill}
    </g>
    <g fill="none" stroke="#6E5B48" stroke-width="1.1" stroke-dasharray="4 5" opacity=".3">
{borders}
    </g>
    <g fill="#8B9A78" opacity=".26" stroke="none">
    {manchas}
    </g>
  </g>

  {mar_decor}
  {tierra_decor}
  {ruta_bus}
  {iconos}
  {extra_body}

  <rect width="1536" height="1024" fill="none" stroke="#4A3B2C" stroke-opacity=".16" stroke-width="90" style="filter:blur(30px)"/>
  </g><!-- fin clip -->

  <rect width="1536" height="1024" filter="url(#grain)" opacity=".55" fill="#EAE0CA" style="mix-blend-mode:multiply" pointer-events="none"/>
  <rect x="16" y="16" width="1504" height="992" rx="10" fill="none" stroke="#6E5B48" stroke-width="3"/>
  <rect x="26" y="26" width="1484" height="972" rx="6" fill="none" stroke="#6E5B48" stroke-width="1.4" stroke-dasharray="2 6"/>
  <g fill="#C9A24B" stroke="#4A3B2C" stroke-width="1.6">
    <path d="M40,40 c1,6 3,8 9,9 c-6,1 -8,3 -9,9 c-1,-6 -3,-8 -9,-9 c6,-1 8,-3 9,-9 Z"/>
    <path d="M1496,40 c1,6 3,8 9,9 c-6,1 -8,3 -9,9 c-1,-6 -3,-8 -9,-9 c6,-1 8,-3 9,-9 Z"/>
    <path d="M40,966 c1,6 3,8 9,9 c-6,1 -8,3 -9,9 c-1,-6 -3,-8 -9,-9 c6,-1 8,-3 9,-9 Z"/>
    <path d="M1496,966 c1,6 3,8 9,9 c-6,1 -8,3 -9,9 c-1,-6 -3,-8 -9,-9 c6,-1 8,-3 9,-9 Z"/>
  </g>
</svg>
'''

open(f"{DEST}/mapa.svg", "w").write(svg_doc("", ""))
open(f"{DEST}/mapa-imprimir.svg", "w").write(svg_doc(fuentes_imprimir, cartucho))

# coordenadas para js/data/destinos.js
print("Coordenadas para destinos.js (x%, y%):")
for slug, key in [('madrid','madrid'),('cordoba','cordoba'),('vigo','vigo'),('bratislava','bratislava'),
                  ('bucarest','bucarest'),('tatras','tatras'),('copenhague-aarhus','copenhague'),
                  ('berlin','berlin'),('praga','praga'),('estambul-capadocia','estambul')]:
    x, y = C[key]
    print(f"  {slug:22s} x:{x/1536*100:5.2f}, y:{y/1024*100:5.2f}")
print("mapa.svg y mapa-imprimir.svg escritos")
