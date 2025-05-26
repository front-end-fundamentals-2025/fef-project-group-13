
document.addEventListener("DOMContentLoaded", () => {
  const amount = sessionStorage.getItem("total") || "0";
  const cartSpan = document.querySelector("#i3 span");
  if (cartSpan) cartSpan.textContent = amount;
})

// Store the id-element in the cart (product)
function addToCart(id) {
  if (sessionStorage.getItem("amount" + id) == null) {
    sessionStorage.setItem("amount" + id, "1");
    sessionStorage.setItem(id, document.getElementById(id).outerHTML);
  // Stores multiple id's in cart and sessionStorage
  } else {
    let amount = Number(sessionStorage.getItem("amount" + id));
    amount++;
    sessionStorage.setItem("amount" + id, amount.toString());
  }

  
  let total = Number(sessionStorage.getItem("total")) || 0;
  total++;
  sessionStorage.setItem("total", total.toString());
  
  document.getElementById("amount").innerHTML = total;
  const cartSpan = document.querySelector("#i3 span");
  if (cartSpan) cartSpan.textContent = total;
}

// Shows stored products in the checkout page
function showCart(){
  const main = document.getElementById("main") || document.querySelector(".listCart");
  main.innerHTML = "";

  let totalItems = Number(sessionStorage.getItem("total")) || 0;
  if (totalItems === 0){
    main.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  for (let i = 0; i < sessionStorage.length; i++){
    const key = sessionStorage.key(i);
    if (key.startsWith("product")) {
      const amountKey = "amount" + key;
      const amount = sessionStorage.getItem(amountKey);
      

      const temp = document.createElement("div");
      temp.innerHTML = sessionStorage.getItem(key);

      const product = temp.querySelector(".bridleDetails");
      if (product){
        const name = product.querySelector("h1").innerText;
        const price = product.querySelector("h2").innerText;
        const imgSrc = product.parentElement.querySelector("img").src;

        const innerHTML =`
        <div class="item">
            <div class="image"><img src="${imgSrc}" alt=""></div>
            <div class="name">${name}</div>
            <div class="totalPrice">${price}</div>

          <div class="cartQuantity">
            <span class="minus" onclick="updateAmount('${key}', -1)"><</span>
            <span>${amount}</span>
            <span class="plus" onclick="updateAmount('${key}', 1)">></span>
          </div>
        </div>
        `;
        main.innerHTML += innerHTML;
      }
    }
  }
}

function updateAmount(id, change){
  let currentAmount = Number(sessionStorage.getItem("amount" + id));
  if (!currentAmount) return;

  currentAmount += change;

  if (currentAmount <= 0) {
    removeFromCart(id);
  } else {
    sessionStorage.setItem("amount" + id, currentAmount.toString());
  }
  
  let total = 0;
  for (let i = 0; i < sessionStorage.length; i++){
    let key = sessionStorage.key(i);
    if (key.startsWith("amount")){
      total += Number(sessionStorage.getItem(key));
    }
  }
  sessionStorage.setItem("total", total.toString());
  document.querySelector("#i3 span").textContent = total;

  showCart();
}

// Removes stored items from checkout page and sessionStorage
function removeFromCart(id) {
  sessionStorage.removeItem(id);
  sessionStorage.removeItem("amount" + id);
  showCart();
}

// prodlist = store item, prodAmnt = quantity of a certain item, total = amout of added items shown

let prodlist = [];
let prodAmnt = [];
let total = 0;

// First initilization of corresponding session variables

if (sessionStorage.getItem("products") != null) {
  total = Number(sessionStorage.getItem("total"));
  prodAmnt = JSON.parse(sessionStorage.getItem("prodAmount"));
  prodlist = JSON.parse(sessionStorage.getItem("products"));
  cart = document.getElementById("cart");
  cart.innerHTML = total.toString();
}

// Adds to cart

function cartAdder(id) {
  total++;

  // Adds id of item in the product array and updates session array

  if (!prodlist.includes(id)) {
    prodlist.push(id);
    sessionStorage.setItem("products", JSON.stringify(prodlist));
  }

  // Adds amount

  if (prodAmnt[id] != null) {
    prodAmnt[id]++;
  } else {
    prodAmnt[id] = 1;
  }

  // Update session arrays of prodAmount & total

  sessionStorage.setItem("prodAmount", JSON.stringify(prodAmnt));
  sessionStorage.setItem("total", total.toString());

  // Sets the number of cart
  cart = document.getElementById("cart");
  cart.innerHTML = total.toString();
}

// shows product in cart

function showCart() {
  document.getElementById("cartList").innerHTML = "";

  // Shows every product in cart from prodlist and shows its amount

  prodlist.forEach(async function (element) {
    // fetches data from json datafile, and makes it into an object.
    const response = await fetch("product.json");
    let json = await response.json();
    let obj = json.find((product) => product.id === element);

    // the html of the cartList element to this:

    /*<div class="item">
        <div class="image">
          <img src="images/Dressage.jpg" alt="" />
        </div>
        <div class="name">Dressage Bridle</div>
        <div class="totalPrice">3099 SEK</div>
        <div class="cartQuantity">
          <span class="minus"><</span>
          <span>1</span>
          <span class="plus">></span>
        </div>
      </div>*/

    let item = document.createElement("div");
    item.classList.add("item");

    let image = document.createElement("div");
    image.classList.add("image");

    let img = document.createElement("img");
    img.src = obj.image;

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
    cartQuantity.appendChild(minus);
    minus.innerHTML = "<";

    let span = document.createElement("span");
    prodAmnt = JSON.parse(sessionStorage.getItem("prodAmount"));
    span.innerHTML = prodAmnt[element];
    cartQuantity.appendChild(span);

    let plus = document.createElement("span");
    plus.innerHTML = ">";
    plus.classList.add("plus");
    cartQuantity.appendChild(plus);

    item.appendChild(cartQuantity);

    document.getElementById("cartList").appendChild(item);
  });
}

// Removes all itens from cart

function cleanCart() {
  prodlist = [];
  prodAmnt = [];
  total = 0;

  sessionStorage.removeItem("products");
  sessionStorage.removeItem("prodAmount");
  sessionStorage.removeItem("total");
  document.getElementById("cartList").innerHTML = "";
  cart = document.getElementById("cart");
  cart.innerHTML = "0";
}

// Checks for user interaction with cartbtn & removebtn

if (document.getElementById("cartbutton") != null) {
  document.getElementById("cartbutton").addEventListener("click", function () {
    cartAdder(1);
  });
}

if (document.getElementById("removebtn") != null) {
  document.getElementById("removebtn").addEventListener("click", function () {
    cleanCart();
  });
}

