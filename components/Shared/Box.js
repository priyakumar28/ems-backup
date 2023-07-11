import React from "react";

function Box(props) {
    const {
        className,
        children,
        ...otherProps
    } = props;

    return (
        <div className={(className ? ` ${className}` : "")} {...otherProps}>
            {props.children}
        </div>
    );
}

export default Box;
