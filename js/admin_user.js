
const adminUser = () => {
    fetch('https://skyline-backend.vercel.app/client/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        data.sort((a, b) => b.id - a.id);
        console.log('User Data:', data);

        const userBody = document.getElementById('user-body');
        userBody.innerHTML = '';

        data.forEach(user => {
            const row = document.createElement('tr');
            row.classList.add();

            row.innerHTML = `
                <td class="">${user.id}</td>
                <td class="">${user.username}</td>
                <td class="">${user.email}</td>
                <td class="">${user.first_name}</td>
                <td class="">${user.last_name}</td>
                <td class="p-2">
                    <button class="bg-red-500 p-1 font-semibold rounded-md text-gray-800 delete-button" data-user-id="${user.id}">Delete</button>
                </td>
            `;

            userBody.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const userId = button.getAttribute('data-user-id');
                deleteUser(userId);
            });
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

const deleteUser = (userId) => {
    fetch(`https://skyline-backend.vercel.app/account/user/${userId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (response.status === 204) {

            adminUser(); 
        } else {
            alert('Failed to delete user.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the user.');
    });
};

adminUser();
