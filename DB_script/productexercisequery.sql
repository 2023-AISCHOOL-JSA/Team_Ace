select * from product;

-- 더미데이터１
insert into product(
	productNum,
    productName,
    categoryNum,
    productDetail,
    productPrice,
    productStart,
    productEnd,
    sellerCode,
    uptoDate
) values(
	'productnumtest',
    'productnametest',
    'categorynumtest',
    'productdetailtest',
    'productpricetest',
	'2023-08-03',
    '2023-08-05',
    'sellercodetest',
    '2023-08-03'
);

-- 더미데이터２
insert into product(
	productNum,
    productName,
    categoryNum,
    productDetail,
    productPrice,
    productStart,
    productEnd,
    sellerCode,
    uptoDate
) values(
	'productnumtest2',
    'productnametest2',
    'categorynumtest2',
    'productdetailtest2',
    'productpricetest2',
	'2023-06-01',
    '2023-07-28',
    'sellercodetest2',
    '2023-06-01'
);

-- shoppping 테이블 컬럼명 변경
ALTER TABLE shopping CHANGE productNum ownNum varchar(100);

commit;