UPDATE wishes.family
SET familynm = $2,
parent1wishesuserid = $3,
parent2wishesuserid = $4,
familygroupid = $5
WHERE familyid = $1
