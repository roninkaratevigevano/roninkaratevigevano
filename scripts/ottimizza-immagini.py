# Copia le immagini del vecchio sito in public/media ridimensionandole (max 1600px) e comprimendole.
# Uso: python scripts/ottimizza-immagini.py   (richiede Pillow: pip install pillow)
import os, shutil
from PIL import Image, ImageOps
QUI = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(QUI, "..", "..", "originale", "media")
DST = os.path.join(QUI, "..", "public", "media")
os.makedirs(DST, exist_ok=True)
MAX = 1600
for nome in sorted(os.listdir(SRC)):
    s, d = os.path.join(SRC, nome), os.path.join(DST, nome)
    est = nome.lower().rsplit(".", 1)[-1]
    if est in ("jpg", "jpeg", "png"):
        im = ImageOps.exif_transpose(Image.open(s))
        if max(im.size) > MAX:
            im.thumbnail((MAX, MAX), Image.LANCZOS)
        if est == "png":
            im.save(d, optimize=True)
        else:
            im.convert("RGB").save(d, quality=80, optimize=True, progressive=True)
        if os.path.getsize(d) > os.path.getsize(s):
            shutil.copyfile(s, d)
    else:
        shutil.copyfile(s, d)
print("ok")
