import React from "react";

function EmsModalBody(props) {
    const { className } = props;

    return (
        <div className={(className ? `${className}` : "")}>
            {props.children}
        </div>
    );
}

export default EmsModalBody;
