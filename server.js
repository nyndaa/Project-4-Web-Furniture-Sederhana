const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

/* DATABASE SEMENTARA    */
let cart = [];

/* LOAD HTML */
function load(file) {
  return fs.readFileSync(
    path.join(__dirname, "views", file),
    "utf-8"
  );
}

/* HOME                  */
app.get("/", (req, res) => {

  const navbar = load("navbar.html");
  const content = load("index.html");
  const footer = load("footer.html");

  res.send(`
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>QueenFurni</title>

    <link rel="stylesheet" href="/style.css">

    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  </head>

  <body>
    ${navbar}
    ${content}
    ${footer}
  </body>
  </html>
  `);

});


/* KATALOG              */
app.get("/katalog", (req, res) => {

  const navbar = load("navbar.html");
  const content = load("katalog.html");
  const footer = load("footer.html");

  res.send(`
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Katalog | QueenFurni</title>

    <link rel="stylesheet" href="/style.css">

    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  </head>

  <body>
    ${navbar}
    ${content}
    ${footer}
  </body>
  </html>
  `);

});


/* KONTAK               */
app.get("/kontak", (req, res) => {

  const navbar = load("navbar.html");
  const content = load("kontak.html");
  const footer = load("footer.html");

  res.send(`
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Kontak | QueenFurni</title>

    <link rel="stylesheet" href="/style.css">

    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  </head>

  <body>
    ${navbar}
    ${content}
    ${footer}
  </body>
  </html>
  `);

});


/* ADD TO CART          */
app.get("/add-to-cart", (req, res) => {

  const product = req.query.product;

  if (product) {
    cart.push(product);
  }

  res.redirect("/katalog");

});


/* HALAMAN KERANJANG    */
app.get("/keranjang", (req, res) => {

  const navbar = load("navbar.html");
  const footer = load("footer.html");

  const items = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-info">
        <i class="fa-solid fa-box"></i>
        <span>${item}</span>
      </div>

      <a class="remove-btn" href="/remove-item/${index}">
        <i class="fa-solid fa-trash"></i>
      </a>
    </div>
  `).join("");

  res.send(`
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Keranjang | QueenFurni</title>

    <link rel="stylesheet" href="/style.css">

    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  </head>

  <body>

    ${navbar}

    <section class="cart-page">

      <h1>Keranjang Belanja</h1>

      <div class="cart-list">

        ${cart.length ? items : "<p>Keranjang masih kosong 🛒</p>"}

      </div>

      <div class="cart-action">
        <a href="/katalog" class="btn-shop">Lanjut Belanja</a>
        <a href="/clear-cart" class="btn-clear">Kosongkan</a>
      </div>

    </section>

    ${footer}

  </body>
  </html>
  `);

});


/* HAPUS ITEM           */
app.get("/remove-item/:index", (req, res) => {

  const index = req.params.index;

  cart.splice(index, 1);

  res.redirect("/keranjang");

});


/* CLEAR CART           */
app.get("/clear-cart", (req, res) => {

  cart = [];

  res.redirect("/keranjang");

});

/* SERVER START         */
app.listen(PORT, () => {
  console.log(`jalan di http://localhost:${PORT}`);
});