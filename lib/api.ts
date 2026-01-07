import axios from 'axios';
import type { Product, ProductFilters, ProductsResponse } from '@/types/product';
import { mockProducts } from './mockData';

// Set to true to use mock data while backend is down
const USE_MOCK_DATA = true;

const api = axios.create({
  baseURL: 'https://shy-lion-snaps.cyclic.app',
  timeout: 30000, // Increased to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResponse['data']> {
  // Use mock data if API is down
  if (USE_MOCK_DATA) {
    console.log('Using mock data - Backend API is down');
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    let filteredProducts = [...mockProducts];
    
    // Filter by subCategory
    if (filters.subCategory) {
      filteredProducts = filteredProducts.filter(p => p.subCategory === filters.subCategory);
    }
    
    // Filter by category
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    
    // Filter by shape
    if (filters.shape) {
      filteredProducts = filteredProducts.filter(p => p.shape === filters.shape);
    }
    
    // Filter by keyword
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(keyword) || 
        p.description.toLowerCase().includes(keyword)
      );
    }
    
    return {
      products: filteredProducts,
      productLength: filteredProducts.length,
      totalPage: 1,
    };
  }
  
  try {
    console.log('Making API call to /product with params:', filters);
    const { data } = await api.get<ProductsResponse>('/product', {
      params: filters,
    });
    console.log('Raw API response:', data);
    return data.data;
  } catch (error) {
    console.error('API Error - falling back to mock data:', error);
    // Fallback to mock data if API fails
    return getProducts({ ...filters });
  }
}

export async function getProduct(id: string): Promise<Product> {
  // Use mock data if API is down
  if (USE_MOCK_DATA) {
    console.log('Using mock data for product detail');
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = mockProducts.find(p => p._id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }
  
  try {
    const { data } = await api.get<{ product: Product }>(`/product/${id}`);
    return data.product;
  } catch (error) {
    console.error('API Error - falling back to mock data:', error);
    const product = mockProducts.find(p => p._id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }
}

export { api, getProducts, getProduct };

export const apiClient = api;
