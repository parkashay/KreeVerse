import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { LoaderArgs } from '@remix-run/server-runtime';
import { SfButton } from '@storefront-ui/react';
import HeroSection from '~/components/hero-section/HeroSection';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request, { take: 20 });
  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const headerImage = collections[0]?.featuredAsset?.preview;
  return (
    <>
      <HeroSection />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 place-items-center w-full mt-6">
        {collections.map((collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}
      </div>
    </>
  );
}
