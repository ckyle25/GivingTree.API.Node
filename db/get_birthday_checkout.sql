SELECT
(SELECT firstnameval from wishes_users where userid = $1) AS birthdayperson
,(SELECT birthdaydt from wishes_users where userid = $1) AS birthdaydt
,wu.firstnameval
,u.emaildsc
FROM wishes.users wu
	LEFT JOIN main.users u
		ON u.userid = wu.edwuserid
WHERE familyid = ANY($2::int[])
AND u.emaildsc IS NOT NULL
