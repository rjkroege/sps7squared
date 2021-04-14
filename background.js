let user_signed_in = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "is_user_signed_in") {
    sendResponse({
      message: "success",
      payload: user_signed_in,
    });
  }

  return true;
});
