import {
  SfIconCall,
  SfIconContactSupport,
  SfIconFacebook,
  SfIconHelp,
  SfIconInstagram,
  SfIconPinterest,
  SfIconTwitter,
  SfIconYoutube,
} from '@storefront-ui/react';

export const categories = [
  {
    label: 'How to buy',
    subcategories: [
      {
        subcategoryLabel: 'Payment methods',
        link: '#',
      },
      {
        subcategoryLabel: 'Order pickup',
        link: '#',
      },
      {
        subcategoryLabel: 'Purchase status',
        link: '#',
      },
      {
        subcategoryLabel: 'Track orders',
        link: '#',
      },
      {
        subcategoryLabel: 'Returns',
        link: '#',
      },
    ],
  },
  {
    label: 'Help',
    subcategories: [
      {
        subcategoryLabel: 'Help centers',
        link: '#',
      },
      {
        subcategoryLabel: 'Security & fraud',
        link: '#',
      },
      {
        subcategoryLabel: 'Feedback',
        link: '#',
      },
      {
        subcategoryLabel: 'Contact',
        link: '#',
      },
    ],
  },
  {
    label: 'Services',
    subcategories: [
      {
        subcategoryLabel: 'Gift cards',
        link: '#',
      },
      {
        subcategoryLabel: 'Order pickup',
        link: '#',
      },
      {
        subcategoryLabel: 'Purchase status',
        link: '#',
      },
      {
        subcategoryLabel: 'Track orders',
        link: '#',
      },
    ],
  },
  {
    label: 'About',
    subcategories: [
      {
        subcategoryLabel: 'About us',
        link: '#',
      },
      {
        subcategoryLabel: 'Order pickup',
        link: '#',
      },
      {
        subcategoryLabel: 'Purchase status',
        link: '#',
      },
      {
        subcategoryLabel: 'Track orders',
        link: '#',
      },
      {
        subcategoryLabel: 'Returns',
        link: '#',
      },
    ],
  },
];
export const socialMedia = [
  {
    label: 'Facebook',
    link: '#',
    icon: () => <SfIconFacebook className="fill-current" />,
  },
  {
    label: 'Twitter',
    link: '#',
    icon: () => <SfIconTwitter />,
  },
  {
    label: 'Instagram',
    link: '#',
    icon: () => <SfIconInstagram />,
  },
  {
    label: 'Pinterest',
    link: '#',
    icon: () => <SfIconPinterest />,
  },
  {
    label: 'Youtube',
    link: '#',
    icon: () => <SfIconYoutube />,
  },
];
export const contactOptions = [
  {
    label: 'Help center',
    link: '#',
    details: ['Find answers online anytime'],
    icon: () => <SfIconHelp size="lg" />,
  },
  {
    label: 'Live chat',
    link: '#',
    details: ['Mon-Fri, 5am-10pm PT', 'Sat-Sun, 6am-9pm PT'],
    icon: () => <SfIconContactSupport size="lg" />,
  },
  {
    label: '1 234 567 8901',
    link: '#',
    details: ['Mon-Fri, 5am-10pm PT', 'Sat-Sun, 6am-9pm PT'],
    icon: () => <SfIconCall size="lg" />,
  },
];
export const bottomLinks = [
  {
    label: 'Terms',
    link: '#',
  },
  {
    label: 'Privacy policy',
    link: '#',
  },
];
