

const tableBody = document.getElementById("bookedTableBody");

tableBody.innerHTML = `
  <tr>
    <td colspan="9">
      <div class="w-full h-[300px] flex items-center justify-center">
      <div class="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
    </td>
  </tr>
`;

fetch("https://skyline-backend.vercel.app/bookeds/")
  .then((response) => response.json())
  .then((data) => {
    data.sort((a, b) => b.id - a.id);
    tableBody.innerHTML = ""; 

    data.forEach((item) => {
      const row = document.createElement("tr");
      row.classList.add("hover:bg-gray-100", "transition", "duration-200");

      let actions = "";

      if (item.is_paid) {
        actions = `
          <td class="text-center py-2">
            <span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Complete</span>
          </td>
          <td class="text-center py-2">
            <a href="./booking_details.html?id=${item.id}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">Details</a>
          </td>
          <td class="text-center py-2">
            <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow">Disable</button>
          </td>
        `;
      } else {
        if (item.is_failed) {
          actions = `
            <td class="text-center py-2">
              <span class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Failed</span>
            </td>
            <td class="text-center py-2">
              <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow">Disable</button>
            </td>
            <td class="text-center py-2">
              <button data-id="${item.id}" class="delete-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow">Delete</button>
            </td>
          `;
        } else if (item.is_cencelled) {
          actions = `
            <td class="text-center py-2">
              <span class="bg-red-500 text-white px-4 py-2 rounded shadow">Cancelled</span>
            </td>
            <td class="text-center py-2">
              <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow">Disable</button>
            </td>
            <td class="text-center py-2">
              <button data-id="${item.id}" class="delete-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow">Delete</button>
            </td>
          `;
        } else {
          actions = `
            <td class="text-center py-2">
              <a href="./checkout.html?id=${item.id}" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow">Pay Now</a>
            </td>
            <td class="text-center py-2">
              <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow">Disable</button>
            </td>
            <td class="text-center py-2">
              <button data-id="${item.id}" class="delete-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow">Delete</button>
            </td>
          `;
        }
      }

      row.innerHTML = `
        <td class="border px-4 py-2 text-center">${item.id}</td>
        <td class="border px-4 py-2 text-center">${item.hotel}</td>
        <td class="border px-4 py-2 text-center">${item.room}</td>
        <td class="border px-4 py-2 text-center">${item.in_date}</td>
        <td class="border px-4 py-2 text-center">${item.out_date}</td>
        <td class="border px-4 py-2 text-center font-semibold text-gray-800">${item.total_amount} Tk</td>
        ${actions}
      `;

      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-red-500 py-6">Failed to load bookings. Please try again later.</td>
      </tr>
    `;
  });


document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const bookedId = event.target.getAttribute("data-id");

    fetch(`https://skyline-backend.vercel.app/bookeds/${bookedId}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          event.target.closest("tr").remove();
        } else {
          alert("Failed to delete booking.");
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Something went wrong.");
      });
  }
});



const hotel_delete = () => {
  const deleteButtons = document.querySelectorAll(".bg-red-500");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const row = event.target.closest("tr");
      const id = row.cells[0].innerText;

      fetch(`https://skyline-backend.vercel.app/bookeds/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            row.remove();
          } else {
            console.error("Error deleting item:", response.statusText);
          }
        })
        .catch((error) => console.error("Error deleting item:", error));
    });
  });
};
