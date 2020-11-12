SELECT
emaildsc
FROM main.users
WHERE userid = (SELECT edwuserid FROM wishes_users WHERE userid = $1)
