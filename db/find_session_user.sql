SELECT
userid
,isadminflg
,wishesflg
,foodflg
,calendarflg
,firstnameval
,lastnameval
FROM main.users
WHERE userid = $1;
