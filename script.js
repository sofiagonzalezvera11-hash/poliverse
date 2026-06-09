
// =========================
// POLIVERSE 2.0
// =========================

// MODO CLARO

document.getElementById("lightBtn").addEventListener("click", () => {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
});

// MODO OSCURO

document.getElementById("darkBtn").addEventListener("click", () => {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
});

// MODO AUTOMÁTICO

document.getElementById("autoBtn").addEventListener("click", () => {

    localStorage.setItem("theme", "auto");

    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
        document.body.classList.add("dark");
    }else{
        document.body.classList.remove("dark");
    }

});

// CARGAR TEMA

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark");
}
else if(savedTheme === "light"){
    document.body.classList.remove("dark");
}
else if(savedTheme === "auto"){

    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
        document.body.classList.add("dark");
    }

}

// =========================
// BUSCADOR DE PAÍSES
// =========================

async function buscarPais(){

    const country =
    document.getElementById("countryInput")
    .value
    .trim();

    if(country === ""){
        return;
    }

    const resultado =
    document.getElementById("resultadoPais");

    resultado.innerHTML =
    "<p>Buscando información...</p>";

    try{

        const response =
        await fetch(
        `https://restcountries.com/v3.1/name/${country}`
        );

        const data =
        await response.json();

        const pais =
        data[0];

        resultado.innerHTML = `
        <div class="country-card">

            <img src="${pais.flags.png}"
            alt="${pais.name.common}">

            <h2>${pais.name.common}</h2>

            <p><strong>Capital:</strong>
            ${pais.capital ? pais.capital[0] : "N/D"}
            </p>

            <p><strong>Región:</strong>
            ${pais.region}</p>

            <p><strong>Población:</strong>
            ${pais.population.toLocaleString()}
            </p>

            <p><strong>Moneda:</strong>
            ${
            pais.currencies
            ? Object.values(pais.currencies)[0].name
            : "N/D"
            }
            </p>

            <p><strong>Idiomas:</strong>
            ${
            pais.languages
            ? Object.values(pais.languages).join(", ")
            : "N/D"
            }
            </p>

        </div>
        `;

    }
    catch(error){

        resultado.innerHTML = `
        <div class="country-card">
        <h2>❌ País no encontrado</h2>
        <p>Intenta escribir el nombre oficial del país.</p>
        </div>
        `;

    }

}

// ENTER PARA BUSCAR

document
.getElementById("countryInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        buscarPais();
    }

});

console.log("🌎 Poliverse iniciado");
