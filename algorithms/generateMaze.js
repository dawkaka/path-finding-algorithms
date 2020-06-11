
export function generateMaze(grid){
  let walls = [];
  for(let i = 0; i < grid.length; i += 5){
    let open = Math.floor((Math.random() * grid.length) + 1);
    let open1 = Math.floor((Math.random() * grid.length) + 1);
    let open2 = Math.floor((Math.random() * grid.length) + 1);
    for(let j = 0; j < grid[0].length; j++){
      let close = Math.floor((Math.random() * grid[0].length) + 1);
      if(grid[i][j].isStart || grid[i][j].isFinish ||
         grid[i][j].hasWeight || i === open || j === close ||
          j === open || i === close || i === open1 || j === open1
        || i === open2 || j === open2) continue;
       grid[i][j].isWall = true;
       walls.push(grid[i][j])
    }
  }
  for(let i = 0; i < grid[0].length; i += 5){
    let rand = Math.floor(Math.random()*4) + 1;
    for(let j = 0; j < grid.length; j++){
      if(grid[j][i].isStart || grid[j][i].isFinish ||
         grid[j][i].hasWeight) continue;
         if(j % 5 === 0){
           rand = Math.floor(Math.random() * 4) + 1;
         }
         if(j % 5 === rand) continue;
       grid[j][i].isWall = true;
       walls.push(grid[j][i])
    }
  }
  return walls;
}
