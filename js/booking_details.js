const showBookingDetails = () => {
    const bookedId = new URLSearchParams(window.location.search).get('id'); 
    const token = localStorage.getItem('token'); 
    const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
    };

    fetch(`https://skyline-backend.vercel.app/bookeds/${bookedId}/`, { headers })
        .then(bookedRes => bookedRes.json())
        .then(booked => {
        
            document.getElementById("bookedHotel").innerText = `${booked.hotel}`;
            document.getElementById("bookedRoom").innerText=`${booked.room}`
            document.getElementById("totalAmount").innerText = `${booked.total_amount} Tk`;

            return fetch(`https://skyline-backend.vercel.app/order/${bookedId}`, { headers });
        })

        .then(userRes => userRes.json())
        .then(order => {
            document.getElementById("userName").innerText = `${order.name}`;
            document.getElementById("userEmail").innerText = `${order.email}`;
            document.getElementById("userAddress").innerText = `${order.address}`;
            document.getElementById("userZip").innerText = `${order.zip_code}`;
        })
        .catch(err => {
            console.error("Error loading booking details:", err);
        });
};


showBookingDetails();
