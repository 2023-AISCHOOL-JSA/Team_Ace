select * from member;

-- 1 멤버 테이블 컬럼 추가
 ALTER TABLE member
   ADD BIRTH DATE,
   ADD GENDER VARCHAR(6),
   ADD EMAIL VARCHAR(100),
   ADD ADDRESS VARCHAR(150);

-- 멤버 테이블 컬럼 추가 
 ALTER TABLE member
   ADD POSTCODE INT,
   ADD DETAILADDRESS VARCHAR(100),
   ADD EXTRAADDRESS VARCHAR(100);

-- 2 수거 테이블 생성
CREATE TABLE collection(
   collectNum varchar(100),
   id VARCHAR(100),
   collectLocation varchar(100),
   collectDate date,
   productNum varchar(50),
   memberName varchar(100),
   memberPhone varchar(100),
   deliverNum varchar(100),
   deliverMemo varchar(100),
   collectCode varchar(100),
);

select * from collection;
alter table collection change productNum ownNum varchar(50);
commit;

-- 컬럼 타입 변경
ALTER TABLE member MODIFY POSTCODE VARCHAR(100);

-- 3 상품 테이블 생성
create table product(
	productNum varchar(50),
    productName varchar(100),
    categoryNum varchar(100),
    productDetail varchar(255),
    productPrice varchar(255),
    productStart date,
    productEnd date,
    sellerCode varchar(100),
    uptoDate date
);

-- 4 주문 테이블 생성
create table shopping(
	shoppingNum varchar(50),
    id varchar(100),
    price varchar(100),
    takerName varchar(100),
    takerPhone varchar(100),
    takerAddress varchar(100),
    productNum varchar(100),
    deliverMemo varchar(100),
    shoppingStatus varchar(2),
    shoppingDate date
);

-- 5 결제 테이블 생성
create table payment(
	shoppingNum varchar(50),
    payCode varchar(50),
	payPrice varchar(50),
    payDate date
);

-- 6 이미지 테이블 생성
create table image(
	serialNum varchar(50),
    productNum varchar(50),
    imagePath varchar(100)
); 

-- 7 재고 테이블 생성
create table productWare(
	productType varchar(100),
    sellerCode varchar(100),
    productNum varchar(50),
    ownNum varchar(50),
    sellAvailable varchar(2)
); 

-- 8 판매자 테이블 생성
create table seller(
	companyName varchar(50),
    sellerCode varchar(100)
);

commit;

-- 9 주문 상세 테이블 생성
create table shoppingDetail(
	ownNum varchar(50),
    shoppingNum varchar(50)
);

commit;