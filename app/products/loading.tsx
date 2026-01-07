import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';

export default function Loading() {
  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-64 animate-pulse" />
      </div>
      <div className="flex gap-4 mb-8">
        <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
        <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
      </div>
      <ProductGridSkeleton />
    </div>
  );
}
