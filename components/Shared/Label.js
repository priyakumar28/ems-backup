import React from "react";

function Label(props) {
    const { className } = props;

    return (
        <label className={(className ? ` ${className}` : "")}>
            {props.children}
        </label>
    );
}

export default Label;
