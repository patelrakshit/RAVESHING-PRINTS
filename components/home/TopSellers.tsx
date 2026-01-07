import Link from 'next/link';
import Image from 'next/image';

const topSellers = [
  { image: '/assets/colors/1.jpg', link: '/products?subcategory=visitingcard', title: 'Visiting Cards' },
  { image: '/assets/colors/2.jpg', link: '/products?subcategory=stamp', title: 'Stamps' },
  { image: '/assets/colors/3.jpg', link: '/products?subcategory=mug', title: 'Mugs' },
  { image: '/assets/colors/4.jpg', link: '/products?subcategory=tshirt', title: 'T-Shirts' },
  { image: '/assets/colors/5.jpg', link: '/products?subcategory=banner', title: 'Banners' },
  { image: '/assets/colors/6.jpg', link: '/products?subcategory=invitation', title: 'Invitations' },
  { image: '/assets/colors/7.jpg', link: '/products?category=graphic', title: 'Graphic Design' },
  { image: '/assets/colors/8.jpg', link: '/products?category=gifts', title: 'Gifts' },
];

export function TopSellers() {
  return (
    <section className="container-custom py-12">
      <h2 className="text-3xl font-bold text-center mb-8">TOP SELLERS</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topSellers.map((item, index) => (
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
