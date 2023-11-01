import { SearchQuery } from '~/generated/graphql';
import { Link, unstable_useViewTransitionState } from '@remix-run/react';
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
  const isTransitioning = unstable_useViewTransitionState(`/products/${slug}`);
  return (
    <Link
      to={`/products/${slug}`}
      className="border mx-auto border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]"
      unstable_viewTransition
    >
      <div className="relative min-w-[200px]">
        <SfLink href="#" className="block">
          <img
            src={productAsset?.preview + '?w=300&h=300'}
            alt="Great product"
            className="object-cover h-auto  aspect-square"
            width="300"
            height="300"
            style={
              {
                viewTransitionName: isTransitioning ? 'image-expand' : '',
              } as any
            }
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
