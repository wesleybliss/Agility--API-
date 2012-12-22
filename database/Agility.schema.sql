/*
Agility

-- BASE CREATE TABLE ------------------------------------------------

CREATE TABLE table (
    `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at`                TIMESTAMP NOT NULL,
    `modified_at`               TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

DROP DATABASE IF EXISTS `agility`;
CREATE DATABASE IF NOT EXISTS `agility`;

-- CREATE USER 'agility'@localhost IDENTIFIED BY "agility";
-- GRANT ALL PRIVILEGES ON agility.* TO 'agility'@localhost;
-- FLUSH PRIVILEGES;

USE agility;


CREATE TABLE `users` (
    `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email`                     VARCHAR(50) NOT NULL,
    `password`                  VARCHAR(68) NOT NULL,
    `first_name`                VARCHAR(25) NOT NULL,
    `last_name`                 VARCHAR(25),
    `admin`                     TINYINT(1) NOT NULL DEFAULT 0,
    `last_login`                TIMESTAMP,
    `verified`                  TINYINT(1) NOT NULL DEFAULT 0,
    `created_at`                TIMESTAMP NOT NULL,
    `modified_at`               TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `projects` (
    `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`                      VARCHAR(25) NOT NULL,
    `private`                   TINYINT(1) NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*
Permissions
    -3      View stories only, no users or comments
    -2      View stories and comments, no users
    -1      View stories and users, no comments
    0       View stories, users, and comments, but not all members
    1       View stories and members
    2       View & edit stories, view members
    3       View & edit stories and members
*/
CREATE TABLE `users_projects` (
    `user_id`                   INT UNSIGNED NOT NULL,
    `project_id`                INT UNSIGNED NOT NULL,
    `permissions`               INT NOT NULL DEFAULT 1,
    FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Feature, bug, task, etc.
CREATE TABLE `story_types` (
    `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `label`                     VARCHAR(25),
    `locked`                    TINYINT(1) NOT NULL DEFAULT 0,
    `created_at`                TIMESTAMP NOT NULL,
    `modified_at`               TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Waiting, started, finished, delivered, accepted, rejected, etc.
CREATE TABLE `story_statuses` (
    `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `label`                     VARCHAR(25),
    `locked`                    TINYINT(1) NOT NULL DEFAULT 0,
    `created_at`                TIMESTAMP NOT NULL,
    `modified_at`               TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Usually will apply to stories, but can be used anywhere
CREATE TABLE `labels` (
    `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`                      VARCHAR(25),
    `created_at`                TIMESTAMP NOT NULL,
    `modified_at`               TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `stories` (
    `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `project_id`                INT UNSIGNED NOT NULL,
    `story_type_id`             INT UNSIGNED NOT NULL,
    `story_status_id`           INT UNSIGNED NOT NULL,
    `requester_id`              INT UNSIGNED NOT NULL,
    `owner_id`                  INT UNSIGNED NOT NULL,
    `title`                     VARCHAR(255) NOT NULL,
    `description`               TEXT,
    `points`                    INT NOT NULL DEFAULT 0,
    `created_at`                TIMESTAMP NOT NULL,
    `modified_at`               TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`story_type_id`)
        REFERENCES `story_types` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`story_status_id`)
        REFERENCES `story_statuses` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`requester_id`)
        REFERENCES `users` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`owner_id`)
        REFERENCES `users` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `stories_labels` (
    `story_id`                  INT UNSIGNED NOT NULL,
    `label_id`                  INT UNSIGNED NOT NULL,
    `created_at`                TIMESTAMP NOT NULL,
    `modified_at`               TIMESTAMP NOT NULL,
    KEY (`story_id`),
    KEY (`label_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- A subset of tasks within a story
CREATE TABLE `tasks` (
    `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `author_id`                 INT UNSIGNED NOT NULL,
    `story_id`                  INT UNSIGNED NOT NULL,
    `description`               VARCHAR(255),
    `created_at`                TIMESTAMP NOT NULL,
    `modified_at`               TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`author_id`)
        REFERENCES `users` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`story_id`)
        REFERENCES `stories` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Within stories
CREATE TABLE `comments` (
    `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `author_id`                 INT UNSIGNED NOT NULL,
    `story_id`                  INT UNSIGNED NOT NULL,
    `message`                   TEXT NOT NULL,
    `created_at`                TIMESTAMP NOT NULL,
    `modified_at`               TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`author_id`)
        REFERENCES `users` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`story_id`)
        REFERENCES `stories` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Within stories
CREATE TABLE `attachments` (
    `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `author_id`                 INT UNSIGNED NOT NULL,
    `story_id`                  INT UNSIGNED NOT NULL,
    `path`                      VARCHAR(255) NOT NULL,
    `created_at`                TIMESTAMP NOT NULL,
    `modified_at`               TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`author_id`)
        REFERENCES `users` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`story_id`)
        REFERENCES `stories` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;