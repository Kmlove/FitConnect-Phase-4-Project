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
    workouts = []

    w1 = Workout(
        name="Chest",
        type = "Strength Training",
        set_1_name = "Bench Press",
        set_1_reps = 10,
        set_1_sets = 3,
        set_2_name = "Flys",
        set_2_reps = 10,
        set_2_sets = 3,
        set_3_name = "Push Ups",
        set_3_reps = 10,
        set_3_sets = 3,
    )

    w2 = Workout(
        name="Back",
        type = "Strength Training",
        set_1_name = "Rows",
        set_1_reps = 10,
        set_1_sets = 3,
        set_2_name = "Pull Ups",
        set_2_reps = 10,
        set_2_sets = 3,
        set_3_name = "Deadlift",
        set_3_reps = 10,
        set_3_sets = 3,
    )

    w3 = Workout(
        name="Legs",
        type = "Strength Training",
        set_1_name = "Squats",
        set_1_reps = 10,
        set_1_sets = 3,
        set_2_name = "Lunges",
        set_2_reps = 10,
        set_2_sets = 3,
        set_3_name = "Calf Raises",
        set_3_reps = 10,
        set_3_sets = 3,
    )

    w4 = Workout(
        name="Cardio",
        type = "Aerobic Exercise",
        set_1_name = "Jump Rope",
        set_1_reps = 10,
        set_1_sets = 3,
        set_2_name = "Burpies",
        set_2_reps = 10,
        set_2_sets = 3,
        set_3_name = "Sprints",
        set_3_reps = 10,
        set_3_sets = 3,
    )
    
    workouts.append(w1)
    workouts.append(w2)
    workouts.append(w3)
    workouts.append(w4)

    return workouts


def create_users():
    users = []
   
    for _ in range(5):

        s = User(
            username = fake.user_name(),
            password_hash = fake.password(),
            age = randint(16,90)
        )
        users.append(s)

    return users


def create_posts(users, workouts):
    posts = []

    for _ in range(20):
        p = WorkoutPost(
            comments=fake.sentence(nb_words=10),
            workout_id=rc(workouts).id,
            user_id=rc(users).id
        )
        posts.append(p)
    return posts




if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        WorkoutPost.query.delete()
        User.query.delete()
        Workout.query.delete()

        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding workouts...")
        workouts = create_workouts()
        db.session.add_all(workouts)
        db.session.commit()

        print("Seeding workout posts...")
        workout_posts = create_posts(users, workouts)
        db.session.add_all(workout_posts)
        db.session.commit()

        print("Done seeding!")
