import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const isWebGLSupported = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
};

export const AchievementsCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState<boolean>(true);

  useEffect(() => {
    if (!isWebGLSupported()) {
      setWebGlAvailable(false);
    }
  }, []);

  useEffect(() => {
    if (!webGlAvailable || !canvasRef.current || !containerRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      setWebGlAvailable(false);
      return;
    }

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebGlAvailable(false);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 50);
    camera.position.z = 5;

    const group = new THREE.Group();
    scene.add(group);

    // --- 3D KINETIC METALLIC GEOMETRY ---
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const outerMesh = new THREE.Mesh(icoGeo, icoMat);
    group.add(outerMesh);

    const innerGeo = new THREE.OctahedronGeometry(0.9, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Orbital Ring
    const torusGeo = new THREE.TorusGeometry(2.2, 0.015, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(torusGeo, torusMat);
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const updateCoords = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCoords(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      group.rotation.y = t * 0.3 + mouse.x * 0.5;
      group.rotation.x = Math.sin(t * 0.2) * 0.2 - mouse.y * 0.5;

      innerMesh.rotation.y = -t * 0.6;
      ring.rotation.z = t * 0.2;

      renderer?.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      renderer?.dispose();
      icoGeo.dispose();
      icoMat.dispose();
    };
  }, [webGlAvailable]);

  if (!webGlAvailable) {
    return (
      <div className="w-full h-full min-h-[120px] relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500/10 via-sky-500/5 to-transparent border border-amber-500/20 flex items-center justify-center p-3">
        <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg animate-pulse">
          🏆
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full min-h-[220px] relative pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

