import React, {Component} from 'react';
import './css/timer.css';
import AppVisuals from './AppVisuals';
import AppControls from './AppControls';
import AppInputs from './AppInputs';
export default class Timer extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      interval: 0,
      working: 25,
      break: 5,
      timer: {
        session: 'working',
        minutes: 25,
        seconds: 0
      }
    }

    this.toggleIsRunning = this.toggleIsRunning.bind(this);
    this.startPauseTimer = this.startPauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.timerIsRunning = this.timerIsRunning.bind(this);

    this.incrementWorking = this.incrementWorking.bind(this);
    this.decrementWorking = this.decrementWorking.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
  }

  /* switch isRunning from true to false and vice versa */
  toggleIsRunning() {
    this.setState({
      isRunning: !this.state.isRunning
    });
  }

  /* toggle isRunning and depending on its value clear the existing interval or start a new one, calling a function which updates the state */
  startPauseTimer() {
    // call a function to stop the audio (if it is playing)
    this.stopAudio();
    this.toggleIsRunning();
    if(this.state.isRunning) {
      clearInterval(this.state.interval);
    }
    else {
      let interval = setInterval(this.timerIsRunning, 1000);
      this.setState({
        interval: interval
      })
    }
  }

  // clear the interval and restore the state to the initial values
  resetTimer() {
    // call a function to stop the audio (if it is playing)
    this.stopAudio();
    clearInterval(this.state.interval);
    this.setState({
        isRunning: false,
        interval: 0,
        working: 25,
        break: 5,
        timer: {
          session: 'working',
          minutes: 25,
          seconds: 0
        }
    });
  }

  /*
  manage the timer, reducing the seconds and the minutes at every iteration 
  when hitting zero, set the values of the timer to the break and working session every time around
  */
  timerIsRunning() {
    let session = this.state.timer.session;
    let minutes = this.state.timer.minutes;
    let seconds = this.state.timer.seconds;

    if(seconds === 0) {
      if(minutes === 0) {
        // call a function to play the audio, as the timer hits 00:00
        this.playAudio();
        if(session === 'working') {
          session = 'break';
          minutes = this.state.break;
        }
        else {
          session = 'working';
          minutes = this.state.working;
        }
        seconds = 0;
      }
      else {
        minutes --;
        seconds = 59;
      }
    }
    else {
      seconds --;
    }
    this.setState({
      timer: {
        session: session,
        minutes: minutes,
        seconds: seconds
      }
    });
  }

  /*
  if the timer is not running, update the length of the working and break sessions 
  in the 0-60 range 
  updating timer.minutes to immediately update the UI 
  */
  incrementWorking() {
    if(!this.state.isRunning) {
      let working = this.state.working;
      if(working >= 1 && working < 60) {
        this.setState({
          working: working + 1,
          timer: {
            session: 'working',
            minutes: working + 1,
            seconds: 0
          }
        });
      }
    }
  }
  decrementWorking() {
    if(!this.state.isRunning) {
      let working = this.state.working;
      if(working > 1 && working <= 60) {
        this.setState({
          working: working - 1,
          timer: {
            session: 'working',
            minutes: working - 1,
            seconds: 0
          }
        });
      }
    }
  }

  incrementBreak() {
    // small caveat: break is not a valid name for a variable
    if(!this.state.isRunning) {
      let breaky = this.state.break;
      if(breaky >= 1 && breaky < 60) {
        this.setState({
          break: breaky + 1,
          timer: {
            session: 'working',
            minutes: this.state.working,
            seconds: 0
          }
        });
      }
    }
  }

  decrementBreak() {
    if(!this.state.isRunning) {
      let breaky = this.state.break;
      if(breaky > 1 && breaky <= 60) {
        this.setState({
          break: breaky - 1,
          timer: {
            session: 'working',
            minutes: this.state.working,
            seconds: 0
          }
        });
      }
    }
  }

  playAudio() {
    let audio = document.querySelector("audio");
    audio.play();
  }
  stopAudio() {
    let audio = document.querySelector("audio");
    if(!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  /*
  render 
  - a component relaying the amount of time left and the current session 
  - a component to start/pause or reset the timer 
  - a component to modify the length of the sessions
  - an audio element used to play a sound-bite when the timer hits 00:00
  */
  render() {
    return (
      <div className="Timer">
      <div className="Hourglass">

        <AppVisuals 
          working={this.state.working}
          break={this.state.break}
          timer={this.state.timer} />

        <AppControls 
          isRunning={this.state.isRunning} 
          startPauseTimer={this.startPauseTimer} 
          resetTimer={this.resetTimer} />

        <AppInputs 
          working={this.state.working}
          break={this.state.break}
          incrementWorking={this.incrementWorking}
          decrementWorking={this.decrementWorking}
          incrementBreak={this.incrementBreak}
          decrementBreak={this.decrementBreak} />

        <audio id="beep">
          <source src="http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav" type="audio/wav"/>
        </audio>
          
      </div>
      </div>
    );
  }

}
