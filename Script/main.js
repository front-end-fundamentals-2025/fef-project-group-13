
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