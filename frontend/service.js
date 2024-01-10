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
      iconUrl: 'images/pointer.png',
      iconSize: [50, 45],
      iconAnchor: [12, 41],
      popupAnchor: [13, -34],
      shadowSize: [41, 41],
    });

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }




const droparea = document.getElementById("drop-area");
const inputfile = document.getElementById("input-file");
const imageview = document.getElementById("img-view");

inputfile.addEventListener("change", uploadImage);

function uploadImage(){
  let imgLink=URL.createObjectURL(inputfile.files[0]);
  imageview.style.backgroundImage = `url(${imgLink})`;
  imageview.textContent="";
  imageview.style.border=0;
  imageview.style.border = '3px solid #000000';
}

droparea.addEventListener("dragover", function(e){
  e.preventDefault();
});

droparea.addEventListener("drop", function(e){
  e.preventDefault();
  inputfile.files=e.dataTransfer.files;
  uploadImage();
});






























    document.querySelectorAll('.truck-button').forEach(button => {
      button.addEventListener('click', e => {
  
          e.preventDefault();
          
          let box = button.querySelector('.box'),
              truck = button.querySelector('.truck');
          
          if(!button.classList.contains('done')) {
              
              if(!button.classList.contains('animation')) {
  
                  button.classList.add('animation');
  
                  gsap.to(button, {
                      '--box-s': 1,
                      '--box-o': 1,
                      duration: .3,
                      delay: .5
                  });
  
                  gsap.to(box, {
                      x: 0,
                      duration: .4,
                      delay: .7
                  });
  
                  gsap.to(button, {
                      '--hx': -5,
                      '--bx': 50,
                      duration: .18,
                      delay: .92
                  });
  
                  gsap.to(box, {
                      y: 0,
                      duration: .1,
                      delay: 1.15
                  });
  
                  gsap.set(button, {
                      '--truck-y': 0,
                      '--truck-y-n': -26
                  });
  
                  gsap.to(button, {
                      '--truck-y': 0,
                      '--truck-y-n': -25,
                      duration: .2,
                      delay: 1.25,
                      onComplete() {
                          gsap.timeline({
                              onComplete() {
                                  button.classList.add('done');
                              }
                          }).to(truck, {
                              x: 0,
                              duration: .4
                          }).to(truck, {
                              x: 40,
                              duration: 1
                          }).to(truck, {
                              x: 20,
                              duration: .6
                          }).to(truck, {
                              x: 400,
                              duration: .4
                          });
                          gsap.to(button, {
                              '--progress': 1,
                              duration: 2.4,
                              ease: "power2.in"
                          });
                      }
                  });
                  
              }
              
          } else {
              button.classList.remove('animation', 'done');
              gsap.set(truck, {
                  x: 4
              });
              gsap.set(button, {
                  '--progress': 0,
                  '--hx': 0,
                  '--bx': 0,
                  '--box-s': .5,
                  '--box-o': 0,
                  '--truck-y': 0,
                  '--truck-y-n': -26
              });
              gsap.set(box, {
                  x: -24,
                  y: -6
              });
          }
  
      });
  });






document.getElementById('pickupButton').addEventListener('click', function () {
  const fileInput = document.getElementById('input-file');
  const quantity = document.getElementById('quantity').value;
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value;

  // Ensure a file is selected
  if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      const fileName = selectedFile.name;
      const imageUrl = URL.createObjectURL(selectedFile);

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td style="max-width: 100px; overflow: hidden;">
              <img src="${imageUrl}" alt="${fileName}" style="max-width: 100%; height: auto; border: solid; border-width: 1px">
          </td>
          <td style="max-width: 40px; overflow: hidden; text-overflow: ellipsis;">${quantity}Kg</td>
          <td style="max-width: 40px; overflow: hidden; text-overflow: ellipsis;">${description}</td>
          <td>${date}</td>
      `;

      const tableBody = document.getElementById('table-body');
      tableBody.appendChild(newRow);
  }
});













