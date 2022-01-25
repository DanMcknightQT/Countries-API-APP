(function(){
    const URL = 'https://restcountries.com/v2/all'

    $.ajax({
        type: "GET",
        url: `${URL}`,
        success: (data) =>{
            console.log(data, 'data from get call')
            Object.values(data).forEach(country =>{
                console.log(country.flags.png, 'flag png')
                

                let contentBox =
                    `<section class="countryCard">
                    <img id="country-Flag" src="${country.flags.png}">
                    <h1 id="country-Name">${country.name}</h1>
                    <article class="cardInfo">
                    <p><span class="infoTitle">Population:</span> ${country.population}</p>
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

