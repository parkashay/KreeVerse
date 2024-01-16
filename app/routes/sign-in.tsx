import { Link, useFetcher, useSearchParams } from '@remix-run/react';
import { ActionFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { login } from '~/providers/account/account';
import { ErrorResult } from '~/generated/graphql';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { SfButton, SfInput, SfLink } from '@storefront-ui/react';
import { SfCheckbox } from '@storefront-ui/react';

export async function action({ params, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  const password = body.get('password');
  if (typeof email === 'string' && typeof password === 'string') {
    const rememberMe = !!body.get('rememberMe');
    const redirectTo = (body.get('redirectTo') || '/account') as string;
    const result = await login(email, password, rememberMe, { request });
    if (result.__typename === 'CurrentUser') {
      return redirect(redirectTo, { headers: result._headers });
    } else {
      return json(result, {
        status: 401,
      });
    }
  }
}

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const login = useFetcher<ErrorResult>();

  return (
    <>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/sign-up"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              register a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 rounded p-4 text-center text-sm">
              <p>Demo credentials</p>
              <p>
                Email address:{' '}
                <span className="font-bold">test@vendure.io</span>
              </p>
              <p>
                Password: <span className="font-bold">test</span>
              </p>
            </div>
            <login.Form method="post">
              <fieldset disabled={login.state !== 'idle'} className="space-y-6">
                <SfInput
                  type="hidden"
                  name="redirectTo"
                  value={searchParams.get('redirectTo') ?? undefined}
                />
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <SfInput
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      defaultValue="test@vendure.io"
                      placeholder="Email address"
                      // className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <SfInput
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="Password"
                      defaultValue="test"
                      // className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <SfCheckbox
                      value="value"
                      className="peer"
                      id="rememberMe"
                      name="rememberMe"
                      defaultChecked
                    />
                    <label
                      className="ml-2 block text-sm text-gray-900"
                      htmlFor="rememberMe"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <SfLink
                      href="#"
                      variant="primary"
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Forgot your password?
                    </SfLink>
                  </div>
                </div>

                {login.data && login.state === 'idle' && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XCircleIcon
                          className="h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          We ran into a problem signing you in!
                        </h3>
                        <p className="text-sm text-red-700 mt-2">
                          {login.data.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <SfButton
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <span className="flex gap-4 items-center">
                      {login.state !== 'idle' && (
                        <ArrowPathIcon className="animate-spin h-5 w-5 text-gray-500" />
                      )}
                      Sign in
                    </span>
                  </SfButton>
                </div>
              </fieldset>
            </login.Form>
          </div>
        </div>
      </div>
    </>
  );
}
