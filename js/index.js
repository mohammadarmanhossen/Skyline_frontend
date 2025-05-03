const baseURL = 'https://skyline-backend-krnt.onrender.com/hotels/';
const userId = localStorage.getItem('user_id'); 
console.log("user_id :",userId);

const hotels = (districtId = 'all', searchQuery = '') => {
    const hotel = document.getElementById('hotels');
    if (!hotel) return;

    hotel.innerHTML = '<p class="text-center text-blue-500">Loading hotels...</p>';

    let fetchURL = baseURL;
    const params = [];

    if (districtId !== 'all') {
        params.push(`district=${encodeURIComponent(districtId)}`);
    }

    if (searchQuery.trim() !== '') {
        params.push(`search=${encodeURIComponent(searchQuery)}`);
    }

    if (params.length > 0) {
        fetchURL += '?' + params.join('&');
    }

    fetch(fetchURL)
        .then(res => res.json())
        .then(data => {
            displayHotels(Array.isArray(data) ? data : []);
        })
        .catch(error => {
            console.error('Error:', error);
            hotel.innerHTML = `<p class="text-center text-red-500">${error.message}</p>`;
        });
};

const displayHotels = (hotelsData) => {
    console.log(hotelsData);
    const container = document.getElementById('hotels');
    if (!container) return;


    if (hotelsData.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No hotels available.</p>';
        return;
    }

    container.innerHTML = hotelsData.map(hotel => `
        <div class="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden m-4">
            <img class="w-full h-56 object-cover" src="${hotel.image_url}" alt="${hotel.hotel_name}">
            <div class="px-6 py-4">
                <h5 class="text-2xl font-semibold text-gray-800 mb-1">${hotel.hotel_name}</h5>
                <p class="text-gray-500 text-sm mb-3">${hotel.description}</p>
                <p class="text-gray-500 text-sm mb-3">${hotel.available_room}</p>
                <p class="text-gray-500 text-sm mb-3">${hotel.address}</p>
                <div class="flex justify-between items-center mb-3">
                    <span class="text-lg font-bold text-green-400">${hotel.district_name}</span>
                    <span class="text-lg font-bold text-green-400">৳${hotel.price_per_night}</span>
                </div>
                <a href="./hotel_details.html?id=${hotel.id}" class="block rounded-lg">
                    <div class="flex justify-center items-center bg-amber-300 hover:bg-blue-700 rounded-lg p-2">
                        <span class="text-black font-semibold">View Details</span>
                    </div>
                </a>
            </div>
        </div>
    `).join('');
};

const loadDistricts = () => {
    fetch('https://skyline-backend-krnt.onrender.com/district/')    
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const select = document.getElementById('district-select');
            data.forEach(district => {
                const option = document.createElement('option');
                option.value = district.id;
                option.textContent = district.district_name;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching districts:', error);
        });
};

const handleSearch = () => {
    const districtId = document.getElementById('district-select').value;
    const searchQuery = document.getElementById('search').value.trim();   
    hotels(districtId, searchQuery);
};

loadDistricts();
hotels();

document.getElementById('search').addEventListener('input', handleSearch);
document.getElementById('district-select').addEventListener('change', handleSearch);





