let e;var t;let r;var n;(t=e||(e={}))[t.START=0]="START",t[t.CENTER=1]="CENTER",t[t.END=2]="END",t[t.SPACE_EVENLY=3]="SPACE_EVENLY",t[t.SPACE_BETWEEN=4]="SPACE_BETWEEN",(n=r||(r={}))[n.START=0]="START",n[n.CENTER=1]="CENTER",n[n.END=2]="END";const i=({haystack:e,needle:t})=>{let r=0,n=0;for(;n<t.length;){const i=t[n].toLowerCase();for(;r<e.length&&i!==e[r].toLowerCase();)++r;if(r===e.length)return!1;++n}return!0},s=({width:e,height:t})=>[2/e,0,-1,0,-2/t,1,0,0,1],o=(e,t)=>[1,0,e,0,1,t,0,0,1],a=(e,t)=>[e,0,0,0,t,0,0,0,1],c=(...e)=>{const[t,...r]=e;return r.reduce(((e,t)=>{const r=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],d=e[7],h=e[8],l=t[0],u=t[1],x=t[2],p=t[3],g=t[4],m=t[5],f=t[6],E=t[7],y=t[8];return[r*l+n*p+i*f,r*u+n*g+i*E,r*x+n*m+i*y,s*l+o*p+a*f,s*u+o*g+a*E,s*x+o*m+a*y,c*l+d*p+h*f,c*u+d*g+h*E,c*x+d*m+h*y]}),t)},d=(e,t)=>{const r=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],d=e[7],h=e[8],l=t[0],u=t[1],x=t[2];return[r*l+n*u+i*x,s*l+o*u+a*x,c*l+d*u+h*x]},h=e=>{const t=e[0],r=e[1],n=e[2],i=e[3],s=e[4],o=e[5],a=e[6],c=e[7],d=e[8],h=r*o-n*s,l=t*o-n*i,u=t*s-r*i,x=1/(a*h-c*l+d*u);return[x*(s*d-o*c),x*-(r*d-n*c),x*h,x*-(i*d-o*a),x*(t*d-n*a),x*-l,x*(i*c-s*a),x*-(t*c-r*a),x*u]},l=([e,t,r])=>Math.sqrt(Math.pow(e,2)+Math.pow(t,2)+Math.pow(r,2));let u;var x;(x=u||(u={}))[x.POINTER_MOVE=0]="POINTER_MOVE",x[x.POINTER_DOWN=1]="POINTER_DOWN",x[x.POINTER_UP=2]="POINTER_UP",x[x.CLICKED_NODE=3]="CLICKED_NODE",x[x.WHEEL=4]="WHEEL",x[x.CLICKED_INPUT=5]="CLICKED_INPUT",x[x.CLICKED_OUTPUT=6]="CLICKED_OUTPUT",x[x.DOUBLE_CLICK_TIMEOUT=7]="DOUBLE_CLICK_TIMEOUT",x[x.DOUBLE_CLICK=8]="DOUBLE_CLICK",x[x.KEYDOWN=9]="KEYDOWN",x[x.VIRTUAL_KEYDOWN=10]="VIRTUAL_KEYDOWN";const p=(e,t)=>{if(!e.dragging&&!e.zooming)return{state:e,rerender:!1};const r=e.pointers.findIndex((e=>e.id===t.pointer.id)),n=e.pointers[r];if(e.pointers[r]=t.pointer,e.dragging){const r=t.pointer.x-n.x,i=t.pointer.y-n.y;if(null!==e.draggedNode){const t=l(d(e.camera,[0,1,0])),n=e.graph.nodes[e.draggedNode];n.x+=r*t,n.y+=i*t}else e.camera=c(e.camera,o(-r,-i));return{state:e,render:!0}}if(e.zooming){const[t,r]=[e.pointers[0],e.pointers[1]],[n,i]=[t.x,t.y],[s,d]=[r.x,r.y],h=Math.sqrt(Math.pow(s-n,2)+Math.pow(d-i,2)),l=e.pointerDistance,u=e.pointerCenter;e.pointerDistance=h;const x=(t.x+r.x)/2,p=(t.y+r.y)/2;if(e.pointerCenter=[x,p],l>0){const t=o(x,p),r=Math.pow(2,.01*(l-h)),n=o(-x,-p),i=x-u[0],s=p-u[1];return e.camera=c(e.camera,t,a(r,r),n,o(-i,-s)),{state:e,render:!0}}return{state:e}}return{state:e}},g=e=>(e.finder.options=Object.keys(e.operations).filter((t=>i({haystack:t,needle:e.finder.search}))).slice(0,5),e);class m{constructor(e,t,r,n){this.top=e,this.right=t,this.bottom=r,this.left=n}}const f=e=>new m(e,e,e,e),E=({x0:e,y0:t,x1:r,y1:n},i)=>e<=i.x&&i.x<=r&&t<=i.y&&i.y<=n,y=(e,t)=>{for(let r=e.clickHandlers.length;r>0;--r)for(const{onClick:n,worldSpace:i}of e.clickHandlers[r-1])if(E(i,t))return n(t),e;return e},A=e=>({vertices:[],colors:[],vertexIndices:[],textureIndex:e,textureCoordinates:[],cameraIndex:[]}),I=e=>{const t=[];let r=A(0);for(const n of e)for(const[e,i]of n){r.textureIndex!==e&&(0!==r.vertices.length&&t.push(r),r=A(e));for(const e of i){const t=r.vertices.length/2;r.vertices.push(...e.vertices),r.colors.push(...e.colors);for(const n of e.vertexIndices)r.vertexIndices.push(n+t);r.textureCoordinates.push(...e.textureCoordinates),r.cameraIndex.push(...e.cameraIndex)}}return 0!==r.vertices.length&&t.push(r),t};class w{constructor(){const e=[1,0,0,0,1,0,0,0,1];this.cameras=[[1,0,0,0,1,0,0,0,1]],this.stack=[0],this.transform=h(e)}pushCamera=e=>{const t=this.cameras.length;this.cameras.push(e),this.stack.push(t),this.transform=h(e)};popCamera=()=>{this.stack.pop(),this.transform=h(this.cameras[this.activeCamera()])};activeCamera=()=>this.stack.slice(-1)[0];transformWorldSpace=e=>{const[t,r,n]=d(this.transform,[e.x0,e.y0,1]),[i,s,o]=d(this.transform,[e.x1,e.y1,1]);return{x0:t,y0:r,x1:i,y1:s}}}const T=(e,t,r,n)=>{const i=n.initial();for(const s of e.traverse(t,r,0))n.combine(i,s);return i},C={initial:()=>({}),combine:(e,t)=>t.ui.id?(e[t.ui.id]=t.geometry.worldSpace,e):e};function*R(e,t,r){const n=(t.x0+t.x1)/2,i=(t.y0+t.y1)/2,s=n+50,o=i,a=(r.x0+r.x1)/2,c=(r.y0+r.y1)/2,d=a-50,h=c;let l=0,u=0,x=!0;for(const t of e){const e=t*t,r=e*t,p=1-t,g=p*p,m=g*p,f=3*g*t,E=3*p*e,y=m*n+f*s+E*d+r*a,A=m*i+f*o+E*h+r*c;x?(yield y,yield A,x=!1):(yield l,yield u),yield y,yield A,l=y,u=A}}const _=(e,t)=>{const r=((e,t,r)=>{const n=(t-e)/(r-1);return Array.from({length:r},((t,r)=>e+n*r))})(0,1,20),n=[],i=[];for(const{from:s,to:o,color:a}of e){for(const e of R(r,t[s],t[o]))n.push(e);const{red:e,green:c,blue:d,alpha:h}=a;for(let t=0;t<40;++t)i.push(e,c,d,h)}return{vertices:n,colors:i}},v=()=>[],b=(e,t)=>{if(0==t.geometry.vertices.length)return e;const r=t.z-e.length+1;for(let t=0;t<r;++t)e.push(new Map);const n=e[t.z];return(()=>{const e=n.get(t.geometry.textureIndex);if(e)return e;const r=[];return n.set(t.geometry.textureIndex,r),r})().push(t.geometry),e},D=()=>[],S=(e,t)=>{if(!t.ui.onClick)return e;const r=t.z-e.length+1;for(let t=0;t<r;++t)e.push([]);return e[t.z].push({onClick:t.ui.onClick,worldSpace:t.geometry.worldSpace}),e},N=()=>[],z=(e,t)=>t.ui.connections?(e.push(...t.ui.connections),e):e,L={initial:()=>({layers:v(),clickHandlers:D(),idToWorldSpace:C.initial(),connections:N()}),combine:(e,t)=>({layers:b(e.layers,t),clickHandlers:S(e.clickHandlers,t),idToWorldSpace:C.combine(e.idToWorldSpace,t),connections:z(e.connections,t)})},U=(e,t)=>{const{width:r,height:n}=e.size;e.clear();const i={minWidth:0,maxWidth:r,minHeight:0,maxHeight:n},s=t.layout(i,e.measureText),o=new w,a=t.geometry(s,{x:0,y:0},o),{layers:c,clickHandlers:d,connections:h,idToWorldSpace:l}=T(t,s,a,L),u=I(c),x=_(h,l);e.cameras=o.cameras,e.clickHandlers=d;for(const t of u)e.draw(t);return x.vertices.length&&e.drawLines(x),e};class P{constructor(e,t,r,n,i,s,o,a){this.window=e,this.document=t,this.canvas=r,this.gl=n,this.program=i,this.textures=s,this.textMeasurementsCache=o,this.clickHandlers=a,this.clear=()=>{const{gl:e}=this;e.clear(e.COLOR_BUFFER_BIT)},this.draw=({vertices:e,colors:t,vertexIndices:r,textureCoordinates:n,textureIndex:i,cameraIndex:s})=>{const{gl:o,program:a,textures:c}=this,{attributes:d}=a,h=c[i];o.bindTexture(o.TEXTURE_2D,h),o.bindBuffer(o.ARRAY_BUFFER,d.vertices.buffer),o.bufferData(o.ARRAY_BUFFER,new Float32Array(e),o.STATIC_DRAW),o.bindBuffer(o.ARRAY_BUFFER,d.colors.buffer),o.bufferData(o.ARRAY_BUFFER,new Float32Array(t),o.STATIC_DRAW),o.bindBuffer(o.ARRAY_BUFFER,d.textureCoordinates.buffer),o.bufferData(o.ARRAY_BUFFER,new Float32Array(n),o.STATIC_DRAW),o.bindBuffer(o.ARRAY_BUFFER,d.cameraIndex.buffer),o.bufferData(o.ARRAY_BUFFER,new Uint8Array(s),o.STATIC_DRAW),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,d.vertexIndices),o.bufferData(o.ELEMENT_ARRAY_BUFFER,new Uint16Array(r),o.STATIC_DRAW),o.drawElements(o.TRIANGLES,r.length,o.UNSIGNED_SHORT,0)},this.drawLines=({vertices:e,colors:t})=>{const{gl:r,program:n,textures:i}=this,{attributes:s}=n,o=i[0],a=e.length/2;r.bindTexture(r.TEXTURE_2D,o),r.bindBuffer(r.ARRAY_BUFFER,s.vertices.buffer),r.bufferData(r.ARRAY_BUFFER,new Float32Array(e),r.STATIC_DRAW),r.bindBuffer(r.ARRAY_BUFFER,s.colors.buffer),r.bufferData(r.ARRAY_BUFFER,new Float32Array(t),r.STATIC_DRAW),r.bindBuffer(r.ARRAY_BUFFER,s.textureCoordinates.buffer),r.bufferData(r.ARRAY_BUFFER,new Float32Array(Array(2*a).fill(0)),r.STATIC_DRAW),r.bindBuffer(r.ARRAY_BUFFER,s.cameraIndex.buffer),r.bufferData(r.ARRAY_BUFFER,new Uint8Array(Array(a).fill(0)),r.STATIC_DRAW),r.drawArrays(r.LINES,0,a)},this.getTextureMeasurements=(e,t)=>{const{document:r,gl:n}=this,i=`${t} ${e.size} ${e.family}`,s=this.textMeasurementsCache.get(i);if(s)return s;const{texture:o,widths:a,textureCoordinates:c}=((e,t,r,n)=>{const i=e.createElement("canvas"),s=i.getContext("2d"),o=Math.sqrt(256),a=(e=>{let t=1;for(;t<e;)t<<=1;return t})(r.size*o),c=a/o;i.width=a*n,i.height=a*n,i.style.width=`${a}px`,i.style.height=`${a}px`,s.scale(n,n),s.textAlign="left",s.textBaseline="top",s.font=`${r.size}px ${r.family}`,s.fillStyle="white",s.clearRect(0,0,s.canvas.width,s.canvas.height);const d=r.size,h=[],l=[];for(let e=0;e<256;++e){const t=String.fromCharCode(e),r=s.measureText(t),n=Math.ceil(r.width),i=e%o*c,u=Math.floor(e/o)*c;s.fillText(t,i,u),h.push(n);const x=i/a,p=(i+n)/a,g=u/a,m=(u+d)/a;l.push([x,g,x,m,p,g,p,m])}const u=t.createTexture();return t.bindTexture(t.TEXTURE_2D,u),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,i),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),{widths:h,textureCoordinates:l,texture:u}})(r,n,e,t),d=this.textures.length;this.textures.push(o);const h={widths:a,textureIndex:d,textureCoordinates:c};return this.textMeasurementsCache.set(i,h),h},this.measureText=(e,t)=>{const{window:r}=this,n=r.devicePixelRatio,{widths:i,textureIndex:s,textureCoordinates:o}=this.getTextureMeasurements(e,n),a=((e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(t(e[n],n));return r})(t,(e=>e.charCodeAt(0)));return{widths:a.map((e=>i[e])),textureIndex:s,textureCoordinates:a.map((e=>o[e]))}}}set size(e){const{gl:t,program:r,window:n}=this,{uniforms:i}=r,{canvas:o}=t;t.uniformMatrix3fv(i.projection,!0,s(e)),o.width=e.width*n.devicePixelRatio,o.height=e.height*n.devicePixelRatio,o.style.width=`${e.width}px`,o.style.height=`${e.height}px`,t.viewport(0,0,o.width,o.height),this._size=e}get size(){return this._size}set cameras(e){const{gl:t,program:r}=this,{uniforms:n}=r,i=[];for(const t of e)i.push(...t);t.uniformMatrix3fv(n.cameras,!0,i),this._cameras=e}get cameras(){return this._cameras}}const O=({width:e,height:t,document:r,window:n})=>{const i=r.createElement("canvas");i.style.touchAction="none";const s=i.getContext("webgl2");s.enable(s.BLEND),s.blendFunc(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA),s.depthMask(!1),s.activeTexture(s.TEXTURE0),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),s.clearColor(0,0,0,1);const o=(e=>{const t={vertices:{location:0,buffer:e.createBuffer()},colors:{location:1,buffer:e.createBuffer()},textureCoordinates:{location:2,buffer:e.createBuffer()},cameraIndex:{location:3,buffer:e.createBuffer()},vertexIndices:e.createBuffer()},r=((e,t)=>{const{vertices:r,colors:n,textureCoordinates:i,cameraIndex:s}=t,o=`#version 300 es\n  uniform mat3 u_projection;\n  uniform mat3 u_cameras[8];\n\n  layout(location = ${r.location}) in vec2 a_vertex;\n  layout(location = ${n.location}) in vec4 a_color;\n  layout(location = ${i.location}) in vec2 a_textureCoordinates;\n  layout(location = ${s.location}) in uint a_cameraIndex;\n\n  out vec4 v_color;\n  out vec2 v_textureCoordinates;\n\n  void main() {\n    mat3 camera = u_cameras[a_cameraIndex];\n    mat3 transform = u_projection * inverse(camera);\n    gl_Position = vec4((transform * vec3(a_vertex, 1)).xy, 0, 1);\n    v_color = a_color / 255.0;\n    v_textureCoordinates = a_textureCoordinates;\n  }\n  `,a=e.createShader(e.VERTEX_SHADER);return e.shaderSource(a,o),e.compileShader(a),a})(e,t),n=(e=>{const t=e.createShader(e.FRAGMENT_SHADER);return e.shaderSource(t,"#version 300 es\n  precision highp float;\n\n  uniform sampler2D u_texture;\n\n  in vec4 v_color;\n  in vec2 v_textureCoordinates;\n\n  out vec4 fragColor;\n  \n  void main() {\n    fragColor = texture(u_texture, v_textureCoordinates) * v_color;\n  }\n  "),e.compileShader(t),t})(e),i=e.createProgram();e.attachShader(i,r),e.attachShader(i,n),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)||(console.log(e.getShaderInfoLog(r)),console.log(e.getShaderInfoLog(n))),e.useProgram(i);const s=e.createVertexArray();return e.bindVertexArray(s),((e,t,{location:r,buffer:n})=>{e.bindAttribLocation(t,r,"a_vertex"),e.enableVertexAttribArray(r),e.bindBuffer(e.ARRAY_BUFFER,n),e.vertexAttribPointer(r,2,e.FLOAT,!1,0,0)})(e,i,t.vertices),((e,t,{location:r,buffer:n})=>{e.bindAttribLocation(t,r,"a_color"),e.enableVertexAttribArray(r),e.bindBuffer(e.ARRAY_BUFFER,n),e.vertexAttribPointer(r,4,e.FLOAT,!1,0,0)})(e,i,t.colors),((e,t,{location:r,buffer:n})=>{e.bindAttribLocation(t,r,"a_textureCoordinates"),e.enableVertexAttribArray(r),e.bindBuffer(e.ARRAY_BUFFER,n),e.vertexAttribPointer(r,2,e.FLOAT,!1,0,0)})(e,i,t.textureCoordinates),((e,t,{location:r,buffer:n})=>{e.bindAttribLocation(t,r,"a_cameraIndex"),e.enableVertexAttribArray(r),e.bindBuffer(e.ARRAY_BUFFER,n),e.vertexAttribIPointer(r,1,e.UNSIGNED_BYTE,0,0)})(e,i,t.cameraIndex),{vertexShader:r,fragmentShader:n,program:i,attributes:t,uniforms:{projection:e.getUniformLocation(i,"u_projection"),texture:e.getUniformLocation(i,"u_texture"),cameras:e.getUniformLocation(i,"u_cameras")}}})(s),a=s.createTexture();s.bindTexture(s.TEXTURE_2D,a),s.texImage2D(s.TEXTURE_2D,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,new Uint8Array([255,255,255,255]));const c=new P(n,r,i,s,o,[a],new Map,[]);return c.size={width:e,height:t},c},k=e=>({x:e.clientX,y:e.clientY,id:e.pointerId});class B{constructor(e,t){this.size=e,this.child=t}}class W{constructor(e,t,r,n,i,s,o,a){this.worldSpace=e,this.textureIndex=t,this.textureCoordinates=r,this.colors=n,this.vertices=i,this.vertexIndices=s,this.cameraIndex=o,this.child=a}}class F{constructor(e){this.child=e}layout(e,t){const r=this.child.layout(e,t),n=e.maxWidth,i=e.maxHeight;return new B({width:n,height:i},r)}geometry(e,t,r){const n=r.transformWorldSpace({x0:t.x,y0:t.y,x1:t.x+e.size.width,y1:t.y+e.size.height}),i=e.child,s={x:t.x+e.size.width/2-i.size.width/2,y:t.y+e.size.height/2-i.size.height/2};return((e,t)=>new W(e,0,[],[],[],[],[],t))(n,this.child.geometry(i,s,r))}*traverse(e,t,r){const n=e.child,i=t.child;yield{ui:this,layout:e,geometry:t,z:r},yield*this.child.traverse(n,i,r+1)}}class M{constructor(e,t,r){this.size=e,this.totalChildHeight=t,this.children=r}}class Y{constructor(e,t,r,n,i,s,o,a){this.worldSpace=e,this.textureIndex=t,this.textureCoordinates=r,this.colors=n,this.vertices=i,this.vertexIndices=s,this.cameraIndex=o,this.children=a}}class H{constructor(e,t,r){this.mainAxisAlignment=e,this.crossAxisAlignment=t,this.children=r}layout(t,r){const n={children:[],width:0,totalChildHeight:0},i=this.children.reduce(((e,n)=>{const i=n.layout(t,r);return e.children.push(i),e.totalChildHeight+=i.size.height,e.width=Math.max(e.width,i.size.width),e}),n),{children:s,width:o,totalChildHeight:a}=i;return((e,t,r)=>new M(e,t,r))({width:o,height:this.mainAxisAlignment==e.START?a:t.maxHeight},a,s)}geometry(t,n,i){const s=t,o=t.size.height-s.totalChildHeight,a={children:[],y:(()=>{switch(this.mainAxisAlignment){case e.START:return n.y;case e.CENTER:return n.y+o/2;case e.END:return n.y+o;case e.SPACE_EVENLY:return n.y+o/(this.children.length+1);case e.SPACE_BETWEEN:return n.y}})()},c=e=>e.size.height,d=e=>e.size.height,h=e=>e.size.height,l=e=>e.size.height+o/(this.children.length+1),u=e=>e.size.height+o/(this.children.length-1),x=(()=>{switch(this.mainAxisAlignment){case e.START:return c;case e.CENTER:return d;case e.END:return h;case e.SPACE_EVENLY:return l;case e.SPACE_BETWEEN:return u}})(),p=e=>n.x,g=e=>n.x+t.size.width/2-e.size.width/2,m=e=>n.x+t.size.width-e.size.width,f=(()=>{switch(this.crossAxisAlignment){case r.START:return p;case r.CENTER:return g;case r.END:return m}})(),E=this.children.reduce(((e,t,r)=>{const n=s.children[r],o={x:f(n),y:e.y},a=t.geometry(n,o,i);return e.children.push(a),e.y+=x(n),e}),a);return((e,t)=>new Y(e,0,[],[],[],[],[],t))(i.transformWorldSpace({x0:n.x,y0:n.y,x1:n.x+t.size.width,y1:n.y+t.size.height}),E.children)}*traverse(e,t,r){const n=e.children,i=t.children;yield{ui:this,layout:e,geometry:t,z:r};const s=r+1;let o=0;for(const e of this.children)yield*e.traverse(n[o],i[o],s),o+=1}}const K=(...t)=>{const[n,i]=t[0]instanceof Array?[{},t[0]]:[t[0],t[1]];return new H(n.mainAxisAlignment??e.START,n.crossAxisAlignment??r.START,i)};class V{constructor(e,t){this.size=e,this.child=t}}const $=(e,t)=>new V(e,t);class X{constructor(e,t,r,n,i,s,o,a){this.worldSpace=e,this.textureIndex=t,this.textureCoordinates=r,this.colors=n,this.vertices=i,this.vertexIndices=s,this.cameraIndex=o,this.child=a}}const G=(e,t)=>{const r=e.vertices??[];return new X(e.worldSpace,e.textureIndex??0,e.textureCoordinates??Array.from({length:r.length}).fill(0),e.colors??[],r,e.vertexIndices??[],e.cameraIndex??[],t)};class q{constructor(e,t,r,n,i,s,o,a,c){this.padding=e,this.width=t,this.height=r,this.x=n,this.y=i,this.color=s,this.onClick=o,this.id=a,this.child=c}layout(e,t){const{left:r,top:n,right:i,bottom:s}=this.padding;if(this.child){const o=this.child.layout(e,t),a=this.width??o.size.width+r+i,c=this.height??o.size.height+n+s;return $({width:a,height:c},o)}const o=(()=>this.width?this.width+r+i:e.maxWidth)(),a=(()=>this.height?this.height+n+s:e.maxHeight)();return $({width:o,height:a})}geometry(e,t,r){const n=t.x+(this.x??0),i=n+e.size.width,s=t.y+(this.y??0),o=s+e.size.height,a=r.transformWorldSpace({x0:n,x1:i,y0:s,y1:o}),c=(()=>{if(this.color){const{red:e,green:t,blue:c,alpha:d}=this.color;return{worldSpace:a,vertices:[n,s,n,o,i,s,i,o],colors:[e,t,c,d,e,t,c,d,e,t,c,d,e,t,c,d],vertexIndices:[0,1,2,1,2,3],cameraIndex:Array(4).fill(r.activeCamera())}}return{worldSpace:a,vertices:[],colors:[],vertexIndices:[],cameraIndex:[]}})();if(this.child){const t=e.child,i={x:n+this.padding.left,y:s+this.padding.top},o=this.child.geometry(t,i,r);return G(c,o)}return G(c)}*traverse(e,t,r){if(yield{ui:this,layout:e,geometry:t,z:r},this.child){const n=e.child,i=t.child;yield*this.child.traverse(n,i,r+1)}}}const j=({padding:e,width:t,height:r,color:n,x:i,y:s,onClick:o,id:a},c)=>new q(e??f(0),t,r,i,s,n,o,a,c);class J{constructor(e,t,r){this.size=e,this.totalChildWidth=t,this.children=r}}class Q{constructor(e,t,r,n,i,s,o,a){this.worldSpace=e,this.textureIndex=t,this.textureCoordinates=r,this.colors=n,this.vertices=i,this.vertexIndices=s,this.cameraIndex=o,this.children=a}}class Z{constructor(e,t,r){this.mainAxisAlignment=e,this.crossAxisAlignment=t,this.children=r}layout(t,r){const n={children:[],totalChildWidth:0,height:0},i=this.children.reduce(((e,n)=>{const i=n.layout(t,r);return e.children.push(i),e.totalChildWidth+=i.size.width,e.height=Math.max(e.height,i.size.height),e}),n),{children:s,totalChildWidth:o,height:a}=i;return((e,t,r)=>new J(e,t,r))({width:this.mainAxisAlignment==e.START?o:t.maxWidth,height:a},o,s)}geometry(t,n,i){const s=t,o=t.size.width-s.totalChildWidth,a={children:[],x:(()=>{switch(this.mainAxisAlignment){case e.START:return n.x;case e.CENTER:return n.x+o/2;case e.END:return n.x+o;case e.SPACE_EVENLY:return n.x+o/(this.children.length+1);case e.SPACE_BETWEEN:return n.x}})()},c=e=>e.size.width,d=e=>e.size.width,h=e=>e.size.width,l=e=>e.size.width+o/(this.children.length+1),u=e=>e.size.width+o/(this.children.length-1),x=(()=>{switch(this.mainAxisAlignment){case e.START:return c;case e.CENTER:return d;case e.END:return h;case e.SPACE_EVENLY:return l;case e.SPACE_BETWEEN:return u}})(),p=e=>n.y,g=e=>n.y+t.size.height/2-e.size.height/2,m=e=>n.y+t.size.height-e.size.height,f=(()=>{switch(this.crossAxisAlignment){case r.START:return p;case r.CENTER:return g;case r.END:return m}})(),E=this.children.reduce(((e,t,r)=>{const n=s.children[r],o={x:e.x,y:f(n)},a=t.geometry(n,o,i);return e.children.push(a),e.x+=x(n),e}),a);return((e,t)=>new Q(e,0,[],[],[],[],[],t))(i.transformWorldSpace({x0:n.x,y0:n.y,x1:n.x+t.size.width,y1:n.y+t.size.height}),E.children)}*traverse(e,t,r){const n=e.children,i=t.children;yield{ui:this,layout:e,geometry:t,z:r};const s=r+1;let o=0;for(const e of this.children)yield*e.traverse(n[o],i[o],s),o+=1}}const ee=(...t)=>{const[n,i]=t[0]instanceof Array?[{},t[0]]:[t[0],t[1]];return new Z(n.mainAxisAlignment??e.START,n.crossAxisAlignment??r.START,i)};class te{constructor(e,t){this.size=e,this.children=t}}class re{constructor(e,t,r,n,i,s,o,a){this.worldSpace=e,this.textureIndex=t,this.textureCoordinates=r,this.colors=n,this.vertices=i,this.vertexIndices=s,this.cameraIndex=o,this.children=a}}class ne{constructor(e,t,r){this.camera=e,this.children=t,this.connections=r}layout(e,t){const r=this.children.map((r=>r.layout(e,t)));return((e,t)=>new te(e,t))({width:e.maxWidth,height:e.maxHeight},r)}geometry(e,t,r){const n=r.transformWorldSpace({x0:t.x,y0:t.y,x1:t.x+e.size.width,y1:t.y+e.size.height}),i=e.children;r.pushCamera(this.camera);const s=this.children.map(((e,n)=>e.geometry(i[n],t,r)));return r.popCamera(),((e,t)=>new re(e,0,[],[],[],[],[],t))(n,s)}*traverse(e,t,r){const n=e.children,i=t.children;yield{ui:this,layout:e,geometry:t,z:r};let s=0;for(const e of this.children){for(const t of e.traverse(n[s],i[s],r))yield t,r=Math.max(r,t.z);s++,r++}}}class ie{constructor(e,t){this.size=e,this.children=t}}class se{constructor(e,t,r,n,i,s,o,a){this.worldSpace=e,this.textureIndex=t,this.textureCoordinates=r,this.colors=n,this.vertices=i,this.vertexIndices=s,this.cameraIndex=o,this.children=a}}class oe{constructor(e){this.children=e}layout(e,t){const r=this.children.map((r=>r.layout(e,t)));return((e,t)=>new ie(e,t))({width:e.maxWidth,height:e.maxHeight},r)}geometry(e,t,r){const n=e,i=this.children.map(((e,i)=>e.geometry(n.children[i],t,r)));return((e,t)=>new se(e,0,[],[],[],[],[],t))(r.transformWorldSpace({x0:t.x,y0:t.y,x1:t.x+e.size.width,y1:t.y+e.size.height}),i)}*traverse(e,t,r){const n=e.children,i=t.children;yield{ui:this,layout:e,geometry:t,z:r};let s=0;for(const e of this.children){for(const t of e.traverse(n[s],i[s],r))yield t,r=Math.max(r,t.z);s+=1,r+=1}}}const ae=e=>new oe(e);class ce{constructor(e,t){this.measurements=e,this.size=t}}class de{constructor(e,t,r,n,i,s,o){this.worldSpace=e,this.textureIndex=t,this.textureCoordinates=r,this.colors=n,this.vertices=i,this.vertexIndices=s,this.cameraIndex=o}}const he=(e,t,r)=>{const n=[];let i=r.x;const s=r.y,o=r.y+t;for(const t of e){const e=i,r=i+t;n.push(e,s,e,o,r,s,r,o),i+=t}return n},le=(e,{red:t,green:r,blue:n,alpha:i})=>{const s=[];for(let o=0;o<e;++o)s.push(t,r,n,i,t,r,n,i,t,r,n,i,t,r,n,i);return s},ue=e=>{const t=[];let r=0;for(let n=0;n<e;++n)t.push(r,r+1,r+2,r+1,r+2,r+3),r+=4;return t};class xe{constructor(e,t,r){this.font=e,this.color=t,this.str=r}layout(e,t){const{font:r,str:n}=this,i=t(r,n),s=i.widths.reduce(((e,t)=>e+t));return((e,t)=>new ce(e,t))(i,{width:s,height:r.size})}geometry(e,t,r){const n=e,{measurements:i}=n,{textureIndex:s,textureCoordinates:o,widths:a}=i;return c={worldSpace:r.transformWorldSpace({x0:t.x,y0:t.y,x1:t.x+e.size.width,y1:t.y+e.size.height}),textureIndex:s,textureCoordinates:o.flat(),colors:le(a.length,this.color),vertices:he(a,this.font.size,t),vertexIndices:ue(a.length),cameraIndex:Array(4*a.length).fill(r.activeCamera())},new de(c.worldSpace,c.textureIndex,c.textureCoordinates,c.colors,c.vertices,c.vertexIndices,c.cameraIndex);var c}*traverse(e,t,r){yield{ui:this,layout:e,geometry:t,z:r}}}const pe=(...e)=>{const[t,r]="string"==typeof e[0]?[{},e[0]]:[e[0],e[1]],n={family:t.font??"monospace",size:t.size??14};return new xe(n,t.color??{red:255,green:255,blue:255,alpha:255},r)},ge=e=>j({width:e,height:e}),me=(e,t)=>{const r=[e[0]];for(const n of e.slice(1))r.push(t,n);return r},fe=(e,t,n)=>K(me(t.map(((t,i)=>((e,{name:t,selected:n},i,s)=>j({onClick:()=>we({kind:u.CLICKED_INPUT,inputPath:{nodeIndex:i,inputIndex:s}})},ee({crossAxisAlignment:r.CENTER},[j({id:`input ${i} ${s}`,width:14,height:14,color:n?e.selectedInput:e.input}),ge(4),pe(t)])))(e,t,n,i))),ge(4))),Ee=(e,t,n)=>K(me(t.map(((t,i)=>((e,{name:t,selected:n},i,s)=>j({onClick:()=>we({kind:u.CLICKED_OUTPUT,outputPath:{nodeIndex:i,outputIndex:s}})},ee({crossAxisAlignment:r.CENTER},[pe(t),ge(4),j({id:`output ${i} ${s}`,width:14,height:14,color:n?e.selectedInput:e.input})])))(e,t,n,i))),ge(4))),ye=(e,t,{name:n,x:i,y:s,inputs:o,outputs:a},c)=>{const d=[];return o.length&&d.push(fe(t,o,c)),o.length&&a.length&&d.push(ge(15)),a.length&&d.push(Ee(t,a,c)),j({color:t.node,padding:f(4),x:i,y:s,onClick:()=>e({kind:u.CLICKED_NODE,index:c})},K({crossAxisAlignment:r.CENTER},[pe(n),ge(4),ee(d)]))},Ae=({search:e,options:t},r)=>{return n=j({color:r.node,padding:f(4)},K([j({color:r.background,width:300,padding:f(4)},pe({color:r.input,size:24},e.length?e:"Search ...")),j({width:10,height:10}),...t.map((e=>j({padding:f(4)},pe(e))))])),new F(n);var n},Ie=(e,t)=>ee(t.map((t=>{return r=e,n=t,j({padding:f(4),onClick:()=>r({kind:u.VIRTUAL_KEYDOWN,key:n})},pe(n));var r,n}))),we=((e,t,r)=>{let n=O({width:window.innerWidth,height:window.innerHeight,window:window,document:document}),i=!1;const s=()=>{i||(i=!0,requestAnimationFrame((()=>{n=U(n,t(o,e)),i=!1})))},o=t=>{const{state:n,render:i,schedule:a,dispatch:c}=r(e,t);e=n,i&&s();for(const{after:e,event:t}of a??[]){const{milliseconds:r}=e;setTimeout((()=>o(t)),r)}for(const e of c??[])o(e)};return document.body.appendChild(n.canvas),document.addEventListener("pointerdown",(e=>{n=y(n,k(e))})),window.addEventListener("resize",(()=>{n.size={width:window.innerWidth,height:window.innerHeight},s()})),s(),o})({graph:{nodes:[{name:"Source",inputs:[],outputs:[{name:"Out 1",selected:!1,edgeIndices:[]},{name:"Out 2",selected:!1,edgeIndices:[]}],x:7,y:15},{name:"Transform",inputs:[{name:"In 1",selected:!1,edgeIndices:[]},{name:"In 2",selected:!1,edgeIndices:[]}],outputs:[{name:"Out 1",selected:!1,edgeIndices:[]},{name:"Out 2",selected:!1,edgeIndices:[]}],x:window.innerWidth/2-70,y:50},{name:"Sink",inputs:[{name:"In 1",selected:!1,edgeIndices:[]},{name:"In 2",selected:!1,edgeIndices:[]}],outputs:[],x:window.innerWidth-70,y:15}],edges:[]},zooming:!1,dragging:!1,draggedNode:null,pointers:[],pointerDistance:0,pointerCenter:[0,0],camera:[1,0,0,0,1,0,0,0,1],selectedOutput:null,selectedInput:null,theme:{background:{red:2,green:22,blue:39,alpha:255},node:{red:41,green:95,blue:120,alpha:255},input:{red:188,green:240,blue:192,alpha:255},selectedInput:{red:175,green:122,blue:208,alpha:255},connection:{red:255,green:255,blue:255,alpha:255}},potentialDoubleClick:!1,finder:{search:"",options:[],show:!1},operations:{Add:{name:"Add",inputs:["x","y"],outputs:["out"]},Subtract:{name:"Subtract",inputs:["x","y"],outputs:["out"]},Multiply:{name:"Multiply",inputs:["x","y"],outputs:["out"]},Divide:{name:"Divide",inputs:["x","y"],outputs:["out"]},Equal:{name:"Equal",inputs:["x","y"],outputs:["out"]},"Less Than":{name:"Less Than",inputs:["x","y"],outputs:["out"]},"Less Than Or Equal":{name:"Less Than Or Equal",inputs:["x","y"],outputs:["out"]}}},((t,n)=>{if(!n.finder.show){const e=[];if(n.graph.nodes.forEach(((r,i)=>{i!==n.draggedNode&&e.push(ye(t,n.theme,r,i))})),null!==n.draggedNode){const r=n.draggedNode;e.push(ye(t,n.theme,n.graph.nodes[r],r))}const r=n.graph.edges.map((({input:e,output:t})=>({from:`output ${t.nodeIndex} ${t.outputIndex}`,to:`input ${e.nodeIndex} ${e.inputIndex}`,color:n.theme.connection})));return ae([j({color:n.theme.background}),(i={camera:n.camera,children:e,connections:r},new ne(i.camera,i.children,i.connections??[]))])}var i,s,o;return ae([j({color:n.theme.background}),Ae(n.finder,n.theme),(s=t,o=n.theme,K({mainAxisAlignment:e.END},[ee({mainAxisAlignment:e.SPACE_BETWEEN},[j({padding:f(4),color:o.node},K([Ie(s,["1","2","3","4","5"]),Ie(s,["q","w","e","r","t"]),Ie(s,["a","s","d","f","g"]),Ie(s,["z","x","c","v"]),Ie(s,["sft","space"])])),j({padding:f(4),color:o.node},K({crossAxisAlignment:r.END},[Ie(s,["6","7","8","9","0"]),Ie(s,["y","u","i","o","p"]),Ie(s,["h","j","k","l"]),Ie(s,["b","n","m","del"]),Ie(s,["space","ret"])]))])]))])}),((e,t)=>{switch(t.kind){case u.POINTER_DOWN:return((e,t)=>(e.pointers.push(t.pointer),e.pointers.length>1?(e.potentialDoubleClick=!1,e.dragging=!1,e.zooming=2===e.pointers.length,{state:e}):e.potentialDoubleClick?(e.potentialDoubleClick=!1,{state:e,dispatch:[{kind:u.DOUBLE_CLICK}]}):(e.dragging=!0,e.potentialDoubleClick=!0,{state:e,schedule:[{after:{milliseconds:300},event:{kind:u.DOUBLE_CLICK_TIMEOUT}}]})))(e,t);case u.POINTER_UP:return((e,t)=>{const r=e.pointers.findIndex((e=>e.id===t.pointer.id));return e.pointers.splice(r,1),1===e.pointers.length?(e.zooming=!1,e.dragging=!0,e.pointerDistance=0):0===e.pointers.length&&(e.dragging=!1,e.draggedNode=null,e.pointerDistance=0),{state:e}})(e,t);case u.POINTER_MOVE:return p(e,t);case u.CLICKED_NODE:return((e,t)=>(e.draggedNode=t.index,{state:e,render:!0}))(e,t);case u.WHEEL:return((e,t)=>{const r=o(t.x,t.y),n=Math.pow(2,.01*t.deltaY),i=o(-t.x,-t.y);return e.camera=c(e.camera,r,a(n,n),i),{state:e,render:!0}})(e,t);case u.CLICKED_INPUT:return((e,t)=>{if(e.draggedNode=t.inputPath.nodeIndex,e.selectedOutput){const r=e.graph.edges.length;e.graph.edges.push({input:t.inputPath,output:e.selectedOutput});{const{nodeIndex:t,outputIndex:n}=e.selectedOutput,i=e.graph.nodes[t].outputs[n];i.edgeIndices.push(r),i.selected=!1}{const{nodeIndex:n,inputIndex:i}=t.inputPath;e.graph.nodes[n].inputs[i].edgeIndices.push(r)}return e.selectedOutput=null,e.draggedNode=null,{state:e,render:!0}}if(e.selectedInput){const{nodeIndex:t,inputIndex:r}=e.selectedInput;e.graph.nodes[t].inputs[r].selected=!1}const{nodeIndex:r,inputIndex:n}=t.inputPath;return e.graph.nodes[r].inputs[n].selected=!0,e.selectedInput=t.inputPath,{state:e,render:!0}})(e,t);case u.CLICKED_OUTPUT:return((e,t)=>{if(e.draggedNode=t.outputPath.nodeIndex,e.selectedInput){const r=e.graph.edges.length;e.graph.edges.push({input:e.selectedInput,output:t.outputPath});{const{nodeIndex:t,inputIndex:n}=e.selectedInput,i=e.graph.nodes[t].inputs[n];i.edgeIndices.push(r),i.selected=!1}{const{nodeIndex:n,outputIndex:i}=t.outputPath;e.graph.nodes[n].outputs[i].edgeIndices.push(r)}return e.selectedInput=null,e.draggedNode=null,{state:e,render:!0}}if(e.selectedOutput){const{nodeIndex:t,outputIndex:r}=e.selectedOutput;e.graph.nodes[t].outputs[r].selected=!1}const{nodeIndex:r,outputIndex:n}=t.outputPath;return e.graph.nodes[r].outputs[n].selected=!0,e.selectedOutput=t.outputPath,{state:e,render:!0}})(e,t);case u.DOUBLE_CLICK_TIMEOUT:return((e,t)=>(e.potentialDoubleClick&&(e.potentialDoubleClick=!1),{state:e}))(e);case u.DOUBLE_CLICK:return((e,t)=>(e.potentialDoubleClick=!1,e.finder.show=!0,{state:g(e),render:!0}))(e);case u.KEYDOWN:return((e,{key:t})=>{if(e.finder.show){switch(t){case"Backspace":e.finder.search=e.finder.search.slice(0,-1);break;case"Shift":case"Alt":case"Control":case"Meta":case"Tab":break;case"Enter":case"Escape":e.finder.show=!1,e.finder.search="";break;default:e.finder.search+=t}return{state:g(e),render:!0}}return"f"==t?(e.finder.show=!0,{state:e,render:!0}):{state:e}})(e,t);case u.VIRTUAL_KEYDOWN:return((e,{key:t})=>{if(e.finder.show){switch(t){case"del":e.finder.search=e.finder.search.slice(0,-1);break;case"sft":break;case"space":e.finder.search+=" ";break;case"ret":e.finder.show=!1,e.finder.search="";break;default:e.finder.search+=t}return{state:g(e),render:!0}}return{state:e}})(e,t)}}));"function"==typeof PointerEvent.prototype.getCoalescedEvents?document.addEventListener("pointermove",(e=>{e.getCoalescedEvents().forEach((e=>{we({kind:u.POINTER_MOVE,pointer:k(e)})}))})):document.addEventListener("pointermove",(e=>we({kind:u.POINTER_MOVE,pointer:k(e)}))),document.addEventListener("pointerdown",(e=>{we({kind:u.POINTER_DOWN,pointer:k(e)})})),document.addEventListener("pointerup",(e=>{we({kind:u.POINTER_UP,pointer:k(e)})})),document.addEventListener("wheel",(e=>{e.preventDefault(),we({kind:u.WHEEL,x:e.clientX,y:e.clientY,deltaY:e.deltaY})}),{passive:!1}),document.addEventListener("contextmenu",(e=>{e.preventDefault()})),document.addEventListener("touchend",(()=>{document.body.requestFullscreen()})),document.addEventListener("keydown",(e=>{e.preventDefault(),we({kind:u.KEYDOWN,key:e.key})}));
//# sourceMappingURL=index.7bd57e02.js.map