from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from sqlalchemy.orm import validates
from config import db

# Models go here!
convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    set_1_name = db.Column(db.String)
    set_1_sets = db.Column(db.Integer)
    set_1_reps = db.Column(db.Integer)
    set_2_name = db.Column(db.String)
    set_2_sets = db.Column(db.Integer)
    set_2_reps = db.Column(db.Integer)
    set_3_name = db.Column(db.String)
    set_3_sets = db.Column(db.Integer)
    set_3_reps = db.Column(db.Integer)


    posts = db.relationship('WorkoutPost', back_populates='workout')
    
    serialize_rules = ('-posts.workout',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name must be present")
        return name

    @validates('set_1_name', 'set_1_sets', 'set_1_reps')
    def validate_set_1(self, key, value):
        if key == 'set_1_name':
            if not value:
                raise ValueError("Name must be present")
        elif key == 'set_1_sets':
            if not value:
                raise ValueError("Sets must be present")
        elif key == 'set_1_reps':
            if not value:
                raise ValueError("Reps must be present")
        return value
    
    

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    age = db.Column(db.Integer)

    posts = db.relationship('WorkoutPost', back_populates='user')

    serialize_rules = ('-posts.user',)

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username must be present")
        return username
    
    @validates('age')
    def validate_age(self, key, age):
        if age < 16:
            raise ValueError("Age must be 16 or older")
        return age


class WorkoutPost(db.Model, SerializerMixin):
    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)
    comments = db.Column(db.String)
    exercise_key = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    user_key = db.Column(db.Integer, db.ForeignKey('users.id'))

    workout = db.relationship('Workout', back_populates='posts')
    user = db.relationship('User', back_populates='posts')

    serialize_rules = ('-user.posts', 'workout.posts')

    @validates('exercise_key')
    def validate_exercise(self, key, exercise_key):
        if not exercise_key:
            raise ValueError("Exercise key must be present")

    @validates('user_key')
    def validate_user(self, key, user_key):
        if not user_key:
            raise ValueError("User key must be present")
        