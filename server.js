const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

function load(file) {
  return fs.readFileSync(path.join(__dirname, "views", file), "utf-8");
}

/*HOME*/
app.get("/", (req, res) => {
  const navbar = load("navbar.html");
  const content = load("index.html");
  const footer = load("footer.html");

  const html = `
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Furniture Shop</title>

    <!-- CSS NYA DIKONEKIN DI SINI -->
    <link rel="stylesheet" href="/style.css">

    <!-- ICON -->
  <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  
   <!--Font-->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>

    ${navbar}
    ${content}
    ${footer}

  </body>
  </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`jalan di http://localhost:${PORT}`);
});

/* HALAMAN KATALOG */
app.get("/katalog", (req, res) => {

  const navbar = load("navbar.html");
  const content = load("katalog.html");
  const footer = load("footer.html");

  const html = `
  <!DOCTYPE html>
  <html lang="id">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Katalog Furniture</title>

    <link rel="stylesheet" href="/style.css">

    <!-- ICON -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- FONT -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>

  <body>

    ${navbar}
    ${content}
    ${footer}

  </body>

  </html>
  `;

  res.send(html);

});


app.listen(PORT, () => {
  console.log(`jalan di http://localhost:${PORT}`);
});