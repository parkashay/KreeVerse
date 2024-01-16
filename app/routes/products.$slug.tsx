import { LoaderFunctionArgs, json } from '@remix-run/server-runtime';
import { useState, useRef } from 'react';
import { Price } from '~/components/products/Price';
import { getProductBySlug } from '~/providers/products/products';
import {
  FetcherWithComponents,
  ShouldRevalidateFunction,
  useLoaderData,
  useOutletContext,
  MetaFunction,
  Link,
} from '@remix-run/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { APP_META_TITLE } from '~/constants';
import { CartLoaderData } from '~/routes/api.active-order';
import { getSessionStorage } from '~/sessions';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import TopReviews from '~/components/products/TopReviews';
// import {
//   SfButton,
//   SfIconPackage,
//   SfIconShoppingCart,
//   SfIconUnfoldMore,
// } from '@storefront-ui/react';
import {
  SfSelect,
  SfRating,
  SfButton,
  SfLink,
  SfCounter,
  SfIconShoppingCart,
  SfIconCompareArrows,
  SfIconFavorite,
  SfIconSell,
  SfIconPackage,
  SfIconRemove,
  SfIconAdd,
  SfIconWarehouse,
  SfIconSafetyCheck,
  SfIconShoppingCartCheckout,
  SfIconArrowForward,
} from '@storefront-ui/react';
import { useCounter } from 'react-use';
import { useId, ChangeEvent } from 'react';
import { clamp } from '@storefront-ui/shared';
import { useIntersection } from 'react-use';
import { type SfScrollableOnDragEndData } from '@storefront-ui/react';
import GalleryVertical from '~/components/products/Gallery';
export const meta: MetaFunction = ({ data }) => {
  return [
    {
      title: data?.product?.name
        ? `${data.product.name} - ${APP_META_TITLE}`
        : APP_META_TITLE,
    },
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { product } = await getProductBySlug(params.slug!, { request });
  if (!product) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
  const session = await getSessionStorage().getSession(
    request?.headers.get('Cookie'),
  );
  const error = session.get('activeOrderError');
  return json(
    { product: product!, error },
    {
      headers: {
        'Set-Cookie': await getSessionStorage().commitSession(session),
      },
    },
  );
}

export const shoudRevalidate: ShouldRevalidateFunction = () => true;

export default function ProductSlug() {
  const inputId = useId();
  const min = 1;
  const max = 999;
  const [value, { inc, dec, set }] = useCounter(min);
  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { value: currentValue } = event.target;
    const nextValue = parseFloat(currentValue);
    set(Number(clamp(nextValue, min, max)));
  }
  const { product, error } = useLoaderData<typeof loader>();
  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
  }>();
  const { activeOrder } = activeOrderFetcher.data ?? {};
  const addItemToOrderError = getAddItemToOrderError(error);

  if (!product) {
    return <div>Product not found!</div>;
  }

  const findVariantById = (id: string) =>
    product.variants.find((v) => v.id === id);

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0].id,
  );
  const selectedVariant = findVariantById(selectedVariantId);
  if (!selectedVariant) {
    setSelectedVariantId(product.variants[0].id);
  }

  const qtyInCart =
    activeOrder?.lines.find((l) => l.productVariant.id === selectedVariantId)
      ?.quantity ?? 0;

  const asset = product.assets[0];
  const brandName = product.facetValues.find(
    (fv) => fv.facet.code === 'brand',
  )?.name;

  const [featuredAsset, setFeaturedAsset] = useState(
    selectedVariant?.featuredAsset,
  );

  const lastThumbRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const firstThumbRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const firstThumbVisible = useIntersection(firstThumbRef, {
    root: thumbsRef.current,
    rootMargin: '0px',
    threshold: 1,
  });

  const lastThumbVisible = useIntersection(lastThumbRef, {
    root: thumbsRef.current,
    rootMargin: '0px',
    threshold: 1,
  });

  const onDragged = (event: SfScrollableOnDragEndData) => {
    if (event.swipeRight && activeIndex > 0) {
      setActiveIndex((currentActiveIndex) => currentActiveIndex - 1);
    } else if (event.swipeLeft && activeIndex < product.assets.length - 1) {
      setActiveIndex((currentActiveIndex) => currentActiveIndex + 1);
    }
  };
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {product.name}
        </h2>
        <Breadcrumbs
          items={
            product.collections[product.collections.length - 1]?.breadcrumbs ??
            []
          }
        ></Breadcrumbs>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
          {/* Image gallery */}
          <GalleryVertical featuredAsset={product.assets} alt={product.name} />

          {/* Product info */}
          {/* <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="">
              <h3 className="sr-only">Description</h3>
              <h2 className="mb-1 font-bold text-2xl"> {product.name} </h2>
              <div
                className="text-base text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            </div>
            <activeOrderFetcher.Form method="post" action="/api/active-order">
              <input type="hidden" name="action" value="addItemToOrder" />
              {1 < product.variants.length ? (
                <div className="mt-4">
                  <label>
                    <SfSelect
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      id="productVariant"
                      value={selectedVariantId}
                      name="variantId"
                      onChange={(e) => {
                        setSelectedVariantId(e.target.value);

                        const variant = findVariantById(e.target.value);
                        if (variant) {
                          setFeaturedAsset(variant!.featuredAsset);
                        }
                      }}
                    >
                      {product.variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.name}
                        </option>
                      ))}
                    </SfSelect>
                  </label>
                </div>
              ) : (
                <input
                  type="hidden"
                  name="variantId"
                  value={selectedVariantId}
                ></input>
              )}

              <div className="mt-10 flex flex-col gap-3">
                <p className="text-3xl text-gray-900 mr-4">
                  <Price
                    priceWithTax={selectedVariant?.priceWithTax}
                    currencyCode={selectedVariant?.currencyCode}
                  ></Price>
                </p>
                <div className="flex sm:flex-col1 align-baseline">
                  <SfButton
                    type="submit"
                    className={`max-w-xs flex-1 ${
                      activeOrderFetcher.state !== 'idle'
                        ? 'bg-gray-400'
                        : qtyInCart === 0
                        ? 'bg-primary-500 hover:bg-primary-700'
                        : 'bg-green-500 active:bg-green-700 hover:bg-green-700'
                    }
                                     transition-colors border border-transparent rounded-md py-3 px-8 flex items-center
                                      justify-center text-base font-medium text-white focus:outline-none
                                      focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full`}
                    disabled={activeOrderFetcher.state !== 'idle'}
                  >
                    {qtyInCart ? (
                      <span className="flex items-center gap-2">
                        <SfIconShoppingCartCheckout /> {qtyInCart} in cart
                      </span>
                    ) : (
                      <span className="flex gap-2 items-center">
                        <SfIconAddShoppingCart />
                        Add to cart
                      </span>
                    )}
                  </SfButton>
                </div>
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <span className="text-gray-500">{selectedVariant?.sku}</span>
                <StockLevelLabel stockLevel={selectedVariant?.stockLevel} />
              </div>
              {addItemToOrderError && (
                <div className="mt-4">
                  <Alert message={addItemToOrderError} />
                </div>
              )}

              <section className="mt-12 pt-12 border-t ">
                <h3 className="text-gray-600 font-light text-lg mb-2 ">
                  Shipping & Returns
                </h3>
                <div className="text-gray-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <SfIconPackage />
                    Standard shipping: 3 - 5 working days. Express shipping: 1 -
                    3 working days.
                  </div>
                  <div className="flex items-center gap-2">
                    <SfIconCreditCard />
                    Shipping costs depend on delivery address and will be
                    calculated during checkout.
                  </div>
                  <div className="flex items-center gap-2">
                    <SfIconCheckCircle />
                    <span>
                      Returns are subject to terms. Please see the{' '}
                      <span className="underline">returns page</span> for
                      further information.
                    </span>
                  </div>
                </div>
              </section>
            </activeOrderFetcher.Form>
          </div> */}
          <section className="md:max-w-[640px]">
            <div className="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4">
              <SfIconSell size="sm" className="mr-1.5" />
              Sale
            </div>
            <h1 className="mb-1 font-bold typography-headline-4 capitalize">
              {product.name}
            </h1>
            <strong className="block font-bold typography-headline-3">
              <Price
                priceWithTax={selectedVariant?.priceWithTax}
                currencyCode={selectedVariant?.currencyCode}
              ></Price>
            </strong>
            <div className="inline-flex items-center mt-4 mb-2">
              <SfRating size="xs" value={3} max={5} />
              <SfCounter className="ml-1" size="xs">
                123
              </SfCounter>
              <SfLink
                href="#"
                variant="secondary"
                className="ml-2 text-xs text-neutral-500"
              >
                123 reviews
              </SfLink>
            </div>
            <div
              className="text-base text-gray-700"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
            {/* <ul className="mb-4 font-normal typography-text-sm">
              <li>HD Pictures & Videos and FPV Function</li>
              <li>Intelligent Voice Control</li>
              <li>Multiple Fun Flights</li>
              <li>Easy to Use</li>
              <li>Foldable Design & Double Flight Time</li>
            </ul> */}
            <activeOrderFetcher.Form method="post" action="/api/active-order">
              <input type="hidden" name="action" value="addItemToOrder" />
              {1 < product.variants.length ? (
                <div className="mt-4">
                  <label>
                    <SfSelect
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      id="productVariant"
                      value={selectedVariantId}
                      name="variantId"
                      onChange={(e) => {
                        setSelectedVariantId(e.target.value);

                        const variant = findVariantById(e.target.value);
                        if (variant) {
                          setFeaturedAsset(variant!.featuredAsset);
                        }
                      }}
                    >
                      {product.variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.name}
                        </option>
                      ))}
                    </SfSelect>
                  </label>
                </div>
              ) : (
                <input
                  type="hidden"
                  name="variantId"
                  value={selectedVariantId}
                ></input>
              )}
              <div className="py-4 mb-4 border-gray-200 border-y">
                <div className="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md">
                  <SfIconShoppingCartCheckout />
                  {qtyInCart} in cart
                </div>
                <div className="items-start xs:flex">
                  <div className="flex flex-col items-stretch xs:items-center xs:inline-flex">
                    <div className="flex border border-neutral-300 rounded-md">
                      <SfButton
                        variant="tertiary"
                        square
                        className="rounded-r-none p-3"
                        disabled={value <= min}
                        aria-controls={inputId}
                        aria-label="Decrease value"
                        onClick={() => {
                          dec();
                          // adjustOrderLine &&
                          //   adjustOrderLine(product.id, value - 1);
                        }}
                      >
                        <SfIconRemove />
                      </SfButton>
                      <input
                        id={inputId}
                        type="number"
                        role="spinbutton"
                        className="grow appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                        min={min}
                        max={max}
                        value={value}
                        onChange={handleOnChange}
                      />
                      <SfButton
                        variant="tertiary"
                        square
                        className="rounded-l-none p-3"
                        disabled={value >= max}
                        aria-controls={inputId}
                        aria-label="Increase value"
                        onClick={() => inc()}
                      >
                        <SfIconAdd />
                      </SfButton>
                    </div>
                    <p className="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
                      <strong className="text-neutral-900">{max}</strong> in
                      stock
                    </p>
                  </div>
                  <input type="hidden" value={value} name="quantity" />
                  <SfButton
                    type="submit"
                    size="lg"
                    className="w-full xs:ml-4"
                    slotPrefix={<SfIconShoppingCart size="sm" />}
                  >
                    Add to cart
                  </SfButton>
                </div>
                {qtyInCart > 0 && (
                  <Link
                    to={'/checkout'}
                    className="bg-white border-primary-500 border text-primary-700 flex justify-center mt-2 gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md"
                  >
                    Continue to Checkout
                    <SfIconArrowForward />
                  </Link>
                )}
                <div className="flex justify-center mt-4 gap-x-4">
                  <SfButton
                    size="sm"
                    variant="tertiary"
                    slotPrefix={<SfIconCompareArrows size="sm" />}
                  >
                    Compare
                  </SfButton>
                  <SfButton
                    size="sm"
                    variant="tertiary"
                    slotPrefix={<SfIconFavorite size="sm" />}
                  >
                    Add to list
                  </SfButton>
                </div>
              </div>
            </activeOrderFetcher.Form>

            <div className="flex first:mt-4">
              <SfIconPackage
                size="sm"
                className="flex-shrink-0 mr-1 text-neutral-500"
              />
              <p className="text-sm">
                Free shipping, arrives by Thu, Apr 7. Want it faster?
                <SfLink href="#" variant="secondary" className="mx-1">
                  Add an address
                </SfLink>
                to see options
              </p>
            </div>
            <div className="flex mt-4">
              <SfIconWarehouse
                size="sm"
                className="flex-shrink-0 mr-1 text-neutral-500"
              />
              <p className="text-sm">
                Pickup not available at your shop.
                <SfLink href="#" variant="secondary" className="ml-1">
                  Check availability nearby
                </SfLink>
              </p>
            </div>
            <div className="flex mt-4">
              <SfIconSafetyCheck
                size="sm"
                className="flex-shrink-0 mr-1 text-neutral-500"
              />
              <p className="text-sm">
                Free 30-days returns.
                <SfLink href="#" variant="secondary" className="ml-1">
                  Details
                </SfLink>
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className="mt-24">
        <TopReviews></TopReviews>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        Product not found!
      </h2>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
        {/* Image gallery */}
        <div className="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <span className="rounded-md overflow-hidden">
            <div className="w-full h-96 bg-slate-200 rounded-lg flex content-center justify-center">
              <PhotoIcon className="w-48 text-white"></PhotoIcon>
            </div>
          </span>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="">We couldn't find any product at that address!</div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAddItemToOrderError(error?: ErrorResult): string | undefined {
  if (!error || !error.errorCode) {
    return undefined;
  }
  switch (error.errorCode) {
    case ErrorCode.OrderModificationError:
    case ErrorCode.OrderLimitError:
    case ErrorCode.NegativeQuantityError:
    case ErrorCode.InsufficientStockError:
      return error.message;
  }
}
