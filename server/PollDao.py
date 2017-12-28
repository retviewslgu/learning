import MySQLdb
import psycopg2  # http://initd.org/psycopg/docs/usage.html
from sqlalchemy import Column, DateTime, String, Integer, ForeignKey, func
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine.url import URL
import time
from datetime import date, datetime
import json
from sqlalchemy.ext.declarative import DeclarativeMeta


# http://initd.org/psycopg/docs/usage.html


# https://www.postgresql.org/docs/8.3/static/app-postgres.html
# https://stackoverflow.com/questions/3173650/python-mysqldb-ssl-connection
#

# https://www.google.be/search?q=python+postgresql+orm&oq=python+postgresql+orm&aqs=chrome..69i57.3647j0j7&sourceid=chrome&ie=UTF-8
# https://www.fullstackpython.com/object-relational-mappers-orms.html
# http://www.blog.pythonlibrary.org/2014/07/17/an-intro-to-peewee-another-python-orm/
# https://www.fullstackpython.com/sqlalchemy.html
# https://github.com/crazyguitar/pysheeet/blob/master/docs/notes/python-sqlalchemy.rst

# https://github.com/PyMySQL/mysqlclient-python/issues/169
# https://stackoverflow.com/questions/25865270/how-to-install-python-mysqldb-module-using-pip
# pip install mysqlclient
# https://bottlepy.org/docs/dev/
# https://bottlepy.org/docs/dev/tutorial.html#quickstart-hello-world
# https://www.youtube.com/watch?v=f4F9cqYxMqc&index=14&list=PLKT6mnvH4OzgOldr3AfGeeKBCFe3JMKl2
# https://web.whatsapp.com/
# http://localhost:8080/hello
# https://www.fullstackpython.com/object-relational-mappers-orms.html
# http://initd.org/psycopg/
# https://www.fullstackpython.com/sqlalchemy.html
# https://github.com/iurisilvio/bottle-sqlalchemy
# https://stackoverflow.com/questions/25865270/how-to-install-python-mysqldb-module-using-pip
# http://mysql-python.sourceforge.net/MySQLdb.html
# https://pypi.python.org/pypi/PyPika
# https://docs.oracle.com/javaee/6/tutorial/doc/gjivm.html#gjivs
# https://trello.com/b/Zru3AoGQ/iii-ux-analysis-and-improvements
# https://trello.com/b/Zru3AoGQ/iii-ux-analysis-and-improvements
# https://www.youtube.com/watch?v=rVqAdIMQZlk
# http://localhost:3000/#/views?id=1a0965ec8b3f49f2822e696d44e118b0
# https://material.io/icons/#ic_lock_outline
# http://zavoloklom.github.io/material-design-iconic-font/icons.html#alert
# https://mail.google.com/mail/u/0/#inbox/1601bc2d0748a505

import Models
from Models import Vote, User, Team, Poll


class PollDao:
        def __init__(self):
                # self.do_init()
                # self.do_other_init()
                self.do_orm_init()

        def get_query_results(self, query):
                try:
                        cursor = self.mysql_connection.cursor(MySQLdb.cursors.DictCursor)
                        cursor.execute(query)

                except Exception, e:
                        print(e.message)

                results = []
                for n in cursor.fetchall():
                        results.append(n)

                return results

        # I. Polls
        def create_team(self, name, club):
                db_session = self.session()
                team = Team(name=name, club=club)
                db_session.add(team)
                db_session.commit()
                return team

        def create_user(self, name, team):
                db_session = self.session()
                user = User(name=name,team_id=team.id)
                db_session.add(user)
                db_session.commit()
                return user

        # I. Polls
        def create_poll(self, admin):
                db_session = self.session()
                poll = Poll(admin_id=admin.id, creation_date=datetime.now())
                db_session.add(poll)
                db_session.commit()

        def close_poll(self, id_poll):
                db_session = self.session()
                db_session.commit()
                pass

        def archive_poll(self, id_poll):
                pass

        def find_last_poll(self, closed, archived):
                db_session = self.session()
                # | Poll.closed ==  int(closed == True)
                row = db_session.query(Poll).filter((Poll.archived == int(archived == True)), (Poll.closed ==  int(closed == True))).first()
                print row.id
                return row

        def find_all_polls(self):
                pass

        # II. Votes
        def find_last_vote(self, user_id, submitted):
                pass

        def create_vote(self, user_id, poll_id):
                pass

        def update_vote(self, user_id, poll_id, submitted):
                pass

        # III. Users.
        def find_all_users(self):
                db_session = self.session()
                return db_session.query(User).all()

        def do_init(self):
                host_name = '127.0.0.1'  # ''ec2-23-21-197-231.compute-1.amazonaws.com'
                host_port = 5432
                password = 'polarbears'  # ''
                db_name = 'polarbee'  # 'd1n6cd0ckpgep6'
                user_name = 'postgres'  # "kthrptofebgwdq"
                self.mysql_connection = \
                        MySQLdb.connect(host=host_name, port=host_port, user=user_name, passwd=password, db=db_name, charset='utf8')
                # self.mysql_connection.cursor(MySQLdb.cursors.DictCursor).execute("SHOW TABLES")

                pass

        def do_other_init(self):
                conn = psycopg2.connect("dbname=polarbee user=postgres password=polarbears")
                cur = conn.cursor()
                cur.execute("CREATE TABLE test (id serial PRIMARY KEY, num integer, data varchar);")
                cur.execute("INSERT INTO test (num, data) VALUES (%s, %s)", (100, "abc'def"))
                cur.execute("SELECT * FROM test;")
                print(str(cur.fetchone()))
                conn.commit()
                cur.close()
                conn.close()
                print 'done'

        def do_orm_init(self):
                db_url = {'drivername': 'postgres',
                          'username': 'postgres',
                          'password': 'polarbears',
                          'host': '127.0.0.1',
                          'port': 5432,
                          'database': 'polarbee'
                          }
                self.engine = create_engine(URL(**db_url))
                self.session = sessionmaker()
                self.session.configure(bind=self.engine)
                # self.engine.connect().execute() # SQL
                # self.db_session = self.session()

        def get_dict_from_entity(self, entity):
                return dict((col, getattr(entity, col)) for col in entity.__table__.columns.keys())

        def get_str_from_entity(self, entity):
                return json.dumps(q.get_dict_from_entity(entity))


# https://stackoverflow.com/questions/5022066/how-to-serialize-sqlalchemy-result-to-json
class AlchemyEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj.__class__, DeclarativeMeta):
                # an SQLAlchemy class
                fields = {}
                for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                    data = obj.__getattribute__(field)
                    try:
                        json.dumps(data) # this will fail on non-encodable values, like other classes
                        fields[field] = data
                    except TypeError:
                        fields[field] = None
                # a json-encodable dict
                return fields

            return json.JSONEncoder.default(self, obj)


if __name__ == "__main__":
        print('god')
        q = PollDao()
        team = q.create_team('Polar bears2','LLNHC')
        print team
        print json.dumps(q.get_dict_from_entity(team))
        user = q.create_user('ludo', team)
        q.create_poll(user)
        q.find_last_poll(False,False)
        print('ok')
