const adminOrder= () => {
    fetch('https://skyline-backend-krnt.onrender.com/order/', {
        method: 'GET',  
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order Data:', data);

        const orderBody = document.getElementById('order-body');
        orderBody.innerHTML = ''; 
        
        data.forEach(order => {
            const row = document.createElement('tr');
            row.classList.add();

            row.innerHTML = `
                <td class="">${order.id}</td>
                <td class="">${order.name}</td>
                <td class="">${order.email}</td>
                <td class="">${order.address}</td>
                <td class="">${order.zip_code}</td>
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

                fetch(`https://skyline-backend-krnt.onrender.com/order/${orderId}/`, {
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
    });
};

adminOrder();
