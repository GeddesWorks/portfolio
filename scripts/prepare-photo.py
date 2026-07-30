#!/usr/bin/env python3
"""Prepare a camera-roll photo for the site: resize, redact, strip metadata.

Three things have to happen to every photo before it goes public, and doing them
by hand means eventually forgetting one:

1. Resize. Phone photos are 3-8 MB and display at a few hundred pixels wide.
2. Redact. Anything readable and identifying — a registration number, a plate,
   a house number — gets painted over. Note *painted*, not blurred and not
   covered with CSS: a blur can sometimes be reversed on text, and an overlay in
   the page leaves the original a right-click away. The pixels have to go.
3. Strip metadata. Pillow writes no EXIF unless asked, so re-encoding drops the
   GPS and device tags that came off the camera.

Usage:
    python3 scripts/prepare-photo.py IN OUT [--width N] [--quality Q]
                                     [--cover x1,y1,x2,y2 ...]

Cover boxes are fractions of the image (0-1), so they survive whatever
resolution the source happens to be:

    python3 scripts/prepare-photo.py ~/pontoon.jpg public/media/pontoon.jpeg \\
        --width 2000 --cover 0.430,0.498,0.585,0.552

Requires Pillow:  pip install pillow
"""

import argparse
import os
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit('Pillow is needed: pip install pillow')


def parse_box(text):
    try:
        x1, y1, x2, y2 = (float(v) for v in text.split(','))
    except ValueError:
        raise argparse.ArgumentTypeError(f'--cover wants x1,y1,x2,y2 as fractions, got {text!r}')
    if not all(0 <= v <= 1 for v in (x1, y1, x2, y2)) or x1 >= x2 or y1 >= y2:
        raise argparse.ArgumentTypeError(f'--cover box out of range or inverted: {text!r}')
    return x1, y1, x2, y2


def sampled_fill(image, box):
    """A colour averaged from four strips just *outside* the box.

    Sampling a padded rectangle around the target would include the target, and
    whatever we're covering — dark text, a coloured sticker — then dominates the
    average and the patch lands in the wrong colour. Only the surrounding surface
    gets a vote.
    """
    x1, y1, x2, y2 = box
    pad = max(6, (x2 - x1) // 10)
    w, h = image.width, image.height

    strips = [
        (max(0, x1 - pad), max(0, y1 - pad), min(w, x2 + pad), y1),  # above
        (max(0, x1 - pad), y2, min(w, x2 + pad), min(h, y2 + pad)),  # below
        (max(0, x1 - pad), y1, x1, y2),                              # left
        (x2, y1, min(w, x2 + pad), y2),                              # right
    ]

    total, weight = [0.0, 0.0, 0.0], 0
    for strip in strips:
        if strip[2] <= strip[0] or strip[3] <= strip[1]:
            continue
        region = image.crop(strip)
        area = region.width * region.height
        pixel = region.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
        for i in range(3):
            total[i] += pixel[i] * area
        weight += area

    if weight == 0:
        return (127, 127, 127)

    return tuple(round(channel / weight) for channel in total)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('source')
    parser.add_argument('dest')
    parser.add_argument('--width', type=int, default=1400)
    parser.add_argument('--quality', type=int, default=82)
    parser.add_argument('--cover', type=parse_box, action='append', default=[])
    args = parser.parse_args()

    image = Image.open(args.source)
    # Honour the EXIF orientation tag before we discard it, or the photo rotates.
    image = ImageOps.exif_transpose(image).convert('RGB')
    before = image.size

    for fraction in args.cover:
        box = (
            round(fraction[0] * image.width), round(fraction[1] * image.height),
            round(fraction[2] * image.width), round(fraction[3] * image.height),
        )
        patch = Image.new('RGB', (box[2] - box[0], box[3] - box[1]), sampled_fill(image, box))
        image.paste(patch, box[:2])
        print(f'  covered {box}')

    if image.width > args.width:
        image = image.resize(
            (args.width, round(image.height * args.width / image.width)),
            Image.LANCZOS,
        )

    # No exif= argument, so nothing from the camera survives.
    image.save(args.dest, 'JPEG', quality=args.quality, optimize=True, progressive=True)

    print(f'  {before[0]}x{before[1]} -> {image.width}x{image.height}, '
          f'{os.path.getsize(args.dest) // 1024} KB -> {args.dest}')


if __name__ == '__main__':
    main()
