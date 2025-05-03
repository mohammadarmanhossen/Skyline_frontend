
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
                alert("Message sent successfully!");
                document.getElementById("contactForm").reset();
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert("Failed to send message!");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    });
