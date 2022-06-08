import React,{useState, useEffect } from "react";
import '../css/grid.css'
import '../css/toolbar.css'
import '../css/node.css'
import Node from "./node";
import AStar from "./AStarAlgorithm";


const cols = 30;
const rows = 30;

const NODE_START_ROW = 0
const NODE_START_COL = 0
const NODE_END_ROW = rows-1;
const NODE_END_COL = cols-1;




const Pathfind = () => {
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [VisitedNodes, setVisitedNodes] = useState([]);

    useEffect(() =>{
        initilizeGrid();
    }, []);

    const initilizeGrid = () => {
        const grid = new Array(rows);

        for(let i = 0; i < rows; i++) {
            grid[i] = new Array(cols);
        }

        createSpot(grid);

        setGrid(grid);
        // console.log(grid);
        addNeighbours(grid);
        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const endNode = grid[NODE_END_ROW][NODE_END_COL];
        let path = AStar(startNode, endNode);
        startNode.isWall = false;
        endNode.isWall = false;
        setPath(path.path);
        // console.log(path);
        // console.log(path.visitedNodes);
        setVisitedNodes(path.visitedNodes);
    };

    const createSpot = (grid) =>{
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                grid[i][j] = new Spot(i,j);
            }
        }
    };

    // add neighbours
const addNeighbours = (grid)=>{
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            grid[i][j].addNeighbours(grid);
        }
    }
}
   
    function Spot(i,j) {
        this.x = i;
        this.y = j;
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.neighbours = [];
        this.isWall = false;
        if(Math.random(1) < 0.2){
            this.isWall = true;
        }
        this.previous = undefined;
        this.addNeighbours = function(grid){
            let i = this.x;
            let j = this.y;
            if(i > 0) this.neighbours.push(grid[i-1][j]);
            if(i < rows -1) this.neighbours.push(grid[i + 1][j])
            if(j > 0)this.neighbours.push(grid[i][j-1])
            if(j < cols -1) this.neighbours.push(grid[i][j+1])
        }

    }

    const gridWithNode = (
        <div>
            {Grid.map((row, rowIndex)=>{
                return (
                    <div key={rowIndex} className="row-wraper">
                        {row.map((col,colIndex) => {
                            const { isStart, isEnd, isWall } = col;
                            return <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWall={isWall}/>
                            
                        })}
                    </div>
                )
            })}
        </div>
    );

    const visulizeShortestPath = (shortestPathNodes) => {
        console.log(shortestPathNodes)
        for(let i = 0; i < shortestPathNodes.length; i++){
            setTimeout(() => {
                const node = shortestPathNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
        },10 * i);
        }
    }

    const visulizePath = () => {
        console.log(Path);
        console.log(VisitedNodes);



        for(let i = 0; i <= VisitedNodes.length; i++){
           if(i === VisitedNodes.length){
            setTimeout(() => {
            visulizeShortestPath(Path); 
            },20*i)
            }
            else{
                setTimeout(()=>{
                const node = VisitedNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
                },20*i)
                
            }
        }
    };
        return (
            <>
            <div className ="toolbar">
            <h1 className="title">Pathfinder</h1>
            <div className="tools">
            <button id = "wall" className="button" >Wall</button>
            <button id = "start" className="button" >Start point</button>
            <button id = "end" className="button" >End Point</button>
            <button id = "findPath" className="button" onClick={visulizePath} >Find Path</button>
            </div>
            </div>
            <div className="grid">
            {gridWithNode}
            </div>
            </>
        );
    
};

export default Pathfind;