const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

/* DATABASE SEMENTARA    */
let cart = [];

/* DATABASE PRODUCT */
const products = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "data", "products.json"),
    "utf-8"
  )
);

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
  let content = load("index.html");
  const homeProducts = products
  .slice(0, 6)
  .map(product => `

    <div class="card">

      <!-- ICON MATA -->
      <a href="/product/${product.slug}"
      class="home-view-btn">

        <i class="fa-solid fa-eye"></i>

      </a>

      <h3>${product.nama}</h3>

      <img
        src="${product.gambar}"
        alt="${product.nama}"
      >

      <p>
        ${product.deskripsi}
      </p>

    </div>

`).join("");
  const footer = load("footer.html");

  content = content.replace("{{HOME_PRODUCTS}}", homeProducts);

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
  let content = load("katalog.html");
  const footer = load("footer.html");

  const catalogProducts = products.map(product => `

    <div class="catalog-card"
      data-category="${product.kategori.toLowerCase().replace(/\s/g, "-")}">

      <div class="catalog-image">

        <img
          src="${product.gambar}"
          alt="${product.nama}"
        >

      </div>

      <!-- ICON MATA -->
      <a
        href="/product/${product.slug}"
        class="view-btn"
      >
        <i class="fa-solid fa-eye"></i>
      </a>

      <div class="catalog-content">

        <span class="catalog-category">
          ${product.kategori}
        </span>

        <h3>${product.nama}</h3>

        <p>
          ${product.deskripsi}
        </p>

        <div class="catalog-bottom">

          <h4>${product.harga}</h4>

          <a
            href="/add-to-cart?product=${product.nama}"
            class="cart-btn"
          >
            <i class="fa-solid fa-cart-plus"></i>
          </a>

        </div>

      </div>

    </div>

  `).join("");

  content = content.replace(
    "{{CATALOG_PRODUCTS}}",
    catalogProducts
  );

  res.send(`
  <!DOCTYPE html>
  <html lang="id">

  <head>
    <meta charset="UTF-8">

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    >

    <title>Katalog | QueenFurni</title>

    <link rel="stylesheet" href="/style.css">

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    >
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

  res.redirect("/keranjang");

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

        ${cart.length ? items : `
            <div class="empty-cart">

              <i class="fa-solid fa-cart-shopping"></i>

              <h2>Keranjang Masih Kosong Nihh</h2>

              <p>
               ✨ Yuk pilih furniture favorit kamu dulu ✨
              </p>

              <a href="/katalog" class="empty-btn">
                Belanja Sekarang
              </a>

            </div>
          `}
      </div>

      ${cart.length ? `
      <div class="cart-action">

        <a href="/katalog" class="btn-shop">
         Lanjut Belanja
         </a>

         <a href="/clear-cart" class="btn-clear">
           Kosongkan
        </a>

      </div>
      ` : ""}

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


/* DETAIL PRODUCT */
app.get("/product/:slug", (req, res) => {

  const navbar = load("navbar.html");
  const footer = load("footer.html");

  const product = products.find(
    p => p.slug === req.params.slug
  );

  if (!product) {
    return res.status(404).send("Product tidak ditemukan");
  }

  res.send(`

  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
      content="width=device-width, initial-scale=1.0">

    <title>${product.nama}</title>

    <link rel="stylesheet" href="/style.css">

    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  </head>

  <body>

    ${navbar}

    <section class="detail-product">

  <div class="detail-container">

    <!-- GAMBAR -->
    <div class="detail-image">

      <img
        src="${product.gambar}"
        alt="${product.nama}"
      >

    </div>

    <!-- CONTENT -->
    <div class="detail-content">

      <span class="detail-category">
        ${product.kategori}
      </span>

      <h1>${product.nama}</h1>

      <h2>${product.harga}</h2>

      <p class="detail-desc">
        ${product.deskripsi}
      </p>

      <!-- INFO -->
      <div class="detail-info">

        <div class="info-box">
          <i class="fa-solid fa-couch"></i>
          <span>Material Premium</span>
        </div>

        <div class="info-box">
          <i class="fa-solid fa-star"></i>
          <span>Best Seller</span>
        </div>

        <div class="info-box">
          <i class="fa-solid fa-truck"></i>
          <span>Gratis Ongkir</span>
        </div>

      </div>

      <!-- BUTTON -->
      <div class="detail-buttons">

        <a
          href="/add-to-cart?product=${product.nama}"
          class="buy-btn"
        >
          <i class="fa-solid fa-cart-plus"></i>
          Tambah Keranjang
        </a>

        <a href="/katalog" class="back-btn">
          <i class="fa-solid fa-arrow-left"></i>
          Kembali
        </a>

      </div>

    </div>

  </div>

</section>

    ${footer}

  </body>
  </html>

  `);

});

/* SERVER START         */
app.listen(PORT, () => {
  console.log(`jalan di http://localhost:${PORT}`);
});
