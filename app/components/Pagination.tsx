import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { Select } from '~/components/Select';
import { Button } from '~/components/Button';
import { ComponentProps } from 'react';
import { useNavigation } from '@remix-run/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
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
    currentPage: 2,
    pageSize: 10,
    maxPages: 1,
  });
  console.log(appliedPaginationLimit,allowedPaginationLimits,totalItems, appliedPaginationPage)
  return (
    <div
      {...props}
      className={clsx(
        'flex flex-col md:flex-row justify-center items-end md:items-center gap-4 lg:gap-6',
        props.className,
      )}
    >
      <span className="flex gap-4 items-center">
        {navigation.state !== 'idle' && (
          <ArrowPathIcon className="animate-spin h-6 w-6 text-gray-500" />
        )}
        <Select
          name="limit"
          required
          noPlaceholder
          defaultValue={appliedPaginationLimit}
        >
          {Array.from(allowedPaginationLimits).map((x) => (
            <option key={x} value={x}>
              {x} per Page
            </option>
          ))}
        </Select>
      </span>

      <div className="flex" role="group">
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
      </div>
    </div>
  );
}
