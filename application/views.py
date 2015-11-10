import time
import datetime
from application import app, client
from flask import render_template, jsonify
from werkzeug.exceptions import HTTPException


@app.route('/')
def index():
    """dump the data into the template on initial pageload
        for fast rendering"""
    return render_template('partials/_root.html')


@app.route('/statuses/<string:screen_name>')
def user_timeline(screen_name):
    """@Endpoint: get timeline statuses for a given <screen_name>"""
    try:
        response = client.api.statuses.user_timeline.get(
            screen_name=screen_name, count=10)
        return jsonify(statuses=normalize_statuses(response.data))
    except Exception as ex:
        # format exceptions as json for easy digestibility
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
    get_time_delta(statuses[0])
    return [{'id': status.id,
             'name': status.user.name,
             'created_at': status.created_at,
             'retweet_count': status.retweet_count,
             'screen_name': status.user.screen_name,
             'profile_image_url': status.user.profile_image_url,
             'text': status.text} for status in statuses]


def get_time_delta(date_str):
    print "########################\n"
    print time.strptime(date_str)
    print "\n########################"
