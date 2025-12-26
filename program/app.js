"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true })); 


let macItems = [
  { id: 1, name: "ビッグマック", price: 480, category: "ビーフ" , calorie: 525},
  { id: 2, name: "てりやきマック", price: 400, category: "ポーク", calorie: 477 },
  { id: 3, name: "フィレオフィッシュ", price: 400, category: "シーフード", calorie:338 },
  { id: 4, name:"えびフィレオ" , price:430 , category :　"シーフード", calorie:401},
  { id:5 , name :"マックチキン", price:190 , category:"チキン"　, calorie :383}
];

let sukiyaItems = [
  { id: 1, name: "牛丼(並)", price: 400, category: "丼", calorie: 733 },
  { id: 2, name: "とろ〜り3種のチーズ牛丼", price: 580, category: "丼", calorie: 911 },
  { id: 3, name: "牛カレー", price: 650, category: "カレー", calorie: 885 },
  { id:4,name:"高菜明太マヨ牛丼",price : 660 ,category :"丼",calorie:815},
  { id: 5,name:"牛丼ライト", price:580, category:"サラダ",calorie:425}
];

let skylarkItems = [
  { id: 1, name: "ガスト", price: 1000, category: "ファミリーレストラン" },
  { id: 2, name: "バーミヤン", price: 1100, category: "中華料理" },
  { id: 3, name: "ジョナサン", price: 1200, category: "洋食" },
  { id: 4, name: "から好し", price: 900, category: "からあげ"},
  { id: 5, name: "しゃぶ葉", price: 2000, category: "しゃぶしゃぶ"}
];


app.get("/mac", (req, res) => {
  res.render('mac', {data: macItems} );
});

app.get("/sukiya", (req, res) => {
  res.render('sukiya', {data: sukiyaItems} ); 
});

app.get("/skylark", (req, res) => {
  res.render('skylark', {data: skylarkItems} );
});



app.get("/mac/create", (req, res) => {
  res.redirect('/public/mac_new.html');
});

app.get("/sukiya/create", (req, res) => {
  res.redirect('/public/sukiya_new.html');
});

app.get("/skylark/create", (req, res) => {
  res.redirect('/public/skylark_new.html');
});


app.get("/mac/:number", (req, res) => {
  const number = req.params.number;
  const detail = macItems[ number ];
  res.render('mac_detail', {id: number, data: detail} );
});

app.get("/sukiya/:number", (req, res) => {
  const number = req.params.number;
  const detail = sukiyaItems[ number ];
  res.render('sukiya_detail', {id: number, data: detail} );
});

app.get("/skylark/:number", (req, res) => {
  const number = req.params.number;
  const detail = skylarkItems[ number ];
  res.render('skylark_detail', {id: number, data: detail} );
});

app.get("/mac/delete/:number", (req, res) => {
  macItems.splice( req.params.number, 1 );
  res.redirect('/mac' );
});

app.get("/sukiya/delete/:number", (req, res) => {
  sukiyaItems.splice( req.params.number, 1 );
 
  res.redirect('/sukiya' );
});

app.get("/skylark/delete/:number", (req, res) => {
  skylarkItems.splice( req.params.number, 1 );
  res.redirect('/skylark' );
});

app.post("/mac", (req, res) => {
  const id = macItems.length + 1;
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const calorie = req.body.calorie　;

  macItems.push( { id: id, name: name, price: price, category: category, calorie:calorie } );

  console.log( macItems );
  res.render('mac', {data: macItems} );
});

app.post("/sukiya", (req, res) => {
  const id = sukiyaItems.length + 1;
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const calorie = req.body.calorie; 
  
  sukiyaItems.push( { id: id, name: name, price: price, category: category, calorie:calorie } );
  console.log( sukiyaItems );
  
  res.render('sukiya', {data: sukiyaItems} );
});

app.post("/skylark", (req, res) => {
  const id = skylarkItems.length + 1;
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;

  
  skylarkItems.push( { id: id, name: name, price: price, category: category } );
  console.log( skylarkItems );
  res.render('skylark', {data: skylarkItems} );
});


app.get("/mac/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = macItems[ number ];
  res.render('mac_edit', {id: number, data: detail} );
});

app.get("/sukiya/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = sukiyaItems[ number ];
  res.render('sukiya_edit', {id: number, data: detail} );
});

app.get("/skylark/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = skylarkItems[ number ];
  res.render('skylark_edit', {id: number, data: detail} );
});


app.post("/mac/update/:number", (req, res) => {
  macItems[req.params.number].name = req.body.name;
  macItems[req.params.number].price = req.body.price;
  macItems[req.params.number].category = req.body.category;
  macItems[req.params.number].calorie = req.body.calorie;
  
  console.log( macItems );
  res.redirect('/mac' );
});

app.post("/sukiya/update/:number", (req, res) => {
  sukiyaItems[req.params.number].name = req.body.name;
  sukiyaItems[req.params.number].price = req.body.price;
  sukiyaItems[req.params.number].category = req.body.category;
  sukiyaItems[req.params.number].calorie = req.body.calorie;
  
  console.log( sukiyaItems );
  res.redirect('/sukiya' );
});


app.post("/skylark/update/:number", (req, res) => {
  skylarkItems[req.params.number].name = req.body.name;
  skylarkItems[req.params.number].price = req.body.price;
  skylarkItems[req.params.number].category = req.body.category;
  
  console.log( skylarkItems );
  res.redirect('/skylark' );
});

app.listen(8080, () => console.log("Server running on port 8080"));

