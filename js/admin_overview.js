
// document.getElementById("menu-btn").addEventListener("click", function () {
//     let menu = document.getElementById("mobile-menu");
//     menu.classList.toggle("hidden");
// });

// const ctx = document.getElementById('salesChart').getContext('2d');
// new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//         datasets: [{
//             label: 'Revenue ($)',
//             data: [1200, 1900, 3000, 2500, 3200, 2700],
//             backgroundColor: 'rgba(34, 197, 94, 0.7)',
//             borderColor: 'rgba(34, 197, 94, 1)',
//             borderWidth: 1,
//             borderRadius: 8,
//         }]
//     },
//     options: {
//         responsive: true,
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 ticks: {
//                     callback: function (value) {
//                         return '৳' + value;
//                     }
//                 }
//             }
//         }
//     }
// });




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
                'red',   // Jan
                'green',   // Feb
                'blue',   // Mar
                'yellow',   // Apr
                'orange',  // May
                'gray'    // Jun
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', 
                'rgba(54, 162, 235, 1)', 
                'rgba(255, 206, 86, 1)', 
                'rgba(75, 192, 192, 1)', 
                'rgba(153, 102, 255, 1)', 
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            borderRadius: 8,
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
