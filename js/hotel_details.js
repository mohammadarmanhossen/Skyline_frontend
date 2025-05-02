




const params = new URLSearchParams(window.location.search);
const hotelId = params.get("id");

hotelId
  ? fetch(`http://127.0.0.1:8000/hotels/${hotelId}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Hotel not found");
        return res.json();
      })
      .then((hotel) => {
        document.getElementById("hotel-info").innerHTML = `
        <div class="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
          <div class="w-full h-96">
            <img src="${hotel.image_url}" alt="${hotel.hotel_name}" class="w-full h-64 object-cover rounded-lg">
          </div>

          <h2 class="text-2xl font-bold text-gray-800">${hotel.hotel_name}</h2>
          <p><span class="font-bold">Location:</span> ${hotel.address}</p>
          <p><span class="font-bold">District:</span> ${hotel.district_name}</p>
          <p><span class="font-bold">Available Rooms:</span> ${hotel.available_room}</p>
          <p><span class="font-bold">Price/Night:</span> ${hotel.price_per_night} BDT</p>
          <p><span class="font-bold">Description:</span> ${hotel.description}</p>

          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <div class="text-end">
              <button id="book-now-btn" class="bg-gray-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200">
                Book Now
              </button>
            </div>
          </div>
        </div>`;

        document.getElementById("book-now-btn").addEventListener("click", () => {
          const user_id = localStorage.getItem("user_id");

          if (!user_id) {
            Swal.fire("Login required", "Please login to book a hotel.", "warning");
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
              out_date: outDate
          };

          console.log(bookingData);

          fetch("http://127.0.0.1:8000/bookeds/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
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
        document.getElementById("hotel-info").innerHTML = `<p>${err.message}</p>`;
      })
  : (document.getElementById("hotel-info").innerHTML =
      "<p>Hotel ID not found in URL.</p>");










const reviewForm = document.getElementById("reviewForm");

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    rating: document.getElementById("rating").value,
    body: document.getElementById("body").value,
    created: new Date().toISOString(),
  };

  console.log("Review Data:", data);

  fetch("http://127.0.0.1:8000/reviews/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
    .then((result) => {
      alert("Review submitted successfully!");
      console.log("Server Response:", result);
      reviewForm.reset();
    });
});
