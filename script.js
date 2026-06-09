

// ============================
// POLIVERSE 3.0
// ============================
// ----------------------------
// TEMAS
// ----------------------------
const lightBtn = document.getElementById("lightBtn");
const darkBtn = document.getElementById("darkBtn");
const autoBtn = document.getElementById("autoBtn");
lightBtn.addEventListener("click", () => {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
});
darkBtn.addEventListener("click", () => {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
});
autoBtn.addEventListener("click", () => {
    localStorage.setItem("theme", "auto");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
});
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}
if (savedTheme === "light") {
    document.body.classList.remove("dark");
}
if (savedTheme === "auto") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.add("dark");
    }
}
// ----------------------------
// BUSCADOR DE PAÍSES
// ----------------------------
async function buscarPais() {
    const country =
        document
        .getElementById("countryInput")
        .value
        .trim();
    const resultado =
        document.getElementById("resultadoPais");
    if (!country) {
        resultado.innerHTML = `
        <div class="country-card">
        <h2>⚠️ Escribe un país</h2>
        </div>
        `;
        return;
    }
    resultado.innerHTML = `
    <div class="country-card">
    <h2>🔍 Buscando...</h2>
    </div>
    `;
    try {
        const response =
            await fetch(
                `https://restcountries.com/v3.1/name/${country}`
            );
        const data =
            await response.json();
        const pais =
            data[0];
        const moneda =
            pais.currencies
                ? Object.values(pais.currencies)[0].name
                : "No disponible";
        const idiomas =
            pais.languages
                ? Object.values(pais.languages).join(", ")
                : "No disponible";
        const dominio =
            pais.tld
                ? pais.tld.join(", ")
                : "No disponible";
        const prefijo =
            pais.idd
                ? `${pais.idd.root || ""}${pais.idd.suffixes ? pais.idd.suffixes[0] : ""}`
                : "No disponible";
        resultado.innerHTML = `
        <div class="country-card">
            <img
            src="${pais.flags.png}"
            alt="${pais.name.common}"
            >
            <h2>
            ${pais.name.common}
            </h2>
            <p>
            <strong>🇺🇳 Nombre oficial:</strong>
            ${pais.name.official}
            </p>
            <p>
            <strong>🏛️ Capital:</strong>
            ${pais.capital ? pais.capital[0] : "N/D"}
            </p>
            <p>
            <strong>🌎 Región:</strong>
            ${pais.region}
            </p>
            <p>
            <strong>📍 Subregión:</strong>
            ${pais.subregion || "N/D"}
            </p>
            <p>
            <strong>👥 Población:</strong>
            ${pais.population.toLocaleString()}
            </p>
            <p>
            <strong>📏 Superficie:</strong>
            ${pais.area.toLocaleString()} km²
            </p>
            <p>
            <strong>💰 Moneda:</strong>
            ${moneda}
            </p>
            <p>
            <strong>🗣️ Idiomas:</strong>
            ${idiomas}
            </p>
            <p>
            <strong>🚗 Conducción:</strong>
            ${pais.car?.side || "N/D"}
            </p>
            <p>
            <strong>⏰ Zona horaria:</strong>
            ${pais.timezones.join(", ")}
            </p>
            <p>
            <strong>📞 Prefijo telefónico:</strong>
            ${prefijo}
            </p>
            <p>
            <strong>🌐 Dominio:</strong>
            ${dominio}
            </p>
            <p>
            <a
            href="${pais.maps.googleMaps}"
            target="_blank">
            🗺️ Ver en Google Maps
            </a>
            </p>
        </div>
        `;
    } catch (error) {
        resultado.innerHTML = `
        <div class="country-card">
            <h2>
            ❌ País no encontrado
            </h2>
            <p>
            Verifica la ortografía e inténtalo de nuevo.
            </p>
        </div>
        `;
    }
}
// ----------------------------
// ENTER PARA BUSCAR
// ----------------------------
document
.getElementById("countryInput")
.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        buscarPais();
    }
});
console.log("🌎 Poliverse 3.0 iniciad
