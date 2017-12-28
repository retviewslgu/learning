from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
from sqlalchemy.ext.declarative import declarative_base
import json

Base = declarative_base()

#  https://github.com/crazyguitar/pysheeet/blob/master/docs/notes/python-sqlalchemy.rst#insert-create-an-insert-statement
#  http://docs.sqlalchemy.org/en/latest/core/type_basics.html
#  http://docs.sqlalchemy.org/en/latest/core/engines.html
#  https://www.pythoncentral.io/sqlalchemy-orm-examples/
#  https://www.pythoncentral.io/introductory-tutorial-python-sqlalchemy/
#  https://www.pythoncentral.io/how-to-install-sqlalchemy/
#  https://www.sqlalchemy.org/library.html#tutorials


class MyModel():
        def __init__(self):
                pass

        def __repr__(self):
                return get_str_from_entity(self)

class Team(Base,MyModel):
        __tablename__ = 'team'
        id = Column(Integer, primary_key=True)
        name = Column(String)
        club = Column(String)


class User(Base):
        __tablename__ = 'user'
        id = Column(Integer, primary_key=True)
        name = Column(String)
        team_id = Column(Integer, ForeignKey('team.id'))
        is_captain = Column(Integer, default=0)


class Poll(Base):
        __tablename__ = 'poll'
        id = Column(Integer, primary_key=True)
        archived = Column(Integer, default=0)
        closed = Column(Integer, default=0)
        admin_id = Column(Integer, ForeignKey('user.id'))
        creation_date = Column(DateTime, default=datetime.utcnow)
        # TODO all votes


class Vote(Base):
        __tablename__ = 'vote'
        id = Column(Integer, primary_key=True)
        creation_date = Column(DateTime, default=datetime.utcnow)

        author_id = Column(Integer, ForeignKey('user.id'))
        poll_id = Column(Integer, ForeignKey('poll.id'))

        text_flop = Column(String)
        id_flop = Column(Integer, ForeignKey('user.id'))
        drawing_flop = Column(String)

        text_top = Column(String)
        id_top = Column(Integer, ForeignKey('user.id'))
        drawing_top = Column(String)

        has_voted = Column(Integer, default=0)


def get_dict_from_entity(entity):
        return dict((col, getattr(entity, col)) for col in entity.__table__.columns.keys())


def get_str_from_entity(entity):
        return json.dumps(get_dict_from_entity(entity))


if __name__ == "__main__":
        db_url = {'drivername': 'postgres',
                  'username': 'postgres',
                  'password': 'polarbears',
                  'host': '127.0.0.1',
                  'port': 5432,
                  'database': 'polarbee'
                  }
        engine = create_engine(URL(**db_url))

        # create tables
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)

        for _t in Base.metadata.tables:
                print "Table: ", _t
