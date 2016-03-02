# TODO
# Favicon
# MailerWebService

import cherrypy
from matchmaker_utils import *
import os
import os.path


class Matchmaker(object):
    @cherrypy.expose
    def index(self):
        return open('index.html')


class MatcherWebService(object):
    exposed = True

    @cherrypy.tools.accept(media='text/plain')
    def GET(self, eventName, pr, sex):
        matches = find_matches(bests, walkons, sex, eventName, float(pr))
        return results_to_json(matches)


# class MailerWebService(object):
# 	exposed = True

# 	@cherrypy.tools.accept(media='text/plain')
# 	def POST(self, sender, sender_name, recipients, subject, body):
# 		send_email(sender, sender_name, recipients, subject, body)
# 		pass

if __name__ == '__main__':
    # Load and prepare data
    print 'Preparing data'
    bests_fname = 'bests.csv'
    walkons_fname = 'walkons.csv'

    bests, walkons = load_and_clean_bests_and_walkons_data(bests_fname,
                                                           walkons_fname)
    print 'Data prepared'

    # Web server configurations
    conf = {
        '/': {
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        # '/mailer': {
        # 	'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        # 	'tools.response_headers.on': True,
        # 	'tools.response_headers.headers': [('Content-Type', 'text/plain')]
        # },
        '/matcher': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/plain')]
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        }
        # '/favicon.ico': {
	       #  'tools.staticfile.on': True,
	       #  'tools.staticfile.filename': '/Users/gushecht/Dropbox/GusAndNicole/TFAthleteMatchmaker/public/assets/favicon.ico'
        # }
    }

    # Create and start webapp and service
    print 'Spinning up server'
    webapp = Matchmaker()
    webapp.matcher = MatcherWebService()
    cherrypy.quickstart(webapp, '/', conf)
