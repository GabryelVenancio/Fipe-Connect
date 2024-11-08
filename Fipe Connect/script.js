document.addEventListener("DOMContentLoaded", () => {
    const marcaSelect = document.getElementById("marca");
    const resultadosDiv = document.getElementById("resultados");

    async function loadMarcas() {
        const response = await fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas");
        const marcas = await response.json();
        console.log("Marcas carregadas:", marcas);
        marcas.forEach(marca => {
            const option = document.createElement("option");
            option.value = marca.id;
            option.textContent = marca.nome;
            marcaSelect.appendChild(option);
        });
    }

    document.getElementById("carForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const marcaId = marcaSelect.value;

        if (marcaId) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `<strong>Marca selecionada:</strong> ${marcaSelect.options[marcaSelect.selectedIndex].text}`;
            resultadosDiv.appendChild(card);
        } else {
            console.error("Nenhuma marca selecionada.");
        }
    });

    loadMarcas();
});
