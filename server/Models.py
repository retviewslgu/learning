from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

#  https://github.com/crazyguitar/pysheeet/blob/master/docs/notes/python-sqlalchemy.rst#insert-create-an-insert-statement
#  http://docs.sqlalchemy.org/en/latest/core/type_basics.html
#  http://docs.sqlalchemy.org/en/latest/core/engines.html
#  https://www.pythoncentral.io/sqlalchemy-orm-examples/
#  https://www.pythoncentral.io/introductory-tutorial-python-sqlalchemy/
#  https://www.pythoncentral.io/how-to-install-sqlalchemy/
#  https://www.sqlalchemy.org/library.html#tutorials
class Team(Base):
        __tablename__ = 'Team'
        id = Column(Integer, primary_key=True)
        name = Column(String)
        club = Column(String)


class User(Base):
        __tablename__ = 'User'
        id = Column(Integer, primary_key=True)
        name = Column(String)
        team_id = Column(Integer, ForeignKey('Team.id'))
        is_captain = Column(Integer, default=0)


class Poll(Base):
        __tablename__ = 'Poll'
        id = Column(Integer, primary_key=True)
        archived = Column(Integer, default=0)
        closed = Column(Integer, default=0)
        admin_id = Column(Integer, ForeignKey('User.id'))
        creation_date = Column(DateTime, default=datetime.utcnow)
        # TODO all votes


class Vote(Base):
        __tablename__ = 'Vote'
        id = Column(Integer, primary_key=True)
        creation_date = Column(DateTime, default=datetime.utcnow)

        author_id = Column(Integer, ForeignKey('User.id'))
        poll_id = Column(Integer, ForeignKey('Poll.id'))

        text_flop = Column(String)
        id_flop = Column(Integer, ForeignKey('User.id'))
        drawing_flop = Column(String)

        text_top = Column(String)
        id_top = Column(Integer, ForeignKey('User.id'))
        drawing_top = Column(String)

        has_voted = Column(Integer, default=0)


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
