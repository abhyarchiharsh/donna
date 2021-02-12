import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import TaskDataService from "./services/task.service";
import firebase from 'firebase';

class TaskList extends Component {
  constructor(props){
    super(props);
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeHours = this.onChangeHours.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    //this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);
    this.state = {
        taskName: '',
        hours: 0,
        priority: 0,
    }
  }

  onChangeTask(e) {
    this.setState({
      taskName: e.target.value,
    });
  }

  onChangeHours(e) {
    this.setState({
      hours: e.target.value,
    });
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value,
    });
  }
  saveTask = (event) => {
  event.preventDefault();
  let data = {
      taskName: this.state.taskName,
      hours: this.state.hours,
      priority: this.state.priority,
    };

    TaskDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        alert('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }


  newTask() {
    this.setState({
      taskName: "",
      hours: 0,
      priority: 0,
    });
  }



  handleDone = () => this.props.hideForm();
  render(){
    return (
      <div className='form-group'>
      <form ref={(el) => this.taskRef = el}>
        <input 
          type='text'
          className='form-control'
          placeholder='Task Description'
          ref={input => this.taskName = input}
          id="task"
          required
          value={this.state.taskName}
          onChange={this.onChangeTask}
          name="title"
        />
        <input 
          type='number'
          className='form-control'
          placeholder='Task Duration(in hours)'
          ref={input => this.hours = input}
          id="hours"
          required
          value={this.state.hours}
          onChange={this.onChangeHours}
          name="hours"
        />
        <input 
          type='number'
          className='form-control'
          placeholder='Task Priority'
          ref={input => this.priority = input}
          id="priority"
          required
          value={this.state.priority}
          onChange={this.onChangePriority}
          name="priority"
        />

        <button className='button' onClick={this.saveTask} >Submit</button>

      </form>
      <button onClick={this.handleDone}>All tasks added </button>

</div>


      )
  }
}

export default TaskList;