import React, {Component} from 'react';

class DrinkWater extends Component {
	
	constructor() {
      super();
      this.state = {
        curTime : null
      }
    }
    componentDidMount() {
      setInterval( () => {
        this.setState({
          curTime : new Date().toLocaleTimeString()
        })
      },1000)
      
    }
   render() {
        return(
          <div>
            <h2>{this.state.curTime}</h2>
          </div>
        );
      }
    }
  /*formatTime(secs) {
    let hours   = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = secs % 60;
    return [hours, minutes, seconds]
        .map(v => ('' + v).padStart(2, '0'))
        .filter((v,i) => v !== '00' || i > 0)
        .join(':');
  }*/

	



export default DrinkWater;