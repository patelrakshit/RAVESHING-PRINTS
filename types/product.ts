export interface Product {
  _id: string;
  title: string;
  image: string[];  // API returns 'image' not 'images'
  price: number;
  off_price: number;
  discount: number;
  discountPercentage: number;
  set: number;
  stock: number;
  description: string;
  size?: string;
  category?: string;
  subCategory?: string;
  subcategory?: string;
  shape?: string;
}

export interface ProductsResponse {
  data: {
    products: Product[];
    productLength: number;
    totalPage: number;
  };
}

export interface ProductFilters {
  keyword?: string;
  gender?: string;
  category?: string;
  subCategory?: string;
  subcategory?: string;
  page?: number;
  sort?: string;
  orderBy?: string;
  shape?: string;
}
