var homeLink = document.querySelector(".homeLink");
var requestsLink = document.querySelector(".requestsLink");
var myListingsLink = document.querySelector(".myListingsLink");
var myRequestsLink = document.querySelector(".myRequestsLink");
var aboutLink = document.querySelector(".aboutLink");
var classSearchLink = document.querySelector(".classSearchLink");
var createPostLink = document.querySelector(".createPostLink");

homeLink.setAttribute("href", "/home/" + username);
requestsLink.setAttribute("href", "/homeRequests/" + username);
myListingsLink.setAttribute("href", "/listings/" + username);
myRequestsLink.setAttribute("href", "/requests/" + username);
aboutLink.setAttribute("href", "/about/" + username);
classSearchLink.setAttribute("href", "/byClass/" + username);
createPostLink.setAttribute("href", "/createPost/" + username);
