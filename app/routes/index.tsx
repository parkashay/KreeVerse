import { MetaFunction, useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import HeroSection from '~/components/hero-section/HeroSection';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';

export const meta: MetaFunction = ({ data }) => {
  return [
    {
      title: 'Kreeverse',
    },
    {
      name: 'description',
      content: 'A store for your needs.',
    },
    {
      property: 'og:image',
      content: data?.collections[0]?.featuredAsset?.preview || null,
    },
  ];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const collections = await getCollections(request, { take: 20 });
  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  return (
    <>
      <HeroSection />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center w-full mt-6">
        {collections.map((collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}
      </div>
    </>
  );
}
