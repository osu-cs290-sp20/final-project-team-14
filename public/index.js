listingArray = [];
//Was for API integration
var HttpOAuth2 = new XMLHttpRequest();
var HttpTextbook = new XMLHttpRequest();
var oAuth2URL = "https://api.oregonstate.edu/oauth2/token";
var key_data;
try{
	key_data = require("../keys.json");
} catch (error){
	key_data = "";
}


var loginButton = document.getElementById("loginButton");
if(loginButton) {
  loginButton.addEventListener('click', toggleLoginModal);
}

var createAccountButton = document.getElementById("createAccountButton");
if(createAccountButton) {
  createAccountButton.addEventListener('click', toggleCreateAccountModal);
}

var loginModalCloseButton = document.querySelector(".login-modal-close-button");
if(loginModalCloseButton) {
  loginModalCloseButton.addEventListener('click',toggleLoginModal);
}
var loginModalCancelButton = document.querySelector(".login-modal-cancel-button");
if(loginModalCancelButton) {
  loginModalCancelButton.addEventListener('click',toggleLoginModal);
}

var createAccountModalCloseButton = document.querySelector(".create-account-modal-close-button");
if(createAccountModalCloseButton) {
  createAccountModalCloseButton.addEventListener('click',toggleCreateAccountModal);
}
var createAccountModalCancelButton = document.querySelector(".create-account-modal-cancel-button");
if(createAccountModalCancelButton) {
  createAccountModalCancelButton.addEventListener('click',toggleCreateAccountModal);
}

var loginModalAcceptButton = document.querySelector(".login-modal-accept-button");
if(loginModalAcceptButton) {
  loginModalAcceptButton.addEventListener('click', handleLogin);
}

var createAccountModalAcceptButton = document.querySelector(".create-account-modal-accept-button");
if(createAccountModalAcceptButton) {
  createAccountModalAcceptButton.addEventListener('click', handleCreateAccount);
}

var logoutButton = document.getElementById("logoutButton");
if(logoutButton) {
  logoutButton.addEventListener('click', handleLogout);
}

var listingButton = document.querySelector(".listing-button");
if(listingButton) {
  listingButton.addEventListener('click', listingPostType);
}

var requestButton = document.querySelector(".request-button");
if(requestButton) {
  requestButton.addEventListener('click', requestPostType);
}

var createListingButton = document.querySelector(".create-listing-button");
if(createListingButton) {
  createListingButton.addEventListener('click', addListing);
}

var createRequestButton = document.querySelector(".create-request-button");
if(createRequestButton) {
  createRequestButton.addEventListener('click', addRequest);
}

var searchBar = document.getElementById("navbar-search-input");
searchBar.addEventListener('keyup', searchListings);

var textbookSearchButton = document.getElementsByClassName("textbook-button");
if(textbookSearchButton[0]){
  textbookSearchButton[0].addEventListener('click', searchAPI);
}

var deletePostButtons = document.getElementsByClassName("deletePostButton");
if(deletePostButtons) {
  for(var i = 0; i<deletePostButtons.length; i++) {
    deletePostButtons[i].addEventListener('click', handleDeletePost);
  }
}

function handleDeletePost(event) {
  var is_listing;
  if(window.location.pathname[1] == "l") {
    is_listing = true;
  } else {
    is_listing = false;
  }

  var bookTitle = event.target.parentNode.querySelector(".book-title").textContent.substr(12);
  var bookClass = event.target.parentNode.querySelector(".book-class").textContent.substr(7);
  if(is_listing) {
    var bookCondition = event.target.parentNode.querySelector(".book-condition").textContent.substr(11);
    var bookPrice = event.target.parentNode.querySelector(".book-price").textContent.substr(8);
  }
  var contact = event.target.parentNode.querySelector(".contact").textContent.substr(9);
  var url = event.target.parentNode.querySelector(".book-img").getAttribute("src");

  if(is_listing) {
    var post = {
      bookTitle,
      bookClass,
      bookCondition,
      bookPrice,
      contact,
      url,
      user: window.location.pathname.substr(10),
      is_listing: true,
      is_personal_post: false
    }
  }
  else {
    var post = {
      bookTitle,
      bookClass,
      contact,
      url,
      user: window.location.pathname.substr(10),
      is_listing: false,
      is_personal_post: false
    }
  }

  var request = new XMLHttpRequest();

  var requestUrl = "/deletePost";
  request.open('POST', requestUrl);

  var requestBody = JSON.stringify(post);

  request.setRequestHeader('Content-Type', 'application/json');

  request.send(requestBody);

  request.addEventListener('load', function (event_) {
    if(event_.target.status === 200) {
      alert("Successfully deleted post!");

      event.target.parentNode.parentNode.remove();
    }
  });
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

function toggleCreateAccountModal() {

  var modal = document.getElementById("create-account-modal");
  modal.classList.toggle("hidden");
  var modalBackdrop = document.getElementById("create-account-modal-backdrop");
  modalBackdrop.classList.toggle("hidden");

  var createAccountUserInput = document.getElementById("create-account-username-input");
  createAccountUserInput.value = "";
  var createAccountPasswordInput = document.getElementById("create-account-password-input");
  createAccountPasswordInput.value = "";

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

function handleCreateAccount() {

  var usernameInput = document.getElementById("create-account-username-input");
  var usernameInputValue = usernameInput.value;
  var passwordInput = document.getElementById("create-account-password-input");
  var passwordInputValue = passwordInput.value;

  if(usernameInputValue === "" || passwordInputValue === "") {
    window.alert("You must enter a username and a password!");
  }
  else if(login_data[usernameInputValue]){
    window.alert("Username already taken!");
  }
  else {
    login_data[usernameInputValue] = passwordInputValue;

    var request = new XMLHttpRequest();

    var requestUrl = "/createAccount";
    request.open('POST', requestUrl);

    var requestBody = JSON.stringify(login_data);

    request.setRequestHeader('Content-Type', 'application/json');

    request.send(requestBody);

    request.addEventListener('load', function (event) {
      if(event.target.status === 200) {
        alert("Account created successfully!");

        window.location.href = "/home/" + usernameInputValue;
      }
    });
  }

}

function handleLogout() {

  window.location.href = "/";

}

function listingPostType() {

  var createListingContainer = document.querySelector(".create-listing-container");
  var createRequestContainer = document.querySelector(".create-request-container");

  createListingContainer.classList.toggle("hidden", false);
  createRequestContainer.classList.toggle("hidden", true);

}

function requestPostType() {

  var createListingContainer = document.querySelector(".create-listing-container");
  var createRequestContainer = document.querySelector(".create-request-container");

  createListingContainer.classList.toggle("hidden", true);
  createRequestContainer.classList.toggle("hidden", false);

}

function addListing() {
  var listingTitleInput = document.getElementById("listing-title-input").value;
  var listingClassInput = document.getElementById("listing-class-input").value;
  var listingConditionInput = document.getElementById("listing-condition-input").value;
  var listingPriceInput = document.getElementById("listing-price-input").value;
  var listingContactInput = document.getElementById("listing-contact-input").value;
  var listingUrlInput = document.getElementById("listing-url-input").value;

  if(!listingTitleInput || !listingClassInput || !listingConditionInput || !listingPriceInput || !listingContactInput || !listingUrlInput) {
    alert("You need to fill in all of the information!");
  }
  else {
    var request = new XMLHttpRequest();

    var requestUrl = "/addListing";
    request.open('POST', requestUrl);

    var requestBody = JSON.stringify({
      bookTitle: listingTitleInput,
      bookClass: listingClassInput,
      bookCondition: listingConditionInput,
      bookPrice: listingPriceInput,
      contact: listingContactInput,
      url: listingUrlInput,
      user: username,
      is_listing: true
    });

    request.setRequestHeader('Content-Type', 'application/json');

    request.send(requestBody);

    request.addEventListener('load', function (event) {
      if(event.target.status === 200) {
        alert("Listing created successfully!");

        document.getElementById("listing-title-input").value = "";
        document.getElementById("listing-class-input").value = "";
        document.getElementById("listing-condition-input").value = "";
        document.getElementById("listing-price-input").value = "";
        document.getElementById("listing-contact-input").value = "";
        document.getElementById("listing-url-input").value = "";
      }
    });
  }
}

function addRequest() {
  var requestTitleInput = document.getElementById("request-title-input").value;
  var requestClassInput = document.getElementById("request-class-input").value;
  var requestContactInput = document.getElementById("request-contact-input").value;
  var requestUrlInput = document.getElementById("request-url-input").value;

  if(!requestTitleInput || !requestClassInput || !requestContactInput || !requestUrlInput) {
    alert("You need to fill in all of the information!");
  }
  else {
    var request = new XMLHttpRequest();

    var requestUrl = "/addRequest";
    request.open('POST', requestUrl);

    var requestBody = JSON.stringify({
      bookTitle: requestTitleInput,
      bookClass: requestClassInput,
      contact: requestContactInput,
      url: requestUrlInput,
      user: username,
      is_listing: false
    });

    request.setRequestHeader('Content-Type', 'application/json');

    request.send(requestBody);

    request.addEventListener('load', function (event) {
      if(event.target.status === 200) {
        alert("Request created successfully!");

        document.getElementById("request-title-input").value = "";
        document.getElementById("request-class-input").value = "";
        document.getElementById("request-contact-input").value = "";
        document.getElementById("request-url-input").value = "";
      }
    });
  }
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

function parseListing(elem) {
  var listTitle = elem.getElementsByClassName("book-title")[0].textContent.trim().replace("Book Title: ","").toLowerCase();
  var listClass = elem.getElementsByClassName("book-class")[0].textContent.trim().replace("Class: ","").toLowerCase();
  var listContact = elem.getElementsByClassName("contact")[0].textContent.trim().replace("Contact: ","").toLowerCase();
  if (elem.getElementsByClassName("book-condition").length == 1) {
    var listCon = elem.getElementsByClassName("book-condition")[0].textContent.trim().replace("Condition: ","").toLowerCase();
    var listPrice = elem.getElementsByClassName("book-price")[0].textContent.trim().replace("Price: $","").toLowerCase();
    var text = listTitle + " " + listClass + " " + listCon + " " + listPrice + " " + listContact;
    return text;
  }
  var text = listTitle + " " + listClass + " " + listContact;
  return text;
}

window.addEventListener('DOMContentLoaded', function() {
  var listHTML = document.getElementsByClassName('bookListing');
  for (var i = 0; i < listHTML.length; i++) {
    listingArray.push(listHTML[i]);
  }
});

function refreshListings() {
  var container = document.getElementsByClassName('listingsContainer');
  for (var i = 0; i < listingArray.length; i++) {
    container[0].appendChild(listingArray[i]);
  }
}

function searchListings() {
	console.log("Test");
  var container = document.getElementsByClassName('listingsContainer');
  var searchInput = document.getElementById('navbar-search-input').value;
  refreshListings();
  if (searchInput != "") {
    searchInput = searchInput.toLowerCase();
    var tempString = null;
    for (var i = 0; i <listingArray.length; i++) {
      tempString = parseListing(listingArray[i]);
      if (tempString.includes(searchInput)) {
        continue;
      }
      else {
        container[0].removeChild(listingArray[i]);
      }
    }
  }
}


function searchAPI() {
	var searchTerms = document.getElementsByClassName('textbook-parameter');
	for(var i = 0; i < searchTerms.length-1; i++){ //Goes through all required parameters
		//console.log(searchTerms[i].childNodes);
		if(searchTerms[i].childNodes[1].value == ""){
			alert("One or more required boxes does not have a value");
			return;
		}
	}
	var requestData = ({
		"academicYear" : searchTerms[0].childNodes[1].value,
		"term" : searchTerms[1].childNodes[1].value,
		"subject" : searchTerms[2].childNodes[1].value,
		"courseNumber" : searchTerms[3].childNodes[1].value
	});
	if(searchTerms[4].childNodes[1].value != ""){
		requestData.append({"section" : searchTerms[4].childNodes[1].value});
	}

	//will not work because textbook server responds with error: 500
	var container = document.getElementsByClassName('listingContainer');
	console.log(container);


	//THIS CODE IS AN EXAMPLE ON HOW IT WOULD WORK, IT DOES NOT IF UNCOMMENTED
	//HttpOAuth2.open("POST", oAuth2URL, false);
	//HttpOAuth2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	//HttpOAuth2.send( "client_id=" + key_data["consumerKey"] + "&client_secret=" + key_data["consumerSecret"] + "&grant_type=client_credentials");
	//var access_token = JSON.parse(HttpOAuth2.responseText)["access_token"];
	//DO API CALL HERE (DOESN"T WANT TO ACTUALLY DO THE API CALL WHICH IS SUPER ANNOYING
	//CONTEXT TO GO IN THIS VARIABLE
	//HttpTextbook.setRequestHeader("Authorization: Bearer " + access_token);"
	//HttpTextbook.send(requestData);

	var context = ({
		"bookTitle" : "Placeholder Title",
		"bookClass" : "MTH",
		"bookDescription" : "Placeholder book because api does not work"
	});
	var entry = Handlebars.templates.entry(context);
	container[0].insertAdjacentHTML('beforeend', entry);

}
