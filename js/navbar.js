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
      <a href="/profile.html"
          class="flex items-center gap-2 px-4 py-3 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9.969 9.969 0 0112 15c2.21 0 4.254.719 5.879 1.922M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Profile
     </a>

    <form id="logout" onsubmit="handleLogout(event)">
      <button type="submit"
          class="w-full flex items-center gap-2 px-4 py-3 text-gray-700 font-semibold hover:bg-red-50 hover:text-red-600 transition-all duration-200">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
         </svg>
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
