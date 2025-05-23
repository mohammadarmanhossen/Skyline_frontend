
const userProfile = () => {
  const user_id = localStorage.getItem("user_id");
  console.log("Logged-in User ID:", user_id);

  fetch("https://skyline-backend.vercel.app/client/users/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const currentUser = data.find((item) => item.id === parseInt(user_id));
      const parent = document.getElementById("user_profile");

      const div = document.createElement("div");
      div.classList.add("user-all");
      div.innerHTML = `



      <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
  <div class="bg-white w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden">


    <div class="bg-gray-400 h-40 relative">
      <div class="absolute left-1/2 transform -translate-x-1/2 top-20">
        <img src="/image/man_3.jpg" alt="Profile Picture" class="w-32 h-32 rounded-full border-4 border-white shadow-lg">
      </div>
    </div>


    <div class="pt-24 pb-10 px-6 md:px-10 text-center">
      <h2 class="text-3xl font-bold text-gray-800" id="userFullName">${currentUser.first_name}${currentUser.last_name}</h2>
      <p class=" text-gray-500" id="userEmail">${currentUser.email}</p>

      <div class="mt-2 text-gray-600 text-sm" id="userAddress">
        📍 Dhaka, Bangladesh
      </div>

   
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <p class="text-xl font-bold text-gray-600">10</p>
          <p class="text-sm text-gray-500">Total Bookings</p>
        </div>
        <div>
          <p class="text-xl font-bold text-gray-600">5</p>
          <p class="text-sm text-gray-500">Upcoming Trips</p>
        </div>
        <div>
          <p class="text-xl font-bold text-gary-600">৳50,500</p>
          <p class="text-sm text-gray-500">Total Spent</p>
        </div>
      </div>

 
      <div class="mt-8 flex flex-col md:flex-row justify-center gap-4">
        <a href="/booked_hotel.html"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full shadow transition text-sm font-medium">
         Booking History
        </a>
        <a href="/Change_password.html"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full shadow transition text-sm font-medium">
          Edit Profile
        </a>
        <a href="/contact.html"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full shadow transition text-sm font-medium">
          Contact Me
        </a>
      </div>
    </div>
  </div>
</div>

        `;

      parent.innerHTML = "";
      parent.appendChild(div);
    })
    .catch((error) => {
      console.error("Failed to fetch user:", error);
    });
};

userProfile();
