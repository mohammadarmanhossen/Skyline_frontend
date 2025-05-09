const params = new URLSearchParams(window.location.search);
const hotelId = params.get("id");

hotelId
  ? fetch(`https://skyline-backend-krnt.onrender.com/hotels/${hotelId}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Hotel not found");
        return res.json();
      })
      .then((hotel) => {
        document.getElementById("hotel-info").innerHTML = `




<div class="w-1/2 h-full">
  <img src="${hotel.image_url}" alt="${hotel.hotel_name}"
    class="w-full h-full object-cover rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
</div>

  <div class="p-4 space-y-4">
    <h2 class="text-3xl font-bold text-gray-800">${hotel.hotel_name}</h2>

    <p class="text-gray-700"><span class="font-semibold">📍 Location:</span> ${hotel.address}</p>
    <p class="text-gray-700"><span class="font-semibold">🏙️ District:</span> ${hotel.district_name}</p>
    <p class="text-gray-700"><span class="font-semibold">🛏️ Available Rooms:</span> ${hotel.available_room}</p>
    <p class="text-gray-700"><span class="font-semibold">💳 Price/Night:</span> ${hotel.price_per_night} BDT</p>
    <p class="text-gray-700"><span class="font-semibold">📝 Description:</span> ${hotel.description}</p>

    <!-- Book Now Button -->
    <div class="text-end mt-4">
      <button id="book-now-btn" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300">
        📅 Book Now
      </button>
    </div>
  </div>
  
        `;

        document
          .getElementById("book-now-btn")
          .addEventListener("click", () => {
            const user_id = localStorage.getItem("user_id");

            if (!user_id) {
              Swal.fire(
                "Login required",
                "Please login to book a hotel.",
                "warning"
              );
              window.location.href = "/login.html";
              return;
            }
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            const inDate = today.toISOString().split("T")[0];
            const outDate = tomorrow.toISOString().split("T")[0];

            const bookingData = {
              user: user_id,
              hotel_name: hotelId,
              room: hotel.available_room,
              total_amount: hotel.price_per_night,
              in_date: inDate,
              out_date: outDate,
            };

            console.log(bookingData);

            fetch("https://skyline-backend-krnt.onrender.com/bookeds/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bookingData),
            })
              .then((res) => {
                if (!res.ok) throw new Error("Booking failed");
                return res.json();
              })
              .then((data) => { 
                Swal.fire("Success", "Your booking is confirmed!", "success");
              })
              .catch((err) => {
                Swal.fire("Error", "Failed to book the hotel", "error");
                console.error(err);
              });
          });
      })
      .catch((err) => {
        document.getElementById(
          "hotel-info"
        ).innerHTML = `<p>${err.message}</p>`;
      })
  : (document.getElementById("hotel-info").innerHTML =
      "<p>Hotel ID not found in URL.</p>");









const review = (event) => {
  event.preventDefault();

  const rating= document.getElementById("rating").value.trim();
  const body= document.getElementById("body").value.trim();
  const userId = localStorage.getItem("user_id"); 

  if (!userId) {
      Swal.fire("Warning", "User not logged in!", "warning");
      window.location.href = "login.html"; 
      return;
  }

  const data = {
      rating: rating,
      body: body, 
      created: new Date().toISOString(),
  };

  console.log(data);

  fetch("https://skyline-backend-krnt.onrender.com/reviews/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (response.ok) {
          Swal.fire("Success", "Your message has been sent!", "success");
    
      } else {
          return response.json().then(errorData => {
              console.error("Error:", errorData);
              Swal.fire("Error", "Failed to send message. Please try again.", "error");
          });
      }
  })
 
};
