import { Link, useLoaderData } from '@remix-run/react';
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
  SfIconMenu,
  SfIconPerson,
  SfIconSearch,
  SfIconShoppingCart,
  SfInput,
} from '@storefront-ui/react';

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

  const actionItems = [
    {
      icon: <SfIconShoppingCart />,
      label: '',
      ariaLabel: 'Cart',
      role: 'button',
    },
    {
      icon: <SfIconFavorite />,
      label: '',
      ariaLabel: 'Wishlist',
      role: 'button',
    },
    {
      label: 'Log in',
      icon: <SfIconPerson />,
      ariaLabel: 'Log in',
      role: 'login',
    },
  ];

  return (
    // <header
    //   className={classNames(
    //     isScrollingUp ? 'sticky top-0 z-10 animate-dropIn' : '',
    //     'bg-gradient-to-r from-zinc-700 to-gray-900 shadow-lg transform ',
    //   )}
    // >
    //   <div className="bg-zinc-100 text-gray-600 shadow-inner text-center text-sm py-2 px-2 xl:px-0">
    //     <div className="max-w-6xl mx-2 md:mx-auto flex items-center justify-between">
    //       <div>
    //         Vue storefront
    //       </div>
    //       <div>
    //         <Link
    //           to={isSignedIn ? '/account' : '/sign-in'}
    //           className="flex space-x-1"
    //         >
    //           <UserIcon className="w-4 h-4"></UserIcon>
    //           <span>{isSignedIn ? 'My Account' : 'Sign In'}</span>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="max-w-6xl mx-auto p-4 flex items-center space-x-4">
    //     <h1 className="text-white w-10">
    //       <Link to="/">
    //         <img
    //           src="/cube-logo-small.webp"
    //           width={40}
    //           height={31}
    //           alt="Vendure logo"
    //         />
    //       </Link>
    //     </h1>
    //     <div className="flex space-x-4 hidden sm:block">
    //       {data.collections.map((collection) => (
    //         <Link
    //           className="text-sm md:text-base text-gray-200 hover:text-white"
    //           to={'/collections/' + collection.slug}
    //           prefetch="intent"
    //           key={collection.id}
    //         >
    //           {collection.name}
    //         </Link>
    //       ))}
    //     </div>
    //     <div className="flex-1 md:pr-8">
    //       <SearchBar></SearchBar>
    //     </div>
    //     <div className="">
    //       <button
    //         className="relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"
    //         onClick={onCartIconClick}
    //         aria-label="Open cart tray"
    //       >
    //         <ShoppingBagIcon></ShoppingBagIcon>
    //         {cartQuantity ? (
    //           <div className="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
    //             {cartQuantity}
    //           </div>
    //         ) : (
    //           ''
    //         )}
    //       </button>
    //     </div>
    //   </div>
    // </header>
    <header
      className={classNames(
        isScrollingUp ? 'sticky top-0 z-10 animate-dropIn' : '',
        'bg-primary-400 shadow-lg transform h-24 px-3 md:px-6 lg:px-12',
      )}
    >
      <div className="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full">
        <a
          href="/"
          aria-label="SF Homepage"
          className="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
        >
          <picture>
            <source
              srcSet="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_white.svg"
              media="(min-width: 768px)"
            />
            <img
              src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign_white.svg"
              alt="Sf Logo"
              className="w-8 h-8 md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]"
            />
          </picture>
        </a>
        <SfButton
          aria-label="Open categories"
          className="lg:hidden order-first lg:order-1 mr-4 text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
          square
          variant="tertiary"
        >
          <SfIconMenu />
        </SfButton>
        <SfButton
          variant="secondary"
          className="hidden lg:flex lg:mr-4 text-white  bg-transparent"
          type="button"
          slotSuffix={
            <SfIconExpandMore className="hidden lg:block !text-white" />
          }
        >
          <span className="hidden lg:flex whitespace-nowrap">
            Browse products
          </span>
        </SfButton>
        <form
          role="search"
          className="flex flex-[100%] order-last lg:order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
          onSubmit={() => null}
        >
          <SfInput
            type="search"
            className="[&::-webkit-search-cancel-button]:appearance-none"
            placeholder="Search"
            wrapperClassName="flex-1 h-10 pr-0"
            size="base"
            slotSuffix={
              <span className="flex items-center">
                <SfButton
                  variant="tertiary"
                  square
                  aria-label="search"
                  type="submit"
                  className="rounded-l-none hover:bg-transparent active:bg-transparent"
                >
                  <SfIconSearch />
                </SfButton>
              </span>
            }
          />
        </form>
        <nav className="flex-1 flex justify-end lg:order-last lg:ml-4">
          <div className="flex flex-row flex-nowrap">
            {actionItems.map((actionItem) => (
              <SfButton
                key={actionItem.ariaLabel}
                className="mr-2 -ml-0.5 rounded-md text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                aria-label={actionItem.ariaLabel}
                variant="tertiary"
                square
                slotPrefix={actionItem.icon}
              >
                {actionItem.role === 'login' && (
                  <p className="hidden xl:inline-flex whitespace-nowrap">
                    {actionItem.label}
                  </p>
                )}
              </SfButton>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
