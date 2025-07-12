
document.getElementById("AddhotelForm").addEventListener("submit", (e) => {
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
           Swal.fire({
              title: 'Success!',
              text: 'Hotel has been added in successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
        document.getElementById("hotelForm").reset();
      })
      .catch((error) => {
        console.error(error);
      });
  });
  