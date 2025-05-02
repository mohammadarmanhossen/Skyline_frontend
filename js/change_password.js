
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

    fetch(`http://127.0.0.1:8000/client/change_password/${user_id}/`, {
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


// const user_id = localStorage.getItem("user_id");

// const getValue = (id) => document.getElementById(id);

// const handlePasswordChange = () => {


//   const old_password = getValue("old_password").value;
//   const new_password = getValue("new_password").value;
//   const new_password2 = getValue("new_password2").value;

//   const changedata = {
//     old_password: old_password,
//     new_password: new_password,
//   };
//   console.log(changedata);

//   if (!old_password || !new_password || !new_password2) {
//     Swal.fire("⚠️ Warning", "Please fill out all fields!", "warning");
//     return;
//   }

//   if (old_password === new_password) {
//     Swal.fire("❌ Error", "Old password cannot be the same as the new password!", "error");
//     return;
//   }

//   if (new_password !== new_password2) {
//     Swal.fire("❌ Error", "New passwords do not match!", "error");
//     return;
//   }

//   fetch(`http://127.0.0.1:8000/client/change_password/${user_id}/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(changedata)
//   })
//   .then(response => {
//     if (!response.ok) {
//       return response.json().then(errorData => {
//         throw new Error(errorData.detail || "Password change failed!");
//       });
//     }
//     return response.json();
//   })
//   .then(data => {
//     Swal.fire("✅ Success", "Password changed successfully.", "success");

//     getValue("old_password").value = "";
//     getValue("new_password").value = "";
//     getValue("new_password2").value = "";
//   })
//   .catch(error => {
//     Swal.fire("❌ Error", error.message, "error");
//     console.error("Error:", error);
//   });
// };