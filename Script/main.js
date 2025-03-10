const empty = document.createElement("div");

if (sessionStorage.getItem("total") == null) {
  sessionStorage.setItem("total", "0");
} else {
  let amount = Number(sessionStorage.getItem("total"));
  document.getElementById("amount").innerHTML = amount;
}

function addToCart(id){
    if (sessionStorage.getItem("amount" + id.toString())== null){
        sessionStorage.setItem("amount" + id.toString(), "1");

        sessionStorage.setItem(
            id.toString(),
            document.getElementById(id).outerHTML
        );
    } else {
        let amount = Number(sessionStorage.getItem("amount"+ id.toString()))
        amount++;
        sessionStorage.setItem("amount" + id.toString(), amount.toString());
    }
}