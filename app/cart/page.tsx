'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const itemsList = cart
      .map((item, idx) => `${idx + 1}. ${item.title}\n   Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}`)
      .join('\n\n');

    const message = `*New Order Request*\n\n${itemsList}\n\n*Subtotal:* $${subtotal.toFixed(2)}\n*Tax (8%):* $${tax.toFixed(2)}\n*Total:* $${total.toFixed(2)}\n\nPlease confirm my order. Thank you!`;

    const whatsappUrl = `https://wa.me/16788089383?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link href="/products" className="btn-primary inline-block">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg border border-gray-200">
              <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <Link href={`/products/${item.id}`} className="font-semibold text-lg hover:text-primary-600 line-clamp-2">
                  {item.title}
                </Link>
                <p className="text-primary-600 font-bold mt-1">${item.price.toFixed(2)}</p>

                <div className="flex items-center gap-4 mt-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Remove from cart"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div className="text-right">
                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
          >
            Clear all items
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({cart.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Checkout via WhatsApp
              </button>

              <Link
                href="/products"
                className="block w-full text-center btn-secondary"
              >
                Continue Shopping
              </Link>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Questions? Contact us at (678) 808-9383
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
