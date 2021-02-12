import React, {Component} from 'react';
import TaskList from './tasklist.js';
class Todo extends Component {
	constructor(props){
		super(props);
		this.state = {
			showForm: null,
			showList: true
		};
		this.displayForm=this.displayForm.bind(this);
		this.hideForm=this.hideForm.bind(this);


	}
	displayForm(){
		this.setState({showForm:true});
	}
	hideForm(){
		this.setState({showForm:false});
		this.setState({showList: false});
		this.props.showTaskList();
	}
	render(){
		return (
			<div>
			{this.state.showList===true && <div>
			Ready to kickstart the task roadmap for today?
			<button onClick={this.displayForm}> Add task </button>
			{this.state.showForm===true &&( <TaskList hideForm={this.hideForm}/>)}
			</div>
			}
			</div>
			)
	}
}

export default Todo;