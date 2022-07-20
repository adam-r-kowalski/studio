function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}const t=({haystack:e,needle:t})=>{let n=0,r=0;for(;r<t.length;){const i=t[r].toLowerCase();for(;n<e.length&&i!==e[n].toLowerCase();)++n;if(n===e.length)return!1;++r}return!0},n=({width:e,height:t})=>[2/e,0,-1,0,-2/t,1,0,0,1],r=(e,t)=>[1,0,e,0,1,t,0,0,1],i=(e,t)=>[e,0,0,0,t,0,0,0,1],o=(...e)=>{const[t,...n]=e;return n.reduce(((e,t)=>{const n=e[0],r=e[1],i=e[2],o=e[3],s=e[4],a=e[5],d=e[6],c=e[7],u=e[8],l=t[0],h=t[1],p=t[2],g=t[3],E=t[4],x=t[5],f=t[6],m=t[7],A=t[8];return[n*l+r*g+i*f,n*h+r*E+i*m,n*p+r*x+i*A,o*l+s*g+a*f,o*h+s*E+a*m,o*p+s*x+a*A,d*l+c*g+u*f,d*h+c*E+u*m,d*p+c*x+u*A]}),t)},s=(e,t)=>{const n=e[0],r=e[1],i=e[2],o=e[3],s=e[4],a=e[5],d=e[6],c=e[7],u=e[8],l=t[0],h=t[1],p=t[2];return[n*l+r*h+i*p,o*l+s*h+a*p,d*l+c*h+u*p]},a=e=>{const t=e[0],n=e[1],r=e[2],i=e[3],o=e[4],s=e[5],a=e[6],d=e[7],c=e[8],u=n*s-r*o,l=t*s-r*i,h=t*o-n*i,p=1/(a*u-d*l+c*h);return[p*(o*c-s*d),p*-(n*c-r*d),p*u,p*-(i*c-s*a),p*(t*c-r*a),p*-l,p*(i*d-o*a),p*-(t*d-n*a),p*h]},d=([e,t,n])=>Math.sqrt(Math.pow(e,2)+Math.pow(t,2)+Math.pow(n,2));let c;var u;let l;var h;let p;var g;(u=c||(c={}))[u.ALPHABETIC=0]="ALPHABETIC",u[u.NUMERIC=1]="NUMERIC",(h=l||(l={}))[h.FINDER=0]="FINDER",h[h.NUMBER=1]="NUMBER",h[h.NONE=2]="NONE",(g=p||(p={}))[g.POINTER_MOVE=0]="POINTER_MOVE",g[g.POINTER_DOWN=1]="POINTER_DOWN",g[g.POINTER_UP=2]="POINTER_UP",g[g.CLICKED_NODE=3]="CLICKED_NODE",g[g.WHEEL=4]="WHEEL",g[g.CLICKED_INPUT=5]="CLICKED_INPUT",g[g.CLICKED_OUTPUT=6]="CLICKED_OUTPUT",g[g.DOUBLE_CLICK_TIMEOUT=7]="DOUBLE_CLICK_TIMEOUT",g[g.DOUBLE_CLICK=8]="DOUBLE_CLICK",g[g.KEYDOWN=9]="KEYDOWN",g[g.VIRTUAL_KEYDOWN=10]="VIRTUAL_KEYDOWN",g[g.CLICKED_FINDER_OPTION=11]="CLICKED_FINDER_OPTION",g[g.CLICKED_NUMBER=12]="CLICKED_NUMBER",g[g.CLICKED_BACKGROUND=13]="CLICKED_BACKGROUND";const E=e=>(e.finder.options=Object.keys(e.operations).filter((n=>t({haystack:n,needle:e.finder.search}))),e),x=e=>(e.finder.show=!0,e.finder.search="",e.virtualKeyboard={show:!0,kind:c.ALPHABETIC},e.inputTarget={kind:l.FINDER},e.potentialDoubleClick=!1,e=E(e)),f=e=>(e.finder.show=!1,e.finder.search="",e.virtualKeyboard={show:!1,kind:c.ALPHABETIC},e.inputTarget={kind:l.NONE},e),m=(e,t)=>{const n=(e=f(e)).operations[t],[r,i,o]=s(e.camera,[e.nodePlacementLocation.x,e.nodePlacementLocation.y,1]);return e.graph.nodes.push({name:t,inputs:n.inputs.map((e=>({name:e,selected:!1,edgeIndices:[]}))),outputs:n.outputs.map((e=>({name:e,selected:!1,edgeIndices:[]}))),x:r,y:i,body:void 0!==n.body?{value:n.body,editing:!1}:void 0}),e},A=(e,{nodeIndex:t})=>(e.inputTarget.kind===l.NUMBER&&(e.graph.nodes[e.inputTarget.nodeIndex].body.editing=!1),e=((e,t)=>(e.virtualKeyboard={show:!0,kind:c.NUMERIC},e.inputTarget={kind:l.NUMBER,nodeIndex:t},e.graph.nodes[t].body.editing=!0,e))(e=f(e),t),{state:e,render:!0}),T=({x0:e,y0:t,x1:n,y1:r},i)=>e<=i.x&&i.x<=n&&t<=i.y&&i.y<=r,I=(e,t)=>{for(let n=e.clickHandlers.length;n>0;--n)for(const{onClick:r,worldSpace:i}of e.clickHandlers[n-1])if(T(i,t))return e.dispatch(r),e;return e},C=e=>({triangles:{vertices:[],colors:[],vertexIndices:[],textureIndex:e,textureCoordinates:[],cameraIndex:[]},lines:{vertices:[],colors:[]}});function*y(e,t,n,r){const i=(t.x0+t.x1)/2,o=(t.y0+t.y1)/2,s=i+r,a=o,d=(n.x0+n.x1)/2,c=(n.y0+n.y1)/2,u=d-r,l=c;let h=0,p=0,g=!0;for(const t of e){const e=t*t,n=e*t,r=1-t,E=r*r,x=E*r,f=3*E*t,m=3*r*e,A=x*i+f*s+m*u+n*d,T=x*o+f*a+m*l+n*c;g?(yield A,yield T,g=!1):(yield h,yield p),yield A,yield T,h=A,p=T}}const R=(e,t,n)=>{const r=((e,t,n)=>{const r=(t-e)/(n-1);return Array.from({length:n},((t,n)=>e+r*n))})(0,1,20),i=[];let o=C(0),s=o.triangles.textureIndex.toString();return e.forEach(((e,a)=>{for(const[t,n]of Object.entries(e)){s!==t&&(0!==o.triangles.vertices.length&&i.push(o),o=C(parseInt(t)),s=t);for(const e of n){const t=o.triangles.vertices.length/2;o.triangles.vertices.push(...e.vertices),o.triangles.colors.push(...e.colors);for(const n of e.vertexIndices)o.triangles.vertexIndices.push(n+t);o.triangles.textureCoordinates.push(...e.textureCoordinates),o.triangles.cameraIndex.push(...e.cameraIndex)}}if(t.length>a){for(const{connections:e,scale:i}of t[a]){const t=50*i;for(const{from:i,to:s,color:a}of e){for(const e of y(r,n[i],n[s],t))o.lines.vertices.push(e);const{red:e,green:d,blue:c,alpha:u}=a;for(let t=0;t<40;++t)o.lines.colors.push(e,d,c,u)}}0!==o.lines.vertices.length&&(i.push(o),o=C(0))}})),0!==o.triangles.vertices.length&&i.push(o),i},N=(e,t)=>{const n=e.cameras.length;e.cameras.push(t),e.stack.push(n),e.transform=a(t)},_=e=>e.stack.slice(-1)[0],w=e=>{e.stack.pop(),e.transform=a(e.cameras[_(e)])},b=(e,t)=>{const[n,r,i]=s(e.transform,[t.x0,t.y0,1]),[o,a,d]=s(e.transform,[t.x1,t.y1,1]);return{x0:n,y0:r,x1:o,y1:a}},D=(e,t,n)=>{const r=le(e.child,t,n);return{size:{width:t.maxWidth,height:t.maxHeight},child:r}},v=(e,t,n,r)=>{const i=b(r,{x0:n.x,y0:n.y,x1:n.x+t.size.width,y1:n.y+t.size.height}),o=t.child,s={x:n.x+t.size.width/2-o.size.width/2,y:n.y+t.size.height/2-o.size.height/2};return{worldSpace:i,child:he(e.child,o,s,r)}};function*L(e,t,n,r){yield*pe(e.child,t.child,n.child,r+1)}let k;var O;let U;var S;function P(...e){const[t,n]=e[0]instanceof Array?[{},e[0]]:[e[0],e[1]];return{kind:ce.COLUMN,mainAxisAlignment:t.mainAxisAlignment??k.START,crossAxisAlignment:t.crossAxisAlignment??U.START,children:n}}(O=k||(k={}))[O.START=0]="START",O[O.CENTER=1]="CENTER",O[O.END=2]="END",O[O.SPACE_EVENLY=3]="SPACE_EVENLY",O[O.SPACE_BETWEEN=4]="SPACE_BETWEEN",(S=U||(U={}))[S.START=0]="START",S[S.CENTER=1]="CENTER",S[S.END=2]="END";const B=(e,t,n)=>{const r={children:[],width:0,totalChildHeight:0},i=e.children.reduce(((e,r)=>{const i=le(r,t,n);return e.children.push(i),e.totalChildHeight+=i.size.height,e.width=Math.max(e.width,i.size.width),e}),r),{children:o,width:s,totalChildHeight:a}=i;return{size:{width:s,height:e.mainAxisAlignment==k.START?a:t.maxHeight},totalChildHeight:a,children:o}},z=(e,t,n,r)=>{const i=t.size.height-t.totalChildHeight,o={children:[],y:(()=>{switch(e.mainAxisAlignment){case k.START:return n.y;case k.CENTER:return n.y+i/2;case k.END:return n.y+i;case k.SPACE_EVENLY:return n.y+i/(e.children.length+1);case k.SPACE_BETWEEN:return n.y}})()},s=e=>e.size.height,a=e=>e.size.height,d=e=>e.size.height,c=t=>t.size.height+i/(e.children.length+1),u=t=>t.size.height+i/(e.children.length-1),l=(()=>{switch(e.mainAxisAlignment){case k.START:return s;case k.CENTER:return a;case k.END:return d;case k.SPACE_EVENLY:return c;case k.SPACE_BETWEEN:return u}})(),h=e=>n.x,p=e=>n.x+t.size.width/2-e.size.width/2,g=e=>n.x+t.size.width-e.size.width,E=(()=>{switch(e.crossAxisAlignment){case U.START:return h;case U.CENTER:return p;case U.END:return g}})(),x=e.children.reduce(((e,n,i)=>{const o=t.children[i],s={x:E(o),y:e.y},a=he(n,o,s,r);return e.children.push(a),e.y+=l(o),e}),o);return{worldSpace:b(r,{x0:n.x,y0:n.y,x1:n.x+t.size.width,y1:n.y+t.size.height}),children:x.children}};function*F(e,t,n,r){yield{ui:e,layout:t,geometry:n,z:r};const i=r+1;let o=0;for(const r of e.children)yield*pe(r,t.children[o],n.children[o],i),o+=1}const M=e=>e?{top:e,right:e,bottom:e,left:e}:{top:0,right:0,bottom:0,left:0},K=({padding:e,width:t,height:n,color:r,x:i,y:o,onClick:s,id:a},d)=>({kind:ce.CONTAINER,padding:M(e),width:t,height:n,x:i,y:o,color:r,onClick:s,id:a,child:d}),W=(e,t,n)=>{const{top:r,right:i,bottom:o,left:s}=e.padding;if(e.child){const a=le(e.child,t,n);return{size:{width:e.width??a.size.width+s+i,height:e.height??a.size.height+r+o},child:a}}return{size:{width:e.width?e.width+s+i:t.maxWidth,height:e.height?e.height+r+o:t.maxHeight}}},Y=(e,t,n,r)=>{const i=n.x+(e.x??0),o=i+t.size.width,s=n.y+(e.y??0),a=s+t.size.height,d=b(r,{x0:i,x1:o,y0:s,y1:a}),c=(()=>{if(e.child){const n=t.child,o={x:i+e.padding.left,y:s+e.padding.top};return he(e.child,n,o,r)}})();if(e.color){const{red:t,green:n,blue:u,alpha:l}=e.color;return{worldSpace:d,vertices:[i,s,i,a,o,s,o,a],colors:[t,n,u,l,t,n,u,l,t,n,u,l,t,n,u,l],vertexIndices:[0,1,2,1,2,3],cameraIndex:Array(4).fill(_(r)),textureIndex:0,textureCoordinates:Array(8).fill(0),child:c}}return{worldSpace:d,vertices:[],colors:[],vertexIndices:[],cameraIndex:[],textureIndex:0,textureCoordinates:[],child:c}};function*H(e,t,n,r){if(yield{ui:e,layout:t,geometry:n,z:r},e.child){const i=t.child,o=n.child;yield*pe(e.child,i,o,r+1)}}function V(...e){const[t,n]=e[0]instanceof Array?[{},e[0]]:[e[0],e[1]];return{kind:ce.ROW,mainAxisAlignment:t.mainAxisAlignment??k.START,crossAxisAlignment:t.crossAxisAlignment??U.START,children:n}}const X=(e,t,n)=>{const r={children:[],totalChildWidth:0,height:0},i=e.children.reduce(((e,r)=>{const i=le(r,t,n);return e.children.push(i),e.totalChildWidth+=i.size.width,e.height=Math.max(e.height,i.size.height),e}),r),{children:o,totalChildWidth:s,height:a}=i;return{size:{width:e.mainAxisAlignment==k.START?s:t.maxWidth,height:a},totalChildWidth:s,children:o}},$=(e,t,n,r)=>{const i=t.size.width-t.totalChildWidth,o={children:[],x:(()=>{switch(e.mainAxisAlignment){case k.START:return n.x;case k.CENTER:return n.x+i/2;case k.END:return n.x+i;case k.SPACE_EVENLY:return n.x+i/(e.children.length+1);case k.SPACE_BETWEEN:return n.x}})()},s=e=>e.size.width,a=e=>e.size.width,d=e=>e.size.width,c=t=>t.size.width+i/(e.children.length+1),u=t=>t.size.width+i/(e.children.length-1),l=(()=>{switch(e.mainAxisAlignment){case k.START:return s;case k.CENTER:return a;case k.END:return d;case k.SPACE_EVENLY:return c;case k.SPACE_BETWEEN:return u}})(),h=e=>n.y,p=e=>n.y+t.size.height/2-e.size.height/2,g=e=>n.y+t.size.height-e.size.height,E=(()=>{switch(e.crossAxisAlignment){case U.START:return h;case U.CENTER:return p;case U.END:return g}})(),x=e.children.reduce(((e,n,i)=>{const o=t.children[i],s={x:e.x,y:E(o)},a=he(n,o,s,r);return e.children.push(a),e.x+=l(o),e}),o);return{worldSpace:b(r,{x0:n.x,y0:n.y,x1:n.x+t.size.width,y1:n.y+t.size.height}),children:x.children}};function*G(e,t,n,r){yield{ui:e,layout:t,geometry:n,z:r};const i=r+1;let o=0;for(const r of e.children)yield*pe(r,t.children[o],n.children[o],i),o+=1}const q=({id:e,onClick:t,camera:n,children:r,connections:i})=>({id:e,onClick:t,kind:ce.SCENE,camera:n,children:r,connections:i??[]}),j=(e,t,n)=>{const r=e.children.map((e=>le(e,t,n)));return{size:{width:t.maxWidth,height:t.maxHeight},children:r}},J=(e,t,n,r)=>{const i=b(r,{x0:n.x,y0:n.y,x1:n.x+t.size.width,y1:n.y+t.size.height});N(r,e.camera);const o=e.children.map(((e,i)=>he(e,t.children[i],n,r)));return w(r),{worldSpace:i,children:o}};function*Q(e,t,n,r){yield{ui:e,layout:t,geometry:n,z:r};let i=0;for(const o of e.children){for(const e of pe(o,t.children[i],n.children[i],r))yield e,r=Math.max(r,e.z);i++,r++}}const Z=(e,t,n)=>{const r=e.children.map((e=>le(e,t,n)));return{size:{width:t.maxWidth,height:t.maxHeight},children:r}},ee=(e,t,n,r)=>{const i=e.children.map(((e,i)=>he(e,t.children[i],n,r)));return{worldSpace:b(r,{x0:n.x,y0:n.y,x1:n.x+t.size.width,y1:n.y+t.size.height}),children:i}};function*te(e,t,n,r){yield{ui:e,layout:t,geometry:n,z:r};let i=0;for(const o of e.children){for(const e of pe(o,t.children[i],n.children[i],r))yield e,r=Math.max(r,e.z);i+=1,r+=1}}function ne(...e){const[t,n]="string"==typeof e[0]?[{},e[0]]:[e[0],e[1]];return{kind:ce.TEXT,font:{family:t.font??"monospace",size:t.size??14},color:t.color??{red:255,green:255,blue:255,alpha:255},str:n}}const re=({font:e,str:t},n,r)=>{const i=r(e,t),o=i.widths.reduce(((e,t)=>e+t));return{measurements:i,size:{width:o,height:e.size}}},ie=(e,t,n)=>{const r=[];let i=n.x;const o=n.y,s=n.y+t;for(const t of e){const e=i,n=i+t;r.push(e,o,e,s,n,o,n,s),i+=t}return r},oe=(e,{red:t,green:n,blue:r,alpha:i})=>{const o=[];for(let s=0;s<e;++s)o.push(t,n,r,i,t,n,r,i,t,n,r,i,t,n,r,i);return o},se=e=>{const t=[];let n=0;for(let r=0;r<e;++r)t.push(n,n+1,n+2,n+1,n+2,n+3),n+=4;return t},ae=(e,t,n,r)=>{const i=t,{measurements:o}=i,{textureIndex:s,textureCoordinates:a,widths:d}=o;return{worldSpace:b(r,{x0:n.x,y0:n.y,x1:n.x+t.size.width,y1:n.y+t.size.height}),textureIndex:s,textureCoordinates:a.flat(),colors:oe(d.length,e.color),vertices:ie(d,e.font.size,n),vertexIndices:se(d.length),cameraIndex:Array(4*d.length).fill(_(r))}};function*de(e,t,n,r){yield{ui:e,layout:t,geometry:n,z:r}}let ce;var ue;(ue=ce||(ce={}))[ue.CENTER=0]="CENTER",ue[ue.COLUMN=1]="COLUMN",ue[ue.CONTAINER=2]="CONTAINER",ue[ue.ROW=3]="ROW",ue[ue.SCENE=4]="SCENE",ue[ue.STACK=5]="STACK",ue[ue.TEXT=6]="TEXT";const le=(e,t,n)=>{switch(e.kind){case ce.CENTER:return D(e,t,n);case ce.COLUMN:return B(e,t,n);case ce.CONTAINER:return W(e,t,n);case ce.ROW:return X(e,t,n);case ce.SCENE:return j(e,t,n);case ce.STACK:return Z(e,t,n);case ce.TEXT:return re(e,0,n)}},he=(e,t,n,r)=>{switch(e.kind){case ce.CENTER:return v(e,t,n,r);case ce.COLUMN:return z(e,t,n,r);case ce.CONTAINER:return Y(e,t,n,r);case ce.ROW:return $(e,t,n,r);case ce.SCENE:return J(e,t,n,r);case ce.STACK:return ee(e,t,n,r);case ce.TEXT:return ae(e,t,n,r)}};function*pe(e,t,n,r){switch(e.kind){case ce.CENTER:yield*L(e,t,n,r);break;case ce.COLUMN:yield*F(e,t,n,r);break;case ce.CONTAINER:yield*H(e,t,n,r);break;case ce.ROW:yield*G(e,t,n,r);break;case ce.SCENE:yield*Q(e,t,n,r);break;case ce.STACK:yield*te(e,t,n,r);break;case ce.TEXT:yield*de(e,t,n,r)}}const ge=(e,t,n,r)=>{const i=r.initial();for(const o of pe(e,t,n,0))r.combine(i,o);return i};var Ee={};e(Ee,"initial",(()=>Te)),e(Ee,"combine",(()=>Ie));const xe=(e,t)=>{if(void 0===t.ui.onClick)return e;const n=t.z-e.length+1;for(let t=0;t<n;++t)e.push([]);return e[t.z].push({onClick:t.ui.onClick,worldSpace:t.geometry.worldSpace}),e},fe=(e,t)=>t.ui.id?(e[t.ui.id]=t.geometry.worldSpace,e):e,me=(e,t)=>{switch(t.ui.kind){case ce.CONTAINER:case ce.TEXT:const n=t.geometry;if(0==n.vertices.length)return e;const r=t.z-e.length+1;for(let t=0;t<r;++t)e.push({});const i=e[t.z];return(()=>{const e=i[n.textureIndex];if(e)return e;const t=[];return i[n.textureIndex]=t,t})().push(n),e;default:return e}},Ae=(e,t)=>{if(t.ui.kind==ce.SCENE){if(0===t.ui.connections.length)return e;const n=t.z-e.length+1;for(let t=0;t<n;++t)e.push([]);return e[t.z].push({connections:t.ui.connections,scale:d(s(a(t.ui.camera),[0,1,0]))}),e}return e},Te=()=>({layers:[],clickHandlers:[],idToWorldSpace:{},connections:[]}),Ie=(e,t)=>({layers:me(e.layers,t),clickHandlers:xe(e.clickHandlers,t),idToWorldSpace:fe(e.idToWorldSpace,t),connections:Ae(e.connections,t)}),Ce=(e,t)=>{const{width:n,height:r}=e.size;e.clear();const i=le(t,{minWidth:0,maxWidth:n,minHeight:0,maxHeight:r},e.measureText),o={cameras:[[1,0,0,0,1,0,0,0,1]],stack:[0],transform:a([1,0,0,0,1,0,0,0,1])},s=he(t,i,{x:0,y:0},o),{layers:d,clickHandlers:c,connections:u,idToWorldSpace:l}=ge(t,i,s,Ee),h=R(d,u,l);e.cameras=o.cameras,e.clickHandlers=c;for(const t of h)e.draw(t);return e};let ye;var Re;(Re=ye||(ye={}))[Re.DATA=0]="DATA",Re[Re.ERROR=1]="ERROR";class Ne{constructor(e,t,n,r,i,o,s,a,d,c){this.window=e,this.document=t,this.canvas=n,this.gl=r,this.kind=i,this.program=o,this.textures=s,this.textMeasurementsCache=a,this.clickHandlers=d,this.dispatch=c,this.clear=()=>{const{gl:e}=this;e.clear(e.COLOR_BUFFER_BIT)},this.draw=({triangles:e,lines:t})=>{const{gl:n,program:r,textures:i}=this,{attributes:o}=r;{const{vertices:t,colors:r,vertexIndices:s,textureCoordinates:a,textureIndex:d,cameraIndex:c}=e;if(0!==t.length){const e=i[d];n.bindTexture(n.TEXTURE_2D,e),n.bindBuffer(n.ARRAY_BUFFER,o.vertices.buffer),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,o.colors.buffer),n.bufferData(n.ARRAY_BUFFER,new Float32Array(r),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,o.textureCoordinates.buffer),n.bufferData(n.ARRAY_BUFFER,new Float32Array(a),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,o.cameraIndex.buffer),n.bufferData(n.ARRAY_BUFFER,new Uint8Array(c),n.STATIC_DRAW),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,o.vertexIndices),n.bufferData(n.ELEMENT_ARRAY_BUFFER,new Uint16Array(s),n.STATIC_DRAW),n.drawElements(n.TRIANGLES,s.length,n.UNSIGNED_SHORT,0)}}{const{vertices:e,colors:r}=t;if(0!==e.length){const t=i[0],s=e.length/2;n.bindTexture(n.TEXTURE_2D,t),n.bindBuffer(n.ARRAY_BUFFER,o.vertices.buffer),n.bufferData(n.ARRAY_BUFFER,new Float32Array(e),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,o.colors.buffer),n.bufferData(n.ARRAY_BUFFER,new Float32Array(r),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,o.textureCoordinates.buffer),n.bufferData(n.ARRAY_BUFFER,new Float32Array(Array(2*s).fill(0)),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,o.cameraIndex.buffer),n.bufferData(n.ARRAY_BUFFER,new Uint8Array(Array(s).fill(0)),n.STATIC_DRAW),n.drawArrays(n.LINES,0,s)}}},this.getTextureMeasurements=(e,t)=>{const{document:n,gl:r}=this,i=`${t} ${e.size} ${e.family}`,o=this.textMeasurementsCache.get(i);if(o)return o;const{texture:s,widths:a,textureCoordinates:d}=((e,t,n,r)=>{const i=e.createElement("canvas"),o=i.getContext("2d"),s=Math.sqrt(256),a=(e=>{let t=1;for(;t<e;)t<<=1;return t})(n.size*s),d=a/s;i.width=a*r,i.height=a*r,i.style.width=`${a}px`,i.style.height=`${a}px`,o.scale(r,r),o.textAlign="left",o.textBaseline="top",o.font=`${n.size}px ${n.family}`,o.fillStyle="white",o.clearRect(0,0,o.canvas.width,o.canvas.height);const c=n.size,u=[],l=[];for(let e=0;e<256;++e){const t=String.fromCharCode(e),n=o.measureText(t),r=Math.ceil(n.width),i=e%s*d,h=Math.floor(e/s)*d;o.fillText(t,i,h),u.push(r);const p=i/a,g=(i+r)/a,E=h/a,x=(h+c)/a;l.push([p,E,p,x,g,E,g,x])}const h=t.createTexture();return t.bindTexture(t.TEXTURE_2D,h),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,i),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),{widths:u,textureCoordinates:l,texture:h}})(n,r,e,t),c=this.textures.length;this.textures.push(s);const u={widths:a,textureIndex:c,textureCoordinates:d};return this.textMeasurementsCache.set(i,u),u},this.measureText=(e,t)=>{const{window:n}=this,r=n.devicePixelRatio,{widths:i,textureIndex:o,textureCoordinates:s}=this.getTextureMeasurements(e,r),a=((e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(t(e[r],r));return n})(t,(e=>e.charCodeAt(0)));return{widths:a.map((e=>i[e])),textureIndex:o,textureCoordinates:a.map((e=>s[e]))}}}set size(e){const{gl:t,program:r,window:i}=this,{uniforms:o}=r,{canvas:s}=t;t.uniformMatrix3fv(o.projection,!0,n(e)),s.width=e.width*i.devicePixelRatio,s.height=e.height*i.devicePixelRatio,s.style.width=`${e.width}px`,s.style.height=`${e.height}px`,t.viewport(0,0,s.width,s.height),this._size=e}get size(){return this._size}set cameras(e){const{gl:t,program:n}=this,{uniforms:r}=n,i=[];for(const t of e)i.push(...t);t.uniformMatrix3fv(r.cameras,!0,i),this._cameras=e}get cameras(){return this._cameras}}const _e=({width:e,height:t,document:n,window:r,dispatch:i})=>{const o=n.createElement("canvas");o.style.touchAction="none";const s=o.getContext("webgl2");s.enable(s.BLEND),s.blendFunc(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA),s.depthMask(!1),s.activeTexture(s.TEXTURE0),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),s.clearColor(0,0,0,1);const a=(e=>{const t={vertices:{location:0,buffer:e.createBuffer()},colors:{location:1,buffer:e.createBuffer()},textureCoordinates:{location:2,buffer:e.createBuffer()},cameraIndex:{location:3,buffer:e.createBuffer()},vertexIndices:e.createBuffer()},n=((e,t)=>{const{vertices:n,colors:r,textureCoordinates:i,cameraIndex:o}=t,s=`#version 300 es\n  uniform mat3 u_projection;\n  uniform mat3 u_cameras[8];\n\n  layout(location = ${n.location}) in vec2 a_vertex;\n  layout(location = ${r.location}) in vec4 a_color;\n  layout(location = ${i.location}) in vec2 a_textureCoordinates;\n  layout(location = ${o.location}) in uint a_cameraIndex;\n\n  out vec4 v_color;\n  out vec2 v_textureCoordinates;\n\n  void main() {\n    mat3 camera = u_cameras[a_cameraIndex];\n    mat3 transform = u_projection * inverse(camera);\n    gl_Position = vec4((transform * vec3(a_vertex, 1)).xy, 0, 1);\n    v_color = a_color / 255.0;\n    v_textureCoordinates = a_textureCoordinates;\n  }\n  `,a=e.createShader(e.VERTEX_SHADER);return e.shaderSource(a,s),e.compileShader(a),a})(e,t),r=(e=>{const t=e.createShader(e.FRAGMENT_SHADER);return e.shaderSource(t,"#version 300 es\n  precision highp float;\n\n  uniform sampler2D u_texture;\n\n  in vec4 v_color;\n  in vec2 v_textureCoordinates;\n\n  out vec4 fragColor;\n  \n  void main() {\n    fragColor = texture(u_texture, v_textureCoordinates) * v_color;\n  }\n  "),e.compileShader(t),t})(e),i=e.createProgram();if(e.attachShader(i,n),e.attachShader(i,r),e.linkProgram(i),!e.getProgramParameter(i,e.LINK_STATUS))return{kind:ye.ERROR,vertexInfoLog:e.getShaderInfoLog(n),fragmentInfoLog:e.getShaderInfoLog(r)};e.useProgram(i);const o=e.createVertexArray();e.bindVertexArray(o),((e,t,{location:n,buffer:r})=>{e.bindAttribLocation(t,n,"a_vertex"),e.enableVertexAttribArray(n),e.bindBuffer(e.ARRAY_BUFFER,r),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0)})(e,i,t.vertices),((e,t,{location:n,buffer:r})=>{e.bindAttribLocation(t,n,"a_color"),e.enableVertexAttribArray(n),e.bindBuffer(e.ARRAY_BUFFER,r),e.vertexAttribPointer(n,4,e.FLOAT,!1,0,0)})(e,i,t.colors),((e,t,{location:n,buffer:r})=>{e.bindAttribLocation(t,n,"a_textureCoordinates"),e.enableVertexAttribArray(n),e.bindBuffer(e.ARRAY_BUFFER,r),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0)})(e,i,t.textureCoordinates),((e,t,{location:n,buffer:r})=>{e.bindAttribLocation(t,n,"a_cameraIndex"),e.enableVertexAttribArray(n),e.bindBuffer(e.ARRAY_BUFFER,r),e.vertexAttribIPointer(n,1,e.UNSIGNED_BYTE,0,0)})(e,i,t.cameraIndex);const s={projection:e.getUniformLocation(i,"u_projection"),texture:e.getUniformLocation(i,"u_texture"),cameras:e.getUniformLocation(i,"u_cameras")};return{kind:ye.DATA,vertexShader:n,fragmentShader:r,program:i,attributes:t,uniforms:s}})(s);if(a.kind==ye.ERROR)return a;const d=s.createTexture();s.bindTexture(s.TEXTURE_2D,d),s.texImage2D(s.TEXTURE_2D,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,new Uint8Array([255,255,255,255]));const c=new Ne(r,n,o,s,a.kind,a,[d],new Map,[],i??(()=>{}));return c.size={width:e,height:t},c},we=e=>({x:e.clientX,y:e.clientY,id:e.pointerId}),be=e=>K({width:e,height:e}),De=(e,t)=>{const n=[e[0]];for(const r of e.slice(1))n.push(t,r);return n},ve=(e,t,n)=>P(De(t.map(((t,r)=>((e,{name:t,selected:n},r,i)=>K({onClick:{kind:p.CLICKED_INPUT,inputPath:{nodeIndex:r,inputIndex:i}}},V({crossAxisAlignment:U.CENTER},[K({id:`input ${r} ${i}`,width:14,height:14,color:n?e.selectedInput:e.input}),be(4),ne(t)])))(e,t,n,r))),be(4))),Le=(e,t,n)=>P(De(t.map(((t,r)=>((e,{name:t,selected:n},r,i)=>K({onClick:{kind:p.CLICKED_OUTPUT,outputPath:{nodeIndex:r,outputIndex:i}}},V({crossAxisAlignment:U.CENTER},[ne(t),be(4),K({id:`output ${r} ${i}`,width:14,height:14,color:n?e.selectedInput:e.input})])))(e,t,n,r))),be(4))),ke=(e,{name:t,x:n,y:r,inputs:i,body:o,outputs:s},a)=>{const d=[];return i.length&&d.push(ve(e,i,a)),i.length&&s.length&&d.push(be(15)),void 0!==o&&d.push(((e,t,n)=>K({color:t.editing?e.selectedInput:e.background,padding:5,onClick:{kind:p.CLICKED_NUMBER,nodeIndex:n}},ne(t.value.toString())))(e,o,a),be(15)),s.length&&d.push(Le(e,s,a)),K({color:e.node,padding:4,x:n,y:r,onClick:{kind:p.CLICKED_NODE,index:a}},P({crossAxisAlignment:U.CENTER},[ne(t),be(4),V(d)]))},Oe=e=>V(e.map((e=>{return t=e,K({padding:10,onClick:{kind:p.VIRTUAL_KEYDOWN,key:t}},ne({size:24},t));var t}))),Ue=(e,t)=>{switch(t){case c.ALPHABETIC:return(e=>P({mainAxisAlignment:k.END},[V({mainAxisAlignment:k.SPACE_BETWEEN},[K({padding:4,color:e.node},P([Oe(["1","2","3","4","5"]),Oe(["q","w","e","r","t"]),Oe(["a","s","d","f","g"]),Oe(["z","x","c","v"]),Oe(["sft","space"])])),K({padding:4,color:e.node},P({crossAxisAlignment:U.END},[Oe(["6","7","8","9","0"]),Oe(["y","u","i","o","p"]),Oe(["h","j","k","l"]),Oe(["b","n","m","del"]),Oe(["space","ret"])]))])]))(e);case c.NUMERIC:return(e=>P({mainAxisAlignment:k.END},[V({mainAxisAlignment:k.END},[K({padding:4,color:e.node},P({crossAxisAlignment:U.END},[Oe(["1","2","3","4"]),Oe(["5","6","7","8"]),Oe(["9","0","del"]),Oe([".","ret"])]))])]))(e)}},Se=(e=>{let{state:t,view:n,update:r,window:i,document:o,requestAnimationFrame:s,setTimeout:a}=e;const d=_e({width:i.innerWidth,height:i.innerHeight,window:i,document:o});switch(d.kind){case ye.ERROR:return d;case ye.DATA:let e=d,c=!1;const u=()=>{c||(c=!0,s((()=>{e=Ce(e,n(t)),c=!1})))},l=e=>{const{state:n,render:i,schedule:o,dispatch:s}=r(t,e);t=n,i&&u();for(const{after:e,event:t}of o??[]){const{milliseconds:n}=e;a((()=>l(t)),n)}for(const e of s??[])l(e)};return e.dispatch=l,o.body.appendChild(e.canvas),o.addEventListener("pointerdown",(t=>{e=I(e,we(t))})),i.addEventListener("resize",(()=>{e.size={width:i.innerWidth,height:i.innerHeight},u()})),u(),l}})({state:{graph:{nodes:[{name:"Number",inputs:[],body:{value:5,editing:!1},outputs:[{name:"out",selected:!1,edgeIndices:[0]}],x:25,y:25},{name:"Number",inputs:[],body:{value:10,editing:!1},outputs:[{name:"out",selected:!1,edgeIndices:[1]}],x:25,y:100},{name:"Add",inputs:[{name:"x",selected:!1,edgeIndices:[0]},{name:"y",selected:!1,edgeIndices:[1]}],outputs:[{name:"out",selected:!1,edgeIndices:[2]}],x:150,y:50},{name:"Number",inputs:[],body:{value:15,editing:!1},outputs:[{name:"out",selected:!1,edgeIndices:[3]}],x:175,y:150},{name:"Divide",inputs:[{name:"x",selected:!1,edgeIndices:[2]},{name:"y",selected:!1,edgeIndices:[3]}],outputs:[{name:"out",selected:!1,edgeIndices:[4]}],x:350,y:50},{name:"Log",inputs:[{name:"value",selected:!1,edgeIndices:[4]}],outputs:[],x:550,y:50}],edges:[{output:{nodeIndex:0,outputIndex:0},input:{nodeIndex:2,inputIndex:0}},{output:{nodeIndex:1,outputIndex:0},input:{nodeIndex:2,inputIndex:1}},{output:{nodeIndex:2,outputIndex:0},input:{nodeIndex:4,inputIndex:0}},{output:{nodeIndex:3,outputIndex:0},input:{nodeIndex:4,inputIndex:1}},{output:{nodeIndex:4,outputIndex:0},input:{nodeIndex:5,inputIndex:0}}]},zooming:!1,dragging:!1,draggedNode:null,pointers:[],pointerDistance:0,pointerCenter:[0,0],camera:[1,0,0,0,1,0,0,0,1],selectedOutput:null,selectedInput:null,theme:{background:{red:2,green:22,blue:39,alpha:255},node:{red:41,green:95,blue:120,alpha:255},input:{red:188,green:240,blue:192,alpha:255},selectedInput:{red:175,green:122,blue:208,alpha:255},connection:{red:255,green:255,blue:255,alpha:255}},potentialDoubleClick:!1,nodePlacementLocation:{x:0,y:0},finder:{search:"",options:[],show:!1},virtualKeyboard:{show:!1,kind:c.ALPHABETIC},inputTarget:{kind:l.NONE},operations:{Number:{name:"Number",inputs:[],body:0,outputs:["out"]},Add:{name:"Add",inputs:["x","y"],outputs:["out"]},Subtract:{name:"Subtract",inputs:["x","y"],outputs:["out"]},Multiply:{name:"Multiply",inputs:["x","y"],outputs:["out"]},Divide:{name:"Divide",inputs:["x","y"],outputs:["out"]},Equal:{name:"Equal",inputs:["x","y"],outputs:["out"]},"Less Than":{name:"Less Than",inputs:["x","y"],outputs:["out"]},Log:{name:"Log",inputs:["value"],outputs:[]}}},view:e=>{const t=[];if(e.graph.nodes.forEach(((n,r)=>{r!==e.draggedNode&&t.push(ke(e.theme,n,r))})),null!==e.draggedNode){const n=e.draggedNode;t.push(ke(e.theme,e.graph.nodes[n],n))}const n=e.graph.edges.map((({input:t,output:n})=>({from:`output ${n.nodeIndex} ${n.outputIndex}`,to:`input ${t.nodeIndex} ${t.inputIndex}`,color:e.theme.connection}))),r=[K({color:e.theme.background,onClick:{kind:p.CLICKED_BACKGROUND}}),q({camera:e.camera,children:t,connections:n})];return e.finder.show&&r.push((({search:e,options:t},n)=>P({crossAxisAlignment:U.CENTER},[K({height:10}),K({color:n.node,padding:4},P([K({color:n.background,width:300,padding:4},ne({color:n.input,size:24},e.length?e:"Search ...")),K({width:10,height:10}),...t.map(((e,t)=>K({padding:4,onClick:{kind:p.CLICKED_FINDER_OPTION,option:e}},ne({size:18,color:0==t?n.input:{red:255,green:255,blue:255,alpha:255}},e))))]))]))(e.finder,e.theme)),e.virtualKeyboard.show&&r.push(Ue(e.theme,e.virtualKeyboard.kind)),i=r,{kind:ce.STACK,children:i};var i},update:(e,t)=>{switch(t.kind){case p.POINTER_DOWN:return((e,t)=>e.inputTarget.kind!==l.NONE?{state:e}:(e.pointers.push(t.pointer),e.pointers.length>1?(e.potentialDoubleClick=!1,e.dragging=!1,e.zooming=2===e.pointers.length,{state:e}):e.potentialDoubleClick?(e.potentialDoubleClick=!1,{state:e,dispatch:[{kind:p.DOUBLE_CLICK,pointer:t.pointer}]}):(e.dragging=!0,e.potentialDoubleClick=!0,{state:e,schedule:[{after:{milliseconds:300},event:{kind:p.DOUBLE_CLICK_TIMEOUT}}]})))(e,t);case p.POINTER_UP:return((e,t)=>{const n=e.pointers.findIndex((e=>e.id===t.pointer.id));return e.pointers.splice(n,1),1===e.pointers.length?(e.zooming=!1,e.dragging=!0,e.pointerDistance=0):0===e.pointers.length&&(e.dragging=!1,e.draggedNode=null,e.pointerDistance=0),{state:e}})(e,t);case p.POINTER_MOVE:return((e,t)=>{if(!e.dragging&&!e.zooming)return e.finder.show||(e.nodePlacementLocation={x:t.pointer.x,y:t.pointer.y}),{state:e,rerender:!1};const n=e.pointers.findIndex((e=>e.id===t.pointer.id)),a=e.pointers[n];if(e.pointers[n]=t.pointer,e.dragging){const n=t.pointer.x-a.x,i=t.pointer.y-a.y;if(null!==e.draggedNode){const t=d(s(e.camera,[0,1,0])),r=e.graph.nodes[e.draggedNode];r.x+=n*t,r.y+=i*t}else e.camera=o(e.camera,r(-n,-i));return{state:e,render:!0}}const[c,u]=[e.pointers[0],e.pointers[1]],[l,h]=[c.x,c.y],[p,g]=[u.x,u.y],E=Math.sqrt(Math.pow(p-l,2)+Math.pow(g-h,2)),x=e.pointerDistance,f=e.pointerCenter;e.pointerDistance=E;const m=(c.x+u.x)/2,A=(c.y+u.y)/2;if(e.pointerCenter=[m,A],x>0){const t=r(m,A),n=Math.pow(2,.01*(x-E)),s=r(-m,-A),a=m-f[0],d=A-f[1];return e.camera=o(e.camera,t,i(n,n),s,r(-a,-d)),{state:e,render:!0}}return{state:e}})(e,t);case p.CLICKED_NODE:return((e,t)=>(e.draggedNode=t.index,{state:e,render:!0}))(e,t);case p.WHEEL:return((e,t)=>{const n=r(t.x,t.y),s=Math.pow(2,.01*t.deltaY),a=r(-t.x,-t.y);return e.camera=o(e.camera,n,i(s,s),a),{state:e,render:!0}})(e,t);case p.CLICKED_INPUT:return((e,t)=>{if(e.draggedNode=t.inputPath.nodeIndex,e.selectedOutput){const n=e.graph.edges.length;e.graph.edges.push({input:t.inputPath,output:e.selectedOutput});{const{nodeIndex:t,outputIndex:r}=e.selectedOutput,i=e.graph.nodes[t].outputs[r];i.edgeIndices.push(n),i.selected=!1}{const{nodeIndex:r,inputIndex:i}=t.inputPath;e.graph.nodes[r].inputs[i].edgeIndices.push(n)}return e.selectedOutput=null,e.draggedNode=null,{state:e,render:!0}}if(e.selectedInput){const{nodeIndex:t,inputIndex:n}=e.selectedInput;e.graph.nodes[t].inputs[n].selected=!1}const{nodeIndex:n,inputIndex:r}=t.inputPath;return e.graph.nodes[n].inputs[r].selected=!0,e.selectedInput=t.inputPath,{state:e,render:!0}})(e,t);case p.CLICKED_OUTPUT:return((e,t)=>{if(e.draggedNode=t.outputPath.nodeIndex,e.selectedInput){const n=e.graph.edges.length;e.graph.edges.push({input:e.selectedInput,output:t.outputPath});{const{nodeIndex:t,inputIndex:r}=e.selectedInput,i=e.graph.nodes[t].inputs[r];i.edgeIndices.push(n),i.selected=!1}{const{nodeIndex:r,outputIndex:i}=t.outputPath;e.graph.nodes[r].outputs[i].edgeIndices.push(n)}return e.selectedInput=null,e.draggedNode=null,{state:e,render:!0}}if(e.selectedOutput){const{nodeIndex:t,outputIndex:n}=e.selectedOutput;e.graph.nodes[t].outputs[n].selected=!1}const{nodeIndex:n,outputIndex:r}=t.outputPath;return e.graph.nodes[n].outputs[r].selected=!0,e.selectedOutput=t.outputPath,{state:e,render:!0}})(e,t);case p.DOUBLE_CLICK_TIMEOUT:return((e,t)=>(e.potentialDoubleClick&&(e.potentialDoubleClick=!1),{state:e}))(e);case p.DOUBLE_CLICK:return((e,{pointer:t})=>((e=x(e)).nodePlacementLocation={x:t.x,y:t.y},{state:e,render:!0}))(e,t);case p.KEYDOWN:return((e,{key:t})=>{switch(e.inputTarget.kind){case l.FINDER:switch(t){case"Backspace":e.finder.search=e.finder.search.slice(0,-1);break;case"Shift":case"Alt":case"Control":case"Meta":case"Tab":break;case"Enter":if(e.finder.options.length>0){const t=e.finder.options[0];e=m(e,t)}else e=f(e);break;case"Escape":e=f(e);break;default:e.finder.search+=t}return{state:E(e),render:!0};case l.NUMBER:const n=e.graph.nodes[e.inputTarget.nodeIndex];let r=n.body.value.toString();switch(t){case"Backspace":let i=r.slice(0,-1);return""===i&&(i="0"),n.body.value=parseFloat(i),{state:e,render:!0};case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"0":return r+=t,n.body.value=parseFloat(r),{state:e,render:!0};case"Enter":return n.body.editing=!1,e.virtualKeyboard={show:!1,kind:c.ALPHABETIC},e.inputTarget={kind:l.NONE},{state:e,render:!0};default:return{state:e}}case l.NONE:return"f"==t?{state:x(e),render:!0}:{state:e}}})(e,t);case p.VIRTUAL_KEYDOWN:return((e,{key:t})=>{switch(e.inputTarget.kind){case l.FINDER:switch(t){case"del":e.finder.search=e.finder.search.slice(0,-1);break;case"sft":break;case"space":e.finder.search+=" ";break;case"ret":if(e.finder.options.length>0){const t=e.finder.options[0];e=m(e,t)}else e=f(e);break;default:e.finder.search+=t}return{state:E(e),render:!0};case l.NUMBER:const n=e.graph.nodes[e.inputTarget.nodeIndex];let r=n.body.value.toString();switch(t){case"del":let i=r.slice(0,-1);return""===i&&(i="0"),n.body.value=parseFloat(i),{state:e,render:!0};case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"0":case".":return r+=t,n.body.value=parseFloat(r),{state:e,render:!0};case"ret":return n.body.editing=!1,e.virtualKeyboard={show:!1,kind:c.ALPHABETIC},e.inputTarget={kind:l.NONE},{state:e,render:!0};default:return{state:e}}case l.NONE:return{state:e}}})(e,t);case p.CLICKED_FINDER_OPTION:return((e,{option:t})=>({state:m(e,t),render:!0}))(e,t);case p.CLICKED_NUMBER:return A(e,t);case p.CLICKED_BACKGROUND:return(e=>(e.inputTarget.kind===l.NUMBER&&(e.graph.nodes[e.inputTarget.nodeIndex].body.editing=!1),{state:f(e),render:!0}))(e)}},window:window,document:document,requestAnimationFrame:requestAnimationFrame,setTimeout:setTimeout});"function"==typeof PointerEvent.prototype.getCoalescedEvents?document.addEventListener("pointermove",(e=>{e.getCoalescedEvents().forEach((e=>{Se({kind:p.POINTER_MOVE,pointer:we(e)})}))})):document.addEventListener("pointermove",(e=>Se({kind:p.POINTER_MOVE,pointer:we(e)}))),document.addEventListener("pointerdown",(e=>{Se({kind:p.POINTER_DOWN,pointer:we(e)})})),document.addEventListener("pointerup",(e=>{Se({kind:p.POINTER_UP,pointer:we(e)})})),document.addEventListener("wheel",(e=>{e.preventDefault(),Se({kind:p.WHEEL,x:e.clientX,y:e.clientY,deltaY:e.deltaY})}),{passive:!1}),document.addEventListener("contextmenu",(e=>{e.preventDefault()})),document.addEventListener("touchend",(()=>{document.body.requestFullscreen()})),document.addEventListener("keydown",(e=>{e.preventDefault(),Se({kind:p.KEYDOWN,key:e.key})}));
//# sourceMappingURL=index.996c7a69.js.map
