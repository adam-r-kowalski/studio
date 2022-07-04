import { rgba } from '../src/color'
import { container, containerGeometry, containerLayout } from '../src/ui/container'
import { center, centerGeometry, centerLayout } from '../src/ui/center'
import { mockMeasureText } from '../src/renderer/mock'
import { stack, stackGeometry, stackLayout } from '../src/ui/stack'
import { reduce } from '../src/reduce'
import { Batch, batchGeometry } from '../src/renderer/batch_geometry'
import { CameraStack } from '../src/camera_stack'
import { layerGeometry } from '../src/renderer/render'


test("stack layout", () => {
    const ui = stack([
        container({ color: rgba(255, 0, 0, 255) }),
        center(
            container({
                width: 50,
                height: 50,
                color: rgba(0, 255, 0, 255)
            })
        )
    ])
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, mockMeasureText)
    const expectedLayout = stackLayout({ width: 100, height: 100 }, [
        containerLayout({ width: 100, height: 100 }),
        centerLayout({ width: 100, height: 100 },
            containerLayout({ width: 50, height: 50 }))
    ])
    expect(layout).toEqual(expectedLayout)
})

test("stack geometry", () => {
    const ui = stack([
        container({ color: rgba(255, 0, 0, 255) }),
        center(
            container({
                width: 50,
                height: 50,
                color: rgba(0, 255, 0, 255)
            })
        )
    ])
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, mockMeasureText)
    const offsets = { x: 0, y: 0 }
    const geometry = ui.geometry(layout, offsets, new CameraStack())
    const expectedGeometry = stackGeometry({ x0: 0, y0: 0, x1: 100, y1: 100 }, [
        containerGeometry({
            worldSpace: { x0: 0, y0: 0, x1: 100, y1: 100 },
            vertices: [
                0, 0,
                0, 100,
                100, 0,
                100, 100,
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
        }),
        centerGeometry({ x0: 0, y0: 0, x1: 100, y1: 100 },
            containerGeometry({
                worldSpace: { x0: 25, y0: 25, x1: 75, y1: 75 },
                vertices: [
                    25, 25,
                    25, 75,
                    75, 25,
                    75, 75,
                ],
                colors: [
                    0, 255, 0, 255,
                    0, 255, 0, 255,
                    0, 255, 0, 255,
                    0, 255, 0, 255,
                ],
                vertexIndices: [
                    0, 1, 2,
                    1, 2, 3
                ],
                cameraIndex: Array(4).fill(0)
            })
        )
    ])
    expect(geometry).toEqual(expectedGeometry)
})

test("stack layers", () => {
    const ui = stack([
        container({ color: rgba(255, 0, 0, 255) }),
        center(
            container({
                width: 50,
                height: 50,
                color: rgba(0, 255, 0, 255)
            })
        )
    ])
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, mockMeasureText)
    const offsets = { x: 0, y: 0 }
    const geometry = ui.geometry(layout, offsets, new CameraStack())
    const layers = reduce(ui, layout, geometry, layerGeometry)
    const layer0 = new Map()
    layer0.set(0, [containerGeometry({
        worldSpace: { x0: 0, y0: 0, x1: 100, y1: 100 },
        vertices: [
            0, 0,
            0, 100,
            100, 0,
            100, 100,
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
    })])
    const layer2 = new Map()
    layer2.set(0, [containerGeometry({
        worldSpace: { x0: 25, y0: 25, x1: 75, y1: 75 },
        vertices: [
            25, 25,
            25, 75,
            75, 25,
            75, 75,
        ],
        colors: [
            0, 255, 0, 255,
            0, 255, 0, 255,
            0, 255, 0, 255,
            0, 255, 0, 255,
        ],
        vertexIndices: [
            0, 1, 2,
            1, 2, 3
        ],
        cameraIndex: Array(4).fill(0)
    })])
    const expectedLayers = [layer0, new Map(), layer2]
    expect(layers).toEqual(expectedLayers)
})

test("stack batches", () => {
    const ui = stack([
        container({ color: rgba(255, 0, 0, 255) }),
        center(
            container({
                width: 50,
                height: 50,
                color: rgba(0, 255, 0, 255)
            })
        )
    ])
    const constraints = { minWidth: 0, maxWidth: 100, minHeight: 0, maxHeight: 100 }
    const layout = ui.layout(constraints, mockMeasureText)
    const offsets = { x: 0, y: 0 }
    const geometry = ui.geometry(layout, offsets, new CameraStack())
    const layers = reduce(ui, layout, geometry, layerGeometry)
    const batches = batchGeometry(layers)
    const expectedBatches: Batch[] = [
        {
            vertices: [
                0, 0,
                0, 100,
                100, 0,
                100, 100,

                25, 25,
                25, 75,
                75, 25,
                75, 75,
            ],
            colors: [
                255, 0, 0, 255,
                255, 0, 0, 255,
                255, 0, 0, 255,
                255, 0, 0, 255,

                0, 255, 0, 255,
                0, 255, 0, 255,
                0, 255, 0, 255,
                0, 255, 0, 255,
            ],
            vertexIndices: [
                0, 1, 2,
                1, 2, 3,

                4, 5, 6,
                5, 6, 7
            ],
            textureIndex: 0,
            textureCoordinates: [
                0, 0,
                0, 0,
                0, 0,
                0, 0,

                0, 0,
                0, 0,
                0, 0,
                0, 0,
            ],
            cameraIndex: Array(8).fill(0)
        }
    ]
    expect(batches).toEqual(expectedBatches)
})
