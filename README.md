# Yet Another Twitter Client

Presented for you perusal is a little Twitter client built on top of a Flask server & a Bootstrap front end. The app retrieves the latest 10 tweets from any user's timeline and continues to poll the Twitter API for updates once a minute. There's also a nifty little tool that enables you to quickly filter the currently loaded statuses by the Tweet text.

## Running the app

The demo webserver has been tested on Node.js v0.10.29 & Python 2.7.5.

### Server side
* First, clone this repository and `cd` into the root directory
* You'll want to get a virtual environment setup so that you can install the Python dependencies cleanly. Make sure to install `virtualenv` if you have not done so before you go further.
```
$ virtualenv venv
$ source venv/bin/activate
```
* Now that that is done, you can `pip install -r requirements.txt` to pull down Flask and the other Python deps.
* This will take a minute, so if you haven't already got these handy, now's a good time to go grab you Twitter app credentials at https://apps.twitter.com/
* Once you have a Twitter App registered, you can retrieve your `Consumer Key` and `Consumer Secret`.
* In the `application` folder, you need to `cp secret.py.example secret.py` and add your creditials to that file.
* You should now be able to run the server by issuing a `python runserver.py` command in the base directory.
* Depending on your setup, you may get some complaints like the following:
```
InsecurePlatformWarning: A true SSLContext object is not available
```
This does not, however, appear to be a problem for the purposes of this exercise.
* If all goes well, the app should be running on `http://0.0.0.0:5000`

### Client side
#### CSS
* The browser assets live in `application/static`.
* The stylesheets are written in `scss` and built automatically by the server whenever changes are detected. Unfortunately, Webassets does not seem to be able to follow `@import` statements, so it's necessary to trigger a rebuild manually by changing something in the top level file. Keep in mind that previous builds are being cached in a .webassets-cache folder that is created when you first start the server and navigate to the site. These cached versions will be used if ever your top level file is equal to a previous state (even if other changes are present in your `@imported` files).

#### JS
* The JavaScript is written in ES2015 syntax using ES2015-style imports/exports.
* Node package manager is used to manage the dependencies and Browserify/Babelify were used to transpile to ES5 syntax and bundle all the files together.
* The app should hopefully work out of the box without rebuilding, but if you should need to rebuild, you can simply issue a `npm start` command at the top of the `javascripts` directory (You will need npm installed to pull down the dependencies and whatnot).

## TODO
* Improve test coverage.
* Properly handle HTTP errors in the browser.
* Persist tweets to a database and implement features like paging and marking tweets as "Read".
* Investigate Twitter's streaming protocol as well as pushing updates to the browser via Websockets.
