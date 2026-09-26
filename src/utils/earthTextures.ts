import * as THREE from 'three';

// High-detail continent and major island outlines (Lat, Lon)
const WORLD_LANDMASSES: [number, number][][] = [
  // North America & Central America
  [
    [71, -157], [70, -140], [69, -135], [70, -115], [68, -100], [64, -85], [58, -78],
    [52, -56], [47, -53], [44, -64], [41, -70], [35, -75], [28, -80], [25, -81],
    [29, -89], [28, -96], [22, -98], [19, -91], [21, -87], [16, -88], [9, -79],
    [8, -83], [14, -92], [16, -98], [20, -105], [24, -110], [32, -114], [28, -112],
    [23, -110], [27, -115], [34, -120], [42, -124], [48, -125], [54, -133], [59, -140],
    [60, -150], [55, -162], [60, -165], [66, -168], [71, -157]
  ],
  // Greenland
  [
    [83, -30], [81, -15], [75, -20], [70, -22], [60, -44], [64, -52], [72, -56],
    [76, -69], [82, -62], [83, -30]
  ],
  // South America
  [
    [12, -72], [11, -62], [8, -59], [5, -51], [0, -50], [-4, -36], [-8, -35],
    [-13, -39], [-23, -42], [-32, -52], [-35, -57], [-42, -64], [-52, -68], [-55, -67],
    [-53, -73], [-46, -75], [-35, -73], [-25, -70], [-17, -72], [-10, -78], [-5, -81],
    [0, -80], [6, -77], [10, -75], [12, -72]
  ],
  // Europe & Mediterranean
  [
    [71, 28], [68, 14], [62, 5], [58, 6], [54, 9], [54, 14], [56, 21], [60, 28],
    [65, 23], [66, 32], [69, 36], [67, 43], [60, 50], [54, 48], [47, 40], [45, 36],
    [46, 30], [42, 28], [40, 24], [38, 24], [36, 22], [38, 20], [41, 19], [45, 13],
    [41, 15], [37, 15], [39, 9], [43, 8], [43, 3], [37, -2], [36, -6], [38, -9],
    [43, -9], [43, -3], [46, -1], [49, -2], [50, 2], [53, 5], [56, 8], [60, 5],
    [64, 10], [70, 20], [71, 28]
  ],
  // British Isles & Ireland
  [
    [58, -5], [57, -2], [53, 0], [51, 1], [50, -5], [52, -5], [55, -3], [58, -5]
  ],
  [
    [55, -7], [54, -6], [52, -6], [51, -10], [53, -10], [55, -7]
  ],
  // Africa & Arabian Peninsula
  [
    [37, 10], [35, 12], [32, 14], [32, 24], [31, 32], [28, 34], [22, 37], [13, 43],
    [12, 51], [5, 49], [-2, 41], [-11, 40], [-16, 39], [-26, 33], [-34, 26], [-34, 19],
    [-29, 17], [-18, 12], [-10, 14], [-4, 9], [4, 9], [5, 0], [4, -7], [6, -12],
    [11, -15], [15, -17], [21, -17], [27, -13], [32, -9], [36, -5], [37, 10]
  ],
  // Madagascar
  [
    [-12, 49], [-16, 50], [-25, 47], [-25, 44], [-17, 44], [-12, 49]
  ],
  // Arabian Peninsula
  [
    [30, 35], [26, 36], [22, 39], [13, 44], [13, 48], [15, 53], [22, 60], [26, 56],
    [28, 50], [30, 48], [30, 35]
  ],
  // Asia
  [
    [72, 60], [74, 80], [77, 105], [74, 135], [70, 160], [66, 170], [60, 163],
    [53, 143], [44, 145], [42, 131], [38, 128], [35, 129], [38, 121], [32, 122],
    [22, 114], [21, 108], [11, 109], [8, 103], [14, 101], [21, 97], [22, 90],
    [16, 82], [10, 80], [8, 77], [15, 74], [23, 69], [25, 62], [25, 57], [30, 48],
    [38, 44], [42, 30], [47, 40], [53, 50], [60, 60], [72, 60]
  ],
  // India Subcontinent
  [
    [25, 68], [21, 70], [15, 73], [8, 77], [10, 80], [16, 82], [21, 87], [22, 90],
    [26, 88], [28, 77], [25, 68]
  ],
  // Japan (Honshu & Hokkaido)
  [
    [45, 142], [43, 146], [42, 141], [41, 140], [36, 141], [34, 136], [34, 131],
    [36, 136], [40, 140], [45, 142]
  ],
  // Southeast Asia & Indonesia
  [
    [5, 96], [3, 98], [-4, 103], [-6, 106], [-8, 114], [-8, 116], [-5, 106], [0, 102], [5, 96]
  ],
  [
    [4, 118], [0, 118], [-4, 115], [-3, 110], [2, 110], [7, 117], [4, 118]
  ],
  // Australia & New Zealand
  [
    [-11, 132], [-14, 136], [-12, 142], [-17, 146], [-25, 153], [-32, 153], [-38, 147],
    [-38, 140], [-35, 136], [-32, 129], [-35, 118], [-32, 115], [-22, 114], [-17, 122],
    [-15, 129], [-11, 132]
  ],
  // New Zealand
  [
    [-35, 173], [-38, 178], [-41, 175], [-44, 171], [-46, 168], [-44, 168], [-41, 172], [-35, 173]
  ],
  // Antarctica
  [
    [-65, -64], [-68, -58], [-72, -30], [-72, 30], [-68, 70], [-66, 110], [-65, 140],
    [-71, 170], [-77, -170], [-75, -130], [-70, -100], [-68, -75], [-65, -64]
  ]
];

// Major mountain ranges and elevation ridges (for realistic topography shading)
const TOPOGRAPHY_FEATURES = [
  // Himalayas
  { lat: 29, lon: 86, r: 8, label: 'Himalayas' },
  // Andes
  { lat: -20, lon: -67, r: 12, label: 'Andes' },
  // Rockies
  { lat: 45, lon: -112, r: 10, label: 'Rockies' },
  // Alps
  { lat: 46, lon: 10, r: 5, label: 'Alps' },
  // Sahara Desert
  { lat: 23, lon: 13, r: 18, label: 'Sahara' },
  // Amazon Basin
  { lat: -3, lon: -60, r: 14, label: 'Amazon' }
];

/**
 * Converts Equirectangular coordinates (lat, lon) to Canvas X, Y
 */
function geoToCanvas(lat: number, lon: number, width: number, height: number): [number, number] {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return [x, y];
}

/**
 * Creates a photorealistic Natural Earth texture canvas and converts to THREE.CanvasTexture
 */
export function createNaturalEarthTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Ocean Base Bathymetry with Equatorial Sun Warming
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0a2540'); // Arctic dark blue
  oceanGrad.addColorStop(0.2, '#0c3866');
  oceanGrad.addColorStop(0.5, '#0f4c81'); // Tropical vibrant ocean
  oceanGrad.addColorStop(0.8, '#0a2e52');
  oceanGrad.addColorStop(1, '#081c33'); // Antarctic icy deep
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Shallow continental shelf water halo around coasts
  ctx.shadowColor = 'rgba(56, 189, 248, 0.45)';
  ctx.shadowBlur = 18;

  // 2. Draw Real Continents with Varied Biomes (Savannah, Rainforest, Desert, Tundra)
  WORLD_LANDMASSES.forEach((poly) => {
    ctx.beginPath();
    poly.forEach(([lat, lon], idx) => {
      const [x, y] = geoToCanvas(lat, lon, width, height);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();

    // Biome determination based on latitude
    const avgLat = poly.reduce((acc, p) => acc + p[0], 0) / poly.length;
    const avgLon = poly.reduce((acc, p) => acc + p[1], 0) / poly.length;

    let landColor = '#2d6a4f'; // Default temperate green

    if (Math.abs(avgLat) > 65) {
      // Polar Ice & Glaciers (Greenland & Antarctica)
      landColor = '#f8fafc';
    } else if (avgLat >= 12 && avgLat <= 32 && avgLon >= -15 && avgLon <= 55) {
      // Sahara & Arabian Deserts
      landColor = '#d97706';
    } else if (avgLat >= -10 && avgLat <= 5 && avgLon >= -75 && avgLon <= -45) {
      // Dense Amazon Rainforest
      landColor = '#14532d';
    } else if (avgLat >= -5 && avgLat <= 5 && avgLon >= 10 && avgLon <= 30) {
      // Congo Basin Rainforest
      landColor = '#166534';
    } else if (avgLat >= -30 && avgLat <= -15 && avgLon >= 115 && avgLon <= 145) {
      // Australian Outback Arid Interior
      landColor = '#c2410c';
    } else if (avgLat > 50) {
      // Northern Boreal Taiga
      landColor = '#3f6212';
    }

    ctx.fillStyle = landColor;
    ctx.fill();

    // Realistic Coastal Border
    ctx.strokeStyle = 'rgba(167, 243, 208, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  });

  ctx.shadowBlur = 0; // Reset shadow

  // 3. Realistic Topographic Shading & Deserts Overlay
  TOPOGRAPHY_FEATURES.forEach(({ lat, lon, r, label }) => {
    const [cx, cy] = geoToCanvas(lat, lon, width, height);
    const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r * 8);

    if (label === 'Sahara') {
      grad.addColorStop(0, 'rgba(217, 119, 6, 0.65)');
      grad.addColorStop(0.7, 'rgba(245, 158, 11, 0.3)');
      grad.addColorStop(1, 'rgba(217, 119, 6, 0)');
    } else if (label === 'Amazon') {
      grad.addColorStop(0, 'rgba(20, 83, 45, 0.5)');
      grad.addColorStop(1, 'rgba(20, 83, 45, 0)');
    } else {
      // Mountain snow caps & rock ridges
      grad.addColorStop(0, 'rgba(241, 245, 249, 0.7)');
      grad.addColorStop(0.4, 'rgba(120, 113, 108, 0.5)');
      grad.addColorStop(1, 'rgba(120, 113, 108, 0)');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // 4. Polar Ice Cap Extents (North & South Poles)
  // North Pole ice pack
  const northIce = ctx.createLinearGradient(0, 0, 0, height * 0.12);
  northIce.addColorStop(0, 'rgba(248, 250, 252, 0.95)');
  northIce.addColorStop(0.7, 'rgba(226, 232, 240, 0.7)');
  northIce.addColorStop(1, 'rgba(226, 232, 240, 0)');
  ctx.fillStyle = northIce;
  ctx.fillRect(0, 0, width, height * 0.12);

  // South Pole ice cap
  const southIce = ctx.createLinearGradient(0, height * 0.86, 0, height);
  southIce.addColorStop(0, 'rgba(226, 232, 240, 0)');
  southIce.addColorStop(0.3, 'rgba(226, 232, 240, 0.8)');
  southIce.addColorStop(1, 'rgba(248, 250, 252, 0.98)');
  ctx.fillStyle = southIce;
  ctx.fillRect(0, height * 0.86, width, height * 0.14);

  // 5. Subtle Global Latitude Graticules
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  for (let lat = -60; lat <= 60; lat += 30) {
    const [, y] = geoToCanvas(lat, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    const [x] = geoToCanvas(0, lon, width, height);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates a calibrated Live Thermal Heatmap texture (Infrared Radiometer Anomaly Spectrum)
 */
export function createThermalEarthTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Deep Space Radiative Baseline Ocean (SST Anomaly Gradients)
  const oceanThermal = ctx.createLinearGradient(0, 0, 0, height);
  oceanThermal.addColorStop(0, '#7f1d1d'); // High Arctic thermal anomaly warming (+3.5°C)
  oceanThermal.addColorStop(0.18, '#1e1b4b'); // High latitude subpolar cold baseline
  oceanThermal.addColorStop(0.4, '#1e293b');
  oceanThermal.addColorStop(0.5, '#451a03'); // Tropical warming belt
  oceanThermal.addColorStop(0.7, '#1e293b');
  oceanThermal.addColorStop(0.9, '#312e81');
  oceanThermal.addColorStop(1, '#991b1b'); // Antarctic Peninsula anomaly
  ctx.fillStyle = oceanThermal;
  ctx.fillRect(0, 0, width, height);

  // 2. Continents Colored by Regional Thermal Anomaly (Infrared Heat Spectrum)
  WORLD_LANDMASSES.forEach((poly) => {
    ctx.beginPath();
    poly.forEach(([lat, lon], idx) => {
      const [x, y] = geoToCanvas(lat, lon, width, height);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();

    const avgLat = poly.reduce((acc, p) => acc + p[0], 0) / poly.length;
    const avgLon = poly.reduce((acc, p) => acc + p[1], 0) / poly.length;

    let thermalColor = '#f59e0b'; // Elevated warm amber (+1.8°C)

    if (Math.abs(avgLat) > 65) {
      // Arctic amplification anomaly: blistering crimson/red (+3.8°C to +4.5°C)
      thermalColor = '#ef4444';
    } else if (avgLat >= 15 && avgLat <= 40 && avgLon >= -10 && avgLon <= 50) {
      // Mediterranean & Saharan Heat Dome (+3.2°C)
      thermalColor = '#dc2626';
    } else if (avgLat >= 15 && avgLat <= 32 && avgLon >= 65 && avgLon <= 92) {
      // South Asian Pre-Monsoon Heat Stress (+2.8°C)
      thermalColor = '#ea580c';
    } else if (avgLat >= -15 && avgLat <= 5 && avgLon >= -75 && avgLon <= -45) {
      // Amazon Drought Basin (+2.6°C)
      thermalColor = '#f97316';
    } else if (avgLat >= -35 && avgLat <= -15 && avgLon >= 115 && avgLon <= 150) {
      // Australian Heat Dome (+2.7°C)
      thermalColor = '#ea580c';
    } else {
      // Moderate anomaly baseline (+1.2°C to +1.8°C)
      thermalColor = '#eab308';
    }

    ctx.fillStyle = thermalColor;
    ctx.fill();

    // Hot contour edge
    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // 3. Superimposed Thermal Hotspot Blooms (Blazing Infrared Radiation Cores)
  const THERMAL_BLOOMS = [
    { lat: 74, lon: -40, r: 85, color: '#f43f5e' }, // Arctic
    { lat: 38, lon: 16, r: 65, color: '#ef4444' }, // Mediterranean
    { lat: 24, lon: 80, r: 70, color: '#ea580c' }, // South Asia
    { lat: -4, lon: -62, r: 65, color: '#f97316' }, // Amazon
    { lat: 45, lon: -155, r: 80, color: '#fb923c' }, // North Pacific Blob
    { lat: 14, lon: 12, r: 65, color: '#ef4444' }, // Sahel
    { lat: -18, lon: 147, r: 50, color: '#f43f5e' }, // Great Barrier Reef
    { lat: -66, lon: -64, r: 70, color: '#dc2626' } // Antarctic Peninsula
  ];

  THERMAL_BLOOMS.forEach(({ lat, lon, r, color }) => {
    const [cx, cy] = geoToCanvas(lat, lon, width, height);
    const rad = ctx.createRadialGradient(cx, cy, 5, cx, cy, r);
    rad.addColorStop(0, '#ffffff'); // White hot epicenter
    rad.addColorStop(0.2, color);
    rad.addColorStop(0.6, 'rgba(234, 88, 12, 0.4)');
    rad.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  });

  // 4. Thermal Isotherm Contour Wave Lines
  ctx.strokeStyle = 'rgba(254, 215, 170, 0.35)';
  ctx.lineWidth = 1.4;
  for (let lat = -50; lat <= 50; lat += 20) {
    const [, y] = geoToCanvas(lat, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= width; x += 30) {
      const wave = Math.sin((x / width) * Math.PI * 8) * 8;
      ctx.lineTo(x, y + wave);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates specialized Sea Surface Temperature (SST) Marine Heatwave Texture
 */
export function createOceanThermalTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Vibrant Ocean Marine Heat Thermal Gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#f43f5e'); // Arctic marine heat
  oceanGrad.addColorStop(0.2, '#3b82f6');
  oceanGrad.addColorStop(0.4, '#10b981');
  oceanGrad.addColorStop(0.5, '#f59e0b'); // Equatorial warm belt
  oceanGrad.addColorStop(0.65, '#ef4444');
  oceanGrad.addColorStop(0.85, '#3b82f6');
  oceanGrad.addColorStop(1, '#dc2626');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Continents shown in stealth dark infrared topography
  WORLD_LANDMASSES.forEach((poly) => {
    ctx.beginPath();
    poly.forEach(([lat, lon], idx) => {
      const [x, y] = geoToCanvas(lat, lon, width, height);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = '#0f172a'; // Dark silhouette to emphasize marine heat
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates dynamic translucent Earth Cloud Cover texture
 */
export function createEarthCloudTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, width, height);

  // Intertropical Convergence Zone (ITCZ) equatorial cloud band
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * width;
    const y = height * 0.45 + (Math.random() - 0.5) * height * 0.16;
    const radius = Math.random() * 65 + 35;
    const grad = ctx.createRadialGradient(x, y, 4, x, y, radius);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Mid-latitude cyclonic weather swirl cloud bands
  for (let band = 0; band < 120; band++) {
    const isNorth = Math.random() > 0.5;
    const baseY = isNorth ? height * 0.28 : height * 0.72;
    const x = Math.random() * width;
    const y = baseY + (Math.random() - 0.5) * height * 0.18;
    const radius = Math.random() * 85 + 40;
    const grad = ctx.createRadialGradient(x, y, 4, x, y, radius);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
    grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.25)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Calculates (x, y, z) 3D coordinate on a sphere of radius R for given lat, lon
 */
export function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}
