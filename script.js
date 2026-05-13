let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let reviews =
JSON.parse(localStorage.getItem("reviews")) || [];


/* =========================
   SIMPAN DATA
========================= */

function save() {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}

function saveReview() {

  localStorage.setItem(
    "reviews",
    JSON.stringify(reviews)
  );

}


/* =========================
   TAMBAH PRODUK
========================= */

function tambah(nama, harga, gambar) {

  cart.push({
    nama,
    harga,
    gambar
  });

  save();

  render();

}


/* =========================
   HAPUS PRODUK
========================= */

function hapus(index) {

  cart.splice(index, 1);

  save();

  render();

}


/* =========================
   RENDER KERANJANG
========================= */

function render() {

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
          Rp ${item.harga.toLocaleString("id-ID")}
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

  jumlah.innerText =
  cart.length;

}


/* =========================
   CHECKOUT KE GMAIL
========================= */

function checkout() {

  if (cart.length === 0) {

    alert("Keranjang kosong!");

    return;

  }

  let email =
  "maryamsyasmin@gmail.com";

  let pesan =
  "Halo, saya mau pesan:\n\n";

  let total = 0;

  cart.forEach(item => {

    pesan +=
    `• ${item.nama} - Rp ${item.harga.toLocaleString("id-ID")}\n`;

    total += item.harga;

  });

  pesan +=
  `\nTotal: Rp ${total.toLocaleString("id-ID")}`;

  let gmailURL =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Pesanan Ganci")}&body=${encodeURIComponent(pesan)}`;

  window.open(
    gmailURL,
    "_blank"
  );

  cart = [];

  save();

  render();

}


/* =========================
   KIRIM ULASAN
========================= */

function kirimUlasan() {

  let username =
  document.getElementById("username").value;

  let review =
  document.getElementById("review").value;

  if (username === "" || review === "") {

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


/* =========================
   TAMPILKAN ULASAN
========================= */

function renderReview() {

  let list =
  document.getElementById("listReview");

  list.innerHTML = "";

  reviews.forEach(item => {

    let div =
    document.createElement("div");

    div.className =
    "review-item";

    div.innerHTML = `
      <h3>@${item.username}</h3>
      <p>${item.review}</p>
    `;

    list.appendChild(div);

  });

}


/* =========================
   JALANKAN
========================= */

render();

renderReview();
