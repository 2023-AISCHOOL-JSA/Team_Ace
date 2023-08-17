# 배우는 HTML, CSS, JS

# 목차

1. 오늘부터 코딩 1일

[2. 기본 게시판 만들기](https://zzcojoa.tistory.com/112)

[3. 디자인 게시판 만들기](https://zzcojoa.tistory.com/113)

4. 추가로 더 알아보기

## 1. 오늘부터 코딩 1일
___

### 1. HTML, CSS 알아보기

#### 1. 기능 구현을 위해 배워야 할 언어

1. JavaScript
2. php
3. C++
4. Java
5. Python

#### 2. HTML(HyperText Markup Language)

1. HTML은 문서의 글자 크기, 색, 모양, 그래픽, 링크 등을 정의하는 명령어로 홈페이지를 작성하는 데 쓰임.
2. 사용하는 명령어로 태그(tag)는 껏쇠괄호 "< >"를 사용함.

```
<!DOCTYPE html>
<html lang="ko>
    <head>
        <div>
        </div>
    </head>

    <body>
        <div>
        </div>
    </body>
</html>
```

#### 3. CSS(Cascading Style Sheet)

1. CSS는 HTML과 함께 웹을 구성하는 기본 프로그래밍 요소
2. 색상이나 크기, 이미지 크기나 위치, 배치 방법 등 웹 문서의 디자인 요소 담당

```
.card{
    display: inline-block;
    width: 1000px;
    margin: 100px auto;
    border: none;
    border-radius: 10px;
    padding: 10px;
    background-color: #fff;
    font-size: 30px;
    text-align: center;
}
```

3. 여백의 구성 요소

![](data:image/png;base64,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)

- margin: margin이 포함된 점선의 바깥 테두리
- border: border가 포함된 바깥 테두리
- padding: padding이 포함된 점선의 바깥 테두리

#### 4. 많이 쓰이는 HTML tag

![](https://t1.daumcdn.net/cfile/tistory/99EBF83F5BCDE5CF17)


### 2. DOCTYPE 선언하기

```
// index.html

<!DOCTYPE html>
<html lang="ko">

    <!-- head tag: 해당 문서에 대한 정보인 meta data의 집합을 정의할때 사용 -->
    <head>
        <!-- meta tag: 웹 브라우저, 검색엔진, 웹 서비스에서 사용 -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- meta tag "keyword": 검색 엔진에 안녕에 대한 웹페이지가 업로드 되도록 설정 -->
        <meta name="keyowrd" content="안녕">

        <!-- style.css 연동 -->
        <link rel="stylesheet" href="sytle.css">
        <title>Document</title>
    </head>

    <!-- body tag: HTML 문서의  text, link, img, list와 같은 content를 포함하는 영역 정의 -->
    <body>
        <!-- div tag는 특정 영역이나 구역을 정의할 때 사용 -->
        <div>
            안녕하세요
        </div>
    </body>
</html>

```

```
// style.css

* {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

a {
    color: inherit;
    text-decoration: none;
}
```

> 1. HTML에 사용되는 tag와 용도에 따른 tag의 사용법   
> 2. HTML은 워드 작업이라면 CSS는 꾸며주는 작업    
> 3. <link rel="stylesheet"  href="sytle.css">margin, padding, border의 이해

다음 내용은 디자인 게시판꾸미기(https://zzcojoa.tistory.com/112) 에서 코드를 알아보자.
