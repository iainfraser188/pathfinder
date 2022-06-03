import React from "react";
import '../css/toolbar.css'

const Toolbar = () => {

    function handleClick() {
        
    };
    return(
        
        <div className ="toolbar">
        <h1 className="title">Pathfinder</h1>
            <div className="tools">
            <button id = "wall" className="button" onClick={handleClick}>Wall</button>
            <button id = "start" className="button" onClick={handleClick}>Start point</button>
            <button id = "end" className="button" onClick={handleClick}>End Point</button>
            <button id = "findPath" className="button" onClick={handleClick}>Find Path</button>
            </div>
        </div>
    );
};

export default Toolbar;