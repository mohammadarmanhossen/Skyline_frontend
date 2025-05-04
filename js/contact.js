

    document.getElementById("contactForm").addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("access_token");
        if (!token) {
            window.location.href = "/login.html";
            return;
        }
    
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
    
        try {
            const response = await fetch("https://skyline-backend-krnt.onrender.com/client/contact/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({
                    subject: subject,
                    message: message
                })
            });
    
            if (response.ok) {
                Swal.fire("Success", "Your message has been sent!", "success");
                document.getElementById("contactForm").reset();
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                Swal.fire("Error", "Failed to send message. Please try again.", "error");
            }
    
        } catch (error) {
            console.error("Error:", error);
            Swal.fire("Error", "Something went wrong!", "error");
        }
    });
    