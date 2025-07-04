

const adminContact = () => {
  const contactBody = document.getElementById("contact-body");
  contactBody.innerHTML = `
     <tr>
    <td colspan="7">
       <div class="flex justify-center items-center h-[300px] w-full">
      <div class="text-gray-700 mr-4 text-lg font-semibold">Loading Contacts...</div>
        <div class="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
        
      </div>
    </td>
  </tr>
  `;
  fetch("https://skyline-backend.vercel.app/client/contact/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => b.id - a.id);
      console.log("Contact Data:", data);
      contactBody.innerHTML = "";
      data.forEach((contact) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${contact.id}</td>
          <td>${contact.subject}</td>
          <td>${contact.message}</td>
          <td class="p-2">
            <button class="bg-red-500 p-1 font-semibold rounded-md text-gray-800 delete-button" data-id="${contact.id}">Delete</button>
          </td>
        `;

        contactBody.appendChild(row);
      });
      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const contactId = event.target.getAttribute("data-id");

          fetch(`https://skyline-backend.vercel.app/client/contact/${contactId}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                event.target.closest("tr").remove();
              } else {
                alert("Failed to delete contact.");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error deleting contact.");
            });
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      contactBody.innerHTML = `<tr><td colspan="7" class="text-center text-red-500">Failed to load contact data.</td></tr>`;
    });
};

adminContact();
