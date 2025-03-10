const empty = document.createElement("div");
// The storage is 0 when you open the website
if (sessionStorage.getItem("total") == null) {
  sessionStorage.setItem("total", "0");
} else {
  let amount = Number(sessionStorage.getItem("total"));
  document.getElementById("amount").innerHTML = amount;
}

// Store the id-element in the cart (product)
function addToCart(id) {
  if (sessionStorage.getItem("amount" + id.toString()) == null) {
    sessionStorage.setItem("amount" + id.toString(), "1");

    sessionStorage.setItem(
      id.toString(),
      document.getElementById(id).outerHTML
    );
  // Stores multiple id's in cart and sessionStorage
  } else {
    let amount = Number(sessionStorage.getItem("amount" + id.toString()));
    amount++;
    sessionStorage.setItem("amount" + id.toString(), amount.toString());
  }

  let amount = Number(sessionStorage.getItem("total"));
  amount++;
  sessionStorage.setItem("total", amount.toString());
  document.getElementById("amount").innerHTML = amount;
}

// Sows stored products in the checkout page
function showCart() {
  document.getElementById("main").innerHTML = sessionStorage.getItem("2");
}

// Removes stored items from checkout page and sessionStorage
function removeFromCart(id) {
  sessionStorage.removeItem(id.toString());
  sessionStorage.removeItem("amount" + id.toString());
  document.getElementById("main").innerHTML = "";
}