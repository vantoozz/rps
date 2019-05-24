import * as React from "react";

export default (props: { messages: string[] }): React.ReactElement => {
    const entries = props.messages.reverse().map((message: string, key: number): React.ReactElement => {
        return <li key={key}>{message}</li>
    });
    return <ul>{entries}</ul>
};
