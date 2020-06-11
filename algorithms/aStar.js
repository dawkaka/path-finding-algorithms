

export function aStar(grid,startNode,finishNode,addDiagonals){
     let visitedNodes = [];
     startNode.distance = 0;
     startNode.fScore = 0;
     let openSet = [];
     openSet.push(startNode);
     while(openSet.length){
       sortOpenSet(openSet);
       let current = openSet.shift();
       current.isVisited = true;
       visitedNodes.push(current);
       if(current === finishNode) return visitedNodes;
       let neighbors = getNeighbors(grid,current,addDiagonals);

       for(let neighbor of neighbors){
         if(!neighbor.isWall){
           neighbor.parent = current;
           current.neighbors.push(neighbor);
           neighbor.isVisited = true;
           if(neighbor.hasWeight){
             neighbor.distance = current.distance + 3
           }else{
           neighbor.distance = current.distance + 1;
         }
           neighbor.fScore = neighbor.distance + heuristics(neighbor,finishNode);
           openSet.push(neighbor);
         }
         }
       }
     return visitedNodes;
}


function sortOpenSet(arr){
  arr.sort((a,b)=> a.fScore - b.fScore);
}

function heuristics(a,b){
let x  = b.row - a.row;
let y = b.column - a.column;
let xy = (x*x)+(y*y);
return Math.sqrt(xy);
}
function getNeighbors(grid,node,diagonals) {
  let neighbors = [];
  if(node.column < grid.length - 1){
    neighbors.push(grid[node.column + 1][node.row])
  }
  if(node.row < grid[node.column].length - 1){
    neighbors.push(grid[node.column][node.row + 1])
  }
  if(node.column > 0 ){
    neighbors.push(grid[node.column - 1][node.row]);
  }
  if(node.row > 0){
    neighbors.push(grid[node.column][node.row - 1]);
  }
  if(diagonals === true){
  if(node.column > 0 && node.row > 0) {
    neighbors.push(grid[node.column - 1][node.row - 1]);
  }
  if(node.column < grid.length - 1 && node.row < grid[0].length - 1 ){
    neighbors.push(grid[node.column + 1][node.row + 1]);
  }
  if(node.column < grid.length - 1 && node.row > 0){
    neighbors.push(grid[node.column + 1][node.row - 1]);
  }
  if(node.row < grid[0].length && node.column > 0){
    neighbors.push(grid[node.column - 1][node.row + 1]);
  }
  }

   return neighbors.filter(neighbor =>!neighbor.isVisited );
}
