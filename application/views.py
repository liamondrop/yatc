import json
from application import app, client
from flask import render_template, jsonify


@app.route('/')
def index():
    """dump the data into the template on initial pageload
        for fast rendering"""

    screen_name = 'salesforce'
    response = client.api.statuses.user_timeline.get(
        screen_name=screen_name, count=10)

    return render_template('partials/_root.html',
        json_data=json.dumps(normalize_statuses(response.data)))


@app.route('/statuses/<string:screen_name>')
def user_timeline(screen_name):
    """@Endpoint: get timeline statuses for a given <screen_name>"""

    response = client.api.statuses.user_timeline.get(
        screen_name=screen_name, count=10)

    return jsonify(statuses=normalize_statuses(response.data))
    

def normalize_statuses(statuses=[]):
    """normalize the status response for easy Backbone consumption"""

    return [{'id': status.id,
             'name': status.user.name,
             'created_at': status.created_at,
             'retweet_count': status.retweet_count,
             'screen_name': status.user.screen_name,
             'profile_image_url': status.user.profile_image_url,
             'text': status.text} for status in statuses]
