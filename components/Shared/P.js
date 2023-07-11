import React from "react";

function P(props) {
    const { className} = props;

    return (
        <p className={(className ? ` ${className}` : "")}>
            {props.children}
        </p>
    );
}

export default P;
