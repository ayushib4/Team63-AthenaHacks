document.addEventListener(
  "DomContentLoaded",
  function () {
    var checkPageButton = document.getElementById("clickit");
    checkPageButton.addEventListener(
      "click",
      function () {
        "";
        chrome.tabs.getSelected(null, function (tab) {
          alert("Hello User! It is time to take an eye screen break!");
        });
      },
      false
    );
  },
  false
);

setInterval(function () {
  chrome.notifications.create(options);
}, 10000);
//Create notifications every 20 minutes = 1200000 millisecons

chrome.notifications.create(
  "name-for-notification" + Math.random(),
  {
    type: "basic",
    iconUrl: "./icon.EyesCream - 32.png",
    title: "This is a notification",
    message: "hello there!",
  },
  function () {}
);
