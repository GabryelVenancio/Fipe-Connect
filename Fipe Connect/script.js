const BASE_URL = "https://parallelum.com.br/fipe/api/v1";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro na API");
        return await response.json();
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao buscar os dados da API.");
    }
}

async function loadMarcas(tipo) {
    const marcas = await fetchData(`${BASE_URL}/${tipo}/marcas`);
    const modelosDiv = document.getElementById("modelos");
    const anosDiv = document.getElementById("anos");
    const detalhesDiv = document.getElementById("detalhes");

    modelosDiv.innerHTML = '';
    anosDiv.innerHTML = '<p>Selecione um modelo primeiro.</p>';
    detalhesDiv.innerHTML = '<p>Selecione o ano do veículo.</p>';

    marcas.forEach(marca => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.textContent = marca.nome;
        div.onclick = () => loadModelos(tipo, marca.codigo);
        modelosDiv.appendChild(div);
    });

    modelosDiv.scrollIntoView({ behavior: "smooth" });
}

async function loadModelos(tipo, codMarca) {
    const modelosData = await fetchData(`${BASE_URL}/${tipo}/marcas/${codMarca}/modelos`);
    const anosDiv = document.getElementById("anos");
    const detalhesDiv = document.getElementById("detalhes");

    anosDiv.innerHTML = '<p>Selecione um modelo primeiro.</p>';
    detalhesDiv.innerHTML = '<p>Selecione o ano do veículo.</p>';

    const modelosDiv = document.getElementById("modelos");
    modelosDiv.innerHTML = '';
    modelosData.modelos.forEach(modelo => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.textContent = modelo.nome;
        div.onclick = () => loadAnos(tipo, codMarca, modelo.codigo);
        modelosDiv.appendChild(div);
    });

    modelosDiv.scrollIntoView({ behavior: "smooth" });
}

async function loadAnos(tipo, codMarca, codModelo) {
    const anos = await fetchData(`${BASE_URL}/${tipo}/marcas/${codMarca}/modelos/${codModelo}/anos`);
    const detalhesDiv = document.getElementById("detalhes");

    detalhesDiv.innerHTML = '<p>Selecione o ano do veículo.</p>';

    const anosDiv = document.getElementById("anos");
    anosDiv.innerHTML = '';
    anos.forEach(ano => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.textContent = ano.nome;
        div.onclick = () => loadDetalhes(tipo, codMarca, codModelo, ano.codigo);
        anosDiv.appendChild(div);
    });

    anosDiv.scrollIntoView({ behavior: "smooth" });
}

async function loadDetalhes(tipo, codMarca, codModelo, codAno) {
    const veiculo = await fetchData(`${BASE_URL}/${tipo}/marcas/${codMarca}/modelos/${codModelo}/anos/${codAno}`);
    const detalhesDiv = document.getElementById("detalhes");

    detalhesDiv.innerHTML = '';

    if (veiculo) {
        const title = document.createElement('h3');
        title.textContent = `Detalhes do Veículo (${veiculo.Modelo})`;
        detalhesDiv.appendChild(title);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');

        const infoItems = [
            { label: "Marca", value: veiculo.Marca },
            { label: "Modelo", value: veiculo.Modelo },
            { label: "Ano de Fabricação", value: veiculo.AnoModelo },
            { label: "Combustível", value: veiculo.Combustivel },
            { label: "Código FIPE", value: veiculo.CodigoFipe },
            { label: "Mês de Referência", value: veiculo.MesReferencia },
            { label: "Valor FIPE", value: veiculo.Valor }
        ];

        infoItems.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('info-item');
            div.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
            infoContainer.appendChild(div);
        });

        detalhesDiv.appendChild(infoContainer);
    } else {
        detalhesDiv.innerHTML = '<p>Não foi possível obter os detalhes do veículo.</p>';
    }
}
