const adminContact= () => {
    fetch('https://skyline-backend-krnt.onrender.com/client/contact/', {
        method: 'GET',  
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Contact Data:', data);

        const contactBody = document.getElementById('contact-body');
        contactBody.innerHTML = ''; 
        
        data.forEach(contact => {
            const row = document.createElement('tr');
            row.classList.add('border-b');

            row.innerHTML = `
                <td class="p-2">${contact.id}</td>
                <td class="p-2">${contact.subject}</td>
                <td class="p-2">${contact.message}</td>
                <td class="p-2">
                    <button class="bg-red-500 p-1 border-1 rounded-md delete-button" data-id="${contact.id}">Delete</button>
                </td>
            `;
            
            contactBody.appendChild(row); 
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const contactId = event.target.getAttribute('data-id');

                fetch(`https://skyline-backend-krnt.onrender.com/client/contact/${contactId}/`, {
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
                        alert('Failed to delete contact.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error deleting contact.');
                });
                
            });
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

adminContact();
