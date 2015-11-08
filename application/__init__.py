from flask import Flask

# initialize Flask application
app = Flask(__name__)
app.config['PYSCSS_STYLE'] = 'compressed'
app.debug = True

# initialize Twitter client
from birdy.twitter import AppClient
from env import CONSUMER_KEY, CONSUMER_SECRET
client = AppClient(CONSUMER_KEY, CONSUMER_SECRET)
token = client.get_access_token()

# compile and minify scss
from flask.ext.assets import Environment, Bundle
assets = Environment(app)
assets.url = app.static_url_path
css = Bundle('stylesheets/styles.scss',
    filters='pyscss', output='stylesheets/styles.min.css')
assets.register('css_all', css)

# initialize views / route listeners
from application import views
