import { SfRadio, SfListItem } from '@storefront-ui/react';
import { useState } from 'react';
import { SelectedAddress } from './ShippingAddressSelector';

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

export default function SfShippingAddressSelector({
  addresses,
  selectedAddressIndex,
  onChange,
}: {
  addresses: SelectedAddress[];
  selectedAddressIndex: number;
  onChange: (value: number) => void;
}) {
  const [checkedState, setCheckedState] = useState('');

  return (
    <div>
      {(addresses || []).map((address, index) => (
        <SfListItem
          as="label"
          key={address.id}
          slotPrefix={
            <SfRadio
              name="delivery-options"
              value={index}
              checked={checkedState === String(index)}
              onChange={(event) => {
                onChange(Number(event.target.value));
                setCheckedState(event.target.value);
              }}
            />
          }
          slotSuffix={
            <span className="text-gray-900">
              {address.streetLine1}, {address.postalCode}
            </span>
          }
          className="!items-start max-w-sm border rounded-md border-neutral-200 first-of-type:mr-4 first-of-type:mb-4"
        >
          {}
          <span className="text-md text-gray-500 break-words">
            <ul>
              <li>{address.streetLine1}</li>
              <li>{address.streetLine2}</li>
              <li>{address.city}</li>
              <li>{address.province}</li>
              <li>{address.postalCode}</li>
              <li>{address.country.name}</li>
            </ul>
          </span>
        </SfListItem>
      ))}
    </div>
  );
}
