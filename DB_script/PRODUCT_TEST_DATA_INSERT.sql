INSERT INTO PRD(
	PRD_NO,
    SELLER_CODE,
    PRD_CODE,
    PRD_NM,
    PRD_DETAIL,
    PRD_PRICE,
    PRD_SCORE,
    PRD_RP,
    PRD_SIGN,
    PRD_SALE
) VALUES(
	1000,
    100,
    '1-1',
    'TEST가구',
    'TEST가구디테일',
    200,
    0,
    0,
    "2023-08-09",
    0.5
);
SELECT * FROM PRD;
INSERT INTO BASKET(
	ID,
    PRD_NO
)
VALUES(
	1,
    10002
);
INSERT INTO BASKET(
	ID,
    PRD_NO
)
VALUES(
	1,
    10001
);

delete from BASKET where PRD_NO=1000 OR PRD_NO=8;
SELECT * FROM BASKET