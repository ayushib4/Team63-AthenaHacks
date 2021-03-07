//global variables here//

var d = new Date();
var notifID = d.getMilliseconds();
var per = 20;
var myAudio = new Audio("./music/TropicalMusic.mp3");
var myAudio = document.getElementById("./music/TropicalMusic.mp3");
var timer20minsFlag = false;

//Timer//
// function timer20s() {
//   chrome.alarms.create("20 seconds countdown", { when: Date.now() + 20 * 10 });
// }

function timer20mins() {
  chrome.alarms.create("20 minutes timer", { when: Date.now() + 20 * 1000 });
  return (timer20minsFlag = true);
}
//boolean value true = timer is done, function notification//

//When the user opoen the first tab in google chrome, the 20 mins timer will be automatically started//

chrome.browserAction.onClicked.addListener(function (tab) {
  if (timer20sFlag === false) {
    timer20mins();
  }
});

function currTime() {
  var d = new Date();
  var ampm = d.getHours() >= 12 ? "pm" : "am";
  var hour = d.getHours() % 12;
  if (hour === 0) {
    hour = 12;
  }
  var minute = d.getMinutes();
  var second = d.getSeconds();
  return hour + ":" + minute + ":" + second;
}

//the notification alarm when every 20 mins passes
//inside the alarm notification, there will be three buttom: restart the timer, stop the timer, and 20s music relaxation
function createNotification() {
  var NotificationOptions = {
    type: "basic",
    title: "Take a break!",
    iconUrl: "./icons/EyesCream - 128.png",
    message: "Look 20 feet away for 20 seconds!",
    contextMessage: currTime(),
    eventTime: Date.now(),
    requireInteraction: true,
    buttons: [
      {
        title: "Done with the break!",
        iconUrl: "./icons/EyesCream - 128.png",
      },
      {
        title: "Enjoy some music :D",
        iconUrl: "./icons/EyesCream - 128.png",
      },
      {
        title: "Disable the alarm D:",
        iconUrl: "./icons/EyesCream - 128.png",
      },
    ],
  };
  chrome.notifications.create(notifID, NotificationOptions);
}

//when the alarm is on, the notification will pop up, then it will check which botton does the user pressed
chrome.alarms.onAlarm.addListener(function (alarm) {
  createNotification();
});

function playMusicChecker() {
  //timer20s();
  myAudio.play();
  chrome.notifications.clear(notifID);
  timer20mins();
}

function doneWithBreak() {
  chrome.notifications.clear(notifID);
  timer20mins();
}

function disable() {
  chrome.notifications.clear(notifID);
}

/*to-do list
implement the onclick/botton for the 3 buttons. 
1. Done with the break -> reset the timer (clear the alarm), then call the timer20mins 
2. Enjoy the music -> use the playMusicChecker to "play the music, reset the timer(clear the alarm), then call the timer20mins() after 20s has passed" 
3. Disable the alarm -> clear the alarm */
