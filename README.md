# 42-2nd-HomeAlone-backend

## 나홀로집 Front-end/Back-end 소개

- [오늘의집](https://ohou.se/) 을 모티브로 한 커뮤니티&커머스 웹 사이트 프로젝트
- 짧은 프로젝트 기간동안 개발에 집중해야 하므로 디자인/기획 부분만 클론했습니다.
- 개발은 초기 세팅부터 전부 직접 구현했으며, 아래 데모 영상에서 보이는 부분은 모두 백앤드와 연결하여 실제 사용할 수 있는 서비스 수준으로 개발한 것입니다.

### 개발 인원 및 기간

- 개발기간 : 2023/2/24 ~ 2030/3/10
- 개발 인원 : 프론트엔드 3명, 백엔드 2명
- [프론트엔드 github 링크](https://github.com/wecode-bootcamp-korea/42-2nd-HomeAlone-frontend)
- [백엔드 github 링크](https://github.com/wecode-bootcamp-korea/42-2nd-HomeAlone-backend)

### 프로젝트 선정이유

- '오늘의집' 은 커뮤니티 기능을 바탕으로 한 이커머스 사이트로, 인테리어에 관심이 있는 사용자들이 정보를 교환하고 그 과정에서 제품 구매까지 이어질 수 있는 기능을 제공하고 있습니다. 
오늘의집을 모티브로 하여 커뮤니티 기능을 중심으로 최근 증가하고 있는 1인 가구의 인테리어 수요를 충족시킬 수 있는 커뮤니티 & 커머스 사이트를 제작하고자 하는 목표로 '나홀로집'을 기획하게 되었습니다.

### 데모 영상(이미지 클릭)

*유투브 영상 링크나 캡쳐 이미지 넣어주세요.*

<br>

## 적용 기술 및 구현 기능

### 적용 기술

 Front-End
<img src="https://img.shields.io/badge/Javscript-F7DF1E?style=flat&amp;logo=javascript&amp;logoColor=white">
<img src="https://img.shields.io/badge/React.js-61DAFB?style=flat&amp;logo=React&amp;logoColor=white">
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat&amp;logo=ReactRouter&amp;logoColor=white">
<img src="https://img.shields.io/badge/styled-components-DB7093?style=flat&amp;logo=styled-components-DB7093&amp;logoColor=white">
<img src="https://img.shields.io/badge/sass-CC6699?style=flat&logo=sass&logoColor=white"/>

 Back-End
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&amp;logo=Node.js&amp;logoColor=white"><img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat&amp;logo=Nodemon&amp;logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=flat&amp;logo=Express&amp;logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&amp;logo=MySQL&amp;logoColor=white">
<img src="https://img.shields.io/badge/JWT-CC6699?style=flat&amp;logo=JSON&amp;logoColor=white">
<img src="https://img.shields.io/badge/Dbmate-009DC7?style=flat&amp;logo=Bcrypt&amp;logoColor=white">
<img src="https://img.shields.io/badge/Bcrypt-CA424?style=flat&amp;logo=Bcrypt&amp;logoColor=white">

Common
<img src="https://img.shields.io/badge/Git-F05032?style=flat&amp;logo=Git&amp;logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&amp;logo=GitHub&amp;logoColor=white">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&amp;logo=prettier&amp;logoColor=white">
<img src="https://img.shields.io/badge/RestfulAPI-F7533E?style=flat&amp;logo=RestfulAPII&amp;logoColor=white">
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&amp;logo=Visual Studio Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&amp;logo=Postman Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/AWS-232F3E?style=flat&amp;logo=AWS Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=flat&amp;logo=AWS_EC2 Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/AWS_RDS-527FFF?style=flat&amp;logo=AWS_RDS Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/AWS_S3-569A31?style=flat&amp;logo=AWS_S3 Code&amp;logoColor=white">

Communication
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&amp;logo=Slack&amp;logoColor=white">
<img src="https://img.shields.io/badge/Trello-0052CC?style=flat&amp;logo=Trello&amp;logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=flat&amp;logo=Notion&amp;logoColor=white">




## 구현 기능

|                | 황수영🐱                     |             박준우🐷                    | 공통 |
| -------------- | :---------------- | :-------------------- | :-------------------- | 
| 담당 구현 기능 | - 포스팅 기능 <br> - 댓글 기능 <br> - 즐겨찾기 기능 <br> - 장바구니 기능 <br> | - 카카오 소셜 로그인<br> - 상품 조회 기능 <br> - 주문 결제 기능 <br> - 상품  |  - 데이터베이스 관리 |


> - ### 회원가입 / 로그인🐷
- 카카오 소셜 회원가입 / 로그인

> - ### 커뮤니티 기능🐱

#### 포스팅 기능🐱
- 사진의 특정 위치에 마커를 표시하고 상품 정보를 첨부할 수 있는 포스팅 작성 기능
- 포스팅 리스트 조회 기능 (쿼리빌더를 활용한 필터링, 페이지네이션, 정렬)
- 포스팅 상세 조회 기능 

#### 댓글 기능🐱
- 포스트에 댓글 작성 기능
- 해당 포스트의 댓글 조회 기능
- 댓글 삭제 기능

#### 즐겨찾기(스크랩) 기능🐱
- 포스트 상세 페이지에서 즐겨찾기 여부 확인 기능
- 포스트 상세 페이지에서 즐겨찾기 추가 / 삭제 기능
- 스크랩북에서 즐겨찾기한 포스트 조회 기능

> - ### 스토어 기능

#### 상품 조회 기능🐷
- 상품 검색을 위한 상품 리스트 조회 기능
- 상품 상세 정보 조회 기능

#### 장바구니 기능🐱
- 장바구니에 상품 추가 기능
- 장바구니에서 상품 수량 변경 기능
- 장바구니에서 상품 선택 삭제 기능
- 장바구니에서 선택했던 상품의 선택 여부 저장 기능

#### 주문/결제 기능🐷
- 주문에 사용한 배송지 정보 저장 기능
- 주문서 작성 시 유저의 포인트 조회 기능 
- 주문할 상품의 결제 금액을 DB상의 정보과 비교하는 검증 기능
- 트랜잭션을 이용한 결제 기능

#### 상품 리뷰 기능🐷
- 사진을 첨부한 리뷰 작성 기능
- 상품 페이지에서 해당 상품의 리뷰 조회 기능
- 리뷰 조회 시 평균 별점 계산
- 작성한 리뷰 삭제 기능

> - ### 데이터베이스 관리 🐱🐷
- 데이터 ERD 모델링
- AWS RDS를 활용한 데이터 관리
- 사용자들이 업로드한 사진을 AWS S3에 업로드해 관리

> - ### 서버 배포🐱
- Docker image를 활용한 배포 버전 관리
- AWS EC2 를 활용한 서버 배포



<br>

## Reference

- 이 프로젝트는 [오늘의집](https://ohou.se/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
