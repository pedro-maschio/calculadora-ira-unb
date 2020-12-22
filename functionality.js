function criaDisciplina() {
    var container = document.getElementById("container");
    var numPeriodo = container.childElementCount-1;

    if(typeof(this.id) != 'undefined')
        numPeriodo = parseInt(this.id.split("-")[1]);

    var numDisciplina = document.getElementById("periodo"+numPeriodo).childElementCount-1;

    var botaoAdicionar = document.getElementById("adicionarDisciplina-"+numPeriodo+"-"+numDisciplina);
    var divBotao = document.getElementById("divButton-"+numPeriodo+"-"+numDisciplina)

    if(typeof(botaoAdicionar) != 'undefined' && botaoAdicionar != null)
        botaoAdicionar.remove();
    if(typeof(divBotao) != 'undefined' && divBotao != null)
        divBotao.remove();

    var entradaNome = document.createElement("input");
    entradaNome.setAttribute("name", "periodo"+numPeriodo+"-disciplina"+(numDisciplina+1)+"-nome");
    entradaNome.setAttribute("class", "form-control");
    entradaNome.setAttribute("placeholder", "Número de créditos");


    var entradaCreditos  = document.createElement("select");
    entradaCreditos.setAttribute("id", "periodo"+numPeriodo+"-disciplina"+(numDisciplina+1)+"-creditos");
    entradaCreditos.setAttribute("class", "form-select");

    var selecione = document.createElement("option");
    selecione.innerText = "Menção";
    var sr = document.createElement("option");
    sr.innerText = "SR";
    var ii = document.createElement("option");
    ii.innerText = "II";
    var mi = document.createElement("option");
    mi.innerText = "MI";
    var mm = document.createElement("option");
    mm.innerText = "MM";
    var ms = document.createElement("option");
    ms.innerText = "MS";
    var ss = document.createElement("option");
    ss.innerText = "SS";

    entradaCreditos.appendChild(selecione);
    entradaCreditos.appendChild(sr);
    entradaCreditos.appendChild(ii);
    entradaCreditos.appendChild(mi);
    entradaCreditos.appendChild(mm);
    entradaCreditos.appendChild(ms);
    entradaCreditos.appendChild(ss);
    

    var botaoAdicionar = document.createElement("button");
    botaoAdicionar.setAttribute("id", "adicionarDisciplina-"+numPeriodo+"-"+(numDisciplina+1));
    botaoAdicionar.setAttribute("class", "btn btn-primary");
    botaoAdicionar.innerText = "Adicionar Disciplina";
    botaoAdicionar.onclick = criaDisciplina;
    
    
    var divDisciplinaNova = document.createElement("div");
    divDisciplinaNova.setAttribute("class", "row g-3");
    divDisciplinaNova.setAttribute("id", "periodo"+numPeriodo+"-disciplina"+(numDisciplina+1));
    

    var divColDisciplina = document.createElement("div");
    divColDisciplina.setAttribute("class", "col-sm-4");

    var divColCreditos = document.createElement("div");
    divColCreditos.setAttribute("class", "col-sm-2");

    var divButton = document.createElement("div");
    divButton.setAttribute("class", "col-sm");
    divButton.setAttribute("id", "divButton-"+numPeriodo+"-"+(numDisciplina+1));

    divColDisciplina.appendChild(entradaNome);
    divColCreditos.appendChild(entradaCreditos);
    divButton.appendChild(botaoAdicionar);

    divDisciplinaNova.appendChild(divColDisciplina);
    divDisciplinaNova.appendChild(divColCreditos);
    divDisciplinaNova.appendChild(divButton);

    var divPeriodo = document.getElementById("periodo"+numPeriodo);
    divPeriodo.appendChild(divDisciplinaNova);

}

function criaPeriodo() {
    var numPeriodo = document.getElementById("container").childElementCount;
    var divContainer = document.getElementById("container");

    var divNovoPeriodo = document.createElement("div");
    divNovoPeriodo.setAttribute("id", "periodo"+numPeriodo);


    var titulo = document.createElement("h3");
    titulo.innerText = numPeriodo + "º Período";

    divNovoPeriodo.appendChild(titulo);
    divContainer.appendChild(divNovoPeriodo);

    criaDisciplina();
}

criaDisciplina();