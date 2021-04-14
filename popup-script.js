document.querySelector("#sign_out").addEventListener("click", () => {
  chrome.runtime.sendMessage({ message: "sign_out" }, function (responese) {
    if (responese.message === "success") {
      window.location.replace("./login.html");
    }
  });
});
