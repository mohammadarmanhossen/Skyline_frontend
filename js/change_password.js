
  document.getElementById("passwordChangeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      Swal.fire("Error", "User ID not found. Please login again.", "error");
      return;
    }

    const oldPassword = document.getElementById("old_password").value;
    const newPassword = document.getElementById("new_password").value;
    const confirmPassword = document.getElementById("new_password2").value;

    const passwordChangeData = {
      old_password: oldPassword,
      new_password: newPassword

    }
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "New passwords do not match!", "error");
      return;
    }

    fetch(`https://skyline-backend.vercel.app/client/change_password/${user_id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(passwordChangeData)
    })
    .then((res) => {
      if (!res.ok) throw new Error("Password change failed");
      return res.json();
    })
    .then((data) => {
      Swal.fire("Success", "Your password has been changed!", "success");
      document.getElementById("passwordChangeForm").reset();
      window.location.href = "login.html"; 
    })  
    .catch((err) => {
      console.error(err);
      Swal.fire("Error", "Failed to change password", "error");
    });
  });

