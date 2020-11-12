UPDATE wishes.wishes
SET completedflg = 1,
reservedflg = 0,
reserveduserid = 0
WHERE wishid = $1;
