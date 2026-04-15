export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Dummy products data
    const products = [
      {
        id: 1,
        name: 'Mobile Legends',
        category: 'game',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1538481199705-c710000f7ee1?w=400&h=300&fit=crop',
        description: 'Diamond Top Up untuk Mobile Legends'
      },
      {
        id: 2,
        name: 'PUBG Mobile',
        category: 'game',
        price: 20000,
        image: 'https://images.unsplash.com/photo-1535671066888-d9ae1dbb4907?w=400&h=300&fit=crop',
        description: 'UC untuk PUBG Mobile'
      },
      {
        id: 3,
        name: 'Free Fire',
        category: 'game',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop',
        description: 'Diamond Free Fire'
      },
      {
        id: 4,
        name: 'Genshin Impact',
        category: 'game',
        price: 50000,
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop',
        description: 'Genesis Crystals Genshin Impact'
      },
      {
        id: 5,
        name: 'Honkai Star Rail',
        category: 'game',
        price: 50000,
        image: 'https://images.unsplash.com/photo-1440790041814-3da63cf5daa1?w=400&h=300&fit=crop',
        description: 'Stellar Jade Honkai Star Rail'
      },
      {
        id: 6,
        name: 'Call of Duty Mobile',
        category: 'game',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=400&h=300&fit=crop',
        description: 'CP untuk Call of Duty Mobile'
      },
      {
        id: 7,
        name: 'Clash of Clans',
        category: 'game',
        price: 75000,
        image: 'https://images.unsplash.com/photo-1535489734054-da9ca2b98e49?w=400&h=300&fit=crop',
        description: 'Gems untuk Clash of Clans'
      },
      {
        id: 8,
        name: 'Arena of Valor',
        category: 'game',
        price: 18000,
        image: 'https://images.unsplash.com/photo-1578979155585-af4f83bb3f9f?w=400&h=300&fit=crop',
        description: 'Coins Arena of Valor'
      }
    ];

    // Filter by category if provided
    const { category } = req.query;
    let filtered = products;

    if (category && category !== 'all') {
      filtered = products.filter(p => p.category === category);
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: true,
      data: filtered,
      total: filtered.length
    });

  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil produk: ' + error.message
    });
  }
}
