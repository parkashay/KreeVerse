import { SfRadio, SfListItem } from '@storefront-ui/react';
import { useState } from 'react';
import {
  CurrencyCode,
  EligibleShippingMethodsQuery,
} from '~/generated/graphql';
import { Price } from '../products/Price';

const deliveryOptions = [
  {
    name: 'Standard',
    cost: 'Free',
    date: 'Thursday, September 15',
  },
  {
    name: 'Express',
    cost: '$5.00',
    date: 'Tomorrow, September 12',
  },
];

export default function SfShippingMethodSelector({
  eligibleShippingMethods,
  currencyCode,
  shippingMethodId,
  onChange,
}: {
  eligibleShippingMethods: EligibleShippingMethodsQuery['eligibleShippingMethods'];
  shippingMethodId: string | undefined;
  onChange: (value?: string) => void;
  currencyCode?: CurrencyCode;
}) {
  const [checkedState, setCheckedState] = useState('');

  const handleChangeRadio = (id: string, name: string) => {
    onChange(id);
    setCheckedState(name);
  };

  return (
    <div>
      {eligibleShippingMethods.map(
        ({ name, priceWithTax, id, description }) => (
          <SfListItem
            as="label"
            key={name}
            slotPrefix={
              <SfRadio
                name="delivery-options"
                value={id}
                checked={checkedState === name}
                onChange={() => handleChangeRadio(id, name)}
              />
            }
            slotSuffix={
              <span className="text-gray-900">
                <Price
                  priceWithTax={priceWithTax}
                  currencyCode={currencyCode}
                ></Price>
              </span>
            }
            className="!items-start max-w-sm border rounded-md border-neutral-200 first-of-type:mr-4 first-of-type:mb-4"
          >
            {name}
            <span className="text-xs text-gray-500 break-words">
              {' '}
              {description}{' '}
            </span>
          </SfListItem>
        ),
      )}
    </div>
  );
}
