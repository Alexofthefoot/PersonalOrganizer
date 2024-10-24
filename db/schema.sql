-- Not the current layout, starting with something simpler while I learn. Come back to this one later. 


DROP DATABASE ALEX; CREATE DATABASE IF NOT EXISTS ALEX;
USE ALEX;


-- Wardrobe Section --
CREATE TABLE IF NOT EXISTS wardrobe_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS wardrobe_cities (
	id INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(50)
);
INSERT INTO wardrobe_cities (city_name) VALUES ('Vancouver');
INSERT INTO wardrobe_cities (city_name) VALUES ('Seattle');

CREATE TABLE IF NOT EXISTS wardrobe_items (
	id INT AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(100) NOT NULL,
    price DECIMAL(7,2),
    category_id INT,
    location_id INT DEFAULT 1,
    brand VARCHAR(50),
    material VARCHAR(50),
    diy BOOLEAN DEFAULT FALSE,
    date_purchased DATE,
    last_worn DATE,
    is_favourite BOOLEAN,
    notes TEXT,
    FOREIGN KEY (category_id) REFERENCES wardrobe_categories(id) ON DELETE SET NULL,
    FOREIGN KEY (location_id) REFERENCES wardrobe_cities(id) ON DELETE SET NULL
);




-- Tarot Section --
CREATE TABLE IF NOT EXISTS decks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deck_name VARCHAR(50) NOT NULL,
    publisher VARCHAR(50),
    notes TEXT(300),
    alt_cups VARCHAR(50),
    alt_wands VARCHAR(50),
    alt_pentacles VARCHAR(50),
    alt_swords VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deck_id INT,
    reading_date DATE,
    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deck_id INT,
    image_path VARCHAR(50),  -- START WITH /images
    arcana ENUM('Minor', 'Major'),
    card_name VARCHAR(25),
    card_value VARCHAR(5)
);

CREATE TABLE IF NOT EXISTS reading_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reading_id INT,
    card_id INT,
    FOREIGN KEY (reading_id) REFERENCES readings(id) ON DELETE SET NULL,
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS keywords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_id INT,
    keyword VARCHAR(100),
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS card_interpretations (
    id INT PRIMARY KEY,
    card_id INT,
    reading_id INT,
    interpretation VARCHAR(500),
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
    FOREIGN KEY (reading_id) REFERENCES readings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS interpretations (
    id INT PRIMARY KEY,
    reading_id INT,
    interpretation TEXT(500),
    FOREIGN KEY (reading_id) REFERENCES readings(id) ON DELETE CASCADE
);

--                  /images/...