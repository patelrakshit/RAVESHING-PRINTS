import Link from 'next/link';
import Image from 'next/image';

const trending = [
  { image: '/assets/colors/9.jpg', link: '/products?category=homedecor', title: 'Home Decor' },
  { image: '/assets/colors/10.jpg', link: '/products?subcategory=album', title: 'Albums' },
  { image: '/assets/colors/11.jpg', link: '/products?subcategory=crystal', title: 'Crystal' },
  { image: '/assets/colors/12.jpg', link: '/products?subcategory=shirt', title: 'Shirts' },
  { image: '/assets/colors/13.jpg', link: '/products?subcategory=photoframe', title: 'Photo Frames' },
  { image: '/assets/colors/14.jpg', link: '/products?subcategory=lamp', title: 'Lamps' },
  { image: '/assets/colors/15.jpg', link: '/products?subcategory=cushion', title: 'Cushions' },
  { image: '/assets/colors/16.jpg', link: '/products?subcategory=notebook', title: 'Notebooks' },
];

export function TrendingProducts() {
  return (
    <section className="container-custom py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">TRENDING PRODUCTS</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trending.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="relative aspect-square overflow-hidden rounded-lg group"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-semibold text-center bg-gradient-to-t from-black/60">
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
