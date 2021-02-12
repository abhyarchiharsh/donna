import React, { Component } from "react";
import firebase from 'firebase';
import TaskDataService from "./services/task.service";
import Modal from './Modal.js';
//import Tasks from "./tasks";

export default class ShowTasks extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      tasks: [],
  };
}

  componentDidMount() {
    TaskDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    TaskDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let tasks = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      tasks.push({
        key: key,
        taskName: data.taskName,
        hours: data.hours,
        priority: data.priority
      });
    });

    this.setState({
      tasks : tasks,
    });
    console.log("tasks"+this.state.tasks);
  }

  refreshList() {
    this.setState({
      currentTask: null,
      currentIndex: -1,
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index,
    });
  }

  removeAllTasks() {
    TaskDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { tasks, currentTask, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Tasks List</h4>

          <ul className="list-group">
            {tasks &&
              tasks.map(task => (
                <li onClick={this.props.displayTimer()} >
                  {task.taskName}
                </li>
              ))}
              
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTasks}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTask ? (
            <div> task1 {this.state.tasks} </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Task to start </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}