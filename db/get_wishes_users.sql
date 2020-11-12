SELECT
	wu.userid
	,wu.familyid
	,wu.isparentflg
	,wu.biographytxt
	,wu.firstnameval
	,wu.lastnameval
	,wf.familynm
	,wf.familygroupid
FROM wishes.users wu
JOIN wishes.family wf
	ON wu.familyid = wf.familyid
