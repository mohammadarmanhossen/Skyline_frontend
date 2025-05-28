const personalInfo = (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  event.preventDefault();

  const user_id = localStorage.getItem("user_id");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const zip = document.getElementById("zip").value;

  const data = {
    user: user_id,
    name: name,
    email: email,
    address: address,
    zip_code: zip,
  };

  console.log("personalInfo", data);

  fetch(`https://skyline-backend.vercel.app/order/${id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Order Data:", data);
      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "Your order has been placed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "checkout.html";
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: "Your order has been placed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
};

const showBookedHotel = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  fetch(`https://skyline-backend.vercel.app/bookeds/${id}/`)
    .then((response) => response.json())
    .then((data) => {
      const bookedHotel = document.getElementById("bookedHotel");
      const totalAmount = document.getElementById("totalAmount");

      bookedHotel.innerText = `Hotel : ${data.hotel}, Room: ${data.room}`;
      totalAmount.innerText = `Total Amount : ${data.total_amount} Tk`;
    })
    .catch((error) => {
      console.error("Error fetching booked hotel:", error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  showBookedHotel();

  const payButton = document.getElementById("payButton");

  if (payButton) {
    payButton.addEventListener("click", () => {
      const user_id = localStorage.getItem("user_id");
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const amountText = document.getElementById("totalAmount").innerText;
      const amount = amountText.replace(/[^\d.]/g, "");

      const urlParams = new URLSearchParams(window.location.search);
      const bookedId = urlParams.get("id");
      const data = {
        user: user_id,
        name: name,
        email: email,
        total_amount: amount,
        bookedId: bookedId,
      };
      console.log(data);

      fetch("https://skyline-backend.vercel.app/payment/create_payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.payment_url) {
            window.location.href = data.payment_url;
          } else {
            Swal.fire("Oops!", "Payment session creation failed.", "error");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire(
            "Error!",
            "There was an error with the payment process.",
            "error"
          );
        });
    });
  }
});
