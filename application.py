from flask import Flask, render_template, request, Response
from functools import wraps
from matchmaker_utils import *


def check_auth(username, password):
    """This function is called to check if a username /
    password combination is valid.
    """
    return username == 'captainu' and password == 'passw0rd'


def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated

application = Flask(__name__)

BESTS_FILE_NAME = 'bests.csv'
WALK_ONS_FILE_NAME = 'walkons.csv'


@application.route('/')
@application.route('/index')
@requires_auth
def index():

    return render_template('index.html')


@application.route('/matcher', methods=['GET'])
def match():

    sex = request.args.get('sex')
    event_name = request.args.get('event_name')
    pr = float(request.args.get('pr'))
    matches = find_matches(bests, walk_ons, sex, event_name, pr)
    return results_to_json(matches)

if __name__ == '__main__':

    bests, walk_ons = load_and_clean_bests_and_walkons_data(BESTS_FILE_NAME,
                                                            WALK_ONS_FILE_NAME)
    application.run()
