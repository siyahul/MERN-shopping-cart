import React from 'react';
import './LoadingBox.css';

function LoadingBox({size}) {
    return (
        <div className={size=="large"?"loadingBox large":size=="medium"?"loadingBox medium":"loadingBox"}>
            <i className="fa fa-circle-o-notch" aria-hidden="true" />
        </div>
    )
}

export default LoadingBox
