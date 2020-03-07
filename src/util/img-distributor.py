import os
import pandas as pd
import shutil
import random
import string
import math
import sys

input_dir = 'D:/hangul-ml-data/set-011/'
output_dir = 'D:/hangul-categorized/'

labels = pd.read_json(input_dir + 'labels.json', orient="values", typ="series", encoding="utf-8")

initial_consonant_options = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ',
            'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
vowel_options = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ',
            'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
final_consonant_options = ['null', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ',
            'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ',
            'ㅍ', 'ㅎ']

def deconstructHangul(char):
    char_code = ord(char)
    initial_consonant_id = math.floor((char_code - 44032) / 588);
    vowel_id = math.floor(((char_code - initial_consonant_id * 588) - 44032) / 28)
    final_id = math.floor(((char_code - initial_consonant_id * 588) - vowel_id * 28) - 44032)

    return [initial_consonant_options[initial_consonant_id],
        vowel_options[vowel_id],
        final_consonant_options[final_id]];

def generate_random_string(stringLength=30):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


imgs = os.listdir(input_dir + 'images/')
img_label_pairs = []

for (img, label) in zip(imgs, labels):
    img_label_pairs.append({
        "image": img,
        "syllable": label
    })

random.shuffle(img_label_pairs)

# Split images into groups of Training/Validation/Test at 70%/20%/10% ratios
train_items = img_label_pairs[:(int(len(img_label_pairs)*0.7))]
validate_items = img_label_pairs[(int(len(img_label_pairs)*0.7)):(int(len(img_label_pairs)*0.9))]
test_items = img_label_pairs[(int(len(img_label_pairs)*0.9)):]

def print_status(i, max, counter_items = 30):
    count = str(i).zfill(4)
    percentage = i / max
    done_count = int(percentage * counter_items)
    remaining_count = counter_items - done_count
    done = ''.join('#' for i in range(done_count))
    remaining = ''.join('-' for i in range(remaining_count))
    sys.stdout.write('\r' + count + '  |' + done + remaining + '| ' + str(int(percentage*100)) + '%')
    sys.stdout.flush()

def deliver_images(items, dataset, starting_point = 0):
    for i in range(starting_point, len(items)):
        item = items[i]
        random_string = generate_random_string()
        
        image_name = item.get('image')
        syllable = item.get('syllable')
        
        parts = deconstructHangul(syllable)
        first_path = output_dir + 'first-consonant-categorized/' + dataset + '/' + parts[0] + '/' + random_string + image_name;
        second_path = output_dir + 'vowel-categorized/' + dataset + '/' + parts[1] + '/' + random_string + image_name;
        third_path = output_dir + 'final-consonant-categorized/' + dataset + '/' + parts[2] + '/' + random_string + image_name;
        
        shutil.copy(input_dir + 'images/' + image_name, first_path)
        shutil.copy(input_dir + 'images/' + image_name, second_path)
        shutil.copy(input_dir + 'images/' + image_name, third_path)
        print_status(i+1, len(items))


print("Transferring train images:")
deliver_images(train_items, 'train')

print("Transferring validate images:")
deliver_images(validate_items, 'valid')

print("Transferring test images: ")
deliver_images(test_items, 'test')