
let visitedNodes = [];
export function dfs(grid,startNode,finishNode, diagonals){
 let current = startNode;
 current.isVisited = true;
 visitedNodes.push(current);
 if(current === finishNode) {
   return visitedNodes;
 }
 let neighbors = getNeighbors(grid,current,diagonals);
 for(let neighbor of neighbors){
   if(!neighbor.isVisited && !neighbor.isWall){
     neighbor.parent = current;
     dfs(grid,neighbor,finishNode);
   }
 }
 return visitedNodes;
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
