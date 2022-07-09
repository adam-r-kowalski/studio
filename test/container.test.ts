import { container, containerLayout, containerGeometry } from '../src/ui/container'
import { padding } from '../src/padding'
import { reduce } from '../src/reduce'
import { batchGeometry } from '../src/renderer/batch_geometry'
import { mockDocument, mockWindow } from '../src/renderer/mock'
import { CameraStack } from '../src/camera_stack'
import { layerGeometry } from '../src/renderer/render'
import { webGL2Renderer } from '../src/renderer/webgl2'

const red = { red: 255, green: 0, blue: 0, alpha: 255 }

const mockRenderer = () => webGL2Renderer({
    width: 500,
    height: 500,
    document: mockDocument(),
    window: mockWindow()
})


test("container layout", () => {
    const renderer = mockRenderer()
    const ui = container({
        width: 50,
        height: 50,
        color: red
    })
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, renderer.measureText)
    const expectedLayout = containerLayout({ width: 50, height: 50 })
    expect(layout).toEqual(expectedLayout)
})

test("container geometry", () => {
    const renderer = mockRenderer()
    const ui = container({
        width: 50,
        height: 50,
        color: red
    })
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, renderer.measureText)
    const offsets = { x: 0, y: 0 }
    const geometry = ui.geometry(layout, offsets, new CameraStack())
    const expectedGeometry = containerGeometry({
        worldSpace: { x0: 0, y0: 0, x1: 50, y1: 50 },
        vertices: [
            0, 0,
            0, 50,
            50, 0,
            50, 50,
        ],
        colors: [
            255, 0, 0, 255,
            255, 0, 0, 255,
            255, 0, 0, 255,
            255, 0, 0, 255,
        ],
        vertexIndices: [
            0, 1, 2,
            1, 2, 3
        ],
        cameraIndex: Array(4).fill(0)
    })
    expect(geometry).toEqual(expectedGeometry)
})

test("container layers", () => {
    const renderer = mockRenderer()
    const ui = container({
        width: 50,
        height: 50,
        color: red
    })
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, renderer.measureText)
    const offsets = { x: 0, y: 0 }
    const geometry = ui.geometry(layout, offsets, new CameraStack())
    const layers = reduce(ui, layout, geometry, layerGeometry)
    const layer = new Map()
    layer.set(0, [
        containerGeometry({
            worldSpace: { x0: 0, y0: 0, x1: 50, y1: 50 },
            vertices: [
                0, 0,
                0, 50,
                50, 0,
                50, 50,
            ],
            colors: [
                255, 0, 0, 255,
                255, 0, 0, 255,
                255, 0, 0, 255,
                255, 0, 0, 255,
            ],
            vertexIndices: [
                0, 1, 2,
                1, 2, 3
            ],
            cameraIndex: Array(4).fill(0)
        })
    ])
    const expectedLayers = [layer]
    expect(layers).toEqual(expectedLayers)
})

test("container batches", () => {
    const renderer = mockRenderer()
    const ui = container({
        width: 50,
        height: 50,
        color: red
    })
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, renderer.measureText)
    const offsets = { x: 0, y: 0 }
    const geometry = ui.geometry(layout, offsets, new CameraStack())
    const layers = reduce(ui, layout, geometry, layerGeometry)
    const batches = batchGeometry(layers)
    const expectedBatches = [
        {
            vertices: [
                0, 0,
                0, 50,
                50, 0,
                50, 50,
            ],
            colors: [
                255, 0, 0, 255,
                255, 0, 0, 255,
                255, 0, 0, 255,
                255, 0, 0, 255,
            ],
            vertexIndices: [
                0, 1, 2,
                1, 2, 3
            ],
            textureIndex: 0,
            textureCoordinates: [
                0, 0,
                0, 0,
                0, 0,
                0, 0,
            ],
            cameraIndex: Array(4).fill(0)
        }
    ]
    expect(batches).toEqual(expectedBatches)
})


test("container within container layout", () => {
    const renderer = mockRenderer()
    const ui = container({ padding: padding(5) },
        container({
            width: 50,
            height: 50,
            color: red
        }))
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, renderer.measureText)
    const expectedLayout = containerLayout({ width: 60, height: 60 },
        containerLayout({ width: 50, height: 50 }))
    expect(layout).toEqual(expectedLayout)
})

test("container within container geometry", () => {
    const renderer = mockRenderer()
    const ui = container({ padding: padding(5) },
        container({
            width: 50,
            height: 50,
            color: red
        }))
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, renderer.measureText)
    const offsets = { x: 0, y: 0 }
    const geometry = ui.geometry(layout, offsets, new CameraStack())
    const expectedGeometry = containerGeometry({ worldSpace: { x0: 0, y0: 0, x1: 60, y1: 60 } },
        containerGeometry({
            worldSpace: { x0: 5, y0: 5, x1: 55, y1: 55 },
            vertices: [
                5, 5,
                5, 55,
                55, 5,
                55, 55,
            ],
            colors: [
                255, 0, 0, 255,
                255, 0, 0, 255,
                255, 0, 0, 255,
                255, 0, 0, 255,
            ],
            vertexIndices: [
                0, 1, 2,
                1, 2, 3
            ],
            cameraIndex: Array(4).fill(0)
        }))
    expect(geometry).toEqual(expectedGeometry)
})

test("container within container layers", () => {
    const renderer = mockRenderer()
    const ui = container({ padding: padding(5) },
        container({
            width: 50,
            height: 50,
            color: red
        }))
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, renderer.measureText)
    const offsets = { x: 0, y: 0 }
    const geometry = ui.geometry(layout, offsets, new CameraStack())
    const layers = reduce(ui, layout, geometry, layerGeometry)
    const childGeometry = containerGeometry({
        worldSpace: { x0: 5, y0: 5, x1: 55, y1: 55 },
        vertices: [
            5, 5,
            5, 55,
            55, 5,
            55, 55,
        ],
        colors: [
            255, 0, 0, 255,
            255, 0, 0, 255,
            255, 0, 0, 255,
            255, 0, 0, 255,
        ],
        vertexIndices: [
            0, 1, 2,
            1, 2, 3
        ],
        cameraIndex: Array(4).fill(0)
    })
    const layer = new Map()
    layer.set(0, [childGeometry])
    const expectedLayers = [new Map(), layer]
    expect(layers).toEqual(expectedLayers)
})

test("container within container batches", () => {
    const renderer = mockRenderer()
    const ui = container({ padding: padding(5) },
        container({
            width: 50,
            height: 50,
            color: red
        }))
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, renderer.measureText)
    const offsets = { x: 0, y: 0 }
    const geometry = ui.geometry(layout, offsets, new CameraStack())
    const layers = reduce(ui, layout, geometry, layerGeometry)
    const batches = batchGeometry(layers)
    const expectedBatches = [
        {
            vertices: [
                5, 5,
                5, 55,
                55, 5,
                55, 55,
            ],
            colors: [
                255, 0, 0, 255,
                255, 0, 0, 255,
                255, 0, 0, 255,
                255, 0, 0, 255,
            ],
            vertexIndices: [
                0, 1, 2,
                1, 2, 3
            ],
            textureIndex: 0,
            textureCoordinates: [
                0, 0,
                0, 0,
                0, 0,
                0, 0,
            ],
            cameraIndex: Array(4).fill(0)
        }
    ]
    expect(batches).toEqual(expectedBatches)
})