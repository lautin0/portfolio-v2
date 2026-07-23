"use client";

import { useEffect, useRef } from "react";

/* WebGL "liquid" background ported from the design-system demo
   ("Tinsley Lau Portfolio.dc.html"). An fbm flow field fills the viewport;
   the uL uniform crossfades between the dark and light palettes, which are
   adapted here to the site's violet tokens instead of the demo's grays. */

const SPEED = 1;
const INTENSITY = 1;

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const FRAG = `
precision highp float;
uniform vec2 uR;uniform float uT;uniform float uA;uniform float uL;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);
for(int i=0;i<5;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}
void main(){
vec2 uv=gl_FragCoord.xy/uR;
vec2 p=uv*vec2(uR.x/uR.y,1.)*1.55;
float t=uT*.055;
vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t*.7));
vec2 r=vec2(fbm(p+3.4*q+vec2(1.7,9.2)+t*.85),fbm(p+3.4*q+vec2(8.3,2.8)-t*.5));
float f=fbm(p+3.0*r);
vec3 c1=mix(vec3(.043,.027,.086),vec3(.984,.980,.996),uL);
vec3 c2=mix(vec3(.082,.055,.157),vec3(.910,.886,.973),uL);
vec3 c3=mix(vec3(.208,.157,.369),vec3(.792,.741,.941),uL);
vec3 col=mix(c1,c2,smoothstep(.18,.78,f));
col=mix(col,c3,uA*smoothstep(.52,.98,f*f*2.1+q.y*.42));
col+=uA*.045*r.x*mix(1.,-.7,uL);
col*=1.-mix(.32,.10,uL)*distance(uv,vec2(.5,.45));
gl_FragColor=vec4(col,1.);}`;

export default function Liquid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false });
    if (!canvas || !gl) return; /* CSS fallback background stays */

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };
    size();

    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, "uR");
    const uT = gl.getUniformLocation(prog, "uT");
    const uA = gl.getUniformLocation(prog, "uA");
    const uL = gl.getUniformLocation(prog, "uL");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const start = performance.now();
    let raf = 0;
    let light = document.documentElement.dataset.theme === "light" ? 1 : 0;

    const draw = (now: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, ((now - start) / 1000) * SPEED);
      gl.uniform1f(uA, INTENSITY);
      const tgt = document.documentElement.dataset.theme === "light" ? 1 : 0;
      light += (tgt - light) * 0.06;
      gl.uniform1f(uL, light);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced || Math.abs(tgt - light) > 0.002)
        raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    /* under reduced motion the loop stops once the palette settles; a theme
       flip must restart it so uL can ease toward the new target */
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onResize = () => size();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="liquid-canvas pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
