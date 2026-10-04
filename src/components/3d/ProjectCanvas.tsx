import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProjectCanvasProps {
  projectId: string;
}

export const ProjectCanvas: React.FC<ProjectCanvasProps> = ({ projectId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 50);
    camera.position.z = 4;

    const group = new THREE.Group();
    scene.add(group);

    // Create 3D visuals based on Project ID
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
      // 3D Graduation Cap / Course Nodes Mesh
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
      // 3D E-Commerce Shopping Grid Box
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
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.4;
      group.rotation.x = Math.sin(t * 0.2) * 0.2;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [projectId]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[180px] relative rounded-2xl overflow-hidden bg-black/40">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
