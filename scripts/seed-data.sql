-- Seed data for Pet Care and Adoption website

-- Insert sample users
INSERT INTO users (first_name, last_name, email, phone, password_hash, user_type) VALUES
('John', 'Doe', 'john.doe@email.com', '(555) 123-4567', '$2b$10$example_hash_1', 'adopter'),
('Jane', 'Smith', 'jane.smith@email.com', '(555) 234-5678', '$2b$10$example_hash_2', 'adopter'),
('Sarah', 'Johnson', 'sarah.johnson@happypaws.org', '(555) 345-6789', '$2b$10$example_hash_3', 'shelter'),
('Dr. Michael', 'Chen', 'dr.chen@petvet.com', '(555) 456-7890', '$2b$10$example_hash_4', 'veterinarian'),
('Emily', 'Rodriguez', 'emily@petgrooming.com', '(555) 567-8901', '$2b$10$example_hash_5', 'service_provider');

-- Insert sample shelters
INSERT INTO shelters (name, address, city, state, zip_code, phone, email, website, description, user_id) VALUES
('Happy Paws Rescue', '123 Main Street', 'New York', 'NY', '10001', '(555) 345-6789', 'info@happypaws.org', 'www.happypaws.org', 'Dedicated to finding loving homes for abandoned pets', 3),
('City Animal Shelter', '456 Oak Avenue', 'Los Angeles', 'CA', '90210', '(555) 678-9012', 'contact@cityanimalshelter.org', 'www.cityanimalshelter.org', 'Municipal animal shelter serving the community', NULL),
('Rescue Friends', '789 Pine Road', 'Chicago', 'IL', '60601', '(555) 789-0123', 'hello@rescuefriends.org', 'www.rescuefriends.org', 'Non-profit organization rescuing pets in need', NULL);

-- Insert sample pets
INSERT INTO pets (name, type, breed, age_years, age_months, size, weight, gender, color, description, personality, medical_info, adoption_fee, shelter_id) VALUES
('Buddy', 'dog', 'Golden Retriever', 2, 0, 'large', 65.00, 'male', 'Golden', 'Friendly and energetic dog looking for a loving family. Great with children and other dogs.', ARRAY['Friendly', 'Energetic', 'Loyal', 'Playful', 'Good with kids'], '{"vaccinated": true, "neutered": true, "microchipped": true, "health_issues": "None known"}', 250.00, 1),
('Luna', 'cat', 'Persian', 1, 0, 'medium', 8.50, 'female', 'White', 'Gentle and affectionate cat perfect for apartment living. Loves to cuddle and purr.', ARRAY['Gentle', 'Affectionate', 'Quiet', 'Indoor cat'], '{"vaccinated": true, "neutered": false, "microchipped": true, "health_issues": "None known"}', 150.00, 1),
('Charlie', 'dog', 'Labrador Mix', 3, 0, 'large', 70.00, 'male', 'Black', 'Playful and loyal companion ready for adventures. Well-trained and house-broken.', ARRAY['Playful', 'Loyal', 'Intelligent', 'Active'], '{"vaccinated": true, "neutered": true, "microchipped": true, "health_issues": "None known"}', 200.00, 2),
('Whiskers', 'cat', 'Tabby', 0, 6, 'small', 3.00, 'male', 'Orange Tabby', 'Curious kitten who loves to play and explore. Very social and loves attention.', ARRAY['Curious', 'Playful', 'Social', 'Energetic'], '{"vaccinated": false, "neutered": false, "microchipped": false, "health_issues": "Too young for some procedures"}', 100.00, 2),
('Max', 'dog', 'German Shepherd', 4, 0, 'large', 80.00, 'male', 'Brown and Black', 'Intelligent and protective dog great with children. Needs an experienced owner.', ARRAY['Intelligent', 'Protective', 'Loyal', 'Trainable'], '{"vaccinated": true, "neutered": true, "microchipped": true, "health_issues": "Mild hip dysplasia"}', 300.00, 3),
('Mittens', 'cat', 'Siamese', 2, 0, 'medium', 9.00, 'female', 'Cream and Brown', 'Vocal and social cat who loves attention. Very interactive and communicative.', ARRAY['Vocal', 'Social', 'Interactive', 'Attention-seeking'], '{"vaccinated": true, "neutered": true, "microchipped": true, "health_issues": "None known"}', 175.00, 3);

-- Insert sample pet images
INSERT INTO pet_images (pet_id, image_url, is_primary) VALUES
(1, '/images/pets/buddy-1.jpg', true),
(1, '/images/pets/buddy-2.jpg', false),
(1, '/images/pets/buddy-3.jpg', false),
(2, '/images/pets/luna-1.jpg', true),
(2, '/images/pets/luna-2.jpg', false),
(3, '/images/pets/charlie-1.jpg', true),
(3, '/images/pets/charlie-2.jpg', false),
(4, '/images/pets/whiskers-1.jpg', true),
(5, '/images/pets/max-1.jpg', true),
(5, '/images/pets/max-2.jpg', false),
(6, '/images/pets/mittens-1.jpg', true);

-- Insert sample service providers
INSERT INTO service_providers (name, service_type, address, city, state, zip_code, phone, email, website, description, pricing_info, user_id) VALUES
('Pet Veterinary Clinic', 'veterinary', '321 Health Street', 'New York', 'NY', '10002', '(555) 456-7890', 'info@petvetclinic.com', 'www.petvetclinic.com', 'Full-service veterinary clinic with experienced doctors', '{"checkup": 75, "vaccination": 45, "surgery": 500}', 4),
('Pampered Pets Grooming', 'grooming', '654 Beauty Lane', 'Los Angeles', 'CA', '90211', '(555) 567-8901', 'book@pamperedpets.com', 'www.pamperedpets.com', 'Professional pet grooming services', '{"basic_groom": 45, "full_service": 85, "nail_trim": 15}', 5),
('Happy Tails Training', 'training', '987 Training Way', 'Chicago', 'IL', '60602', '(555) 678-9012', 'train@happytails.com', 'www.happytails.com', 'Expert pet training and behavior modification', '{"basic_obedience": 60, "private_session": 100, "puppy_class": 120}', NULL),
('Cozy Pet Boarding', 'boarding', '147 Comfort Road', 'Houston', 'TX', '77001', '(555) 789-0123', 'stay@cozypetboarding.com', 'www.cozypetboarding.com', 'Safe and comfortable pet boarding facility', '{"daily_rate": 35, "weekly_rate": 210, "monthly_rate": 800}', NULL);

-- Insert sample adoption applications
INSERT INTO adoption_applications (pet_id, user_id, status, application_data, notes) VALUES
(1, 1, 'under_review', '{"housing": "house", "yard": true, "other_pets": false, "experience": "yes", "references": ["Dr. Smith", "Jane Neighbor"]}', 'Application looks promising, scheduling home visit'),
(3, 2, 'approved', '{"housing": "apartment", "yard": false, "other_pets": true, "experience": "yes", "references": ["Dr. Johnson", "Pet Sitter Pro"]}', 'Approved for adoption, waiting for pickup'),
(5, 1, 'pending', '{"housing": "house", "yard": true, "other_pets": false, "experience": "yes", "references": ["Dr. Smith", "Jane Neighbor"]}', 'New application, needs initial review');

-- Insert sample saved pets
INSERT INTO saved_pets (user_id, pet_id) VALUES
(1, 1),
(1, 2),
(1, 5),
(2, 3),
(2, 4),
(2, 6);

-- Insert sample appointments
INSERT INTO appointments (user_id, service_provider_id, appointment_date, appointment_time, service_type, pet_name, status, notes) VALUES
(1, 1, '2024-02-15', '10:00:00', 'checkup', 'My Dog', 'confirmed', 'Annual wellness exam'),
(2, 2, '2024-02-18', '14:00:00', 'grooming', 'My Cat', 'scheduled', 'Full grooming service requested'),
(1, 3, '2024-02-20', '16:00:00', 'training', 'Buddy', 'scheduled', 'Basic obedience training');

-- Insert sample reviews
INSERT INTO reviews (user_id, service_provider_id, rating, review_text) VALUES
(1, 1, 5, 'Excellent veterinary care! Dr. Chen was very thorough and caring with my pet.'),
(2, 2, 4, 'Great grooming service. My cat looks amazing and the staff was very gentle.'),
(1, 3, 5, 'Outstanding training program. My dog learned so much and the trainer was very knowledgeable.');
