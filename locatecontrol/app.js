/* Initial Map */
var map = L.map('map').setView([-7.541598, 110.446100],10); //lat, long, zoom
      
/* Tile Basemap */
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //attribution akan muncul di pojok kanan bawah
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://unsorry.net" target="_blank">unsorry@2020</a>'
});
basemap.addTo(map);

// Locate control
L.control.locate({
  position: 'topleft',
  showCompass: true,
  showPopup: false,
}).addTo(map);

function onLocationFound(e) {
  var puncakmerapi = [-7.541598, 110.446100];

  /* Menghitung jarak antar 2 koordinat dengan satuan km
      Untuk satuan meter tidak perlu dibagi 1000 */
  var distance = (L.latLng(e.latlng).distanceTo(puncakmerapi) / 1000).toFixed(2);

  var radius = (e.accuracy / 2).toFixed(1);
  
  // Membuat marker sesuai koordinat lokasi
  locationMarker = L.marker(e.latlng);
  locationMarker.addTo(map);
  locationMarker.bindPopup("<p class='text-center'>Anda berada <b>" + distance + " km</b><br>dari puncak Merapi.<br>Akurasi GPS " + radius + " meter.</p>");
  locationMarker.openPopup();

  // Membuat garis antara koordinat lokasi dengan puncak merapi
  var latlongline = [e.latlng,puncakmerapi];
  var polyline = L.polyline(latlongline, {
    color: 'red',
    weight: 5,
    opacity: 0.7,
  });
  polyline.addTo(map);
}

map.on('locationfound', onLocationFound);