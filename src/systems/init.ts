import { DraggedEntity, Dragging, PointerDistance, Pointers } from "../components";
import { ECS } from "../ecs";
import { pointerDown } from "./pointerDown";
import { pointerMove } from "./pointerMove";
import { pointerUp } from "./pointerUp";

export const init = (ecs: ECS) => {
    ecs.set(
        new Pointers([]),
        new PointerDistance(0),
        new Dragging(false),
        new DraggedEntity(null)
    )
    pointerDown(ecs)
    pointerMove(ecs)
    pointerUp(ecs)
}