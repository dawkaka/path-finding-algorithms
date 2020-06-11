
export function bfs(grid,startNode,finishNode,diagonals){
let queue = [];
let visitedNodes = [];
queue.push(startNode);
  while(queue.length){
    let current = queue.shift();
    current.isVisited = true;
    visitedNodes.push(current);
    if(current === finishNode) return visitedNodes;
    let neighbors = getNeighbors(grid,current,diagonals);
      for(let neighbor of neighbors){
        if(!neighbor.isVisited && !neighbor.isWall){
          neighbor.isVisited = true;
          visitedNodes.push(neighbor);
          queue.push(neighbor);
          neighbor.parent = current;
          current.neighbors.push(neighbor);
      }
      }
  }
return visitedNodes;
}
export function getPathNodesBFS(finishNode){
  let pathNodes = [];
  let current = finishNode;
  while(current.parent != null){
    pathNodes.unshift(current);
    current = current.parent;
  }
  return pathNodes;
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

   return neighbors;
}
