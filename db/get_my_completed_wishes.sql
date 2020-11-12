SELECT
ww.wishid
,ww.titledsc
,ww.costamt
,ww.linktxt
,ww.descriptiondsc
,ww.ratingnbr
,ww.userid
,wu.firstnameval
,ww.reservedflg
,ww.reserveduserid
,ww.completedflg
,wf.parent1wishesuserid
,wf.parent2wishesuserid
FROM wishes.wishes ww
	LEFT JOIN wishes.users wu
		on wu.userid = ww.userid
	LEFT JOIN wishes.family wf
		on wf.familyid = wu.familyid
WHERE ww.userid = $1
AND ww.completedflg = 1
