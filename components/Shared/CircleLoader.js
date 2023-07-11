import React from "react";
import Box from "./Box";


function CircleLoader(props) {
    const { size, profile, isLoading, className, loader } = props;
    return (
        <>
            <Box className={`loading-wrapper  ${isLoading ? `loading-overlay ${size ? `${size}` : ``} ${profile ? `${profile}` : ``}` : ''}` + (className ? ` ${className}` : "")}>
                <Box className={`${isLoading ? `loader ${size ? `${size}` : ``}` : ''}  ${profile ? `${profile}` : ``} ${loader ? `${loader}` : ``}`}></Box>
            </Box>
        </>

    );
}

export default CircleLoader;
