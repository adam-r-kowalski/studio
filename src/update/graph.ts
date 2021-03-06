import { Body, Edge, GenerateUUID, Graph, Inputs, Node, Operation, Outputs, Position, UUID } from "../model/graph"

interface AddNodeInputs {
    graph: Graph
    operation: Operation
    position: Position
    generateUUID: GenerateUUID
}

interface AddNodeOutputs {
    graph: Graph
    node: UUID
}

export const addNode = ({ graph, operation, position, generateUUID }: AddNodeInputs): AddNodeOutputs => {
    const nodeUUID = generateUUID()
    const inputs: Inputs = { ...graph.inputs }
    const inputUUIDs = []
    for (const name of operation.inputs) {
        const uuid = generateUUID()
        inputs[uuid] = {
            uuid,
            node: nodeUUID,
            name
        }
        inputUUIDs.push(uuid)
    }
    const outputs: Outputs = { ...graph.outputs }
    const outputUUIDs = []
    for (const name of operation.outputs) {
        const uuid = generateUUID()
        outputs[uuid] = {
            uuid,
            node: nodeUUID,
            name,
            edges: []
        }
        outputUUIDs.push(uuid)
    }
    const node: Node = {
        uuid: nodeUUID,
        name: operation.name,
        inputs: inputUUIDs,
        outputs: outputUUIDs,
        position
    }
    if (operation.body !== undefined) {
        const body: Body = {
            uuid: generateUUID(),
            node: nodeUUID,
            value: operation.body
        }
        return {
            graph: {
                ...graph,
                nodes: { ...graph.nodes, [node.uuid]: { ...node, body: body.uuid } },
                inputs,
                outputs,
                bodys: { ...graph.bodys, [body.uuid]: body }
            },
            node: nodeUUID
        }
    } else {
        return {
            graph: {
                ...graph,
                nodes: { ...graph.nodes, [node.uuid]: node },
                inputs,
                outputs
            },
            node: nodeUUID
        }
    }
}

export const removeNode = (graph: Graph, node: UUID): Graph => {
    const nodes = { ...graph.nodes }
    const removedNode = nodes[node]
    delete nodes[node]
    const edgeUUIDs: UUID[] = []
    for (const input of removedNode.inputs) {
        const edge = graph.inputs[input].edge
        if (edge) edgeUUIDs.push(edge)
    }
    for (const output of removedNode.outputs) {
        for (const edge of graph.outputs[output].edges) {
            edgeUUIDs.push(edge)
        }
    }
    const edges = { ...graph.edges }
    const inputs = { ...graph.inputs }
    const outputs = { ...graph.outputs }
    for (const uuid of edgeUUIDs) {
        const edge = edges[uuid]
        const input = inputs[edge.input]
        inputs[edge.input] = {
            ...input,
            edge: undefined
        }
        const output = outputs[edge.output]
        outputs[edge.output] = {
            ...output,
            edges: output.edges.filter(e => e !== uuid)
        }
        delete edges[uuid]
    }
    for (const input of removedNode.inputs) delete inputs[input]
    for (const output of removedNode.outputs) delete outputs[output]
    return {
        ...graph,
        nodes,
        edges,
        inputs,
        outputs
    }
}

export const removeInputEdge = (graph: Graph, input: UUID): Graph => {
    const edgeUUID = graph.inputs[input].edge
    if (edgeUUID) {
        const edge = graph.edges[edgeUUID]
        const output = graph.outputs[edge.output]
        const outputs = {
            ...graph.outputs,
            [edge.output]: {
                ...output,
                edges: output.edges.filter(e => e !== edge.uuid)
            }
        }
        const input = graph.inputs[edge.input]
        const inputs = {
            ...graph.inputs,
            [edge.input]: {
                ...input,
                edge: undefined
            }
        }
        const edges = { ...graph.edges }
        delete edges[edgeUUID]
        return {
            ...graph,
            outputs,
            inputs,
            edges
        }
    } else {
        return graph
    }
}


export const removeOutputEdges = (graph: Graph, output: UUID): Graph => {
    const edges = { ...graph.edges }
    const inputs = { ...graph.inputs }
    const outputs = { ...graph.outputs }
    for (const uuid of graph.outputs[output].edges) {
        const edge = graph.edges[uuid]
        const input = inputs[edge.input]
        inputs[edge.input] = {
            ...input,
            edge: undefined
        }
        const output = outputs[edge.output]
        outputs[edge.output] = {
            ...output,
            edges: output.edges.filter(e => e !== uuid)
        }
        delete edges[uuid]
    }
    return {
        ...graph,
        outputs,
        inputs,
        edges
    }
}


interface AddEdgeInputs {
    graph: Graph
    input: UUID
    output: UUID
    generateUUID: GenerateUUID
}

interface AddEdgeOutputs {
    graph: Graph
    edge: UUID
}

export const addEdge = ({ graph, input, output, generateUUID }: AddEdgeInputs): AddEdgeOutputs => {
    const edge: Edge = {
        uuid: generateUUID(),
        input,
        output
    }
    const inputs: Inputs = {
        ...graph.inputs,
        [input]: {
            ...graph.inputs[input],
            edge: edge.uuid
        }
    }
    const currentOutput = graph.outputs[output]
    const outputs: Outputs = {
        ...graph.outputs,
        [output]: {
            ...currentOutput,
            edges: [...currentOutput.edges, edge.uuid]
        }
    }
    return {
        graph: {
            ...graph,
            inputs,
            outputs,
            edges: {
                ...graph.edges,
                [edge.uuid]: edge
            }
        },
        edge: edge.uuid
    }
}

export const changeNodePosition = (graph: Graph, node: UUID, transform: (position: Position) => Position): Graph => {
    const currentNode = graph.nodes[node]
    return {
        ...graph,
        nodes: {
            ...graph.nodes,
            [node]: {
                ...currentNode,
                position: transform(currentNode.position)
            }
        }
    }
}

export const changeBodyValue = (graph: Graph, body: UUID, transform: (value: number) => number): Graph => {
    const currentBody = graph.bodys[body]
    return {
        ...graph,
        bodys: {
            ...graph.bodys,
            [body]: {
                ...currentBody,
                value: transform(currentBody.value)
            }
        }
    }
}