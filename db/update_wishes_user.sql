UPDATE wishes.users
SET edwuserid = $2,
familyid = $3,
isparentflg = $4,
firstnameval = $5,
lastnameval = $6,
isadminflg  = $7,
birthdaydt = $8,
anniversarydt = $9,
accessgroup1flg = $10,
accessgroup2flg = $11,
accessgroup3flg = $12,
accessgroup4flg = $13
WHERE userid = $1
