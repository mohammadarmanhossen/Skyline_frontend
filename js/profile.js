
const userProfile = () => {
  const user_id = localStorage.getItem("user_id");
  console.log("Logged-in User ID:", user_id);

  fetch("https://skyline-backend-krnt.onrender.com/client/users/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const currentUser = data.find((item) => item.id === parseInt(user_id));
      const parent = document.getElementById("user_profile");

      const div = document.createElement("div");
      div.classList.add("user-all");
      div.innerHTML = `





<div class="min-h-screen bg-gradient-to-br from-gray-100 flex items-center justify-center p-6">
  <div class="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8">
    
    <!-- Avatar & User Info -->
    <div class="flex flex-col items-center gap-6">
      
      <!-- Avatar -->
      <img src="/image/man_3.jpg" alt="Profile Picture"
        class="w-32 h-32 border-4 border-gray-600 shadow-md rounded-full transition-transform duration-300 hover:scale-105">

      <!-- User Info -->
      <div class="text-center space-y-2">
        <p class="text-xl text-gray-00">Usermane : ${currentUser.username}</p>
        <p class="text-lg text-gray-700">Full Name: ${currentUser.first_name} ${currentUser.last_name}</p>
        <p class="text-lg text-gray-600">Email: ${currentUser.email}</p>
      </div>

      <!-- Edit Button -->
      <div class="mt-4">
        <a href="./change_password.html"
          class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-sm transition">
          Edit Profile
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
