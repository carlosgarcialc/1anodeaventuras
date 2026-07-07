# Generador del mapa

Regenera `assets/mapa.svg` y `assets/mapa-imprimir.svg`:

```bash
cd tools/mapa
python3 geo.py      # proyecta la geografia (Natural Earth) -> geo_out.json
python3 compose.py  # compone los dos SVG con decoracion e iconos
```

- `geo.py`: proyeccion azimutal centrada en Europa, simplificacion y la
  "lupa" que agranda Espana (parametros BA/BR).
- `compose.py`: decoracion, iconos, ruta del bus y cartucho del titulo.
