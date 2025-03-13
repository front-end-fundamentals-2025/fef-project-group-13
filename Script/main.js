let prodlist = [];

if (sessionStorage.getItem("products") != null) {
  prodlist = JSON.parse(sessionStorage.getItem("products"));
  cart = document.getElementById("cart");
  cart.innerHTML = prodlist.length;
}

function cartAdder(id) {
  prodlist.push(id);
  sessionStorage.setItem("products", JSON.stringify(prodlist));
  cart = document.getElementById("cart");
  cart.innerHTML = prodlist.length;
}

document.getElementById("cartbutton").addEventListener("click", function () {
  cartAdder(1);
});
