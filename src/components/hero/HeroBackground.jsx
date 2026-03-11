import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const HeroBackground = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const frameRef = useRef();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 480);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isMobile) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    let scene, camera, renderer, particles, geometry, material;

    const initThree = async () => {
      try {
        const THREE = await import('three');

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(dpr);
        renderer.setClearColor(0x000000, 0);

        const count = isMobile ? 800 : 1600;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 20;
          positions[i + 1] = (Math.random() - 0.5) * 20;
          positions[i + 2] = (Math.random() - 0.5) * 10;
        }

        geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const color = isDark ? 0x6366f1 : 0x818cf8;
        material = new THREE.PointsMaterial({
          size: 0.03,
          color,
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true,
        });
        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const handleResize = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };

        const handleMouse = (e) => {
          mouseRef.current.x = e.clientX / width;
          mouseRef.current.y = 1 - e.clientY / height;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouse);

        const animate = () => {
          frameRef.current = requestAnimationFrame(animate);
          if (!particles) return;
          const time = performance.now() * 0.001;
          particles.rotation.y = time * 0.05 + (mouseRef.current.x - 0.5) * 0.5;
          particles.rotation.x = (mouseRef.current.y - 0.5) * 0.3;
          const pos = particles.geometry.attributes.position.array;
          for (let i = 1; i < pos.length; i += 3) {
            pos[i] += Math.sin(time + pos[i - 1]) * 0.002;
          }
          particles.geometry.attributes.position.needsUpdate = true;
          renderer.render(scene, camera);
        };
        animate();

        return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('mousemove', handleMouse);
          cancelAnimationFrame(frameRef.current);
          geometry?.dispose();
          material?.dispose();
          renderer?.dispose();
        };
      } catch (e) {
        console.warn('Three.js failed to load:', e);
      }
    };

    initThree();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isDark, isMobile]);

  if (isMobile) {
    return (
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(16,185,129,0.1) 50%, rgba(99,102,241,0.1) 100%)',
        }}
      />
    );
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ background: 'transparent' }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, var(--bg-primary) 70%)',
        }}
      />
    </>
  );
};

export default HeroBackground;
