import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Shield, BookOpen, FileText, ShoppingCart, Grid, Bot, Cpu } from 'lucide-react';

interface ProjectCanvasProps {
  projectId: string;
}

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

export const ProjectCanvas: React.FC<ProjectCanvasProps> = ({ projectId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState<boolean>(true);

  // Check on mount if device is mobile or WebGL is not supported
  useEffect(() => {
    const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;
    if (isMobileDevice || !isWebGLSupported()) {
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

    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 50);
    camera.position.z = 4;

    const group = new THREE.Group();
    scene.add(group);

    // Create 3D visual geometries
    if (projectId === 'cognitest') {
      const nodeCount = 30;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(nodeCount * 3);
      for (let i = 0; i < nodeCount * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 3.5;
        pos[i + 1] = (Math.random() - 0.5) * 2.2;
        pos[i + 2] = (Math.random() - 0.5) * 1.5;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.12,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      const sphereGeo = new THREE.IcosahedronGeometry(1.4, 2);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      });
      const shield = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(shield);
    } else if (projectId === 'lms') {
      const capTopGeo = new THREE.BoxGeometry(1.6, 0.08, 1.6);
      const capTopMat = new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true, transparent: true, opacity: 0.7 });
      const capTop = new THREE.Mesh(capTopGeo, capTopMat);
      capTop.rotation.y = Math.PI / 4;
      group.add(capTop);

      const capBaseGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 16);
      const capBaseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.5 });
      const capBase = new THREE.Mesh(capBaseGeo, capBaseMat);
      capBase.position.y = -0.3;
      group.add(capBase);
    } else if (projectId === 'my-notes-hub') {
      const stackGroup = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const blockGeo = new THREE.BoxGeometry(1.8 - i * 0.2, 0.4, 0.05);
        const blockMat = new THREE.MeshBasicMaterial({
          color: i === 0 ? 0x3ecf8e : i === 1 ? 0x38bdf8 : 0xa855f7,
          wireframe: true,
          transparent: true,
          opacity: 0.7 - i * 0.15
        });
        const block = new THREE.Mesh(blockGeo, blockMat);
        block.position.set(0, (i - 1) * 0.45, i * 0.2);
        stackGroup.add(block);
      }
      group.add(stackGroup);
    } else if (projectId === 'amazon-clone') {
      const cartGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const cartMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.6 });
      const cartMesh = new THREE.Mesh(cartGeo, cartMat);
      group.add(cartMesh);
    } else if (projectId === 'pixel-frame') {
      const gridGroup = new THREE.Group();
      for (let x = -2; x <= 2; x += 1) {
        for (let y = -1; y <= 1; y += 1) {
          const boxGeo = new THREE.BoxGeometry(0.7, 0.7, 0.1);
          const boxMat = new THREE.MeshBasicMaterial({
            color: (x + y) % 2 === 0 ? 0x38bdf8 : 0xa855f7,
            wireframe: true,
            transparent: true,
            opacity: 0.4
          });
          const box = new THREE.Mesh(boxGeo, boxMat);
          box.position.set(x * 0.85, y * 0.85, 0);
          gridGroup.add(box);
        }
      }
      group.add(gridGroup);
    } else if (projectId === 'multi-agent-ai') {
      const orbitGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 100);
      const orbitMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.4 });
      const ring = new THREE.Mesh(orbitGeo, orbitMat);
      group.add(ring);

      const agentCount = 4;
      for (let i = 0; i < agentCount; i++) {
        const angle = (i / agentCount) * Math.PI * 2;
        const agentGeo = new THREE.SphereGeometry(0.18, 16, 16);
        const agentMat = new THREE.MeshBasicMaterial({ color: i === 0 ? 0x34d399 : 0x38bdf8 });
        const agent = new THREE.Mesh(agentGeo, agentMat);
        agent.position.set(Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0);
        group.add(agent);
      }
    } else {
      const cubeGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const cubeMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      group.add(cube);
    }

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.4;
      group.rotation.x = Math.sin(t * 0.2) * 0.2;
      renderer?.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('resize', handleResize);
      renderer?.dispose();
    };
  }, [projectId, webGlAvailable]);

  // Fallback visual cards for mobile screens & when WebGL is unavailable
  if (!webGlAvailable) {
    return (
      <div className="w-full h-full min-h-[160px] xs:min-h-[180px] relative rounded-2xl overflow-hidden bg-slate-950/80 border border-white/10 p-5 flex flex-col justify-between group-hover:border-cyan-500/40 transition-colors">
        {/* Ambient Gradient Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

        {/* Card Content & Icon Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            {projectId === 'cognitest' && <Shield className="w-6 h-6 text-cyan-400" />}
            {projectId === 'lms' && <BookOpen className="w-6 h-6 text-emerald-400" />}
            {projectId === 'my-notes-hub' && <FileText className="w-6 h-6 text-purple-400" />}
            {projectId === 'amazon-clone' && <ShoppingCart className="w-6 h-6 text-amber-400" />}
            {projectId === 'pixel-frame' && <Grid className="w-6 h-6 text-sky-400" />}
            {projectId === 'multi-agent-ai' && <Bot className="w-6 h-6 text-purple-400" />}
            {!['cognitest', 'lms', 'my-notes-hub', 'amazon-clone', 'pixel-frame', 'multi-agent-ai'].includes(projectId) && (
              <Cpu className="w-6 h-6 text-cyan-400" />
            )}
          </div>

          <span className="text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
            {projectId === 'cognitest' && 'Egress SSRF Guard • ARQ Workers'}
            {projectId === 'lms' && 'Role Auth • Anti-Cheat Quizzes'}
            {projectId === 'my-notes-hub' && 'Block Editor • React 19'}
            {projectId === 'amazon-clone' && 'E-Commerce Microservice'}
            {projectId === 'pixel-frame' && 'Pixel Art Studio Grid'}
            {projectId === 'multi-agent-ai' && 'LangGraph Multi-Agent Cluster'}
            {!['cognitest', 'lms', 'my-notes-hub', 'amazon-clone', 'pixel-frame', 'multi-agent-ai'].includes(projectId) && 'Engineered Project'}
          </span>
        </div>

        {/* Visual Graphic Representation */}
        <div className="relative z-10 mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono-code text-slate-300 font-semibold">
              {projectId === 'cognitest' && 'FastAPI + Redis + SSE'}
              {projectId === 'lms' && 'MERN Stack + Mongoose'}
              {projectId === 'my-notes-hub' && 'PostgreSQL + dnd-kit'}
              {projectId === 'amazon-clone' && 'React + Stripe'}
              {projectId === 'pixel-frame' && 'TypeScript + Canvas'}
              {projectId === 'multi-agent-ai' && 'FastAPI + LangChain'}
              {!['cognitest', 'lms', 'my-notes-hub', 'amazon-clone', 'pixel-frame', 'multi-agent-ai'].includes(projectId) && 'Full-Stack Architecture'}
            </span>
          </div>

          <div className="text-[10px] font-mono-code text-slate-400">
            Active System
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full min-h-[180px] relative rounded-2xl overflow-hidden bg-black/40">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

