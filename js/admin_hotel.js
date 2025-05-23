const adminHotel = () => {
  fetch("https://skyline-backend.vercel.app/hotels/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const hotelBody = document.getElementById("hotel-body");
      hotelBody.innerHTML = "";

      data.forEach((hotel) => {
        const row = document.createElement("tr");
        row.classList.add();

        row.innerHTML = `
                <td class="">${hotel.id}</td>
                <td class="">${hotel.hotel_name}</td>
                <td class="">${hotel.description}</td>
                <td class="">${hotel.address}</td>
                <td class="">${hotel.district_name}</td>
                <td class="">${hotel.price_per_night}</td>
                <td class=""><img src="${hotel.image_url}" alt="${hotel.name}" class="w-16 h-16 object-cover"></td>
                <td class="">${hotel.available_room}</td>
                <td class="">
                    <button class="bg-red-500 p-1 font-semibold rounded-md text-gray-800 delete-button" data-id="${hotel.id}">Delete</button>
                </td>
            `;

        hotelBody.appendChild(row);
      });

      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const hotelId = button.getAttribute("data-id");
          deleteHotel(hotelId);
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function deleteHotel(hotelId) {
  fetch(`https://skyline-backend.vercel.app/hotels/${hotelId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        adminHotel();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while deleting the hotel.");
    });
}

adminHotel();




document.getElementById("hotelForm").addEventListener("submit", (e) => {
    e.preventDefault(); 
  
    const hotelName = document.getElementById("hotel_name").value;
    const description = document.getElementById("description").value;
    const address = document.getElementById("address").value;
    const district = document.getElementById("district").value;
    const price = document.getElementById("price").value;
    const room = document.getElementById("room").value;
    const image = document.getElementById("image").value;
  
    const data = {
      hotel_name: hotelName,
      description: description,
      address: address,
      district_names: parseFloat(district),
      price_per_night: parseFloat(price),
      available_room: parseInt(room),
      image_url: image,
    };
  
    console.log(data);
  
    fetch("https://skyline-backend.vercel.app/hotels/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add hotel");
        }
        return res.json();
      })
      .then((responseData) => {
        alert("Hotel added successfully!");
        document.getElementById("hotelForm").reset();
      })
      .catch((error) => {
        alert("Error: " + error.message);
        console.error(error);
      });
  });
  