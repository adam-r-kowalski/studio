import { Color, Constraints, Entry, Font, MeasureText, Offset, Size, TextMeasurements, UIKind, WorldSpace } from ".";
import { activeCamera, CameraStack, transformWorldSpace } from "./camera_stack";

export interface TextLayout {
    readonly measurements: TextMeasurements
    readonly size: Size
}

export interface TextGeometry {
    readonly worldSpace: WorldSpace
    readonly textureIndex: number
    readonly textureCoordinates: number[]
    readonly colors: number[]
    readonly vertices: number[]
    readonly vertexIndices: number[]
    readonly cameraIndex: number[]
}

export interface Text<AppEvent> {
    readonly id?: string
    readonly onClick?: AppEvent
    readonly kind: UIKind.TEXT
    readonly font: Font
    readonly color: Color
    readonly str: string
}

interface Properties {
    readonly font?: string
    readonly size?: number
    readonly color?: Color
}

export function text<AppEvent>(str: string): Text<AppEvent>
export function text<AppEvent>(properties: Properties, str: string): Text<AppEvent>
export function text<AppEvent>(...args: any[]): Text<AppEvent> {
    const [properties, str]: [Properties, string] = (() =>
        typeof args[0] == 'string' ? [{}, args[0]] : [args[0], args[1]]
    )()
    return {
        kind: UIKind.TEXT,
        font: {
            family: properties.font ?? "monospace",
            size: properties.size ?? 14
        },
        color: properties.color ?? { red: 255, green: 255, blue: 255, alpha: 255 },
        str
    }
}

export const textLayout = <AppEvent>({ font, str }: Text<AppEvent>, _: Constraints, measureText: MeasureText): TextLayout => {
    const measurements = measureText(font, str)
    const width = measurements.widths.reduce((acc, width) => acc + width)
    const size = { width, height: font.size }
    return { measurements, size }
}

const vertices = (widths: number[], height: number, offset: Offset) => {
    const result = []
    let offsetX = offset.x
    const y0 = offset.y
    const y1 = offset.y + height
    for (const width of widths) {
        const x0 = offsetX
        const x1 = offsetX + width
        result.push(
            x0, y0,
            x0, y1,
            x1, y0,
            x1, y1
        )
        offsetX += width
    }
    return result
}

const colors = (n: number, { red, green, blue, alpha }: Color) => {
    const result = []
    for (let i = 0; i < n; ++i) {
        result.push(
            red, green, blue, alpha,
            red, green, blue, alpha,
            red, green, blue, alpha,
            red, green, blue, alpha,
        )
    }
    return result
}

const vertexIndices = (n: number) => {
    const result = []
    let offset = 0
    for (let i = 0; i < n; ++i) {
        result.push(
            offset, offset + 1, offset + 2,
            offset + 1, offset + 2, offset + 3
        )
        offset += 4
    }
    return result
}

export const textGeometry = <AppEvent>(ui: Text<AppEvent>, layout: TextLayout, offset: Offset, cameraStack: CameraStack): TextGeometry => {
    const textLayout = layout as TextLayout
    const { measurements } = textLayout
    const { textureIndex, textureCoordinates, widths } = measurements
    return {
        worldSpace: transformWorldSpace(cameraStack, {
            x0: offset.x,
            y0: offset.y,
            x1: offset.x + layout.size.width,
            y1: offset.y + layout.size.height
        }),
        textureIndex,
        textureCoordinates: textureCoordinates.flat(),
        colors: colors(widths.length, ui.color),
        vertices: vertices(widths, ui.font.size, offset),
        vertexIndices: vertexIndices(widths.length),
        cameraIndex: Array(widths.length * 4).fill(activeCamera(cameraStack))
    }
}

export function* textTraverse<AppEvent>(ui: Text<AppEvent>, layout: TextLayout, geometry: TextGeometry, z: number): Generator<Entry<AppEvent>> {
    yield { ui, layout, geometry, z }
}