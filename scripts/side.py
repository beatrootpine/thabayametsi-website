import sys
from PIL import Image
out, scale, H = sys.argv[1], float(sys.argv[2]), int(sys.argv[3])
ims=[Image.open(p) for p in sys.argv[4:]]
ims=[i.resize((int(i.width*scale),int(i.height*scale))) for i in ims]
k=0
for y in range(0, max(i.height for i in ims), H):
    sheet=Image.new('RGB',(sum(i.width+10 for i in ims),H),'white');x=0
    for i in ims:
        if y < i.height: sheet.paste(i.crop((0,y,i.width,min(i.height,y+H))),(x,0))
        x+=i.width+10
    sheet.save(f'{out}-{k}.jpg',quality=70); print(f'{out}-{k}.jpg'); k+=1
