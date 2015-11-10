from datetime import datetime
from application import app, client
from flask import render_template, jsonify
from werkzeug.exceptions import HTTPException

DT_FORMAT = '%a %b %d %H:%M:%S +0000 %Y'

@app.route('/')
def index():
    return render_template('partials/_root.html')


@app.route('/statuses/<string:screen_name>')
def user_timeline(screen_name):
    """@Endpoint: get timeline statuses for a given <screen_name>"""
    try:
        response = client.api.statuses.user_timeline.get(
            screen_name=screen_name, count=10)
        now = datetime.utcnow()
        return jsonify(retrieved_at=now.strftime(DT_FORMAT),
            statuses=normalize_statuses(response.data))
    except Exception as ex:
        # format exceptions as json response for easy digestibility
        response = jsonify(message=str(ex))
        response.status_code = (ex.code
                                if isinstance(ex, HTTPException)
                                else 500)
        return response


@app.route('/test')
def test():
    """run Jasmine specs in the browser"""
    return render_template('partials/_specs.html')


def normalize_statuses(statuses=[]):
    """normalize the status response for easy Backbone consumption"""
    return [{'id': status.id,
             'name': status.user.name,
             'created_at': status.created_at,
             'created_at_nice': get_time_delta(status.created_at),
             'retweet_count': status.retweet_count,
             'screen_name': status.user.screen_name,
             'profile_image_url': status.user.profile_image_url,
             'text': status.text} for status in statuses]


def get_time_delta(date_str):
    curr = datetime.utcnow()
    prev = datetime.strptime(date_str, DT_FORMAT)
    delta = curr - prev

    if delta.days > 364:
        return prev.strftime('%b %e, %Y')
    if delta.days > 2:
        return prev.strftime('%b %e')
    if delta.days > 0:
        return '{}d'.format(delta.days)
    if delta.seconds / 3600 > 1:
        return '{}h'.format(delta.seconds / 3600)
    if delta.seconds / 60 > 1:
        return '{}m'.format(delta.seconds / 60)
    return '{}s'.format(delta.seconds)

