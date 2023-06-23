// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';
import {
  Source,
  Article,
  PostAdd,
  AltRoute,
  Summarize,
  Pets,
  BarChart,
  SupportAgent,
  QuestionAnswer,
  Mediation,
  ManageSearch
} from '@mui/icons-material';

// constant
const icons = {
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc,
  Source,
  SupportAgent,
  Article,
  QuestionAnswer,
  Mediation,
  BarChart,
  PostAdd,
  AltRoute,
  Summarize,
  Pets,
  ManageSearch
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
  id: 'application',
  title: <FormattedMessage id="application" />,
  type: 'group',
  children: [
    ,
    {
      id: 'customer_support',
      title: <FormattedMessage id="customer_support" />,
      type: 'item',
      icon: icons.SupportAgent,
      url: '/app/cust_support'
    },
    {
      id: 'data_analysis',
      title: <FormattedMessage id="data_analysis" />,
      type: 'item',
      icon: icons.BarChart
    },
    {
      id: 'document_analysis',
      title: <FormattedMessage id="document_analysis" />,
      type: 'item',
      icon: icons.Article,
      url: '/app/docu_analysis'
    },
    {
      id: 'data_annotation',
      title: <FormattedMessage id="data_annotation" />,
      type: 'item',
      icon: icons.PostAdd
    },
    {
      id: 'data_extractor',
      title: <FormattedMessage id="data_extractor" />,
      type: 'item',
      icon: icons.AltRoute
    },
    {
      id: 'data_summarize',
      title: <FormattedMessage id="data_summarize" />,
      type: 'item',
      icon: icons.Summarize
    },
    {
      id: 'image_classification',
      title: <FormattedMessage id="image_classification" />,
      type: 'item',
      icon: icons.Pets
    },

    {
      id: 'name_entity_recognition',
      title: <FormattedMessage id="name_entity_recognition" />,
      type: 'item',
      icon: icons.IconUserCheck
    },

    {
      id: 'structure_data_converter',
      title: <FormattedMessage id="structure_data_converter" />,
      type: 'item',
      icon: icons.Mediation
    },
    {
      id: 'text_classification',
      title: <FormattedMessage id="text_classification" />,
      type: 'item',
      icon: icons.ManageSearch
    }
  ]
};

export default application;

// children: [
//   {
//     id: 'posts',
//     title: <FormattedMessage id="social-profile" />,
//     type: 'item',
//     url: '/app/user/social-profile/posts'
//   },
//   {
//     id: 'account-profile',
//     title: <FormattedMessage id="account-profile" />,
//     type: 'collapse',
//     children: [
//       {
//         id: 'profile1',
//         title: (
//           <>
//             <FormattedMessage id="profile" /> 01
//           </>
//         ),
//         type: 'item',
//         url: '/app/user/account-profile/profile1'
//       },
//       {
//         id: 'profile2',
//         title: (
//           <>
//             <FormattedMessage id="profile" /> 02
//           </>
//         ),
//         type: 'item',
//         url: '/app/user/account-profile/profile2'
//       },
//       {
//         id: 'profile3',
//         title: (
//           <>
//             <FormattedMessage id="profile" /> 03
//           </>
//         ),
//         type: 'item',
//         url: '/app/user/account-profile/profile3'
//       }
//     ]
//   },
//   {
//     id: 'user-card',
//     title: <FormattedMessage id="cards" />,
//     type: 'collapse',
//     children: [
//       {
//         id: 'card1',
//         title: (
//           <>
//             <FormattedMessage id="style" /> 01
//           </>
//         ),
//         type: 'item',
//         url: '/app/user/card/card1'
//       },
//       {
//         id: 'card2',
//         title: (
//           <>
//             <FormattedMessage id="style" /> 02
//           </>
//         ),
//         type: 'item',
//         url: '/app/user/card/card2'
//       },
//       {
//         id: 'card3',
//         title: (
//           <>
//             <FormattedMessage id="style" /> 03
//           </>
//         ),
//         type: 'item',
//         url: '/app/user/card/card3'
//       }
//     ]
//   },
//   {
//     id: 'user-list',
//     title: <FormattedMessage id="list" />,
//     type: 'collapse',
//     children: [
//       {
//         id: 'list1',
//         title: (
//           <>
//             <FormattedMessage id="style" /> 01
//           </>
//         ),
//         type: 'item',
//         url: '/app/user/list/list1'
//       },
//       {
//         id: 'list2',
//         title: (
//           <>
//             <FormattedMessage id="style" /> 02
//           </>
//         ),
//         type: 'item',
//         url: '/app/user/list/list2'
//       }
//     ]
//   }
// ]

// children: [
//   {
//     id: 'customer-list',
//     title: <FormattedMessage id="customer-list" />,
//     type: 'item',
//     url: '/app/customer/customer-list',
//     breadcrumbs: false
//   },
//   {
//     id: 'order-list',
//     title: <FormattedMessage id="order-list" />,
//     type: 'item',
//     url: '/app/customer/order-list',
//     breadcrumbs: false
//   },
//   {
//     id: 'order-details',
//     title: <FormattedMessage id="order-details" />,
//     type: 'item',
//     url: '/app/customer/order-details'
//   },
//   {
//     id: 'product',
//     title: <FormattedMessage id="product" />,
//     type: 'item',
//     url: '/app/customer/product',
//     breadcrumbs: false
//   },
//   {
//     id: 'product-review',
//     title: <FormattedMessage id="product-review" />,
//     type: 'item',
//     url: '/app/customer/product-review',
//     breadcrumbs: false
//   }
// ]

// {
//   id: 'chat',
//   title: <FormattedMessage id="chat" />,
//   type: 'item',
//   icon: icons.IconMessages,
//   url: '/app/chat'
// },
// {
//   id: 'kanban',
//   title: 'Kanban',
//   type: 'item',
//   icon: icons.IconLayoutKanban,
//   url: '/app/kanban/board'
// },
// {
//   id: 'mail',
//   title: <FormattedMessage id="mail" />,
//   type: 'item',
//   icon: icons.IconMail,
//   url: '/app/mail'
// },
// {
//   id: 'calendar',
//   title: <FormattedMessage id="calendar" />,
//   type: 'item',
//   url: '/app/calendar',
//   icon: icons.IconCalendar,
//   breadcrumbs: false
// },
// {
//   id: 'contact',
//   title: <FormattedMessage id="contact" />,
//   type: 'collapse',
//   icon: icons.IconNfc,
//   children: [
//     {
//       id: 'c-card',
//       title: <FormattedMessage id="cards" />,
//       type: 'item',
//       url: '/app/contact/c-card',
//       breadcrumbs: false
//     },
//     {
//       id: 'c-list',
//       title: <FormattedMessage id="list" />,
//       type: 'item',
//       url: '/app/contact/c-list',
//       breadcrumbs: false
//     }
//   ]
// },
// {
//   id: 'e-commerce',
//   title: <FormattedMessage id="e-commerce" />,
//   type: 'collapse',
//   icon: icons.IconBasket,
//   children: [
//     {
//       id: 'products',
//       title: <FormattedMessage id="products" />,
//       type: 'item',
//       url: '/app/e-commerce/products'
//     },
//     {
//       id: 'product-details',
//       title: <FormattedMessage id="product-details" />,
//       type: 'item',
//       url: '/app/e-commerce/product-details/1',
//       breadcrumbs: false
//     },
//     {
//       id: 'product-list',
//       title: <FormattedMessage id="product-list" />,
//       type: 'item',
//       url: '/app/e-commerce/product-list',
//       breadcrumbs: false
//     },
//     {
//       id: 'checkout',
//       title: <FormattedMessage id="checkout" />,
//       type: 'item',
//       url: '/app/e-commerce/checkout'
//     }
//   ]
// }
