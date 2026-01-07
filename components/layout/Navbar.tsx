'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Menu, X, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout, cart, wishlist } = useStore();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">RAVESHING</span>
            <span className="text-2xl font-bold text-gray-900">PRINTS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              All Products
            </Link>
            <Link href="/products?category=printing" className="text-gray-700 hover:text-primary-600 transition-colors">
              Paper Printing
            </Link>
            <Link href="/products?category=gifts" className="text-gray-700 hover:text-primary-600 transition-colors">
              Gifts
            </Link>
            <Link href="/products?category=homedecor" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home Decor
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </form>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Wishlist Icon */}
            <Link href="/wishlist" className="relative">
              <Heart className="w-6 h-6 text-gray-700 hover:text-red-500 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary-600 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                  <User className="w-5 h-5" />
                  <span>{user?.name || 'Account'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-slide-up">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </form>
            <Link href="/products" className="block py-2 hover:text-primary-600">
              All Products
            </Link>
            <Link href="/products?category=printing" className="block py-2 hover:text-primary-600">
              Paper Printing
            </Link>
            <Link href="/products?category=gifts" className="block py-2 hover:text-primary-600">
              Gifts
            </Link>
            <Link href="/wishlist" className="block py-2 hover:text-primary-600">
              Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
            </Link>
            <Link href="/cart" className="block py-2 hover:text-primary-600">
              Cart {cart.length > 0 && `(${cart.length})`}
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="block py-2 hover:text-primary-600">
                  Profile
                </Link>
                <button onClick={logout} className="block w-full text-left py-2 hover:text-primary-600">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="block py-2 text-primary-600 font-medium">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
