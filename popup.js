document.addEventListener(
  "DomContentLoaded",
  function () {
    var checkPageButton = document.getElementById("clickit");
    checkPageButton.addEventListener(
      "click",
      function () {
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

chrome.notifications.onClicked.addListener(function () {
  chrome.tabs.create({ url: "break.html" });
});
