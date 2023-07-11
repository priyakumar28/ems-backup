import React from "react";

function EmsModalHeader(props) {
    const {
        className,
        children,
        ...otherProps
    } = props;

    return (
        <div className={"ems-modal-header" +(className ? ` ${className}` : "")} {...otherProps}>
            {props.children}
        </div>
    );
}

export default EmsModalHeader;