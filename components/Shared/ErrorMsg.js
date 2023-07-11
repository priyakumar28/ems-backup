import React from "react";

function ErrorMsg(props) {
    const { className, errorMessage } = props;

    return (
        <span className={"error-msg" + (className ? ` ${className}` : "")}>
            {errorMessage}
        </span>
    );
}

export default ErrorMsg;
