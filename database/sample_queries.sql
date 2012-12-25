-- Get all projects for a given user ID
SELECT `p`.*
FROM `projects` `p`, `users_projects` `up`
WHERE `up`.`user_id` = 1
AND `up`.`project_id` = `p`.`id`;


SELECT * FROM users u
JOIN users_projects up ON up.user_id = u.id
JOIN projects p ON up.project_id = p.id
LIMIT 2;


SELECT s.id, s.title, s.description,
    s.points, s.created_at, s.modified_at,
    p.*, st.*, ss.*, r.id as requester_id, r.email, r.first_name,
    r.last_name, o.id as owner_id, o.email, o.first_name, o.last_name
FROM stories s
LEFT JOIN projects p ON s.project_id = p.id
LEFT JOIN story_types st ON s.story_type_id = st.id
LEFT JOIN story_statuses ss ON s.story_status_id = ss.id
LEFT JOIN users r ON s.requester_id = r.id
LEFT JOIN users o ON s.owner_id = o.id;


-- Get stories + extra project info for each
SELECT
    s.id            AS `id`,
    s.title         AS `title`,
    s.description   AS `description`,
    s.points        AS `points`,
    p.name          AS `project_name`,
    st.label        AS `type`,
    ss.label        AS `status`,
    r.id            AS `requester_id`,
    r.email         AS `requester_email`,
    r.first_name    AS `requester_first_name`,
    r.last_name     AS `requester_last_name`,
    o.id            AS `owner_id`,
    o.email         AS `owner_email`,
    o.first_name    AS `owner_first_name`,
    o.last_name     AS `owner_last_name`
FROM stories `s`
LEFT JOIN `projects`        `p`     ON s.project_id = p.id
LEFT JOIN `story_types`     `st`    ON s.story_type_id = st.id
LEFT JOIN `story_statuses`  `ss`    ON s.story_status_id = ss.id
LEFT JOIN `users`           `r`     ON s.requester_id = r.id
LEFT JOIN `users`           `o`     ON s.owner_id = o.id;