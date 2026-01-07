'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Package, LogOut } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-center mb-2">{user.name}</h2>
                <p className="text-gray-600 text-sm text-center">{user.email}</p>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-primary-600"
                >
                  Account Details
                </button>
                <button
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Order History
                </button>
                <button
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                </div>

                {user.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-semibold">{user.phone}</p>
                    </div>
                  </div>
                )}

                <button className="btn-secondary">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Package className="w-6 h-6" />
                Recent Orders
              </h3>
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600">No orders yet</p>
                <p className="text-sm text-gray-500 mt-2">Start shopping to see your orders here</p>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Our customer support team is here to assist you.
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(678) 808-9383</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Glitter873@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
