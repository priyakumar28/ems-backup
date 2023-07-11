import React from "react";

function NoWrap(props) {
    const {
        className,
        children
    } = props;

    return (
        <div className='no-wrap'>
            {props.children}
        </div>
    );
}

export default NoWrap;
