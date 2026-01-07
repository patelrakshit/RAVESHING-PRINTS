import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary-500">RAVESHING</span> <span className="text-white">PRINTS</span>
            </h3>
            <p className="text-gray-400">
              Your one-stop solution for all customized printing needs.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=printing" className="text-gray-400 hover:text-white transition-colors">
                  Paper Printing
                </Link>
              </li>
              <li>
                <Link href="/products?category=gifts" className="text-gray-400 hover:text-white transition-colors">
                  Gifts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Popular Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?subcategory=visitingcard" className="text-gray-400 hover:text-white transition-colors">
                  Visiting Cards
                </Link>
              </li>
              <li>
                <Link href="/products?subcategory=tshirt" className="text-gray-400 hover:text-white transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?subcategory=mug" className="text-gray-400 hover:text-white transition-colors">
                  Mugs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400 mb-2">1230 S Hairston Rd St4</p>
            <p className="text-gray-400 mb-2">Stone Mountain, GA 30088</p>
            <p className="text-gray-400 mb-2">Phone: (678) 808-9383</p>
            <p className="text-gray-400">Email: Glitter873@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RAVESHING PRINTS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
