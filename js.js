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
                        subRegion: country.subregion,
                        capital: country.capital,
                        topLevelDomain: country.topLevelDomain,
                        currencies: country.currencies,
                        languages: country.languages,
                        borderCountries: country.borders,
                        flag: country.flags.png
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
    let currencyName = null;
    let languages = [];
    $('.totalView').addClass('hide');
    $('.focusedView').removeClass('hide');
    country = country.parentElement.childNodes[3].innerHTML
    //console.log(country)
    Object.values(countryInfo).forEach(value =>{
       //console.log(value)
        Object.entries(value).forEach(([key, value]) =>{
            if(country === key){
                console.log(key, 'key')
                console.log(value, 'value')
                Object.values(value.currencies).forEach(currency =>{
                    currencyName = currency.name
                })
                Object.values(value.languages).forEach(language =>{
                    languages.push(language.name)
                })
                

                let content =
                `<div id="target">
                <section class="largerImage" >
                    <img src="${value.flag}">
                </section>

                <h1 id="country-NameLg">${key}</h1>
                <article class="cardInfoLg">
                    <p><span class="infoTitle">Native Name:</span> ${value.nativeName}</p>
                    <p><span class="infoTitle">Population:</span> ${value.population}</p>
                    <p><span class="infoTitle">Region:</span> ${value.region}</p>
                    <p><span class="infoTitle">Sub Region:</span> ${value.subRegion}</p>
                    <p><span class="infoTitle">Capital:</span> ${value.capital}</p>
                </article>
                <br>
                <article class="cardInfoLg">
                    <p><span class="infoTitle">Top Level Domain:</span> ${value.topLevelDomain}</p>
                    <p><span class="infoTitle">Currencies:</span> ${currencyName}</p>
                    <p><span class="infoTitle">Languages:</span> ${languages.join(", ")}</p>
                </article>
                </div>`

                $('#single-Card').append(content)
            }
        })
    })
    console.log(languages)
}

function goBack(){
    $('.totalView').removeClass('hide');
    $('.focusedView').addClass('hide');
    $('#target').remove();
    $(window).scrollTop(0);

}