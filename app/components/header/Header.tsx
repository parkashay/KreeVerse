import { Form, Link, useNavigate } from '@remix-run/react';
import {
  SfIconShoppingCart,
  SfIconPerson,
  SfIconClose,
  SfButton,
  SfDrawer,
  SfListItem,
  SfIconChevronRight,
  SfIconMenu,
  useDropdown,
  useTrapFocus,
  useDisclosure,
  SfInput,
  SfIconSearch,
  SfIconLogout,
} from '@storefront-ui/react';
import { type FocusEvent, Fragment, useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ActiveCustomerQuery, Collection } from '~/generated/graphql';

export default function Header({
  onCartIconClick,
  cartQuantity,
  collections,
  activeCustomer,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
  collections: any;
  activeCustomer: ActiveCustomerQuery | undefined;
}) {
  const drawerRef = useRef(null);
  const megaMenuRef = useRef(null);
  const [activeNode, setActiveNode] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const { open, isOpen, close } = useDisclosure();

  const { refs, style } = useDropdown({
    isOpen,
    onClose: (event: KeyboardEvent) => {
      close();
    },
    placement: 'bottom-start',
    middleware: [],
    onCloseDeps: [activeNode],
  });

  const trapFocusOptions = {
    activeState: isOpen,
    arrowKeysUpDown: true,
    initialFocus: 'container',
  } as const;
  useTrapFocus(megaMenuRef, trapFocusOptions);
  useTrapFocus(drawerRef, trapFocusOptions);

  const handleOpenMenu = (menuType: string[]) => () => {
    setActiveNode(menuType);
    open();
  };

  const handleBlurWithin = (event: FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      close();
    }
  };

  const [closable, setClosable] = useState<boolean>();
  useEffect(() => {
    if (window.innerWidth >= 600) setClosable(true);
    else setClosable(false);
  }, []);

  return (
    <div className="w-full h-full">
      <header className="relative z-30" ref={refs.setReference}>
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center px-4 md:px-10 py-2 md:py-5 w-full border-0 bg-primary-700 border-neutral-200 h-full md:z-10">
          <div className="flex items-center">
            <SfButton
              onClick={handleOpenMenu([])}
              variant="tertiary"
              square
              aria-label="Close menu"
              className="block md:hidden mr-5 bg-transparent hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white"
            >
              <SfIconMenu className="text-white" />
            </SfButton>
            <Link
              to="/"
              aria-label="SF Homepage"
              className="text-2xl font-bold text-white"
            >
              KreeVerse
            </Link>
          </div>
          <Form
            role="search"
            className="hidden md:flex flex-[100%] ml-10"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?q=${inputValue}`);
            }}
          >
            <SfInput
              value={inputValue}
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
              onChange={(event) => setInputValue(event.target.value)}
            />
          </Form>
          <nav className="flex flex-nowrap justify-end items-center md:ml-10 gap-x-1">
            <SfButton
              variant="primary"
              onClick={() => onCartIconClick()}
              className="relative shadow-none hover:bg-opacity-0 hover:shadow-none active:shadow-none active:bg-opacity-0"
              style={{ boxShadow: 'none' }}
            >
              <SfIconShoppingCart />
              {cartQuantity > 0 ? (
                <span className="bg-white rounded-full h-6 w-6 text-primary-400 absolute -top-1 -right-1">
                  {cartQuantity}
                </span>
              ) : (
                ''
              )}{' '}
            </SfButton>
            {!activeCustomer ? (
              <Link
                to={'/sign-in'}
                // onClick={() => navigate('/sign-in')}
                children={<SfIconPerson />}
                className="shadow-none !hover:shadow-none text-white hover:bg-opacity-0 mx-2 active:shadow-none active:bg-opacity-0"
              />
            ) : (
              <>
                <Link
                  to={'/account'}
                  // onClick={() => navigate('/sign-in')}
                  children={<SfIconPerson />}
                  className="shadow-none hover:shadow-none text-white hover:bg-opacity-0 active:shadow-none active:bg-opacity-0"
                />
                <Form action="/api/logout" method="post">
                  <SfButton
                    style={{ boxShadow: 'none' }}
                    className="shadow-none hover:shadow-none hover:bg-opacity-0 active:bg-opacity-0"
                    type="submit"
                    children={<SfIconLogout />}
                  />
                </Form>
              </>
            )}
          </nav>
          <Form
            role="search"
            className="flex md:hidden flex-[100%] my-2"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?q=${inputValue}`);
            }}
          >
            <SfInput
              value={inputValue}
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
              onChange={(event) => setInputValue(event.target.value)}
            />
          </Form>
        </div>
        {/* Desktop dropdown */}
        <nav ref={refs.setFloating}>
          <ul
            className="hidden md:flex px-6 py-2 bg-white border-b border-b-neutral-200 border-b-solid gap-2"
            onBlur={handleBlurWithin}
          >
            {collections.map((collection: Collection) => {
              return (
                <li key={collection.id}>
                  <SfButton
                    variant="tertiary"
                    onMouseEnter={handleOpenMenu([collection.id])}
                    onClick={() => navigate(`/collections/${collection.slug}`)}
                    className="group mr-2 !text-neutral-900 hover:!bg-neutral-200 hover:!text-neutral-700 active:!bg-neutral-300 active:!text-neutral-900"
                  >
                    <span>{collection.name}</span>
                    <SfIconChevronRight className="rotate-90 text-neutral-500 group-hover:text-neutral-700 group-active:text-neutral-900" />
                  </SfButton>

                  {isOpen &&
                    activeNode.length === 1 &&
                    activeNode[0] === collection.id && (
                      <div
                        key={collection.id}
                        style={style}
                        ref={megaMenuRef}
                        className="hidden md:grid gap-x-6 grid-cols-4 bg-white shadow-lg p-6 left-0 right-0 outline-none"
                        tabIndex={0}
                        onMouseLeave={close}
                      >
                        {collection.children?.map((node) => (
                          <Fragment key={node.id}>
                            <SfListItem
                              as="a"
                              size="sm"
                              className="typography-text-sm mb-2"
                              // onClick={(e) => {
                              //   navigate(`/collections/${node.slug}`);
                              //   handleOpenMenu([collection.id]);
                              // }}
                              href={`/collections/${node.slug}`}
                            >
                              {node.name}
                            </SfListItem>

                            <div className="col-start-2 col-end-5" />
                          </Fragment>
                        ))}
                        <div className="flex flex-col items-center justify-center overflow-hidden rounded-md bg-neutral-100 border-neutral-300 grow">
                          <img
                            src={collection.featuredAsset?.preview}
                            alt={collection.name}
                            className="object-contain"
                          />
                          <p className="px-4 mt-4 mb-4 font-medium text-center typography-text-base">
                            {collection.name}
                          </p>
                        </div>
                      </div>
                    )}
                </li>
              );
            })}
          </ul>
        </nav>
        {isOpen && (
          <>
            <div className="md:hidden fixed inset-0 bg-neutral-500 bg-opacity-50" />
            <SfDrawer
              ref={drawerRef}
              open={isOpen}
              onClose={() => {
                !closable && close();
              }}
              placement="left"
              className="md:hidden right-[50px] max-w-[376px] bg-white overflow-y-auto"
            >
              <nav>
                {/* Mobile Navbar */}
                <nav>
                  <ul>
                    <li role="none">
                      <CSSTransition
                        in={isOpen}
                        timeout={500}
                        unmountOnExit
                        classNames={{
                          enter:
                            '-translate-x-full md:opacity-0 md:translate-x-0',
                          enterActive:
                            'translate-x-0 md:opacity-100 transition duration-500 ease-in-out',
                          exitActive:
                            '-translate-x-full md:opacity-0 md:translate-x-0 transition duration-500 ease-in-out',
                        }}
                      >
                        <SfDrawer
                          ref={drawerRef}
                          open
                          disableClickAway
                          placement="top"
                          className="grid grid-cols-1 md:gap-x-6 md:grid-cols-4 bg-white shadow-lg p-0 max-h-screen overflow-y-auto md:!absolute md:!top-20 max-w-[376px] md:max-w-full md:p-6 mr-[50px] md:mr-0"
                        >
                          <div className="sticky top-0 flex items-center justify-between px-4 py-2 bg-primary-700 md:hidden">
                            <div className="flex items-center font-medium text-white typography-text-lg">
                              Browse products
                            </div>
                            <SfButton
                              square
                              variant="primary"
                              aria-label="Close navigation menu"
                              onClick={close}
                              className="text-white ml-2"
                            >
                              <SfIconClose />
                            </SfButton>
                          </div>
                          {collections.map(
                            (heading: Collection, items: number) => (
                              <div
                                key={heading.id}
                                className="[&:nth-child(2)]:pt-0 pt-6 md:pt-0"
                              >
                                <h2
                                  role="presentation"
                                  className="typography-text-base font-medium text-neutral-900 whitespace-nowrap p-4 md:py-1.5"
                                >
                                  {heading.name}
                                </h2>
                                <hr className="mb-3.5" />
                                <ul>
                                  {heading?.children?.map((item) => (
                                    <li key={item.id}>
                                      <SfListItem
                                        as="a"
                                        size="sm"
                                        role="none"
                                        href={`/collections/${item.slug}`}
                                        className="typography-text-base md:typography-text-sm py-4 md:py-1.5"
                                      >
                                        {item.name}
                                      </SfListItem>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ),
                          )}

                          <SfButton
                            square
                            size="sm"
                            variant="tertiary"
                            aria-label="Close navigation menu"
                            onClick={close}
                            className="hidden md:block md:absolute md:right-0 hover:bg-white active:bg-white"
                          >
                            <SfIconClose className="text-neutral-500" />
                          </SfButton>
                        </SfDrawer>
                      </CSSTransition>
                    </li>
                  </ul>
                </nav>
              </nav>
            </SfDrawer>
          </>
        )}
      </header>
    </div>
  );
}
