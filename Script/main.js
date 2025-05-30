// prodlist = store item, prodAmnt = quantity of a certain item, total = amout of added items shown

let prodlist = [];
let prodAmnt = [];
let total = 0;

// First initilization of corresponding session variables

if (sessionStorage.getItem("products") != null) {
  total = Number(sessionStorage.getItem("total"));
  prodAmnt = JSON.parse(sessionStorage.getItem("prodAmount"));
  prodlist = JSON.parse(sessionStorage.getItem("products"));
  updateCartIcon();
}

// Adds to cart
function cartAdder(id) {
  total++;

  if (!prodlist.includes(id)) {
    prodlist.push(id);
  }

  if (prodAmnt[id] != null) {
    prodAmnt[id]++;
  } else {
    prodAmnt[id] = 1;
  }

  sessionStorage.setItem("products", JSON.stringify(prodlist));
  sessionStorage.setItem("prodAmount", JSON.stringify(prodAmnt));
  sessionStorage.setItem("total", total.toString());

  updateCartIcon();
}

// Show cart items
async function showCart() {
  document.getElementById("cartList").innerHTML = "";

  const response = await fetch("product.json");
  const json = await response.json();

  prodlist.forEach((element) => {
    const obj = json.find((product) => product.id === element);
    if (!obj) return;

    let item = document.createElement("div");
    item.classList.add("item");

    let image = document.createElement("div");
    image.classList.add("image");

    let img = document.createElement("img");
    img.src = obj.image;
    img.alt = obj.name;

    image.appendChild(img);
    item.appendChild(image);

    let name = document.createElement("div");
    name.classList.add("name");
    name.innerHTML = obj.name;
    item.appendChild(name);

    let totalPrice = document.createElement("div");
    totalPrice.classList.add("totalPrice");
    totalPrice.innerHTML = obj.price + " SEK";
    item.appendChild(totalPrice);

    let cartQuantity = document.createElement("div");
    cartQuantity.classList.add("cartQuantity");

    let minus = document.createElement("span");
    minus.classList.add("minus");
    minus.innerHTML = "&lt;";
    minus.addEventListener("click", function () {
      if (prodAmnt[element] > 1) {
        prodAmnt[element]--;
        total--;
        updateStorage();
        showCart();
      }
    });

    let span = document.createElement("span");
    span.innerHTML = prodAmnt[element];

    let plus = document.createElement("span");
    plus.classList.add("plus");
    plus.innerHTML = "&gt;";
    plus.addEventListener("click", function () {
      prodAmnt[element]++;
      total++;
      updateStorage();
      showCart();
    });

    cartQuantity.appendChild(minus);
    cartQuantity.appendChild(span);
    cartQuantity.appendChild(plus);
    item.appendChild(cartQuantity);

    document.getElementById("cartList").appendChild(item);
  });

  updateCartIcon();
}

// Removes all items from cart
function cleanCart() {
  prodlist = [];
  prodAmnt = [];
  total = 0;
  sessionStorage.removeItem("products");
  sessionStorage.removeItem("prodAmount");
  sessionStorage.removeItem("total");
  document.getElementById("cartList").innerHTML = "";
  updateCartIcon();
}

// Update cart icon
function updateCartIcon() {
  const cart = document.getElementById("cart");
  if (cart) {
    cart.innerHTML = total.toString();
  }
}

// Save current data to sessionStorage
function updateStorage() {
  sessionStorage.setItem("products", JSON.stringify(prodlist));
  sessionStorage.setItem("prodAmount", JSON.stringify(prodAmnt));
  sessionStorage.setItem("total", total.toString());
}

// Quantity control in checkout
document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();

  const increase = document.getElementById("increase");
  const decrease = document.getElementById("decrease");
  const quantityInput = document.getElementById("quantity");
  const addToCartBtn = document.getElementById("cartbutton");

  if (increase && decrease && quantityInput) {
    increase.addEventListener("click", () => {
      quantityInput.value = Number(quantityInput.value) + 1;
    });

    decrease.addEventListener("click", () => {
      const val = Math.max(1, Number(quantityInput.value) - 1);
      quantityInput.value = val;
    });
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const id = Number(addToCartBtn.dataset.productId); // e.g. 1
      const quantity = Number(quantityInput.value);
      for (let i = 0; i < quantity; i++) {
        cartAdder(id);
      }
    });
  }

  const removeBtn = document.getElementById("removebtn");
  if (removeBtn) {
    removeBtn.addEventListener("click", cleanCart);
  }
});

