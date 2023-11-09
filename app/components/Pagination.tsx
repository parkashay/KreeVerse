import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { ComponentProps, useEffect } from 'react';
import { useNavigation, useSearchParams } from '@remix-run/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfSelect,
  usePagination,
} from '@storefront-ui/react';
import classNames from 'classnames';

export type PaginationProps = {
  appliedPaginationLimit: number;
  allowedPaginationLimits: Set<number>;
  totalItems: number;
  appliedPaginationPage: number;
};

export function Pagination({
  appliedPaginationLimit,
  allowedPaginationLimits,
  totalItems,
  appliedPaginationPage,
  ...props
}: PaginationProps & ComponentProps<'div'>) {
  const navigation = useNavigation();

  const {
    totalPages,
    pages,
    selectedPage,
    startPage,
    endPage,
    next,
    prev,
    setPage,
    maxVisiblePages,
  } = usePagination({
    totalItems: totalItems,
    currentPage: appliedPaginationPage,
    pageSize: appliedPaginationLimit,
    maxPages: 3,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams();
  useEffect(() => {
    params.set('page', selectedPage.toString());
    if (searchParams.get('limit'))
      params.set('limit', searchParams.get('limit') as string);
    if (searchParams.get('q')) params.set('q', searchParams.get('q') as string);
    setSearchParams(params);
  }, [selectedPage]);

  return (
    <div
      {...props}
      className={clsx(
        'flex flex-col md:flex-row justify-center items-end md:items-center gap-4 lg:gap-6',
        props.className,
      )}
    >
      <span className="flex gap-4 items-center ">
        {navigation.state !== 'idle' && (
          <ArrowPathIcon className="  animate-spin  h-6 w-6 text-gray-500" />
        )}
        <SfSelect
          name="limit"
          required
          defaultValue={appliedPaginationLimit}
          className="min-w-[150px]"
        >
          {Array.from(allowedPaginationLimits).map((x) => (
            <option key={x} value={x}>
              {x} per page
            </option>
          ))}
        </SfSelect>
      </span>

      {/* <div className="flex" role="group">
        <Button
          name="page"
          type="submit"
          value={appliedPaginationPage - 1}
          disabled={appliedPaginationPage <= 1 || navigation.state !== 'idle'}
          className="!text-sm rounded-r-none border-r-0"
        >
          Prev.
        </Button>
        <Button
          name="page"
          type="submit"
          value={appliedPaginationPage + 1}
          disabled={
            appliedPaginationPage * appliedPaginationLimit >= totalItems ||
            navigation.state !== 'idle'
          }
          className="!text-sm rounded-l-none"
        >
          Next
        </Button>
      </div> */}
      <nav
        className="flex justify-between items-end border-t border-neutral-200"
        role="navigation"
        aria-label="pagination"
      >
        <SfButton
          size="lg"
          className="gap-3 !px-3 sm:px-6"
          aria-label="Go to previous page"
          disabled={selectedPage <= 1}
          variant="tertiary"
          slotPrefix={<SfIconChevronLeft />}
          onClick={() => prev()}
        >
          <span className="hidden sm:inline-flex">Previous</span>
        </SfButton>
        <ul className="flex justify-center">
          {!pages.includes(1) && (
            <li>
              <div
                className={classNames(
                  'flex pt-1 border-t-4 border-transparent',
                  {
                    'font-medium border-t-4 !border-primary-700':
                      selectedPage === 1,
                  },
                )}
              >
                <button
                  type="button"
                  className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
                  aria-current={selectedPage === 1}
                  onClick={() => setPage(1)}
                >
                  1
                </button>
              </div>
            </li>
          )}
          {startPage > 2 && (
            <li>
              <div className="flex border-t-4 border-transparent">
                <button
                  type="button"
                  disabled
                  aria-hidden="true"
                  className="px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                >
                  ...
                </button>
              </div>
            </li>
          )}
          {pages.map((page: number) => (
            <Fragment key={page}>
              {maxVisiblePages === 1 && selectedPage === totalPages && (
                <li>
                  <div className="flex pt-1 border-t-4 border-transparent">
                    <button
                      type="button"
                      className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                      aria-current={endPage - 1 === selectedPage}
                      onClick={() => setPage(endPage - 1)}
                    >
                      {endPage - 1}
                    </button>
                  </div>
                </li>
              )}
              <li>
                <div
                  className={classNames(
                    'flex pt-1 border-t-4 border-transparent',
                    {
                      'font-medium border-t-4 !border-primary-700':
                        selectedPage === page,
                    },
                  )}
                >
                  <button
                    type="button"
                    className={classNames(
                      'min-w-[38px] px-3 sm:px-4 py-3 text-neutral-500 md:w-12 rounded-md hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900',
                      {
                        '!text-neutral-900 hover:!text-primary-800 active:!text-primary-900':
                          selectedPage === page,
                      },
                    )}
                    aria-label={`Page ${page} of ${totalPages}`}
                    aria-current={selectedPage === page}
                    onClick={() => setPage(page)}
                  >
                    {page}
                  </button>
                </div>
              </li>
              {maxVisiblePages === 1 && selectedPage === 1 && (
                <li>
                  <div className="flex pt-1 border-t-4 border-transparent">
                    <button
                      type="button"
                      className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                      aria-current={selectedPage === 1}
                      onClick={() => setPage(2)}
                    >
                      2
                    </button>
                  </div>
                </li>
              )}
            </Fragment>
          ))}
          {endPage < totalPages - 1 && (
            <li>
              <div className="flex pt-1 border-t-4 border-transparent">
                <button
                  type="button"
                  disabled
                  aria-hidden="true"
                  className="px-3 sm:px-4 py-3 rounded-md text-neutral-500 "
                >
                  ...
                </button>
              </div>
            </li>
          )}
          {!pages.includes(totalPages) && (
            <li>
              <div
                className={classNames(
                  'flex pt-1 border-t-4 border-transparent',
                  {
                    'font-medium border-t-4 !border-primary-700':
                      selectedPage === totalPages,
                  },
                )}
              >
                <button
                  type="button"
                  className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                  aria-current={totalPages === selectedPage}
                  onClick={() => setPage(totalPages)}
                >
                  {totalPages}
                </button>
              </div>
            </li>
          )}
        </ul>
        <SfButton
          size="lg"
          aria-label="Go to next page"
          disabled={selectedPage >= totalPages}
          variant="tertiary"
          slotSuffix={<SfIconChevronRight />}
          className="gap-3 !px-3 sm:px-6"
          onClick={() => next()}
        >
          <span className="hidden sm:inline-flex">Next</span>
        </SfButton>
      </nav>
    </div>
  );
}
