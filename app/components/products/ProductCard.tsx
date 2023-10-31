import { SearchQuery } from '~/generated/graphql';
import { Link } from '@remix-run/react';
import { Price } from './Price';
import { SfLink } from '@storefront-ui/react';

export type ProductCardProps = SearchQuery['search']['items'][number];
export function ProductCard({
  productAsset,
  productName,
  slug,
  priceWithTax,
  currencyCode,
}: ProductCardProps) {
  return (
    <Link
      to={`/products/${slug}`}
      className="border mx-auto border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]"
    >
      <div className="relative min-w-[200px]">
        <SfLink href="#" className="block">
          <img
            src={productAsset?.preview + '?w=300&h=300'}
            alt="Great product"
            className="object-cover h-auto  aspect-square"
            width="300"
            height="300"
          />
        </SfLink>
      </div>
      <div className="p-4 border-t border-neutral-200">
        <SfLink
          href={`/products/${slug}`}
          variant="secondary"
          className="no-underline"
        >
          {productName}
        </SfLink>

        <p className="block py-2 font-normal typography-text-sm text-neutral-700">
          <Price currencyCode={currencyCode} priceWithTax={priceWithTax} />
        </p>
      </div>
    </Link>
  );
}
