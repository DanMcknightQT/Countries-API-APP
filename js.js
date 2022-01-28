(function(){
    const URL = 'https://restcountries.com/v2/all'

    $.ajax({
        type: "GET",
        url: `${URL}`,
        success: (data) =>{
            console.log(data)
            Object.values(data).forEach(country =>{
                let population = formatNumber(country.population)

                let countryObj = {
                    [country.name]: {
                        nativeName: country.nativeName,
                        population: population,
                        region: country.region,
                        subRegion: country.subregion,
                        capital: country.capital,
                        topLevelDomain: country.topLevelDomain,
                        currencies: country.currencies,
                        languages: country.languages,
                        borderCountries: country.borders,
                        flag: country.flags.png,
                        alpha3Code: country.alpha3Code
                    }
                }

                let countryAbbObj = {
                    [country.alpha3Code]:  {
                        title: country.name,
                    }
                }
                
                countryInfo.push(countryObj)
                countryAbb.push(countryAbbObj)

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

let countryInfo = [];
let countryAbb = [];
let languages = [];

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function borderCountry(country){
    $('#single-Card').empty()
    country = country.innerHTML
    let currencyName = null;
    let borderCountries = null;
    languages = []

    Object.values(countryInfo).forEach(value =>{
        Object.entries(value).forEach(([key, value]) =>{
            if(country === key){
                console.log('inside the if statement')
                if(!(value.currencies === undefined)){
                    Object.values(value.currencies).forEach(currency =>{
                        currencyName = currency.name
                    })
                }
                else{
                    currencyName = 'None'
                }

                Object.values(value.languages).forEach(language =>{
                    languages.push(language.name)
                })
                borderCountries = value.borderCountries
                console.log(borderCountries, 'border countries for selected country')
                
                let newContent =
                `<div id="target">
                <section class="largerImage" >
                    <img src="${value.flag}">
                </section>

                <h1 id="country-NameLg">${key}</h1>
                <section class="cardInfo">
                <article class="cardInfoLg">
                    <p><span class="infoTitle">Native Name:</span> ${value.nativeName}</p>
                    <p><span class="infoTitle">Population:</span> ${value.population}</p>
                    <p><span class="infoTitle">Region:</span> ${value.region}</p>
                    <p><span class="infoTitle">Sub Region:</span> ${value.subRegion}</p>
                    <p><span class="infoTitle">Capital:</span> ${value.capital}</p>
                </article>
                <br>
                <article class="cardInfoLg extraInfo">
                    <p><span class="infoTitle">Top Level Domain:</span> ${value.topLevelDomain}</p>
                    <p><span class="infoTitle">Currencies:</span> ${currencyName}</p>
                    <p><span class="infoTitle">Languages:</span> ${languages.join(", ")}</p>
                </article>
                </section>
                <br>
                <section class="borderSection">
                <p id="border-Title"> Border Countries: </p>
                <div id="border-Countries"></div>
                </section>
                </div>`

                $('#single-Card').append(newContent)
            }
        })
    })
    if(borderCountries === undefined || borderCountries === null){

        let part = 
            `<div class="borderCountry"> None </div>`

            $('#border-Countries').append(part)
    }
    else{
        Object.values(borderCountries).forEach(value =>{
            let codeName = value

            Object.values(countryAbb).forEach(value =>{
                Object.entries(value).forEach(([key, value]) =>{
                    if(codeName === key){
                        codeName = value.title
                    }
                })
            })

            let part = 
            `<div class="borderCountry" onclick="borderCountry(this)">${codeName}</div>`

            $('#border-Countries').append(part)
        })
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function detailedView(country){
    let currencyName = null;
    let borderCountries = null;
    $('.totalView').addClass('hide');
    $('.searchView').addClass('hide');
    $('.filteredView').addClass('hide');
    $('.focusedView').removeClass('hide');
    country = country.parentElement.childNodes[3].innerHTML

    Object.values(countryInfo).forEach(value =>{
        Object.entries(value).forEach(([key, value]) =>{
            if(country === key){
                if(!(value.currencies === undefined)){
                    Object.values(value.currencies).forEach(currency =>{
                        currencyName = currency.name
                    })
                }
                else{
                    currencyName = 'None'
                }

                Object.values(value.languages).forEach(language =>{
                    languages.push(language.name)
                })
                borderCountries = value.borderCountries
                
                let content =
                `<div id="target">
                <section class="largerImage" >
                    <img src="${value.flag}">
                </section>

                <h1 id="country-NameLg">${key}</h1>
                <section class="cardInfo">
                <article class="cardInfoLg">
                    <p><span class="infoTitle">Native Name:</span> ${value.nativeName}</p>
                    <p><span class="infoTitle">Population:</span> ${value.population}</p>
                    <p><span class="infoTitle">Region:</span> ${value.region}</p>
                    <p><span class="infoTitle">Sub Region:</span> ${value.subRegion}</p>
                    <p><span class="infoTitle">Capital:</span> ${value.capital}</p>
                </article>
                <br>
                <article class="cardInfoLg extraInfo">
                    <p><span class="infoTitle">Top Level Domain:</span> ${value.topLevelDomain}</p>
                    <p><span class="infoTitle">Currencies:</span> ${currencyName}</p>
                    <p><span class="infoTitle">Languages:</span> ${languages.join(", ")}</p>
                </article>
                </section>
                <br>
                <section class="borderSection">
                <p id="border-Title"> Border Countries: </p>
                <div id="border-Countries"></div>
                </section>
                </div>`

                $('#single-Card').append(content)
            }
        })
    })
    if(borderCountries === undefined || borderCountries === null){

        let part = 
            `<div class="borderCountry"> None </div>`

            $('#border-Countries').append(part)
    }
    else{
        Object.values(borderCountries).forEach(value =>{
            let codeName = value

            Object.values(countryAbb).forEach(value =>{
                Object.entries(value).forEach(([key, value]) =>{
                    if(codeName === key){
                        codeName = value.title
                    }
                })
            })

            let part = 
            `<div class="borderCountry" onclick="borderCountry(this)">${codeName}</div>`

            $('#border-Countries').append(part)
        })
    }
}

//! Funciton to return from seeing a single card
function goBack(){
    $('.totalView').removeClass('hide');
    $('.focusedView').addClass('hide');
    $('#target').remove();
    location.reload();
}

//TODO: Need to finish region filter function
function regionFilter(region){
    $('.totalView').addClass('hide');
    $('.filteredView').removeClass('hide');
    region = region.innerHTML

    let dataClone = [...countryInfo]

    Object.values(dataClone).forEach(value =>{
        Object.entries(value).forEach(([key, value]) =>{
            if(value.region === region){
                let population = formatNumber(value.population)
                console.log(value)

                let contentBox =
                    `<section class="countryCard">
                    <img onclick="detailedView(this)" id="country-Flag" src="${value.flag}">
                    <h1 id="country-Name">${key}</h1>
                    <article class="cardInfo">
                    <p><span class="infoTitle">Population:</span> ${population}</p>
                    <p><span class="infoTitle">Region:</span> ${value.region}</p>
                    <p><span class="infoTitle">Capital:</span> ${value.capital}</p>
                    </article>
                    </section>`

                $('#filtered-Div').append(contentBox)
            }
        })
    })
}

function searchButton(){
    let country = $('#search-Input').val()
    $('.totalView').addClass('hide');
    $('.filteredView').addClass('hide');
    $('.searchView').removeClass('hide');

    const URL = 'https://restcountries.com/v2/name/'

    $.ajax({
        type: "GET",
        url: `${URL}${country}`,
        success: (data) =>{
            Object.values(data).forEach(country =>{
                let population = formatNumber(country.population)

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

                $('#search-Div').append(contentBox)
            })
        },
        error: (error) =>{
            console.log(error)
        }
    })
}