import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import {
  ThermometerSun,
  Globe2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Flame,
  Info,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Waves,
  Eye,
  Radio
} from 'lucide-react';
import {
  createNaturalEarthTexture,
  createThermalEarthTexture,
  createOceanThermalTexture,
  createEarthCloudTexture,
  latLonToVector3
} from '../utils/earthTextures';

interface Hotspot {
  id: string;
  name: string;
  lat: number;
  lon: number;
  tempAnomaly: number; // e.g. +3.8°C
  region: string;
  status: 'Critical' | 'Severe' | 'Elevated';
  impact: string;
}

const CLIMATE_HOTSPOTS: Hotspot[] = [
  {
    id: 'arctic',
    name: 'Arctic Ocean & Permafrost',
    lat: 74,
    lon: -40,
    tempAnomaly: 3.8,
    region: 'Circumpolar North',
    status: 'Critical',
    impact: 'Rapid sea ice shrinkage, albedo loss, and permafrost methane venting.'
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean Basin Heat Dome',
    lat: 38,
    lon: 16,
    tempAnomaly: 2.9,
    region: 'Southern Europe & North Africa',
    status: 'Severe',
    impact: 'Record terrestrial heatwaves, wildfire escalation, and aquifer depletion.'
  },
  {
    id: 'amazon',
    name: 'Amazon Rainforest Biome',
    lat: -4,
    lon: -62,
    tempAnomaly: 2.4,
    region: 'South America',
    status: 'Severe',
    impact: 'Extreme hydrological drought, canopy dieback, and reduced moisture recycling.'
  },
  {
    id: 'south-asia',
    name: 'South Asian Subcontinent',
    lat: 25,
    lon: 78,
    tempAnomaly: 2.2,
    region: 'Indo-Gangetic Plain',
    status: 'Critical',
    impact: 'Wet-bulb temperatures nearing survivability thresholds and irregular monsoons.'
  },
  {
    id: 'sahel',
    name: 'Sahel & North Tropical Africa',
    lat: 14,
    lon: 12,
    tempAnomaly: 2.6,
    region: 'Sub-Saharan Transition',
    status: 'Severe',
    impact: 'Expanding arid margins, crop failure risks, and acute water stress.'
  },
  {
    id: 'pacific-marine',
    name: 'North Pacific Marine Heatwave',
    lat: 44,
    lon: -155,
    tempAnomaly: 2.7,
    region: 'Subarctic Pacific Ocean',
    status: 'Severe',
    impact: 'Persistent marine thermal anomalies disrupting pelagic ecosystems.'
  },
  {
    id: 'great-barrier',
    name: 'Great Barrier Reef Coral Shelf',
    lat: -18,
    lon: 147,
    tempAnomaly: 2.1,
    region: 'Coral Sea',
    status: 'Critical',
    impact: 'Mass coral bleaching from sustained high water surface temperatures.'
  },
  {
    id: 'antarctic-peninsula',
    name: 'Antarctic Peninsula Shelf',
    lat: -66,
    lon: -64,
    tempAnomaly: 3.2,
    region: 'West Antarctica',
    status: 'Critical',
    impact: 'Accelerated glacier calving and disintegrating ice shelf buttresses.'
  }
];

export const MotionGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  // User visualization mode: 'thermal' (Infrared Heatmap) | 'ocean' (Marine Heat SST) | 'natural' (Satellite)
  const [viewMode, setViewMode] = useState<'thermal' | 'ocean' | 'natural'>('thermal');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.0025);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(CLIMATE_HOTSPOTS[0]);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);

  // References passed to animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const atmosphereMeshRef = useRef<THREE.Mesh | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const naturalTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const thermalTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const oceanTextureRef = useRef<THREE.CanvasTexture | null>(null);

  // Camera orientation & interaction
  const targetRotationRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const zoomLevelRef = useRef(1.0);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseCoords = useMemo(() => new THREE.Vector2(), []);
  const hotspotMeshesRef = useRef<{ mesh: THREE.Mesh; hotspot: Hotspot }[]>([]);

  // Function to smoothly rotate the globe to center on a selected hotspot
  const jumpToHotspot = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    if (!globeGroupRef.current) return;

    const targetY = -((hotspot.lon + 90) * Math.PI) / 180;
    const targetX = (hotspot.lat * Math.PI) / 180 * 0.75;
    targetRotationRef.current = { x: targetX, y: targetY };
  };

  // Zoom control
  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    zoomLevelRef.current = Math.max(0.65, Math.min(1.8, zoomLevelRef.current + delta));
    cameraRef.current.position.z = 5.2 / zoomLevelRef.current;
  };

  // Fast toggle thermal on / off
  const toggleThermal = () => {
    setViewMode((prev) => (prev === 'thermal' ? 'natural' : 'thermal'));
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Sunlight + Ambient reflection)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const backRimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    backRimLight.position.set(-5, -2, -5);
    scene.add(backRimLight);

    // 3. Globe Parent Group for smooth rotational control
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.22; // 23.5° axial tilt
    globeGroup.rotation.y = 0.5;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // 4. Generate Real-World Earth Textures
    const naturalTex = createNaturalEarthTexture();
    const thermalTex = createThermalEarthTexture();
    const oceanTex = createOceanThermalTexture();
    const cloudTex = createEarthCloudTexture();
    naturalTextureRef.current = naturalTex;
    thermalTextureRef.current = thermalTex;
    oceanTextureRef.current = oceanTex;

    // 5. Real-World Earth Mesh
    const earthRadius = 1.8;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
    const initialMap = viewMode === 'thermal' ? thermalTex : viewMode === 'ocean' ? oceanTex : naturalTex;
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: initialMap,
      roughness: 0.7,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // 6. Translucent Real-World Cloud Layer
    const cloudGeometry = new THREE.SphereGeometry(earthRadius * 1.015, 48, 48);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTex,
      transparent: true,
      opacity: viewMode === 'natural' ? 0.65 : 0.22,
      blending: THREE.NormalBlending,
      depthWrite: false
    });
    const cloudsMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    globeGroup.add(cloudsMesh);
    cloudsMeshRef.current = cloudsMesh;

    // 7. Atmospheric Glow Horizon Layer
    const atmosphereGeometry = new THREE.SphereGeometry(earthRadius * 1.06, 40, 40);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: viewMode === 'thermal' ? 0xf97316 : viewMode === 'ocean' ? 0xef4444 : 0x087fce,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);
    atmosphereMeshRef.current = atmosphereMesh;

    // 8. 3D Hotspot Beacons & Pulsating Rings
    hotspotMeshesRef.current = [];
    const hotspotGroup = new THREE.Group();
    globeGroup.add(hotspotGroup);

    CLIMATE_HOTSPOTS.forEach((hotspot) => {
      const pos = latLonToVector3(hotspot.lat, hotspot.lon, earthRadius * 1.02);

      // Core Glowing Pin Sphere
      const pinGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: hotspot.tempAnomaly >= 3 ? 0xef4444 : 0xf97316,
        emissive: hotspot.tempAnomaly >= 3 ? 0xdc2626 : 0xea580c,
        emissiveIntensity: 0.8,
        roughness: 0.2
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      hotspotGroup.add(pinMesh);

      // Outer wave pulse ring
      const ringGeo = new THREE.RingGeometry(0.06, 0.085, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: hotspot.tempAnomaly >= 3 ? 0xef4444 : 0xf97316,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.002));
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      hotspotGroup.add(ringMesh);

      hotspotMeshesRef.current.push({ mesh: pinMesh, hotspot });
    });

    // 9. Interactive Mouse / Touch Dragging Orbit Controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
      targetRotationRef.current = null;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseCoords.x = (clientX / rect.width) * 2 - 1;
      mouseCoords.y = -(clientY / rect.height) * 2 + 1;

      if (!isDraggingRef.current) {
        raycaster.setFromCamera(mouseCoords, camera);
        const pinMeshes = hotspotMeshesRef.current.map((item) => item.mesh);
        const intersects = raycaster.intersectObjects(pinMeshes);

        if (intersects.length > 0) {
          const hit = hotspotMeshesRef.current.find((item) => item.mesh === intersects[0].object);
          if (hit) setHoveredHotspot(hit.hotspot);
        } else {
          setHoveredHotspot(null);
        }
        return;
      }

      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.y += deltaX * 0.006;
        globeGroupRef.current.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroupRef.current.rotation.x + deltaY * 0.006));
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseCoords.x = (clientX / rect.width) * 2 - 1;
      mouseCoords.y = -(clientY / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseCoords, camera);
      const pinMeshes = hotspotMeshesRef.current.map((item) => item.mesh);
      const intersects = raycaster.intersectObjects(pinMeshes);

      if (intersects.length > 0) {
        const hit = hotspotMeshesRef.current.find((item) => item.mesh === intersects[0].object);
        if (hit) jumpToHotspot(hit.hotspot);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleZoom(e.deltaY < 0 ? 0.08 : -0.08);
    };

    // Touch event handlers for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        targetRotationRef.current = null;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseRef.current.x;
        const deltaY = e.touches[0].clientY - prevMouseRef.current.y;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        if (globeGroupRef.current) {
          globeGroupRef.current.rotation.y += deltaX * 0.006;
          globeGroupRef.current.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroupRef.current.rotation.x + deltaY * 0.006));
        }
        if (e.cancelable) e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('click', onClick);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    // 10. Resize Observer
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 11. Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Clouds rotation
      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += delta * 0.035;
      }

      // Smooth target interpolation to hotspot
      if (targetRotationRef.current && globeGroupRef.current) {
        let diffY = targetRotationRef.current.y - globeGroupRef.current.rotation.y;
        while (diffY > Math.PI) diffY -= Math.PI * 2;
        while (diffY < -Math.PI) diffY += Math.PI * 2;

        globeGroupRef.current.rotation.y += diffY * 0.07;
        globeGroupRef.current.rotation.x += (targetRotationRef.current.x - globeGroupRef.current.rotation.x) * 0.07;

        if (Math.abs(diffY) < 0.008 && Math.abs(targetRotationRef.current.x - globeGroupRef.current.rotation.x) < 0.008) {
          targetRotationRef.current = null;
        }
      } else if (isRotating && !isDraggingRef.current && globeGroupRef.current) {
        globeGroupRef.current.rotation.y += rotationSpeed;
      }

      // Hotspot pulse
      hotspotMeshesRef.current.forEach(({ mesh }) => {
        const pulse = 1 + Math.sin(elapsedTime * 4) * 0.15;
        mesh.scale.set(pulse, pulse, pulse);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('click', onClick);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      earthGeometry.dispose();
      cloudGeometry.dispose();
      atmosphereGeometry.dispose();
      earthMaterial.dispose();
      cloudMaterial.dispose();
      atmosphereMaterial.dispose();
      naturalTex.dispose();
      thermalTex.dispose();
      oceanTex.dispose();
      cloudTex.dispose();
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  // Update textures and atmosphere styling when switching view modes
  useEffect(() => {
    if (!earthMeshRef.current || !atmosphereMeshRef.current || !cloudsMeshRef.current) return;

    const material = earthMeshRef.current.material as THREE.MeshStandardMaterial;
    const atmoMat = atmosphereMeshRef.current.material as THREE.MeshBasicMaterial;
    const cloudMat = cloudsMeshRef.current.material as THREE.MeshStandardMaterial;

    if (viewMode === 'thermal') {
      if (thermalTextureRef.current) material.map = thermalTextureRef.current;
      material.roughness = 0.55;
      material.needsUpdate = true;

      atmoMat.color.setHex(0xf97316); // Amber-red thermal aura
      atmoMat.opacity = 0.24;
      atmoMat.needsUpdate = true;

      cloudMat.opacity = 0.2;
      cloudMat.needsUpdate = true;
    } else if (viewMode === 'ocean') {
      if (oceanTextureRef.current) material.map = oceanTextureRef.current;
      material.roughness = 0.5;
      material.needsUpdate = true;

      atmoMat.color.setHex(0x38bdf8); // Ocean azure aura
      atmoMat.opacity = 0.22;
      atmoMat.needsUpdate = true;

      cloudMat.opacity = 0.3;
      cloudMat.needsUpdate = true;
    } else {
      if (naturalTextureRef.current) material.map = naturalTextureRef.current;
      material.roughness = 0.8;
      material.needsUpdate = true;

      atmoMat.color.setHex(0x087fce); // Cyan-blue atmosphere
      atmoMat.opacity = 0.16;
      atmoMat.needsUpdate = true;

      cloudMat.opacity = 0.65;
      cloudMat.needsUpdate = true;
    }
  }, [viewMode]);

  const isThermalActive = viewMode === 'thermal' || viewMode === 'ocean';

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background ambient cosmological backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/90 via-slate-950 to-black pointer-events-none" />
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-500 opacity-25"
        style={{
          background: isThermalActive ? 'rgba(239, 68, 68, 0.4)' : 'rgba(8, 127, 206, 0.35)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Thermal Mode Status */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-World 3D Earth Observation Globe</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Real-World Globe & <span className="text-[#34d399]">Live Thermal View</span>
            </h2>
            <p className="mt-3 text-base text-slate-400 max-w-2xl leading-relaxed">
              Explore dynamic real-world planetary telemetry. Drag to rotate across all oceans and continents, or activate the <strong className="text-amber-300">Live Thermal View</strong> to visualize global heat radiation and surface temperature anomalies.
            </p>
          </div>

          {/* Quick Thermal View Switcher in Header */}
          <div className="flex flex-wrap items-center gap-2.5 bg-slate-900/95 p-2 rounded-2xl border border-slate-800 shadow-xl self-start lg:self-auto">
            {/* Primary View in Thermal Option */}
            <button
              onClick={() => setViewMode('thermal')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                viewMode === 'thermal'
                  ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-lg shadow-red-900/40 ring-2 ring-amber-300/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title="View Globe in Thermal Infrared Heatmap"
            >
              <Flame className={`w-4 h-4 ${viewMode === 'thermal' ? 'text-amber-200 animate-pulse' : 'text-slate-400'}`} />
              <span>🔥 View in Thermal</span>
            </button>

            {/* Ocean SST Marine Heat View Option */}
            <button
              onClick={() => setViewMode('ocean')}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'ocean'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-blue-900/40 ring-1 ring-cyan-300/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title="View Sea Surface Temperature (SST) Marine Heatwaves"
            >
              <Waves className="w-4 h-4 text-cyan-300" />
              <span>Ocean Heat (SST)</span>
            </button>

            {/* Natural Satellite Option */}
            <button
              onClick={() => setViewMode('natural')}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'natural'
                  ? 'bg-gradient-to-r from-[#087FCE] to-[#16A34A] text-white shadow-lg shadow-emerald-900/40 ring-1 ring-emerald-300/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title="View Natural Satellite Blue Marble"
            >
              <Globe2 className="w-4 h-4 text-emerald-300" />
              <span>Natural Earth</span>
            </button>
          </div>
        </div>

        {/* Globe Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center 7 Cols: Three.js Real-World WebGL Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* Globe WebGL Container */}
            <div
              className={`relative w-full aspect-square max-w-[560px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing rounded-3xl bg-slate-900/40 border transition-all duration-300 shadow-2xl overflow-hidden ${
                isThermalActive ? 'border-amber-500/40 shadow-red-950/40' : 'border-slate-800/80 shadow-slate-950/60'
              }`}
              title="Click and drag to rotate the real-world globe"
            >
              {/* Three.js Canvas Mount */}
              <div ref={mountRef} className="w-full h-full touch-none" />

              {/* FLOATING ACTION PILL: Direct "View in Thermal" Toggle Right Over the Globe */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl">
                <button
                  onClick={() => setViewMode('natural')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    viewMode === 'natural'
                      ? 'bg-gradient-to-r from-[#087FCE] to-[#16A34A] text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Natural</span>
                </button>

                <button
                  onClick={() => setViewMode('thermal')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    viewMode === 'thermal'
                      ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-md shadow-red-900/40 ring-1 ring-amber-300/50'
                      : 'text-amber-400 hover:text-amber-300 bg-amber-500/10'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>🔥 View in Thermal</span>
                </button>

                <button
                  onClick={() => setViewMode('ocean')}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                    viewMode === 'ocean'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Waves className="w-3.5 h-3.5" />
                  <span>Ocean</span>
                </button>
              </div>

              {/* Orbital Telemetry HUD Tag (Top Left) */}
              <div className="absolute top-16 left-4 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-[10px] font-mono text-slate-200 flex items-center gap-2 pointer-events-none shadow-md">
                <span className={`w-2 h-2 rounded-full ${isThermalActive ? 'bg-red-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                <span>
                  {viewMode === 'thermal'
                    ? 'SENSOR: INFRARED THERMAL RADIOMETER'
                    : viewMode === 'ocean'
                    ? 'SENSOR: SEA SURFACE TEMPERATURE (SST)'
                    : 'SENSOR: NATURAL BLUE MARBLE SATELLITE'}
                </span>
              </div>

              {/* Zoom Buttons Overlay (Top Right) */}
              <div className="absolute top-16 right-4 flex flex-col gap-1.5 z-20">
                <button
                  onClick={() => handleZoom(0.18)}
                  className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center transition-colors shadow-md"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleZoom(-0.18)}
                  className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center transition-colors shadow-md"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>

              {/* Live Thermal Active Indicator Badge (Bottom Left) */}
              <div className="absolute bottom-4 left-4 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-[10px] font-mono flex items-center gap-1.5 text-slate-300 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>
                  {isThermalActive ? 'THERMAL SCAN: ACTIVE' : 'SATELLITE MODE: OPTICAL'}
                </span>
              </div>

              {/* Drag Interaction Label (Bottom Right) */}
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 pointer-events-none">
                360° DRAG TO ORBIT • PINCH TO ZOOM
              </div>
            </div>

            {/* Quick Action Floating Controls Below Globe */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {/* Instant View in Thermal Toggle Button */}
              <button
                onClick={toggleThermal}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                  viewMode === 'thermal'
                    ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white ring-1 ring-amber-300/40 shadow-red-900/50'
                    : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40'
                }`}
                title="Toggle between Thermal View and Natural Satellite View"
              >
                <Flame className="w-4 h-4" />
                <span>{viewMode === 'thermal' ? 'Thermal Mode: Active' : 'Switch to Thermal View'}</span>
              </button>

              <button
                onClick={() => setIsRotating(!isRotating)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {isRotating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isRotating ? 'Pause Orbit' : 'Resume Orbit'}</span>
              </button>

              <button
                onClick={() => {
                  if (globeGroupRef.current) {
                    targetRotationRef.current = { x: 0.22, y: 0.5 };
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reset View</span>
              </button>

              {/* Speed presets */}
              <div className="flex items-center gap-1 bg-slate-900 px-2 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">Speed:</span>
                {[0.0015, 0.003, 0.006].map((s, idx) => (
                  <button
                    key={s}
                    onClick={() => setRotationSpeed(s)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      rotationSpeed === s ? 'bg-[#087FCE] text-white' : 'hover:text-slate-200'
                    }`}
                  >
                    {idx === 0 ? '0.5x' : idx === 1 ? '1x' : '2x'}
                  </button>
                ))}
              </div>
            </div>

            {/* Thermal Heat Anomaly Scale Bar (Visible in Thermal & Ocean Modes) */}
            {isThermalActive && (
              <div className="mt-5 w-full max-w-md bg-slate-900/95 rounded-2xl p-4 border border-amber-500/30 shadow-lg">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <ThermometerSun className="w-3.5 h-3.5" />
                    Thermal Heat Anomaly Spectrum
                  </span>
                  <span className="text-slate-500 text-[11px]">1850-1900 Baseline Reference</span>
                </div>
                {/* Gradient color bar */}
                <div className="h-3 rounded-full w-full bg-gradient-to-r from-blue-700 via-emerald-500 via-yellow-400 via-orange-500 to-red-600 shadow-inner" />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
                  <span>-0.5°C Normal</span>
                  <span>+1.0°C</span>
                  <span>+2.0°C</span>
                  <span>+3.0°C</span>
                  <span className="text-red-400 font-bold">+3.8°C+ Extreme</span>
                </div>
              </div>
            )}
          </div>

          {/* Right 5 Cols: Selected Real-World Hotspot Inspector & Direct Hotspot Selector */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Active Hotspot Telemetry Card */}
            {selectedHotspot && (
              <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20"
                  style={{
                    backgroundColor: selectedHotspot.tempAnomaly >= 3 ? '#ef4444' : '#f97316'
                  }}
                />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {selectedHotspot.region}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                      {selectedHotspot.name}
                    </h3>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border shrink-0 ${
                      selectedHotspot.tempAnomaly >= 3
                        ? 'bg-red-500/10 border-red-500/40 text-red-400'
                        : 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                    }`}
                  >
                    +{selectedHotspot.tempAnomaly}°C Anomaly
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedHotspot.impact}
                </p>

                {/* Hotspot Coordinates & Live Metrics */}
                <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-800/80 text-xs">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Coordinates</span>
                    <span className="font-mono text-slate-200 font-semibold">
                      {Math.abs(selectedHotspot.lat)}°{selectedHotspot.lat >= 0 ? 'N' : 'S'},{' '}
                      {Math.abs(selectedHotspot.lon)}°{selectedHotspot.lon >= 0 ? 'E' : 'W'}
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Severity Level</span>
                    <span className={`font-bold ${selectedHotspot.status === 'Critical' ? 'text-red-400' : 'text-amber-400'}`}>
                      {selectedHotspot.status} Impact
                    </span>
                  </div>
                </div>

                {/* Action hint */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <Info className="w-3.5 h-3.5 text-[#087FCE] shrink-0" />
                  <span>The 3D globe automatically rotates and centers onto this location.</span>
                </div>
              </div>
            )}

            {/* Hotspot Direct Selector List */}
            <div className="bg-slate-900/60 rounded-3xl p-5 border border-slate-800">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Hotspot to Rotate Globe:
                </span>
                <span className="text-[11px] text-slate-500">{CLIMATE_HOTSPOTS.length} Monitored Fronts</span>
              </div>

              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
                {CLIMATE_HOTSPOTS.map((h) => {
                  const isSelected = selectedHotspot?.id === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => jumpToHotspot(h)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#087FCE]/20 border-[#087FCE] text-white shadow-sm'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            h.tempAnomaly >= 3 ? 'bg-red-500' : h.tempAnomaly >= 2.5 ? 'bg-orange-500' : 'bg-emerald-500'
                          }`}
                        />
                        <span className="font-semibold">{h.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400">+{h.tempAnomaly}°C</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
