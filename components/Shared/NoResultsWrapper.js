import React from "react";
import Box from "./Box";


function NoResultsWrapper(props) {
    const { className, rotateImageClass } = props;
    return (
        <Box className={`flex_wrapper grid-gap-30 pt-4 ${className}`}>
            <Box>
                <img src='/images/logo.svg' style={{ maxWidth: '240px' }} className={`mb-4 ${rotateImageClass}`} />
                <h6>{props.title}</h6>
                <label>{props.subtitle}</label>
            </Box>
        </Box>
    );
}

export default NoResultsWrapper;
