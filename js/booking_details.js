const showBookingDetails = () => {
    const bookedId = new URLSearchParams(window.location.search).get('id'); 
    const token = localStorage.getItem('token'); 
    const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
    };

    fetch(`http://127.0.0.1:8000/bookeds/${bookedId}/`, { headers })
        .then(bookedRes => bookedRes.json())
        .then(booked => {
        
            document.getElementById("bookedHotel").innerText = `Hotel: ${booked.hotel_name}, Room: ${booked.room}`;
            document.getElementById("totalAmount").innerText = `Total Amount: $${booked.total_amount}`;

            return fetch(`http://127.0.0.1:8000/order/${bookedId}`, { headers });
        })

        .then(userRes => userRes.json())
        .then(order => {
            document.getElementById("userName").innerText = `Name: ${order.name}`;
            document.getElementById("userEmail").innerText = `Email: ${order.email}`;
            document.getElementById("userAddress").innerText = `Address: ${order.address}`;
            document.getElementById("userZip").innerText = `Zip: ${order.zip_code}`;
        })
        .catch(err => {
            console.error("Error loading booking details:", err);
        });
};


showBookingDetails();
