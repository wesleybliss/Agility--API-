-- Get all projects for a given user ID
SELECT `p`.*
FROM `projects` `p`, `users_projects` `up`
WHERE `up`.`user_id` = 1
AND `up`.`project_id` = `p`.`id`;


SELECT * FROM users u
JOIN users_projects up ON up.user_id = u.id
JOIN projects p ON up.project_id = p.id
LIMIT 2;