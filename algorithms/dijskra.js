

export function dijskra(grid,startNode,finishNode,diagonals){
  let start = startNode;
  let unVisitedNodes = getAllNode(grid);
  let visitedNodes = [];
  start.distance = 0;
  while(unVisitedNodes.length){
   sortUnvisistedNodes(unVisitedNodes);
  let closestNode = unVisitedNodes.shift();
  if(closestNode.isWall) continue;
  if(closestNode.isVisited) continue;
  if(closestNode.distance === Infinity) return visitedNodes ;
  closestNode.isVisited = true;
  visitedNodes.push(closestNode);
  if(closestNode === finishNode) return visitedNodes;
   updateNeighbors(grid,closestNode,diagonals);
  }
}

function sortUnvisistedNodes(unVisitedNodes){
 unVisitedNodes.sort((a,b) =>  a.distance - b.distance);
}


function getAllNode(grid){
  let allNodes = [];
  for(let nodes of grid) {
    for(let node of nodes) {
      allNodes.push(node)
    }
  }
  return allNodes;
}
function updateNeighbors(grid,node,diagonals){
  let neighbors = getNeighbors(grid,node,diagonals);
  for(let neighbor of neighbors){
    if(neighbor.isVisited) continue;
    if(neighbor.hasWeight){
      neighbor.distance = node.distance + 3;
    }else{
    neighbor.distance = node.distance + 1;
  }
    neighbor.parent = node;
  }
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
  if(node.column < grid.length - 1 && node.row < grid[node.column].length - 1 ){
    neighbors.push(grid[node.column + 1][node.row + 1]);
  }
  if(node.column < grid.length - 1 && node.row > 0){
    neighbors.push(grid[node.column + 1][node.row - 1]);
  }
  if(node.row < grid[node.row].length && node.column > 0){
    neighbors.push(grid[node.column - 1][node.row + 1]);
  }
  }
   console.log(neighbors);
   return neighbors
}


export function getPathNodes(finishNode){
  let pathNodes = [];
  let current = finishNode;
  while(current.parent != null){
    pathNodes.unshift(current);
    current = current.parent;
  }
  return pathNodes;
}
