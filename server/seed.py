# #!/usr/bin/env python3

# # Standard library imports
# from random import randint, choice as rc
# from datetime import datetime, timedelta

# # Remote library imports
# from faker import Faker

# # Local imports
# from app import app, MoonPhaseResource
# from models import db, User, Hairstyle, Stylist, MoonPhase, Appointment
# import random

# # if __name__ == '__main__':
# #     fake = Faker()
# #     with app.app_context():
# #         print("Starting seed...")
# #         # Seed code goes here!

# # Seed data
# def seed_data():
    
#     Hairstyle.query.delete()  # Deletes all entries in the Hairstyle table
#     db.session.commit()  # Commit the changes to the database

#     fake = Faker()

#     # Create users
#     users = []
#     for _ in range(30):
#         user = User(
#             username=fake.user_name(),
#             email=fake.email(),
#             # password_hash=fake.password(),  
#             birthdate=fake.date_of_birth(minimum_age=18),
#         )
#         user.password_hash = fake.password()  # Use the setter to set the password_hash
#         users.append(user)
#         db.session.add(user)

#     db.session.commit()

#     # Create stylists
#     stylists = []
#     for _ in range(10):
#         stylist = Stylist(
#             name=fake.name(),
#             specialty=rc(['Coloring', 'Cutting', 'Styling', 'Extensions']),
#         )
#         stylists.append(stylist)
#         db.session.add(stylist)

#     db.session.commit()

#     # Create moon phases
#     # moon_phases = []
#     # for _ in range(12):
#     #     phase_date = datetime.now() + timedelta(days=_ * 28)  # Approximate moon cycle
#     #     moon_phase = MoonPhase(
#     #         phase=rc(['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 
#     #                    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']),
#     #         date=phase_date.date(),
#     #         image=fake.image_url()
#     #     )
#     #     moon_phases.append(moon_phase)
#     #     db.session.add(moon_phase)

#     # db.session.commit()

#     # Create moon phases
#     moon_phases = []
#     for _ in range(12):
#         phase_date = datetime.now() + timedelta(days=_ * 28)
#         moon_phase_name = rc(['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 
#                                'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'])
#         moon_phase = MoonPhase(
#             phase=moon_phase_name,
#             date=phase_date.date(),
#             image=MoonPhaseResource().get_moon_image(moon_phase_name)  # Fetch correct image
#         )
#         moon_phases.append(moon_phase)
#         db.session.add(moon_phase)

#     db.session.commit()

#     # Create hairstyles

#     hairstyle_names = [
#     "Lunar Pixie", "Celestial Waves", "Solar Braids", "Zodiac Curls",
#     "Short Bob Cut", "Sleek Ponytail", "Pixie Cut", "Buzz Cut",
#     "Loose Waves", "Half-Up Half-Down", "Braided Crown", "Medium Length Waves",
#     "Beachy Waves", "Messy Bun", "Fishtail Braid", "Side Swept Bangs",
#     "Long Loose Curls", "Voluminous Blowout", "Glamorous Hollywood Waves",
#     "Textured Lob", "Shaggy Layers"
#     ]

#     hairstyles = []
#     # for _ in range(20):
#     #     hairstyle = Hairstyle(
#     #         name=fake.word().capitalize() + " Style",
#     #         moon_phase_id=rc(moon_phases).id,
#     #         image=fake.image_url(),
#     #         price=random.randint(20, 100) 
#     #         )  
        
#     #     hairstyles.append(hairstyle)
#     #     db.session.add(hairstyle)

#     # db.session.commit()
#     for name in hairstyle_names:
#         hairstyle = Hairstyle(
#             name=name,
#             moon_phase_id=rc(moon_phases).id,
#             image=fake.image_url(),
#             price=random.randint(20, 100)
#         )
#         hairstyles.append(hairstyle)
#         db.session.add(hairstyle)

#     db.session.commit()

#     # Create appointments
#     appointments = []
#     for _ in range(50):
#         # appointment_time = '20:20'  # Example time string
#         # appointment_time_obj = datetime.strptime(appointment_time, '%H:%M').time()  # Convert to time object

#         hour = random.randint(10, 15)
#         # Generate random minutes (0, 15, 30, 45)
#         minute = random.choice([0, 15, 30, 45])
#         # Create time object
#         appointment_time_obj = datetime.strptime(f'{hour}:{minute:02d}', '%H:%M').time()

        
#         appointment = Appointment(
#             date=fake.date_between(start_date='today', end_date='+30d'),
#             time=appointment_time_obj,
#             user_id=rc(users).id,
#             hairstyle_id=rc(hairstyles).id,
#             stylist_id=rc(stylists).id
#         )
#         appointments.append(appointment)
    
#     db.session.add_all(appointments)
#     # db.session.add(appointment)
#     db.session.commit()
#     print("Seeding completed!")

# if __name__ == '__main__':
#     with app.app_context():
#         print("Starting seed...")
#         seed_data()

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
    db.drop_all()  # Clear all tables (be careful with this in production!)
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
        user.password_hash = fake.password()  # Use the setter to set the password_hash
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

    # # Create moon phases
    # for _ in range(12):
    #     phase_date = datetime.now() + timedelta(days=_ * 28)
    #     moon_phase_name = rc(['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 
    #                            'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'])
    #     moon_phase = MoonPhase(
    #         phase=moon_phase_name,
    #         date=phase_date.date(),
    #         image=MoonPhaseResource().get_moon_image(moon_phase_name)  # Fetch correct image
    #     )
    #     db.session.add(moon_phase)

    # db.session.commit()

    # # Print moon phases to verify
    # moon_phases = MoonPhase.query.all()
    # print("Moon Phases in DB:", [phase.phase for phase in moon_phases])  # Add this line

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

      
