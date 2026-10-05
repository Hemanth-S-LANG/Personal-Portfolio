import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    scene.add(group);

    // Responsive particle count: smooth 60fps across laptop & phone
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 1400 : 2400;

    // --- 1. CORE PARTICLES SPHERE ---
    const sphereRadius = 2.0;
    const spherePositions = new Float32Array(particleCount * 3);
    const sphereColors = new Float32Array(particleCount * 3);
    const sphereSizes = new Float32Array(particleCount);
    const sphereRandoms = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color('#00F0FF');
    const purple = new THREE.Color('#7A3CFF');
    const white = new THREE.Color('#FFFFFF');

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(phi);

      spherePositions[i * 3] = x;
      spherePositions[i * 3 + 1] = y;
      spherePositions[i * 3 + 2] = z;

      sphereRandoms[i * 3] = (Math.random() - 0.5) * 2;
      sphereRandoms[i * 3 + 1] = (Math.random() - 0.5) * 2;
      sphereRandoms[i * 3 + 2] = (Math.random() - 0.5) * 2;

      const mixRatio = (y + sphereRadius) / (sphereRadius * 2);
      const c = new THREE.Color();
      if (Math.random() > 0.8) {
        c.copy(white);
      } else {
        c.lerpColors(purple, cyan, mixRatio);
      }

      sphereColors[i * 3] = c.r;
      sphereColors[i * 3 + 1] = c.g;
      sphereColors[i * 3 + 2] = c.b;

      sphereSizes[i] = Math.random() * 3.5 + 1.5;
    }

    const sphereGeometry = new THREE.BufferGeometry();
    sphereGeometry.setAttribute('position', new THREE.BufferAttribute(spherePositions, 3));
    sphereGeometry.setAttribute('color', new THREE.BufferAttribute(sphereColors, 3));
    sphereGeometry.setAttribute('aSize', new THREE.BufferAttribute(sphereSizes, 1));
    sphereGeometry.setAttribute('aRandom', new THREE.BufferAttribute(sphereRandoms, 3));

    // Shader Material for Core Sphere
    const sphereMaterial = new THREE.ShaderMaterial({
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
        attribute vec3 aRandom;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          
          vec3 pos = position;
          float wave = sin(uTime * 1.5 + pos.x * 2.0 + pos.y * 3.0) * 0.15;
          pos += normal * wave;

          float dist = distance(uMouse, vec2(pos.x, pos.y) * 0.2);
          float force = smoothstep(1.5, 0.0, dist);
          pos += aRandom * force * 0.3;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * uDpr * (4.5 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          vAlpha = smoothstep(0.0, 1.5, -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float r = length(coord);
          if (r > 0.5) discard;

          float glow = smoothstep(0.5, 0.0, r);
          gl_FragColor = vec4(vColor, glow * 0.85 * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const spherePoints = new THREE.Points(sphereGeometry, sphereMaterial);
    group.add(spherePoints);

    // --- 2. ORBITAL RINGS ---
    const createRing = (radius: number, count: number, tiltX: number, tiltY: number, colorHex: string) => {
      const ringPositions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        ringPositions[i * 3] = Math.cos(angle) * radius;
        ringPositions[i * 3 + 1] = Math.sin(angle) * radius;
        ringPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
      }
      const ringGeo = new THREE.BufferGeometry();
      ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
      const ringMat = new THREE.PointsMaterial({
        color: new THREE.Color(colorHex),
        size: 0.035,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      const ringPoints = new THREE.Points(ringGeo, ringMat);
      ringPoints.rotation.x = tiltX;
      ringPoints.rotation.y = tiltY;
      return ringPoints;
    };

    const ring1 = createRing(2.8, isMobile ? 300 : 400, Math.PI / 4, 0, '#00F0FF');
    const ring2 = createRing(3.4, isMobile ? 400 : 600, -Math.PI / 3, Math.PI / 6, '#7A3CFF');
    group.add(ring1);
    group.add(ring2);

    // --- 3. BACKGROUND PARTICLES ---
    const bgCount = isMobile ? 300 : 500;
    const bgGeo = new THREE.BufferGeometry();
    const bgPos = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount * 3; i += 3) {
      bgPos[i] = (Math.random() - 0.5) * 16;
      bgPos[i + 1] = (Math.random() - 0.5) * 16;
      bgPos[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    const bgMat = new THREE.PointsMaterial({
      color: 0x4f46e5,
      size: 0.02,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const bgPoints = new THREE.Points(bgGeo, bgMat);
    scene.add(bgPoints);

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
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      sphereMaterial.uniforms.uDpr.value = Math.min(window.devicePixelRatio, 2);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      sphereMaterial.uniforms.uTime.value = elapsedTime;
      sphereMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);

      group.rotation.y = elapsedTime * 0.12 + mouse.x * 0.5;
      group.rotation.x = Math.sin(elapsedTime * 0.08) * 0.2 - mouse.y * 0.5;

      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.z = -elapsedTime * 0.2;

      bgPoints.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};


