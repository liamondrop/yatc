from flask import Flask

# initialize Flask application
app = Flask(__name__)
app.config['PYSCSS_STYLE'] = 'compressed'
app.debug = True

# initialize Twitter client
from birdy.twitter import AppClient
CONSUMER_KEY = 'Cx8hscIVCaacqzYjWw5NAS5n6'
CONSUMER_SECRET = 'fFsCwLr1ylxsKS37S7Z4QpwgH8322p3mjnAUOSsPXAwrI8ELNI'
client = AppClient(CONSUMER_KEY, CONSUMER_SECRET)
token = client.get_access_token()

# compile and minify scss
from flask.ext.assets import Environment, Bundle
assets = Environment(app)
assets.url = app.static_url_path
css = Bundle('stylesheets/styles.scss',
    filters='pyscss', output='stylesheets/styles.min.css')
assets.register('css_all', css)

# setup views
from application import views
