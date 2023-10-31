import { Form, Link, useLoaderData } from '@remix-run/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { SearchBar } from '~/components/header/SearchBar';
import { useRootLoader } from '~/utils/use-root-loader';
import { UserIcon } from '@heroicons/react/24/solid';
import { useScrollingUp } from '~/utils/use-scrolling-up';
import { classNames } from '~/utils/class-names';
import {
  SfButton,
  SfIconExpandMore,
  SfIconFavorite,
  SfIconLogout,
  SfIconMenu,
  SfIconPerson,
  SfIconSearch,
  SfIconShoppingCart,
  SfInput,
  SfTooltip,
} from '@storefront-ui/react';
import SfHeader from './SfHeader';

export function Header({
  onCartIconClick,
  cartQuantity,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
}) {
  const data = useRootLoader();
  const isSignedIn = !!data.activeCustomer.activeCustomer?.id;
  const isScrollingUp = useScrollingUp();

  return (
    <header
      className={classNames(
        isScrollingUp ? 'sticky top-0 z-10 animate-dropIn' : '',
        'bg-primary-500 shadow-lg transform ',
      )}
    >
      <div className="max-w-6xl mx-auto p-4 flex items-center space-x-4">
        <h1 className="text-white w-10">
          <Link to="/">
            <img
              src="/cube-logo-small.webp"
              width={40}
              height={31}
              alt="Vendure logo"
            />
          </Link>
        </h1>
        <div className="space-x-4 hidden sm:block">
          {data.collections.map((collection) => (
            <Link
              className="text-sm md:text-base text-gray-200 hover:text-white"
              to={'/collections/' + collection.slug}
              prefetch="intent"
              key={collection.id}
            >
              {collection.name}
            </Link>
          ))}
        </div>
        <div className="flex-1 md:pr-8">
          <SearchBar></SearchBar>
        </div>
        <div className=" flex gap-2 items-center">
          <button
            className="relative w-9 h-9 bg-opacity-20 rounded text-white p-1 hover:bg-primary-600 text-center"
            onClick={onCartIconClick}
            aria-label="Open cart tray"
          >
            <SfIconShoppingCart className="mx-auto" />
            {cartQuantity ? (
              <div className="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
                {cartQuantity}
              </div>
            ) : (
              ''
            )}
          </button>
          {isSignedIn ? (
            <Form method="post" action="/api/logout">
              <SfTooltip label="Logout">
                <button className="text-white h-9 w-9 hover:bg-primary-600 rounded">
                  {' '}
                  <SfIconLogout className="mx-auto" />
                </button>
              </SfTooltip>
            </Form>
          ) : (
            <Link
              to="/sign-in"
              className="hover:bg-primary-600 w-9 h-9 p-1 rounded text-center"
            >
              <SfIconPerson className="text-white mx-auto" />
            </Link>
          )}
        </div>
      </div>
    </header>

    // <SfHeader />
  );
}
