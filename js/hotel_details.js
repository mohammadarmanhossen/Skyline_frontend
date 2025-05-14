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


      <section class="bg-white py-16 px-4 md:px-12 lg:px-24">
       <div class="max-w-12xl mx-auto space-y-16">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-gray-50 shadow-lg">
      
      <!-- Hotel Image -->
      <div class="w-full h-64 md:h-full">
        <img src="${hotel.image_url}" alt="${hotel.hotel_name}"
          class="w-full h-full object-cover rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
      </div>

  
      <div class="p-4 space-y-4 flex flex-col justify-center">
        <h2 class="text-3xl font-bold text-gray-800">${hotel.hotel_name}</h2>
        <p class="text-gray-700"><span class="font-semibold">📍 Location:</span> ${hotel.address}</p>
        <p class="text-gray-700"><span class="font-semibold">🏙️ District:</span> ${hotel.district_name}</p>
        <p class="text-gray-700"><span class="font-semibold">🛏️ Available Rooms:</span> ${hotel.available_room}</p>
        <p class="text-gray-700"><span class="font-semibold">💳 Price/Night:</span> ${hotel.price_per_night} BDT</p>
        <p class="text-gray-700"><span class="font-semibold">📝 Description:</span> ${hotel.description}</p>

        <div class="text-end pt-4">
          <button id="book-now-btn"
            class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-black font-semibold px-6 py-2 rounded-lg shadow-lg transition duration-300">
            📅 Book Now
          </button>
        </div>
      </div>
    </div>


    <div class="space-y-12">
      <div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">🏨 Overview</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
          Hand-painted murals and oversized industrial windows. Open floor plans and modern appliances. Once a former
          manufacturing plant, <strong>The Heid</strong> was designed with high ceilings and concrete flooring. Each space includes a Roku and
          in-suite laundry, perfect for a weekend or a year-long stay. Start your day with a coffee on the rooftop. Or stroll
          through The Rail Park, a nature walk set between soaring skyscrapers. The Callowhill neighborhood is a fusion of
          art galleries, factories, and live music. Stay for a little or stay for a lot, The Heid has what you want.
        </p>
      </div>


      <div>
        <h3 class="text-3xl font-semibold text-gray-800 mb-4">🛎️ Services & Amenities</h3>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 list-disc list-inside">
          <li>High-speed Wifi</li>
          <li>Outdoor swimming pool</li>
          <li>Non-smoking room</li>
          <li>Fitness center</li>
          <li>On-site parking</li>
          <li>Housekeeping service</li>
          <li>Superb Breakfast</li>
          <li>Restaurant</li>
        </ul>
      </div>

      <div>
        <h3 class="text-3xl font-semibold text-gray-800 mb-4">🛏️ Room Features</h3>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 list-disc list-inside">
          <li>Beachfront</li>
          <li>Balcony</li>
          <li>Air Conditioner</li>
          <li>King Bedroom</li>
          <li>Safe Box</li>
          <li>Minibar</li>
          <li>40" Flat Screen HD TV</li>
          <li>Phones</li>
          <li>Cable/satellite</li>
          <li>In-room Refrigerator</li>
          <li>USB Outlets</li>
          <li>Complimentary</li>
        </ul>
      </div>

 
      <div>
        <h3 class="text-3xl font-semibold text-gray-800 mb-4">🚿 Bathroom</h3>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 list-disc list-inside">
          <li>Shower</li>
          <li>Hair Dryer</li>
          <li>Robes</li>
          <li>Slippers</li>
          <li>Towels</li>
          <li>Shampoo</li>
        </ul>
      </div>

    </div>
  </div>
</section>
  
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

  const rating = document.getElementById("rating").value.trim();
  const body = document.getElementById("body").value.trim();
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
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      Swal.fire("Success", "Your message has been sent!", "success");
    } else {
      return response.json().then((errorData) => {
        console.error("Error:", errorData);
        Swal.fire(
          "Error",
          "Failed to send message. Please try again.",
          "error"
        );
      });
    }
  });
};
