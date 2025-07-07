
document.getElementById("menu-btn").addEventListener("click", function () {
    let menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
});

const ctx = document.getElementById('salesChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue ($)',
            data: [1200, 1900, 3000, 2500, 3200, 2700],
            backgroundColor: [
                'red',  
                'green', 
                'blue',  
                'yellow',  
                'orange', 
                'gray'  
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', 
                'rgba(54, 162, 235, 1)', 
                'rgba(255, 206, 86, 1)', 
                'rgba(75, 192, 192, 1)', 
                'rgba(153, 102, 255, 1)', 
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth:0,
            borderRadius:2,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return '৳' + value;
                    }
                }
            }
        }
    }
});





const animateCount = (element, target, duration = 1000) => {
  let start = 0;
  const stepTime = Math.max(Math.floor(duration / target), 20);
  const step = () => {
    start += 1;
    element.textContent = start;
    if (start < target) {
      setTimeout(step, stepTime);
    } else {
      element.textContent = target;
    }
  };
  step();
};

const countUser = () => {
  fetch('https://skyline-backend.vercel.app/client/users/')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const count = Array.isArray(data) ? data.length : 0;
      animateCount(document.getElementById('total-users'), count);
    })
    .catch(() => {
      document.getElementById('total-users').textContent = 'Error';
    });
};

const countHotel = () => {
  fetch('https://skyline-backend.vercel.app/hotels/')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const count = Array.isArray(data) ? data.length : 0;
      animateCount(document.getElementById('total-hotels'), count);
    })
    .catch(() => {
      document.getElementById('total-hotels').textContent = 'Error';
    });
};

const countBooked = () => {
  fetch('https://skyline-backend.vercel.app/bookeds/')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const count = Array.isArray(data) ? data.length : 0;
      animateCount(document.getElementById('total-bookeds'), count);
    })
    .catch(() => {
      document.getElementById('total-bookeds').textContent = 'Error';
    });
};

const countDistrict= () => {
  fetch('https://skyline-backend.vercel.app/district/')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const count = Array.isArray(data) ? data.length : 0;
      animateCount(document.getElementById('total-districts'), count);
    })
    .catch(() => {
      document.getElementById('total-districts').textContent = 'Error';
    });
};

countUser();
countHotel();
countBooked();
countDistrict();
