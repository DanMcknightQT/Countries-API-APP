(function(){
    const URL = 'https://restcountries.com/v2/all'
    
    $.ajax({
        type: "GET",
        url: `${URL}`,
        success: (data) =>{
            console.log(data)
        },
        error: (error) =>{
            console.log(error)
        }
    })

})();

