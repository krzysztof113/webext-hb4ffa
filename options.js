function saveOptions(e) {
  newValue = document.querySelector("#url").value;

  if (newValue.startsWith("http://") || newValue.startsWith("https://")) {
    console.log("Starts with");
  } else {
    if (newValue !== undefined && newValue != "") {
      newValue = "http://"+newValue;
    }
    console.log("Not Starts with");
  }
  e.preventDefault();
  browser.storage.local.set({
    url: newValue
  });
  document.querySelector("#url").value = newValue;
  document.querySelector("#save").innerHTML = "Saved ✓";
  setTimeout(function(){ 
    document.querySelector("#save").innerHTML = "Save";
   }, 2000);
}
function resetUrl(e) {
  document.querySelector("#url").value = "";
  document.querySelector("#save").innerHTML = "Saved ✓";
  setTimeout(function(){ 
    document.querySelector("#save").innerHTML = "Save";
   }, 2000);
  e.preventDefault();
  browser.storage.local.set({
    url: ""
  });

}
function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#url").value = result.url || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("url");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", resetUrl);
