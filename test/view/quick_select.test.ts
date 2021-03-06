import { Focus, FocusKind } from "../../src/model/focus"
import { Input, Output } from "../../src/model/graph"
import { PointerActionKind } from "../../src/model/pointer_action"
import { QuickSelectKind } from "../../src/model/quick_select"
import { Theme } from "../../src/model/theme"
import { container, row, text } from "../../src/ui"
import { CrossAxisAlignment } from "../../src/ui/alignment"
import { AppEvent, EventKind } from "../../src/update"
import { inputUi, outputUi, spacer } from "../../src/view"

const theme: Theme = {
    background: { red: 2, green: 22, blue: 39, alpha: 255 },
    node: { red: 41, green: 95, blue: 120, alpha: 255 },
    focusNode: { red: 23, green: 54, blue: 69, alpha: 255 },
    input: { red: 188, green: 240, blue: 192, alpha: 255 },
    focusInput: { red: 175, green: 122, blue: 208, alpha: 255 },
    connection: { red: 255, green: 255, blue: 255, alpha: 255 },
}


test("inputUi with quick select", () => {
    const input: Input = {
        uuid: 'uuid',
        node: 'node',
        name: 'name',
    }
    const focus: Focus = {
        kind: FocusKind.NONE,
        pointerAction: { kind: PointerActionKind.NONE },
        quickSelect: {
            kind: QuickSelectKind.INPUT,
            hotkeys: {
                'uuid': 'a'
            }
        }
    }
    const actual = inputUi(theme, input, focus)
    const expected = container<AppEvent>({
        onClick: {
            kind: EventKind.CLICKED_INPUT,
            input: 'uuid'
        }
    },
        row({ crossAxisAlignment: CrossAxisAlignment.CENTER }, [
            container({
                id: 'uuid',
                padding: { top: 2, right: 4, bottom: 2, left: 4 },
                color: theme.input,
            }, text({ color: theme.background }, "a")),
            spacer(4),
            text('name')
        ])
    )
    expect(actual).toEqual(expected)
})

test("outputUI with quick select", () => {
    const output: Output = {
        uuid: 'uuid',
        node: 'node',
        name: 'name',
        edges: []
    }
    const focus: Focus = {
        kind: FocusKind.NONE,
        pointerAction: { kind: PointerActionKind.NONE },
        quickSelect: {
            kind: QuickSelectKind.OUTPUT,
            hotkeys: {
                'uuid': 'a'
            }
        }
    }
    const actual = outputUi(theme, output, focus)
    const expected = container<AppEvent>({
        onClick: {
            kind: EventKind.CLICKED_OUTPUT,
            output: 'uuid'
        }
    },
        row({ crossAxisAlignment: CrossAxisAlignment.CENTER }, [
            text('name'),
            spacer(4),
            container({
                id: 'uuid',
                padding: { top: 2, right: 4, bottom: 2, left: 4 },
                color: theme.input
            }, text({ color: theme.background }, "a")),
        ])
    )
    expect(actual).toEqual(expected)
})
