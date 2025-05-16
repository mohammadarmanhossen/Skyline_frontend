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
            console.log(data);
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

     const getShortDescription = (text, wordLimit = 6) => {
        const words = text.split(' ');
        return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
    };
       const getShortName = (text, wordLimit = 3) => {
        const words = text.split(' ');
        return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
    };

    if (hotelsData.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No hotels available.</p>';
        return;
    }

    container.innerHTML = hotelsData.map(hotel => `
        <div class="max-w-sm bg-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden m-4">
            <img class="w-full h-56 object-cover" src="${hotel.image_url}" alt="${hotel.hotel_name}">
            <div class="px-6 py-4">
                <h5 class="text-2xl font-semibold text-gray-700 mb-1">${getShortName(hotel.hotel_name)}</h5>
                <p class="text-gray-700 text-sm mb-3">${getShortDescription(hotel.description)}</p>
                <p class="text-gray-700 text-sm mb-3">Room : ${hotel.available_room}</p>
               <p class="text-gray-700 text-sm mb-3">District : ${hotel.district_name}</p>
              
               <p class="text-gray-700 text-sm mb-3">Location : ${hotel.address}</p>
                <a href="./hotel_details.html?id=${hotel.id}" class="block rounded-lg">
                    <div class="flex justify-between items-center bg-gray-200  transition-colors duration-200">
                     <span><span class="text-black font-seibold">৳${hotel.price_per_night}</span>/night</span>
                     <span class="text-amber-700 font-semibold">View Details</span>
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




  const carousel = document.getElementById('carousel');

  function scrollLeft() {
    carousel.scrollBy({ left: -300, behavior: 'smooth' });
  }

  function scrollRight() {
    carousel.scrollBy({ left: 300, behavior: 'smooth' });
  }


