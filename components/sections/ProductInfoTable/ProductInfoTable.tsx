import Image from 'next/image';
import { Product } from '@/types/tiktok';
import { cn } from '@/utils/cn';

interface SectionProps {
  products: Product[];
}

export default function ProductInfoTable({ products }: SectionProps) {
  const Cell = ({ label, product }: { label: string; product: Product }) => {
    switch (label) {
      case 'Image':
        return (
          <Image
            src={product.main_image_url}
            width={80}
            height={80}
            alt={product.title}
            className="rounded-lg overflow-hidden"
          />
        );

      case 'Name':
        return <p className="line-clamp-2">{product.title}</p>;

      case 'Retail Price':
        return `$${product.original_price.minimum_amount} ${product.original_price.currency}`;

      case 'Commission rate':
        return `${product.commission.rate / 100}%`;

      case 'Status':
        return `${product.status}`;

      case 'Collaboration Status':
        return `${product.collaboration_status}`;

      default:
        return <></>;
    }
  };
  return (
    <div className="mb-12">
      <div className="w-full flex flex-row">
        {[
          { label: 'Image', minWidth: 'min-w-24' },
          { label: 'Name', minWidth: 'min-w-60' },
          { label: 'Retail Price', minWidth: 'min-w-28' },
          { label: 'Commission rate', minWidth: 'min-w-36' },
          { label: 'Status', minWidth: 'min-w-24' },
          { label: 'Collaboration Status', minWidth: 'min-w-48' }
        ].map(({ label, minWidth }, index) => (
          <div key={index} className={`flex-grow ${minWidth}`}>
            <div
              className={cn(
                'px-2 py-3 bg-navy-700 text-sm text-navy-50 border border-navy-600 mx-[1px] line-clamp-1',
                index === 0 && 'rounded-tl-lg',
                index === 5 && 'rounded-tr-lg'
              )}
            >
              {label}
            </div>

            {products.map((product, productIndex) => (
              <div
                key={product.id}
                className={cn(
                  'h-24 flex items-center overflow-hidden px-2 py-2 bg-navy-700 text-sm text-navy-50 border-t border-b border-navy-600 my-[2px]',
                  index === 0 && 'rounded-bl-lg border-l ml-[1px]',
                  index === 0 && productIndex > 0 && 'rounded-tl-lg',
                  index === 5 && 'rounded-br-lg border-r mr-[1px]',
                  index === 5 && productIndex > 0 && 'rounded-tr-lg'
                )}
              >
                <Cell label={label} product={product} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
