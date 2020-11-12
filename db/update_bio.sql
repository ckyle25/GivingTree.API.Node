UPDATE wishes.users
SET biographytxt = $2
WHERE userid = $1;
