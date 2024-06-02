import userEvent, {UserEvent} from '@testing-library/user-event'
import {render, RenderResult} from "@testing-library/react";
import React from "react";

// setup function
export function setup(jsx: React.JSX.Element): {user: UserEvent, render: RenderResult} {
    return {
        user: userEvent.setup(),
        // Import `render` from the framework library of your choice.
        // See https://testing-library.com/docs/dom-testing-library/install#wrappers
        render: render(jsx),
    }
}

