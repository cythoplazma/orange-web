from orange_web.settings import *

DEBUG = False
TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = ['orange.biolab.si', 'new.orange.biolab.si', '193.2.72.56']
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
DOWNLOAD_DIR = '/srv/download'
DOWNLOAD_SET_PATTERN = os.path.join(DOWNLOAD_DIR, 'filenames_%s.set')
WIDGET_CATALOG = '/srv/chroot_rsync/orange3doc/visual-programming/widgets.json'

# Django, reCaptcha secret keys
with open('/etc/orange_web.conf', 'r') as f:
    lines = f.readlines()
    SECRET_KEY = lines[0].split('=', 1)[1]
    RECAPTCHA_SECRET = lines[1].split('=', 1)[1]

# SMTP settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.fri.uni-lj.si'
EMAIL_PORT = 25
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = False
