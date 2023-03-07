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

const scraps = [
  {
    id: 1,
    user_id: 1,
    post_id: 1,
    created_at: "2023-02-27 20:39:28",
  },
  {
    id: 2,
    user_id: 1,
    post_id: 2,
    created_at: "2023-02-27 20:39:28",
  },
  {
    id: 3,
    user_id: 1,
    post_id: 3,
    created_at: "2023-02-27 20:39:28",
  },
  {
    id: 4,
    user_id: 2,
    post_id: 1,
    created_at: "2023-02-27 20:40:27",
  },
  {
    id: 5,
    user_id: 2,
    post_id: 2,
    created_at: "2023-02-27 22:12:51",
  },
  {
    id: 6,
    user_id: 3,
    post_id: 1,
    created_at: "2023-02-27 22:12:53",
  },
  {
    id: 7,
    user_id: 3,
    post_id: 4,
    created_at: "2023-02-27 22:12:53",
  },
];

const comments = [
  {
    id: 1,
    content: "테스트 댓글 1번",
    user_id: 1,
    post_id: 1,
    comment_id: null,
    created_at: "2023-03-01 17:26:05",
    updated_at: null,
  },
  {
    id: 2,
    content: "테스트 댓글 2번",
    user_id: 2,
    post_id: 1,
    comment_id: null,
    created_at: "2023-03-01 17:26:39",
    updated_at: null,
  },
  {
    id: 3,
    content: "테스트 댓글 3번",
    user_id: 3,
    post_id: 1,
    comment_id: null,
    created_at: "2023-03-02 17:20:10",
    updated_at: null,
  },
];

module.exports = {
  roomStyles,
  posts,
  postImages,
  imageCoordinate,
  scraps,
  comments,
};
