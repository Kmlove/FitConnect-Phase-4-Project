# FitConnect

## Description
FitConnect seamlessly blends fitness logging with a social media twist, allowing users to share workout insights and post reflections on stored routines, and create new shareable workouts for others to engage with and provide feedback on, creating a collaborative fitness community. 

## FitConnect Demo Video
[FitConnect Demo Video](https://youtu.be/bBi1Qr0DJZE)

## Stretch Goals / Feature Features
- Be able to follow other users
- Liking posts
- Commenting on other users post

## CRUD
- Create new workouts and new posts for workouts
- Display list of workouts and posts from database
- Edit posts and workouts in database
- Delete posts and workouts from database

## Wireframe
<img src='./assets/Screenshot 2023-10-13 at 12.07.14 PM.png' alt='wireframe' />

## Domain Model
<img src='./assets/domain-model.png' alt='domain model' />

## Many-To-Many
- User has many workouts through posts
- Workout has many users through posts
- Post belongs to a workout and a user

## Validations
- A user must be 16 years or older
- Username must exist
- Username must be unique
- A post has a workout and a user
- Workout has a name
