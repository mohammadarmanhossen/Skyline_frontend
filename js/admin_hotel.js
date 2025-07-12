
const adminHotel = () => {
  const hotelBody = document.getElementById("hotel-body");

  hotelBody.innerHTML = `
    <tr>
      <td colspan="9">
          <div class="flex justify-center items-center h-[300px] w-full">
   <div class="text-gray-700 mr-4 text-lg font-semibold">Loading Hotels...</div>
        <div class="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
        
      </div>
      </td>
    </tr>
  `;

  fetch("https://skyline-backend.vercel.app/hotels/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => b.id - a.id);
      hotelBody.innerHTML = ""; 

      data.forEach((hotel) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${hotel.id}</td>
          <td>${hotel.hotel_name}</td>
          <td>${hotel.description}</td>
          <td>${hotel.address}</td>
          <td>${hotel.district_name}</td>
          <td>${hotel.price_per_night}</td>
          <td><img src="${hotel.image_url}" alt="${hotel.hotel_name}" class="w-16 h-16 object-cover"></td>
          <td>${hotel.available_room}</td>
          <td>
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
      hotelBody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center text-red-500 py-4">Failed to load hotels.</td>
        </tr>
      `;
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
        location.reload();
      } else {
          Swal.fire({
              title: 'Success!',
              text: 'Hotel has been deleted in successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            location.reload();
            
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while deleting the hotel.");
    });
}


adminHotel();



