     
  const bookingForm = document.getElementById("bookingForm");

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      hotel_name: document.getElementById("hotel_name").value,
      room: document.getElementById("room").value,
      in_date: document.getElementById("in_date").value,
      out_date: document.getElementById("out_date").value,
      total_amount: document.getElementById("total_amount").value,
    };

    fetch("http://127.0.0.1:8000/bookeds/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          alert("Booking successful!");
          console.log(data);
          bookingForm.reset();
        } else {
          alert("Booking failed!");
          console.error(data);
        }
      })
    
  });

  // Load hotels using arrow function
  const loadHotels = () => {
    fetch("http://127.0.0.1:8000/hotels/")
      .then((res) => res.json())
      .then((hotels) => {
        const select = document.getElementById("hotel_name");
        hotels.forEach((hotel) => {
          const option = document.createElement("option");
          option.value = hotel.id;
          option.textContent = hotel.hotel_name;
          select.appendChild(option);
        });
      })
      .catch((err) => console.error("Hotel load error:", err));
  };

  loadHotels();

     