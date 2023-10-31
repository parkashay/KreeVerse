import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { SfIconCreditCard, SfIconLocalShipping } from '@storefront-ui/react';
import { Price } from '~/components/products/Price';
import { OrderDetailFragment } from '~/generated/graphql';

export function CartTotals({ order }: { order?: OrderDetailFragment | null }) {
  return (
    <dl className="border-t mt-6 border-gray-200 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <dt className="text-sm flex gap-1">
          {' '}
          <CurrencyDollarIcon height={25} width={25} /> Subtotal
        </dt>
        <dd className="text-sm font-medium text-gray-900">
          <Price
            priceWithTax={order?.subTotalWithTax}
            currencyCode={order?.currencyCode}
          ></Price>
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-sm flex gap-1">
          {' '}
          <SfIconLocalShipping /> Shipping
        </dt>
        <dd className="text-sm font-medium text-gray-900">
          <Price
            priceWithTax={order?.shippingWithTax ?? 0}
            currencyCode={order?.currencyCode}
          ></Price>
        </dd>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <dt className="text-base font-medium flex gap-1">
          {' '}
          <SfIconCreditCard /> Total
        </dt>
        <dd className="text-base font-medium text-gray-900">
          <Price
            priceWithTax={order?.totalWithTax}
            currencyCode={order?.currencyCode}
          ></Price>
        </dd>
      </div>
    </dl>
  );
}
