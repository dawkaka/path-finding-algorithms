import React, {Component} from "react";
import "./Node.css";

export default class Node extends Component {
  render(){
    const {
      row,column,isStart,isFinish,isWall,
      onMouseDown,
      onMouseUp,
      onMouseEnter
    } = this.props;
    const extraClass = isStart ? "start-node": isFinish ? "finish-node":isWall ?"wall-node":"";
    return (
      <div id = {column + " "+row}
       className = {"node " + extraClass}
       onMouseDown = {() => onMouseDown(column, row)}
       onMouseEnter = {() => onMouseEnter(column, row)}
       onMouseUp = {() => onMouseUp()}
       >
      </div>
    )
  }
}
