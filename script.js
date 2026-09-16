const products=[
{id:1,name:"Nevera No Frost",category:"neveras",description:"Nevera moderna de 300 litros con sistema No Frost.",price:1899000,oldPrice:2199000,image:"imagenes/nevera.jpg",discount:14},
{id:2,name:"Lavadora Automática",category:"lavadoras",description:"Lavadora de 18 kg con diferentes programas de lavado.",price:1699000,oldPrice:1999000,image:"imagenes/lavadora.jpg",discount:15},
{id:3,name:"Licuadora",category:"pequenos",description:"Licuadora práctica para preparar diferentes bebidas.",price:249900,oldPrice:299900,image:"imagenes/licuadora.jpg",discount:17},
{id:4,name:"Estufa de 4 Puestos",category:"cocina",description:"Estufa moderna de cuatro quemadores para tu cocina.",price:899900,oldPrice:1099900,image:"imagenes/estufa.jpg",discount:18},
{id:5,name:"Cafetera Automática",category:"pequenos",description:"Prepara café de forma rápida y sencilla.",price:449900,oldPrice:529900,image:"imagenes/cafetera.jpg",discount:15}
];

let cart=[];

const productsGrid=document.getElementById("products-grid");
const cartItems=document.getElementById("cart-items");
const cartCount=document.getElementById("cart-count");
const cartTotal=document.getElementById("cart-total");

function formatPrice(price){
return "$"+price.toLocaleString("es-CO");
}

function getCategoryName(category){
const names={
neveras:"Neveras",
lavadoras:"Lavadoras",
televisores:"Televisores",
cocina:"Cocina",
pequenos:"Pequeños"
};
return names[category]||category;
}

function renderProducts(list=products){
productsGrid.innerHTML="";

if(list.length===0){
productsGrid.innerHTML="<p>No se encontraron productos.</p>";
return;
}

list.forEach(product=>{
const card=document.createElement("article");
card.className="product";
card.innerHTML=`
<div class="product-image">
<span class="discount-label">-${product.discount}%</span>
<img src="${product.image}" alt="${product.name}">
</div>
<div class="product-info">
<span class="product-category">${getCategoryName(product.category)}</span>
<h3>${product.name}</h3>
<p>${product.description}</p>
<div class="price">
<strong>${formatPrice(product.price)}</strong>
<span class="old-price">${formatPrice(product.oldPrice)}</span>
</div>
<button class="btn add-cart" onclick="addToCart(${product.id})">🛒 Agregar al carrito</button>
</div>`;
productsGrid.appendChild(card);
});
}

function filterProducts(category,button){
document.querySelectorAll(".category").forEach(item=>item.classList.remove("active"));
button.classList.add("active");

if(category==="todos"){
renderProducts();
}else{
renderProducts(products.filter(product=>product.category===category));
}

document.getElementById("productos").scrollIntoView({behavior:"smooth"});
}

function searchProducts(){
const text=document.getElementById("search").value.toLowerCase();

const result=products.filter(product=>
product.name.toLowerCase().includes(text)||
product.description.toLowerCase().includes(text)||
product.category.toLowerCase().includes(text)
);

renderProducts(result);
}

function addToCart(id){
const product=products.find(product=>product.id===id);
const existing=cart.find(item=>item.id===id);

if(existing){
existing.quantity++;
}else{
cart.push({...product,quantity:1});
}

updateCart();
}

function removeFromCart(id){
cart=cart.filter(item=>item.id!==id);
updateCart();
}

function updateCart(){
cartItems.innerHTML="";

if(cart.length===0){
cartItems.innerHTML='<p class="empty-cart">Tu carrito está vacío.</p>';
}else{
cart.forEach(item=>{
const cartItem=document.createElement("div");
cartItem.className="cart-item";
cartItem.innerHTML=`
<div class="cart-item-icon"><img src="${item.image}" alt="${item.name}"></div>
<div>
<h4>${item.name}</h4>
<p>${item.quantity} x ${formatPrice(item.price)}</p>
</div>
<button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>`;
cartItems.appendChild(cartItem);
});
}

let quantity=0;
let total=0;

cart.forEach(item=>{
quantity+=item.quantity;
total+=item.price*item.quantity;
});

cartCount.textContent=quantity;
cartTotal.textContent=formatPrice(total);
}

function toggleCart(){
document.getElementById("cart").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}

function checkout(){
if(cart.length===0){
alert("Tu carrito está vacío.");
return;
}

let total=0;

cart.forEach(item=>{
total+=item.price*item.quantity;
});

alert("Compra realizada correctamente.\n\nTotal: "+formatPrice(total));
cart=[];
updateCart();
toggleCart();
}

document.getElementById("contact-form").addEventListener("submit",function(event){
event.preventDefault();
alert("Mensaje enviado correctamente.");
this.reset();
});

renderProducts();
updateCart();