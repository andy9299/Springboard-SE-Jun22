from models import db, Pet
from app import app

# Create all tables
db.drop_all()
db.create_all()

## Some Sample Data

# Create Some Pets
p1 = Pet(name="Charles", species="cat", notes="needy")
p2 = Pet(name="Max", species="dog", age="4",
         photo_url="https://images.unsplash.com/photo-1615751072497-5f5169febe17",
         available=False)

db.session.add_all([p1, p2])
db.session.commit()
