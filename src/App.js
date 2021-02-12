import React, {Component} from 'react';
import './App.css';
import DrinkWater from './drinkWater.js';
import Home from './home.js';
import Speech from 'react-speech';
import Todo from './todo.js';
import ShowTasks from './showTasks.js';
import Modal from './Modal.js';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isProductive: null,
      showTaskList: false,
      showTimer: false,
      displayQues: true,
      showAddTask: false,
    };
  }

  showTasks = () => {
    this.setState({showTaskList: true});
    
  }

  displayTimer = () => {
    this.setState({showTimer:true});
  }

  hideTimer = () => {
    this.setState({showTimer:false});
  }

  hideQues= () => {
    this.setState({displayQues:false});
    this.setState({showAddTask: true});
  }
  render(){
  return (
    <div className="Donna">
      <header className="Donna-header">
      <Speech text="Hi! I'm Donna! Let's get your day started. How are you feeling today?" voice="Google UK English Female"/>
        <p>
          Hi! I'm Donna! <br/>  Let's get your day started!
        </p>
        {this.state.displayQues===true && <Home productive={this.isProductive} hideQues={this.hideQues}/>}
        {this.state.showAddTask === true && <Todo showTaskList={this.showTasks} />}
        
        {this.state.showTaskList===true && < ShowTasks displayTimer={this.displayTimer} />}
        {this.state.showTimer===true && <Modal hideTimer={this.hideTimer} />}
      </header>
    </div>
  );
}
}
export default App;
