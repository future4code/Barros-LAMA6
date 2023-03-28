-- Active: 1677514415647@@35.226.146.116@3306@jbl-4416257-giovana-vieira
CREATE TABLE IF NOT EXISTS lama_users (
    id VARCHAR(255) PRIMARY KEY, 
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    role ENUM("admin", "normal") NOT NULL DEFAULT "normal"
);

CREATE TABLE IF NOT EXISTS lama_bands (
    id VARCHAR(255) PRIMARY KEY, 
    name VARCHAR(100) NOT NULL UNIQUE,
    music_genre VARCHAR(100) NOT NULL,
    responsible VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS lama_shows (
    id VARCHAR(255) PRIMARY KEY,
    week_day ENUM("friday", "saturday", "sunday") NOT NULL, 
    start_time TIME NOT NULL,
    end_time TIME NOT NULL, 
    band_id VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (band_id) REFERENCES lama_bands (id)
);
