const showSpinner = () => {
  const spinnerContainer = document.getElementById("spinner-container");
  spinnerContainer.innerHTML = `
    <div class="w-full h-[200px] flex items-center justify-center">
      <div class="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  `;
};

const hideSpinner = () => {
  const spinnerContainer = document.getElementById("spinner-container");
  spinnerContainer.innerHTML = "";
};

const handleRegistration = (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const first_name = document.getElementById("firstname").value;
  const last_name = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;

  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };
  console.log(info);

  if (password !== confirm_password) {
    document.getElementById("error").innerText =
      "Password and confirm password do not match!";
    return;
  }

  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    document.getElementById("error").innerText =
      "Password must be at least 8 characters long, include a letter, a number, and a special character!";
    return;
  }

   showSpinner(); 
  fetch("https://skyline-backend.vercel.app/client/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      hideSpinner();
      console.log(data);
      Swal.fire({
        title: "Email Confirmed!",
        text: "Your email has been verified successfully. Please log in to continue.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "login.html";
      });
    })
    .catch((error) => console.error("Error:", error));
  hideSpinner();
};
