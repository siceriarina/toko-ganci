let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let reviews =
JSON.parse(localStorage.getItem("reviews")) || [];

function save(){
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}

function saveReview(){
  localStorage.setItem(
    "reviews",
    JSON.stringify(reviews)
  );
}

function tambah(nama, harga, gambar){

  cart.push({
    nama,
    harga,
    gambar
  });

  save();

  render();
}

function hapus(index){

  cart.splice(index, 1);

  save();

  render();
}

function render(){

  let list =
  document.getElementById("list");

  let total =
  document.getElementById("total");

  let jumlah =
  document.getElementById("jumlah");

  list.innerHTML = "";

  let sum = 0;

  cart.forEach((item, i) => {

    sum += item.harga;

    let li =
    document.createElement("li");

    li.innerHTML = `
      <div class="item-cart">

        <img src="${item.gambar}">

        <div>
          <b>${item.nama}</b><br>
          Rp ${item.harga}
        </div>

      </div>

      <button
        class="delete"
        onclick="hapus(${i})"
      >
        X
      </button>
    `;

    list.appendChild(li);
  });

  total.innerText =
  sum.toLocaleString("id-ID");

  jumlah.innerText = cart.length;
}

function checkout(){

  if(cart.length === 0){

    alert("Keranjang kosong!");

    return;
  }

  let email =
  "maryamsyasmin@gmail.com";

  let text =
  "Halo, saya mau pesan:%0A%0A";

  let total = 0;

  cart.forEach(item => {

    text +=
    `- ${item.nama} (Rp ${item.harga})%0A`;

    total += item.harga;
  });

  text += `%0ATotal: Rp ${total}`;

  window.location.href =
  `mailto:${email}?subject=Pesanan Ganci&body=${text}`;

  cart = [];

  save();

  render();
}

function kirimUlasan(){

  let username =
  document.getElementById("username").value;

  let review =
  document.getElementById("review").value;

  if(username === "" || review === ""){

    alert("Isi dulu ya!");

    return;
  }

  reviews.push({
    username,
    review
  });

  saveReview();

  renderReview();

  document.getElementById("username").value = "";
  document.getElementById("review").value = "";
}

function renderReview(){

  let list =
  document.getElementById("listReview");

  list.innerHTML = "";

  reviews.forEach(item => {

    let div =
    document.createElement("div");

    div.className = "review-item";

    div.innerHTML = `
      <h3>@${item.username}</h3>
      <p>${item.review}</p>
    `;

    list.appendChild(div);
  });
}

render();
renderReview();