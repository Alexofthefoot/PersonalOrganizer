DROP DATABASE ALEX; CREATE DATABASE IF NOT EXISTS ALEX;
USE ALEX;

-- Tarot Section --
CREATE TABLE IF NOT EXISTS decks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deck_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deck_id INT,
    reading_date DATE,
    notes TEXT,
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

        -- /images/...