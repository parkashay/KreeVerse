import { SearchQuery } from '~/generated/graphql';
import { Link } from '@remix-run/react';
import { Price } from './Price';
import {
  SfLink,
  SfButton,
  SfIconFavorite,
  SfRating,
  SfCounter,
  SfIconShoppingCart,
} from '@storefront-ui/react';

export type ProductCardProps = SearchQuery['search']['items'][number];
export function ProductCard({
  productAsset,
  productName,
  slug,
  priceWithTax,
  currencyCode,
}: ProductCardProps) {
  return (
    // <Link className="flex flex-col" prefetch="intent" to={`/products/${slug}`}>
    //   <img
    //     className="rounded-xl flex-grow object-cover aspect-[7/8]"
    //     alt=""
    //     src={productAsset?.preview + '?w=300&h=400'}
    //   />
    //   <div className="h-2" />
    //   <div className="text-sm text-gray-700">{productName}</div>
    //   <div className="text-sm font-medium text-gray-900">
    //     <Price priceWithTax={priceWithTax} currencyCode={currencyCode} />
    //   </div>
    // </Link>
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
        <SfButton
          variant="primary"
          size="sm"
          square
          className="absolute bottom-0 right-0 mr-2 mb-2 ring-1 ring-inset ring-neutral-200 !rounded-full text-white"
          aria-label="Add to wishlist"
        >
          <SfIconFavorite size="sm" />
        </SfButton>
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
