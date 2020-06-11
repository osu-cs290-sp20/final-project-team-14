listingArray = [];

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

var textbookSearchButton = document.querySelector("#textbook-button");
if(textbookSearchButton){
  textbookSearchButton.addEventListener('click', searchAPI);
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
	//will not work because textbook server responds with error: 500	
}
