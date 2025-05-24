
const handleLogin = (event) => {
  event.preventDefault();

  const username = getValue("username").value;
  const password = getValue("password").value;

 
  if (username && password) {
    const data = {
      username: username,
      password: password
    };

    fetch("https://skyline-backend.vercel.app/client/admin/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("admin_id", data.admin_id);

        Swal.fire({
          title: 'Success!',
          text: 'Admin logged in successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.href = "admin_dashbord.html"; 
        });
      } 


      else {
        const data = {
          username: username,
          password: password
        };

        fetch("https://skyline-backend.vercel.app/client/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
          if (data.token && data.user_id) {
      
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);

            Swal.fire({
              title: 'Success!',
              text: 'Your Account has been logged in successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              window.location.href = "index.html";
            });
          } else {
  
            Swal.fire({
              title: 'Error!',
              text: 'Invalid credentials.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        })
        .catch(error => {
          Swal.fire({
            title: 'Error!',
            text: 'There was a problem with the login request.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error("Error during user login:", error);
        });
      }
    })
    .catch(error => {
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem with the login request.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error("Error during admin login:", error);
    });
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Please enter both username and password.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};



const handleLogout = (event) => {
  event.preventDefault();

  console.log("Logging out...");
  const token = localStorage.getItem("token");
  console.log(token);
  fetch("https://skyline-backend.vercel.app/client/logout/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Logout successful", data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      Swal.fire({
        title: "Success!",
        text: "Your account has been successfully logged out.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "login.html";
      });
    });
};

const adminLogout = (event) => {
  event.preventDefault();

  console.log("Logging out...");
  const token = localStorage.getItem("token");
  console.log(token);
  fetch("https://skyline-backend.vercel.app/client/admin/logout/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Logout successful", data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      Swal.fire({
        title: "Success!",
        text: "Your account has been successfully logged out.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "login.html";
      });
    });
};

const getValue = (id) => {
  const value = document.getElementById(id);
  return value;
};










