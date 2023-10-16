#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db
from models import Workout, User, WorkoutPost

fake = Faker()

def create_workouts():
    types = ['Strength Training', 'Aerobic Exercise', 'Stretching', 'Balance Exercise']
    for _ in range(5):
        p = Workout(
            name=fake.first_name(),
            distance_from_earth=str(randint(100000, 10000000000)),
            nearest_star=fake.first_name(),
        )
        planets.append(p)

    return planets


def create_users():
    users = []
   
    for _ in range(5):
        name = fake.name()
        

        s = User(
            name=name,
            field_of_study=fake.sentence(),
        )
        users.append(s)

    return users


def create_posts(planets, scientists):
    posts = []
    for _ in range(20):
        p = Post(
            name=fake.sentence(nb_words=3),
            planet_id=rc(planets).id,
            scientist_id=rc(scientists).id
        )
        posts.append(p)
    return posts


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
