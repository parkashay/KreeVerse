import FacetFilterControls from '~/components/facet-filter/FacetFilterControls';
import { ProductCard } from '~/components/products/ProductCard';
import {
  translatePaginationFrom,
  translatePaginationTo,
} from '~/utils/pagination';
import { Pagination } from '~/components/Pagination';
import { NoResultsHint } from '~/components/products/NoResultsHint';
import { useRef } from 'react';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import { SfSelect } from '@storefront-ui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useNavigation } from '@remix-run/react';

export function FilterableProductGrid({
  result,
  resultWithoutFacetValueFilters,
  facetValueIds,
  appliedPaginationPage,
  appliedPaginationLimit,
  allowedPaginationLimits,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}: Awaited<
  ReturnType<
    ReturnType<
      typeof filteredSearchLoaderFromPagination
    >['filteredSearchLoader']
  >
> & {
  allowedPaginationLimits: Set<number>;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (arg0: boolean) => void;
}) {
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );

  const navigation = useNavigation();

  return (
    <div className="mt-6 grid sm:grid-cols-5 gap-x-4">
      <FacetFilterControls
        facetFilterTracker={facetValuesTracker.current}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />
      {result.items.length > 0 ? (
        <div className="sm:col-span-5 lg:col-span-4 space-y-6">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 place-items-center">
            {result.items.map((item) => (
              <ProductCard key={item.productId} {...item} />
            ))}
          </div>

          <div className="flex flex-col justify-evenly items-center gap-4">
            <Pagination
              appliedPaginationLimit={appliedPaginationLimit}
              allowedPaginationLimits={allowedPaginationLimits}
              totalItems={result.totalItems}
              appliedPaginationPage={appliedPaginationPage}
              className="flex w-full justify-evenly flex-wrap"
            />
            <div className="flex flex-col md:flex-row w-full gap-3 justify-evenly items-center mb-3">
              <span className=" text-gray-500 text-sm mt-2 lg:w-[300px]">
                Showing products{' '}
                {translatePaginationFrom(
                  appliedPaginationPage,
                  appliedPaginationLimit,
                )}{' '}
                to{' '}
                {translatePaginationTo(
                  appliedPaginationPage,
                  appliedPaginationLimit,
                  result.items.length,
                )}
              </span>
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
            </div>
          </div>
        </div>
      ) : (
        <NoResultsHint
          facetFilterTracker={facetValuesTracker.current}
          className={'sm:col-span-4 sm:p-4'}
        />
      )}
    </div>
  );
}
