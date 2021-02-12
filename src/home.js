import React, {Component} from 'react';
import Speech from 'react-speech';
class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			productive: props.productive
		}
		this.handleProductive=this.handleProductive.bind(this);
		this.handleUnproductive=this.handleUnproductive.bind(this);

	}

	handleProductive(){
		this.setState({productive: true});
		console.log(this.state.productive);
		this.props.hideQues();
	}
	handleUnproductive(){
		this.setState({productive: false});
		console.log(this.state.productive);
		this.props.hideQues();
	}
	render(){
		return (

			<div className="feeling">
			
			How are you feeling today?
			<br/><br/>
			<button onClick={this.handleProductive} > Productive </button>
			<br/><br/>
			<button onClick={this.handleUnproductive} > Unproductive </button>
			</div>


			)
	}
}

export default Home;