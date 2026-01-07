import Link from 'next/link';
import Image from 'next/image';

const machineries = [
  { image: '/assets/colors/21.jpg', link: '/products?subcategory=heatpress', title: 'Heat Press' },
  { image: '/assets/colors/17.jpg', link: '/products?subcategory=mugprinting', title: 'Mug Printing' },
  { image: '/assets/colors/18.jpg', link: '/products?subcategory=lamination', title: 'Lamination' },
  { image: '/assets/colors/19.jpg', link: '/products?subcategory=selfinkstamp', title: 'Self Ink Stamp' },
  { image: '/assets/colors/20.jpg', link: '/products?subcategory=polymerstamp', title: 'Polymer Stamp' },
];

export function Machineries() {
  return (
    <section className="container-custom py-12">
      <h2 className="text-3xl font-bold text-center mb-8">MACHINERIES</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {machineries.map((item, index) => (
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
