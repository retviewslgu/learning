from bottle import route, run, post, get


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
        pass


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
