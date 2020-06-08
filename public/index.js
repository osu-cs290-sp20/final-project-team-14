var loginButton = document.getElementById("loginButton");
if(loginButton) {
  loginButton.addEventListener('click', toggleLoginModal);
}

var loginModalCloseButton = document.querySelector(".login-modal-close-button");
if(loginModalCloseButton) {
  loginModalCloseButton.addEventListener('click',toggleLoginModal);
}
var loginModalCancelButton = document.querySelector(".login-modal-cancel-button");
if(loginModalCancelButton) {
  loginModalCancelButton.addEventListener('click',toggleLoginModal);
}

var loginModalAcceptButton = document.querySelector(".login-modal-accept-button");
if(loginModalAcceptButton) {
  loginModalAcceptButton.addEventListener('click', handleLogin);
}

var logoutButton = document.getElementById("logoutButton");
if(logoutButton) {
  logoutButton.addEventListener('click', handleLogout);
}

function toggleLoginModal() {

  var modal = document.getElementById("login-modal");
  modal.classList.toggle("hidden");
  var modalBackdrop = document.getElementById("login-modal-backdrop");
  modalBackdrop.classList.toggle("hidden");

  var loginUserInput = document.getElementById("login-username-input");
  loginUserInput.value = "";
  var loginPasswordInput = document.getElementById("login-password-input");
  loginPasswordInput.value = "";

}

function handleLogin() {

  var usernameInput = document.getElementById("login-username-input");
  var usernameInputValue = usernameInput.value;
  var passwordInput = document.getElementById("login-password-input");
  var passwordInputValue = passwordInput.value;

  if(usernameInputValue === "" || passwordInputValue === "") {
    window.alert("You must enter a username and a password!");
  }
  else if(!login_data[usernameInputValue]) {
    window.alert("Invalid login!");
  }
  else if(!(login_data[usernameInputValue] === passwordInputValue)) {
    window.alert("Invalid login!");
  }
  else {
    window.location.href = "/home/" + usernameInputValue;
  }

}

function handleLogout() {

  window.location.href = "/";

}
