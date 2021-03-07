//Number of minutes between each reminder
console.log(1);
var notifID = new Date().getTime();
var per = 1;
// var myAudio = new Audio("./music/TropicalMusic.mp3");
//var myAudio = document.getElementById("./music/TropicalMusic.mp3");
//Alarm set for notification
chrome.alarms.create("the20", {
  periodInMinutes: per,
});
console.log(2);
//Event listener for button click on notification
chrome.notifications.onButtonClicked.addListener(function (btnIdx) {
  console.log(notifID);
  if (btnIdx === 0) {
    chrome.notifications.clear(notifID);
  } else if (btnIdx === 1) {
    chrome.alarms.create("20 second countdown", {
      //alarmInfo:
      //notifID: notifId,
      when: Date.now() + 20 * 1000,
    });
  }
});
console.log(3);
//Event listener for clicking browseraction
//Note: works only if there is no popup for browseraction
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.alarms.get("the20", function (alarm) {
    //enabling or disabling the alarm(removing or adding it)
    if (typeof alarm != "undefined") {
      chrome.alarms.clear("the20");
      chrome.browserAction.setTitle({
        title: "Enable the alarm",
      });
      chrome.browserAction.setIcon({
        path: "./icons/EyesCream - 16.png",
      });
    } else {
      chrome.alarms.create("the20", {
        periodInMinutes: per,
      });
      chrome.browserAction.setTitle({
        title: "Disable the alarm",
      });
      chrome.browserAction.setIcon({
        path: "./icons/RedX.png",
      });
    }
  });
});
console.log(4);
//Returns the current local time in string format HH:MM:SS am|pm
function currTime() {
  var d = new Date();
  var ampm = d.getHours() >= 12 ? "pm" : "am";
  var hour = d.getHours() % 12;
  if (hour === 0) hour = 12;
  var minute = d.getMinutes();
  var second = d.getSeconds();
  return hour + ":" + minute + ":" + second;
}
console.log(5);
//Event listener for notification alarm
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "the20") {
    //Deletes the20 created by this extension previously
    chrome.notifications.getAll(function (notifs) {
      for (var notification in notifs) {
        chrome.notifications.clear(notification);
      }
    });
    console.log(6);
    //Create notification
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
          title: "I did it!",
          iconUrl: "./icons/EyesCream - 128.png",
        },
        {
          title: "Countdown 20 seconds",
          iconUrl: "./icons/EyesCream - 128.png",
        },
      ],
    };
    console.log(7);
    chrome.notifications.create(notifID, NotificationOptions);
  } else {
    if (alarm.name === "20 second countdown") {
      //playAudio();
      chrome.browserAction.onClicked.addListener(function () {
        new Audio("TropicalMusic.mp3").play();
      });
      // chrome.notifications.clear(alarm.notifID);
    }
  }
});

//function playAudio() {
// myAudio.play();
//console.log(10);
//}

// FAKE LOGIC:
// GLOBAL NOTIFICATION ID = CURRENT SECONDS AT RUNTIME;
// waitFor20Minutes() {
//   const resultsFromNotification = showNotification();
//   if (resultsFromNotification === true) {
//     startAlarmFor20Seconds();
//     playsMusic();
//     notificationId = new Date().getTime();
//   } else {
//
//   }
//  CLEAN UP:
//   1. Regenerate notification ID
// }
