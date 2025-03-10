const empty = document.createElement("div");

if (sessionStorage.getItem("total") == null) {
  sessionStorage.setItem("total", "0");
} else {
  let amount = Number(sessionStorage.getItem("total"));
  document.getElementById("amount").innerHTML = amount;
}