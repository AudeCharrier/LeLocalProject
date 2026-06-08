DROP TABLE IF EXISTS `space`;

CREATE TABLE `space` (
  `id` int NOT NULL AUTO_INCREMENT,
  `space_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `capacity` int NOT NULL,
  `url_image` varchar(255) NOT NULL,
  `price_unit` decimal(10,2) NOT NULL,
  `space_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `space` WRITE;

INSERT INTO `space` VALUES (1,'Amphithéâtre','Espace ouvert pour rencontres et conférences',300,'/assets/images/amphitheater.png',100.00,'Evenements'),(2,'OpenSpace Principal','Grand espace lumineux de 200m² avec vue sur la cour intérieure végétalisée',60,'/assets/images/openspace.png',8.00,'Coworking'),(3,'Studio d\'enregistrement','Cabine insonorisée avec régie son et matériel haut de gamme',1,'http',25.00,'Ateliers'),(4,'Salle de réunion','Salle cofnérences équipée pour workshops, présentations et réunions client',1,'/assets/images/meeting-room.png',20.00,'Coworking'),(5,'Studio photo','Studio photo avec fonds colorés, lumières Profoto et espace de shoot',1,'/assets/images/photo-studio.png',35.00,'Ateliers'),(6,'Salle de concert','Grande salle pour show musical avec scène surélevée.',150,'/assets/images/concert-hall.png',500.00,'Evenements');

UNLOCK TABLES;


DROP TABLE IF EXISTS `time_slot`;

CREATE TABLE `time_slot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slot` varchar(255) NOT NULL,
  `start_hour` time NOT NULL,
  `end_hour` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `time_slot` WRITE;

INSERT INTO `time_slot` VALUES (1,'morning','08:00:00','14:00:00'),(2,'afternoon','14:00:00','20:00:00');

UNLOCK TABLES;


DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(45) NOT NULL,
  `email` varchar(150) NOT NULL,
  `lastname` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fortgot_password` varchar(255) NOT NULL,
  `city` varchar(150) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  `profile_image` text,
  `firstname` varchar(150) NOT NULL,
  `signing_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phonr_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES users WRITE;

INSERT INTO users VALUES (1,'0123456789','nina.richard@lelocal.fr','Richard','gfgfgd','gfgfdgfd',NULL,NULL,'admin',NULL,'Nina','2026-05-01 00:00:00'),(2,'9876543210','bob.arley@gmail.com','Marley','fgfdgdfgfd','gfgfdgf',NULL,NULL,'client',NULL,'Bob','2026-05-04 00:00:00');

UNLOCK TABLES;

DROP TABLE IF EXISTS `activity`;

CREATE TABLE `activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time_slot_id` int NOT NULL,
  `space_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `description` text,
  `price_unit` int DEFAULT '0',
  `url_image` varchar(255) NOT NULL,
  `name` varchar(155) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_time_slot_has_space_space_idx` (`space_id`),
  KEY `fk_time_slot_has_space_time_slot_idx` (`time_slot_id`),
  CONSTRAINT `fk_time_slot_has_space_space` FOREIGN KEY (`space_id`) REFERENCES `space` (`id`),
  CONSTRAINT `fk_time_slot_has_space_time_slot` FOREIGN KEY (`time_slot_id`) REFERENCES `time_slot` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `activity` WRITE;

INSERT INTO `activity` VALUES (1,2,1,'2026-05-12','2026-05-12','Pitchez votre projet en 3 minutes devant la communauté Le Local. Bières artisanales offertes.',0,'https://images.unsplash.com/photo-1767475048019-4cbf6d914472?w=800&h=600&fit=crop&auto=format','Soirée Pitch & Bière'),(2,2,1,'2026-06-18','2026-06-18','Construisez votre première app sans écrire une ligne de code.',5,'https://images.unsplash.com/photo-1777559542626-a72e0ee96eca?w=800&h=600&fit=crop&auto=format','Workshop No Code'),(3,2,1,'2026-06-25','2026-06-25','Rencontre mensuelle des makers, fabbers et bricoleurs du 11e. Show and tell libre.',0,'https://images.unsplash.com/photo-1715593948000-adbdf0cee759?w=800&h=600&fit=crop&auto=format','Rencontres Makers'),(4,2,6,'2026-05-04','2026-05-04','Musique expérimentale et électro-acoustique dans un cadre industriel unique.',10,'http','Concert intimiste'),(5,1,3,'2026-06-01','2026-06-01','space descr... meme pb space price',25,'http','space name'),(6,2,3,'2026-06-01','2026-06-01','space descr... meme pb space price',25,'http','space name'),(7,1,2,'2026-06-11','2026-06-11','space descr... meme pb space price',8,'http','space name'),(8,2,2,'2026-06-11','2026-06-11','space descr... meme pb space price',8,'http','space name');

UNLOCK TABLES;



DROP TABLE IF EXISTS `booking`;

CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `bills_number` int NOT NULL,
  `quantity` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `id_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bills_number_UNIQUE` (`bills_number`),
  KEY `fk_booking_users_idx` (`users_id`),
  CONSTRAINT `fk_booking_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `booking` WRITE;

INSERT INTO `booking` VALUES (1,2,1,1,0.00,1),(2,2,2,1,5.00,2),(3,2,3,1,0.00,3),(4,2,4,5,50.00,4),(5,2,5,1,25.00,5),(6,2,6,1,25.00,8);

UNLOCK TABLES;


DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  `users_id` int NOT NULL,
  `id_activity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart_users_idx` (`users_id`),
  CONSTRAINT `fk_cart_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `cart` WRITE;
UNLOCK TABLES;


DROP TABLE IF EXISTS `claim`;

CREATE TABLE `claim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `category` varchar(150) NOT NULL,
  `message` varchar(100) NOT NULL,
  `claim_date` varchar(100) NOT NULL,
  `users_id` int NOT NULL,
  `activity_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_claim_users_idx` (`users_id`),
  KEY `fk_claim_activity_idx` (`activity_id`),
  CONSTRAINT `fk_claim_activity` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`),
  CONSTRAINT `fk_claim_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `claim` WRITE;

UNLOCK TABLES;



