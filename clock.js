//declare globals
let date;
let hours, minutes, seconds;
let hourPicker = document.getElementById("hourPicker").value;
let minutePicker = document.getElementById("minutePicker").value;
let secondPicker = document.getElementById("secondPicker").value;
let alarmPlayer = document.getElementById("alarmPlayer");
//create react object
var Clock = React.createClass({
  //alarm activation
  activateAlarm: function(){
    alarmPlayer.loop=true;
    alarmPlayer.play();
    document.body.style.animation = "flash 500ms infinite ease-in-out";
  },
  //scene updater
  update: function(){

    //update user-selected alarm time
    hourPicker = document.getElementById("hourPicker").value;
    minutePicker = document.getElementById("minutePicker").value;
    secondPicker = document.getElementById("secondPicker").value;

    //get updated time
    date = new Date();
    hours = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    seconds = ("0" + date.getSeconds()).slice(-2);

    //set new time to be displayed to view
    this.state.time = hours + ":" + minutes + ":" + seconds;

    //active alarm when times match
    if(seconds === secondPicker && minutes === minutePicker && hours === hourPicker){
      this.activateAlarm();
    }
  },

  //intialize clock
  getInitialState: function(){
    date = new Date();
    hours = date.getHours();
    minutes = "0" + date.getMinutes();
    seconds = "0" + date.getSeconds();

    return{
        time: hours + ":" + minutes + ":" + seconds
    }
  },
  //render clock
  render: function(){
    //update time
    this.update();

    return(
      <div>
        <h1>{this.state.time}</h1>
      </div>
    )
  }
});

//render clock initially
ReactDOM.render(
  <Clock/>,
  document.getElementById('app')
);

//render new clock every 1 second
setInterval(function(){
  ReactDOM.render(
    <Clock/>,
    document.getElementById('app')
  );
},1000);

//listen for spacebar to turn off alarm
document.addEventListener("keydown", function(e){
  if(e.keyCode === 32){
    alarmPlayer.loop=false;
    alarmPlayer.pause();
    document.body.style.animation="";
  }
});
