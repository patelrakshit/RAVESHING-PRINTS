'use client';

import { X, Printer } from 'lucide-react';
import Image from 'next/image';
import type { Product } from '@/types/product';

interface PrintPreviewModalProps {
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  onClose: () => void;
}

export function PrintPreviewModal({ product, quantity, unitPrice, totalPrice, onClose }: PrintPreviewModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header - Hide on print */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center print:hidden">
          <h2 className="text-xl font-bold">Print Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Printer className="h-5 w-5" />
              Print
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Print Content */}
        <div className="p-8 print:p-0">
          {/* Company Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-600 mb-2">RAVESHING PRINTS</h1>
            <p className="text-gray-600">Premium Printing Services</p>
            <p className="text-sm text-gray-500">Phone: (678) 808-9383</p>
          </div>

          <hr className="my-6" />

          {/* Product Details */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Product Quote</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image?.[0] || '/assets/noproducts.webp'}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-xl font-semibold mb-4">{product.title}</h3>
                
                <div className="space-y-2 text-gray-700">
                  {product.category && (
                    <p><strong>Category:</strong> {product.category}</p>
                  )}
                  {product.subcategory && (
                    <p><strong>Subcategory:</strong> {product.subcategory}</p>
                  )}
                  {product.description && (
                    <div>
                      <strong>Description:</strong>
                      <p className="mt-1">{product.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Item</th>
                    <th className="px-4 py-3 text-right">Unit Price</th>
                    <th className="px-4 py-3 text-right">Quantity</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3">{product.title}</td>
                    <td className="px-4 py-3 text-right">${unitPrice.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">{quantity}</td>
                    <td className="px-4 py-3 text-right font-semibold">${totalPrice.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bulk Discount Info */}
            {quantity >= 10 && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 font-semibold">
                  🎉 Bulk Discount Applied!
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {quantity >= 100 && 'You're getting 20% off for ordering 100+ items'}
                  {quantity >= 50 && quantity < 100 && 'You're getting 15% off for ordering 50+ items'}
                  {quantity >= 25 && quantity < 50 && 'You're getting 10% off for ordering 25+ items'}
                  {quantity >= 10 && quantity < 25 && 'You're getting 5% off for ordering 10+ items'}
                </p>
              </div>
            )}

            {/* Summary */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (8%):</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-xl font-bold text-primary-600">
                  <span>Estimated Total:</span>
                  <span>${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
            <p className="mb-2">This is a quote and not a final invoice.</p>
            <p>Final price may vary based on customization requirements and shipping.</p>
            <p className="mt-4 font-semibold">Thank you for choosing RAVESHING PRINTS!</p>
            <p className="text-xs text-gray-500 mt-2">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
