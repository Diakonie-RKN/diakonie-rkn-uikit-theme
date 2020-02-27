/** Maps **/

u(document).on('DOMContentLoaded', function() {
    if (u('#map').length !== 0) {
        mapboxgl.accessToken = 'pk.eyJ1Ijoiamt1ZXN0ZXJzIiwiYSI6ImNpZzUwaDI2ajNpZGh0bGt4cXE5ZWIxbTkifQ.UwgJqpQ8Qg_-wkZnOj0thA';

        // Init map
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            scrollZoom: false,
            center: mapCenter,
            zoom: mapZoom
        });

        var nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-left');
        map.addControl(new mapboxgl.FullscreenControl());

        // Add markers from Geo JSON
        mapGeoJson.features.forEach(function (marker) {
            var img = document.createElement('img');
            img.width = marker.properties.iconSize[0];
            img.height = marker.properties.iconSize[1];
            img.alt = marker.properties.message;
            img.src = mapMarkerIcon;

            var el = document.createElement('div');
            el.className = 'marker';
            el.style.cursor = 'pointer';
            el.appendChild(img);

            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({offset: 25}).setHTML('<h5><a href="' + marker.properties.url + '">' + marker.properties.title + '</a></h5>'))
                .addTo(map);
        });


        // Resize maps after UIkit has initialized all components (e.g. equal heights)
        function resizeMapWhenReady() {
            if (UIkit._initialized) {
                map.resize();
            } else {
                setTimeout(resizeMapWhenReady, 100);
            }
        }

        resizeMapWhenReady();

        // Resize map in search result tab
        UIkit.util.on('#searchResultSwitcher > li', 'shown', function () {
            map.resize();
        });
    }
});

/** // Maps **/
