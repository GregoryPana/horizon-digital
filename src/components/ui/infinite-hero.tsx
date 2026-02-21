"use client";

import { useGSAP } from "@gsap/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import Button from "../Button";
import { ShimmerButton } from "./shimmer-button";

interface ShaderPlaneProps {
  vertexShader: string;
  fragmentShader: string;
  uniforms: { [key: string]: { value: unknown } };
}

function ShaderPlane({ vertexShader, fragmentShader, uniforms }: ShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
      }),
    [vertexShader, fragmentShader, uniforms]
  );

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

interface ShaderBackgroundProps {
  vertexShader?: string;
  fragmentShader?: string;
  uniforms?: { [key: string]: { value: unknown } };
  className?: string;
}

function ShaderBackground({
  vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader = `
    precision highp float;

    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_resolution;

    #define STEP 256
    #define EPS .001

    float smin( float a, float b, float k )
    {
      float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
      return mix( b, a, h ) - k*h*(1.0-h);
    }

    const mat2 m = mat2(.8,.6,-.6,.8);

    float noise( in vec2 x )
    {
      return sin(1.5*x.x)*sin(1.5*x.y);
    }

    float fbm6( vec2 p )
    {
      float f = 0.0;
      f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
      f += 0.250000*(0.5+0.5*noise( p )); p = m*p*2.03;
      f += 0.125000*(0.5+0.5*noise( p )); p = m*p*2.01;
      f += 0.062500*(0.5+0.5*noise( p )); p = m*p*2.04;
      f += 0.015625*(0.5+0.5*noise( p ));
      return f/0.96875;
    }

    mat2 getRot(float a)
    {
      float sa = sin(a), ca = cos(a);
      return mat2(ca,-sa,sa,ca);
    }

    vec3 _position;

    float sphere(vec3 center, float radius)
    {
      return distance(_position,center) - radius;
    }

    float swingPlane(float height)
    {
      vec3 pos = _position + vec3(0.,0.,u_time * 5.5);
      float def =  fbm6(pos.xz * .25) * 0.5;
      float way = pow(abs(pos.x) * 34. ,2.5) *.0000125;
      def *= way;
      float ch = height + def;
      return max(pos.y - ch,0.);
    }

    float map(vec3 pos)
    {
      _position = pos;
      float dist;
      dist = swingPlane(0.);
      float sminFactor = 5.25;
      dist = smin(dist,sphere(vec3(0.,-15.,80.),60.),sminFactor);
      return dist;
    }

    vec3 getNormal(vec3 pos)
    {
      vec3 nor = vec3(0.);
      vec3 vv = vec3(0.,1.,-1.)*.01;
      nor.x = map(pos + vv.zxx) - map(pos + vv.yxx);
      nor.y = map(pos + vv.xzx) - map(pos + vv.xyx);
      nor.z = map(pos + vv.xxz) - map(pos + vv.xxy);
      nor /= 2.;
      return normalize(nor);
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = (fragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
      vec3 rayOrigin = vec3(uv + vec2(0.,6.), -1. );
      vec3 rayDir = normalize(vec3(uv , 1.));
      rayDir.zy = getRot(.15) * rayDir.zy;
      vec3 position = rayOrigin;
      float curDist;
      int nbStep = 0;

      for(; nbStep < STEP;++nbStep)
      {
        curDist = map(position);
        if(curDist < EPS)
          break;
        position += rayDir * curDist * .5;
      }

      float f;
      float dist = distance(rayOrigin,position);
      f = dist /(98.);
      f = float(nbStep) / float(STEP);
      f *= .9;
      vec3 teal = vec3(0.13, 0.95, 0.85);
      vec3 gold = vec3(0.97, 0.83, 0.42);
      float gradient = smoothstep(0.0, 1.0, vUv.y);
      vec3 tint = mix(teal, gold, gradient);
      vec3 col = tint * f;
      fragColor = vec4(col,1.0);
    }

    void main() {
      vec4 fragColor;
      vec2 fragCoord = vUv * u_resolution.xy;
      mainImage(fragColor, fragCoord);
      gl_FragColor = fragColor;
    }
  `,
  uniforms = {},
  className = "w-full h-full",
}: ShaderBackgroundProps) {
  const shaderUniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
      ...uniforms,
    }),
    [uniforms]
  );

  return (
    <div className={className}>
      <Canvas className={className}>
        <ShaderPlane
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={shaderUniforms}
        />
      </Canvas>
    </div>
  );
}

export default function InfiniteHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctas = ctaRef.current ? Array.from(ctaRef.current.children) : [];

      if (!bgRef.current || !h1Ref.current || !pRef.current) return;

      gsap.set(bgRef.current, { filter: "blur(24px)" });
      gsap.set([h1Ref.current, pRef.current], {
        opacity: 0,
        y: 24,
        filter: "blur(8px)",
      });
      if (ctas.length) gsap.set(ctas, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(bgRef.current, { filter: "blur(0px)", duration: 1.2 }, 0)
        .to(
          h1Ref.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
          },
          0.3
        )
        .to(
          pRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
          },
          0.5
        )
        .to(ctas, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.7);
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="relative h-[90svh] w-full overflow-hidden bg-bg text-text md:h-svh"
    >
      <div className="absolute inset-0 brightness-110 md:brightness-100">
        <div className="absolute inset-0 hidden md:block" ref={bgRef}>
          <ShaderBackground className="h-full w-full" />
        </div>
        <div className="absolute inset-0 md:hidden">
          <div className="h-full w-full bg-gradient-to-br from-accent/45 via-transparent to-accent-2/45" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_50%_50%,_transparent_28%,_rgba(2,8,10,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(65%_45%_at_50%_45%,_rgba(7,20,22,0.0)_0%,_rgba(7,20,22,0.35)_70%,_rgba(7,20,22,0.65)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg/70 to-bg" />

      <div className="relative z-10 flex h-[90svh] w-full items-center justify-center px-6 md:h-svh md:px-8">
        <div className="text-center">
          <p className="hero-brand-glow text-base uppercase tracking-[0.45em] text-accent">
            Horizon Digital
          </p>
          <p className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-text/60 leading-tight md:mt-2 md:text-xs md:tracking-[0.4em]">
            Built for growing businesses in Seychelles and beyond.
          </p>
          <div className="mx-auto mt-6 h-px w-20 horizon-line md:mt-8 md:w-32" />
          <h1
            ref={h1Ref}
            className="mx-auto mt-6 max-w-3xl text-[clamp(2.35rem,5.4vw,4rem)] font-light leading-[0.98] tracking-tight md:mt-10"
          >
            <span className="block font-normal leading-[0.92] md:leading-[0.98]">
              Empowering Your
            </span>
            <span className="hero-glow-text text-accent">Digital Horizon</span>
          </h1>
          <p
            ref={pRef}
            className="mx-auto mt-6 max-w-2xl text-sm/7 md:text-base/7 font-light tracking-tight text-text/80"
          >
            <span className="block">Modern, high-performance websites,</span>
            <span className="block">built for clarity, speed, and conversion.</span>
          </p>

          <div className="mt-6 flex flex-col items-center">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <div className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.32em] text-text/70">
              <span>Fast</span>
              <span className="text-[10px] text-accent-2">•</span>
              <span>Secure</span>
              <span className="text-[10px] text-accent-2">•</span>
              <span>Optimized</span>
            </div>
          </div>

          <div ref={ctaRef} className="mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-6">
            <Link to="/contact" className="w-full sm:w-auto">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="linear-gradient(135deg, rgba(34,241,214,0.95), rgba(34,241,214,0.7))"
                className="w-full px-7 py-3.5 text-base font-semibold tracking-[0.08em] text-black"
              >
                Book a free consult
              </ShimmerButton>
            </Link>
            <Button
              label="View work"
              to="/work"
              variant="outline"
              size="lg"
              className="w-full border-accent-2/60 text-accent-2/80 hover:border-accent-2 hover:text-accent-2 sm:w-auto"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent blur-[0.2px]" />
    </div>
  );
}
