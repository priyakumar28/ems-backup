import React from "react";

function DataSetContainer(props) {
    const {
        className,
        children,
        ...otherProps
    } = props;

    return (
        <div
            className={
                "data-set-container" +
                (className ? ` ${className}` : "")
            }
            {...otherProps}
        >
            {props.children}
        </div>
    );
}

export default DataSetContainer;
