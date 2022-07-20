import { Canvas, PointerEvent, Style, TexImage2D } from "./dom"

export class MockBuffer {

}

export class MockProgram {

}

export class MockShader {

}

export class MockTexture {

}

export class MockVertexArrayObject {

}

export class MockUniformLocation {

}

export class MockWebGL2Context {
    BLEND = 0
    SRC_ALPHA = 0
    ONE_MINUS_SRC_ALPHA = 0
    TEXTURE0 = 0
    UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0
    TEXTURE_2D = 0
    RGBA = 0
    UNSIGNED_BYTE = 0
    UNSIGNED_SHORT = 0
    FLOAT = 0
    LINK_STATUS = 0
    VERTEX_SHADER = 0
    FRAGMENT_SHADER = 0
    TEXTURE_WRAP_S = 0
    TEXTURE_WRAP_T = 0
    CLAMP_TO_EDGE = 0
    COLOR_BUFFER_BIT = 0
    ARRAY_BUFFER = 0
    ELEMENT_ARRAY_BUFFER = 0
    TRIANGLES = 0
    LINES = 0
    STATIC_DRAW = 0

    constructor(public canvas: MockCanvas, public simulate_failure: boolean) { }

    enable = (cap: number): void => { }
    blendFunc = (sfactor: number, dfactor: number): void => { }
    depthMask = (flag: boolean): void => { }
    activeTexture = (texture: number): void => { }
    pixelStorei = (pname: number, param: number | boolean): void => { }
    clearColor = (red: number, green: number, blue: number, alpha: number): void => { }
    createBuffer = (): MockBuffer | null => new MockBuffer()
    createProgram = (): MockProgram | null => new MockProgram()
    createShader = (type: number): MockShader | null => new MockShader()
    shaderSource = (shader: MockShader, source: string): void => { }
    compileShader = (shader: MockShader): void => { }
    createTexture = (): MockTexture | null => new MockTexture()
    bindTexture = (target: number, texture: MockTexture | null): void => { }
    bindBuffer = (target: number, buffer: MockBuffer | null): void => { }
    bufferData = (target: number, srcData: BufferSource | null, usage: number): void => { }
    attachShader = (program: MockProgram, shader: MockShader): void => { }
    linkProgram = (program: MockProgram): void => { }
    getProgramParameter = (program: MockProgram, pname: number): any => !this.simulate_failure
    getShaderInfoLog = (shader: MockShader): string | null => null
    useProgram = (program: MockProgram): void => { }
    createVertexArray = (): MockVertexArrayObject | null => new MockVertexArrayObject()
    bindVertexArray = (array: MockVertexArrayObject | null): void => { }
    getUniformLocation = (program: MockProgram, name: string): MockUniformLocation | null => new MockUniformLocation()
    generateMipmap = (target: number): void => { }
    texParameteri = (target: number, pname: number, param: number): void => { }
    clear = (mask: number): void => { }
    uniformMatrix3fv = (
        location: MockUniformLocation | null,
        transpose: boolean,
        data: Iterable<number>
    ): void => { }
    viewport = (x: number, y: number, width: number, height: number): void => { }
    drawElements = (mode: number, count: number, type: number, offset: number): void => { }
    drawArrays = (mode: number, first: number, count: number): void => { }
    bindAttribLocation = (program: MockProgram, index: number, name: string): void => { }
    enableVertexAttribArray = (index: number): void => { }
    vertexAttribPointer = (
        index: number,
        size: number,
        type: number,
        normalized: boolean,
        stride: number,
        offset: number
    ): void => { }
    vertexAttribIPointer = (
        index: number,
        size: number,
        type: number,
        stride: number,
        offset: number
    ): void => { }
    texImage2D: TexImage2D = (...args: any[]): void => { }
}

export class MockTextMetrics {
    constructor(public width: number) { }
}

export class MockCanvasContext {
    font: string = 'monospace 24px'
    textAlign: 'left' = 'left'
    textBaseline: 'top' = 'top'
    fillStyle: 'white' = 'white'

    constructor(public canvas: MockCanvas) { }

    scale = (x: number, y: number): void => { }
    clearRect = (x: number, y: number, w: number, h: number): void => { }
    measureText = (text: string): MockTextMetrics => new MockTextMetrics(24 * text.length)
    fillText = (text: string, x: number, y: number): void => { }
}

export class MockCanvas {
    style: Style = { width: '0px', height: '0px', touchAction: 'none' }
    width: number = 0
    height: number = 0

    constructor(public simulate_failure: boolean) {
        this.getContext = this.getContext.bind(this)
    }

    getContext(contextId: 'webgl2'): MockWebGL2Context
    getContext(contextId: '2d'): MockCanvasContext
    getContext(contextId: 'webgl2' | '2d') {
        switch (contextId) {
            case 'webgl2': return new MockWebGL2Context(this, this.simulate_failure)
            case '2d': return new MockCanvasContext(this)
        }
    }
}

export const mockDocument = (simulate_failure: boolean = false) => {
    const callbacks: ((p: PointerEvent) => void)[] = []
    return {
        createElement: (tagName: 'canvas') => new MockCanvas(simulate_failure),
        addEventListener: (event: "pointerdown", callback: (p: PointerEvent) => void) => {
            callbacks.push(callback)
        },
        body: {
            appendChild: (canvas: Canvas) => { }
        },
        fireEvent: (_: 'pointerdown', p: PointerEvent) => {
            for (const callback of callbacks) {
                callback(p)
            }
        }
    }
}

export const mockWindow = () => {
    const callbacks: (() => void)[] = []
    return {
        devicePixelRatio: 1,
        innerWidth: 500,
        innerHeight: 500,
        addEventListener: (event: "resize", callback: () => void) => {
            callbacks.push(callback)
        },
        fireEvent: (_: "resize") => {
            for (const callback of callbacks) {
                callback()
            }
        }
    }
}