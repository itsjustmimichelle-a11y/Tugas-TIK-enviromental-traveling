import { TravelItem, RouteComparison } from '../types';

export const TRAVEL_ITEMS: TravelItem[] = [
  {
    id: 'pkg-alpine-express',
    type: 'package',
    title: 'Swiss Glacier & Pine Canopy Scenic Rail Holiday',
    destination: 'Zermatt & Engadin Valley',
    origin: 'Zurich Central',
    country: 'Switzerland',
    region: 'Central Alps',
    vibe: 'alpine',
    duration: '4 Days 3 Nights',
    price: 480,
    rating: 4.95,
    reviewCount: 342,
    carbonEmissionKg: 8.4,
    flightComparisonKg: 195.0,
    carbonSavedKg: 186.6,
    greenScore: 98,
    energySource: '100% Swiss Hydro-electric Grid',
    certifications: ['Swisstainable Leading', 'Green Key Certified', 'Zero Carbon Rail'],
    image: '/src/assets/images/hero_scenic_green_train_1793599879366.jpg',
    description: 'Traverse the breathtaking Swiss Alps aboard panoramic electric trains powered by pristine glacier runoff hydro-turbines. Includes stay at certified timber mountain lodges, guided wildflower meadow hikes, and farm-to-table alpine breakfast.',
    highlights: [
      'Glacier Express panoramic electric coach reservation with zero tailpipe emissions',
      'Solar-heated mountain chalet with organic locally sourced meals',
      'Complimentary regional Swiss e-bike pass for car-free valley exploration',
      'Guided alpine biodiversity tour with a certified local conservationist'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Zurich to Zermatt via Alpine Hydro Rail',
        desc: 'Board the scenic double-deck electric express train running along Lake Thun with zero emissions. Check in at the certified bio-chalet with Matterhorn vistas.',
        transportMode: 'Electric High-Speed Rail'
      },
      {
        day: 'Day 2',
        title: 'Gornergrat Solar Cogwheel & Glacier Walk',
        desc: 'Ascend to 3,089m on the world’s first fully electrified cogwheel railway. Mindful glacial moraine trail walking and picnic with artisanal cheeses.',
        transportMode: 'Regenerative Braking Cogwheel'
      },
      {
        day: 'Day 3',
        title: 'Forest Canopy E-Biking & Bio-Farm Tasting',
        desc: 'Glide through pine forests on supplied e-bikes to a family-run heritage diary. Learn about traditional seasonal pasture preservation.',
        transportMode: 'E-Bikes'
      },
      {
        day: 'Day 4',
        title: 'Engadin Panorama Descent & Farewell',
        desc: 'Scenic descent over historic stone viaducts through the Albula UNESCO railway line, arriving back in Zurich.',
        transportMode: 'Electric InterCity'
      }
    ],
    included: [
      'All electric train tickets & seat reservations',
      '3 nights stay at EarthCheck bio-chalet',
      'Daily organic plant-forward breakfast & 2 farm dinners',
      'Swiss E-bike 4-day pass',
      'Carbon offset certificate planting 4 alpine larches'
    ],
    sustainabilityFeatures: [
      'Zero single-use plastics across all coaches and lodgings',
      'Regenerative braking feeds power back into the Swiss grid on downhills',
      '94% of ingredients sourced within a 35km radius',
      'Passive-solar chalet heating and rainwater harvesting'
    ],
    localCommunityImpact: '12% of total booking tariff directly funds alpine wildlife corridors and heritage stone wall restoration in the Graubünden canton.'
  },
  {
    id: 'pkg-tropical-permaculture',
    type: 'package',
    title: 'Bali Rainforest Canopy & Coral Sanctuary Retreat',
    destination: 'Munduk & West Bali National Park',
    origin: 'Denpasar / Sanur',
    country: 'Indonesia',
    region: 'Southeast Asia',
    vibe: 'forest',
    duration: '5 Days 4 Nights',
    price: 360,
    rating: 4.92,
    reviewCount: 289,
    carbonEmissionKg: 12.0,
    flightComparisonKg: 160.0,
    carbonSavedKg: 148.0,
    greenScore: 97,
    energySource: 'Micro-Hydro & Rooftop Solar Array',
    certifications: ['EarthCheck Platinum', 'ASEAN Green Hotel', 'Zero Waste to Landfill'],
    image: '/src/assets/images/destination_eco_lodge_1793599879982.jpg',
    description: 'An immersive low-impact escape deep within misty mountain coffee forests and pristine marine sanctuaries. Stay in hand-built architectural bamboo lodges with biological chlorine-free freshwater pools and solar energy.',
    highlights: [
      'Architectural bamboo forest lodge with natural spring-water pool',
      'Electric shuttle transfers across the scenic mountain passes',
      'Permaculture masterclass and organic garden foraging lunch',
      'Snorkel expedition supporting local community coral reef restoration'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'EV Transfer from Coast to Cloud Forest',
        desc: 'Private clean electric MPV pickup through scenic rice terraces to Munduk bamboo lodge. Sunset herbal tea ceremony.',
        transportMode: 'Electric MPV Shuttle'
      },
      {
        day: 'Day 2',
        title: 'Waterfalls & Sacred Lake Canoe',
        desc: 'Guided hike through protected forest reserves to hidden twin waterfalls. Non-motorized wooden canoe crossing on Lake Tamblingan.',
        transportMode: 'Trek & Wooden Canoe'
      },
      {
        day: 'Day 3',
        title: 'Permaculture Gardening & Traditional Cooking',
        desc: 'Harvest heirloom vegetables, turmeric, and vanilla pods from the on-site regenerative farm, followed by a communal slow-food feast.',
        transportMode: 'Walking'
      },
      {
        day: 'Day 4',
        title: 'Menjangan Island Solar-Assisted Catamaran',
        desc: 'Scenic drive to the north coast, boarding an electric-outboard catamaran for gentle reef snorkeling along restored coral gardens.',
        transportMode: 'Solar Electric Catamaran'
      },
      {
        day: 'Day 5',
        title: 'Morning Forest Meditation & Return',
        desc: 'Awake to bird song, sound meditation in the bamboo yoga shala, and smooth electric return transit.',
        transportMode: 'Electric MPV Shuttle'
      }
    ],
    included: [
      '4 nights in private bamboo pavilion lodge',
      'All farm-to-table organic meals (breakfast, lunch, dinner)',
      'Clean EV overland transfers and ferry crossings',
      'National park conservation permits',
      'Planting of 5 native mangrove seedlings in Pemuteran bay'
    ],
    sustainabilityFeatures: [
      'Zero synthetic fertilizers or chemicals on grounds',
      'Reed-bed biological greywater filtration system',
      '100% staff hired from neighboring traditional villages',
      'On-site compost turns 100% of organic waste into rich soil'
    ],
    localCommunityImpact: 'Every trip sponsors one year of primary environmental education for local schoolchildren in Munduk village.'
  },
  {
    id: 'trn-scenic-fjords',
    type: 'ferry',
    title: 'Norwegian Silent Fjord Electric Catamaran',
    destination: 'Flåm & Nærøyfjord',
    origin: 'Bergen Harbor',
    country: 'Norway',
    region: 'Western Fjords',
    vibe: 'coastal',
    duration: 'Full Day Scenic Cruise (6h 30m)',
    price: 115,
    rating: 4.98,
    reviewCount: 512,
    carbonEmissionKg: 2.1,
    flightComparisonKg: 85.0,
    carbonSavedKg: 82.9,
    greenScore: 99,
    energySource: '100% Zero-Emission Shore Hydro Battery',
    certifications: ['Norwegian Eco-Lighthouse', 'UNESCO Heritage Vessel', 'Zero Carbon Maritime'],
    image: '/src/assets/images/transport_solar_ferry_1793599879975.jpg',
    description: 'Glide in absolute near-silent electric tranquility beneath soaring 1,200m fjord rock faces and roaring waterfalls. Featuring expansive panoramic glass decks, whisper-quiet electric propulsion, and locally made berry ciders.',
    highlights: [
      'Zero tailpipe emissions and zero underwater noise pollution',
      'Unobstructed 360-degree views of UNESCO Nærøyfjord',
      'Onboard cafe featuring fjord-farm goat cheeses and organic pastries',
      'Interactive hydrophone listening to marine wildlife without propeller disturbance'
    ],
    itinerary: [
      {
        day: '08:00',
        title: 'Departure from Bergen Strandkaiterminal',
        desc: 'Quiet cast-off powered by dual 450 kWh marine lithium batteries charged via Norwegian waterfall hydropower.',
        transportMode: 'Electric Ferry'
      },
      {
        day: '11:15',
        title: 'Nærøyfjord UNESCO Narrow Passage',
        desc: 'Entering the narrowest fjord passage in Europe. Electric motors run at 10 knots in total silence, disturbing no nesting sea eagles.',
        transportMode: 'Electric Ferry'
      },
      {
        day: '14:30',
        title: 'Flåm Arrival & Return Link',
        desc: 'Docking in Flåm. Direct seamless connection to the Flåm Electric Mountain Railway.',
        transportMode: 'Electric Train Transfer'
      }
    ],
    included: [
      'Scenic electric catamaran journey with reserved panoramic seat',
      'Audio guide in 6 languages highlighting geological preservation',
      'Complimentary organic warm tea or apple cider',
      'Free high-speed WiFi and quiet reading lounge access'
    ],
    sustainabilityFeatures: [
      'Hull constructed from lightweight recyclable carbon fiber',
      'Shore power rapid chargers utilize 100% Norwegian hydro grid',
      'Zero oily bilge water discharge into fragile fjord ecosystems'
    ],
    localCommunityImpact: 'Contributes 5% of ticket sales to the Western Norway Heritage Fjords conservation foundation.'
  },
  {
    id: 'sty-alpine-meadow',
    type: 'stay',
    title: 'Silvretta Passive Eco-Chalet & Wildflower Meadow',
    destination: 'Galtür, Tyrol',
    origin: 'Innsbruck / Landeck Train Hub',
    country: 'Austria',
    region: 'Tyrolean Alps',
    vibe: 'alpine',
    duration: 'Per Night (Min 2 Nights)',
    price: 145,
    rating: 4.89,
    reviewCount: 178,
    carbonEmissionKg: 3.2,
    flightComparisonKg: 65.0,
    carbonSavedKg: 61.8,
    greenScore: 96,
    energySource: 'Integrated Solar Roof Tiles & Geothermal Ground Loop',
    certifications: ['Austrian Ecolabel', 'Passive House Institute A+', 'Bio Hotels Certified'],
    image: '/src/assets/images/destination_alpine_retreat_1793599881355.jpg',
    description: 'An architectural sanctuary built from local untreated Tyrolean larch and rammed earth. Nestled in alpine wildflower meadows with sweeping glacier views, wood-fired natural cedar saunas, and complimentary guest regional rail passes.',
    highlights: [
      'Net-positive energy building producing more clean electricity than it consumes',
      'Organic Tyrolean herb garden and sourdough bakery on site',
      'Natural cedar wood sauna heated by certified sustainably harvested fallen timber',
      'Direct doorstep access to high-altitude car-free hiking trails'
    ],
    included: [
      'Ensuite larch wood chalet room with private panoramic sundeck',
      'Daily 100% organic Tyrolean farm breakfast buffet',
      'Free regional mountain bus and cable car pass',
      'Use of e-mountain bikes and Nordic walking poles'
    ],
    sustainabilityFeatures: [
      'Triple-glazed argon windows with thermal insulation index Uw 0.65',
      'Pellet heating using waste sawdust from local family sawmills',
      '100% organic cotton linens laundered with eco-certified biodegradable detergents'
    ],
    localCommunityImpact: 'Supports 6 generational mountain micro-farms with guaranteed fair-trade procurement for dairy and grain.'
  },
  {
    id: 'pkg-tea-hills-ebike',
    type: 'package',
    title: 'Ceylon High-Plateau Rail & Organic Tea Estate Journey',
    destination: 'Kandy, Nuwara Eliya & Ella',
    origin: 'Colombo Fort Station',
    country: 'Sri Lanka',
    region: 'Central Highlands',
    vibe: 'wellness',
    duration: '4 Days 3 Nights',
    price: 240,
    rating: 4.93,
    reviewCount: 215,
    carbonEmissionKg: 9.8,
    flightComparisonKg: 145.0,
    carbonSavedKg: 135.2,
    greenScore: 95,
    energySource: 'Hydro Grid & Biomass Solar',
    certifications: ['Rainforest Alliance Verified', 'Fair Trade Certified', 'Slow Travel Partner'],
    image: '/src/assets/images/activity_organic_farm_walk_1793599881863.jpg',
    description: 'Glide on vintage diesel-electric hill country trains winding through misty emerald tea plantations, followed by guided e-bike rides and stays at restored solar-powered colonial tea planters’ cottages that champion women tea-harvester co-operatives.',
    highlights: [
      'Scenic Ella blue train journey through world-famous Nine Arches Bridge',
      'Guided e-bike trail ride through organic biodynamic tea estates',
      'Artisanal tea cupping and regenerative soil workshop',
      'Vegetarian Ayurvedic cooking masterclass with village matriarch'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Colombo to Kandy Scenic Mountain Rail',
        desc: 'Board the morning scenic train ascending through tropical foothills. Arrive in the cultural capital and transfer to an eco-estate.',
        transportMode: 'Hill Railway'
      },
      {
        day: 'Day 2',
        title: 'E-Biking Highland Tea Valleys',
        desc: 'Cycle with lightweight e-bikes through misty highland plantations with minimal physical strain. Visit a women-owned biodynamic tea co-op.',
        transportMode: 'E-Bicycle'
      },
      {
        day: 'Day 3',
        title: 'Nine Arches Rail Walk & Cloud Forest',
        desc: 'Early morning mindful forest walk along historic stone arches. Evening Ayurvedic herbal oil treatment and meditation.',
        transportMode: 'Trek'
      },
      {
        day: 'Day 4',
        title: 'Slow Breakfast & Low-Carbon Departure',
        desc: 'Traditional hoppers breakfast with fresh coconut sambal, scenic return train ride toward the southern coast.',
        transportMode: 'Highland Rail'
      }
    ],
    included: [
      '3 nights accommodation in solar-powered heritage estate',
      'All first-class scenic train tickets',
      'High-grade electric bicycles with helmets & panniers',
      'Ayurvedic wellness consultation and organic meals',
      'Tree-planting certificate in the Sinharaja rainforest buffer'
    ],
    sustainabilityFeatures: [
      'Zero single-use packaging throughout the tour',
      'All tour guides certified local community naturalists',
      'Fair-wage commitment paying 35% above regional baseline'
    ],
    localCommunityImpact: 'Directly funds safe drinking water filtration systems for tea-picking worker families in the Nuwara Eliya district.'
  },
  {
    id: 'trn-kyoto-kanazawa',
    type: 'train',
    title: 'Thunderbird & Hokuriku Shinkansen Green Corridor',
    destination: 'Kanazawa & Noto Peninsula Gateway',
    origin: 'Kyoto Station',
    country: 'Japan',
    region: 'Hokuriku',
    vibe: 'cultural',
    duration: '2h 10m Express Rail',
    price: 68,
    rating: 4.96,
    reviewCount: 420,
    carbonEmissionKg: 1.8,
    flightComparisonKg: 72.0,
    carbonSavedKg: 70.2,
    greenScore: 99,
    energySource: '100% Renewable Rail Grid (JR West Eco Program)',
    certifications: ['ISO 14001 Environmental Standard', 'Eco-Rail Japan Verified', 'Low-Noise Shinkansen'],
    image: '/src/assets/images/hero_scenic_green_train_1793599879366.jpg',
    description: 'Travel effortlessly between Japan’s historic cultural capital and the artistic coastal town of Kanazawa. Operating on ultra-efficient aerodynamic bullet trains with regenerative braking and zero direct greenhouse gas emissions.',
    highlights: [
      '97% lower carbon footprint compared to domestic commuter flights',
      'Spacious quiet seating with AC charging points and luggage stowage',
      'Seamless digital QR boarding with no paper tickets required',
      'Smooth 260 km/h cruising through scenic Lake Biwa and snow-peaked mountains'
    ],
    included: [
      'Reserved Green Car or Ordinary seat with digital ticket pass',
      'Zero cancellation fee up to 24 hours prior to departure',
      'Complimentary bilingual digital guide to Kanazawa artisan crafts'
    ],
    sustainabilityFeatures: [
      'Aerodynamic nose design eliminates tunnel micro-pressure wave noise',
      'LED lighting and lightweight aluminum alloy carriage construction',
      'Braking regenerates electricity straight back into overhead catenary wires'
    ],
    localCommunityImpact: 'Supports preservation of traditional Kanazawa gold leaf and Kutani porcelain artisanal workshops.'
  },
  {
    id: 'pkg-black-forest-nomad',
    type: 'package',
    title: 'Black Forest Zero-Carbon Slow Living & Sauna Retreat',
    destination: 'Titisee & Feldberg Natural Park',
    origin: 'Freiburg Central Station',
    country: 'Germany',
    region: 'Baden-Württemberg',
    vibe: 'wellness',
    duration: '3 Days 2 Nights',
    price: 195,
    rating: 4.88,
    reviewCount: 164,
    carbonEmissionKg: 5.6,
    flightComparisonKg: 120.0,
    carbonSavedKg: 114.4,
    greenScore: 96,
    energySource: 'Community Wind & District Wood-Chip Heating',
    certifications: ['Freiburg Green City Partner', 'EMAS Eco-Management', 'Slow City Certified'],
    image: '/src/assets/images/destination_alpine_retreat_1793599881355.jpg',
    description: 'A budget-conscious restorative retreat to the heart of the Black Forest. Arrive via Freiburg’s 100% green-powered regional train, stay in an eco-certified timber guesthouse, and hike ancient mossy trails with zero carbon footprint.',
    highlights: [
      'Includes KONUS card offering unlimited free regional train & bus travel',
      'Traditional natural spruce forest Finnish sauna and cold plunge brook',
      'Organic rye bread and local forest honey breakfast included',
      'Mindful forest bathing (Shinrin-yoku) trail map with meditation viewpoints'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Höllentalbahn Scenic Gorge Rail',
        desc: 'Board Germany’s steepest mainline railway ascending the Dramatic Hell Valley Gorge using renewable electricity. Settle into the timber lodge.',
        transportMode: 'Electric Regional Rail'
      },
      {
        day: 'Day 2',
        title: 'Feldberg Glacier Trail & Lake Canoe',
        desc: 'Scenic bus ride (included) to Feldberg peak for panoramic views stretching to the French Vosges mountains. Afternoon paddle on Lake Titisee.',
        transportMode: 'Clean Bus & Walking'
      },
      {
        day: 'Day 3',
        title: 'Eco-Bakery Visit & Freiburg Return',
        desc: 'Morning wood-fired sourdough baking demonstration before returning to Freiburg or connecting onwards to Zurich.',
        transportMode: 'Electric Regional Rail'
      }
    ],
    included: [
      '2 nights stay in certified eco-guesthouse',
      'Daily organic bio-breakfast',
      'KONUS transit card for unlimited regional trains & buses',
      'Forest sauna access each evening'
    ],
    sustainabilityFeatures: [
      'Zero fossil fuels used for building heating or hot water',
      'Compostable amenities and zero single-use plastics',
      'Rainwater greywater recycling for garden cultivation'
    ],
    localCommunityImpact: '10% of revenue supports replanting native beech and fir trees damaged by extreme weather.'
  },
  {
    id: 'sty-lombok-solar-sanctuary',
    type: 'stay',
    title: 'Tanjung Aan Ocean Eco-Villas & Turtle Sanctuary',
    destination: 'South Lombok Coast',
    origin: 'Kuta Lombok / Lembar Port',
    country: 'Indonesia',
    region: 'Lesser Sunda',
    vibe: 'coastal',
    duration: 'Per Night (Min 2 Nights)',
    price: 110,
    rating: 4.91,
    reviewCount: 153,
    carbonEmissionKg: 3.8,
    flightComparisonKg: 78.0,
    carbonSavedKg: 74.2,
    greenScore: 97,
    energySource: '100% Off-Grid Solar & Battery Storage',
    certifications: ['B-Corp Certified Travel', 'Coral Triangle Initiative Partner', 'Zero Waste'],
    image: '/src/assets/images/destination_eco_lodge_1793599879982.jpg',
    description: 'Perched over a protected turquoise bay with white sand beaches, these sustainable villas are crafted from recycled reclaimed teak and bamboo. Powered entirely by rooftop solar batteries with on-site sea turtle nursery.',
    highlights: [
      'Direct beach access to protected coral lagoon with wild sea turtles',
      '100% solar powered with zero diesel generator noise',
      'Farm-to-table seaside restaurant serving caught-that-day line-fished seafood & vegan curries',
      'Complimentary bamboo surfboards and standup paddle boards'
    ],
    included: [
      'Private ocean-view bamboo villa suite with open-air garden shower',
      'Daily tropical organic breakfast bowl with fresh dragonfruit & coconut kefir',
      'Turtle conservation hatchling release experience (seasonal)',
      'Free shared EV shuttle into town twice daily'
    ],
    sustainabilityFeatures: [
      'Desalination unit powered by solar panels producing zero-waste drinking water',
      'Natural bioclimatic cross-ventilation minimizing need for AC',
      'No single-use plastic permitted on property'
    ],
    localCommunityImpact: 'Employs 100% local Sasak community members with living wages and health coverage for extended families.'
  }
];

export const ROUTE_COMPARISONS: RouteComparison[] = [
  {
    route: 'Zurich to Amsterdam',
    from: 'Zurich, Switzerland',
    to: 'Amsterdam, Netherlands',
    distanceKm: 810,
    options: [
      {
        mode: 'electric_train',
        name: 'Nightjet Sleeper / ICE Electric Rail',
        co2Kg: 8.5,
        durationHours: '8h 20m (Overnight sleep)',
        typicalCostUsd: 89,
        comfortScore: 9.4,
        ecoAdvantage: '94% less carbon than flying. Wake up refreshed right in city center without airport transfers.'
      },
      {
        mode: 'flight',
        name: 'Commercial Airline Flight',
        co2Kg: 146.0,
        durationHours: '1h 35m + 3h airport hassle',
        typicalCostUsd: 135,
        comfortScore: 6.2,
        ecoAdvantage: 'High altitude jet fuel burns release severe NOx and heat-trapping contrails.'
      },
      {
        mode: 'ev_car',
        name: 'Shared EV Overland Route',
        co2Kg: 24.2,
        durationHours: '9h 15m (with clean supercharging)',
        typicalCostUsd: 110,
        comfortScore: 7.8,
        ecoAdvantage: 'Zero tailpipe emissions when using green grid charging stations along German Autobahn.'
      }
    ]
  },
  {
    route: 'Tokyo to Kyoto',
    from: 'Tokyo Station',
    to: 'Kyoto Station',
    distanceKm: 513,
    options: [
      {
        mode: 'electric_train',
        name: 'Tokaido Shinkansen (JR Central Eco)',
        co2Kg: 4.2,
        durationHours: '2h 15m',
        typicalCostUsd: 95,
        comfortScore: 9.8,
        ecoAdvantage: 'Uses 1/12th the energy of air travel per passenger; 99.8% on-time record.'
      },
      {
        mode: 'flight',
        name: 'Haneda to Itami Domestic Flight',
        co2Kg: 68.0,
        durationHours: '1h 10m + 2.5h transit',
        typicalCostUsd: 120,
        comfortScore: 6.5,
        ecoAdvantage: 'Requires two express airport trains on either end, creating high cumulative carbon.'
      }
    ]
  },
  {
    route: 'Bali to Lombok Cross-Island',
    from: 'Padang Bai / Sanur',
    to: 'Bangsal / Senggigi',
    distanceKm: 65,
    options: [
      {
        mode: 'electric_ferry',
        name: 'Hybrid-Electric Solar Catamaran',
        co2Kg: 3.1,
        durationHours: '1h 45m',
        typicalCostUsd: 28,
        comfortScore: 9.2,
        ecoAdvantage: 'Quiet propulsion preserves migration routes for manta rays and spinner dolphins in the Lombok Strait.'
      },
      {
        mode: 'flight',
        name: 'Propeller Short-hop Flight (DPS -> LOP)',
        co2Kg: 52.0,
        durationHours: '35m + 3h airport waiting',
        typicalCostUsd: 75,
        comfortScore: 5.8,
        ecoAdvantage: 'Extremely high takeoff fuel penalty for a mere 65 km hop.'
      }
    ]
  },
  {
    route: 'Paris to Barcelona',
    from: 'Paris Gare de Lyon',
    to: 'Barcelona Sants',
    distanceKm: 1040,
    options: [
      {
        mode: 'electric_train',
        name: 'TGV InOui High-Speed Electric',
        co2Kg: 5.8,
        durationHours: '6h 30m',
        typicalCostUsd: 79,
        comfortScore: 9.1,
        ecoAdvantage: '96% lower CO2 than flying; smooth journey past French Mediterranean lagoons and flamingo reserves.'
      },
      {
        mode: 'flight',
        name: 'Budget Airline Flight (CDG -> BCN)',
        co2Kg: 168.0,
        durationHours: '1h 55m + 3h baggage/transit',
        typicalCostUsd: 110,
        comfortScore: 5.5,
        ecoAdvantage: 'Heavy single-passenger carbon load and high ancillary luggage charges.'
      }
    ]
  }
];

export const ECO_BADGES = [
  {
    id: 'badge-zero-flyer',
    title: 'Zero-Flyer Pioneer',
    desc: 'Booked 2+ low-carbon rail or electric ferry journeys',
    icon: 'Train'
  },
  {
    id: 'badge-carbon-guardian',
    title: 'Carbon Guardian',
    desc: 'Saved over 250 kg of CO2 equivalent',
    icon: 'ShieldCheck'
  },
  {
    id: 'badge-forest-steward',
    title: 'Forest Steward',
    desc: 'Contributed to planting 5+ certified native trees',
    icon: 'TreePine'
  },
  {
    id: 'badge-permaculture-voyager',
    title: 'Slow Life Voyager',
    desc: 'Stayed at a zero-waste certified eco-lodge',
    icon: 'Sparkles'
  }
];
