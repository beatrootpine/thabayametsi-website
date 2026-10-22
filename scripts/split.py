import sys
from PIL import Image
src, out, scale, seg = sys.argv[1], sys.argv[2], float(sys.argv[3]), int(sys.argv[4])
im = Image.open(src); im = im.resize((int(im.width*scale), int(im.height*scale)))
n = 0
for y in range(0, im.height, seg):
    im.crop((0, y, im.width, min(im.height, y+seg))).save(f'{out}-{n}.jpg', quality=72); n += 1
print(out, n)
