const issCoordsAPI = 'http://api.open-notify.org/iss-now.json';
const spacePeople = 'http://api.open-notify.org/astros.json';
const aPotD = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'; 
const issLat = document.getElementById('iss-lat');
const issLon = document.getElementById('iss-lon');

//ISS location
function moveISS() {
  fetch(issCoordsAPI)
    .then(response => response.json())
    .then(data => {
      let lat = data.iss_position.latitude;
      let lon = data.iss_position.longitude;

      circle.setLatLng([lat, lon]);
      mymap.panTo([lat, lon], animate=true);

      issLat.innerHTML = `Lat: ${lat}`;
      issLon.innerHTML = `Lon: ${lon}`;
    })
    .catch(err => console.log('Request Failed', err));

  setTimeout(moveISS, 5000);
}

// Check public Access Token availability: https://account.mapbox.com/access-tokens/
let mymap = L.map('mapid').setView([51.505, -0.09], 2);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: '<a href="https://www.openstreetmap.org/copyright"></a><a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/outdoors-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZmxhdml1cm9zY2FpdmFuY2l1YyIsImEiOiJja2h4a2d3Y20wa2V4MnhtcDdqZ2lwZzRvIn0.UGL0qVLERsCAGF4bFa4diA'
}).addTo(mymap);

let circle = L.circle([51.508, -0.11], {
  color: 'rgb(11, 61, 145)',
  fillColor: 'rgb(11, 61, 145)',
  fillOpacity: 0.5,
  radius: 500000,
}).addTo(mymap);


// People in Space
const numberOfPeople = document.getElementById('number-in-space');

function getPeopleInSpace() {
  fetch(spacePeople)
    .then(response => response.json())
    .then(data => {
      numberOfPeople.innerHTML = data.number;
      listPeople(data.people);
    })
}

function createPersonElement(people) {
  const personElement = document.createElement('div');
  personElement.classList.add('person-element');
  
  const personName = document.createElement('div');
  personName.classList.add('person-name');
  personName.innerText = people.name;

  const personCraft = document.createElement('div');
  personCraft.classList.add('person-craft');
  personCraft.innerText = people.craft;

  personElement.appendChild(personName);
  personElement.appendChild(personCraft);

  return personElement;
}

function listPeople(people) {
  const currentPeopleInSpace = document.querySelector('.people-in-space');
  for (let i = 0; i < people.length; i++ ) {
    const peopleElement = createPersonElement(people[i]);
    currentPeopleInSpace.appendChild(peopleElement);
  }
}


// Astronomy Picture of the Day
function getPictureOfTheDay() {
  fetch(aPotD)
    .then(response => response.json())
    .then(data => {
      displayPictureElement(data);
    })
}

function displayPictureElement(data) {
  document.getElementById('picture-title').innerHTML = data.title;
  document.getElementById('picture-date').innerHTML = data.date;
  document.getElementById('astronomy-picture').src = data.url;
}


moveISS();
getPeopleInSpace();
getPictureOfTheDay();


