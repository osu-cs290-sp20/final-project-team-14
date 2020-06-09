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

function adjustDOM(sortedList) {
  for(var i = 0; i < sortedList.length; i++) {
    var parent = sortedList[i].parentNode;
    var removedItem = parent.removeChild(sortedList[i]);
    parent.appendChild(removedItem);
  }
} 

var sortTitle = document.getElementById('sortTitle');
if(sortTitle) {
  sortTitle.addEventListener('click', function() {
    var listings = Array.prototype.slice.call(document.getElementsByClassName('bookListing'));
    if(listings.length <= 1) return;
    listings.sort(function(a, b) {
      var title0 = a.getElementsByClassName('book-title')[0].textContent.substring(12).toUpperCase();
      var title1 = b.getElementsByClassName('book-title')[0].textContent.substring(12).toUpperCase();
      if(title0 < title1) return -1;
      else if(title1 < title0) return 1;
      else return 0;     
    });
    adjustDOM(listings);
  });
}

var sortClass = document.getElementById('sortClass');
if(sortClass) {
  sortClass.addEventListener('click', function() {
    var listings = Array.prototype.slice.call(document.getElementsByClassName('bookListing'));
    if(listings.length <= 1) return;
    listings.sort(function(a, b) {
      var class0 = a.getElementsByClassName('book-class')[0].textContent.substring(7);
      var class1 = b.getElementsByClassName('book-class')[0].textContent.substring(7);
      if(class0 < class1) return -1;
      else if(class1 < class0) return 1;
      else return 0;     
    });
    adjustDOM(listings);
  });
}

var sortPrice = document.getElementById('sortPrice');
if(sortPrice) {
  sortPrice.addEventListener('click', function() {
    var listings = Array.prototype.slice.call(document.getElementsByClassName('bookListing'));
    if(listings.length <= 1) return;
    listings.sort(function(a, b) {
      var price0 = a.getElementsByClassName('book-price')[0].textContent.substring(8);
      var price1 = b.getElementsByClassName('book-price')[0].textContent.substring(8);
      if(price0 < price1) return -1;
      else if(price1 < price0) return 1;
      else return 0;     
    });
    adjustDOM(listings);
  });
}