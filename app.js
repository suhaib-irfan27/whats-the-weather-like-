const showCities = async () => {
    let inp = document.querySelector('#task-input');
    // let pg = document.querySelector('p');
    // pg.remove()
    let inpText = inp.value;
    inp.value = ''
    console.log(inpText)
    const ULL = document.querySelector('.list-group')
    const listOfCities = await getCity(inpText);
    for (city of listOfCities) {
        const nameStateCountry = [city.name, city.state, city.country];
        const citLi = document.createElement('li')
        citLi.classList.add('list-group-item')
        citLi.innerText = nameStateCountry[0] + ', ' + nameStateCountry[1] + ', ' + nameStateCountry[2];
        ULL.append(citLi)
        // const nameStateCountry = [city.name, city.state, city.country];
        console.log(nameStateCountry[0] + ', ' + nameStateCountry[1] + ', ' + nameStateCountry[2]);
        // console.log(i + ': ' + city.name + ': ' + city.lat + ', ' + city.lon);
        // i++;
    }
    // console.log(listOfCities);
}


const getCity = async (ter) => {
    try {
        const config = { headers: { Accept: 'application/json' } }
        const res = await axios.get('http://api.openweathermap.org/geo/1.0/direct?q=' + ter + '&limit=5&appid=e9521e2132e119d6f495aa7a140d9764', config);
        const cities = res.data;
        // let i = 1;
        // for (city of cities) {
        //     const nameStateCountry = [city.name, city.state, city.country];
        //     console.log(nameStateCountry[0] + ', ' + nameStateCountry[1] + ', ' + nameStateCountry[2]);
        //     // console.log(i + ': ' + city.name + ': ' + city.lat + ', ' + city.lon);
        //     // i++;
        // }
        // console.log(res.data);
        return res.data
    } catch (e) {
        return "ERROR"
    }
}

const getCoord = async (ter) => {
    try {
        let cityName = ter.substring(0, ter.search(','));
        let stateOrProvidence = ter.substring(ter.search(',') + 2, ter.length - 4);
        let country = ter[ter.length - 2] + ter[ter.length - 1];

        const config = { headers: { Accept: 'application/json' } }


        const res = await axios.get('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',' + stateOrProvidence + ',' + country + '&limit=1&appid=e9521e2132e119d6f495aa7a140d9764', config);



        //attempt to handle different parameters
        // const config = {};
        // if (stateOrProvidence === 'undefined') {
        //     config = { params: { q: cityName, country, limit: '1', appid: 'e9521e2132e119d6f495aa7a140d9764            ' }, headers: { Accept: 'application/json' } }
        // } else {
        //     config = { params: { q: cityName, stateOrProvidence, country, limit: '1', appid: 'e9521e2132e119d6f495aa7a140d9764            ' }, headers: { Accept: 'application/json' } }
        // }
        // res = await axios.get('http://api.openweathermap.org/geo/1.0/direct', config);


        const cityData = res.data[0];
        // console.log(cityData)
        const latLong = [cityData.lat, cityData.lon];
        // console.log(latLong[0] + ', ' + latLong[1])

        // let i = 1;
        // for (city of cities) {
        //     const nameStateCountry = [city.name, city.state, city.country];
        //     console.log(nameStateCountry[0] + ', ' + nameStateCountry[1] + ', ' + nameStateCountry[2]);
        //     // console.log(i + ': ' + city.name + ': ' + city.lat + ', ' + city.lon);
        //     // i++;
        // }
        // console.log(res.data);
        return latLong
    } catch (e) {
        return "ERROR"
    }
}

const getWeather = async (coordinates) => {
    try {
        const coords = await coordinates;
        // console.log(coords[0])
        const config = { headers: { Accept: 'application/json' } }
        const res = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + coords[0] + '&lon=' + coords[1] + '&appid=e9521e2132e119d6f495aa7a140d9764&units=imperial', config);
        // console.log(res.data.main.temp)
        const ULL = document.querySelector('.list-group')



        const citLi = document.querySelector('#tasks p')
        citLi.innerText = res.data.main.temp;
        citLi.classList.add('list-group-item')
        ULL.append(citLi)
        return res.data.main.temp;

        // return res.data
    } catch (e) {
        return "ERROR"
    }
}

const submit = document.querySelector('#grenade');
submit.addEventListener('click', showCities);
const ullMaj = document.querySelector('.list-group')
ullMaj.addEventListener('click', function (e) {
    // console.dir(e.target)
    if (e.target.nodeName === 'LI') {
        // async function getTemp() {
        //     let temp = await getWeather(getCoord(e.target.innerText));
        //     return temp + 1;
        // }
        const results = document.querySelectorAll('LI')
        for (let result of results) {
            result.remove();
        }
        getWeather(getCoord(e.target.innerText));
        // let acTemp = getTemp;
        // console.log(acTemp)
    }
    // e.target.nodeName === 'LI' && getWeather(getCoord(e.target.innerText));
})