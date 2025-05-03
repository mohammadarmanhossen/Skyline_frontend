
    document.getElementById("contactForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        try {
            const response = await fetch("https://skyline-backend-krnt.onrender.com/client/contact/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    subject: subject,
                    message: message
                })
            });

            if (response.ok) {
                swal.fire("Success", "Your booking is confirmed!", "success");
                document.getElementById("contactForm").reset();
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                swal.fire("Error", "Failed to send message. Please try again.", "error");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    });
