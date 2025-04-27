fetch('travel_recommendation_api.json')
.then(response => {
    if(!response.ok){
        throw new Error('Error al cargar los datos')
    }
    return response.json()  
})

.then(data => {
    console.log(data)
})

.catch(error => {
    console.error('Error al cargar los datos:', error)
})
