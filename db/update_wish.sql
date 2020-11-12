UPDATE wishes.wishes
SET titledsc = $1
,descriptiondsc = $2
,costamt = $3
,linktxt = $4
,ratingnbr = $5
WHERE wishid = $6
