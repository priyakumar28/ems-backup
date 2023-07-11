import React from "react";

function LoaderComponent() {

    return (
        <div className="loader-item mb-4">
            <div className="loader-box">
                <div className="line-scale">
                    <img className="rotate" src="/images/logo.svg"/>
                </div>
            </div>
        </div>
    );
}

export default LoaderComponent;