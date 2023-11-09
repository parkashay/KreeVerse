import { SearchQuery } from '~/generated/graphql';
import {
  Link,
  unstable_useViewTransitionState,
  useNavigate,
} from '@remix-run/react';
import {
  SfButton,
  SfCounter,
  SfIconFavorite,
  SfIconShoppingCart,
  SfLink,
  SfRating,
} from '@storefront-ui/react';
import { Price } from './Price';

export type ProductCardProps = SearchQuery['search']['items'][number];
export function ProductCard({
  productAsset,
  productName,
  slug,
  priceWithTax,
  currencyCode,
}: ProductCardProps) {
  const navigate = useNavigate();
  return (
    // <Link
    //   to={`/products/${slug}`}
    //   className="border mx-auto border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]"
    //   unstable_viewTransition
    // >
    //   <div className="relative min-w-[200px]">
    //     <SfLink href="#" className="block">
    //       <img
    //         src={productAsset?.preview + '?w=300&h=300'}
    //         alt="Great product"
    //         className="object-cover h-auto  aspect-square"
    //         width="300"
    //         height="300"
    //         style={
    //           {
    //             viewTransitionName: isTransitioning ? 'image-expand' : '',
    //           } as any
    //         }
    //       />
    //     </SfLink>
    //   </div>
    //   <div className="p-4 border-t border-neutral-200">
    //     <SfLink
    //       href={`/products/${slug}`}
    //       variant="secondary"
    //       className="no-underline"
    //     >
    //       {productName}
    //     </SfLink>

    //     <p className="block py-2 font-normal typography-text-sm text-neutral-700">
    //       <Price currencyCode={currencyCode} priceWithTax={priceWithTax} />
    //     </p>
    //   </div>
    // </Link>
    <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
      <div className="relative">
        <SfLink href={`/products/${slug}`} className="block">
          <img
            src={productAsset?.preview + '?w=300&h=300'}
            alt="Great product"
            className="object-cover h-auto rounded-md aspect-square"
            width="300"
            height="300"
          />
        </SfLink>
        <SfButton
          variant="tertiary"
          size="sm"
          square
          className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
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
        <div className="flex items-center pt-1">
          <SfRating size="xs" value={5} max={5} />

          <SfLink
            href={`/products/${slug}`}
            variant="secondary"
            className="pl-1 no-underline"
          >
            <SfCounter size="xs">{123}</SfCounter>
          </SfLink>
        </div>
        <p className="block py-2 font-normal typography-text-sm text-neutral-700">
          Lightweight • Non slip • Flexible outsole • Easy to wear on and off
        </p>
        <span className="block pb-2 font-bold typography-text-lg">
          <Price priceWithTax={priceWithTax} currencyCode={currencyCode} />
        </span>
        <SfButton
          onClick={() => navigate(`/products/${slug}`)}
          size="sm"
          slotPrefix={<SfIconShoppingCart size="sm" />}
        >
          Add to cart
        </SfButton>
      </div>
    </div>
  );
}
