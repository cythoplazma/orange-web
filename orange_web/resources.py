import json
import xml.dom.minidom

from django.conf import settings


# Create a list of admin e-mail addresses.
admins = [x[1] for x in settings.ADMINS]


# Find and create a list of screenshots
def discover_screenshots():
    f = open(settings.SCREENSHOTS_INDEX)
    doc = xml.dom.minidom.parse(f)
    f.close()

    s_shots = []
    for node in doc.getElementsByTagName('screenshot'):
        iid = node.getAttribute('id')
        s_shot = {
            'id': iid,
            'title': node.getAttribute('title'),
            'hide': node.getAttribute('hide'),
            'img': 'homepage/screenshots/images/%s.png' % iid,
            'rank': int(node.getAttribute('rank') or 999),
            'thumb': 'homepage/screenshots/images/%s-thumb.png' % iid,
            'features': node.getAttribute('features'),
        }
        s_shots.append(s_shot)
    return s_shots

screenshots = [screen for screen in discover_screenshots()
               if not screen['hide'] == 'yes']

# Load testimonials catalog, pass it to testimonials.html template
try:
    with open(settings.TESTIMONIALS_CATALOG, "rt") as fp:
        testimonials_js = json.load(fp)
except IOError:
    testimonials_js = []

# Load widgets catalog, pass it to toolbox.html template
try:
    with open(settings.WIDGET_CATALOG, "rt") as fp:
        widget_js = json.load(fp)
except IOError:
    widget_js = []
# For use with TrieSearch in Widgets Catalog (convenience, performance util)
widg_js = {}
widget_idx = 0
for field_key, field_val in widget_js:
    for widget in field_val:
        # Widget name
        widg_js[widget['text']] = widget_idx
        # Widget keywords
        for keyword in widget['keywords']:
            widg_js[keyword] = widget_idx
        widget_idx += 1

# Load license file
try:
    with open(settings.LICENSE_FILE) as fl:
        license_file = fl.readlines()
except IOError:
    license_file = ['', ]
