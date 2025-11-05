import type { Mail } from './types';

export const mails: Omit<Mail, 'category'>[] = [
  {
    id: 'm_1',
    name: 'Olivia Martin',
    email: 'olivia.martin@example.com',
    subject: 'Your Account Security',
    text: `Hi Olivia,

We've noticed a new sign-in to your account from a new device. If this was you, you can ignore this email.

If this wasn't you, please secure your account immediately.

Thanks,
The Security Team`,
    date: '2023-10-22T10:00:00',
    read: false,
    labels: ['security'],
  },
  {
    id: 'm_2',
    name: 'Social Media Inc.',
    email: 'noreply@social.com',
    subject: 'You have a new friend request',
    text: `Hi there,

You have a new friend request from John Doe.

Connect now!

Thanks,
The Social Team`,
    date: '2023-10-22T09:30:00',
    read: false,
    labels: ['social'],
  },
  {
    id: 'm_3',
    name: 'E-commerce Store',
    email: 'sales@ecom.com',
    subject: 'Big Summer Sale!',
    text: `Hello,

Our biggest sale of the summer is here! Get up to 50% off on selected items.

Shop now and save big!

Best,
The E-commerce Team`,
    date: '2023-10-22T08:45:00',
    read: true,
    labels: ['promotions'],
  },
  {
    id: 'm_4',
    name: 'SaaS Weekly',
    email: 'newsletter@saasweekly.com',
    subject: 'This Week in SaaS - Edition #123',
    text: `Your weekly dose of SaaS news is here.

Read about the latest trends, funding rounds, and product launches in the SaaS industry.

Enjoy the read!
SaaS Weekly`,
    date: '2023-10-21T15:20:00',
    read: false,
    labels: ['newsletter'],
  },
  {
    id: 'm_5',
    name: 'Dev Forum',
    email: 'notifications@devforum.io',
    subject: 'New reply to your thread "How to center a div?"',
    text: `Someone has replied to your thread.

Click here to see the new reply and continue the discussion.

Happy coding,
Dev Forum`,
    date: '2023-10-21T11:05:00',
    read: true,
    labels: ['forums'],
  },
  {
    id: 'm_6',
    name: 'Travel Deals Co',
    email: 'deals@traveldeals.com',
    subject: 'Last Minute Getaway Deals!',
    text: `Dreaming of a vacation?

We have exclusive last-minute deals just for you. Book your dream trip for less.

Pack your bags!
Travel Deals Co`,
    date: '2023-10-20T18:00:00',
    read: true,
    labels: ['deals'],
  },
  {
    id: 'm_7',
    name: 'Liam Johnson',
    email: 'liam.johnson@example.com',
    subject: 'Meeting Minutes',
    text: `Hi Team,

Attached are the minutes from our meeting today. Please review and let me know if you have any questions.

Best,
Liam`,
    date: '2023-10-20T16:30:00',
    read: false,
    labels: ['work'],
  },
  {
    id: 'm_8',
    name: 'Isabella Garcia',
    email: 'isabella.garcia@example.com',
    subject: 'Re: Project Update',
    text: `Thanks for the update! Everything looks great from my end.

Let's sync up next week.

Cheers,
Isabella`,
    date: '2023-10-20T14:00:00',
    read: true,
    labels: ['work', 'project-x'],
  },
];
