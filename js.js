(function(){
    const URL = 'https://restcountries.com/v2/all'

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    $.ajax({
        type: "GET",
        url: `${URL}`,
        success: (data) =>{
            Object.values(data).forEach(country =>{
                let population = formatNumber(country.population)
                //console.log(country)
                let countryObj = {
                    [country.name]: {
                        nativeName: country.nativeName,
                        population: population,
                        region: country.region,
                        subRegion: country.subRegion,
                        capital: country.capital,
                        topLevelDomain: country.topLevelDomain,
                        currencies: country.currencies,
                        languages: country.languages,
                        borderCountries: country.borders
                    }
                }

                countryInfo.push(countryObj)

                let contentBox =
                    `<section class="countryCard">
                    <img onclick="detailedView(this)" id="country-Flag" src="${country.flags.png}">
                    <h1 id="country-Name">${country.name}</h1>
                    <article class="cardInfo">
                    <p><span class="infoTitle">Population:</span> ${population}</p>
                    <p><span class="infoTitle">Region:</span> ${country.region}</p>
                    <p><span class="infoTitle">Capital:</span> ${country.capital}</p>
                    </article>
                    </section>`

                $('#cards-Div').append(contentBox)
            })
        },
        error: (error) =>{
            console.log(error)
        }
    })

})();
let countryInfo = []

//console.log(countryInfo, 'Country Info Array')

function detailedView(country){
    $('.totalView').addClass('hide');
    country = country.parentElement.childNodes[3].innerHTML
    //console.log(country)
    Object.values(countryInfo).forEach(value =>{
        //console.log(value)
        Object.entries(value).forEach(([key, value]) =>{
            if(country === key){
                console.log(key, 'key')
                console.log(value, 'value')
            }
        })
    })
}
