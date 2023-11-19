import {
  HashtagIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Form, Outlet, useLoaderData, useMatches } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import {
  SfButton,
  SfIconLocationOn,
  SfIconLock,
  SfIconPerson,
  SfIconShoppingCart,
} from '@storefront-ui/react';
import { TabProps } from '~/components/tabs/Tab';
import { TabsContainer } from '~/components/tabs/TabsContainer';
import { getActiveCustomerDetails } from '~/providers/customer/customer';

export async function loader({ request }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerDetails({ request });
  if (!activeCustomer) {
    return redirect('/sign-in');
  }
  return json({ activeCustomer });
}

export default function AccountDashboard() {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const { firstName, lastName } = activeCustomer!;

  const tabs: TabProps[] = [
    {
      Icon: SfIconPerson,
      text: 'Account Details',
      to: './',
    },
    {
      Icon: SfIconShoppingCart,
      text: 'Purchase History',
      to: './history',
    },
    {
      Icon: SfIconLocationOn,
      text: 'Addresses',
      to: './addresses',
    },
    {
      Icon: SfIconLock,
      text: 'Password',
      to: './password',
    },
  ];

  return (
    <div className="max-w-6xl xl:mx-auto px-4 mb-3">
      <h2 className="text-3xl sm:text-5xl font-light text-gray-900 my-8">
        My Account
      </h2>
      <p className="text-gray-700 text-lg -mt-4">
        Welcome back, {firstName} {lastName}
      </p>
      <Form method="post" action="/api/logout">
        <SfButton
          type="submit"
          className="  bg-red-500 hover:bg-red-600 text-white"
        >
          Sign out
        </SfButton>
      </Form>
      <TabsContainer tabs={tabs}>
        <Outlet></Outlet>
      </TabsContainer>
    </div>
  );
}
