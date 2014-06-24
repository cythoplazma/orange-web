"""
Django settings for orange_home project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""
import os
import socket

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SCREENSHOTS_DIR = \
    os.path.join(BASE_DIR, 'homepage', 'static', 'homepage', 'screenshots')
SCREENSHOTS_INDEX = os.path.join(SCREENSHOTS_DIR, 'screenshots.xml')
LICENSE_FILE = os.path.join(BASE_DIR, 'LICENSES')
DOWNLOAD_SET_PATTERN = os.path.join('/srv/download', 'filenames_%s.set')

# Quick-getting_started development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!

SECRET_KEY = '@%@g_gj#h+x+x0*b%vcl*gw^rmfmzq5jeb64atjmm&3j^7=!po'

# SECURITY WARNING: don't run with debug turned on in production!
# FOR TESTING WHEN FALSE: python manage.py runserver --insecure

DEBUG = False
TEMPLATE_DEBUG = False

ALLOWED_HOSTS = ['orange.biolab.si', 'new.orange.biolab.si']

# EMAIL BACKEND publishes mail send by send_mail() function to standard output.
# To change behavior for production, you will have to set up the SMTP BACKEND.
# Please refer to documentation:
# https://docs.djangoproject.com/en/1.6/topics/email/

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'homepage'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'orange_web.urls'

WSGI_APPLICATION = 'orange_web.wsgi.application'

ADMINS = (
    ('Miha Stajdohar', 'miha.stajdohar@fri.uni-lj.si'),
)

# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

if socket.gethostname() == 'biolab':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'orange_website',
            'USER': 'orange_website',
        }
    }

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'homepage', 'static')