



const adminReview = () => {
    const reviewBody = document.getElementById('review-body');

    reviewBody.innerHTML = `
        <tr>
            <td colspan="5">
                <div class="flex justify-center items-center h-[300px] w-full">
                    <div class="text-gray-700 mr-4 text-lg font-semibold">Loading Reviews...</div>
                    <div class="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </td>
        </tr>
    `;

    fetch('https://skyline-backend.vercel.app/reviews/', {
        method: 'GET',  
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        data.sort((a, b) => b.id - a.id);
        console.log('Review Data:', data);

        reviewBody.innerHTML = '';  

        data.forEach(review => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${review.id}</td>
                <td>${review.rating} ⭐</td>
                <td>${review.body}</td>
                <td>${review.created}</td>
                <td class="p-2">
                    <button class="bg-red-500 p-1 font-semibold rounded-md text-gray-800 delete-button" data-id="${review.id}">Delete</button>
                </td>
            `;
            
            reviewBody.appendChild(row); 
        });

        // ✅ Delete Button Event
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
        reviewBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-red-500 py-4">Failed to load reviews.</td>
            </tr>
        `;
    });
};

adminReview();
