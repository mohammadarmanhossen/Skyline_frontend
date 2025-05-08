


const user_id = localStorage.getItem("user_id")
const navbar = () => {
  const navbar = document.getElementById("navbarElement");
  if (user_id) {
      navbar.innerHTML = `
       <a href="/booked_hotel.html" class="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-300 text-black px-4 py-2 rounded-md shadow">
              <span class="font-bold">Order</span>
          </a>
          <div class="relative inline-block text-left">
              <button class="dropdownButton flex items-center gap-2 bg-gray-100 text-black px-4 py-2 font-bold hover:bg-gray-300 rounded-md shadow"
                  <span>Account</span>
              </button>
              <div class="dropdownMenu hidden absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <a href="/profile.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold hover:text-blue-600 transition">Profile</a>
        
                  <form onsubmit="handleLogout(event)">
                      <button type="submit" class="w-full text-left px-4 py-2 text-gray-700 font-bold hover:bg-gray-100 hover:text-red-600 transition">Logout</button>
                  </form>
              </div>
          </div>


      `;
  } else {
      navbar.innerHTML = `
          <a href="login.html" class="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md shadow">
              <img src="image/logout.svg" alt="Login Icon" class="w-6 h-6">
              <span class="font-bold">Login</span>
          </a>
          <a href="register.html" class="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md shadow">
              <img src="image/logout.svg" alt="Login Icon" class="w-6 h-6">
              <span class="font-bold">Register</span>
          </a>
      `;
  }
};



const mobilenavbar = () => {
  const mobilenav = document.getElementById("mobileNavbarElement");
  if (user_id) {
      mobilenav.innerHTML = `
          <a href="/booked_hotel.html" class="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md shadow">
      
              <span class="font-bold">Order</span>
          </a>
          <div class="relative inline-block text-left">
              <button class="dropdownButton flex items-center gap-2 bg-gray-200 text-black px-4 py-2 font-bold hover:bg-gray-300 rounded-md shadow"
                  <span>Account</span>
              </button>
              <div class="dropdownMenu hidden absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <a href="/profile.html" class=" text-center block px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold hover:text-blue-600 transition">Profile</a>
        
                  <form onsubmit="handleLogout(event)">
                      <button type="submit" class=" w-full text-center px-4 py-2 text-gray-700 font-bold hover:bg-gray-100 hover:text-red-600 transition">Logout</button>
                  </form>
              </div>
          </div>

        

      `;
  } else {
      mobilenav.innerHTML = `
          <a href="login.html" class="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md shadow">
              <img src="image/logout.svg" alt="Login Icon" class="w-6 h-6">
              <span class="font-bold">Login</span>
          </a>
          <a href="register.html" class="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md shadow">
               <img src="image/logout.svg" alt="Login Icon" class="w-6 h-6">
              <span class="font-bold">Register</span>
          </a>
      `;
  }
};

navbar();
mobilenavbar();



document.addEventListener('click', function (e) {
  if (e.target.closest('.dropdownButton')) {
      const dropdown = e.target.closest('.relative').querySelector('.dropdownMenu');
      dropdown.classList.toggle('hidden');
  }
});


const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});




