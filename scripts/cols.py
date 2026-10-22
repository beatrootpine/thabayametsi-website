import sys
from PIL import Image
src, out, seg = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = Image.open(src)
parts = [im.crop((0, y, im.width, min(im.height, y+seg))) for y in range(0, im.height, seg)]
per = 6
for k in range(0, len(parts), per):
    grp = parts[k:k+per]
    sheet = Image.new('RGB', (len(grp)*(im.width+12), seg), 'white')
    for i, p in enumerate(grp): sheet.paste(p, (i*(im.width+12), 0))
    sheet.save(f'{out}-{k//per}.jpg', quality=70)
    print(f'{out}-{k//per}.jpg')
