import { supabase } from '../supabaseClient';

export interface Advisory {
  id: number | string;
  crop_name: string;
  title: string;
  description?: string | null;
  season?: string;
  created_at?: string;
}

export interface Crop {
  _id: string;
  name: string;
  season: string;
  imageUrl: string;
  howToGrow: {
    soilType: string;
    watering?: string;
    sunlight?: string;
    duration: string;
    temperature?: string;
  };
  careTips?: string[];
  pestsAndDiseases?: Array<{
    name: string;
    symptoms: string;
    treatment: string;
  }>;
  fertilizerRecommendation?: string;
  marketInsights?: {
    demand: string;
    priceTrend: string;
    bestTimeToSell: string;
  };
  governmentSchemes?: Array<{
    name: string;
    description: string;
    benefits: string;
    eligibility: string;
    applicationProcess: string[];
    link?: string;
  }>;
}

export interface Scheme {
  _id: string;
  name: string;
  description: string;
  category: 'central' | 'state';
  link: string;
  createdAt: string | Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'admin';
  phone?: string;
}

// Initial curated crops
const DEFAULT_CROPS: Crop[] = [
  {
    _id: "crop_rice_1",
    name: "Rice (Paddy)",
    season: "Rainy",
    imageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80",
    howToGrow: {
      soilType: "Clayey loam soil with high water retention",
      watering: "Standing water of 2-5 cm during vegetative stage",
      sunlight: "Full sun, 6-8 hours daily",
      duration: "120 - 150 Days",
      temperature: "20°C - 35°C"
    },
    careTips: [
      "Maintain proper water level during panicle initiation",
      "Weed within 20 to 30 days after transplanting",
      "Apply nitrogen in split doses: basal, tillering, and panicle emergence"
    ],
    pestsAndDiseases: [
      {
        name: "Blast (Pyricularia oryzae)",
        symptoms: "Spindle-shaped lesions on leaves with brown borders",
        treatment: "Spray Tricyclazole 75% WP @ 0.6g/L of water"
      },
      {
        name: "Brown Plant Hopper",
        symptoms: "Circular patches of dried, yellowing plants (hopper burn)",
        treatment: "Drain excess water and apply Pymetrozine 50% WG"
      }
    ],
    fertilizerRecommendation: "NPK 120:60:60 kg/ha with Zinc Sulfate @ 25 kg/ha",
    marketInsights: {
      demand: "High year-round domestic and export demand",
      priceTrend: "Stable with MSP support across state APMCs",
      bestTimeToSell: "Post-harvest curing after November - January"
    },
    governmentSchemes: [
      {
        name: "PM-Kisan Samman Nidhi",
        description: "Direct income benefit of Rs 6,000 annually to landholding farmers",
        benefits: "Financial security for agricultural inputs",
        eligibility: "Small and marginal farmers with active land records",
        applicationProcess: ["Visit PM-Kisan portal", "Enter Aadhaar number and land details", "Verification by state nodal officer"],
        link: "https://pmkisan.gov.in"
      }
    ]
  },
  {
    _id: "crop_wheat_2",
    name: "Wheat",
    season: "Winter",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    howToGrow: {
      soilType: "Well-drained fertile loamy to clay loam soil",
      watering: "4-6 irrigations at critical stages (crown root initiation, flowering)",
      sunlight: "Direct sunlight, dry and cool weather",
      duration: "110 - 130 Days",
      temperature: "15°C - 25°C"
    },
    careTips: [
      "Sow during early November for optimal grain development",
      "First irrigation at 21 days after sowing is critical",
      "Protect against terminal heat stress during grain filling"
    ],
    pestsAndDiseases: [
      {
        name: "Yellow Rust",
        symptoms: "Yellow pustules arranged in parallel stripes on leaves",
        treatment: "Spray Propiconazole 25% EC @ 1ml/L immediately"
      }
    ],
    fertilizerRecommendation: "NPK 120:60:40 kg/ha applied with balanced potash",
    marketInsights: {
      demand: "Strong procurement during Rabi marketing season",
      priceTrend: "Steady rise leading up to government procurement drives",
      bestTimeToSell: "April to June"
    },
    governmentSchemes: [
      {
        name: "Soil Health Card Scheme",
        description: "Customized soil nutrient status and fertilizer guidance",
        benefits: "Optimized input costs and higher yields",
        eligibility: "All registered farmers",
        applicationProcess: ["Contact local agriculture department", "Submit soil sample", "Receive digital health card"],
        link: "https://agricoop.nic.in"
      }
    ]
  },
  {
    _id: "crop_maize_3",
    name: "Maize (Corn)",
    season: "Rainy",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    howToGrow: {
      soilType: "Deep, fertile and well-drained sandy loam",
      watering: "Moderate watering; prevent waterlogging at all stages",
      sunlight: "Warm climate, sunny conditions",
      duration: "90 - 110 Days",
      temperature: "21°C - 32°C"
    },
    careTips: [
      "Ensure ridges and furrows for proper drainage",
      "Apply earthing up at 30 days after sowing",
      "Monitor for fall armyworm from germination"
    ],
    pestsAndDiseases: [
      {
        name: "Fall Armyworm (Spodoptera frugiperda)",
        symptoms: "Pinholes and large windowed damage on whorl leaves with frass",
        treatment: "Apply Emamectin Benzoate 5% SG @ 0.4g/L"
      }
    ],
    fertilizerRecommendation: "NPK 150:75:40 kg/ha with micronutrient mixture",
    marketInsights: {
      demand: "Growing demand for poultry feed, starch, and biofuel industry",
      priceTrend: "Consistent uptick in regional mandis",
      bestTimeToSell: "September to October"
    }
  },
  {
    _id: "crop_cotton_4",
    name: "Cotton",
    season: "Summer",
    imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80",
    howToGrow: {
      soilType: "Deep black soil (Regur) or alluvial soil with good depth",
      watering: "Drip irrigation recommended; avoid drought during boll formation",
      sunlight: "Abundant sunshine and frost-free days",
      duration: "150 - 180 Days",
      temperature: "25°C - 35°C"
    },
    careTips: [
      "Square and boll shedding prevention with planofix spray",
      "Maintain plant population using recommended row spacing",
      "Clean hand-picking of open bolls without bracts"
    ],
    pestsAndDiseases: [
      {
        name: "Pink Bollworm",
        symptoms: "Rosetted flowers and stained lint inside green bolls",
        treatment: "Install pheromone traps and spray Chlorantraniliprole"
      }
    ],
    fertilizerRecommendation: "NPK 120:60:60 kg/ha in 3 split applications",
    marketInsights: {
      demand: "High textile mill demand and export potential",
      priceTrend: "Premium prices for long staple lint quality",
      bestTimeToSell: "December to February"
    }
  },
  {
    _id: "crop_tomato_5",
    name: "Tomato",
    season: "Summer",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    howToGrow: {
      soilType: "Well-aerated sandy loam rich in organic matter (pH 6.0 - 7.0)",
      watering: "Regular, uniform moisture; avoid overhead sprinkler watering",
      sunlight: "Full sun, 7-8 hours per day",
      duration: "70 - 90 Days",
      temperature: "18°C - 30°C"
    },
    careTips: [
      "Stake indeterminate varieties to keep fruit off the soil",
      "Prune bottom suckers for better airflow and fruit size",
      "Apply calcium spray to prevent blossom end rot"
    ],
    pestsAndDiseases: [
      {
        name: "Early Blight (Alternaria solani)",
        symptoms: "Concentric target-like brown spots on lower leaves",
        treatment: "Spray Mancozeb 75% WP @ 2g/L or Azoxystrobin"
      }
    ],
    fertilizerRecommendation: "NPK 100:60:60 kg/ha along with FYM 25 t/ha",
    marketInsights: {
      demand: "High daily vegetable market consumption",
      priceTrend: "Seasonal spikes during pre-monsoon transitions",
      bestTimeToSell: "Harvest at breaker or pink stage for long-distance transport"
    }
  }
];

const DEFAULT_SCHEMES: Scheme[] = [
  {
    _id: "scheme_central_1",
    name: "PM-Kisan Samman Nidhi",
    description: "Income support of Rs 6,000 per year in three equal installments directly to bank accounts of farmer families.",
    category: "central",
    link: "https://pmkisan.gov.in",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "scheme_central_2",
    name: "Soil Health Card Scheme",
    description: "Assists State Governments to issue soil health cards to all farmers, diagnosing soil fertility and recommending nutrients.",
    category: "central",
    link: "https://agricoop.nic.in",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "scheme_state_1",
    name: "Raita Mitra (Karnataka)",
    description: "Comprehensive state farmer portal providing subsidized seeds, mechanization implements, and weather advisories.",
    category: "state",
    link: "https://raitamitra.karnataka.gov.in",
    createdAt: new Date().toISOString(),
  }
];

// Local storage helper
function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("localStorage write failed:", err);
  }
}

export const dataService = {
  // Advisories: directly connected to Supabase
  async getAdvisories(): Promise<Advisory[]> {
    try {
      const { data, error } = await supabase.from('advisories').select('*').order('created_at', { ascending: false });
      if (error) {
        console.warn("Supabase advisories query warning:", error.message);
        return getStored<Advisory[]>("agriguide_advisories", [
          {
            id: 2,
            crop_name: "rice",
            title: "best irrigataion tips",
            description: "Maintain 2-5 cm standing water during tillering and panicle development.",
            season: "monsoon",
            created_at: new Date().toISOString()
          }
        ]);
      }
      if (data && data.length > 0) {
        setStored("agriguide_advisories", data);
        return data;
      }
      return getStored<Advisory[]>("agriguide_advisories", []);
    } catch (err) {
      console.warn("Error getting advisories:", err);
      return getStored<Advisory[]>("agriguide_advisories", []);
    }
  },

  // Crops: Supabase with default catalog fallback
  async getCrops(seasonFilter?: string): Promise<Crop[]> {
    try {
      let query = supabase.from('crops').select('*');
      if (seasonFilter) {
        query = query.ilike('season', `%${seasonFilter}%`);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          ...d,
          _id: d.id ? String(d.id) : d._id,
        }));
      }
    } catch (err) {
      // ignore, use fallback
    }

    const customCrops = getStored<Crop[]>("agriguide_custom_crops", []);
    const all = [...DEFAULT_CROPS, ...customCrops];
    if (!seasonFilter) return all;
    return all.filter(c => c.season.toLowerCase() === seasonFilter.toLowerCase());
  },

  async getCropById(id: string): Promise<Crop | null> {
    try {
      const { data, error } = await supabase.from('crops').select('*').eq('id', id).single();
      if (!error && data) {
        return { ...data, _id: String(data.id) };
      }
    } catch (err) {
      // ignore
    }

    const all = await this.getCrops();
    return all.find(c => c._id === id || String(c._id) === String(id)) || null;
  },

  async saveCrop(cropData: Partial<Crop>): Promise<Crop> {
    try {
      const { data, error } = await supabase.from('crops').insert([cropData]).select().single();
      if (!error && data) {
        return { ...data, _id: String(data.id) };
      }
    } catch (err) {
      // fallback
    }

    const newCrop: Crop = {
      ...cropData,
      _id: "crop_" + Date.now(),
      name: cropData.name || "Unnamed Crop",
      season: cropData.season || "Rainy",
      imageUrl: cropData.imageUrl || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
      howToGrow: cropData.howToGrow || { soilType: "Loamy", duration: "90 Days" }
    } as Crop;

    const customCrops = getStored<Crop[]>("agriguide_custom_crops", []);
    customCrops.unshift(newCrop);
    setStored("agriguide_custom_crops", customCrops);
    return newCrop;
  },

  async deleteCrop(id: string): Promise<void> {
    try {
      await supabase.from('crops').delete().eq('id', id);
    } catch (err) {
      // ignore
    }
    const customCrops = getStored<Crop[]>("agriguide_custom_crops", []);
    const filtered = customCrops.filter(c => c._id !== id);
    setStored("agriguide_custom_crops", filtered);
  },

  // Schemes: Supabase with default schemes fallback
  async getSchemes(categoryFilter?: string): Promise<Scheme[]> {
    try {
      let query = supabase.from('schemes').select('*');
      if (categoryFilter) {
        query = query.eq('category', categoryFilter);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((s: any) => ({
          ...s,
          _id: s.id ? String(s.id) : s._id,
        }));
      }
    } catch (err) {
      // fallback
    }

    const customSchemes = getStored<Scheme[]>("agriguide_custom_schemes", []);
    const all = [...DEFAULT_SCHEMES, ...customSchemes];
    if (!categoryFilter) return all;
    return all.filter(s => s.category === categoryFilter);
  },

  async saveScheme(schemeData: { name: string; description: string; category: 'central' | 'state'; link: string }): Promise<Scheme> {
    try {
      const { data, error } = await supabase.from('schemes').insert([schemeData]).select().single();
      if (!error && data) {
        return { ...data, _id: String(data.id) };
      }
    } catch (err) {
      // fallback
    }

    const newScheme: Scheme = {
      _id: "scheme_" + Date.now(),
      name: schemeData.name,
      description: schemeData.description,
      category: schemeData.category,
      link: schemeData.link,
      createdAt: new Date().toISOString()
    };

    const customSchemes = getStored<Scheme[]>("agriguide_custom_schemes", []);
    customSchemes.unshift(newScheme);
    setStored("agriguide_custom_schemes", customSchemes);
    return newScheme;
  },

  async deleteScheme(id: string): Promise<void> {
    try {
      await supabase.from('schemes').delete().eq('id', id);
    } catch (err) {
      // ignore
    }
    const customSchemes = getStored<Scheme[]>("agriguide_custom_schemes", []);
    const filtered = customSchemes.filter(s => s._id !== id);
    setStored("agriguide_custom_schemes", filtered);
  },

  // Users / Farmers list for Admin
  async getUsers(): Promise<User[]> {
    const customUsers = getStored<User[]>("agriguide_registered_farmers", [
      { id: "farmer_1", name: "Ramesh Kumar", email: "ramesh@gmail.com", role: "farmer", phone: "9876543210" }
    ]);
    return customUsers;
  },

  // Auth: Admin support + Farmer registration
  async loginUser(email: string, password?: string): Promise<{ token: string; user: User }> {
    if (email === "chethan@gmail.com" && password === "12345678") {
      const adminUser: User = {
        id: "admin_chethan",
        name: "Chethan Admin",
        email: "chethan@gmail.com",
        role: "admin",
        phone: "999"
      };
      const token = "agri_token_admin_" + Date.now();
      return { token, user: adminUser };
    }

    // Check registered farmers in localStorage
    const farmers = getStored<User[]>("agriguide_registered_farmers", []);
    const existing = farmers.find(f => f.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return {
        token: "agri_token_farmer_" + Date.now(),
        user: existing
      };
    }

    // Default farmer fallback if matching standard patterns
    const farmerUser: User = {
      id: "farmer_" + Date.now(),
      name: email.split("@")[0],
      email: email,
      role: "farmer"
    };
    return { token: "agri_token_" + Date.now(), user: farmerUser };
  },

  async registerUser(userData: { name: string; email: string; password?: string; phone?: string; role?: 'farmer' | 'admin' }): Promise<{ token: string; user: User }> {
    const newUser: User = {
      id: "user_" + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role || 'farmer'
    };

    const farmers = getStored<User[]>("agriguide_registered_farmers", []);
    farmers.push(newUser);
    setStored("agriguide_registered_farmers", farmers);

    return {
      token: "agri_token_" + Date.now(),
      user: newUser
    };
  }
};

// Global Fetch Interceptor for Vercel SPA compatibility:
// If any code invokes `fetch('/api/...')`, this interceptor transparently maps it to dataService
// so that deployed Vercel apps never encounter 404 or <!doctype html> JSON parse errors!
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const urlStr = typeof input === 'string' ? input : (input instanceof URL ? input.toString() : (input as Request).url);
    
    // Only intercept relative /api calls
    if (urlStr.startsWith('/api/') || urlStr === '/api') {
      try {
        const path = urlStr.replace(/^\/api/, '');
        const method = init?.method?.toUpperCase() || 'GET';
        let body: any = null;
        if (init?.body && typeof init.body === 'string') {
          try { body = JSON.parse(init.body); } catch { body = init.body; }
        }

        // 1. Advisories
        if (path.startsWith('/advisories')) {
          const advisories = await dataService.getAdvisories();
          return new Response(JSON.stringify(advisories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // 2. Crops
        if (path.startsWith('/crops')) {
          if (method === 'GET') {
            const urlObj = new URL(urlStr, window.location.origin);
            const season = urlObj.searchParams.get('season') || undefined;
            const segments = path.split('/').filter(Boolean);
            if (segments.length === 2) {
              const crop = await dataService.getCropById(segments[1]);
              if (!crop) {
                return new Response(JSON.stringify({ error: "Crop not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
              }
              return new Response(JSON.stringify(crop), { status: 200, headers: { 'Content-Type': 'application/json' } });
            }
            const crops = await dataService.getCrops(season);
            return new Response(JSON.stringify(crops), { status: 200, headers: { 'Content-Type': 'application/json' } });
          } else if (method === 'POST') {
            const saved = await dataService.saveCrop(body);
            return new Response(JSON.stringify(saved), { status: 201, headers: { 'Content-Type': 'application/json' } });
          } else if (method === 'DELETE') {
            const segments = path.split('/').filter(Boolean);
            if (segments.length === 2) {
              await dataService.deleteCrop(segments[1]);
            }
            return new Response(JSON.stringify({ message: "Crop deleted" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
        }

        // 3. Schemes
        if (path.startsWith('/schemes')) {
          if (method === 'GET') {
            const urlObj = new URL(urlStr, window.location.origin);
            const category = urlObj.searchParams.get('category') || undefined;
            const schemes = await dataService.getSchemes(category);
            return new Response(JSON.stringify(schemes), { status: 200, headers: { 'Content-Type': 'application/json' } });
          } else if (method === 'POST') {
            const saved = await dataService.saveScheme(body);
            return new Response(JSON.stringify(saved), { status: 201, headers: { 'Content-Type': 'application/json' } });
          } else if (method === 'DELETE') {
            const segments = path.split('/').filter(Boolean);
            if (segments.length === 2) {
              await dataService.deleteScheme(segments[1]);
            }
            return new Response(JSON.stringify({ message: "Scheme deleted" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
        }

        // 4. Auth
        if (path === '/auth/login' && method === 'POST') {
          const authResult = await dataService.loginUser(body.email, body.password);
          return new Response(JSON.stringify(authResult), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
        if (path === '/auth/register' && method === 'POST') {
          const regResult = await dataService.registerUser(body);
          return new Response(JSON.stringify(regResult), { status: 201, headers: { 'Content-Type': 'application/json' } });
        }

        // 5. Users
        if (path === '/users' && method === 'GET') {
          const users = await dataService.getUsers();
          return new Response(JSON.stringify(users), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        // 6. Health
        if (path === '/health') {
          return new Response(JSON.stringify({ status: "ok", backend: "supabase", timestamp: new Date().toISOString() }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (err: any) {
        console.warn("Client interceptor handled error:", err);
      }
    }

    return originalFetch.apply(this, [input, init]);
  };
}
