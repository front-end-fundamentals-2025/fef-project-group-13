let prodlist = [];
let prodAmnt = [];
let total = 0;

if (sessionStorage.getItem("products") != null) {
  total = Number(sessionStorage.getItem("total"));
  prodAmnt = JSON.parse(sessionStorage.getItem("prodAmount"));
  prodlist = JSON.parse(sessionStorage.getItem("products"));
  cart = document.getElementById("cart");
  cart.innerHTML = total.toString();
}

function cartAdder(id) {
  total++;
  if (!prodlist.includes(id)) {
    prodlist.push(id);
    sessionStorage.setItem("products", JSON.stringify(prodlist));
  }

  if (prodAmnt[id] != null) {
    prodAmnt[id]++;
  } else {
    prodAmnt[id] = 1;
  }
  sessionStorage.setItem("prodAmount", JSON.stringify(prodAmnt));
  sessionStorage.setItem("total", total.toString());
  cart = document.getElementById("cart");
  cart.innerHTML = total.toString();
}

function showCart() {
  document.getElementById("cartList").innerHTML = "";
  prodlist.forEach(async function (element) {
    const response = await fetch("product.json");
    let json = await response.json();
    let obj = json.find((product) => product.id === element);

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
  });
}

async function getProduct(id) {
  const response = await fetch("product.json");
  let json = await response.json();

  console.log(json.find((product) => product.id === id));

  return json.find((product) => product.id === id);
}

document.getElementById("cartbutton").addEventListener("click", function () {
  cartAdder(1);
});
