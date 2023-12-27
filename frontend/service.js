var map;
    function goToLocator() {
        var pinCode = document.getElementById('pinCode').value;
        if (pinCode.length !== 6 || isNaN(pinCode)) {
            alert('Invalid PIN code. Please enter a valid 6-digit PIN.');
            return;
        }
        var geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${pinCode}`;

        fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            var latitude = parseFloat(data[0].lat);
            var longitude = parseFloat(data[0].lon);

            // Initialize the map if not already initialized
            if (!map) {
              map = L.map('map').setView([latitude, longitude], 12);

              // Add OpenStreetMap tile layer
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }).addTo(map);
            } else {
              map.setView([latitude, longitude], 12);
            }

            // Clear existing markers
            map.eachLayer(function (layer) {
              if (layer instanceof L.Marker) {
                map.removeLayer(layer);
              }
            });

            // Add 4 to 5 random markers labeled as "E-waste Redemption Center"
            for (var i = 0; i < getRandomInt(4, 6); i++) {
              var randomLat = latitude + (Math.random() - 0.5) / 10; // Small random deviation
              var randomLng = longitude + (Math.random() - 0.5) / 10; // Small random deviation

              var redMarker = L.marker([randomLat, randomLng], { icon: redMarkerIcon }).addTo(map);
              redMarker.bindPopup('E-waste Redemption Center').openPopup();
            }
          } else {
            alert('Could not find coordinates for the entered PIN code.');
          }
        })
        .catch(error => {
          console.error('Error fetching geocoding data:', error);
        });
        document.getElementById('locator-sec1').style.height='0px';
        document.getElementById('locator-sec1').style.width='0px';
        document.getElementById('imge').style.height='0px';
        document.getElementById('imge').style.width='0px';
        document.getElementById('locator-sec2').style.transform = 'translateX(-14%)';
        document.getElementById('map').style.transform = 'translateX(-0%)';
        document.getElementById('map').style.height = '300px';
        document.getElementById('map').style.width = '400px';
    }

    var redMarkerIcon = L.icon({
      iconUrl: 'pointer.png',
      iconSize: [50, 45],
      iconAnchor: [12, 41],
      popupAnchor: [13, -34],
      shadowSize: [41, 41],
    });

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }













document.getElementById('new-item-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const quantity = document.getElementById('quantity').value;
    const category = document.getElementById('category').value;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td style="max-width: 100px; overflow: hidden; text-overflow: ellipsis;">${name}</td>
        <td style="max-width: 100px; overflow: hidden; text-overflow: ellipsis;">${description}</td>
        <td>${date}</td>
        <td>${quantity}</td>
        <td>${category}</td>
    `;

    const tableBody = document.getElementById('table-body');
    tableBody.style.width = '100%';
    tableBody.appendChild(newRow);
});
