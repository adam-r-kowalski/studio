import { Entry } from "."
import { ClickHandlers } from "./gather_on_click_handlers"
import * as gatherOnClickHandlers from "./gather_on_click_handlers"
import { IdToWorldSpace } from "./id_to_world_space"
import * as buildIdToWorldSpace from "./id_to_world_space"
import { Layers } from "./layer_geometry"
import * as layerGeometry from "./layer_geometry"
import { Connections } from "./gather_connections"
import * as gatherConnections from "./gather_connections"

export interface Accumulator<AppEvent> {
    layers: Layers,
    clickHandlers: ClickHandlers<AppEvent>,
    idToWorldSpace: IdToWorldSpace
    connections: Connections
}

export const initial = <AppEvent>(): Accumulator<AppEvent> => ({
    layers: layerGeometry.initial(),
    clickHandlers: gatherOnClickHandlers.initial(),
    idToWorldSpace: buildIdToWorldSpace.initial(),
    connections: gatherConnections.initial()
})

export const combine = <AppEvent>(acc: Accumulator<AppEvent>, entry: Entry<AppEvent>): Accumulator<AppEvent> => ({
    layers: layerGeometry.combine(acc.layers, entry),
    clickHandlers: gatherOnClickHandlers.combine(acc.clickHandlers, entry),
    idToWorldSpace: buildIdToWorldSpace.combine(acc.idToWorldSpace, entry),
    connections: gatherConnections.combine(acc.connections, entry)
})
