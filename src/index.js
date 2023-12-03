// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhe7ZR8F12T9qpGUDiVCe8RLuvnd3Mn0A",
  authDomain: "loginpage-11f65.firebaseapp.com",
  projectId: "loginpage-11f65",
  storageBucket: "loginpage-11f65.appspot.com",
  messagingSenderId: "273121827088",
  appId: "1:273121827088:web:47af001f6038ace2622d95",
  measurementId: "G-CP6C9G7S26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    showAuthBanner();

    console.log("logged in", user);
  } else {
    console.log("no user");
    $("#log-check").html("");
  }
});

$(".sign-in").on("click", () => {
  login();
});
$(".sign-out").on("click", () => {
  logout();
});

function login() {
  signInAnonymously(auth)
    .then(() => {
      console.log("signed In");
    })
    .catch((error) => {
      console.log("help");
    });
}

function logout() {
  signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log("help");
    });
}

// Update the URLs to use your new server
const productsUrl = "../dist/data/data.json";
// Function to fetch and display products
function displayProducts() {
  // Use jQuery's AJAX function to fetch the JSON data
  $.ajax({
    url: productsUrl, // Replace 'path/to/your/products.json' with the correct path to your JSON file
    type: "GET",
    dataType: "json",
    success: function (data) {
      // Access the "products" array in the JSON data
      var products = data.products;

      // Loop through each product in the array
      $.each(products, function (index, product) {
        // Append the coffee card to the output element
        $("#output").append(`
            <div class="coffee-card">
              <img src="${product.product_image}" alt="${product.product_name}">
              <h1>${product.product_name}</h1>
              <p>${product.product_price}</p>
              <button class="add-to-cart" data-product='${JSON.stringify(
                product
              )}'>Add to Cart</button>
            </div>
          `);
      });
    },
    error: function (error) {
      console.error("Error fetching JSON:", error);
    },
  });
}

function updateCartCounter() {
  var cartData = JSON.parse(localStorage.getItem("cart")) || [];
  var cartCounter = cartData.length;

  // Update the cart counter element
  $("#cart-counter").text(cartCounter);
}

// Function to add the product to the cart
function addToCart(product) {
  // Fetch the existing cart data from local storage (if any)
  var cartData = JSON.parse(localStorage.getItem("cart")) || [];

  // Add the new product to the cart
  cartData.push(product);

  // Save the updated cart data back to local storage
  localStorage.setItem("cart", JSON.stringify(cartData));

  // Update the cart counter
  updateCartCounter();

  console.log("Product added to cart successfully!");
}

// Click event handling for the 'add-to-cart' button
$(document).on("click", ".add-to-cart", function (event) {
  event.preventDefault();
  var productData = $(this).data("product");
  addToCart(productData);
});

// Function to display cart items on the cart page
function displayCartItems() {
  // Fetch the cart data from local storage
  var cartData = JSON.parse(localStorage.getItem("cart")) || [];

  // Get the element where cart items will be displayed
  var cartItemsElement = $("#cart-items");

  // Clear the existing content
  cartItemsElement.empty();

  // Check if the cart is empty
  if (cartData.length === 0) {
    cartItemsElement.append("<p>Your cart is empty.</p>");
  } else {
    // Loop through each item in the cart and display its details
    $.each(cartData, function (index, product) {
      cartItemsElement.append(`
            <div class="cart-item">
              <img src="${product.product_image}" alt="${product.product_name}">
              <h2>${product.product_name}</h2>
              <p>${product.product_price}</p>
            </div>
          `);
    });
  }
}

document.getElementById("account-icon").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "none";
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", function (event) {
  var modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Function to show the auth banner
function showAuthBanner() {
  var authBanner = document.getElementById("authBanner");
  authBanner.style.display = "block";

  // Set a timeout to hide the banner after a few seconds (adjust as needed)
  setTimeout(function () {
    authBanner.style.display = "none";
  }, 5000); // Hides the banner after 5 seconds (5000 milliseconds)
}

document.getElementById("closeBtn").addEventListener("click", function () {
  var authBanner = document.getElementById("authBanner");
  authBanner.style.display = "none";
});

// When the document is ready, display products and update the cart counter
$(document).ready(function () {
  displayProducts();
  updateCartCounter();
  displayCartItems();
});
