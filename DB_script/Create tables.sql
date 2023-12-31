SHOW TABLES;
commit;

ALTER TABLE member ADD nick VARCHAR(200);
ALTER TABLE PRD ADD PRD_SAIL FLOAT DEFAULT 0;

UPDATE member SET nick = '닉네임', phonenum = '000-1111-2222' where id = 'absoo';
insert into member values ( '123', '123', '123', '123', '123');
delete from member where id = 'absoo';
DROP TABLE `MEMBER`;

SHOW PROCESSLIST;
KILL 5416;
KILL 5417;
KILL 5619;
KILL 5638;
KILL 5710;

set sql_safe_updates=0;
SET FOREIGN_KEY_CHECKS = 1;

-- -------------------- 테이블 생성 쿼리 --------------------------------
-- 1 멤버 테이블 생성
CREATE TABLE `MEMBER`(
ID VARCHAR(50) PRIMARY KEY,
PW VARCHAR(50) NOT NULL,
NAME VARCHAR(100) NOT NULL,
NICK VARCHAR(50) NOT NULL,
TEL VARCHAR(20) NOT NULL,
BIRTH DATE NOT NULL,
GENDER VARCHAR(10) NOT NULL,
EMAIL VARCHAR(50),
ADDR VARCHAR(100) NOT NULL,
POSTCODE VARCHAR(20) NOT NULL,
ADDR_DETAIL VARCHAR(100) NOT NULL,
ADDR_EXTRA VARCHAR(100) NOT NULL
);

SELECT * FROM MEMBER;

-- 2 판매자 테이블 생성
CREATE TABLE SELLER(
SELLER_CODE INT(8) PRIMARY KEY,
COM_NM VARCHAR(50) NOT NULL,
COM_ADDR VARCHAR(100) NOT NULL,
COM_TEL VARCHAR(20) NOT NULL
);

SELECT * FROM SELLER;

-- 3 시퀀스 모음 테이블 생성
CREATE TABLE SEQUENCES(
PRD_NO INT(8),
SERIAL_NO INT(8),
ORDER_NO INT(8),
COLL_NO INT(8),
PRD_CODE INT(8),
SELLER_CODE INT(8)
);

-- 4 상품 테이블 생성
CREATE TABLE PRD(
PRD_NO INT(8) PRIMARY KEY,
SELLER_CODE VARCHAR(50),
PRD_CODE VARCHAR(50),
PRD_NM VARCHAR(50) NOT NULL,
PRD_DETAIL VARCHAR(4000) NOT NULL,
PRD_PRICE INT(10) NOT NULL,
PRD_SCORE INT(1) DEFAULT 0,
PRD_RP INT(8) DEFAULT 0,
PRD_SIGN DATE,
PRD_SALE FLOAT
);
INSERT INTO PRD VALUES (3, 'QWE', '123', 'ASD', 'ZXC', 1000, 4, 1);
UPDATE PRD SET PRD_SAIL = 0.2 WHERE PRD_NO = 3;
DROP TABLE PRD;

SELECT * FROM PRD;
COMMIT;

-- 4-1. 상품별 리뷰 테이블 생성
CREATE TABLE PRD_REV(
PRD_NO INT(8),
REVIEW VARCHAR(2000) NOT NULL
);

SELECT * FROM PRD_REV;

-- 5 상품 이미지 테이블 생성
CREATE TABLE PRD_IMG(
PRD_NO INT(8),
IMG_PATH VARCHAR(1000) NOT NULL
);

SELECT * FROM PRD_IMG;

-- 6 상품 종류 테이블 생성
CREATE TABLE PRD_CATE(
PRD_CODE INT(8) PRIMARY KEY,
PRD_TYPE VARCHAR(100) NOT NULL
);

SELECT * FROM PRD_CATE;

-- 7 상품 재고 테이블 생성
CREATE TABLE PRD_ST(
SERIAL_NO INT(8) PRIMARY KEY,
PRD_NO INT(8)
);

SELECT * FROM PRD_ST;

-- 8 장바구니 테이블 생성
CREATE TABLE BASKET(
ID VARCHAR(50),
PRD_NO INT(8)
);

SELECT * FROM BASKET;

-- 9 주문 정보 테이블 생성
CREATE TABLE `ORDER`(
ORDER_NO INT(8) PRIMARY KEY,
ID VARCHAR(50),
PRD_NO INT(8),
SELLER_CODE INT(8),
TOTAL_PRICE INT(8) NOT NULL,
TAKER_NM VARCHAR(100) NOT NULL,
TAKER_TEL VARCHAR(20) NOT NULL,
TAKER_ADDR VARCHAR(200) NOT NULL,
ORDER_COM_TEL VARCHAR(20) NOT NULL,
ORDER_MEMO VARCHAR(500),
ORDER_STATUS VARCHAR(20) NOT NULL,
PAY_DATE DATE,
PAY_CODE VARCHAR(20)
);

DROP TABLE `ORDER`;
SELECT * FROM `ORDER`;

-- 10 주문 상품 테이블 생성
CREATE TABLE ORDER_PRD(
ORDER_NO INT(8),
SERIAL_NO INT(8)
);

SELECT * FROM ORDER_PRD;

-- 11 수거 정보 테이블 생성
CREATE TABLE COLL(
COLL_NO INT(8) PRIMARY KEY,
ID VARCHAR(50),
PRD_NO INT(8),
GIVER_NM VARCHAR(100) NOT NULL,
GIVER_TEL VARCHAR(20) NOT NULL,
GIVER_ADDR VARCHAR(200) NOT NULL,
COLL_COM_TEL VARCHAR(20) NOT NULL,
COLL_MEMO VARCHAR(500),
COLL_STATUS VARCHAR(20) NOT NULL,
COLL_DATE DATE NOT NULL
);

SELECT * FROM COLL;

-- 12 수거 상품 테이블 생성
CREATE TABLE COLL_PRD(
COLL_NO INT(8),
SERIAL_NO INT(8)
);

SELECT * FROM COLL_PRD;

COMMIT;

rollback;