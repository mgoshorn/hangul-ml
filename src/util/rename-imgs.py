import os
img_dir = "D:/hangul-ml-data/set-011/images/"
imgs = os.listdir(img_dir)
renamed_prefix = "image_"
suffix = ".jpg"

count = 1
for img in imgs:
    os.rename(img_dir + img, img_dir + renamed_prefix + str(count).zfill(3) + suffix)
    count = count + 1