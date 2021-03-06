import { AppEvent, EventKind, update } from "./update"
import { run, transformPointer } from "./ui/run"
import { view } from './view'
import { Model } from "./model"
import { demoModel } from "./model/demo"
import { Document } from './ui/dom'
import { ProgramKind } from "./ui/webgl2"

const generateUUID = () => crypto.randomUUID()

const success_or_error = run({
    model: demoModel(generateUUID),
    view,
    update: (model: Model, event: AppEvent) => update(generateUUID, model, event),
    window,
    document: document as Document,
    requestAnimationFrame,
    setTimeout,
    pointerDown: (dispatch, pointer) => {
        dispatch({
            kind: EventKind.POINTER_DOWN,
            pointer
        })
    }
})

if (success_or_error.kind == ProgramKind.ERROR) {
    throw success_or_error
}

const dispatch = success_or_error.dispatch

if (typeof PointerEvent.prototype.getCoalescedEvents === 'function') {
    document.addEventListener('pointermove', (e) => {
        e.getCoalescedEvents().forEach(p => {
            dispatch({
                kind: EventKind.POINTER_MOVE,
                pointer: transformPointer(p)
            })
        })
    })
} else {
    document.addEventListener('pointermove', p =>
        dispatch({
            kind: EventKind.POINTER_MOVE,
            pointer: transformPointer(p)
        })
    )
}

document.addEventListener("pointerup", p => {
    dispatch({
        kind: EventKind.POINTER_UP,
        pointer: transformPointer(p)
    })
})

document.addEventListener('wheel', e => {
    e.preventDefault()
    dispatch({
        kind: EventKind.WHEEL,
        position: { x: e.clientX, y: e.clientY },
        deltaY: e.deltaY,
    })
}, { passive: false })

document.addEventListener('contextmenu', e => {
    e.preventDefault()
})

document.addEventListener('touchend', () => {
    document.body.requestFullscreen()
})

document.addEventListener('keydown', e => {
    e.preventDefault()
    dispatch({
        kind: EventKind.KEYDOWN,
        key: e.key
    })
})