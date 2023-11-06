/* This example requires Tailwind CSS v2.0+ */
import { StarIcon } from '@heroicons/react/24/solid';
import { classNames } from '~/utils/class-names';
import {
  SfRating,
  SfIconCheck,
  SfIconThumbUp,
  SfIconThumbDown,
  SfCounter,
} from '@storefront-ui/react';
import { useState } from 'react';
interface Review {
  id: number;
  title: string;
  rating: number;
  content: string;
  author: string;
  date: string;
  datetime: string;
}

const reviews: Review[] = [
  {
    id: 1,
    title: 'I love it!',
    rating: 5,
    content: `
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            `,
    author: 'Ryan F',
    date: 'May 25, 2022',
    datetime: '2022-05-25',
  },
  {
    id: 2,
    title: 'Awesome product',
    rating: 5,
    content: `
              <p>Ornare quam viverra orci sagittis eu volutpat odio. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Ultrices tincidunt arcu non sodales neque.</p> 
              <p>Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Sodales ut etiam sit amet nisl purus in mollis nunc. Turpis egestas integer eget aliquet nibh praesent tristique magna. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Justo laoreet sit amet cursus sit amet.</p>
            `,
    author: 'Kent D',
    date: 'May 24, 2022',
    datetime: '2022-05-24',
  },
  {
    id: 3,
    title: 'Really happy with this purchase',
    rating: 5,
    content: `
              <p>Nisi est sit amet facilisis magna etiam tempor orci eu.</p> 
              <p>Elit duis tristique sollicitudin nibh sit amet commodo. Dolor sit amet consectetur adipiscing elit. Lorem dolor sed viverra ipsum nunc. Accumsan tortor posuere ac ut consequat semper. Augue mauris augue neque gravida in fermentum et sollicitudin ac.</p>
            `,
    author: 'Michael J',
    date: 'May 24, 2022',
    datetime: '2022-05-24',
  },
];
export default function TopReviews() {
  return (
    <div className="">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-6xl lg:px-8">
        <h2 className="text-lg font-medium text-gray-900">Recent reviews</h2>
        <div className="mt-6 pb-10 border-t border-gray-200 divide-y divide-gray-200 space-y-10">
          {reviews.map((review) => (
          //   <div
          //     key={review.id}
          //     className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
          //   >
          //     <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
          //       <div className="flex items-center xl:col-span-1">
          //         <div className="flex items-center">
          //           {[0, 1, 2, 3, 4].map((rating) => (
          //             <StarIcon
          //               key={rating}
          //               className={classNames(
          //                 review.rating > rating
          //                   ? 'text-yellow-400'
          //                   : 'text-gray-200',
          //                 'h-5 w-5 flex-shrink-0',
          //               )}
          //               aria-hidden="true"
          //             />
          //           ))}
          //         </div>
          //         <p className="ml-3 text-sm text-gray-700">
          //           {review.rating}
          //           <span className="sr-only"> out of 5 stars</span>
          //         </p>
          //       </div>

          //       <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
          //         <h3 className="text-sm font-medium text-gray-900">
          //           {review.title}
          //         </h3>

          //         <div
          //           className="mt-3 space-y-6 text-sm text-gray-500"
          //           dangerouslySetInnerHTML={{
          //             __html: review.content,
          //           }}
          //         />
          //       </div>
          //     </div>

          //     <div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
          //       <p className="font-medium text-gray-900">{review.author}</p>
          //       <time
          //         dateTime={review.datetime}
          //         className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
          //       >
          //         {review.date}
          //       </time>
          //     </div>
          //   </div>
          // ))}
          <SingleReview review={review} />
          ))}
        </div>

      </div>
    </div>
  );
}

const SingleReview = ({review}:{review:Review}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const content = review.content;

  const charLimit = 400;
  const isButtonVisible = content.length > charLimit;
  const truncatedContent =
    isButtonVisible && isCollapsed
      ? `${content.substring(0, charLimit)}...`
      : content;

  return (
    <article className="w-full p-4 border rounded-md">
      <p className="pb-2 font-medium">{review.title}</p>
      <header className="flex flex-col pb-2 md:flex-row md:justify-between">
        <div className="flex flex-col items-start">
          <span className="flex items-center pr-2 text-xs text-neutral-500">
            <SfRating value={5} max={5} size="xs" className="mr-2" />{review.date}
          </span>
        </div>
        <div className="flex items-end">
          <p className="flex items-center text-xs truncate text-primary-700">
            <span className="mr-2 text-xs text-neutral-500">
              Karla | Red, XS
            </span>
            <SfIconCheck size="xs" className="mr-1" /> Verified purchase
          </p>
        </div>
      </header>
      <div className="pb-2 text-sm text-neutral-900" dangerouslySetInnerHTML={{
        __html: truncatedContent,
      }}></div>
      {/* }}>{truncatedContent}</div> */}
      {isButtonVisible ? (
        <button
          type="button"
          className="inline-block mb-2 text-sm font-normal border-b-2 border-black cursor-pointer w-fit hover:text-primary-700 hover:border-primary-800"
          onClick={() => {
            setIsCollapsed((currentState) => !currentState);
          }}
        >
          {isCollapsed ? 'Read more' : 'Read less'}
        </button>
      ) : null}
      <footer className="flex items-center justify-between">
        <div className="text-sm text-neutral-500">
          <button type="button" className="mr-6 hover:text-primary-800">
            <SfIconThumbUp size="sm" className="mr-2.5" />
            <SfCounter size="sm" className="text-inherit">
              6
            </SfCounter>
          </button>
          <button type="button" className="hover:text-primary-800">
            <SfIconThumbDown size="sm" className="mr-2.5" />
            <SfCounter size="sm" className="text-inherit">
              2
            </SfCounter>
          </button>
        </div>

        <button
          className="px-3 py-1.5 text-neutral-500 font-medium text-sm hover:text-primary-800"
          type="button"
        >
          Report abuse
        </button>
      </footer>
    </article>
  );
};