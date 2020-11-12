UPDATE wishes.wishes
SET completedflg = 0
WHERE wishid = $1;
