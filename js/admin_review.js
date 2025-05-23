const adminReview = () => {
    fetch('https://skyline-backend.vercel.app/reviews/', {
        method: 'GET',  
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Review Data:', data);

        const reviewBody = document.getElementById('review-body');
        reviewBody.innerHTML = ''; 
        
        data.forEach(review => {
            const row = document.createElement('tr');
            row.classList.add();

            row.innerHTML = `
                <td class="">${review.id}</td>

                <td class="">${review.rating} ⭐</td>
                <td class="">${review.body}</td>
                <td class="">${review.created}</td>
                <td class="p-2">
                    <button class="bg-red-500 p-1 font-semibold rounded-md text-gray-800 delete-button" data-id="${review.id}">Delete</button>
                </td>
            `;
            
            reviewBody.appendChild(row); 
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const reviewId = event.target.getAttribute('data-id');

 
                fetch(`https://skyline-backend.vercel.app/reviews/${reviewId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    if (response.ok) {
                        const row = event.target.closest('tr');
                        row.remove();
                    } else {
                        alert('Failed to delete review.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error deleting review.');
                });
            });
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

adminReview();
