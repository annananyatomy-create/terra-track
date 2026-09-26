export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number; // 4 points each -> 20 points total for 5 questions
}

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  readTime: string;
  level: string;
  themeColor: string;
  badge: string;
  summary: string;
  brief: string; // User-requested concise brief for each lesson
  sections: {
    title: string;
    content: string;
    keyPoints: string[];
    callout?: string;
  }[];
  interactiveGame: {
    type: 'thermostat' | 'drag-source' | 'hotspot-matcher' | 'clean-grid' | 'circular-economy';
    title: string;
    instructions: string;
  };
  quiz: QuizQuestion[];
}

export interface RewardCoupon {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  minPoints: number;
  discountValue: string;
  validThrough: string;
  partner: string;
}

export const REWARD_COUPONS: RewardCoupon[] = [
  {
    id: 'eco-gear-25',
    code: 'CLIMATE-HERO-25',
    title: '25% Off Sustainable Living & Solar Kit',
    description: 'Redeemable on certified eco-friendly home energy kits, solar chargers, and zero-waste daily gear.',
    category: 'Eco Merchandise & Gear',
    minPoints: 50,
    discountValue: '25% OFF',
    validThrough: 'December 2027',
    partner: 'EcoAction Global Store'
  },
  {
    id: 'tree-cert-75',
    code: 'PLANT-TREE-EARTH',
    title: 'Plant 5 Native Trees in Your Name',
    description: 'An official reforestation certificate with GPS coordinates planted by global conservation partners.',
    category: 'Conservation Direct Action',
    minPoints: 75,
    discountValue: '5 TREES PLANTED',
    validThrough: 'Permanent Carbon Offset',
    partner: 'Green Earth Reforestation Alliance'
  },
  {
    id: 'pro-cert-90',
    code: 'VERDANT-PRO-100',
    title: '100% Free Verified Climate Literacy Certificate',
    description: 'Official digital credential verified by climate education mentors, suitable for LinkedIn and academic resumes.',
    category: 'Academic Credential',
    minPoints: 90,
    discountValue: '100% FREE ($120 Value)',
    validThrough: 'Lifetime Access',
    partner: 'Global Climate Science Institute'
  },
  {
    id: 'bonus-scholarship',
    code: 'EARTH-MASTER-50',
    title: '$50 Educational Scholarship & Climate Grant',
    description: 'Special high-achiever voucher for accredited environmental science courses and student workshops.',
    category: 'Mastery Honor Reward',
    minPoints: 105, // Attained with 80%+ bonus points!
    discountValue: '$50 CREDIT',
    validThrough: 'Valid for 18 Months',
    partner: 'Sustainable Future Endowment'
  }
];

export const LESSONS_DATA: Lesson[] = [
  // 1. Lesson 1: Spike in Global Temperature
  {
    id: 1,
    slug: 'spike-in-global-temperature',
    title: 'Lesson 1: Spike in Global Temperature',
    shortTitle: 'Global Temperature Spike',
    subtitle: 'Tracking sudden thermal anomalies, contributing causes, and planetary energy imbalance.',
    readTime: '8 min read',
    level: 'Foundational',
    themeColor: '#087FCE',
    badge: 'Lesson 01',
    summary: 'A spike in temperature refers to a sudden or unusual rise in the Earth’s or a region’s temperature over a short period. The main causes include global warming, greenhouse gas emissions, deforestation, urbanisation, and increased industrial activity.',
    brief: 'A spike in temperature refers to a sudden or unusual rise in the Earth’s or a region’s temperature over a short period. The main causes include global warming, greenhouse gas emissions, deforestation, urbanisation, and increased industrial activity. Other contributing factors include vehicle emissions, burning of fossil fuels, heat-absorbing concrete surfaces, reduced vegetation, and changes in weather patterns. These temperature spikes can lead to heatwaves, water shortages, crop damage, and health risks, highlighting the need for cleaner energy and sustainable environmental practices.',
    sections: [
      {
        title: '1. Defining Temperature Spikes & Core Mechanisms',
        content: 'A spike in temperature describes an abrupt, abnormal acceleration in thermal averages over short geological or seasonal periods. While natural cycles (such as El Niño Southern Oscillation) cause localized oscillations, human anthropogenic activities have produced an unbroken decade of unprecedented baseline spikes worldwide.',
        keyPoints: [
          'Global average temperatures have surged by +1.2°C to +1.3°C above the pre-industrial benchmark (1850–1900).',
          'Nine of the top ten warmest years in instrumental history have occurred since 2014.',
          'More than 90% of Earth’s surplus thermodynamic energy is absorbed into the world’s oceans, delaying immediate continental frying but storing immense heat energy.'
        ],
        callout: 'Did you know? Even a fractional 0.5°C global increase represents an immense amount of stored energy—equivalent to billions of Hiroshima-sized atomic detonations absorbed into the oceans and atmosphere.'
      },
      {
        title: '2. Major Anthropogenic Drivers & Cascading Impacts',
        content: 'The primary catalysts include fossil fuel combustion for electricity and transport, agricultural methane, and severe deforestation. Concurrently, rapid urbanisation creates Urban Heat Islands (UHI) where dark asphalt and concrete absorb thermal energy, triggering severe heatwaves, water shortages, crop failures, and acute health emergencies.',
        keyPoints: [
          'Industrial and vehicular emissions continuously increase radiative forcing in the troposphere.',
          'Loss of photosynthetic vegetation strips Earth of natural evaporative cooling and carbon sequestration.',
          'Immediate risks include lethal heat stress, drying municipal reservoirs, agricultural crop damage, and ecosystem disruption.'
        ]
      }
    ],
    interactiveGame: {
      type: 'thermostat',
      title: 'Earth Energy Imbalance Thermostat Game',
      instructions: 'Adjust the global atmospheric greenhouse gas concentration slider to see how solar radiation retention and temperature anomaly escalate.'
    },
    quiz: [
      {
        id: 1,
        question: 'What does a "spike in temperature" refer to?',
        options: [
          'A) A regular seasonal winter snowstorm',
          'B) A sudden or unusual rise in the Earth’s or a region’s temperature over a short period',
          'C) Permanent cooling of the lower atmosphere',
          'D) A decrease in solar radiation reaching the equator'
        ],
        correctAnswer: 1,
        explanation: 'A spike in temperature refers to a sudden or unusual rise in the Earth’s or a region’s temperature over a short period, driven by greenhouse gases, urbanisation, and fossil emissions.',
        points: 4
      },
      {
        id: 2,
        question: 'Which of the following are primary causes of sudden temperature spikes?',
        options: [
          'A) Global warming, greenhouse gas emissions, deforestation, and industrial activity',
          'B) Planting too many native trees in river valleys',
          'C) Using solar panels and wind turbines exclusively',
          'D) The natural orbit of the Moon around Earth'
        ],
        correctAnswer: 0,
        explanation: 'The primary causes include global warming, greenhouse gas emissions, deforestation, urbanisation, and increased industrial activity.',
        points: 4
      },
      {
        id: 3,
        question: 'How do heat-absorbing concrete surfaces and reduced vegetation contribute to temperature spikes in cities?',
        options: [
          'A) They cool cities down by 10 degrees at night',
          'B) They absorb solar heat during the day and re-radiate it, causing Urban Heat Islands',
          'C) They cause spontaneous snowfall',
          'D) They stop carbon dioxide from entering the atmosphere'
        ],
        correctAnswer: 1,
        explanation: 'Concrete, asphalt, and reduced greenery trap solar radiation and re-radiate thermal energy, creating intense heat islands and amplifying local temperature spikes.',
        points: 4
      },
      {
        id: 4,
        question: 'What are direct dangerous consequences of severe temperature spikes?',
        options: [
          'A) More freshwater in all desert lakes',
          'B) Heatwaves, water shortages, crop damage, and human health risks',
          'C) Immediate drop in global sea levels',
          'D) Instant replenishment of alpine glaciers'
        ],
        correctAnswer: 1,
        explanation: 'Temperature spikes trigger extreme heatwaves, dry out water reservoirs, destroy agricultural yields, and pose severe cardiovascular and heatstroke risks.',
        points: 4
      },
      {
        id: 5,
        question: 'Where is more than 90% of Earth’s planetary surplus heat currently being absorbed?',
        options: [
          'A) In outer desert sand dunes only',
          'B) In the world’s oceans',
          'C) Inside deep underground subway tunnels',
          'D) In the upper stratosphere'
        ],
        correctAnswer: 1,
        explanation: 'The oceans absorb more than 90% of the planetary excess heat energy, preventing immediate atmospheric spikes but driving marine heatwaves and sea level rise.',
        points: 4
      }
    ]
  },

  // 2. Lesson 2: Change in Weather Patterns Due to Rising Global Temperatures
  {
    id: 2,
    slug: 'change-in-weather-patterns-due-to-rising-global-temperatures',
    title: 'Lesson 2: Change in Weather Patterns Due to Rising Global Temperatures',
    shortTitle: 'Change in Weather Patterns',
    subtitle: 'Altered rainfall, severe droughts, intensified heatwaves, shifting seasons, and coastal sea-level rise.',
    readTime: '9 min read',
    level: 'Core Dynamics',
    themeColor: '#16A34A',
    badge: 'Lesson 02',
    summary: 'The rise in global temperatures is causing noticeable changes in weather patterns across the world. Warmer temperatures alter rainfall patterns, bringing heavier flooding to some areas while plunging others into prolonged droughts.',
    brief: 'The rise in global temperatures is causing noticeable changes in weather patterns across the world. Warmer temperatures can alter rainfall patterns, making some regions experience heavier rainfall and flooding, while others face longer periods of drought. Heatwaves are becoming more frequent and intense in many areas, while changes in ocean temperatures can influence storms and cyclones. Seasonal patterns are also shifting, affecting agriculture, water availability, and ecosystems. Melting glaciers and rising sea levels further increase risks for coastal communities. These changes demonstrate how increasing temperatures can disrupt natural climate systems and make weather conditions more unpredictable.',
    sections: [
      {
        title: '1. Altered Rainfall Dynamics & The Flood-Drought Paradox',
        content: 'Thermodynamics dictate that for every 1°C increase in atmospheric temperature, the air can hold approximately 7% more water vapor (Clausius-Clapeyron relation). This creates a dual atmospheric crisis: when storms develop, they discharge record torrential downpours causing catastrophic flash flooding; simultaneously, warmer air rapidly draws moisture out of agricultural soils, causing prolonged and severe droughts.',
        keyPoints: [
          'Warmer air holds more moisture, generating heavier, more destructive rainfall events.',
          'Evaporative demand dries out rivers, lakes, and topsoils, lengthening drought cycles.',
          'Seasonal rainfall windows are compressing into fewer, hyper-intense storm days.'
        ]
      },
      {
        title: '2. Supercharged Cyclones, Shifting Seasons & Coastal Threats',
        content: 'Oceans act as thermal fuel tanks for tropical storms. As ocean surface temperatures warm above 26.5°C, cyclones and typhoons intensify into dangerous Category 4 and 5 systems with rapid intensification. Concurrently, shifting seasons alter planting cycles, and accelerating glacial melt drives sea levels higher, threatening coastal cities and low-lying deltas.',
        keyPoints: [
          'Warmer ocean surfaces provide thermodynamic fuel for more severe, rapidly intensifying cyclones.',
          'Seasonal shifts disrupt flowering, pollination, and traditional agricultural planting calendars.',
          'Melting glaciers and thermal expansion of seawater increase permanent coastal inundation risks.'
        ]
      }
    ],
    interactiveGame: {
      type: 'drag-source',
      title: 'Weather Disruption & Emission Sector Sorting Lab',
      instructions: 'Categorize emission activities and weather phenomena (power generation, agriculture, transportation, deforestation) into their dominant drivers.'
    },
    quiz: [
      {
        id: 1,
        question: 'How do rising global temperatures alter worldwide rainfall patterns?',
        options: [
          'A) Rainfall stops completely everywhere across the planet forever',
          'B) Some regions experience heavier rainfall and flooding, while others face longer periods of drought',
          'C) Every single city receives identical rain every single day',
          'D) Rain only falls at nighttime'
        ],
        correctAnswer: 1,
        explanation: 'Warmer air holds ~7% more moisture per 1°C, causing extreme downpours and flash floods in some regions while severely desiccating soils into droughts in others.',
        points: 4
      },
      {
        id: 2,
        question: 'How do warmer ocean surface temperatures affect tropical storms and cyclones?',
        options: [
          'A) They turn tropical storms into gentle morning breezes',
          'B) They provide thermal energy that makes cyclones more intense, powerful, and unpredictable',
          'C) They stop all cloud formation over oceans',
          'D) They make hurricane winds spin backwards'
        ],
        correctAnswer: 1,
        explanation: 'Oceans act as heat engines for tropical systems; elevated sea surface temperatures increase storm wind speeds, storm surges, and rapid intensification rates.',
        points: 4
      },
      {
        id: 3,
        question: 'What critical systems are disrupted when natural seasonal patterns shift due to temperature rise?',
        options: [
          'A) Only indoor board games',
          'B) Agriculture, water availability, and natural ecosystems',
          'C) Computer keyboard manufacturing only',
          'D) Underwater submarine colors'
        ],
        correctAnswer: 1,
        explanation: 'Seasonal shifts alter monsoon timings, planting and harvest schedules, water reservoir replenishment, and animal migration/pollination cycles.',
        points: 4
      },
      {
        id: 4,
        question: 'Why do melting glaciers and rising sea levels pose escalating risks for coastal communities?',
        options: [
          'A) They make coastlines wider and drier',
          'B) They cause saltwater intrusion into freshwater aquifers, coastal erosion, and higher storm surge inundation',
          'C) They convert oceans into solid bedrock',
          'D) They eliminate high tide permanently'
        ],
        correctAnswer: 1,
        explanation: 'Glacial runoff and thermal expansion elevate baseline sea levels, exacerbating tidal flooding, contaminating freshwater drinking wells, and eroding shorelines.',
        points: 4
      },
      {
        id: 5,
        question: 'What is the broader takeaway regarding how increasing global temperatures affect weather conditions?',
        options: [
          'A) Weather is becoming 100% stable and unchanging',
          'B) Increasing temperatures disrupt natural climate systems and make weather conditions far more unpredictable and extreme',
          'C) The Earth will soon have no atmosphere at all',
          'D) Weather patterns are unaffected by thermodynamic changes'
        ],
        correctAnswer: 1,
        explanation: 'Global heating destabilizes atmospheric circulation and jet streams, disrupting natural cycles and multiplying the frequency and severity of extreme weather events.',
        points: 4
      }
    ]
  },

  // 3. Lesson 3: Global Areas and Localities Affected
  {
    id: 3,
    slug: 'global-areas-and-localities-affected',
    title: 'Lesson 3: Global Areas and Localities Affected',
    shortTitle: 'Global Areas Affected',
    subtitle: 'Examining frontline vulnerabilities across South Asia, Africa, Europe, North America, small island nations, and urban heat islands.',
    readTime: '9 min read',
    level: 'Geographic Analysis',
    themeColor: '#075985',
    badge: 'Lesson 03',
    summary: 'Rising temperatures and changing weather patterns are affecting communities across the globe, though impacts vary by region. South Asia, Africa, Europe, North America, island nations, and dense cities face compounding vulnerabilities.',
    brief: 'Rising temperatures and changing weather patterns are affecting communities across the globe, though the impacts vary by region. South Asia faces intense heatwaves, irregular monsoons, flooding, and water shortages. Africa experiences increasing droughts, heat stress, and impacts on agriculture. Europe and North America are seeing more frequent heatwaves, wildfires, and extreme rainfall. Small island nations and coastal areas are particularly vulnerable to sea-level rise and stronger storms. In cities, the urban heat-island effect can make temperatures even higher. These changes affect agriculture, water resources, biodiversity, infrastructure, and the daily lives of millions of people.',
    sections: [
      {
        title: '1. Regional Frontlines: South Asia, Africa, Europe & North America',
        content: 'No continent is immune, but geographical exposure and socioeconomic resilience differ markedly. South Asia copes with deadly wet-bulb heatwaves and erratic monsoon rains. Sub-Saharan Africa faces persistent agricultural droughts and food insecurity. Meanwhile, Europe and North America battle recurrent heat domes, catastrophic wildfires, and river flooding.',
        keyPoints: [
          'South Asia: Intense heatwaves, monsoon irregularities, catastrophic glacial lake outburst floods, and freshwater stress.',
          'Africa: Lengthening droughts, soil desiccation, and heavy threats to rain-fed subsistence agriculture.',
          'Europe & North America: Extreme heatwaves, mega-wildfires in Mediterranean and western forests, and torrential rainstorms.'
        ]
      },
      {
        title: '2. Small Island Developing States (SIDS) & Urban Heat Islands',
        content: 'Low-lying atoll nations (Tuvalu, Maldives, Kiribati) sit mere meters above sea level and face existential threats from coastal erosion and groundwater salinization. Inside metropolitan areas, the Urban Heat Island (UHI) effect elevates downtown temperatures by 3°C to 7°C above nearby rural surroundings, threatening vulnerable urban populations.',
        keyPoints: [
          'Small Island Nations: Vulnerable to permanent land loss, destructive storm surges, and loss of potable freshwater.',
          'Urban Centers: Dense concrete, asphalt, and traffic emissions trap heat, intensifying urban health hazards.',
          'Compounding Risks: Threatens agriculture, municipal water supplies, critical infrastructure, and human livelihoods.'
        ]
      }
    ],
    interactiveGame: {
      type: 'hotspot-matcher',
      title: 'Global Vulnerability & Hotspot Matcher Game',
      instructions: 'Match each affected geographic region with its primary ecological threat: coastal inundation, permafrost collapse, or extreme wet-bulb heat.'
    },
    quiz: [
      {
        id: 1,
        question: 'Which specific climate impacts are most acute across South Asia?',
        options: [
          'A) Mild snow accumulation only',
          'B) Intense heatwaves, irregular monsoons, catastrophic flooding, and water shortages',
          'C) Complete disappearance of all rivers overnight',
          'D) Ice shelf advance'
        ],
        correctAnswer: 1,
        explanation: 'South Asia experiences severe heat stress exceeding physiological wet-bulb thresholds, alongside erratic monsoon flooding and water scarcity.',
        points: 4
      },
      {
        id: 2,
        question: 'How are rising temperatures and changing weather patterns impacting Africa?',
        options: [
          'A) Creating tropical rainforests across the entire Sahara',
          'B) Increasing droughts, severe heat stress, and heavy impacts on rain-fed agriculture',
          'C) Cooling the continent to sub-zero temperatures',
          'D) Stopping all wind currents completely'
        ],
        correctAnswer: 1,
        explanation: 'Africa faces prolonged agricultural droughts, heat stress, soil degradation, and threats to food and water security.',
        points: 4
      },
      {
        id: 3,
        question: 'What climate challenges have become increasingly frequent in Europe and North America?',
        options: [
          'A) More frequent intense heatwaves, destructive wildfires, and extreme rainfall events',
          'B) Total elimination of summer seasons',
          'C) Expansion of polar permafrost down to Paris and New York',
          'D) Complete cessation of coastal storms'
        ],
        correctAnswer: 0,
        explanation: 'Both regions have experienced record-shattering heat domes, severe wildfire seasons (e.g. Greece, Canada, California), and intense atmospheric rain events.',
        points: 4
      },
      {
        id: 4,
        question: 'Why are Small Island Developing States (SIDS) particularly vulnerable?',
        options: [
          'A) They are too high in elevation for rain clouds',
          'B) They sit barely 1 to 2 meters above sea level, making them acutely vulnerable to sea-level rise and stronger storms',
          'C) They do not have access to sunlight',
          'D) They are covered in glaciers'
        ],
        correctAnswer: 1,
        explanation: 'Low-lying islands face existential risks of land loss, wave surges, and saltwater contamination of drinking water aquifers.',
        points: 4
      },
      {
        id: 5,
        question: 'What is the "urban heat-island effect" in metropolitan cities?',
        options: [
          'A) When city parks create tropical coral reefs',
          'B) When urban concrete, asphalt, buildings, and vehicle activity absorb and trap heat, making cities significantly hotter than surrounding areas',
          'C) A tropical vacation resort built in city squares',
          'D) When city subways freeze in summer'
        ],
        correctAnswer: 1,
        explanation: 'Dense urban materials absorb solar heat during the day and re-radiate it at night, elevating urban temperatures and compounding heat stress.',
        points: 4
      }
    ]
  },

  // 4. Lesson 4: Measures Against Rising Temperatures & Changing Weather
  {
    id: 4,
    slug: 'measures-against-rising-temperatures-and-changing-weather',
    title: 'Lesson 4: Measures Against Rising Temperatures & Changing Weather',
    shortTitle: 'Action & Prevention Measures',
    subtitle: 'Renewable energy, afforestation, clean industrial technologies, water conservation, early-warning systems, and individual lifestyle actions.',
    readTime: '10 min read',
    level: 'Strategic Solutions',
    themeColor: '#16A34A',
    badge: 'Lesson 04',
    summary: 'Overcoming climate disruption requires systemic action: shifting to renewable energy, protecting and restoring forests, adopting clean industrial technology, harvesting water, and empowering citizen stewardship.',
    brief: 'Reducing greenhouse gas emissions by shifting to renewable energy, improving energy efficiency, and promoting public transport and electric vehicles. Afforestation and protection of forests are essential for absorbing carbon dioxide and maintaining ecological balance. Industries should adopt cleaner technologies and reduce pollution. Communities should also practice water conservation, rainwater harvesting, and sustainable agriculture. Governments must strengthen early-warning systems, improve disaster preparedness, and develop climate-resilient infrastructure. Individuals can contribute by saving electricity, reducing waste, recycling, and adopting environmentally friendly lifestyles. Together, these measures can help slow global warming and reduce its impact on people and ecosystems.',
    sections: [
      {
        title: '1. Renewable Energy Transition & Forest Protection',
        content: 'The most direct pathway to halting temperature rise is cutting emissions at the source: rapidly replacing coal, oil, and gas with utility-scale solar PV, wind, and battery storage. In parallel, preserving standing forests and active afforestation absorbs gigatons of atmospheric carbon while restoring biodiversity.',
        keyPoints: [
          'Renewable Energy: Solar and wind power have plummeted in cost by 60%–85%, outcompeting fossil peakers.',
          'Electrification: Shifting passenger transit, rail, and fleets to electric vehicles eliminates tailpipe emissions.',
          'Afforestation & Conservation: Trees act as natural terrestrial carbon sinks, sequestering CO2 into roots and soils.'
        ]
      },
      {
        title: '2. Resilient Infrastructure, Early Warnings & Individual Action',
        content: 'Climate resilience requires combining governmental policies with grassroots community action. Modernizing building codes, building seawalls and permeable surfaces, and installing AI-powered meteorological early-warning systems saves lives. Meanwhile, individual actions—energy conservation, reducing waste, and active recycling—create immense cumulative change.',
        keyPoints: [
          'Water Security: Rainwater harvesting, drip irrigation, and wetland restoration protect freshwater reserves.',
          'Disaster Preparedness: Early-warning siren and mobile networks give frontline communities crucial evacuation hours.',
          'Everyday Contributions: Saving electricity, reducing plastic and food waste, and adopting sustainable diets collectively bends the emissions curve.'
        ]
      }
    ],
    interactiveGame: {
      type: 'clean-grid',
      title: 'Decarbonized City Grid Simulator',
      instructions: 'Balance solar, wind, and battery storage to power a metropolitan city with 100% clean, zero-fossil electricity 24 hours a day.'
    },
    quiz: [
      {
        id: 1,
        question: 'Which systemic actions are essential for reducing global greenhouse gas emissions?',
        options: [
          'A) Burning more coal and expanding gasoline subsidies',
          'B) Shifting to renewable energy, improving energy efficiency, and promoting public transit and electric vehicles',
          'C) Cutting down mature rainforests for pasture',
          'D) Banning bicycles from all roadways'
        ],
        correctAnswer: 1,
        explanation: 'Shifting power grids to renewables, boosting energy efficiency, and transitioning transportation to EVs and public transit directly slashes emissions.',
        points: 4
      },
      {
        id: 2,
        question: 'Why are afforestation and the protection of existing forests vital against rising temperatures?',
        options: [
          'A) Trees release vast amounts of sulfur into rivers',
          'B) Forests absorb and store carbon dioxide from the atmosphere and preserve natural ecological balance',
          'C) Forests prevent the sun from rising in winter',
          'D) Trees eliminate the need for drinking water'
        ],
        correctAnswer: 1,
        explanation: 'Forests are Earth’s primary terrestrial carbon sinks, pulling CO2 out of the atmosphere through photosynthesis and storing it in biomass and soils.',
        points: 4
      },
      {
        id: 3,
        question: 'How can communities and agriculture adapt to changing rainfall and water shortages?',
        options: [
          'A) By paving over all natural rivers with concrete',
          'B) Through water conservation, rainwater harvesting, and sustainable, drought-resilient agriculture',
          'C) By draining all aquifers into the open ocean',
          'D) By watering lawns exclusively during the hottest hour of the day'
        ],
        correctAnswer: 1,
        explanation: 'Rainwater collection tanks, drip irrigation, and soil moisture retention techniques ensure community water security during prolonged dry spells.',
        points: 4
      },
      {
        id: 4,
        question: 'What role must governments play to protect citizens from extreme weather disasters?',
        options: [
          'A) Discontinue all meteorological forecasts',
          'B) Strengthen early-warning systems, improve disaster preparedness, and build climate-resilient infrastructure',
          'C) Ban sea defenses and seawalls',
          'D) Increase building on fragile floodplains'
        ],
        correctAnswer: 1,
        explanation: 'Timely early warnings, upgraded evacuation routes, and hardened infrastructure drastically reduce mortality and economic destruction during storms.',
        points: 4
      },
      {
        id: 5,
        question: 'How can individuals meaningfully contribute to slowing global warming?',
        options: [
          'A) Leaving all household lights and appliances powered on 24/7',
          'B) Saving electricity, reducing waste, recycling, and adopting environmentally friendly, conscious lifestyles',
          'C) Burning household plastics in backyards',
          'D) Refusing to use public transport'
        ],
        correctAnswer: 1,
        explanation: 'Individual behavioral shifts—reducing energy consumption, avoiding food waste, recycling, and choosing low-carbon transit—generate immense collective impact.',
        points: 4
      }
    ]
  },

  // 5. Lesson 5: Material, Economic and Sustainable Measures
  {
    id: 5,
    slug: 'material-economic-and-sustainable-measures',
    title: 'Lesson 5: Material, Economic & Sustainable Measures',
    shortTitle: 'Economic & Material Solutions',
    subtitle: 'Circular supply chains, low-carbon concrete, green bonds, carbon border adjustments, and civic contributions.',
    readTime: '11 min read',
    level: 'Advanced Systems',
    themeColor: '#087FCE',
    badge: 'Lesson 05',
    summary: 'True climate stability requires overhauling economic models and material manufacturing: replacing high-emission Portland cement and steel, adopting circular product lifecycles, and enacting transparent carbon pricing mechanisms.',
    brief: 'Achieving deep, lasting sustainability requires transitioning from linear extraction to circular economic models. Decarbonizing heavy materials like steel and cement through green hydrogen and bio-composites eliminates embodied emissions. Implementing carbon pricing mechanisms, transparent ESG disclosures, and green financing instruments ensures economic incentives align with planetary boundaries, supported by collective community stewardship and conscious resource efficiency.',
    sections: [
      {
        title: '1. Material Innovation: Steel, Cement, and Embodied Carbon',
        content: 'Cement and steel production alone generate roughly 14% to 16% of total global carbon emissions. Decarbonizing heavy industry demands green hydrogen direct reduction for steelmaking and novel calcined-clay limestone cements that eliminate up to 80% of process emissions.',
        keyPoints: [
          'Green Hydrogen (produced via renewable water electrolysis) replaces metallurgical coking coal in steel furnaces.',
          'Bio-composite building materials and mass timber sequester carbon inside long-lived architectural structures.',
          'Embodied carbon auditing ensures new infrastructure is engineered with net-zero lifecycle principles.'
        ]
      },
      {
        title: '2. Economic Instruments, Carbon Pricing & Individual Stewardship',
        content: 'Economic frameworks are shifting from linear "take-make-waste" extraction to regenerative circular economies. Carbon taxes, emissions trading systems (ETS), and green bond markets ensure that environmental externalities are quantified and paid for by polluters.',
        keyPoints: [
          'Carbon Border Adjustment Mechanisms (CBAM) prevent carbon leakage to unregulated jurisdictions.',
          'Corporate ESG disclosure regulations penalize misleading greenwashing and mandate supply chain transparency.',
          'Individual and community power: dietary shifts towards plant-rich meals, energy conservation, civic advocacy, and conscious consumerism.'
        ]
      }
    ],
    interactiveGame: {
      type: 'circular-economy',
      title: 'Circular Economy Material Loop Challenge',
      instructions: 'Reroute industrial raw materials and post-consumer waste into continuous circular recycling loops instead of landfill dumps.'
    },
    quiz: [
      {
        id: 1,
        question: 'Together, cement and steel production account for approximately what fraction of worldwide carbon emissions?',
        options: [
          'A) Less than 0.1%',
          'B) Roughly 14% to 16% of total global emissions',
          'C) 95% of everything',
          'D) Exactly zero emissions'
        ],
        correctAnswer: 1,
        explanation: 'Heavy industry materials—especially conventional steel and Portland cement—are responsible for roughly 14% to 16% of annual global greenhouse gas emissions.',
        points: 4
      },
      {
        id: 2,
        question: 'What is a "Circular Economy"?',
        options: [
          'A) An economy where everything travels in round trucks',
          'B) An economic model designed to eliminate waste and pollution by keeping products and materials in continuous high-value use',
          'C) Buying single-use plastic goods on repeat',
          'D) Dumping all electronics in rivers'
        ],
        correctAnswer: 1,
        explanation: 'A circular economy decouples economic activity from the consumption of finite resources, designing out waste, sharing, repairing, and recycling indefinitely.',
        points: 4
      },
      {
        id: 3,
        question: 'How can "Green Hydrogen" eliminate emissions from primary steel manufacturing?',
        options: [
          'A) It acts as a chemical reducing agent instead of coal, with water vapor as the only byproduct',
          'B) It paints the finished steel green',
          'C) It turns steel into plastic',
          'D) It dissolves iron ore completely'
        ],
        correctAnswer: 0,
        explanation: 'Using green hydrogen produced via renewable electrolysis to reduce iron ore completely replaces fossil coking coal, emitting pure water vapor rather than carbon dioxide.',
        points: 4
      },
      {
        id: 4,
        question: 'What does a Carbon Border Adjustment Mechanism (CBAM) do?',
        options: [
          'A) It bans all international trade between countries',
          'B) It levies a carbon fee on imported goods from countries with lax climate standards to prevent "carbon leakage"',
          'C) It requires passports to be made of charcoal',
          'D) It builds physical walls across continents'
        ],
        correctAnswer: 1,
        explanation: 'CBAM levels the economic playing field by applying a carbon price to carbon-intensive imports, encouraging exporting countries to decarbonize their industries.',
        points: 4
      },
      {
        id: 5,
        question: 'Which of the following represents an impactful individual and community contribution to climate action?',
        options: [
          'A) Leaving all home heaters and lights on constantly',
          'B) Adopting energy efficiency, reducing food waste, utilizing public transit, and advocating for municipal renewable policies',
          'C) Burning garden leaves and plastics in backyard barrels',
          'D) Buying non-repairable single-use electronics every month'
        ],
        correctAnswer: 1,
        explanation: 'Collective lifestyle modifications—reducing household energy, prioritizing plant-rich diets, reducing food waste, and demanding civic renewable transition—create immense cumulative change.',
        points: 4
      }
    ]
  },

  // 6. Lesson 6: Bibliography, Research Citations & Certificate
  {
    id: 6,
    slug: 'bibliography-and-academic-citations',
    title: 'Lesson 6: Bibliography & Research Citations',
    shortTitle: 'Bibliography & Rewards',
    subtitle: 'Peer-reviewed climate references, international repositories, open datasets, and reward redemption.',
    readTime: '6 min read',
    level: 'Reference & Certification',
    themeColor: '#075985',
    badge: 'Lesson 06',
    summary: 'All telemetry, temperature anomalies, and sustainability data throughout this course are synthesized from verified peer-reviewed scientific institutions, including the IPCC, NASA, NOAA, WMO, and UNEP.',
    brief: 'All telemetry, planetary metrics, and sustainability strategies throughout this course are directly derived from primary scientific institutions, including the IPCC, NASA GISS, NOAA, WMO, and UNEP. Completing all interactive lessons and scoring on the questionnaires certifies foundational climate literacy, unlocking real-world partner rewards, tree-planting actions, and verified academic credentials.',
    sections: [
      {
        title: '1. Peer-Reviewed Academic & Institutional Citations',
        content: 'This curriculum is grounded in primary scientific research and real-time planetary observations.',
        keyPoints: [
          'IPCC (2023): Sixth Assessment Report (AR6) - Climate Change 2023: Synthesis Report. Cambridge University Press.',
          'NASA Goddard Institute for Space Studies (GISS): Global Surface Temperature Analysis (GISTEMP v4). Data repository.',
          'NOAA National Centers for Environmental Information: State of the Climate: Global Climate Report.',
          'World Meteorological Organization (WMO): State of the Global Climate Annual Reports.',
          'UNEP (2023): The Emissions Gap Report 2023: Broken Record – Temperatures hit new highs, yet world fails to cut emissions.',
          'International Energy Agency (IEA): World Energy Outlook & Net Zero Roadmap by 2050 (2023 Update).'
        ]
      },
      {
        title: '2. Open Earth Data Telemetry & Satellite Sensor Repositories',
        content: 'Learners can inspect real-time raw satellite telemetry using these open tools:',
        keyPoints: [
          'Copernicus Climate Data Store (CDS) - ERA5 global atmospheric reanalysis.',
          'NASA Earthdata & Giovanni - Remote sensing geophysical parameter visualization.',
          'Global Carbon Project (GCP) - Global Carbon Budget annual datasets.',
          'Our World in Data - CO2 and Greenhouse Gas Emissions interactive database.'
        ]
      }
    ],
    interactiveGame: {
      type: 'thermostat',
      title: 'Congratulations on Completing the Course Curriculum!',
      instructions: 'You have verified all scientific research citations. Proceed below to redeem your coupons and claim your Certificate of Climate Literacy!'
    },
    quiz: [] // Lesson 6 is the conclusion / certificate & reward redemption hub!
  }
];
