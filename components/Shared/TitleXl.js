import React from "react";

function TitleXl(props) {
    const { className, title } = props;

    return (
        <h1 className={(className ? ` ${className}` : "")}>
            {title} 
        </h1>
    );
}

export default TitleXl;