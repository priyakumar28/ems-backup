import React from "react";

function SubTitle(props) {
    const { className , isClick } = props;

    return (
        <h6 className={"mb-0" + (className ? ` ${className}` : "")} onClick={isClick}>
            {props.title}
        </h6>
    );
}

export default SubTitle;
