SELECT
userid
,edwuserid
,familyid
,isparentflg
,biographytxt
,firstnameval
,lastnameval
,isadminflg
,accessgroup1flg
,accessgroup2flg
,accessgroup3flg
,accessgroup4flg
,amazonwishlistid
FROM wishes.users
WHERE edwuserid = $1
