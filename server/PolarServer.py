from bottle import route, run, post, get, static_file, request
from PollDao import PollDao
import json
from PollDao import AlchemyEncoder
import Models

VERSION = 0.5
pollDao = PollDao()


@route('/hello')
def hello():
        return "Hello World! V" + str(VERSION)


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
        return static_file('index.html', root='./static/views')


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


@route('/images/:path#.+#')
def server_static(path):
        print 'static!', path
        return static_file(path, root='./static/images')


@route('/views/:path#.+#')
def server_static(path):
        print 'static!', path
        return static_file(path, root='./static/views')


# match all, even /last_poll/0/0
# https://stackoverflow.com/questions/8171618/how-do-you-accept-any-url-in-a-python-bottle-server
# https://bottlepy.org/docs/dev/tutorial.html#DYNAMIC ROUTES
# @route('/:path#.+#')
# def server_static(path):
#         print 'static! files', path
#         return static_file(path, root='./static/')

## static

@get('/users')
def get_users():
        users = pollDao.find_all_users()
        return Models.get_json_from_entity(users)


@post('/make_poll')
def make_poll():
        id_admin = request.json['id_admin']
        print 'make_poll', id_admin
        poll = pollDao.create_poll(id_admin)
        vote = pollDao.create_vote(id_admin,poll.id)
        return Models.get_json_from_entity(poll)

@post('/login')
def login():
        pass



@get('/last_poll/<closed>/<archived>')
def last_poll(closed, archived):
        print 'last_poll', closed, archived
        poll = pollDao.find_last_poll(closed == '1', archived == '1')
        res = Models.get_json_from_entity(poll)
        print res
        return res


# (II.) Voting
@get('/vote_form')
def vote_form():
        id_user = request.json['id_user']
        vote = pollDao.find_last_vote(id_user)
        return Models.get_json_from_entity(vote)


@post('/vote_form')
def vote_form():
        id_user = request.json['id_user']
        id_poll = request.json['id_poll']
        vote_data = request.json['vote']
        pollDao.close_vote(id_user, id_poll, vote_data)


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
