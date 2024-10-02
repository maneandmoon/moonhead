#!/usr/bin/env python3

# Standard library imports
from random import random as rand_func, randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker

# Local imports
from app import app, MoonPhaseResource
from models import db, User, Hairstyle, Stylist, MoonPhase, Appointment

# Function to seed hairstyles
def seed_hairstyles():
    default_image_url = "https://smd-cms.nasa.gov/wp-content/uploads/2023/08/total-eclipse.png"

    hairstyles_data = {
        "New Moon": [
            {"type": "women", "styles": ["Short Bob Cut", "Sleek Ponytail", "Pixie Cut"]},
            {"type": "men", "styles": ["Buzz Cut", "Crew Cut", "Textured Crop"]},
            {"type": "colors", "styles": ["Bold Red", "Jet Black", "Platinum Blonde"]},
        ],
        "Waxing Crescent": [
            {"type": "women", "styles": ["Loose Waves", "Half-Up Half-Down", "Braided Crown"]},
            {"type": "men", "styles": ["Medium Length Waves", "Side Part", "Pompadour"]},
            {"type": "colors", "styles": ["Chocolate Brown", "Golden Blonde", "Rose Gold"]},
        ],
        "First Quarter": [
            {"type": "women", "styles": ["Beachy Waves", "Messy Bun", "Fishtail Braid"]},
            {"type": "men", "styles": ["Longer Textured Hair", "Undercut", "Fringe"]},
            {"type": "colors", "styles": ["Chestnut Brown", "Honey Blonde", "Ash Gray"]},
        ],
        "Waxing Gibbous": [
            {"type": "women", "styles": ["Side Swept Bangs", "Top Knot", "Elegant Updo"]},
            {"type": "men", "styles": ["Ivy League Cut", "Quiff", "Slicked Back"]},
            {"type": "colors", "styles": ["Burgundy", "Copper", "Dirty Blonde"]},
        ],
        "Full Moon": [
            {"type": "women", "styles": ["Long Loose Curls", "Voluminous Blowout", "Glamorous Hollywood Waves"]},
            {"type": "men", "styles": ["Long Flowing Locks", "Messy Top Knot", "Classic Comb Over"]},
            {"type": "colors", "styles": ["Deep Black", "Bright Platinum", "Warm Auburn"]},
        ],
        "Waning Gibbous": [
            {"type": "women", "styles": ["Textured Lob", "Pushed Back Hair", "Low Chignon"]},
            {"type": "men", "styles": ["Disconnected Undercut", "Long Textured Hair", "Caesar Cut"]},
            {"type": "colors", "styles": ["Dark Brown", "Soft Caramel", "Dusty Rose"]},
        ],
        "Last Quarter": [
            {"type": "women", "styles": ["Straight and Sleek", "Vintage Waves", "Twisted Updo"]},
            {"type": "men", "styles": ["Classic Taper", "Short and Curly", "Formal Side Part"]},
            {"type": "colors", "styles": ["Golden Brown", "Pastel Pink", "Deep Blue"]},
        ],
        "Waning Crescent": [
            {"type": "women", "styles": ["Shaggy Layers", "Braided Ponytail", "Bohemian Updo"]},
            {"type": "men", "styles": ["Long Layered Cut", "Messy Fringe", "Casual Shag"]},
            {"type": "colors", "styles": ["Silver", "Black Cherry", "Cool Blonde"]},
        ],
    }

    # First, ensure to have moon phases populated before seeding hairstyles
    moon_phases = MoonPhase.query.all()  # Retrieve all moon phases from the database
    moon_phase_dict = {phase.phase: phase.id for phase in moon_phases}  # Create a mapping of phase name to ID

    for phase, styles in hairstyles_data.items():
        for entry in styles:
            for hairstyle_name in entry["styles"]:
                hairstyle = Hairstyle(
                    moon_phase_id=moon_phase_dict[phase],
                    type=entry["type"],
                    name=hairstyle_name,
                    image=default_image_url,
                    price=randint(20, 100)  # Example price
                )
                db.session.add(hairstyle)

    db.session.commit()
    print("Hairstyles seeded successfully.")

# Seed data function
def seed_data():
    db.drop_all()  # Clear all tables 
    db.create_all()  # Recreate tables

    fake = Faker()

    # Create users
    users = []
    for _ in range(30):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            birthdate=fake.date_of_birth(minimum_age=18),
        )
        user.password = fake.password() 
        users.append(user)
        db.session.add(user)

    db.session.commit()

    # Create stylists
    for _ in range(10):
        stylist = Stylist(
            name=fake.name(),
            specialty=rc(['Coloring', 'Cutting', 'Styling', 'Extensions']),
        )
        db.session.add(stylist)

    db.session.commit()

    # Create unique moon phases
    unique_phases = set()
    while len(unique_phases) < 8:  # 8 unique phases
        moon_phase_name = rc(['New Moon', 'Waxing Crescent', 'First Quarter', 
                               'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 
                               'Last Quarter', 'Waning Crescent'])
        unique_phases.add(moon_phase_name)

    for phase_name in unique_phases:
        phase_date = datetime.now() + timedelta(days=len(unique_phases) * 28)
        moon_phase = MoonPhase(
            phase=phase_name,
            date=phase_date.date(),
            image=MoonPhaseResource().get_moon_image(phase_name)
        )
        db.session.add(moon_phase)

    db.session.commit()

    # Print moon phases to verify
    moon_phases = MoonPhase.query.all()
    print("Moon Phases in DB:", [phase.phase for phase in moon_phases])  # Add this line


    # Seed hairstyles
    seed_hairstyles()

    # Create appointments
    for _ in range(50):
        hour = randint(10, 15)
        minute = rc([0, 15, 30, 45])
        appointment_time_obj = datetime.strptime(f'{hour}:{minute:02d}', '%H:%M').time()

        appointment = Appointment(
            date=fake.date_between(start_date='today', end_date='+30d'),
            time=appointment_time_obj,
            user_id=rc(users).id,
            hairstyle_id=rc(Hairstyle.query.all()).id,
            stylist_id=rc(Stylist.query.all()).id
        )
        db.session.add(appointment)

    db.session.commit()
    print("Seeding completed!")

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed_data()

      
