const workinput =
document.getElementById("work-duration");
const breakinput =
document.getElementById("break-duration");
const startBtn =
document.getElementById("startBtn");
const resetBtn =
document.getElementById("resetBtn")
const timerDisplay =
document.getElementById("timer-display");
const statusDisplay =
document.getElementById("status-display");
const notificationSound =
document.getElementById("notification-sound");

let timer;
let isWorkTime = true;
let remainingTime= 0;//Remaining time in seconds

//Function to format time in mm:ss
function formatTime(seconds) {
    let minutes=
Math.floor(seconds / 60); //Calculate th numberof minutes
    let secs =
seconds % 60; //calculate the remaining seconds    

      //add leading zeros for single-digit minutes or seconds
      if (minutes < 10) {
           minutes = '0' + minutes;
      }
      if (secs < 10) {
          secs = '0' + secs;
      }

      //Return the formatted time string
      return minutes + ':' + secs;
    }

//Funtion to start the timer
function startTimer(duration, callback) {
    remainingTime = duration;
    timerDisplay.textContent =
formatTime(remainingTime);
   timer = setInterval(() => {
    if(remainingTime > 0){
        remainingTime--;
        timerDisplay.textContent =
formatTime(remainingTime);        
    }else{
        clearInterval(timer);
        notificationSound.play();
        callback();
    }
   }, 1000);
   
}

//Funtion to handle timer completion
function handleTimerCompletion() {
    if (isWorkTime) {
        statusDisplay.textContent = "Break Time";
        isWorkTime = false;
        startTimer(breakinput.value * 60,
    handleTimerCompletion);
    } else{
        statusDisplay.textContent =
"Work Time!";
        isWorkTime = true;
        startTimer(workinput.value * 60, handleTimerCompletion);
    }
}

//Funtion to reset the timer 
function resetTimer() {
    clearInterval(timer); // Stop the timer
    isWorkTime = true; // Reset to work session
    remainingTime = 0; // Reset remaining time
    timerDisplay.textContent = "00:00"; // Reset timer display    
    statusDisplay.textContent = "Ready"; // Reset status display
}

//Event listener for the start button
startBtn.addEventListener("click",() => {
    resetTimer(); // Reset before starting a new session
    isWorkTime = true;
    statusDisplay.textContent = "Work Time";
    startTimer(workinput.value * 60,
handleTimerCompletion);
});

//Event listener for the reset button 
resetBtn.addEventListener("click", resetTimer);


