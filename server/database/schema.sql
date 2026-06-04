CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  phone_number VARCHAR(45) NOT NULL,
  email VARCHAR(150) NOT NULL,
  lastname VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL,
  fortgot_password VARCHAR(255) NOT NULL,
  city VARCHAR(150) NULL,
  adress VARCHAR(255) NULL,
  role ENUM('admin', 'client') NOT NULL DEFAULT 'client',
  profile_image TEXT NULL,
  firstname VARCHAR(150) NOT NULL,
  signing_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE,
  UNIQUE INDEX phonr_number_UNIQUE (phone_number ASC) VISIBLE)
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS time_slot (
  id INT NOT NULL AUTO_INCREMENT,
  slot VARCHAR(255) NOT NULL,
  start_hour TIME NOT NULL,
  end_hour TIME NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS space (
  id INT NOT NULL AUTO_INCREMENT,
  space_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  capacity INT NOT NULL,
  url_image VARCHAR(255) NOT NULL,
  price_unit DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS activity (
  id INT NOT NULL AUTO_INCREMENT,
  time_slot_id INT NOT NULL,
  space_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT NOT NULL,
  price_unit INT NOT NULL,
  url_image VARCHAR(255) NOT NULL,
  name VARCHAR(155) NOT NULL,
  PRIMARY KEY (id, time_slot_id, space_id),
  INDEX fk_time_slot_has_space_space1_idx (space_id ASC) VISIBLE,
  INDEX fk_time_slot_has_space_time_slot1_idx (time_slot_id ASC) VISIBLE,
  CONSTRAINT fk_time_slot_has_space_time_slot1
    FOREIGN KEY (time_slot_id)
    REFERENCES time_slot (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_time_slot_has_space_space1
    FOREIGN KEY (space_id)
    REFERENCES space (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS claim (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(150) NOT NULL,
  message VARCHAR(100) NOT NULL,
  claim_date VARCHAR(100) NOT NULL,
  users_id INT NOT NULL,
  activity_id INT NOT NULL,
  PRIMARY KEY (id, activity_id, users_id),
  INDEX fk_claim_users_idx (users_id ASC) VISIBLE,
  INDEX fk_claim_activity1_idx (activity_id ASC) VISIBLE,
  CONSTRAINT fk_claim_users
    FOREIGN KEY (users_id)
    REFERENCES users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_claim_activity1
    FOREIGN KEY (activity_id)
    REFERENCES activity (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS cart (
  id INT NOT NULL AUTO_INCREMENT,
  quantity VARCHAR(45) NULL,
  total_price VARCHAR(45) NULL,
  users_id INT NOT NULL,
  id_activity INT NULL,
  PRIMARY KEY (id, users_id),
  INDEX fk_cart_users1_idx (users_id ASC) VISIBLE,
  CONSTRAINT fk_cart_users1
    FOREIGN KEY (users_id)
    REFERENCES users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS booking (
  id INT NOT NULL AUTO_INCREMENT,
  users_id INT NOT NULL,
  bills_number INT NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  id_activity INT NOT NULL,
  PRIMARY KEY (id, users_id),
  INDEX fk_booking_users1_idx (users_id ASC) VISIBLE,
  UNIQUE INDEX bills_number_UNIQUE (bills_number ASC) VISIBLE,
  CONSTRAINT fk_booking_users1
    FOREIGN KEY (users_id)
    REFERENCES users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;