import React from "react";

function Span(props) {
  const { title, className, isClick, disabled } = props;

  return (
    <span title={title} disabled={disabled} className={className ? ` ${className}` : ""} onClick={isClick}>
      {props.children}
    </span>
  );
}

export default Span;
