const users = [
  {
    id: 1,
    email: "test01@email.com",
    profile_image: "testProfileImage01.url",
    password: "password",
    nickname: "testUser01",
  },
  {
    id: 2,
    email: "test02@email.com",
    profile_image: "testProfileImage02.url",
    password: "password",
    nickname: "testUser02",
  },
  {
    id: 3,
    email: "test03@email.com",
    profile_image: "testProfileImage03.url",
    password: "password",
    nickname: "testUser03",
  },
];

const categories = [
  {
    id: 1,
    name: "가구",
  },
  {
    id: 2,
    name: "소품",
  },
];

const products = [
  {
    id: 1,
    name: "폭신 헤드 침대",
    price: 200000.0,
    discount: 50000.0,
    image_url: "productBedImage.url",
    description: "모던하면서 포근한 분위기를 만들어주는 침대입니다",
    shipping_fee: 3000.0,
    sales_amount: 0,
    category_id: 1,
    created_at: "2023-02-27 20:25:54",
    updated_at: null,
  },
  {
    id: 2,
    name: "모던 블랙 테이블",
    price: 30000.0,
    discount: 2000.0,
    image_url: "productTableImage.url",
    description: "베이직 테이블 세트입니다.",
    shipping_fee: 0.0,
    sales_amount: 0,
    category_id: 1,
    created_at: "2023-02-27 20:25:54",
    updated_at: null,
  },
  {
    id: 3,
    name: "스툴 의자",
    price: 10000.0,
    discount: 0.0,
    image_url: "productChairImage.url",
    description: "모던 스툴 체어입니다.",
    shipping_fee: 3000.0,
    sales_amount: 0,
    category_id: 1,
    created_at: "2023-02-27 20:25:54",
    updated_at: null,
  },
  {
    id: 4,
    name: "라운드 무드 램프",
    price: 10000.0,
    discount: 3000.0,
    image_url: "productLampImage.url",
    description: "램프입니다",
    shipping_fee: 3000.0,
    sales_amount: 0,
    category_id: 2,
    created_at: "2023-02-27 20:25:54",
    updated_at: null,
  },
];

const roomStyles = [
  {
    id: 1,
    type: "modern",
  },
  {
    id: 2,
    type: "vintage",
  },
  {
    id: 3,
    type: "lovely",
  },
];

const posts = [
  {
    id: 1,
    title: "모던 집들이 포스트",
    description: "모던한 인테리어로 꾸며봤습니다",
    user_id: 1,
    room_style_id: 1,
    created_at: "2023-02-27 20:30:14",
    updated_at: null,
  },
  {
    id: 2,
    title: "빈티지 인테리어",
    description: "빈티지한 소품으로 꾸민 방",
    user_id: 1,
    room_style_id: 2,
    created_at: "2023-02-27 20:30:15",
    updated_at: null,
  },
  {
    id: 3,
    title: "귀여움 가득! 마이룸",
    description: "러블리 아이템으로 생기넘치는 집",
    user_id: 1,
    room_style_id: 3,
    created_at: "2023-02-27 20:30:16",
    updated_at: null,
  },
  {
    id: 4,
    title: "this is modern",
    description: "최고의 모던 인테리어를 소개합니",
    user_id: 2,
    room_style_id: 1,
    created_at: "2023-02-27 21:52:10",
    updated_at: null,
  },
  {
    id: 5,
    title: "레트로 무드 가득",
    description: "레트로와 빈티지를 한번",
    user_id: 2,
    room_style_id: 2,
    created_at: "2023-02-27 21:52:20",
    updated_at: null,
  },
  {
    id: 6,
    title: "파스텔 핑크 인테리어",
    description: "봄에는 인디핑크로 화사하게",
    user_id: 2,
    room_style_id: 3,
    created_at: "2023-02-27 21:52:30",
    updated_at: null,
  },
  {
    id: 7,
    title: "모던모던룸",
    description: "화이트 앤 블랙 인테리어",
    user_id: 1,
    room_style_id: 1,
    created_at: "2023-02-27 21:53:53",
    updated_at: null,
  },
  {
    id: 8,
    title: "1800년대로의 여행",
    description: "월넛 우드로 분위기있게",
    user_id: 2,
    room_style_id: 2,
    created_at: "2023-02-27 21:53:55",
    updated_at: null,
  },
];

const postImages = [
  {
    id: 1,
    image_url: "postImage01.url",
    post_id: 1,
  },
  {
    id: 2,
    image_url: "postImage02.url",
    post_id: 2,
  },
  {
    id: 3,
    image_url: "postImage03.url",
    post_id: 3,
  },
  {
    id: 4,
    image_url: "postImage04.url",
    post_id: 4,
  },
  {
    id: 5,
    image_url: "postImage05.url",
    post_id: 5,
  },
  {
    id: 6,
    image_url: "postImage06.url",
    post_id: 6,
  },
  {
    id: 7,
    image_url: "postImage07.url",
    post_id: 7,
  },
  {
    id: 8,
    image_url: "postImage06.url",
    post_id: 8,
  },
];

const imageCoordinate = [
  {
    id: 1,
    pixel_row: 30,
    pixel_column: 50,
    post_image_id: 1,
    product_id: 1,
  },
  {
    id: 2,
    pixel_row: 20,
    pixel_column: 60,
    post_image_id: 2,
    product_id: 2,
  },
  {
    id: 3,
    pixel_row: 50,
    pixel_column: 40,
    post_image_id: 3,
    product_id: 3,
  },
  {
    id: 4,
    pixel_row: 70,
    pixel_column: 70,
    post_image_id: 1,
    product_id: 2,
  },
  {
    id: 5,
    pixel_row: 100,
    pixel_column: 50,
    post_image_id: 4,
    product_id: 4,
  },
];

module.exports = {
  users,
  categories,
  products,
  roomStyles,
  posts,
  postImages,
  imageCoordinate,
};
