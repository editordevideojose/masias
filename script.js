//CLIMA//////////////////////////////////////////////////////////////
const apiKey = "2eaa3fe5d97159a3e224bd4072d2ee5b";  // Nueva API Key
const lat = -35.029795;  // Latitud de El Nihuil
const lon = -68.697099;  // Longitud de El Nihuil

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud a la API");
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const condition = data.weather[0].description;
            document.getElementById("weather").innerHTML = `
             <strong><p>${temperature}°C</p></strong>
            <!-- <p>${condition}</p> -->
            `;
        })
        .catch(error => {
            console.error("Error al obtener el clima:", error);
            document.getElementById("weather").innerText = "No se pudo obtener el clima.";
        });
}

// Llamada a la función al cargar la página
window.onload = getWeather;





//FORM: DATOS DE HUESPEDES//////////////////////////////////////////////////////////////
const huespedesContainer = document.getElementById('huespedes');
// Eliminar cualquier contenido previo en el contenedor
huespedesContainer.innerHTML = '';

for (let i = 1; i <= 6; i++) {
    const huespedDiv = document.createElement('div');
    huespedDiv.classList.add('huesped');
    huespedDiv.innerHTML = `
        <h3>Huésped ${i}</h3>
        <input type="text" id="nombre-${i}" name="huesped-${i}-nombre" placeholder="Nombre y apellido">

        <input type="text" id="dni-${i}" name="huesped-${i}-dni" placeholder="DNI">

        <input type="number" id="edad-${i}" name="huesped-${i}-edad" placeholder="Edad">

        <label for="foto-dni-${i}">Adjuntar foto/PDF del DNI:</label>
        <input type="file" id="foto-dni-${i}" name="huesped-${i}-foto-dni">

        <label for="socio-huesped-${i}">¿Es socio del Club de Pescadores?</label>
        <select id="socio-huesped-${i}" name="socio-huesped-${i}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;
    huespedesContainer.appendChild(huespedDiv);
}

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".form-section");
    const continueButtons = document.querySelectorAll(".continue-btn");
    const submitButton = document.querySelector(".submit-btn");
    const modal = document.getElementById("confirmation-modal");
    const finalizeButton = document.getElementById("finalize-btn");

    let currentSection = 0;
    sections[currentSection].classList.add("active");

    continueButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const nextSection = parseInt(btn.getAttribute("data-next")) - 1;
            sections[currentSection].classList.remove("active");
            sections[nextSection].classList.add("active");
            currentSection = nextSection;
        });
    });

    // Show modal on submit
    submitButton.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Redirect to index.html on finalize
    finalizeButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});




// CALCULADORA DE NOCHES Y PRECIO TOTAL A PAGAR
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionamos los elementos del DOM
    const cabanaSelect = document.getElementById("cabana");
    const nightsSelect = document.getElementById("nights");
    const ropaSelect = document.getElementById("ropa");  // Nuevo select
    const totalDisplay = document.createElement("h3");

    // Agregamos el elemento para mostrar el total
    const nightsContainer = document.querySelector(".nights-select");

    totalDisplay.textContent = "TOTAL A PAGAR: $0";
    nightsContainer.appendChild(totalDisplay);

    // Rellenamos el select de noches con opciones de 1 a 15
    for (let i = 0; i <= 15; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        nightsSelect.appendChild(option);
    }

    // Función para calcular el total
    function calculateTotal() {
        const cabanaValue = cabanaSelect.value;
        const nightsValue = parseInt(nightsSelect.value) || 0;
        const ropaValue = parseInt(ropaSelect.value) || 0;  // Valor de ropa de blanco

        let pricePerNight = 0;
        let additionalPriceForRopa = ropaValue * 6000;  // 6000 por cada persona

        if (cabanaValue === "masia-cielo") {
            pricePerNight = 65000;
        } else if (cabanaValue === "masia-luna") {
            pricePerNight = 85000;
        }

        const total = (nightsValue * pricePerNight) + additionalPriceForRopa;
        totalDisplay.textContent = `TOTAL A PAGAR: $${total}`;
    }

    // Añadimos los event listeners para actualizar el cálculo
    cabanaSelect.addEventListener("change", calculateTotal);
    nightsSelect.addEventListener("change", calculateTotal);
    ropaSelect.addEventListener("change", calculateTotal);  // Evento para el nuevo select
});









// SEÑA Y TOTAL A PAGAR :
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionamos los elementos del DOM
    const cabanaSelect = document.getElementById("cabana");
    const nightsSelect = document.getElementById("nights");
    const ropaSelect = document.getElementById("ropa");  // Nuevo select
    const totalPagoDisplay = document.getElementById("total-pago");
    const sena50Display = document.getElementById("sena-50");

    // Función para calcular el total
    function calculateTotal() {
        const cabanaValue = cabanaSelect.value;
        const nightsValue = parseInt(nightsSelect.value) || 0;
        const ropaValue = parseInt(ropaSelect.value) || 0;  // Valor de ropa de blanco

        let pricePerNight = 0;
        let additionalPriceForRopa = ropaValue * 6000;  // 6000 por cada persona

        // Asignamos el precio por noche según la cabaña
        if (cabanaValue === "masia-cielo") {
            pricePerNight = 65000; // Precio por noche para masia-cielo
        } else if (cabanaValue === "masia-luna") {
            pricePerNight = 85000; // Precio por noche para masia-luna
        }

        const total = (nightsValue * pricePerNight) + additionalPriceForRopa; // Total a pagar
        const sena = total / 2; // Seña del 50%

        // Actualizamos el DOM con el total a pagar y la seña
        totalPagoDisplay.textContent = `$${total}`;
        sena50Display.textContent = `$${sena}`;
    }

    // Event listeners para los cambios en el selector de cabaña, noches y ropa de blanco
    cabanaSelect.addEventListener("change", calculateTotal);
    nightsSelect.addEventListener("change", calculateTotal);
    ropaSelect.addEventListener("change", calculateTotal);  // Evento para el nuevo select
});








// BOTON ADJUNTAR ARCHIVO:
document.getElementById("comprobante").addEventListener("change", function () {
    const fileName = this.files.length > 0 ? this.files[0].name : "Sin archivos seleccionados";
    document.querySelector(".file-upload-message").textContent = fileName;
});






// SECCION 4: CHECKOUT 
document.addEventListener('DOMContentLoaded', () => {
    const section1 = document.getElementById('section-1');
    const section3 = document.getElementById('section-3');
    const section4 = document.getElementById('section-4');

    const reservarAhoraBtn = section3.querySelector('.submit-btn');
    const finalizarBtn = document.getElementById('finalizar-btn');

    reservarAhoraBtn.addEventListener('click', () => {
        // Capturar los datos ingresados
        const nombreReserva = document.getElementById('nombre-reserva').value;
        const fechaEntrada = document.getElementById('fecha-entrada').value;
        const fechaSalida = document.getElementById('fecha-salida').value;
        const cabana = document.getElementById('cabana').value;
        const noches = document.getElementById('nights').value;
        const ropa = document.getElementById('ropa').value;  // Nuevo dato de ropa de blanco

        // Mostrar el resumen en la Sección 4
        document.getElementById('resumen-nombre').textContent = nombreReserva || 'No especificado';
        document.getElementById('resumen-fecha-entrada').textContent = fechaEntrada || 'No especificado';
        document.getElementById('resumen-fecha-salida').textContent = fechaSalida || 'No especificado';
        document.getElementById('resumen-cabana').textContent = cabana || 'No especificado';
        document.getElementById('resumen-noches').textContent = noches || 'No especificado';
        document.getElementById('resumen-ropa').textContent = `${ropa} persona(s)`;  // Mostrar la cantidad de personas con ropa de blanco

        // Ocultar Sección 3 y mostrar Sección 4
        section3.style.display = 'none';
        section4.style.display = 'block';
    });

    finalizarBtn.addEventListener('click', () => {
        // Redirigir al archivo index.html
        window.location.href = 'index.html';
    });
});
















function initMap() {
    const location = { lat: -34.678264, lng: -68.640032 }; // Ubicación exacta
    const map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 15,
        center: location,
    });
    new google.maps.Marker({
        position: location,
        map: map,
    });
}




window.onload = function() {
    var screenWidth = screen.width; // screen.width es más confiable para esto

    if (screenWidth > 768) {  
        alert("Sitio web optimizado solo para móviles");
    }
};





















