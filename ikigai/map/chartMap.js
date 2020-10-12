mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0dWtvIiwiYSI6ImJiYzcyYjgwYTNhNjY3ZTk5YzI0ZDBkOGNmZGQ1ODg5In0.Gw63swu4fG2bH0DPZWz65A';
var map = new mapboxgl.Map({
container: 'chartMap',
style: 'mapbox://styles/artuko/ckecldvzx2bzs1aqlzlzgor6n',
center: [30.321, 60.009],
zoom: 11
});

map.addControl(new mapboxgl.FullscreenControl());