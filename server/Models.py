from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy import ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.declarative import DeclarativeMeta
import decimal

import json

Base = declarative_base()


#  https://github.com/crazyguitar/pysheeet/blob/master/docs/notes/python-sqlalchemy.rst#insert-create-an-insert-statement
#  http://docs.sqlalchemy.org/en/latest/core/type_basics.html
#  http://docs.sqlalchemy.org/en/latest/core/engines.html
#  https://www.pythoncentral.io/sqlalchemy-orm-examples/
#  https://www.pythoncentral.io/introductory-tutorial-python-sqlalchemy/
#  https://www.pythoncentral.io/how-to-install-sqlalchemy/
#  https://www.sqlalchemy.org/library.html#tutorials

# # aborted
# class MyModel(Base):
#         __abstract__ = True
#         id = Column(Integer, primary_key=True)
#         def __init__(self):
#                 pass
#
#         def __repr__(self):
#                 return get_str_from_entity(self)

class Team(Base):
        # def __init__(self,*args, **kwargs):
        #         print 'kwargs='+json.dumps(kwargs)
        #         super(Team,self).__init__(*args, **kwargs)
        __tablename__ = 'team'
        id = Column(Integer, primary_key=True)
        name = Column(String)
        club = Column(String)

        def __repr__(self):
                return get_json_from_entity(self)


class User(Base):
        __tablename__ = 'user'
        id = Column(Integer, primary_key=True)
        name = Column(String)
        team_id = Column(Integer, ForeignKey('team.id'))
        is_captain = Column(Integer, default=0)

        def __repr__(self):
                return get_json_from_entity(self)


class Poll(Base):
        __tablename__ = 'poll'
        id = Column(Integer, primary_key=True)
        archived = Column(Integer, default=0)
        closed = Column(Integer, default=0)
        admin_id = Column(Integer, ForeignKey('user.id'))
        creation_date = Column(DateTime, default=datetime.utcnow)
        # http://docs.sqlalchemy.org/en/latest/orm/basic_relationships.html
        votes = relationship("Vote")    #  backref="poll", do not add a Poll entity with the full fields

        # TODO all votes
        def __repr__(self):
                return get_json_from_entity(self)


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

        def __repr__(self):
                return get_json_from_entity(self)


def get_dict_from_entity(entity):
        return dict((col, getattr(entity, col)) for col in entity.__table__.columns.keys())


def get_json_from_entity_base(entity):
        return json.dumps(get_dict_from_entity(entity))


def get_json_from_entity(entity):
        return json.dumps(entity, cls=new_alchemy_encoder(), check_circular=False)  # cls=AlchemyEncoder)


# https://stackoverflow.com/questions/5022066/how-to-serialize-sqlalchemy-result-to-json
# http://codeandlife.com/2014/12/07/sqlalchemy-results-to-json-the-easy-way/
# class AlchemyEncoder(json.JSONEncoder):
#         def default(self, obj):
#                 if isinstance(obj.__class__, DeclarativeMeta):
#                         # an SQLAlchemy class
#                         fields = {}
#                         for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
#                                 print field
#                                 data = obj.__getattribute__(field)
#                                 # print data.__class__, field
#                                 """JSON encoder function for SQLAlchemy special classes."""
#                                 if isinstance(data, datetime):
#                                         fields[field] = data.isoformat()
#                                         # print 'ok',fields[field]
#                                 elif isinstance(data, decimal.Decimal):
#                                         fields[field] = float(data)
#                                 else:
#                                         try:
#                                                 json.dumps(data, cls=json.JSONEncoder)  # this will fail on non-encodable values, like other classes
#                                                 fields[field] = data
#                                         except TypeError:
#                                                 print 'TypeError ok'
#                                                 fields[field] = None
#                         # a json-encodable dict
#                         return fields
#                 return json.JSONEncoder.default(self, obj)


def new_alchemy_encoder():
        _visited_objs = []

        class AlchemyEncoderBis(json.JSONEncoder):
                def default(self, obj):
                        if isinstance(obj.__class__, DeclarativeMeta):
                                # don't re-visit self
                                if obj in _visited_objs:
                                        return None
                                _visited_objs.append(obj)

                                # an SQLAlchemy class
                                fields = {}
                                for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                                        fields[field] = obj.__getattribute__(field)
                                        data = obj.__getattribute__(field)
                                        if isinstance(data, datetime):
                                                fields[field] = data.isoformat()
                                                # print 'ok',fields[field]
                                        elif isinstance(data, decimal.Decimal):
                                                fields[field] = float(data)
                                return fields

                        return json.JSONEncoder.default(self, obj)

        return AlchemyEncoderBis


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
