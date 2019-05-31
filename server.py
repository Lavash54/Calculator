import cherrypy
import os, os

from math import log, sin, cos, sqrt, tan, log1p, factorial


@cherrypy.expose
class CreateForm(object):
    @cherrypy.tools.accept(media='text/plain')
    def GET(self):
        return open(file='index.html', encoding='utf8')


@cherrypy.expose
class Calculate(object):
    @cherrypy.tools.accept(media='text/plain')
    def GET(self, **data):
            return str(eval(data['str']))


conf = {
    '/': {
        'tools.sessions.on': True,
        'tools.staticdir.root': os.path.abspath(os.getcwd()),
        'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        'tools.response_headers.on': True,
    },
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

cherrypy.tree.mount(CreateForm(), '/', conf)
cherrypy.tree.mount(Calculate(), '/g', conf)

cherrypy.engine.start()
cherrypy.engine.block()
