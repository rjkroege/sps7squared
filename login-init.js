//This function checks if the user is signed in
function init() {
  chrome.runtime.sendMessage(
    { message: "is_user_signed_in" },
    function (response) {
      if (response.message === "success" && response.payload) {
        window.location.replace("./popup.html");
      }
    }
  );
}

init();
