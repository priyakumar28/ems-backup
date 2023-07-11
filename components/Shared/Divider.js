import React from "react";

function Divider(props) {
    const { className } = props;

    return (
        <hr className={(className ? ` ${className}` : "")} />
    );
}

export default Divider;
