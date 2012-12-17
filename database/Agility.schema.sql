-- Agility
-- 2012

CREATE DATABASE agility;
CREATE USER 'agility'@localhost IDENTIFIED BY "agility";
GRANT ALL PRIVILEGES ON agility.* TO 'agility'@localhost;
FLUSH PRIVILEGES;

USE agility;


CREATE TABLE `users` (
    `id`                    INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email`                 VARCHAR(50) NOT NULL,
    `password`              VARCHAR(68) NOT NULL,
    `created_at`            TIMESTAMP NOT NULL,
    `modified_at`           TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `projects` (
    `id`                    INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`                  VARCHAR(25) NOT NULL,
    `private`               BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `users_projects` (
    `user_id`               INT UNSIGNED NOT NULL,
    `project_id`            INT UNSIGNED NOT NULL,
    FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;