import cherrypy
from cherrypy.lib import static
import os, os

@cherrypy.expose
class HelloWorld(object):
    @cherrypy.expose
    def index(self):
        return open(file='index.html', encoding='utf8')

@cherrypy.expose
class Heyo(object):
    @cherrypy.tools.accept(media='text/plain')
    def GET(self, a, b, ch):
        if ch == '+':
            return a + b
        return "Wrong Command"

conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd()),
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
        },
            # 'tools.response_headers.headers': [('Content-Type', 'application/json')],
        # '/generator': {
        #     'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        #     'tools.response_headers.on': True,
        #     'tools.response_headers.headers': [('Content-Type', 'text/plain')],
        # },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        }
    }


cherrypy.config.update({'server.socket_host': '127.0.0.1',
                            'server.socket_port': 8080,
                            'tools.sessions.on': True,
                            'engine.autoreload.on': False,
                            'log.access_file': './access.log',
                            'log.error_file': './error.log',
                            })

cherrypy.tree.mount(HelloWorld(), '/')
cherrypy.tree.mount(Heyo(), '/g', conf)

cherrypy.engine.start()
cherrypy.engine.block()