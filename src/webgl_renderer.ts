import { ECS, Entity } from './ecs'
import { projection } from './linear_algebra'
import { Geometry, Translate, Scale, Rotate, Fill, WireFrame } from './components'

export class Renderer {
  element: HTMLCanvasElement
  gl: WebGL2RenderingContext
  uMatrix: WebGLUniformLocation
  uColor: WebGLUniformLocation
  position: { buffer: WebGLBuffer, location: number }
  indexBuffer: WebGLBuffer
  ecs: ECS

  constructor(ecs: ECS) {
    const canvas = document.createElement('canvas')
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    const gl = canvas.getContext('webgl2')
    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    this.element = canvas
    this.ecs = ecs
    this.gl = gl

    const vertexShaderSource = `#version 300 es
in vec4 a_position;

uniform mat4 u_matrix;

void main() {
  gl_Position = u_matrix * a_position;
}
`

    const fragmentShaderSource = `#version 300 es
precision mediump float;

out vec4 fragColor;

uniform vec4 u_color;

vec4 hslToRgb( in vec4 hsl) {
 float h = hsl.x / 360.0;
 vec3 rgb = clamp( abs(mod(h*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
 return vec4(hsl.z + hsl.y * (rgb-0.5)*(1.0-abs(2.0*hsl.z-1.0)), hsl.w);
}

void main() {
  fragColor = hslToRgb(u_color);
}
`

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log(gl.getShaderInfoLog(vertexShader))
      console.log(gl.getShaderInfoLog(fragmentShader))
    }
    gl.useProgram(program)
    this.uMatrix = gl.getUniformLocation(program, 'u_matrix')
    this.uColor = gl.getUniformLocation(program, 'u_color')

    this.position = {
      buffer: gl.createBuffer(),
      location: gl.getAttribLocation(program, 'a_position')
    }
    gl.enableVertexAttribArray(this.position.location)

    this.indexBuffer = gl.createBuffer()
    const resizeObserver = new ResizeObserver(this.onResize)
    try {
      resizeObserver.observe(canvas, { box: 'device-pixel-content-box' })
    } catch (ex) {
      resizeObserver.observe(canvas, { box: 'content-box' })
    }
  }

  onResize = (entries: ResizeObserverEntry[]): void => {
    const entry = entries[0]
    const { width, height, dpr } = (() => {
      if (entry.devicePixelContentBoxSize) return {
        width: entry.devicePixelContentBoxSize[0].inlineSize,
        height: entry.devicePixelContentBoxSize[0].blockSize,
        dpr: 1
      }
      if (entry.contentBoxSize) return {
        width: entry.contentBoxSize[0].inlineSize,
        height: entry.contentBoxSize[0].blockSize,
        dpr: window.devicePixelRatio
      }
      return {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        dpr: window.devicePixelRatio
      }
    })()
    const canvas = this.gl.canvas
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    this.gl.viewport(0, 0, canvas.width, canvas.height)
    this.render()
  }

  render = (): void => {
    const start = performance.now()
    const gl = this.gl
    gl.clear(gl.COLOR_BUFFER_BIT)
    const dpr = window.devicePixelRatio
    const view = projection(gl.canvas.width / dpr, gl.canvas.height / dpr, 400)
    for (const entity of this.ecs.query(Geometry)) {
      const geometry = entity.get(Geometry)
      gl.bindBuffer(gl.ARRAY_BUFFER, this.position.buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.vertices), gl.STATIC_DRAW)
      gl.vertexAttribPointer(this.position.location, /*size*/3, /*type*/gl.FLOAT, /*normalize*/false, /*stride*/0, /*offset*/0)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(geometry.indices), gl.STATIC_DRAW)
      const matrix = view
        .mul(entity.get(Translate).matrix())
        .mul(entity.get(Rotate).matrix())
        .mul(entity.get(Scale).matrix())
      gl.uniformMatrix4fv(this.uMatrix, /*transpose*/false, matrix.data)
      const fill = entity.get(Fill)
      gl.uniform4f(this.uColor, fill.h, fill.s, fill.l, fill.a)
      gl.drawElements(gl.TRIANGLES, /*count*/geometry.indices.length, /*index type*/gl.UNSIGNED_BYTE, /*offset*/0)
      const wireFrame = entity.get(WireFrame)
      gl.uniform4f(this.uColor, wireFrame.h, wireFrame.s, wireFrame.l, wireFrame.a)
      gl.drawElements(gl.LINE_STRIP, /*count*/geometry.indices.length, /*index type*/gl.UNSIGNED_BYTE, /*offset*/0)
    }
    const stop = performance.now()
    console.log(`frame took ${stop - start} ms`)
  }
}
