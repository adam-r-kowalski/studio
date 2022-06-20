export interface Offset {
    x: number
    y: number
}

export interface Position {
    x: number
    y: number
}

export interface Geometry {
    position: Position
    vertices: number[]
    colors: number[]
    vertexIndices: number[]
}