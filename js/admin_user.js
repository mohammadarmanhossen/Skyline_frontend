const adminUser = () => {
    const userBody = document.getElementById('user-body');

    userBody.innerHTML = `
        <tr>
            <td colspan="6">
                <div class="flex justify-center items-center h-[300px] w-full">
                    <div class="text-gray-700 mr-4 text-lg font-semibold">Loading Users...</div>
                    <div class="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </td>
        </tr>
    `;

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

        userBody.innerHTML = ''; 

        data.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
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
        userBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-red-500 py-4">Failed to load users.</td>
            </tr>
        `;
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
