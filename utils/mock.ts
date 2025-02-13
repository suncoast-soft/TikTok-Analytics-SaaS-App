// export const all_campaigns = [
//   {
//     id: '1',
//     category: 'Fashion and Beauty',
//     brand: 'LockedShop',
//     name: "Presidents' Week Campaign",
//     description: "Exclusive fashion deals for Presidents' Week.",
//     image: 'https://picsum.photos/400/300?random=1'
//   },
//   {
//     id: '2',
//     category: 'Fitness and Wellness',
//     brand: 'FitZone',
//     name: 'New Year Fitness Drive',
//     description: 'Kickstart your fitness journey with great discounts.',
//     image: 'https://picsum.photos/400/300?random=2'
//   },
//   {
//     id: '3',
//     category: 'Technology and Gadgets',
//     brand: 'TechSavvy',
//     name: 'Smart Gadgets Promo',
//     description: 'Latest gadgets at unbeatable prices.',
//     image: 'https://picsum.photos/400/300?random=3'
//   },
//   {
//     id: '4',
//     category: 'Lifestyle and Home',
//     brand: 'UrbanLiving',
//     name: 'Spring Collection',
//     description: 'Upgrade your lifestyle with our spring collection.',
//     image: 'https://picsum.photos/400/300?random=4'
//   },
//   {
//     id: '5',
//     category: 'Food and Beverage',
//     brand: 'TastyBites',
//     name: 'Summer Food Festival',
//     description: 'Enjoy delicious treats this summer.',
//     image: 'https://picsum.photos/400/300?random=5'
//   },
//   {
//     id: '6',
//     category: 'Travel and Experiences',
//     brand: 'GlobeTrek',
//     name: 'Adventure Sale',
//     description: 'Explore new destinations with amazing discounts.',
//     image: 'https://picsum.photos/400/300?random=6'
//   },
//   {
//     id: '7',
//     category: 'Others',
//     brand: 'MiscStore',
//     name: 'Everything Sale',
//     description: 'Great deals on a variety of products.',
//     image: 'https://picsum.photos/400/300?random=7'
//   },
//   {
//     id: '8',
//     category: 'Fashion and Beauty',
//     brand: 'TrendSetter',
//     name: 'Summer Fashion Deals',
//     description: 'Stay trendy with our summer collection.',
//     image: 'https://picsum.photos/400/300?random=8'
//   },
//   {
//     id: '9',
//     category: 'Fitness and Wellness',
//     brand: 'GymX',
//     name: 'Workout Essentials',
//     description: 'Get the best gear for your workouts.',
//     image: 'https://picsum.photos/400/300?random=9'
//   },
//   {
//     id: '10',
//     category: 'Technology and Gadgets',
//     brand: 'GadgetWorld',
//     name: 'Tech Carnival',
//     description: 'Biggest tech sale of the year.',
//     image: 'https://picsum.photos/400/300?random=10'
//   },
//   {
//     id: '11',
//     category: 'Lifestyle and Home',
//     brand: 'CozyNest',
//     name: 'Home Makeover Week',
//     description: 'Transform your living space effortlessly.',
//     image: 'https://picsum.photos/400/300?random=11'
//   },
//   {
//     id: '12',
//     category: 'Food and Beverage',
//     brand: 'FoodieCorner',
//     name: 'Gourmet Delights',
//     description: 'Taste the best gourmet food selections.',
//     image: 'https://picsum.photos/400/300?random=12'
//   },
//   {
//     id: '13',
//     category: 'Travel and Experiences',
//     brand: 'NomadLife',
//     name: 'Wanderlust Deals',
//     description: 'Unbeatable deals on dream destinations.',
//     image: 'https://picsum.photos/400/300?random=13'
//   },
//   {
//     id: '14',
//     category: 'Others',
//     brand: 'RandomStuff',
//     name: 'Surprise Discounts',
//     description: 'Exciting discounts on mystery products.',
//     image: 'https://picsum.photos/400/300?random=14'
//   },
//   {
//     id: '15',
//     category: 'Fashion and Beauty',
//     brand: 'StyleMode',
//     name: 'Winter Wear Collection',
//     description: 'Stay stylish this winter.',
//     image: 'https://picsum.photos/400/300?random=15'
//   },
//   {
//     id: '16',
//     category: 'Fitness and Wellness',
//     brand: 'RunRight',
//     name: 'Marathon Prep',
//     description: 'Get marathon-ready with our top picks.',
//     image: 'https://picsum.photos/400/300?random=16'
//   },
//   {
//     id: '17',
//     category: 'Technology and Gadgets',
//     brand: 'AIStore',
//     name: 'Smart AI Deals',
//     description: 'Exclusive deals on AI-powered gadgets.',
//     image: 'https://picsum.photos/400/300?random=17'
//   },
//   {
//     id: '18',
//     category: 'Lifestyle and Home',
//     brand: 'RelaxSpace',
//     name: 'Zen Living',
//     description: 'Create a peaceful space in your home.',
//     image: 'https://picsum.photos/400/300?random=18'
//   },
//   {
//     id: '19',
//     category: 'Food and Beverage',
//     brand: 'FreshBites',
//     name: 'Organic Food Month',
//     description: 'Eat healthy with fresh organic food.',
//     image: 'https://picsum.photos/400/300?random=19'
//   },
//   {
//     id: '20',
//     category: 'Travel and Experiences',
//     brand: 'FlyAway',
//     name: 'Luxury Travel Week',
//     description: 'Travel in style with premium discounts.',
//     image: 'https://picsum.photos/400/300?random=20'
//   }
// ];

export const all_campaigns = [
  {
    id: '1',
    category: 'Fashion and Beauty',
    brand: 'LockedShop',
    name: "Presidents' Week Campaign",
    description:
      "Exclusive fashion deals for Presidents' Week. Enjoy massive discounts on premium fashion items, including designer wear, accessories, and more. This campaign is designed for fashion lovers who want to upgrade their wardrobe without breaking the bank. Limited-time offers and exclusive bundles available. Don't miss out on these special deals curated for style enthusiasts.",
    brand_logo: 'https://picsum.photos/1200/600?random=1001',
    products: [
      {
        id: '101',
        name: 'Premium Leather Jacket',
        price: 129.99,
        commission_rate: 10,
        images: [
          'https://picsum.photos/800/800?random=2001',
          'https://picsum.photos/800/800?random=2002',
          'https://picsum.photos/800/800?random=2003'
        ],
        stock: 150,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '102',
        name: 'Designer Sunglasses',
        price: 79.99,
        commission_rate: 8,
        images: [
          'https://picsum.photos/800/800?random=2011',
          'https://picsum.photos/800/800?random=2012',
          'https://picsum.photos/800/800?random=2013'
        ],
        stock: 200,
        sample_status: 'Not Available',
        variant: {
          name: 'Lens Color',
          options: ['Black', 'Brown', 'Blue']
        }
      }
    ],
    terms: [
      'Affiliates must adhere to promotional guidelines.',
      'Commission is only applicable to completed purchases.',
      'Campaign is valid until the end date specified.',
      'Discounts cannot be combined with other promotions.',
      'Stock availability is subject to change.'
    ],
    milestones: [
      { target_gmv: 5000, reward: 300 },
      { target_gmv: 10000, reward: 700 },
      { target_gmv: 20000, reward: 1500 },
      { target_gmv: 30000, reward: 3000 }
    ],
    start_date: '2025-02-01',
    end_date: '2025-03-01'
  }
];
