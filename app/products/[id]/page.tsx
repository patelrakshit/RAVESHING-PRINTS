'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart, MessageCircle, Upload, X, Printer } from 'lucide-react';
import { api } from '@/lib/api';
import { useStore } from '@/lib/store';
import type { Product } from '@/types/product';
import { PrintPreviewModal } from '@/components/product/PrintPreviewModal';

export default function ProductDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [designFiles, setDesignFiles] = useState<File[]>([]);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const { addToCart } = useStore();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', params.id],
    queryFn: () => api.getProduct(params.id as string),
  });

  // Calculate dynamic price based on quantity
  const calculatePrice = (basePrice: number, qty: number) => {
    if (qty >= 100) return basePrice * 0.8; // 20% discount for 100+
    if (qty >= 50) return basePrice * 0.85; // 15% discount for 50+
    if (qty >= 25) return basePrice * 0.9; // 10% discount for 25+
    if (qty >= 10) return basePrice * 0.95; // 5% discount for 10+
    return basePrice;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setDesignFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setDesignFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddToCart = () => {
    if (product) {
      const images = designFiles.length > 0 
        ? designFiles.map(f => URL.createObjectURL(f)) 
        : undefined;
      addToCart(product, quantity, images);
      alert(`Added ${quantity} items to cart!`);
    }
  };

  const handleWhatsAppOrder = () => {
    if (product) {
      const unitPrice = calculatePrice(product.price, quantity);
      const total = unitPrice * quantity;
      const message = `Hi, I'm interested in:\n\n*${product.title}*\nUnit Price: $${unitPrice.toFixed(2)}\nQuantity: ${quantity}\n\nTotal: $${total.toFixed(2)}\n\n${designFiles.length > 0 ? `I have ${designFiles.length} design file(s) to upload.` : 'I need help with the design.'}`;
      const whatsappUrl = `https://wa.me/16788089383?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-24 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <p className="text-gray-600 mt-2">Sorry, we couldn't find this product.</p>
      </div>
    );
  }

  const images = product.image || [];
  const currentImage = images[selectedImage] || images[0] || '/assets/noproducts.webp';
  const unitPrice = calculatePrice(product.price, quantity);
  const totalPrice = unitPrice * quantity;
  const savings = (product.price - unitPrice) * quantity;

  return (
    <div className="container-custom py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={currentImage}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} - Image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            
            {/* Pricing with Quantity Discount */}
            <div className="bg-primary-50 p-4 rounded-lg mb-4">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-3xl font-bold text-primary-600">${unitPrice.toFixed(2)}</span>
                <span className="text-sm text-gray-600">per unit</span>
              </div>
              {quantity > 1 && (
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Total: ${totalPrice.toFixed(2)}
                </div>
              )}
              {savings > 0 && (
                <div className="text-sm text-green-600 font-medium">
                  You save ${savings.toFixed(2)} on this order!
                </div>
              )}
            </div>

            {/* Bulk Discount Info */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">Bulk Pricing:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 10-24 units: 5% off</li>
                <li>• 25-49 units: 10% off</li>
                <li>• 50-99 units: 15% off</li>
                <li>• 100+ units: 20% off</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-b py-4">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Product Details */}
          <div className="space-y-2 text-sm">
            {product.category && (
              <div className="flex">
                <span className="font-semibold w-32">Category:</span>
                <span className="text-gray-700 capitalize">{product.category}</span>
              </div>
            )}
            {(product.subCategory || product.subcategory) && (
              <div className="flex">
                <span className="font-semibold w-32">Sub-Category:</span>
                <span className="text-gray-700 capitalize">{product.subCategory || product.subcategory}</span>
              </div>
            )}
            {product.shape && (
              <div className="flex">
                <span className="font-semibold w-32">Shape:</span>
                <span className="text-gray-700 capitalize">{product.shape}</span>
              </div>
            )}
            {product.size && (
              <div className="flex">
                <span className="font-semibold w-32">Size:</span>
                <span className="text-gray-700">{product.size}</span>
              </div>
            )}
            <div className="flex">
              <span className="font-semibold w-32">Stock:</span>
              <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                className="w-20 text-center font-semibold border-x border-gray-300 py-2 focus:outline-none"
                min="1"
                max={product.stock}
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 hover:bg-gray-100 transition-colors"
                disabled={quantity >= product.stock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Design Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Your Design (Optional)
            </h3>
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.ai,.psd"
              onChange={handleFileUpload}
              className="hidden"
              id="design-upload"
            />
            <label
              htmlFor="design-upload"
              className="btn-secondary cursor-pointer inline-block mb-3"
            >
              Choose Files
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Accepted formats: JPG, PNG, PDF, AI, PSD (Max 10MB each)
            </p>

            {/* Uploaded Files */}
            {designFiles.length > 0 && (
              <div className="space-y-2">
                {designFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm truncate flex-1">{file.name}</span>
                    <button
                      onClick={() => removeFile(idx)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              Add {quantity} to Cart - ${totalPrice.toFixed(2)}
            </button>
            <button
              onClick={handleWhatsAppOrder}
              disabled={product.stock === 0}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <MessageCircle className="w-5 h-5" />
              Order via WhatsApp
            </button>
            <button
              onClick={() => setShowPrintPreview(true)}
              className="w-full btn-secondary flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Print Quote/Preview
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Questions? Contact us at (678) 808-9383 or Glitter873@gmail.com
          </p>
        </div>
      </div>

      {/* Print Preview Modal */}
      {showPrintPreview && (
        <PrintPreviewModal
          product={product}
          quantity={quantity}
          unitPrice={unitPrice}
          totalPrice={totalPrice}
          onClose={() => setShowPrintPreview(false)}
        />
      )}
    </div>
  );
}
