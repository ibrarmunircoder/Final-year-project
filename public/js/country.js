const city = document.querySelector('.city');
const dataList = document.querySelector('.cities');
city.addEventListener('keyup', async () => {
    if(city.value.length > 1) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(city.value) + `.json?access_token=pk.eyJ1IjoiaWJyYXJtdW5pciIsImEiOiJja2RpdTJmeHEwODZtMzByb2ZoMzVtb2l6In0.E7TSToWRcCKALGH_V9uRZQ&types=place`;
        const response = await fetch(url);
        response.json()
            .then(data => {
                console.log(data);
                const searchFilter = data.features.slice(0,2);
                searchFilter.forEach(search => {
                    dataList.innerHTML += `<option value="${search.text}">`;
                });
            })
            .catch(err => console.log(err));
    }
});




