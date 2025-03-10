const empty = document.createElement("div");

if (sessionStorage.getItem("total") == null) {
  sessionStorage.setItem("total", "0");
} else {
  let amount = Number(sessionStorage.getItem("total"));
  document.getElementById("amount").innerHTML = amount;
}

function addToCart(id) {
  if (sessionStorage.getItem("amount" + id.toString()) == null) {
    sessionStorage.setItem("amount" + id.toString(), "1");

    sessionStorage.setItem(
      id.toString(),
      document.getElementById(id).outerHTML
    );
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

function showCart() {
  document.getElementById("main").innerHTML = sessionStorage.getItem("2");
}

function removeFromCart(id) {
  sessionStorage.removeItem(id.toString());
  sessionStorage.removeItem("amount" + id.toString());
  document.getElementById("main").innerHTML = "";
}