import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

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
      const shaderMaterial = meshRef.current.material as THREE.ShaderMaterial;
      shaderMaterial.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
      shaderMaterial.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

type ShaderBackgroundCanvasProps = {
  className?: string;
};

export default function ShaderBackgroundCanvas({ className = "w-full h-full" }: ShaderBackgroundCanvasProps) {
  const shaderUniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
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
  `;

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
