from corsheaders.defaults import default_headers
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

URL_FRONTEND = 'https://patrones.juferoga.live'

# !Quick-start development settings - unsuitable for production
# !See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# !SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-s&zw^-6i(snxq%26amhs=kkfblob4z#8i+=k=qvvxargqmrkpc'

DEBUG = True

SYSTEM_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

LIBRARY_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
]

PROJECT_APPS = [
    'apps.authuser',
    'apps.product',
    'apps.purchase',
    'apps.movie',
    'apps.function',
    'apps.theater',
    'apps.cinema',
    'apps.seat',
    'apps.stats',
    'apps.hall',
]

INSTALLED_APPS = SYSTEM_APPS + LIBRARY_APPS + PROJECT_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'dasp_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR,"pages/templates"
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dasp_project.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATICFILES_DIRS = [
    BASE_DIR, 'pages/templates/assets'
]

AUTH_USER_MODEL = "authuser.User"

### REST FRAMEWORK AUTHENTICATION
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}
### CORS FOR ANGULAR
CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
    "https://patrones.juferoga.live",
    "https://back.juferoga.live",
]

CORS_ORIGIN_WHITELIST = (
    URL_FRONTEND,
    'https://back.juferoga.live',
)

ALLOWED_HOSTS = [ 
    URL_FRONTEND,
    'patrones.juferoga.live',
    'https://back.juferoga.live',
    'back.juferoga.live',
    '*',
]

CSRF_TRUSTED_ORIGINS = [
    URL_FRONTEND,
    'https://back.juferoga.live',
]

CORS_ALLOW_HEADERS = list(default_headers)