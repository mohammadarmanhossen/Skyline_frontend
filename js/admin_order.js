

const adminOrder = () => {
    const orderBody = document.getElementById('order-body');

    orderBody.innerHTML = `
        <tr>
            <td colspan="6">
                <div class="flex justify-center items-center h-[300px] w-full">
                    <div class="text-gray-700 mr-4 text-lg font-semibold">Loading Orders...</div>
                    <div class="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </td>
        </tr>
    `;

    fetch('https://skyline-backend.vercel.app/order/', {
        method: 'GET',  
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        data.sort((a, b) => b.id - a.id);
        console.log('Order Data:', data);

        orderBody.innerHTML = ''; 

        data.forEach(order => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.name}</td>
                <td>${order.email}</td>
                <td>${order.address}</td>
                <td>${order.zip_code}</td>
                <td class="p-2">
                    <button class="bg-red-500 p-1 font-semibold rounded-md text-gray-800 delete-button" data-id="${order.id}">Delete</button>
                </td>
            `;
            
            orderBody.appendChild(row); 
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const orderId = event.target.getAttribute('data-id');

                fetch(`https://skyline-backend.vercel.app/order/${orderId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    console.log('Delete response:', response);
                    if (response.ok) {
                        const row = event.target.closest('tr');
                        row.remove();
                    } else {
                        alert('Failed to delete order.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error deleting order.');
                });
            });
        });

    })
    .catch((error) => {
        console.error('Error:', error);
        orderBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-red-500 py-4">Failed to load orders.</td>
            </tr>
        `;
    });
};

adminOrder();
