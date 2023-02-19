
const ipAddress=document.getElementById('ip-adress');
const location=document.getElementById('location');
const timezone=document.getElementById('timezone');
const search=document.getElementById('search');
const mapLayer=document.getElementById('mapLayer');
const isp=document.getElementById('isp');
var ipInput=document.getElementById('ipValue');
async function generateMap(){
    var ipReceive=ipInput.value;
    const fechdata=await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_x2cTfG08ellMJacy17K2DgbXzvYzC&ipAddress=${ipReceive}`);
    const data=await fechdata.json();
    ipAddress.innerText=data.ip;
    var array =data.location.city.split(" ");
    let cityName="";
    array.length>=2 ? cityName=array[0].substring(0,1)+array[1].substring(0,1) : array[0].substring(0,2);
    location.innerText=data.location.region + "," + cityName + " " + data.location.postalCode;
    timezone.innerText="UTC"+data.location.timezone;
    isp.innerText=data.isp;
    mapLayer.innerHTML="";
    mapLayer.innerHTML=`<div id="map" ></div>`;
    mapping(data.location.lat,data.location.lng);
    
}
async function mapping(lat,lng){
    var map = L.map('map').setView([lat,lng], 17);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    

    var century21icon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [46, 56]
    });
    var marker = L.marker([lat,lng],{icon:century21icon}).addTo(map);
}
async function mapData(){
    const fechdata=await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_x2cTfG08ellMJacy17K2DgbXzvYzC&ipAddress=`);
    const data=await fechdata.json();
    ipAddress.innerText=data.ip;
    var array =data.location.city.split(" ");
    let cityName="";
    array.length>=2 ? cityName=array[0].substring(0,1)+array[1].substring(0,1) : array[0].substring(0,2);
    location.innerText=data.location.region + "," + cityName + " " + data.location.postalCode;
    timezone.innerText="UTC"+data.location.timezone;
    isp.innerText=data.isp;
    mapping(data.location.lat,data.location.lng); 
}
mapData();
search.addEventListener("click",generateMap);

