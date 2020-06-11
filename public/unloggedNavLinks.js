var myListingsLink = document.querySelector(".myListingsLink");
var myRequestsLink = document.querySelector(".myRequestsLink");
var createPostLink = document.querySelector(".createPostLink");

myListingsLink.addEventListener('click', function () {
  alert("You must log in to see your listings!");
});
myRequestsLink.addEventListener('click', function () {
  alert("You must log in to see your requests!");
});
createPostLink.addEventListener('click', function () {
  alert("You must log in to create a post!");
});
