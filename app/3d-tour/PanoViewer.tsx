"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { src: string; alt: string };

// Drag-to-look equirectangular panorama viewer.
export default function PanoViewer({ src, alt }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 100);

    const geometry = new THREE.SphereGeometry(10, 60, 40);
    geometry.scale(-1, 1, 1); // view the texture from inside the sphere
    const texture = new THREE.TextureLoader().load(src);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    scene.add(new THREE.Mesh(geometry, material));

    let lon = -30; // start facing the Red Rock cliffs
    let lat = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let idle = true;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      idle = false;
      lastX = e.clientX;
      lastY = e.clientY;
      mount.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      lon -= (e.clientX - lastX) * 0.15;
      lat += (e.clientY - lastY) * 0.15;
      lat = Math.max(-80, Math.min(80, lat));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.fov = Math.max(35, Math.min(90, camera.fov + e.deltaY * 0.05));
      camera.updateProjectionMatrix();
    };
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    mount.addEventListener("pointerdown", onDown);
    mount.addEventListener("pointermove", onMove);
    mount.addEventListener("pointerup", onUp);
    mount.addEventListener("pointercancel", onUp);
    mount.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);

    const target = new THREE.Vector3();
    renderer.setAnimationLoop(() => {
      if (idle) lon += 0.03;
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);
      target.setFromSphericalCoords(1, phi, theta);
      camera.lookAt(target);
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      mount.removeEventListener("pointerdown", onDown);
      mount.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerup", onUp);
      mount.removeEventListener("pointercancel", onUp);
      mount.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [src]);

  return (
    <div ref={mountRef} className="viewer" role="img" aria-label={alt}>
      <span className="hint">Drag to look around</span>
    </div>
  );
}
