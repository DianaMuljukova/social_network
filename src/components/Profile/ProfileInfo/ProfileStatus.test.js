import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in state", () => {
        const component = create(<ProfileStatus status="test" />);
        const instanse = component.getInstance();
        expect(instanse.state.status).toBe("test");
    });

    test("should be span after creation", () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.length).not.toBeNull();
    });

    test("after creation input shouldnt be displayed", () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("test");
    });

    test("input should be desplayed in edit mode instead span", () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("test");
    });

    test("callback should ba called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="test" updateStatus={mockCallback} />);
        const instanse = component.getInstance();
        instanse.deActivateEditMode();

        expect(mockCallback.mock.calls.length).toBe(1);
    });
});