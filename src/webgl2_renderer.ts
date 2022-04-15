import { Scene } from './scene'

interface Renderer {
  gl: WebGL2RenderingContext
  position: { buffer: WebGLBuffer, location: number }
  color: { buffer: WebGLBuffer, location: number }
}

const vertexShaderSource = `#version 300 es
uniform vec2 uResolution;
in vec2 aPosition;
in vec3 aColor;
out vec3 vColor;

void main() {
  vColor = aColor;
  vec2 clipSpace = aPosition / uResolution * 2.0 - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);
}
`

const fragmentShaderSource = `#version 300 es
precision mediump float;

in vec3 vColor;
out vec4 fragColor;

void main() {
  fragColor = vec4(vColor, 1.0);
}
`

export const initRenderer = (): Renderer => {
  const canvas: HTMLCanvasElement = document.querySelector('#gl_canvas')
  const gl = canvas.getContext('webgl2')
  gl.canvas.width = gl.canvas.clientWidth
  gl.canvas.height = gl.canvas.clientHeight
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0.0, 0.0, 0.0, 1.0)

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

  const uResolution = gl.getUniformLocation(program, 'uResolution')
  const aPosition = gl.getAttribLocation(program, 'aPosition')
  const aColor = gl.getAttribLocation(program, 'aColor')

  gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height)
  gl.enableVertexAttribArray(aPosition)
  gl.enableVertexAttribArray(aColor)

  return {
    gl,
    position: {
      location: aPosition,
      buffer: gl.createBuffer(),
    },
    color: {
      location: aColor,
      buffer: gl.createBuffer(),
    }
  }
}

export const render = (renderer: Renderer, scene: Scene): void => {
  const { gl, position, color } = renderer
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.bindBuffer(gl.ARRAY_BUFFER, position.buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(scene.vertices[0]), gl.STATIC_DRAW)
  gl.vertexAttribPointer(position.location, /*size*/2, /*type*/gl.FLOAT, /*normalize*/false, /*stride*/0, /*offset*/0)

  gl.bindBuffer(gl.ARRAY_BUFFER, color.buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(scene.colors[0]), gl.STATIC_DRAW)
  gl.vertexAttribPointer(color.location, /*size*/3, /*type*/gl.UNSIGNED_BYTE, /*normalize*/true, /*stride*/0, /*offset*/0)

  gl.drawArrays(gl.TRIANGLES, /*offset*/0, /*count*/scene.vertices[0].length / 2)
}