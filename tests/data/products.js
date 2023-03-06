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

const reviews = [
  {
    id: 3,
    content: "댓글3",
    image_url: "Image_url3",
    rating: 3,
    user_id: 3,
    product_id: 1,
    created_at: "2023-03-06 01:55:33",
  },
  {
    id: 2,
    content: "댓글2",
    image_url: "Image_url2",
    rating: 4,
    user_id: 2,
    product_id: 1,
    created_at: "2023-03-06 01:55:33",
  },
  {
    id: 1,
    content: "댓글1",
    image_url: "Image_url1",
    rating: 5,
    user_id: 1,
    product_id: 1,
    created_at: "2023-03-06 01:55:33",
  },
];

module.exports = {
  categories,
  products,
  reviews,
};
