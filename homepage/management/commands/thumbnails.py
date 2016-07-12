import glob
import os
# noinspection PyPackageRequirements
from PIL import Image

from django.core.management.base import BaseCommand
from django.conf import settings

from orange_web.resources import discover_screenshots


SCREENSHOT_ELEM = '<screenshot id="{0}" title="TODO" rank="999"></screenshot>'
# Sub-directory where generated thumbs will be saved to
REL_SAVE_DIR = 'thumbs'


class Command(BaseCommand):
    help = 'Generates thumbnails for screenshots'

    def handle(self, *args, **options):
        size = (180, 180)
        static = settings.STATIC_ROOT
        # noinspection PyUnresolvedReferences
        pngs = os.path.join(static, 'homepage/screenshots/images/*.png')

        screenshots = discover_screenshots()
        screen_ids = [screen['id'] for screen in screenshots]
        index = []

        for f in glob.glob(pngs):
            snp_dir = os.path.dirname(f)
            tbn_dir = os.path.join(snp_dir, REL_SAVE_DIR)
            fname = os.path.basename(f)
            _id, ext = os.path.splitext(fname)

            if _id not in screen_ids:
                index.append(SCREENSHOT_ELEM.format(_id))

            im = Image.open(f)
            im = im.convert("RGBA")
            im.thumbnail(size, Image.ANTIALIAS)
            try:
                im.save(os.path.join(tbn_dir, fname))
            except IOError:
                print('Create "{0}" sub-directory first'.format(REL_SAVE_DIR))
                return

        for screenshot in screenshots:
            if not os.path.isfile(os.path.join(static, screenshot['img'])):
                print("Missing screenshot image %s" % screenshot['img'])

        if len(index) > 0:
            print("Consider adding the following screenshots to the index:")
            print('\n'.join(index))
