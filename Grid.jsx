import React,{Component} from "react";
import "./Grid.css";
import Node from "./Node.jsx";
import {dijskra, getPathNodes} from "./algorithms/dijskra.js";
import {bfs} from "./algorithms/BreathFirstSearch.js";
import {dfs} from "./algorithms/DepthFirstSearch.js";
import {aStar} from "./algorithms/aStar.js";
import {generateMaze} from "./algorithms/generateMaze.js";

const START_NODE_COLUMN  = 15;
const START_NODE_ROW  = 1;
const FINISH_NODE_COLUMN = 25;
const FINISH_NODE_ROW = 30;
export default class Grid extends Component {
  constructor(props){
    super(props)
    this.state = {
      grid: [],
      mouseDown: false,
      weightDown: false,
      startDown:false,
      finsishDown: false,
      column: 40,
      row: 70,
      previouRow:-1,
      previousColumn: -1,
      startNodeColumn: START_NODE_COLUMN,
      startNodeRow: START_NODE_ROW,
      finishNodeColumn: FINISH_NODE_COLUMN,
      finishNodeRow: FINISH_NODE_ROW,
      diagonals: false
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.start = this.start.bind(this);
    this.handleClearBoard = this.handleClearBoard.bind(this);
    this.addWeight = this.addWeight.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
  }
    componentDidMount(){
      let {column,row} = this.state;
    const  grid = this.getInitialGrid(column,row);
      this.setState({grid});
    }
  handleMouseDown(column,row) {
    let {grid, weightDown} = this.state;
   let elem = document.getElementById(`${column} ${row}`);

   if(grid[column][row].isStart){
      this.setState({startDown:true,previouRow:row,previousColumn:column})
   }else if(grid[column][row].isFinish){
     this.setState({finishDown:true,previouRow:row,previousColumn:column})
   }else if(weightDown){
     if(elem.className !== "node start-node" &&
     elem.className !== "node finish-node" && elem.className !== "node wall-node"){
       if(elem.className === "node weight-node"){
         elem.className = "node";
         grid[column][row].hasWeight = false;
       }else{
     elem.className = "node weight-node";
     grid[column][row].hasWeight = true;
   }
   }
   }else{
   if(elem.className === "node start-node" ||
   elem.className === "node finish-node" ||
   elem.className === "node visited-node" ||
   elem.className === "node path-node"||
   elem.className === "node queue-node") return;
   if(elem.className === "node wall-node"){
     elem.className = "node";
     this.state.grid[column][row].isWall = false;
   }else{
     elem.className = "node wall-node";
     this.state.grid[column][row].isWall = true;
     this.setState({mouseDown:true});
   }
  }
  }
  handleMouseEnter(column, row){
    let {mouseDown,startDown,finishDown,grid,previouRow,previousColumn, weightDown} = this.state;
    if(!mouseDown && !finishDown && !startDown)return;
    let elem = document.getElementById(`${column} ${row}`);

    if(startDown){
      let newGrid = grid.slice();
      newGrid[previousColumn][previouRow].isStart = false;
      newGrid[column][row].isStart = true;
      this.setState({grid:newGrid,
        previousColumn:column,previouRow:row,startNodeColumn:column,startNodeRow:row})
    }else if(finishDown){
      let newGrid = grid.slice();
      newGrid[previousColumn][previouRow].isFinish = false;
      newGrid[column][row].isFinish = true;
      this.setState({grid:newGrid,
        previousColumn:column,previouRow:row,finishNodeColumn:column,finishNodeRow:row})
    }else if(weightDown){
      if(elem.className !== "node start-node" &&
      elem.className !== "node finish-node" &&
       elem.className !== "node wall-node"){
         if(elem.className === "node weight-node"){
            elem.className = "node";
            grid[column][row].hasWeight = false;
         }else{
        elem.className = "node weight-node";
        grid[column][row].hasWeight = true;
      }
       }
    }else{
    if(elem.className === "node start-node" || elem.className === "node finish-node") return;
    if(elem.className === "node wall-node"){
      this.state.grid[column][row].isWall = false;
      elem.className = "node";
    }else{
      this.state.grid[column][row].isWall = true;
      elem.className = "node wall-node";
    }
  }
  }
  handleMouseUp(){
    this.setState({mouseDown: false,startDown:false, finishDown:false});
  }
  animateDijskra(visitedNodes, pathNodes){

   for(let i = 1; i < visitedNodes.length - 1; i++){
     if (i === visitedNodes.length - 2) {
       setTimeout( () => {
        for (let j = 0; j < pathNodes.length-1; j++) {
          setTimeout(() => {
            const node = pathNodes[j];
        let elem = document.getElementById(`${node.column} ${node.row}`);
            elem.className =
              'node path-node';
              elem.textContent = `${j + 1}`;
          }, 50 * j);
        }
      }, 10 * i)
        return;
    }
     setTimeout(() => {
          let visitedNode = visitedNodes[i];
          let elem = document.getElementById(`${visitedNode.column} ${visitedNode.row}`)
           elem.className = "node visited-node";
        }, i * 10)
     }
   }
  visualizeDijskra(){
    let {grid,startNodeRow,startNodeColumn,finishNodeRow,finishNodeColumn,diagonals} = this.state;
    let startNode = grid[startNodeColumn][startNodeRow];
    let finishNode = grid[finishNodeColumn][finishNodeRow];
    let visitedNodes = dijskra(grid,startNode,finishNode,diagonals);
    let pathNodes = getPathNodes(finishNode);
    this.animateDijskra(visitedNodes,pathNodes);
  }
  handleDijskra(){
    this.visualizeDijskra();
  }
  handleBreathFirstSearch(){
   this.visualizeBFS();
 }
  animateBFS(visitedNodes,pathNodes, finishNode){
   let end = 0;
    for(let i = 0; i < visitedNodes.length; i++){
      if(visitedNodes[i] === finishNode){
        end = i;
        break;
      }
    }
    end = (end === 0)? visitedNodes.length : end;
   for(let i = 1; i < end - 1; i++){
   if (i === end - 2) {
     setTimeout( () => {
      for (let j = 0; j < pathNodes.length-1; j++) {
        setTimeout(() => {
          const node = pathNodes[j];
          let elem = document.getElementById(`${node.column} ${node.row}`);
            elem.textContent = `${j + 1}`;
            console.log(elem.textContent);
          elem.className =
            'node path-node';

        }, 50 * j);
      }
    }, 10 * i)
      return;
  }
   setTimeout(() => {
        let visitedNode = visitedNodes[i];
        let elem = document.getElementById(`${visitedNode.column} ${visitedNode.row}`)
         elem.className = "node visited-node";
         if(visitedNode.neighbors.length){
           for(let neighbor of visitedNode.neighbors){
             if(document.getElementById(`${neighbor.column} ${neighbor.row}`).className
             === "node finish-node") continue;
             document.getElementById(`${neighbor.column} ${neighbor.row}`).className =
              "node queue-node";
           }

         }
      }, i * 10)
   }
 }
  visualizeBFS(){
   let {grid,startNodeColumn,startNodeRow,finishNodeColumn,finishNodeRow,diagonals} = this.state;
   let startNode = grid[startNodeColumn][startNodeRow];
   let finishNode = grid[finishNodeColumn][finishNodeRow];
   let visitedNodes = bfs(grid,startNode,finishNode,diagonals);
   let pathNodes = getPathNodes(finishNode);
   this.animateBFS(visitedNodes,pathNodes,finishNode);
 }
  animateDFS(visitedNodes,pathNodes,finishNode){
   let end = 0;
    for(let i = 0; i < visitedNodes.length; i++){
      if(visitedNodes[i] === finishNode){
        end = i;
        break;
      }
    }
    end = (end === 0) ? visitedNodes.length : end;
   for(let i = 1; i <= end; i++){
   if (i === end) {
     setTimeout( () => {
      for (let j = 0; j < pathNodes.length-1; j++) {
        setTimeout(() => {
          const node = pathNodes[j];
          let elem = document.getElementById(`${node.column} ${node.row}`);
          elem.className =
            'node path-node';
          elem.textContent = `${j + 1}`;
        }, 10 * j);
      }
    }, 10 * i)
      return;
  }
   setTimeout(() => {
        let visitedNode = visitedNodes[i];
        let elem = document.getElementById(`${visitedNode.column} ${visitedNode.row}`)
         elem.className = "node visited-node";
      }, i * 10)
   }
 }
  visualizeDepthFirstSearch(){
   let {grid,startNodeRow,startNodeColumn,finishNodeRow,finishNodeColumn,diagonals} = this.state;
   let startNode = grid[startNodeColumn][startNodeRow];
   let finishNode = grid[finishNodeColumn][finishNodeRow];
   let visitedNodes = dfs(grid,startNode,finishNode,diagonals);
   let pathNodes = getPathNodes(finishNode);
   this.animateDFS(visitedNodes,pathNodes,finishNode);
 }
  handleDepthFirstSearch(){
  this.visualizeDepthFirstSearch();
}
animateAstar(visitedNodes,pathNodes){
   for(let i = 1; i < visitedNodes.length - 1; i++){
      if(i === visitedNodes.length - 2){
        setTimeout(()=>{
          for(let j = 0; j < pathNodes.length - 1; j++){
            setTimeout(()=>{
              let node = pathNodes[j];
              let elem = document.getElementById(`${node.column} ${node.row}`);
              elem.className = "node path-node";
              elem.textContent = `${j + 1}`
            },50*j)
          }
        },10 * i);
        return;
      }
     setTimeout(()=>{
        let node = visitedNodes[i];
        document.getElementById(`${node.column} ${node.row}`).className = "node visited-node";
        if(visitedNodes[i].neighbors.length){
          for(let neighbor of visitedNodes[i].neighbors){
            if(document.getElementById(`${neighbor.column} ${neighbor.row}`).className
            === "node finish-node" ||
            document.getElementById(`${neighbor.column} ${neighbor.row}`).classNam
           === "node weight-node") continue;
            document.getElementById(`${neighbor.column} ${neighbor.row}`).className =
             "node queue-node";
          }
        }
     },10*i);
   }
}
visualizeAstar(){
  let {grid,startNodeColumn,startNodeRow,
    finishNodeColumn,finishNodeRow,diagonals} = this.state
  let startNode = grid[startNodeColumn][startNodeRow];
  let finishNode = grid[finishNodeColumn][finishNodeRow];
  let visitedNodes = aStar(grid,startNode,finishNode,diagonals);
  let pathNodes = getPathNodes(finishNode);
  this.animateAstar(visitedNodes,pathNodes);
}
handleAstar(){
  this.visualizeAstar();
}
addWeight() {
  let elem = document.getElementById("add-weight");
  let diag = document.getElementById("add-diagonals");
  if(elem.checked){
    this.setState({weightDown:true});
  }else{
    this.setState({weightDown:false});
  }
if(diag.checked){
  this.setState({diagonals: true})
}else {
  this.setState({diagonals: false})
}
}
start(){
  let algorithm = document.getElementById("select").value;
switch (algorithm) {
  case "BFS":
    this.handleBreathFirstSearch();
    break;
  case "DFS":
  this.handleDepthFirstSearch();
  break;
  case "Dijskra":
  this.handleDijskra()
  break;
  case "A star":
  this.handleAstar();
  break;
  default:
}
}
handleClearBoard(){
  let {column,row,startNodeColumn,startNodeRow,finishNodeColumn,finishNodeRow} = this.state;
  for(let i = 0; i < column; i++){
    for(let j = 0; j < row; j++){
      if((i === startNodeColumn && j === startNodeRow) ||
       (i === finishNodeColumn && j === finishNodeRow)) continue;
      let elem = document.getElementById(`${i} ${j}`);
      elem.className = "node";
      elem.textContent = "";
    }
  }
  let newGrid = this.getInitialGrid(column,row);
  this.setState({grid: newGrid});
}
getInitialGrid(columns, rows) {
  let nodes = [];
  for(let i = 0; i < columns; i++){
    let currentColumn  = [];
    for(let j = 0; j < rows; j++){
      currentColumn.push(this.createNode(i,j));
    }
    nodes.push(currentColumn)
  }
  return nodes;
}
createNode(column,row){
  const node = {
    column,
    row,
    isStart: this.state.startNodeColumn === column && this.state.startNodeRow === row,
    isFinish: this.state.finishNodeColumn === column && this.state.finishNodeRow === row,
    distance: Infinity,
    hasWeight: false,
    fScore: Infinity,
    isVisited: false,
    isWall: false,
    neighbors: [],
    parent: null
  }
  return node;
}
generateMaze(){
  //this.handleClearBoard();
  let walls = generateMaze(this.state.grid);
  for(let i = 0; i < walls.length; i++){
    setTimeout(()=>{
    let elem = document.getElementById(`${walls[i].column} ${walls[i].row}`);
      elem.className = "node wall-node";
    },10 * i);
  }
}
  render() {
      let {grid} = this.state;
    return(
      <>
      <center>
      <div className = "controls">
      <button id = "start" onClick = {this.start}>start</button>
      <select id = "select">
      <option value = "Dijskra">Dijskra(weighted)</option>
      <option value = "BFS">BFS</option>
      <option value = "DFS">DFS</option>
      <option value = "A star">A star(weighted)</option>
       </select>
       <button id= "clear-grid" onClick = {this.handleClearBoard}>Clear Board</button>
       <button id= "generate-maze" onClick = {this.generateMaze}>generate Walls</button>
       <input type = "checkbox" value = "weight" id = "add-weight" onClick = {this.addWeight} />
       <label htmlFor = "add-weight" onClick = {this.addWeight}>add weight</label>
       <input type = "checkbox" value = "diagonals" id = "add-diagonals" onClick = {this.addWeight} />
       <label htmlFor = "add-diagonals" onClick = {this.addWeight}>add Diagonals</label>
       </div>
       </center>
      <div className = "grid-board">
      {grid.map((column, columnIndex) => {
      return  <div key={columnIndex} id= {columnIndex} className = "node-container">
        {column.map((node,rowIndex)=>{
          const {row,column,isStart,isFinish,isWall} = node;
        return <Node key={rowIndex}
         column = {column}
         row = {row}
         isStart = {isStart}
         isFinish = {isFinish}
         isWall = {isWall}
         onMouseDown = {(one, two) => {this.handleMouseDown(one,two)}}
         onMouseEnter = {(column, row) => {this.handleMouseEnter(column,row)}}
         onMouseUp = {()=> this.handleMouseUp()}
         />
        })}
        </div>
      })}
      </div>
      </>
    )
  }
}
