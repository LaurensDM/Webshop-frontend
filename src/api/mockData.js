const products = [
  {
    id: 1,
    price: 144.99,
    name: 'LG OLED65C8PLA',
    description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa fugiat repellat, commodi dolor, molestias nobis asperiores dolores,'
              + 'reprehenderit ullam labore dolorum quae neque in dolorem laudantium laborum hic! Dicta.',
    image: null,
  },
  {
    id: 2,
    price: 124.99,
    name: 'Coffee',
    description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa fugiat repellat, commodi dolor, molestias nobis asperiores dolores,'
              + 'reprehenderit ullam labore dolorum quae neque in dolorem laudantium laborum hic! Dicta.',
    image: null,
  },
  {
    id: 3,
    price: 124.99,
    name: 'Coffee',
    description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa fugiat repellat, commodi dolor, molestias nobis asperiores dolores,'
              + 'reprehenderit ullam labore dolorum quae neque in dolorem laudantium laborum hic! Dicta.',
    image: null,
  },
  {
    id: 4,
    price: 110.99,
    name: 'Beans',
    description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa fugiat repellat, commodi dolor, molestias nobis asperiores dolores,'
              + 'reprehenderit ullam labore dolorum quae neque in dolorem laudantium laborum hic! Dicta.',
    image: null,
  },
  {
    id: 5,
    price: 110.99,
    name: 'Beans',
    description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa fugiat repellat, commodi dolor, molestias nobis asperiores dolores,'
              + 'reprehenderit ullam labore dolorum quae neque in dolorem laudantium laborum hic! Dicta.',
  },
  {
    id: 6,
    price: 110.99,
    name: 'Beans',
    description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa fugiat repellat, commodi dolor, molestias nobis asperiores dolores,'
              + 'reprehenderit ullam labore dolorum quae neque in dolorem laudantium laborum hic! Dicta.',
    image: null,
  },
  {
    id: 7,
    price: 110.99,
    name: 'Beans',
    description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa fugiat repellat, commodi dolor, molestias nobis asperiores dolores,'
              + 'reprehenderit ullam labore dolorum quae neque in dolorem laudantium laborum hic! Dicta.',
  },
  {
    id: 8,
    price: 110.99,
    name: 'Beans',
    description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa fugiat repellat, commodi dolor, molestias nobis asperiores dolores,'
              + 'reprehenderit ullam labore dolorum quae neque in dolorem laudantium laborum hic! Dicta.',
    image: null,
  },
];

const notifications = [{
  orderId: 1,
  date: '17/12/2022',
  text: 'tekst tekst tekst',
  status: false,
},
{
  orderId: 2,
  date: '19/12/2002',
  text: 'tekst tekst ',
  status: false,
},
{
  orderId: 3,
  date: '29/01/2009',
  text: 'tekst  ',
  status: true,
},
{
  orderId: 4,
  date: '21/05/2019',
  text: 'niks niks niks',
  status: false,
},
{
  orderId: 5,
  date: '01/25/2015',
  text: 'niks niks ',
  status: true,
},
{
  orderId: 6,
  date: '09/26/2005',
  text: 'niks  ',
  status: true,
},
];

const orders = [{
  orderId: 1,
  clientName: 'Jan Jansen',
  clientNameAndEmail: 'Jan Jansen + jansenjan@gmail.com',
  orderDate: '17/12/2022',
  deliveryAddress: 'kerkstraat 1, 1234 AB, Amsterdam',
  status: 'geleverd',
  products: [
    {
      productId: 1,
      name: 'LG OLED65C8PLA',
      quantity: 2,
      price: 144.99,
      total: 289.98,
    },
    {
      productId: 2,
      name: 'Coffee',
      quantity: 4,
      price: 2.99,
      total: 11.96,
    },
  ],
  total: 301.94,
  packagingType: 'Doos',
  transportServiceType: 'DHL',
  trackAndTraceDetails: 'https://www.dhl.com/nl-nl/home/tracking/tracking-ecommerce.html?AWB=1234567890&brand=DHL',
},
{
  orderId: 2,
  clientName: 'Jan Jansen',
  clientNameAndEmail: 'Jan Jansen + zerhkezjhr@gmail.com',
  orderDate: '19/12/2002',
  deliveryAddress: 'kerkstraat 1, 1234 AB, Amsterdam',
  status: 'onderweg',
  products: [
    {
      productId: 1,
      name: 'LG OLED65C8PLA',
      quantity: 2,
      price: 144.99,
      total: 289.98,
    },
    {
      productId: 2,
      name: 'Coffee',
      quantity: 4,
      price: 2.99,
      total: 11.96,
    },
  ],
  total: 301.94,
  packagingType: 'Zak',
  transportServiceType: 'DHL',
  trackAndTraceDetails: 'https://www.dhl.com/nl-nl/home/tracking/tracking-ecommerce.html?AWB=1234567890&brand=DHL',

},
];

module.exports = { products, notifications, orders };