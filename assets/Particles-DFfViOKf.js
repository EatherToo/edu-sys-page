import{i as e}from"./rolldown-runtime-B1FJdls4.js";import{Xn as t}from"./vendor-antd-_util-4RDlIn8j.js";import{t as n}from"./vendor-react-D1dUkvlg.js";import{a as r,i,n as a,o,r as s}from"./vendor-visual-Cho35JK_.js";var c=e(t(),1),l=n(),u=[`#ffffff`,`#ffffff`,`#ffffff`];function d(e){let t=e.replace(/^#/,``);t.length===3&&(t=t.split(``).map(e=>e+e).join(``));let n=parseInt(t,16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}var f=`
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }
    
    gl_Position = projectionMatrix * mvPos;
  }
`,p=`
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;function m({particleCount:e=200,particleSpread:t=10,speed:n=.1,particleColors:m,moveParticlesOnHover:h=!1,particleHoverFactor:g=1,alphaParticles:_=!1,particleBaseSize:v=100,sizeRandomness:y=1,cameraDistance:b=20,disableRotation:x=!1,pixelRatio:S=Math.min(typeof window<`u`&&window.devicePixelRatio||1,2),className:C=``}){let w=(0,c.useRef)(null),T=(0,c.useRef)({x:0,y:0});return(0,c.useEffect)(()=>{let c=w.current;if(!c)return;let l=new i({dpr:S,depth:!1,alpha:!0}),C=l.gl;c.appendChild(C.canvas),C.clearColor(0,0,0,0);let E=new s(C,{fov:15});E.position.set(0,0,b);let D=()=>{let e=c.clientWidth,t=c.clientHeight;l.setSize(e,t),E.perspective({aspect:C.canvas.width/C.canvas.height})},O=new ResizeObserver(()=>D());O.observe(c),window.addEventListener(`resize`,D,!1),D();let k=e=>{let t=c.getBoundingClientRect();t.width<=0||t.height<=0||(T.current={x:(e.clientX-t.left)/t.width*2-1,y:-((e.clientY-t.top)/t.height*2-1)})};h&&window.addEventListener(`mousemove`,k,!1);let A=e,j=new Float32Array(A*3),M=new Float32Array(A*4),N=new Float32Array(A*3),P=m&&m.length>0?m:u;for(let e=0;e<A;e++){let t,n,r,i;do t=Math.random()*2-1,n=Math.random()*2-1,r=Math.random()*2-1,i=t*t+n*n+r*r;while(i>1||i===0);let a=Math.cbrt(Math.random());j.set([t*a,n*a,r*a],e*3),M.set([Math.random(),Math.random(),Math.random(),Math.random()],e*4);let o=d(P[Math.floor(Math.random()*P.length)]??`#ffffff`);N.set(o,e*3)}let F=new o(C,{position:{size:3,data:j},random:{size:4,data:M},color:{size:3,data:N}}),I=new r(C,{vertex:f,fragment:p,uniforms:{uTime:{value:0},uSpread:{value:t},uBaseSize:{value:v*S},uSizeRandomness:{value:y},uAlphaParticles:{value:+!!_}},transparent:!0,depthTest:!1}),L=new a(C,{mode:C.POINTS,geometry:F,program:I}),R,z=performance.now(),B=0,V=e=>{R=requestAnimationFrame(V);let t=e-z;z=e,B+=t*n,I.uniforms.uTime.value=B*.001,h?(L.position.x=-T.current.x*g,L.position.y=-T.current.y*g):(L.position.x=0,L.position.y=0),x||(L.rotation.x=Math.sin(B*2e-4)*.1,L.rotation.y=Math.cos(B*5e-4)*.15,L.rotation.z+=.01*n),l.render({scene:L,camera:E})};return R=requestAnimationFrame(V),()=>{O.disconnect(),window.removeEventListener(`resize`,D,!1),h&&window.removeEventListener(`mousemove`,k,!1),cancelAnimationFrame(R),c.contains(C.canvas)&&c.removeChild(C.canvas),F.remove(),I.remove()}},[e,t,n,h,g,_,v,y,b,x,S,m]),(0,l.jsx)(`div`,{ref:w,className:`particles-container ${C}`.trim()})}export{m as t};