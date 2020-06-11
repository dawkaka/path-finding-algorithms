import React,{Component} from 'react'
import Grid from "./Grid";
import ReactDOM from 'react-dom'
class Main extends Component {
  render(){
    return (
      <Grid />
    )
  }
}

ReactDOM.render(
  <Main/>,document.getElementById("root")
)
