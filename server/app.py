#!/usr/bin/env python3

# Standard library imports

# Remote library imports
# from flask import request
# from flask_restful import Resource

# # Local imports
# from config import app, db, api

from dotenv import load_dotenv
from models import db, Workout, WorkoutPost, User
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session, render_template
import os
from flask_bcrypt import Bcrypt
from faker import Faker

load_dotenv()
fake = Faker()

# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# DATABASE = os.environ.get(
#     "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(
    __name__,
    static_folder='../client/build',
    static_url_path='',
    template_folder='../client/build'
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = os.environ.get('SECRET_KEY')
migrate = Migrate(app, db)

db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)

# Views go here!
@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

class Workouts(Resource):
    def get(self):
        workouts = [workout.to_dict(rules = ("-workout_posts",)) for workout in Workout.query.all()]
        return make_response(workouts, 200)

    def post(self):
        try:
            new_workout = Workout(
                name = request.json['name'],
                type = request.json['type'],
                set_1_name = request.json['set_1_name'],
                set_1_sets = request.json['set_1_sets'],
                set_1_reps = request.json['set_1_reps'],
                set_2_name = request.json['set_2_name'],
                set_2_sets = request.json['set_2_sets'],
                set_2_reps = request.json['set_2_reps'],
                set_3_name = request.json['set_3_name'],
                set_3_sets = request.json['set_3_sets'],
                set_3_reps = request.json['set_3_reps']
                )
            db.session.add(new_workout)
            db.session.commit()
            return make_response(new_workout.to_dict(rules =("-workout_posts",)), 201 )
        except ValueError:
            return make_response({"errors":["validation errors"]}, 400)
api.add_resource(Workouts, "/workouts")    

class WorkoutsById(Resource):
    def get(self, id):
        workout = Workout.query.filter_by(id = id).first()
        if not workout:
            return make_response({"error": ["Workout not found"]}, 404)
        workout_to_dict = workout.to_dict(rules=("-workout_posts.user",))
        return make_response(workout_to_dict, 200)

    def patch(self, id):
        workout = Workout.query.filter_by(id = id).first()
        if not workout:
            return make_response({"error": ["Workout not found"]}, 404)
        try:
            for attr in request.json: 
                setattr(workout, attr, request.json[attr])
            db.session.add(workout)
            db.session.commit()
            return make_response(workout.to_dict(rules=("-workout_posts.user",)), 202)
        except ValueError:
            return make_response({"errors":["validation errors"]}, 400)

    def delete(self,id):
        workout = Workout.query.filter_by(id = id).first()
        if not workout:
            return make_response({"error": ["Workout not found"]}, 404)
        db.session.delete(workout)
        db.session.commit()
        return make_response({}, 204)
api.add_resource(WorkoutsById, '/workouts/<int:id>')

class Users(Resource):
    def get(self):
        users = [user.to_dict(rules = ("-workout_posts",)) for user in User.query.all()]
        return make_response(users, 200)

    
    def post(self):
        try:
            new_user = User(
                username = request.json['username'],
                password = request.json['password'],
                age = request.json['age']
                )
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(rules =("-workout_posts",)), 201 )
        except ValueError:
            return make_response({"errors":["validation errors"]}, 400)
api.add_resource(Users, '/users')

class UsersById(Resource):
    def get(self, id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return make_response({"error": ["User not found"]}, 404)
        user_to_dict = user.to_dict(rules=("-workout_posts.user","-workout_posts.workout",))
        return make_response(user_to_dict, 200)

    def patch(self, id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return make_response({"error": ["User not found"]}, 404)
        try:
            for attr in request.json: 
                setattr(user, attr, request.json[attr])
            db.session.add(user)
            db.session.commit()
            user_to_dict = user.to_dict(rules=("-workout_posts.user","-workout_posts.workout",))
            return make_response(user_to_dict, 202)
        except ValueError:
            return make_response({"errors":["validation errors"]}, 400)

    def delete(self,id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return make_response({"error": ["User not found"]}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({}, 204)
api.add_resource(UsersById, '/users/<int:id>')

class WorkoutPosts(Resource):
    def get(self):
        posts = [post.to_dict(rules =("-user.password",)) for post in WorkoutPost.query.all()]
        return make_response(posts, 200)

    def post(self):
        try:
            new_post = WorkoutPost(
                comments = request.json['comments'],
                workout_id = request.json['workout_id'],
                user_id = request.json['user_id']
                )
            db.session.add(new_post)
            db.session.commit()
            return make_response(new_post.to_dict(), 201 )
        except ValueError:
            return make_response({"errors":["validation errors"]}, 400)
api.add_resource(WorkoutPosts, "/posts")    

class WorkoutPostsById(Resource):
    def get(self, id):
        workout_posts = WorkoutPost.query.filter_by(id = id).first()
        if not workout_posts:
            return make_response({"error": ["WorkoutPost not found"]}, 404)
        workout_to_dict = workout_posts.to_dict(rules=("-user._password_hash",))
        return make_response(workout_to_dict, 200)

    def patch(self, id):
        workout_posts = WorkoutPost.query.filter_by(id = id).first()
        if not workout_posts:
            return make_response({"error": ["WorkoutPost not found"]}, 404)
        try:
            for attr in request.json: 
                setattr(workout_posts, attr, request.json[attr])
            db.session.add(workout_posts)
            db.session.commit()
            return make_response(workout_posts.to_dict(rules=("-user._password_hash",)), 202)
        except ValueError:
            return make_response({"errors":["validation errors"]}, 400)

    def delete(self,id):
        workout_posts = WorkoutPost.query.filter_by(id = id).first()
        if not workout_posts:
            return make_response({"error": ["WorkoutPost not found"]}, 404)
        db.session.delete(workout_posts)
        db.session.commit()
        return make_response({}, 204)
api.add_resource(WorkoutPostsById, '/posts/<int:id>')

class Signup(Resource):
    def post(self):
        try:
            new_user = User(
                username = request.json['username'],
                password_hash = request.json['password'],
                age = request.json['age'],
                image_url = fake.image_url()
            )
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(rules=('-_password_hash',)), 201)
        except ValueError:
            return make_response({"error": "User not created"}, 400)

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        user = User.query.filter(User.username == request.json['username']).first()
        password = request.json['password']
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(rules=('-_password_hash',)), 201)
        else:
            return make_response('error', 400)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Logout, '/logout')

class AutoLogin(Resource):
    def get(self):
        if session['user_id']:
            user = User.query.filter(User.id == session['user_id']).first()
            if user:
                return make_response(user.to_dict(rules=('-_password_hash',)), 200)
            else:
                return make_response({"errors": "User not found"}, 404)
        else:
            return make_response('', 204)

api.add_resource(AutoLogin, '/auto_login')

if __name__ == '__main__':
    app.run(port=5555, debug=True) 