INSERT INTO main.users
(userid, emaildsc, isadminflg, wishesflg, foodflg, calendarflg, firstnameval, lastnameval, auth0id)
VALUES
( $1, $2, 0, 0, 0, 0, $3, $4, $5 )
RETURNING *;
