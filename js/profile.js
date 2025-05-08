
// const userProfile = () => {
//   const user_id = localStorage.getItem("user_id");
//   console.log("Logged-in User ID:", user_id);
 
//   fetch("https://skyline-backend-krnt.onrender.com/client/users/")
//       .then((res) => res.json())
//       .then((data) => {
//           console.log(data);
//           const currentUser = data.find((item) => item.id === parseInt(user_id));
//           const parent = document.getElementById("user_profile");

//           const div = document.createElement("div");
//           div.classList.add("user-all");
//           div.innerHTML = `
//           <div class="w-full max-w-md mx-auto bg-white rounded-xl  overflow-hidden">
//               <div class="p-6 text-center">
                
//                    <img src="/image/arman.jpg" class=" border-black rounded-full mx-auto" alt="Profile Picture" style="width: 100px; height: 100px;">
//                   <div class="mt-4 text-gray-700 space-y-2">
//                       <h5 class="font-semibold">👤 Username: ${currentUser.username}</h5>
//                       <h5>🧾 First Name: ${currentUser.first_name}</h5>
//                       <h5>🧾 Last Name: ${currentUser.last_name}</h5>
//                       <p>📧 ${currentUser.email}</p>
//                   </div>
//                   <a href="./change_password.html" class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
//                       ✏️ Edit Profile
//                   </a>
//               </div>
//           </div>
//           `;

//           parent.appendChild(div);
//       });
// };

// userProfile();









    
// const userProfile = () => {
//   const user_id = localStorage.getItem("user_id");
//   console.log("Logged-in User ID:", user_id);

//   fetch("https://skyline-backend-krnt.onrender.com/client/users/")
//       .then((res) => res.json())
//       .then((data) => {
//           console.log(data);
//           const currentUser = data.find((item) => item.id === parseInt(user_id));
//           const parent = document.getElementById("user_profile");

//           const div = document.createElement("div");
//           div.classList.add("user-all");
//           div.innerHTML = `
        
// <div class="full-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6 w-full">
//           <div class="bg-white rounded-2xl shadow-xl  md:w-2/3 lg:w-1/2 xl:w-1/3 p-8">
//             <div class="flex flex-col md:flex-row items-center md:items-start">
//               <img src="/image/arman.jpg" alt="Profile Picture" class="w-32 h-32 rounded-full border-4 border-white shadow-md">
//               <div class="md:ml-6 mt-4 md:mt-0 text-center md:text-left p-10">  

//                 <p class="text-xl font-bold text-gray-800 pt-5">Username: ${currentUser.username}</p>
//                 <p class="text-xl font-bold text-gray-800 pt-5">First Name: ${currentUser.first_name}</p>
//                 <p class="text-xl font-bold text-gray-800 pt-5">Last Name: ${currentUser.last_name}</p>
//                 <p class="text-xl font-bold text-gray-800 pt-5">Email: ${currentUser.email}</p>

//                 <div class="mt-6 pt-5">
//                   <a href="./change_password.html" class="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition text-lg">✏️ Edit Profile</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//           `;

//           parent.appendChild(div);
//       });
// };

// userProfile();




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
     <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6 w-full">
    <div class="bg-white rounded-2xl shadow-xl w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-6">
        <!-- Profile header with avatar and name -->
        <div class="flex flex-col items-center gap-6">
            <!-- Avatar -->
            <img src="/image/man_3.jpg" alt="Profile Picture" class="w-32 h-32 border-4 border-indigo-600 shadow-lg rounded-full transform transition-transform hover:scale-105 duration-300">

            <div class="text-center space-y-4">
                <p class="text-xl  text-gray-800">Username : ${currentUser.username}</p>
                <p class="text-md text-gray-700">Full Name : ${currentUser.first_name} ${currentUser.last_name}</p>
                <p class="text-md text-gray-600">Email : ${currentUser.email}</p>
                <div class="mt-4">
                    <a href="./change_password.html" class="bg-gray-400  text-black px-6 py-3 rounded-lg shadow-md  transition-all duration-300 text-lg transform hover:scale-105">✏️ Edit Profile</a>
                </div>
            </div>
        </div>

        <!-- Bio Section -->
        <div class="mt-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
            <p class="text-md text-gray-700">This is a short bio or description about the user, explaining their background, skills, or interests.</p>
        </div>

        <!-- Stats Section (Repositories, Followers, Following) -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg shadow-md text-center">
                <p class="text-lg font-semibold text-gray-800">Repositories</p>
                <p class="text-2xl text-gray-900">25</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg shadow-md text-center">
                <p class="text-lg font-semibold text-gray-800">Followers</p>
                <p class="text-2xl text-gray-900">200</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg shadow-md text-center">
                <p class="text-lg font-semibold text-gray-800">Following</p>
                <p class="text-2xl text-gray-900">150</p>
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
  