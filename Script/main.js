function addToCart() {
  let cart = Number(localStorage.getItem("product"));
  cart++;
  localStorage.setItem("product", cart);
}

function removeFromCart() {
  let cart = Number(localStorage.getItem("product"));
  cart--;
  localStorage.setItem("product", cart);
}

  
