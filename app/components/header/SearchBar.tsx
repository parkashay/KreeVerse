import { Form } from '@remix-run/react';
import { SfIconSearch } from '@storefront-ui/react';

export function SearchBar() {
  let initialQuery = '';
  if (typeof window === 'undefined') {
    // running in a server environment
  } else {
    // running in a browser environment
    initialQuery = new URL(window.location.href).searchParams.get('q') ?? '';
  }

  return (
    <Form
      method="get"
      action="/search"
      key={initialQuery}
      className="flex items-center"
    >
      <SfIconSearch className="text-gray-700 translate-x-8" />
      <input
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder="Search"
        className="shadow-sm pl-10 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </Form>
  );
}
