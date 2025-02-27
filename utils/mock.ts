export const active_campaigns = [
  {
    id: '0',
    category: 'Fashion and Beauty',
    brand: 'LockedShop',
    name: "Presidents' Week Campaign",
    description:
      "Exclusive fashion deals for Presidents' Week. Enjoy massive discounts on premium fashion items, including designer wear, accessories, and more. This campaign is designed for fashion lovers who want to upgrade their wardrobe without breaking the bank. Limited-time offers and exclusive bundles available. Don't miss out on these special deals curated for style enthusiasts.",
    brand_logo: 'https://picsum.photos/1200/600?random=101',
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
    end_date: '2025-03-01',
    progress: {
      videos: 7,
      orders: 124,
      gmv: 12000
    }
  },
  {
    id: '1',
    category: 'Travel and Experiences',
    brand: 'NomadLife',
    name: 'NomadLife Exclusive Travel and Experiences Deals',
    description:
      'Shop high-quality travel and experiences products from NomadLife at unbeatable prices. Limited-time discounts available!',
    brand_logo: 'https://picsum.photos/1200/600?random=1001',
    products: [
      {
        id: '11',
        name: 'Luxury Cruise Package',
        price: 225.4,
        commission_rate: 5,
        images: [
          'https://picsum.photos/800/800?random=3001',
          'https://picsum.photos/800/800?random=3101'
        ],
        stock: 73,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '12',
        name: 'Luxury Cruise Package',
        price: 89.25,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3002',
          'https://picsum.photos/800/800?random=3102'
        ],
        stock: 132,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-7',
    end_date: '2025-03-31',
    progress: {
      videos: 3,
      orders: 36,
      gmv: 4000
    }
  }
];

export const completed_campaigns = [
  {
    id: '2',
    category: 'Food and Beverage',
    brand: 'FreshBites',
    name: 'FreshBites Exclusive Food and Beverage Deals',
    description:
      'Discover incredible food and beverage deals from FreshBites. Find premium products that fit your style and budget.',
    brand_logo: 'https://picsum.photos/1200/600?random=1002',
    products: [
      {
        id: '21',
        name: 'Organic Coffee Beans',
        price: 103.04,
        commission_rate: 12,
        images: [
          'https://picsum.photos/800/800?random=3002',
          'https://picsum.photos/800/800?random=3102'
        ],
        stock: 182,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '22',
        name: 'Gourmet Chocolate Box',
        price: 92.74,
        commission_rate: 8,
        images: [
          'https://picsum.photos/800/800?random=3004',
          'https://picsum.photos/800/800?random=3104'
        ],
        stock: 332,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '23',
        name: 'Wine Selection',
        price: 150.13,
        commission_rate: 11,
        images: [
          'https://picsum.photos/800/800?random=3006',
          'https://picsum.photos/800/800?random=3106'
        ],
        stock: 364,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '24',
        name: 'Premium Olive Oil',
        price: 275.79,
        commission_rate: 11,
        images: [
          'https://picsum.photos/800/800?random=3008',
          'https://picsum.photos/800/800?random=3108'
        ],
        stock: 382,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-01-20',
    end_date: '2025-02-13',
    progress: {
      videos: 3,
      orders: 36,
      gmv: 4000,
      commission: 480
    }
  }
];

export const all_campaigns = [
  {
    id: '0',
    category: 'Fashion and Beauty',
    brand: 'LockedShop',
    name: "Presidents' Week Campaign",
    description:
      "Exclusive fashion deals for Presidents' Week. Enjoy massive discounts on premium fashion items, including designer wear, accessories, and more. This campaign is designed for fashion lovers who want to upgrade their wardrobe without breaking the bank. Limited-time offers and exclusive bundles available. Don't miss out on these special deals curated for style enthusiasts.",
    brand_logo: 'https://picsum.photos/1200/600?random=101',
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
  },
  {
    id: '1',
    category: 'Travel and Experiences',
    brand: 'NomadLife',
    name: 'NomadLife Exclusive Travel and Experiences Deals',
    description:
      'Shop high-quality travel and experiences products from NomadLife at unbeatable prices. Limited-time discounts available!',
    brand_logo: 'https://picsum.photos/1200/600?random=1001',
    products: [
      {
        id: '11',
        name: 'Luxury Cruise Package',
        price: 225.4,
        commission_rate: 5,
        images: [
          'https://picsum.photos/800/800?random=3001',
          'https://picsum.photos/800/800?random=3101'
        ],
        stock: 73,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '12',
        name: 'Luxury Cruise Package',
        price: 89.25,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3002',
          'https://picsum.photos/800/800?random=3102'
        ],
        stock: 132,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-7',
    end_date: '2025-03-31'
  },
  {
    id: '2',
    category: 'Food and Beverage',
    brand: 'FreshBites',
    name: 'FreshBites Exclusive Food and Beverage Deals',
    description:
      'Discover incredible food and beverage deals from FreshBites. Find premium products that fit your style and budget.',
    brand_logo: 'https://picsum.photos/1200/600?random=1002',
    products: [
      {
        id: '21',
        name: 'Organic Coffee Beans',
        price: 103.04,
        commission_rate: 12,
        images: [
          'https://picsum.photos/800/800?random=3002',
          'https://picsum.photos/800/800?random=3102'
        ],
        stock: 182,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '22',
        name: 'Gourmet Chocolate Box',
        price: 92.74,
        commission_rate: 8,
        images: [
          'https://picsum.photos/800/800?random=3004',
          'https://picsum.photos/800/800?random=3104'
        ],
        stock: 332,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '23',
        name: 'Wine Selection',
        price: 150.13,
        commission_rate: 11,
        images: [
          'https://picsum.photos/800/800?random=3006',
          'https://picsum.photos/800/800?random=3106'
        ],
        stock: 364,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '24',
        name: 'Premium Olive Oil',
        price: 275.79,
        commission_rate: 11,
        images: [
          'https://picsum.photos/800/800?random=3008',
          'https://picsum.photos/800/800?random=3108'
        ],
        stock: 382,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-13'
  },
  {
    id: '3',
    category: 'Travel and Experiences',
    brand: 'GlobeTrek',
    name: 'GlobeTrek Exclusive Travel and Experiences Deals',
    description:
      'Your chance to grab top-notch travel and experiences items at amazing prices from GlobeTrek. Upgrade your collection today!',
    brand_logo: 'https://picsum.photos/1200/600?random=1003',
    products: [
      {
        id: '31',
        name: 'Luxury Cruise Package',
        price: 121.7,
        commission_rate: 10,
        images: [
          'https://picsum.photos/800/800?random=3003',
          'https://picsum.photos/800/800?random=3103'
        ],
        stock: 258,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-6'
  },
  {
    id: '4',
    category: 'Technology and Gadgets',
    brand: 'TechSavvy',
    name: 'TechSavvy Exclusive Technology and Gadgets Deals',
    description:
      'Exclusive event from TechSavvy! Get amazing discounts on technology and gadgets essentials and upgrade your collection today.',
    brand_logo: 'https://picsum.photos/1200/600?random=1004',
    products: [
      {
        id: '41',
        name: 'Gaming Mouse',
        price: 125.38,
        commission_rate: 12,
        images: [
          'https://picsum.photos/800/800?random=3004',
          'https://picsum.photos/800/800?random=3104'
        ],
        stock: 314,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-5',
    end_date: '2025-03-14'
  },
  {
    id: '5',
    category: 'Others',
    brand: 'RandomStuff',
    name: 'RandomStuff Exclusive Others Deals',
    description:
      'Shop high-quality others products from RandomStuff at unbeatable prices. Limited-time discounts available!',
    brand_logo: 'https://picsum.photos/1200/600?random=1005',
    products: [
      {
        id: '51',
        name: 'Random Surprise Product',
        price: 71.08,
        commission_rate: 13,
        images: [
          'https://picsum.photos/800/800?random=3005',
          'https://picsum.photos/800/800?random=3105'
        ],
        stock: 229,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '52',
        name: 'Gift Card',
        price: 261.32,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3010',
          'https://picsum.photos/800/800?random=3110'
        ],
        stock: 442,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '53',
        name: 'Random Surprise Product',
        price: 238.19,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3015',
          'https://picsum.photos/800/800?random=3115'
        ],
        stock: 148,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-2'
  },
  {
    id: '6',
    category: 'Fitness and Wellness',
    brand: 'RunRight',
    name: 'RunRight Exclusive Fitness and Wellness Deals',
    description:
      'Upgrade your lifestyle with exclusive deals from RunRight. This campaign offers top-quality fitness and wellness products at unbeatable prices.',
    brand_logo: 'https://picsum.photos/1200/600?random=1006',
    products: [
      {
        id: '61',
        name: 'Yoga Mat',
        price: 92.64,
        commission_rate: 12,
        images: [
          'https://picsum.photos/800/800?random=3006',
          'https://picsum.photos/800/800?random=3106'
        ],
        stock: 96,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '62',
        name: 'Running Shoes',
        price: 174.84,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3012',
          'https://picsum.photos/800/800?random=3112'
        ],
        stock: 353,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '63',
        name: 'Smart Fitness Band',
        price: 227.42,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3018',
          'https://picsum.photos/800/800?random=3118'
        ],
        stock: 375,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '64',
        name: 'Yoga Mat',
        price: 293.69,
        commission_rate: 9,
        images: [
          'https://picsum.photos/800/800?random=3024',
          'https://picsum.photos/800/800?random=3124'
        ],
        stock: 435,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-14'
  },
  {
    id: '7',
    category: 'Fitness and Wellness',
    brand: 'RunRight',
    name: 'RunRight Exclusive Fitness and Wellness Deals',
    description:
      'Exclusive event from RunRight! Get amazing discounts on fitness and wellness essentials and upgrade your collection today.',
    brand_logo: 'https://picsum.photos/1200/600?random=1007',
    products: [
      {
        id: '71',
        name: 'Running Shoes',
        price: 88.86,
        commission_rate: 7,
        images: [
          'https://picsum.photos/800/800?random=3007',
          'https://picsum.photos/800/800?random=3107'
        ],
        stock: 346,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '72',
        name: 'Protein Powder',
        price: 146.68,
        commission_rate: 11,
        images: [
          'https://picsum.photos/800/800?random=3014',
          'https://picsum.photos/800/800?random=3114'
        ],
        stock: 495,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-7',
    end_date: '2025-03-25'
  },
  {
    id: '8',
    category: 'Travel and Experiences',
    brand: 'NomadLife',
    name: 'NomadLife Exclusive Travel and Experiences Deals',
    description:
      'Shop high-quality travel and experiences products from NomadLife at unbeatable prices. Limited-time discounts available!',
    brand_logo: 'https://picsum.photos/1200/600?random=1008',
    products: [
      {
        id: '81',
        name: 'Adventure Gear Set',
        price: 158.3,
        commission_rate: 8,
        images: [
          'https://picsum.photos/800/800?random=3008',
          'https://picsum.photos/800/800?random=3108'
        ],
        stock: 111,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '82',
        name: 'Adventure Gear Set',
        price: 199.36,
        commission_rate: 8,
        images: [
          'https://picsum.photos/800/800?random=3016',
          'https://picsum.photos/800/800?random=3116'
        ],
        stock: 138,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '83',
        name: 'Luxury Cruise Package',
        price: 298.82,
        commission_rate: 6,
        images: [
          'https://picsum.photos/800/800?random=3024',
          'https://picsum.photos/800/800?random=3124'
        ],
        stock: 321,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-5'
  },
  {
    id: '9',
    category: 'Technology and Gadgets',
    brand: 'GadgetWorld',
    name: 'GadgetWorld Exclusive Technology and Gadgets Deals',
    description:
      "Don't miss out on this special technology and gadgets sale from GadgetWorld. Limited stock available\u2014shop now!",
    brand_logo: 'https://picsum.photos/1200/600?random=1009',
    products: [
      {
        id: '91',
        name: 'Smartphone',
        price: 225.36,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3009',
          'https://picsum.photos/800/800?random=3109'
        ],
        stock: 247,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-13',
    end_date: '2025-03-26'
  },
  {
    id: '10',
    category: 'Fitness and Wellness',
    brand: 'RunRight',
    name: 'RunRight Exclusive Fitness and Wellness Deals',
    description:
      'Exclusive event from RunRight! Get amazing discounts on fitness and wellness essentials and upgrade your collection today.',
    brand_logo: 'https://picsum.photos/1200/600?random=1010',
    products: [
      {
        id: '101',
        name: 'Running Shoes',
        price: 217.67,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3010',
          'https://picsum.photos/800/800?random=3110'
        ],
        stock: 332,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-10',
    end_date: '2025-03-27'
  },
  {
    id: '11',
    category: 'Lifestyle and Home',
    brand: 'CozyNest',
    name: 'CozyNest Exclusive Lifestyle and Home Deals',
    description:
      'Discover incredible lifestyle and home deals from CozyNest. Find premium products that fit your style and budget.',
    brand_logo: 'https://picsum.photos/1200/600?random=1011',
    products: [
      {
        id: '111',
        name: 'LED Lamp',
        price: 74.98,
        commission_rate: 8,
        images: [
          'https://picsum.photos/800/800?random=3011',
          'https://picsum.photos/800/800?random=3111'
        ],
        stock: 428,
        sample_status: 'Not Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '112',
        name: 'LED Lamp',
        price: 87.14,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3022',
          'https://picsum.photos/800/800?random=3122'
        ],
        stock: 389,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '113',
        name: 'LED Lamp',
        price: 293.55,
        commission_rate: 6,
        images: [
          'https://picsum.photos/800/800?random=3033',
          'https://picsum.photos/800/800?random=3133'
        ],
        stock: 477,
        sample_status: 'Not Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '114',
        name: 'Sofa Set',
        price: 105.92,
        commission_rate: 9,
        images: [
          'https://picsum.photos/800/800?random=3044',
          'https://picsum.photos/800/800?random=3144'
        ],
        stock: 240,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-17'
  },
  {
    id: '12',
    category: 'Lifestyle and Home',
    brand: 'RelaxSpace',
    name: 'RelaxSpace Exclusive Lifestyle and Home Deals',
    description:
      'Discover incredible lifestyle and home deals from RelaxSpace. Find premium products that fit your style and budget.',
    brand_logo: 'https://picsum.photos/1200/600?random=1012',
    products: [
      {
        id: '121',
        name: 'Sofa Set',
        price: 167.62,
        commission_rate: 6,
        images: [
          'https://picsum.photos/800/800?random=3012',
          'https://picsum.photos/800/800?random=3112'
        ],
        stock: 86,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '122',
        name: 'Coffee Table',
        price: 51.9,
        commission_rate: 6,
        images: [
          'https://picsum.photos/800/800?random=3024',
          'https://picsum.photos/800/800?random=3124'
        ],
        stock: 304,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '123',
        name: 'Sofa Set',
        price: 178.88,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3036',
          'https://picsum.photos/800/800?random=3136'
        ],
        stock: 286,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-8',
    end_date: '2025-03-2'
  },
  {
    id: '13',
    category: 'Fitness and Wellness',
    brand: 'FitZone',
    name: 'FitZone Exclusive Fitness and Wellness Deals',
    description:
      'Upgrade your lifestyle with exclusive deals from FitZone. This campaign offers top-quality fitness and wellness products at unbeatable prices.',
    brand_logo: 'https://picsum.photos/1200/600?random=1013',
    products: [
      {
        id: '131',
        name: 'Protein Powder',
        price: 268.22,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3013',
          'https://picsum.photos/800/800?random=3113'
        ],
        stock: 189,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '132',
        name: 'Protein Powder',
        price: 88.1,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3026',
          'https://picsum.photos/800/800?random=3126'
        ],
        stock: 487,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-8',
    end_date: '2025-03-8'
  },
  {
    id: '14',
    category: 'Fitness and Wellness',
    brand: 'FitZone',
    name: 'FitZone Exclusive Fitness and Wellness Deals',
    description:
      'Your chance to grab top-notch fitness and wellness items at amazing prices from FitZone. Upgrade your collection today!',
    brand_logo: 'https://picsum.photos/1200/600?random=1014',
    products: [
      {
        id: '141',
        name: 'Smart Fitness Band',
        price: 263.54,
        commission_rate: 10,
        images: [
          'https://picsum.photos/800/800?random=3014',
          'https://picsum.photos/800/800?random=3114'
        ],
        stock: 228,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '142',
        name: 'Yoga Mat',
        price: 241.32,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3028',
          'https://picsum.photos/800/800?random=3128'
        ],
        stock: 249,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '143',
        name: 'Protein Powder',
        price: 211.87,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3042',
          'https://picsum.photos/800/800?random=3142'
        ],
        stock: 423,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-18'
  },
  {
    id: '15',
    category: 'Fashion and Beauty',
    brand: 'TrendSetter',
    name: 'TrendSetter Exclusive Fashion and Beauty Deals',
    description:
      'Your chance to grab top-notch fashion and beauty items at amazing prices from TrendSetter. Upgrade your collection today!',
    brand_logo: 'https://picsum.photos/1200/600?random=1015',
    products: [
      {
        id: '151',
        name: 'High-Heel Shoes',
        price: 266.55,
        commission_rate: 6,
        images: [
          'https://picsum.photos/800/800?random=3015',
          'https://picsum.photos/800/800?random=3115'
        ],
        stock: 241,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '152',
        name: 'Designer Handbag',
        price: 288.44,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3030',
          'https://picsum.photos/800/800?random=3130'
        ],
        stock: 197,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-21'
  },
  {
    id: '16',
    category: 'Travel and Experiences',
    brand: 'NomadLife',
    name: 'NomadLife Exclusive Travel and Experiences Deals',
    description:
      'Amazing savings on travel and experiences products from NomadLife. Get them while they last!',
    brand_logo: 'https://picsum.photos/1200/600?random=1016',
    products: [
      {
        id: '161',
        name: 'Adventure Gear Set',
        price: 281.18,
        commission_rate: 11,
        images: [
          'https://picsum.photos/800/800?random=3016',
          'https://picsum.photos/800/800?random=3116'
        ],
        stock: 454,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '162',
        name: 'Adventure Gear Set',
        price: 74.9,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3032',
          'https://picsum.photos/800/800?random=3132'
        ],
        stock: 342,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-4',
    end_date: '2025-03-4'
  },
  {
    id: '17',
    category: 'Technology and Gadgets',
    brand: 'GadgetWorld',
    name: 'GadgetWorld Exclusive Technology and Gadgets Deals',
    description:
      "Don't miss out on this special technology and gadgets sale from GadgetWorld. Limited stock available\u2014shop now!",
    brand_logo: 'https://picsum.photos/1200/600?random=1017',
    products: [
      {
        id: '171',
        name: 'Laptop',
        price: 150.18,
        commission_rate: 7,
        images: [
          'https://picsum.photos/800/800?random=3017',
          'https://picsum.photos/800/800?random=3117'
        ],
        stock: 69,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '172',
        name: 'Laptop',
        price: 282.75,
        commission_rate: 8,
        images: [
          'https://picsum.photos/800/800?random=3034',
          'https://picsum.photos/800/800?random=3134'
        ],
        stock: 461,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-17'
  },
  {
    id: '18',
    category: 'Fitness and Wellness',
    brand: 'FitZone',
    name: 'FitZone Exclusive Fitness and Wellness Deals',
    description:
      "Don't miss out on this special fitness and wellness sale from FitZone. Limited stock available\u2014shop now!",
    brand_logo: 'https://picsum.photos/1200/600?random=1018',
    products: [
      {
        id: '181',
        name: 'Smart Fitness Band',
        price: 195.63,
        commission_rate: 7,
        images: [
          'https://picsum.photos/800/800?random=3018',
          'https://picsum.photos/800/800?random=3118'
        ],
        stock: 274,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-10'
  },
  {
    id: '19',
    category: 'Others',
    brand: 'MiscStore',
    name: 'MiscStore Exclusive Others Deals',
    description:
      'Discover incredible others deals from MiscStore. Find premium products that fit your style and budget.',
    brand_logo: 'https://picsum.photos/1200/600?random=1019',
    products: [
      {
        id: '191',
        name: 'Mystery Box',
        price: 144.29,
        commission_rate: 6,
        images: [
          'https://picsum.photos/800/800?random=3019',
          'https://picsum.photos/800/800?random=3119'
        ],
        stock: 77,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '192',
        name: 'Random Surprise Product',
        price: 225.06,
        commission_rate: 13,
        images: [
          'https://picsum.photos/800/800?random=3038',
          'https://picsum.photos/800/800?random=3138'
        ],
        stock: 350,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '193',
        name: 'Random Surprise Product',
        price: 266.21,
        commission_rate: 13,
        images: [
          'https://picsum.photos/800/800?random=3057',
          'https://picsum.photos/800/800?random=3157'
        ],
        stock: 222,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '194',
        name: 'Mystery Box',
        price: 296.08,
        commission_rate: 5,
        images: [
          'https://picsum.photos/800/800?random=3076',
          'https://picsum.photos/800/800?random=3176'
        ],
        stock: 391,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-7'
  },
  {
    id: '20',
    category: 'Lifestyle and Home',
    brand: 'CozyNest',
    name: 'CozyNest Exclusive Lifestyle and Home Deals',
    description:
      'Explore premium lifestyle and home deals from CozyNest. Limited-time offers on high-quality products.',
    brand_logo: 'https://picsum.photos/1200/600?random=1020',
    products: [
      {
        id: '201',
        name: 'Coffee Table',
        price: 271.01,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3020',
          'https://picsum.photos/800/800?random=3120'
        ],
        stock: 95,
        sample_status: 'Not Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '202',
        name: 'Ceramic Vase',
        price: 263.09,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3040',
          'https://picsum.photos/800/800?random=3140'
        ],
        stock: 104,
        sample_status: 'Not Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '203',
        name: 'Sofa Set',
        price: 54.11,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3060',
          'https://picsum.photos/800/800?random=3160'
        ],
        stock: 212,
        sample_status: 'Not Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-6',
    end_date: '2025-03-27'
  },
  {
    id: '21',
    category: 'Others',
    brand: 'RandomStuff',
    name: 'RandomStuff Exclusive Others Deals',
    description:
      "Limited-time discounts on others products! Don't miss out on premium selections from RandomStuff.",
    brand_logo: 'https://picsum.photos/1200/600?random=1021',
    products: [
      {
        id: '211',
        name: 'Random Surprise Product',
        price: 169.42,
        commission_rate: 8,
        images: [
          'https://picsum.photos/800/800?random=3021',
          'https://picsum.photos/800/800?random=3121'
        ],
        stock: 166,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '212',
        name: 'Mystery Box',
        price: 111.43,
        commission_rate: 7,
        images: [
          'https://picsum.photos/800/800?random=3042',
          'https://picsum.photos/800/800?random=3142'
        ],
        stock: 70,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '213',
        name: 'Random Surprise Product',
        price: 71.78,
        commission_rate: 10,
        images: [
          'https://picsum.photos/800/800?random=3063',
          'https://picsum.photos/800/800?random=3163'
        ],
        stock: 494,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-1',
    end_date: '2025-03-8'
  },
  {
    id: '22',
    category: 'Food and Beverage',
    brand: 'FoodieCorner',
    name: 'FoodieCorner Exclusive Food and Beverage Deals',
    description:
      "Limited-time discounts on food and beverage products! Don't miss out on premium selections from FoodieCorner.",
    brand_logo: 'https://picsum.photos/1200/600?random=1022',
    products: [
      {
        id: '221',
        name: 'Wine Selection',
        price: 251.36,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3022',
          'https://picsum.photos/800/800?random=3122'
        ],
        stock: 101,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '222',
        name: 'Organic Coffee Beans',
        price: 123.42,
        commission_rate: 13,
        images: [
          'https://picsum.photos/800/800?random=3044',
          'https://picsum.photos/800/800?random=3144'
        ],
        stock: 273,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '223',
        name: 'Premium Olive Oil',
        price: 144.53,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3066',
          'https://picsum.photos/800/800?random=3166'
        ],
        stock: 103,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '224',
        name: 'Wine Selection',
        price: 267.19,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3088',
          'https://picsum.photos/800/800?random=3188'
        ],
        stock: 132,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-24'
  },
  {
    id: '23',
    category: 'Travel and Experiences',
    brand: 'GlobeTrek',
    name: 'GlobeTrek Exclusive Travel and Experiences Deals',
    description:
      'Exclusive event from GlobeTrek! Get amazing discounts on travel and experiences essentials and upgrade your collection today.',
    brand_logo: 'https://picsum.photos/1200/600?random=1023',
    products: [
      {
        id: '231',
        name: 'Adventure Gear Set',
        price: 195.46,
        commission_rate: 12,
        images: [
          'https://picsum.photos/800/800?random=3023',
          'https://picsum.photos/800/800?random=3123'
        ],
        stock: 67,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '232',
        name: 'Adventure Gear Set',
        price: 90.41,
        commission_rate: 5,
        images: [
          'https://picsum.photos/800/800?random=3046',
          'https://picsum.photos/800/800?random=3146'
        ],
        stock: 285,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '233',
        name: 'Luxury Cruise Package',
        price: 185.98,
        commission_rate: 12,
        images: [
          'https://picsum.photos/800/800?random=3069',
          'https://picsum.photos/800/800?random=3169'
        ],
        stock: 74,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-3',
    end_date: '2025-03-25'
  },
  {
    id: '24',
    category: 'Fashion and Beauty',
    brand: 'StyleMode',
    name: 'StyleMode Exclusive Fashion and Beauty Deals',
    description:
      "Limited-time discounts on fashion and beauty products! Don't miss out on premium selections from StyleMode.",
    brand_logo: 'https://picsum.photos/1200/600?random=1024',
    products: [
      {
        id: '241',
        name: 'Designer Handbag',
        price: 294.71,
        commission_rate: 9,
        images: [
          'https://picsum.photos/800/800?random=3024',
          'https://picsum.photos/800/800?random=3124'
        ],
        stock: 397,
        sample_status: 'Not Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '242',
        name: 'High-Heel Shoes',
        price: 56.26,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3048',
          'https://picsum.photos/800/800?random=3148'
        ],
        stock: 232,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-19'
  },
  {
    id: '25',
    category: 'Travel and Experiences',
    brand: 'FlyAway',
    name: 'FlyAway Exclusive Travel and Experiences Deals',
    description:
      'Discover incredible travel and experiences deals from FlyAway. Find premium products that fit your style and budget.',
    brand_logo: 'https://picsum.photos/1200/600?random=1025',
    products: [
      {
        id: '251',
        name: 'All-Inclusive Resort Stay',
        price: 257.76,
        commission_rate: 6,
        images: [
          'https://picsum.photos/800/800?random=3025',
          'https://picsum.photos/800/800?random=3125'
        ],
        stock: 441,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '252',
        name: 'Luxury Cruise Package',
        price: 198.68,
        commission_rate: 7,
        images: [
          'https://picsum.photos/800/800?random=3050',
          'https://picsum.photos/800/800?random=3150'
        ],
        stock: 252,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-1',
    end_date: '2025-03-23'
  },
  {
    id: '26',
    category: 'Technology and Gadgets',
    brand: 'GadgetWorld',
    name: 'GadgetWorld Exclusive Technology and Gadgets Deals',
    description:
      'Shop high-quality technology and gadgets products from GadgetWorld at unbeatable prices. Limited-time discounts available!',
    brand_logo: 'https://picsum.photos/1200/600?random=1026',
    products: [
      {
        id: '261',
        name: 'Gaming Mouse',
        price: 124.97,
        commission_rate: 13,
        images: [
          'https://picsum.photos/800/800?random=3026',
          'https://picsum.photos/800/800?random=3126'
        ],
        stock: 261,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-3',
    end_date: '2025-03-12'
  },
  {
    id: '27',
    category: 'Technology and Gadgets',
    brand: 'TechSavvy',
    name: 'TechSavvy Exclusive Technology and Gadgets Deals',
    description:
      'Discover incredible technology and gadgets deals from TechSavvy. Find premium products that fit your style and budget.',
    brand_logo: 'https://picsum.photos/1200/600?random=1027',
    products: [
      {
        id: '271',
        name: 'Gaming Mouse',
        price: 55.54,
        commission_rate: 7,
        images: [
          'https://picsum.photos/800/800?random=3027',
          'https://picsum.photos/800/800?random=3127'
        ],
        stock: 491,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '272',
        name: 'Gaming Mouse',
        price: 108.08,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3054',
          'https://picsum.photos/800/800?random=3154'
        ],
        stock: 428,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '273',
        name: 'Laptop',
        price: 207.48,
        commission_rate: 12,
        images: [
          'https://picsum.photos/800/800?random=3081',
          'https://picsum.photos/800/800?random=3181'
        ],
        stock: 326,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '274',
        name: 'Smartphone',
        price: 130.09,
        commission_rate: 12,
        images: [
          'https://picsum.photos/800/800?random=3108',
          'https://picsum.photos/800/800?random=3208'
        ],
        stock: 242,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-18'
  },
  {
    id: '28',
    category: 'Food and Beverage',
    brand: 'TastyBites',
    name: 'TastyBites Exclusive Food and Beverage Deals',
    description:
      'Amazing savings on food and beverage products from TastyBites. Get them while they last!',
    brand_logo: 'https://picsum.photos/1200/600?random=1028',
    products: [
      {
        id: '281',
        name: 'Organic Coffee Beans',
        price: 154.97,
        commission_rate: 13,
        images: [
          'https://picsum.photos/800/800?random=3028',
          'https://picsum.photos/800/800?random=3128'
        ],
        stock: 324,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '282',
        name: 'Wine Selection',
        price: 188.66,
        commission_rate: 10,
        images: [
          'https://picsum.photos/800/800?random=3056',
          'https://picsum.photos/800/800?random=3156'
        ],
        stock: 405,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '283',
        name: 'Wine Selection',
        price: 298.75,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3084',
          'https://picsum.photos/800/800?random=3184'
        ],
        stock: 371,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '284',
        name: 'Gourmet Chocolate Box',
        price: 156.47,
        commission_rate: 9,
        images: [
          'https://picsum.photos/800/800?random=3112',
          'https://picsum.photos/800/800?random=3212'
        ],
        stock: 145,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-10',
    end_date: '2025-03-9'
  },
  {
    id: '29',
    category: 'Travel and Experiences',
    brand: 'GlobeTrek',
    name: 'GlobeTrek Exclusive Travel and Experiences Deals',
    description:
      'Exclusive event from GlobeTrek! Get amazing discounts on travel and experiences essentials and upgrade your collection today.',
    brand_logo: 'https://picsum.photos/1200/600?random=1029',
    products: [
      {
        id: '291',
        name: 'All-Inclusive Resort Stay',
        price: 291.47,
        commission_rate: 7,
        images: [
          'https://picsum.photos/800/800?random=3029',
          'https://picsum.photos/800/800?random=3129'
        ],
        stock: 111,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '292',
        name: 'Adventure Gear Set',
        price: 279.15,
        commission_rate: 10,
        images: [
          'https://picsum.photos/800/800?random=3058',
          'https://picsum.photos/800/800?random=3158'
        ],
        stock: 428,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-6',
    end_date: '2025-03-4'
  },
  {
    id: '30',
    category: 'Travel and Experiences',
    brand: 'NomadLife',
    name: 'NomadLife Exclusive Travel and Experiences Deals',
    description:
      'Shop the best travel and experiences items from NomadLife at special promotional rates. Quality and savings, all in one place.',
    brand_logo: 'https://picsum.photos/1200/600?random=1030',
    products: [
      {
        id: '301',
        name: 'All-Inclusive Resort Stay',
        price: 258.62,
        commission_rate: 10,
        images: [
          'https://picsum.photos/800/800?random=3030',
          'https://picsum.photos/800/800?random=3130'
        ],
        stock: 277,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-20'
  },
  {
    id: '31',
    category: 'Travel and Experiences',
    brand: 'NomadLife',
    name: 'NomadLife Exclusive Travel and Experiences Deals',
    description:
      'Upgrade your lifestyle with exclusive deals from NomadLife. This campaign offers top-quality travel and experiences products at unbeatable prices.',
    brand_logo: 'https://picsum.photos/1200/600?random=1031',
    products: [
      {
        id: '311',
        name: 'All-Inclusive Resort Stay',
        price: 171.02,
        commission_rate: 9,
        images: [
          'https://picsum.photos/800/800?random=3031',
          'https://picsum.photos/800/800?random=3131'
        ],
        stock: 361,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '312',
        name: 'All-Inclusive Resort Stay',
        price: 284.75,
        commission_rate: 5,
        images: [
          'https://picsum.photos/800/800?random=3062',
          'https://picsum.photos/800/800?random=3162'
        ],
        stock: 81,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '313',
        name: 'All-Inclusive Resort Stay',
        price: 197.26,
        commission_rate: 5,
        images: [
          'https://picsum.photos/800/800?random=3093',
          'https://picsum.photos/800/800?random=3193'
        ],
        stock: 179,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-19'
  },
  {
    id: '32',
    category: 'Technology and Gadgets',
    brand: 'GadgetWorld',
    name: 'GadgetWorld Exclusive Technology and Gadgets Deals',
    description:
      'Explore premium technology and gadgets deals from GadgetWorld. Limited-time offers on high-quality products.',
    brand_logo: 'https://picsum.photos/1200/600?random=1032',
    products: [
      {
        id: '321',
        name: 'Smartphone',
        price: 187.14,
        commission_rate: 12,
        images: [
          'https://picsum.photos/800/800?random=3032',
          'https://picsum.photos/800/800?random=3132'
        ],
        stock: 496,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '322',
        name: 'Smartphone',
        price: 260.67,
        commission_rate: 11,
        images: [
          'https://picsum.photos/800/800?random=3064',
          'https://picsum.photos/800/800?random=3164'
        ],
        stock: 176,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-13',
    end_date: '2025-03-9'
  },
  {
    id: '33',
    category: 'Lifestyle and Home',
    brand: 'RelaxSpace',
    name: 'RelaxSpace Exclusive Lifestyle and Home Deals',
    description:
      'Your chance to grab top-notch lifestyle and home items at amazing prices from RelaxSpace. Upgrade your collection today!',
    brand_logo: 'https://picsum.photos/1200/600?random=1033',
    products: [
      {
        id: '331',
        name: 'LED Lamp',
        price: 255.13,
        commission_rate: 7,
        images: [
          'https://picsum.photos/800/800?random=3033',
          'https://picsum.photos/800/800?random=3133'
        ],
        stock: 294,
        sample_status: 'Not Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '332',
        name: 'Sofa Set',
        price: 181.5,
        commission_rate: 10,
        images: [
          'https://picsum.photos/800/800?random=3066',
          'https://picsum.photos/800/800?random=3166'
        ],
        stock: 137,
        sample_status: 'Not Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '333',
        name: 'Coffee Table',
        price: 158.92,
        commission_rate: 12,
        images: [
          'https://picsum.photos/800/800?random=3099',
          'https://picsum.photos/800/800?random=3199'
        ],
        stock: 102,
        sample_status: 'Not Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-25'
  },
  {
    id: '34',
    category: 'Others',
    brand: 'MiscStore',
    name: 'MiscStore Exclusive Others Deals',
    description:
      'Your chance to grab top-notch others items at amazing prices from MiscStore. Upgrade your collection today!',
    brand_logo: 'https://picsum.photos/1200/600?random=1034',
    products: [
      {
        id: '341',
        name: 'Gift Card',
        price: 137.3,
        commission_rate: 5,
        images: [
          'https://picsum.photos/800/800?random=3034',
          'https://picsum.photos/800/800?random=3134'
        ],
        stock: 357,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '342',
        name: 'Mystery Box',
        price: 113.5,
        commission_rate: 8,
        images: [
          'https://picsum.photos/800/800?random=3068',
          'https://picsum.photos/800/800?random=3168'
        ],
        stock: 119,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '343',
        name: 'Random Surprise Product',
        price: 270.11,
        commission_rate: 10,
        images: [
          'https://picsum.photos/800/800?random=3102',
          'https://picsum.photos/800/800?random=3202'
        ],
        stock: 263,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-2'
  },
  {
    id: '35',
    category: 'Others',
    brand: 'MiscStore',
    name: 'MiscStore Exclusive Others Deals',
    description:
      'Shop the best others items from MiscStore at special promotional rates. Quality and savings, all in one place.',
    brand_logo: 'https://picsum.photos/1200/600?random=1035',
    products: [
      {
        id: '351',
        name: 'Mystery Box',
        price: 131.23,
        commission_rate: 13,
        images: [
          'https://picsum.photos/800/800?random=3035',
          'https://picsum.photos/800/800?random=3135'
        ],
        stock: 62,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-25'
  },
  {
    id: '36',
    category: 'Fitness and Wellness',
    brand: 'FitZone',
    name: 'FitZone Exclusive Fitness and Wellness Deals',
    description:
      "Don't miss out on this special fitness and wellness sale from FitZone. Limited stock available\u2014shop now!",
    brand_logo: 'https://picsum.photos/1200/600?random=1036',
    products: [
      {
        id: '361',
        name: 'Protein Powder',
        price: 125.02,
        commission_rate: 14,
        images: [
          'https://picsum.photos/800/800?random=3036',
          'https://picsum.photos/800/800?random=3136'
        ],
        stock: 262,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-18'
  },
  {
    id: '37',
    category: 'Fashion and Beauty',
    brand: 'StyleMode',
    name: 'StyleMode Exclusive Fashion and Beauty Deals',
    description:
      'Explore premium fashion and beauty deals from StyleMode. Limited-time offers on high-quality products.',
    brand_logo: 'https://picsum.photos/1200/600?random=1037',
    products: [
      {
        id: '371',
        name: 'High-Heel Shoes',
        price: 234.62,
        commission_rate: 11,
        images: [
          'https://picsum.photos/800/800?random=3037',
          'https://picsum.photos/800/800?random=3137'
        ],
        stock: 188,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }
      },
      {
        id: '372',
        name: 'High-Heel Shoes',
        price: 174.46,
        commission_rate: 11,
        images: [
          'https://picsum.photos/800/800?random=3074',
          'https://picsum.photos/800/800?random=3174'
        ],
        stock: 355,
        sample_status: 'Not Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-20'
  },
  {
    id: '38',
    category: 'Others',
    brand: 'MiscStore',
    name: 'MiscStore Exclusive Others Deals',
    description:
      'Upgrade your lifestyle with exclusive deals from MiscStore. This campaign offers top-quality others products at unbeatable prices.',
    brand_logo: 'https://picsum.photos/1200/600?random=1038',
    products: [
      {
        id: '381',
        name: 'Random Surprise Product',
        price: 60.56,
        commission_rate: 15,
        images: [
          'https://picsum.photos/800/800?random=3038',
          'https://picsum.photos/800/800?random=3138'
        ],
        stock: 141,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '382',
        name: 'Random Surprise Product',
        price: 72.64,
        commission_rate: 13,
        images: [
          'https://picsum.photos/800/800?random=3076',
          'https://picsum.photos/800/800?random=3176'
        ],
        stock: 151,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '383',
        name: 'Random Surprise Product',
        price: 133.35,
        commission_rate: 11,
        images: [
          'https://picsum.photos/800/800?random=3114',
          'https://picsum.photos/800/800?random=3214'
        ],
        stock: 61,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-20',
    end_date: '2025-03-11'
  },
  {
    id: '39',
    category: 'Travel and Experiences',
    brand: 'NomadLife',
    name: 'NomadLife Exclusive Travel and Experiences Deals',
    description:
      'Explore premium travel and experiences deals from NomadLife. Limited-time offers on high-quality products.',
    brand_logo: 'https://picsum.photos/1200/600?random=1039',
    products: [
      {
        id: '391',
        name: 'Adventure Gear Set',
        price: 240.07,
        commission_rate: 6,
        images: [
          'https://picsum.photos/800/800?random=3039',
          'https://picsum.photos/800/800?random=3139'
        ],
        stock: 210,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '392',
        name: 'Adventure Gear Set',
        price: 180.66,
        commission_rate: 13,
        images: [
          'https://picsum.photos/800/800?random=3078',
          'https://picsum.photos/800/800?random=3178'
        ],
        stock: 381,
        sample_status: 'Not Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
        }
      },
      {
        id: '393',
        name: 'All-Inclusive Resort Stay',
        price: 74.06,
        commission_rate: 9,
        images: [
          'https://picsum.photos/800/800?random=3117',
          'https://picsum.photos/800/800?random=3217'
        ],
        stock: 208,
        sample_status: 'Available',
        variant: {
          name: 'Color',
          options: ['Black', 'White', 'Red', 'Blue']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-6',
    end_date: '2025-03-25'
  },
  {
    id: '40',
    category: 'Lifestyle and Home',
    brand: 'UrbanLiving',
    name: 'UrbanLiving Exclusive Lifestyle and Home Deals',
    description:
      'Exclusive event from UrbanLiving! Get amazing discounts on lifestyle and home essentials and upgrade your collection today.',
    brand_logo: 'https://picsum.photos/1200/600?random=1040',
    products: [
      {
        id: '401',
        name: 'LED Lamp',
        price: 233.89,
        commission_rate: 13,
        images: [
          'https://picsum.photos/800/800?random=3040',
          'https://picsum.photos/800/800?random=3140'
        ],
        stock: 286,
        sample_status: 'Available',
        variant: {
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
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
      {
        target_gmv: 5000,
        reward: 300
      },
      {
        target_gmv: 10000,
        reward: 700
      },
      {
        target_gmv: 20000,
        reward: 1500
      },
      {
        target_gmv: 30000,
        reward: 3000
      }
    ],
    start_date: '2025-02-4',
    end_date: '2025-03-28'
  }
];
