
    const contact = (event) => {
        event.preventDefault();
    
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const userId = localStorage.getItem("user_id"); 
    
        if (!userId) {
            Swal.fire("Warning", "User not logged in!", "warning");
            window.location.href = "login.html"; 
            return;
        }
    
        const data = {
            subject: subject,
            message: message, 
        };
    
        console.log(data);
    
        fetch("https://skyline-backend.vercel.app/client/contact/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                Swal.fire("Success", "Your message has been sent!", "success");
                document.getElementById("contactForm").reset();
            } else {
                return response.json().then(errorData => {
                    console.error("Error:", errorData);
                    Swal.fire("Error", "Failed to send message. Please try again.", "error");
                });
            }
        })
        .catch(error => {
            console.error("Network Error:", error);
            Swal.fire("Error", "Something went wrong. Please check your connection.", "error");
        });
    };
    