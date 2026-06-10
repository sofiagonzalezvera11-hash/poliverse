// ============================
// POLIVERSE 3.0
// ============================

// ----------------------------
// BOTONES DE TEMA
// ----------------------------

const lightBtn = document.getElementById("lightBtn");
const darkBtn = document.getElementById("darkBtn");
const autoBtn = document.getElementById("autoBtn");

if (lightBtn) {
    lightBtn.addEventListener("click", () => {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    });
}

if (darkBtn) {
    darkBtn.addEventListener("click", () => {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    });
}

if (autoBtn) {
    autoBtn.addEventListener("click", () => {

        localStorage.setItem("theme", "auto");

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }

    });
}

// ----------------------------
// CARGAR TEMA GUARDADO
// ----------------------------

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

    const input = document.getElementById("countryInput");
    const resultado = document.getElementById("resultadoPais");

    if (!input || !resultado) {
        return;
    }

    const country = input.value.trim();

    if (country === "") {

        resultado.innerHTML = `
        <div class="country-card">
            <h2>⚠️ Escribe un país</h2>
        </div>
        `;

        return;
    }

    resultado.innerHTML = `
    <div class="country-card">
        <h2>🔍 Buscando información...</h2>
    </div>
    `;

    try {

        const response =
        await fetch(
        `https://restcountries.com/v3.1/name/${country}`
        );

        const data = await response.json();

        if (!data || !data[0]) {
            throw new Error("País no encontrado");
        }

        const pais = data[0];

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

            <h2>${pais.name.common}</h2>

            <p><strong>🇺🇳 Nombre oficial:</strong> ${pais.name.official}</p>

            <p><strong>🏛️ Capital:</strong> ${pais.capital ? pais.capital[0] : "N/D"}</p>

            <p><strong>🌎 Región:</strong> ${pais.region}</p>

            <p><strong>📍 Subregión:</strong> ${pais.subregion || "N/D"}</p>

            <p><strong>👥 Población:</strong> ${pais.population.toLocaleString()}</p>

            <p><strong>📏 Superficie:</strong> ${pais.area.toLocaleString()} km²</p>

            <p><strong>💰 Moneda:</strong> ${moneda}</p>

            <p><strong>🗣️ Idiomas:</strong> ${idiomas}</p>

            <p><strong>🚗 Conducción:</strong> ${pais.car?.side || "N/D"}</p>

            <p><strong>⏰ Zona horaria:</strong> ${pais.timezones.join(", ")}</p>

            <p><strong>📞 Prefijo telefónico:</strong> ${prefijo}</p>

            <p><strong>🌐 Dominio:</strong> ${dominio}</p>

            <p>
                <a href="${pais.maps.googleMaps}" target="_blank">
                    🗺️ Ver en Google Maps
                </a>
            </p>

        </div>
        `;

    }
    catch (error) {

        resultado.innerHTML = `
        <div class="country-card">

            <h2>❌ País no encontrado</h2>

            <p>
                Verifica la ortografía e inténtalo nuevamente.
            </p>

        </div>
        `;

    }

}

// ----------------------------
// BUSCAR CON ENTER
// ----------------------------

const countryInput =
document.getElementById("countryInput");

if (countryInput) {

    countryInput.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            buscarPais();
        }

    });

}

console.log("🌎 Poliverse 3.0 iniciado correctamente")
function abrirAcademia(tema){

const contenido =
document.getElementById("academiaContenido");

const temas = {

ri: `
<h2>🌍 Relaciones Internacionales</h2>
<p>
Estudia cómo interactúan los países,
las organizaciones internacionales
y otros actores globales.
</p>
<p>
🌟 Dato curioso:
La diplomacia moderna se fortaleció
tras la Paz de Westfalia.
</p>
`,

ddhh: `
<h2>⚖️ Derechos Humanos</h2>
<p>
Son derechos fundamentales que
corresponden a todas las personas.
</p>
<p>
🌟 Dato curioso:
La Declaración Universal de los Derechos Humanos
fue aprobada en 1948.
</p>
`,

feminismo: `
<h2>👩 Feminismo</h2>
<p>
Movimiento que busca la igualdad
de derechos y oportunidades.
</p>
<p>
🌟 Dato curioso:
Existen múltiples corrientes feministas.
</p>
`,

onu: `
<h2>🤝 ONU</h2>
<p>
La ONU promueve la cooperación
internacional entre los países.
</p>
<p>
🌟 Dato curioso:
Tiene 193 Estados miembros.
</p>
`,

democracia: `
<h2>🏛️ Democracia</h2>
<p>
Sistema político donde la ciudadanía
participa en la elección de gobernantes.
</p>
<p>
🌟 Dato curioso:
Existen varios modelos democráticos.
</p>
`,

globalizacion: `
<h2>🌐 Globalización</h2>
<p>
Proceso de creciente conexión
entre sociedades y economías.
</p>
<p>
🌟 Dato curioso:
Internet aceleró enormemente este proceso.
</p>
`

};

contenido.innerHTML =
temas[tema];

}
