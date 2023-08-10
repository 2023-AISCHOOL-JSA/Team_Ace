INSERT INTO SEQUENCES VALUES (0, 0, 0, 0, 0, 0);
SELECT * FROM PRD;

ALTER TABLE PRD_IMG MODIFY SELLER_CODE INT(8);

UPDATE PRD_IMG SET SELLER_CODE = '1' WHERE SELLER_CODE = 'QWE';

INSERT INTO PRD_IMG_IMG VALUES (8,'/assets/img/8.jpg');
SELECT * FROM PRD;
SELECT * FROM PRD_IMG;

SELECT D.IMG_PATH, C.PRD_NO, C.CNT
  FROM (SELECT A.PRD_NO, A.PRD_RP/COUNT(*) AS CNT
		  FROM PRD A, PRD_ST B
		 WHERE A.PRD_NO = B.PRD_NO
		 GROUP BY B.PRD_NO) C , PRD_IMG D
 WHERE D.PRD_NO = C.PRD_NO
 ORDER BY CNT DESC
 LIMIT 10;

SELECT B.IMG_PATH, A.PRD_NO, A.PRD_SIGN
  FROM (SELECT PRD_NO, PRD_SIGN
		  FROM PRD
		 WHERE PRD_SIGN > CURDATE()-100) A, PRD_IMG B
 WHERE A.PRD_NO = B.PRD_NO
 ORDER BY PRD_SIGN DESC
 LIMIT 10;

SELECT B.IMG_PATH, A.PRD_NO, A.PRD_SALE
  FROM (SELECT PRD_NO, PRD_SALE
		  FROM PRD
		 WHERE PRD_SALE > 0) A, PRD_IMG B
 WHERE A.PRD_NO = B.PRD_NO
 ORDER BY PRD_SALE DESC
 LIMIT 10;





select A.PRD_IMG_RP/(SELECT COUNT(*) FROM B GROUP BY B.PRD_IMG_NO)
                    from PRD_IMG A, PRD_IMG_ST B;
                    
SELECT PRD_IMG_NO, COUNT(*) FROM PRD_IMG_ST GROUP BY PRD_NO;
SELECT PRD_NO FROM PRD WHERE PRD_SIGN > CURDATE()-100 ;

SELECT PRD_NO, PRD_SALE FROM PRD WHERE PRD_SALE > 0 ;

SELECT PRD_TYPE, COUNT(*) AS 상품타입별개수, MAX(PRD_AMT) AS 상품별최고가
  FROM TB_PRD
GROUP BY PRD_TYPE;

INSERT INTO `ORDER` VALUES ( 1, '1', 1, 1, 1, '1', '1', '1', '1', '1', '1', sysdate(), '1' );
select * from `ORDER`;

delete from `ORDER` where ORDER_NO = 0;
INSERT INTO `ORDER` VALUES ( (select ORDER_NO from SEQUENCES), '1', 1, 1, 1, '1', '1', '1', '1', '1', '1', sysdate(), '1' );
select ORDER_NO from SEQUENCES;
select * from SEQUENCES;
INSERT INTO `ORDER` VALUES ( (select ORDER_NO from SEQUENCES), '1', 1, 1, 1, '1', '1', '1', '1', '1', '1', sysdate(), '1' );
update SEQUENCES set ORDER_NO = ORDER_NO + 1 where 1=1;

set sql_safe_updates=0;
DELETE FROM PRD WHERE 1=1;
SELECT * FROM PRD;
ALTER TABLE PRD MODIFY PRD_SCORE FLOAT;
-- 이케아 : 1 , 한샘 : 2 , 리바트 : 3
-- 책상
--                    no,sc,pc
INSERT INTO PRD VALUES (10001,1,'책상','UTESPELARE 우테스펠라레','가장 심플한 블랙 디자인의 책상입니다.',179000,4.5,10,'2023-06-10',0.03),
(10002,1,'책상','LAGKAPTEN 락캅텐 / ALEX 알렉스','수납공간이 많고 화이트 디자인의 깔끔한 책상입니다.',161900,4.3,11,'2023-03-10',0.07),
(10003,1,'책상','FELFRITT 펠프리트','관리가 편하고 내구성이 뛰어난 천연소재인 대나무로 만들었어요.',29900,4.6,12,'2023-03-15',0.03),
(10004,1,'책상','BEKANT 베칸트','여러 해 동안 열정적으로 일해도 변함없이 견고한 책상입니다. 작업 공간이 넉넉하며 책상 밑의 전선을 깔끔하게 정리할 수 있는 스마트한 솔루션을 갖추고 있습니다.',249900,4.4,13,'2023-01-09',0),
(10005,1,'책상','IDÅSEN 이도센','여러 해 동안 열정적으로 일해도 변함없이 견고한 책상입니다. 작업 공간이 넉넉하며 책상 밑의 전선을 깔끔하게 정리할 수 있는 스마트한 솔루션을 갖추고 있습니다.',879000,4.2,3,'2022-09-12',0.09),
(10006,2,'책상','한샘 플렉스Z 컴퓨터책상 1200 D80','집중이 필요할 때, 그리고 휴식이 필요할때 플렉스Z는 기본에 충실한 아이템입니다.',223000,4.3,6,'2021-06-10',0.05),
(10007,2,'책상','한샘 티오 책상 일반형 120cm','독보적인, 가성비 베이직하고 심플한 디자인의 튼튼한 구조를 지닌 책상입니다.',122000,4.7,9,'2021-09-10',0.11),
(10008,2,'책상','한샘 티오 책상장 LED 스터디 조명 80cm','공부하기에 좋은 환경을 구성할 수 있는 책상입니다.',129000,4.5,10,'2022-12-10',0.08),
(10009,2,'책상','한샘 샘 책상 150cm 하부서랍형 시공','심플하고 간결한 기본 디자인 바탕에 색다른포인트를 가미한 책상입니다.',279000,4.4,5,'2023-01-10',0.09),
(10010,2,'책상','한샘 티오 ㄱ자책상 160cm','넓은 작업 공간과 함께 컴퓨터 본체나 책등 수납할게 많은 분들위한 책상입니다.',257000,4.5,2,'2023-02-13',0.15),
(10011,3,'책상', '리바트 버킨 책상', '학생부터 성인까지 필요에 따라 구성해보세요.', 271000, 4.3, 6, '2023-04-17',0.05),
(10012,3,'책상','리바트 오브제 컴퓨터 책상', '책상 하나로 인테리어가 되는 생활공간', 115000, 4.2, 8, '2023-01-21',0.07),
(10013,3,'책상','리바트 프렌즈 스틸 1500 책상', 'LPM 강화 코팅으로 오염에 강한 상판', 139000, 4.5, 12, '2023-05-10', 0.03),
(10014,3,'책상','리바트 재택근무 책상', '재택근무에 최적화된 인테리어 책상', 165000, 4.7, 15, '2023-03-31', 0.02),
(10015,3,'책상','리바트 뉴리브로 단독책상', '개방적인 스틸프레임 구조와 모노톤 컬러로 구성', 301000, 4.6, 11, '2023-06-25', 0),

-- 이케아 : 1 , 한샘 : 2 , 리바트 : 3
-- 침대
--                    no,sc,pc
(10016,1,'침대','NESTTUN 네스툰','가장 심플한 기본디자인의 침대입니다.',184000,4.4,14,'2021-09-10',0),
(10017,1,'침대','SONGESAND 송에산드','유행을 타지않는 클랙식한 디자인의 침대입니다.',304000,4.2,11,'2020-12-10',0.08),
(10018,1,'침대','ASKVOLL 아스크볼','디자인이 깔끔하고 심플해서 텍스타일이나 다른 홈퍼니싱 소품이 돋보이도록 배경이 되어 줍니다. 침대헤드가 낮아서 침대 창가나 경사진 천장 밑에 두기에 좋습니다.',324000,4.1,8,'2023-08-04',0.03),
(10019,1,'침대','NORDLI 노르들리','디자인이 깔끔하고 심플해서 텍스타일이나 다른 홈퍼니싱 소품이 돋보이도록 배경이 되어 줍니다. 침대헤드가 낮아서 침대 창가나 경사진 천장 밑에 두기에 좋습니다.',429000,4.2,9,'2019-12-16',0.03),
(10020,1,'침대','MALM 말름','원목 무늬목으로 깔끔한 디자인이 돋보입니다. 독립형으로 또는 침대헤드와 함께 사용할 수 있습니다. 바퀴가 있어 쉽게 넣고 뺄 수 있는 넉넉한 수납공간도 있어 더욱 편리합니다.',429000,4.0,4,'2023-01-01',0.03),
(10021,2,'침대','한샘포엠침대 Q퀸/K킹+패널형','미니멀한 감성의 침대입니다.',744000,3.9,6,'2023-04-02',0.08),
(10022,2,'침대','한샘 아임빅 수납침대SS 일반헤드형','수납 공간을 용이하게 사용가능한 침대입니다.',605000,4.0,8,'2023-07-31',0.07),
(10023,2,'침대','한샘 포에트 호텔침대 Q/K','원룸에서 호텔급 침대를 느낄수 있습니다.',604000,4.1,9,'2022-11-20',0.05),
(10024,2,'침대','한샘 아임빅 수납침대 SS 조명헤드형','조명헤드가 포인트인 침대입니다.',514000,4.3,13,'2022-12-31',0.08),
(10025,2,'침대','한샘 클로즈 침대 Q퀸/ K킹 코튼그레이','포근한 느낌이 들수있는 침대입니다.',655000,4.5,17,'2018-09-06',0.02),

-- 이케아 : 1 , 한샘 : 2 , 리바트 : 3
-- 의자
--                    no,sc,pc
(10026,2,'의자','한샘 허드 가죽 체어','트렌디한 디자인 빈티지하고 모던한 느낌',109000,4.3,21,'2022-10-31',0.08),
(10027,2,'의자','한샘 다이브 책상의자','편안한 사이즈와 집중을 도와주는 의자', 185000,4.5,20,'2022-01-31',0.03),
(10028,2,'의자','한샘 윌링 책상의자', '인간공학 디자인 자동 조절되는 등받이 기능', 245000, 4.1, 18, '2023-01-31', 0.02),
(10029,2,'의자','한샘 샘스마트 라이트 책상의 DIY', "샘스마트의 NEW 실속형 라인업 '라이트'", 139000, 4.7, 26, '2023-06-30', 0),
(10030,2,'의자','한샘 H30 에어 책상의자', '체형과 자세에 맞추는 피팅 시스템' , 299000, 4.6, 22, '2023-07-20', 0),
(10031,3,'의자','리바트 테크닉의자', '현대리바트의 모든 기술을 담아 만든 결정판', 295000, 4.6, 24, '2023-07-20', 0.03),
(10032,3,'의자','리바트 그로잉 학생 의자 SET', '아이와 함께 자라나는 학생의자 그로잉', 219000, 4.4, 15,'2022-11-20', 0.06),
(10033,3,'의자','리바트 스탠다드 V2 의자', '표준 의자의 기준을 높인 체중 맞춤 의자', 189000, 4.2, 11, '2022-08-11', 0.05),
(10034,3,'의자','리바트 아페롤 의자', '인체공학적 디자인과 뛰어난 착석감', 145000, 4.5, 14, '2022-03-11', 0.1),
(10035,3,'의자','리바트 아르코 의자', '곡선형 라인으로 몸의 이완을 돕는 ARCO', 290000, 4.7, 17, '2021-03-16', 0.15),

-- 이케아 : 1 , 한샘 : 2 , 리바트 : 3
-- 옷장
--                    no,sc,pc
(10036,2,'옷장','한샘 샘베딩 스테디 옷장 2단행거형', '당신의 공간을 밝혀줄 인테리어 켈러테라피', 214970, 4.5, 10,'2023-08-15', 0.02),
(10037,2,'옷장','한샘 샘베딩 스테디 옷장 행거서랍형', '당신의 공간을 밝혀줄 인테리어 켈러테라피', 291330,4.4, 8,'2023-08-15',0.02),
(10038,2,'옷장','한샘 샘베딩 스테디 옷장 1단행거형', '당신의 공간을 밝혀줄 인테리어 켈러테라피', 246600,4.6,11,'2023-07-15',0.04),
(10039,2,'옷장','한샘 바이엘 채널 옷장 화이트 행거형 A타입', '미니멀한 디자인의 바이엘 화이트', 291280,4.1,17,'2022-11-15',0.06),
(10040,2,'옷장','한샘 샘베딩 베이직 옷장 2단행거형', '샘베딩 옷장 시리즈의 시작이자 끝', 203350,4.7,22,'2023-08-10',0),
(10041,3,'옷장','리바트 토피 800 옷장 일반도어', '수납스타일 다 다르죠 해결책은 토피 안에 있습니다.', 245000,4.4,10,'2023-07-10',0),
(10042,3,'옷장','리바트 퓨리타 1000 키큰옷장 일반도어 화이트', '퓨리타(Purita)수납공간 더 훌륭해지다.', 264000,4.2,5,'2023-05-10',0.03),
(10043,3,'옷장','리바트 토피 슬라이딩 1200 긴옷장', '토피(Toffe)좁은공간 수납 고민 해결', 383000,3.9,14,'2023-04-01',0.05),
(10044,3,'옷장','리바트 토피 슬라이딩 1200 옷장 행거형', '토피(Toffe)좁은공간 수납 고민 해결', 389000,4.4,13,'2023-05-01',0.05),
(10045,3,'옷장','리바트 토피 800 옷장 거울도어', '토피(Toffe)좁은공간 수납 고민 해결', 343000,4.3,8,'2023-03-01',0.1);

INSERT INTO PRD VALUES (10046,3,'옷장','테스트', '테스트 상품', 343000,4.3,8,'2023-03-01',0.1);

-- 이미지 경로
INSERT INTO PRD_IMG VALUES (10001,'/assets/img/10001.png');
INSERT INTO PRD_IMG VALUES (10002,'/assets/img/10002.png');
INSERT INTO PRD_IMG VALUES (10003,'/assets/img/10003.png');
INSERT INTO PRD_IMG VALUES (10004,'/assets/img/10004.png');
INSERT INTO PRD_IMG VALUES (10005,'/assets/img/10005.png');
INSERT INTO PRD_IMG VALUES (10006,'/assets/img/10006.png');
INSERT INTO PRD_IMG VALUES (10007,'/assets/img/10007.png');
INSERT INTO PRD_IMG VALUES (10008,'/assets/img/10008.png');
INSERT INTO PRD_IMG VALUES (10009,'/assets/img/10009.png');
INSERT INTO PRD_IMG VALUES (10010,'/assets/img/10010.png');
INSERT INTO PRD_IMG VALUES (10011,'/assets/img/10011.png');
INSERT INTO PRD_IMG VALUES (10012,'/assets/img/10012.png');
INSERT INTO PRD_IMG VALUES (10013,'/assets/img/10013.png');
INSERT INTO PRD_IMG VALUES (10014,'/assets/img/10014.png');
INSERT INTO PRD_IMG VALUES (10015,'/assets/img/10015.png');
INSERT INTO PRD_IMG VALUES (10016,'/assets/img/10016.png');
INSERT INTO PRD_IMG VALUES (10017,'/assets/img/10017.png');
INSERT INTO PRD_IMG VALUES (10018,'/assets/img/10018.png');
INSERT INTO PRD_IMG VALUES (10019,'/assets/img/10019.png');
INSERT INTO PRD_IMG VALUES (10020,'/assets/img/10020.png');
INSERT INTO PRD_IMG VALUES (10021,'/assets/img/10021.png');
INSERT INTO PRD_IMG VALUES (10022,'/assets/img/10022.png');
INSERT INTO PRD_IMG VALUES (10023,'/assets/img/10023.png');
INSERT INTO PRD_IMG VALUES (10024,'/assets/img/10024.png');
INSERT INTO PRD_IMG VALUES (10025,'/assets/img/10025.png');
INSERT INTO PRD_IMG VALUES (10026,'/assets/img/10026.png');
INSERT INTO PRD_IMG VALUES (10027,'/assets/img/10027.png');
INSERT INTO PRD_IMG VALUES (10028,'/assets/img/10028.png');
INSERT INTO PRD_IMG VALUES (10029,'/assets/img/10029.png');
INSERT INTO PRD_IMG VALUES (10030,'/assets/img/10030.png');
INSERT INTO PRD_IMG VALUES (10031,'/assets/img/10031.png');
INSERT INTO PRD_IMG VALUES (10032,'/assets/img/10032.png');
INSERT INTO PRD_IMG VALUES (10033,'/assets/img/10033.png');
INSERT INTO PRD_IMG VALUES (10034,'/assets/img/10034.png');
INSERT INTO PRD_IMG VALUES (10035,'/assets/img/10035.png');
INSERT INTO PRD_IMG VALUES (10036,'/assets/img/10036.png');
INSERT INTO PRD_IMG VALUES (10037,'/assets/img/10037.png');
INSERT INTO PRD_IMG VALUES (10038,'/assets/img/10038.png');
INSERT INTO PRD_IMG VALUES (10039,'/assets/img/10039.png');
INSERT INTO PRD_IMG VALUES (10040,'/assets/img/10040.png');
INSERT INTO PRD_IMG VALUES (10041,'/assets/img/10041.png');
INSERT INTO PRD_IMG VALUES (10042,'/assets/img/10042.png');
INSERT INTO PRD_IMG VALUES (10043,'/assets/img/10043.png');
INSERT INTO PRD_IMG VALUES (10044,'/assets/img/10044.png');
INSERT INTO PRD_IMG VALUES (10045,'/assets/img/10045.png');


COMMIT;

-- 재고

SELECT * FROM SEQUENCES;
set sql_safe_updates=0;
DELETE FROM SEQUENCES WHERE PRD_NO = 0;
INSERT INTO SEQUENCES VALUES (10046, 1, 1, 1, 0, 4);
ALTER TABLE SEQUENCES DROP COLUMN PRD_CODE;

SELECT * FROM PRD_ST;
DELETE FROM PRD_ST WHERE 1=1;
SELECT PRD_RP FROM PRD;
INSERT INTO PRD_ST VALUES (1,10001)
						, (2,10001)
                        , (3,10001)
                        , (4,10001)
                        , (5,10001)
                        , (6,10001)
                        , (7,10001)
                        , (8,10001)
                        , (9,10001)
                        , (10,10001)
                        , (11,10001)
                        , (12,10001)
                        , (13,10001)
                        , (14,10001)
                        , (15,10001)
                        , (16,10001)
                        , (17,10001)
                        , (18,10001)
                        , (19,10001)
                        , (20,10001)
                        , (21,10001)
                        , (22,10001)
                        , (23,10001)
                        , (24,10001)
                        , (25,10001)
                        , (26,10001)
                        , (27,10001)
                        , (28,10001)
                        , (29,10001)
                        , (30,10001)
                        , (31,10001)
                        , (32,10001)
                        , (33,10001)
                        , (34,10001)
                        , (35,10001)
                        , (36,10001)
                        , (37,10001)
                        , (38,10001)
                        , (39,10001)
                        , (40,10001)
                        , (41,10001)
                        , (42,10001)
                        , (43,10001)
                        , (44,10001)
                        , (45,10001)
                        , (46,10001)
                        , (47,10001)
                        , (48,10001)
                        , (49,10001)
                        , (50,10001)
                        , (51,10001)
                        , (52,10001)
                        , (53,10001)
                        , (54,10001)
                        , (55,10001)
                        , (56,10001)
                        , (57,10001)
                        , (58,10001)
                        , (59,10001)
                        , (60,10001)
                        , (61,10001)
                        , (62,10001)
                        , (63,10001)
                        , (64,10001)
                        , (65,10001)
                        , (66,10001)
                        , (67,10001)
                        , (68,10001)
                        , (69,10001)
                        , (70,10001);
                        
INSERT INTO PRD_ST VALUES (10002);
INSERT INTO PRD_ST VALUES (10045,'/assets/img/10045.png');


SELECT *
FROM (SELECT * FROM PRD where PRD_NO = 10035) A,
(SELECT IMG_PATH FROM PRD_IMG where PRD_NO = 10035) B,
(SELECT COUNT(*) FROM PRD_ST where PRD_NO = 10035 GROUP BY PRD_NO) C;