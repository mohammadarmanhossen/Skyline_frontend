
const userProfile = () => {
  const user_id = localStorage.getItem("user_id");
  console.log("Logged-in User ID:", user_id);

  fetch("http://127.0.0.1:8000/client/users/")
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          const currentUser = data.find((item) => item.id === parseInt(user_id));
          const parent = document.getElementById("user_profile");

          const div = document.createElement("div");
          div.classList.add("user-all");
          div.innerHTML = `
          <div class="w-full max-w-md mx-auto bg-white rounded-xl  overflow-hidden">
              <div class="p-6 text-center">
                
                   <img src="/image/arman.jpg" class=" border-black rounded-full mx-auto" alt="Profile Picture" style="width: 100px; height: 100px;">
                  <div class="mt-4 text-gray-700 space-y-2">
                      <h5 class="font-semibold">👤 Username: ${currentUser.username}</h5>
                      <h5>🧾 First Name: ${currentUser.first_name}</h5>
                      <h5>🧾 Last Name: ${currentUser.last_name}</h5>
                      <p>📧 ${currentUser.email}</p>
                  </div>
                  <a href="./change_password.html" class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                      ✏️ Edit Profile
                  </a>
              </div>
          </div>
          `;

          parent.appendChild(div);
      });
};

userProfile();
