from bottle import route, run, post, get, static_file
from PollDao import PollDao
import json
from PollDao import AlchemyEncoder

pollDao = PollDao()

@route('/hello')
def hello():
        return "Hello World!"


# 1. static server of web pages
#     return static_file(filename, root='/path/to/your/static/files')
#       request.json
#       request.method
# 2. GET
# 3. POST
# 4. DAO
# 5. wsgi heroku
# 6. API web IF (debug)


# (I) Home
@get('/')
def login_home():
        return static_file('home.html', root='./static')


@route('/js/:path#.+#')
def server_static(path):
        print 'static!', path
        return static_file(path, root='./static/js')

@route('/app/:path#.+#')
def server_static(path):
        print 'static!', path
        return static_file(path, root='./static/app')

@route('/css/:path#.+#')
def server_static(path):
        print 'static!', path
        return static_file(path, root='./static/css')

@route('/fonts/:path#.+#')
def server_static(path):
        print 'static!', path
        return static_file(path, root='./static/fonts')

@route('/:path#.+#')
def server_static(path):
        print 'static!', path
        return static_file(path, root='./static/')

## static

@get('/users')
def get_users():
        users = pollDao.find_all_users()
        return json.dumps(users, cls=AlchemyEncoder)

@post('/')
def login_home():
        pass


# (II.) Voting
@get('/vote_form')
def vote_form():
        pass


@post('/vote_form')
def vote_form():
        pass


# (III.) Thanks = wait
@get('/thanks')
def thanks():
        pass


# (IV.) Close
@post('/admin_close')
def admin_close():
        pass


@post('/admin_archive')
def admin_close():
        pass


@get('/results')
def results():
        pass


# V. History
@get('/download_zip')
def download_zip():
        pass


@get('/replay')
def replay_last():
        pass


# run the app
run(host='localhost', port=8080)
