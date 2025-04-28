// Obtener los elementos del DOM
const input = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const recommendations = document.getElementById("recommendations");
const closeButton = document.getElementById("close-button");
const closeBg = document.getElementById("close-bg");

// Variable para almacenar los datos originales
let datosOriginales = null;

// Función para mostrar las recomendaciones
function showRecommendations(data) {
    recommendations.innerHTML = ''; // Limpiar contenido previo
    closeButton.classList.remove("hidden");

    closeButton.addEventListener("click", () => {
        recommendations.innerHTML = '';
        closeButton.classList.add("hidden");
    })

    // Función para obtener la fecha y hora actual
    function getCurrentDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        return now.toLocaleDateString('es-ES', options);
    }

    // Mostrar países
    data.countries.forEach(country => {
        country.cities.forEach(city => {
            const recommendation = document.createElement("div");
            recommendation.classList.add("recommendation", "bg-white/90", "rounded-xl", "shadow-xl", "overflow-hidden", "transform", "transition-all", "duration-300", "hover:scale-105", "hover:shadow-2xl");
            recommendation.innerHTML = `
                <div class="relative h-48 overflow-hidden">
                    <img src="${city.imageUrl}" alt="${city.name}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="p-4">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${city.name}</h3>
                    <p class="text-gray-600 text-sm">${city.description}</p>
                    <div class="mt-2 text-xs text-indigo-500">
                        <i class="fas fa-clock mr-1"></i> ${getCurrentDateTime()}
                    </div>
                    <div class="mt-4 flex justify-between items-center">
                        <span class="text-indigo-600 text-sm font-medium">${country.name}</span>
                        <button class="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:from-indigo-500 hover:to-indigo-700 transition-colors duration-300">
                            Ver más
                        </button>
                    </div>
                </div>
            `;
            recommendations.appendChild(recommendation);
        });
    });

    // Mostrar templos
    data.temples.forEach(temple => {
        const recommendation = document.createElement("div");
        recommendation.classList.add("recommendation", "bg-white/90", "rounded-xl", "shadow-xl", "overflow-hidden", "transform", "transition-all", "duration-300", "hover:scale-105", "hover:shadow-2xl");
        recommendation.innerHTML = `
            <div class="relative h-48 overflow-hidden">
                <img src="${temple.imageUrl}" alt="${temple.name}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-4">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${temple.name}</h3>
                <p class="text-gray-600 text-sm">${temple.description}</p>
                <div class="mt-2 text-xs text-indigo-500">
                    <i class="fas fa-clock mr-1"></i> ${getCurrentDateTime()}
                </div>
                <div class="mt-4 flex justify-end">
                    <button class="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:from-indigo-500 hover:to-indigo-700 transition-colors duration-300">
                        Ver más
                    </button>
                </div>
            </div>
        `;
        recommendations.appendChild(recommendation);
    });

    // Mostrar playas
    data.beaches.forEach(beach => {
        const recommendation = document.createElement("div");
        recommendation.classList.add("recommendation", "bg-white/90", "rounded-xl", "shadow-xl", "overflow-hidden", "transform", "transition-all", "duration-300", "hover:scale-105", "hover:shadow-2xl");
        recommendation.innerHTML = `
            <div class="relative h-48 overflow-hidden">
                <img src="${beach.imageUrl}" alt="${beach.name}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-4">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${beach.name}</h3>
                <p class="text-gray-600 text-sm">${beach.description}</p>
                <div class="mt-2 text-xs text-indigo-500">
                    <i class="fas fa-clock mr-1"></i> ${getCurrentDateTime()}
                </div>
                <div class="mt-4 flex justify-end">
                    <button class="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:from-indigo-500 hover:to-indigo-700 transition-colors duration-300">
                        Ver más
                    </button>
                </div>
            </div>
        `;
        recommendations.appendChild(recommendation);
    });
}

// Función para buscar recomendaciones
function buscarRecomendaciones(textoBusqueda) {
    if (!datosOriginales) return; // Si no hay datos, no hacer nada

    const texto = textoBusqueda.toLowerCase().trim();

    // Filtrar países y ciudades
    const paisesFiltrados = datosOriginales.countries.map(country => ({
        ...country,
        cities: country.cities.filter(city =>
            city.name.toLowerCase().includes(texto) ||
            city.description.toLowerCase().includes(texto) ||
            country.name.toLowerCase().includes(texto)
        )
    })).filter(country => country.cities.length > 0);

    // Filtrar templos
    const templosFiltrados = datosOriginales.temples.filter(temple =>
        temple.name.toLowerCase().includes(texto) ||
        temple.description.toLowerCase().includes(texto)
    );

    // Filtrar playas
    const playasFiltradas = datosOriginales.beaches.filter(beach =>
        beach.name.toLowerCase().includes(texto) ||
        beach.description.toLowerCase().includes(texto)
    );

    // Mostrar resultados filtrados
    showRecommendations({
        countries: paisesFiltrados,
        temples: templosFiltrados,
        beaches: playasFiltradas
    });
}

// Evento para el botón de búsqueda
searchButton.addEventListener('click', () => {
    buscarRecomendaciones(input.value);
});

// Evento para Enter en el input
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        buscarRecomendaciones(input.value);
    }
});

// Cargar los datos iniciales
fetch("travel_recommendation_api.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error al cargar los datos");
        }
        return response.json();
    })
    .then((data) => {
        datosOriginales = data;
    })
    .catch((error) => {
        console.error("Error al cargar los datos:", error);
        recommendations.innerHTML = `<p class="text-red-500">Error al cargar los datos: ${error.message}</p>`;
    });
