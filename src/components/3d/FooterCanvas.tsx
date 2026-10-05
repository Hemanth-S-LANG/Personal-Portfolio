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

export const FooterCanvas: React.FC = () => {
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
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebGlAvailable(false);
      return;
    }

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebGlAvailable(false);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 50);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    // --- 1. 3D PARTICLE WAVE LATTICE ---
    const width = 60;
    const height = 40;
    const particleCount = width * height;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const cyan = new THREE.Color('#38bdf8');
    const purple = new THREE.Color('#a855f7');

    let idx = 0;
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < height; z++) {
        const u = (x / width - 0.5) * 12;
        const v = (z / height - 0.5) * 8;

        positions[idx * 3] = u;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = v;

        const mixRatio = Math.sin(u * 0.5) * 0.5 + 0.5;
        const c = new THREE.Color().lerpColors(cyan, purple, mixRatio);
        colors[idx * 3] = c.r;
        colors[idx * 3 + 1] = c.g;
        colors[idx * 3 + 2] = c.b;

        sizes[idx] = Math.random() * 2.5 + 1.5;
        idx++;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    waveGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    waveGeometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const waveMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uDpr: { value: dpr }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uDpr;
        attribute vec3 color;
        attribute float aSize;
        varying vec3 vColor;

        void main() {
          vColor = color;
          vec3 pos = position;

          // Wave displacement equation
          float waveX = sin(uTime * 1.2 + pos.x * 0.8) * 0.35;
          float waveZ = cos(uTime * 1.5 + pos.z * 0.8) * 0.35;
          pos.y = waveX + waveZ;

          // Interactive mouse distortion
          float dist = distance(uMouse * 4.0, vec2(pos.x, pos.z));
          float push = smoothstep(2.5, 0.0, dist);
          pos.y += push * 0.8;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * uDpr * (3.5 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float r = length(coord);
          if (r > 0.5) discard;
          float glow = smoothstep(0.5, 0.0, r);
          gl_FragColor = vec4(vColor, glow * 0.7);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    group.add(wavePoints);

    // --- 2. FLOATING AMBIENT PARTICLES ---
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 14;
      starPos[i + 1] = Math.random() * 4;
      starPos[i + 2] = (Math.random() - 0.5) * 10;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

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
      const elapsedTime = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      waveMaterial.uniforms.uTime.value = elapsedTime;
      waveMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);

      group.rotation.y = elapsedTime * 0.05 + mouse.x * 0.2;
      starPoints.rotation.y = elapsedTime * 0.02;

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
      waveGeometry.dispose();
      waveMaterial.dispose();
    };
  }, [webGlAvailable]);

  if (!webGlAvailable) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#040508]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-60">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

