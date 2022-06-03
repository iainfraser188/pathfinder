import React,{useState, useEffect} from "react";
import '../css/grid.css'
import Node from "./node";


const cols = 30;
const rows = 30;

const Pathfind = () => {
    const [Grid, setGrid] = useState([]);

    useEffect(() =>{
        initilizeGrid();
    }, []);

    const initilizeGrid = () => {
        const grid = new Array(cols);

        for(let i = 0; i < cols; i++) {
            grid[i] = new Array(rows);
        }

        createSpot(grid);

        setGrid(grid);
        // console.log(grid);
    };

    const createSpot = (grid) =>{
        for (let i = 0; i< cols; i++){
            for (let j = 0; j< rows; j++){
                grid[i][j] = new Spot(i,j);
            }
        }
    };
   
    function Spot(i,j) {
        this.x = i;
        this.y = j;
        this.g = 0;
        this.f = 0;
        this.h = 0;
    }

    const gridWithNode = (
        <div>
            {Grid.map((row, rowIndex)=>{
                return (
                    <div key={rowIndex} className="row-wraper">
                        {row.map((col,colIndex) => {
                            return <Node key={colIndex}/>
                            
                        })}
                    </div>
                )
            })}
        </div>
    )
    // console.log(Grid);
        return (
        <div className="grid">
        {gridWithNode}
        </div>
        );
    
};

export default Pathfind;