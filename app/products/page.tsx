'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [shape, setShape] = useState('');

  const filters = {
    keyword: searchParams.get('keyword') || undefined,
    category: searchParams.get('category') || undefined,
    subCategory: searchParams.get('subcategory') || undefined,
    page,
    sort: sort || undefined,
    shape: shape || undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      console.log('Fetching products with filters:', filters);
      const result = await getProducts(filters);
      console.log('API Response:', result);
      return result;
    },
  });

  const handleSortChange = (value: string) => {
    if (value === 'asc' || value === 'desc') {
      setSort('price');
    } else {
      setSort(value);
    }
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          Home / {searchParams.get('category') || searchParams.get('subcategory') || 'Products'}
        </p>
        <p className="text-lg font-semibold">
          Products - <span className="text-primary-600">{data?.productLength || 0} items</span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Sort by</option>
          <option value="discount">Better Discount</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <select
          onChange={(e) => setShape(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select Shape</option>
          <option value="rectangular">Rectangular</option>
          <option value="square">Square</option>
          <option value="circular">Circular</option>
          <option value="a4">A4</option>
          <option value="large">Large</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
        </select>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <ProductGridSkeleton />
      ) : error ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold mb-2 text-red-600">Error loading products</h3>
          <p className="text-gray-600 mb-4">
            {error instanceof Error && error.message.includes('timeout') 
              ? 'The server is taking too long to respond. Please try again.'
              : 'Unable to connect to the server. Please check your connection or try again later.'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      ) : !data || data.products.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {data.totalPage > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>
              <span className="font-medium">
                Page {page} of {data.totalPage}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPage, p + 1))}
                disabled={page === data.totalPage}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
