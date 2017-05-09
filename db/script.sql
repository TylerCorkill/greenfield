CREATE DATABASE IF NOT EXISTS `piranha`;

USE piranha;

CREATE TABLE IF NOT EXISTS `itineraries` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `start` TEXT NOT NULL,
  `end` TEXT NOT NULL,
  `userId` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE  IF NOT EXISTS `locations` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(200) NOT NULL ,
  `visitDate` TEXT NOT NULL,
  `time` TEXT NOT NULL,
  `longitude` DOUBLE NOT NULL,
  `latitude` DOUBLE NOT NULL,
  `id_itineraries` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `events` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(200) NOT NULL,
  `time` TEXT NOT NULL,
  `description` TEXT NOT NULL ,
  `id_locations` INTEGER NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `locations` ADD FOREIGN KEY (id_itineraries) REFERENCES `itineraries` (`id`);
ALTER TABLE `events` ADD FOREIGN KEY (id_locations) REFERENCES `locations` (`id`);

