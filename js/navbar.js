const user_id = localStorage.getItem("user_id");
const navbar = () => {
  const navbar = document.getElementById("navbarElement");
  if (user_id) {
    navbar.innerHTML = `
<div class="flex items-center gap-4">
    <a href="/booked_hotel.html" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">Order</a>
  <div class="relative inline-block text-left">
    <button id="dropdownButton" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
      <span>Account</span>
    </button>

    <div id="dropdownMenu" class="hidden absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <a href="/profile.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold hover:text-blue-600 transition">
        Profile
      </a>
      <form id="logout" onsubmit="handleLogout(event)">
        <button type="submit" class="w-full text-left px-4 py-2 text-gray-700 font-bold hover:bg-gray-100 hover:text-red-600 transition">
          Logout
        </button>
      </form>
    </div>
  </div>
</div>

    `;
  } else {
    navbar.innerHTML = `

    <div class="hidden md:flex items-center gap-5"> 
        <a href="login.html" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">Login</a>
        <a href="register.html" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">Register</a>
    </div>
  `;
  }
};
navbar();




document
  .getElementById("dropdownButton")
  .addEventListener("click", function () {
    document.getElementById("dropdownMenu").classList.toggle("hidden");
  });



const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
