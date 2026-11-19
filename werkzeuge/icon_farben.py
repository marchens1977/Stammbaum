# Färbt die App-Symbole (icon-192.png, icon-512.png) von Grün in Mets-Blau/Orange um.
# Start im Projektordner:  python3 werkzeuge/icon_farben.py
# Dunkles Grün (Hintergrund) -> Blau #002D72, helleres Grün (Baumkrone) -> Orange-Töne. Andere Farben bleiben.
import colorsys
from PIL import Image

def umfaerben(pfad):
    img = Image.open(pfad).convert('RGBA'); px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
            if not (0.2 < h < 0.45 and s > 0.15): continue   # nur Grüntöne
            if l < 0.3:   neu = (0, 45, 114)                   # Hintergrund -> Mets-Blau
            else:                                              # Krone -> Orange, Helligkeit grob beibehalten
                rr, gg, bb = colorsys.hls_to_rgb(0.05, min(0.75, l + 0.12), 1.0)
                neu = (round(rr * 255), round(gg * 255), round(bb * 255))
            px[x, y] = neu + (a,)
    img.save(pfad)

for p in ['icon-192.png', 'icon-512.png']: umfaerben(p); print('umgefärbt:', p)
