document.getElementById('container').onchange = function() {
    var DTb = parseInt(document.getElementById("DTb").value);
    var DTp = parseInt(document.getElementById("DTp").value);

    if(isNaN(DTb))
        DTb = 0;
    if(isNaN(DTp))
        DTp = 0;

    var numPeriodo = document.getElementById("container").childElementCount - 2;
    var totalDisciplinas = 0;
    var numerador = 0;
    var denominador = 0;

    for(var i = 1; i <= numPeriodo; i++) {
        var periodo = document.getElementById("periodo"+i);
        var numDisciplinas = periodo.childElementCount - 1;

        for(var j = 1; j <= numDisciplinas; j++) {
            var numCreditos = document.getElementById("periodo"+i+"-disciplina"+j+"-creditos").value;
            var mencao = parseInt(document.getElementById("periodo"+i+"-disciplina"+j+"-mencao").value);

            
            if(Number.isInteger(parseInt(numCreditos)) && mencao -1) {
                totalDisciplinas++;
                
                numerador += mencao * parseInt(numCreditos) * Math.min(6, i);
                denominador += parseInt(numCreditos) * Math.min(6, i);
            }
        }
    }

    var ira = (1 - (0.6 * DTb + 0.4 * DTp) / totalDisciplinas) * (numerador / denominador);

    if(ira != NaN && ira > 0)
        document.getElementById("ira").innerText = "IRA: " + ira.toFixed(4);
}

function criaDisciplina() {
    var container = document.getElementById("container");
    var numPeriodo = container.childElementCount-2;

    if(typeof(this.id) != 'undefined')
        numPeriodo = parseInt(this.id.split("-")[1]);

    var numDisciplina = document.getElementById("periodo"+numPeriodo).childElementCount-1;

    var botaoAdicionar = document.getElementById("adicionarDisciplina-"+numPeriodo+"-"+numDisciplina);
    var divBotao = document.getElementById("divButton-"+numPeriodo+"-"+numDisciplina)

    if(typeof(botaoAdicionar) != 'undefined' && botaoAdicionar != null)
        botaoAdicionar.remove();
    if(typeof(divBotao) != 'undefined' && divBotao != null)
        divBotao.remove();

    var entradaCreditos = document.createElement("input");
    entradaCreditos.setAttribute("id", "periodo"+numPeriodo+"-disciplina"+(numDisciplina+1)+"-creditos");
    entradaCreditos.setAttribute("class", "form-control");
    entradaCreditos.setAttribute("placeholder", "Número de créditos");

    var entradaMencao  = document.createElement("select");
    entradaMencao.setAttribute("id", "periodo"+numPeriodo+"-disciplina"+(numDisciplina+1)+"-mencao");
    entradaMencao.setAttribute("class", "form-select");

    var selecione = document.createElement("option");
    selecione.innerText = "Menção";
    selecione.value = -1;

    var sr = document.createElement("option");
    sr.innerText = "SR";
    sr.value = 0;

    var ii = document.createElement("option");
    ii.innerText = "II";
    ii.value = 1;

    var mi = document.createElement("option");
    mi.innerText = "MI";
    mi.value = 2;

    var mm = document.createElement("option");
    mm.innerText = "MM";
    mm.value = 3;

    var ms = document.createElement("option");
    ms.innerText = "MS";
    ms.value = 4;

    var ss = document.createElement("option");
    ss.innerText = "SS";
    ss.value = 5;

    entradaMencao.appendChild(selecione);
    entradaMencao.appendChild(sr);
    entradaMencao.appendChild(ii);
    entradaMencao.appendChild(mi);
    entradaMencao.appendChild(mm);
    entradaMencao.appendChild(ms);
    entradaMencao.appendChild(ss);

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

    divColDisciplina.appendChild(entradaCreditos);
    divColCreditos.appendChild(entradaMencao);
    divButton.appendChild(botaoAdicionar);

    divDisciplinaNova.appendChild(divColDisciplina);
    divDisciplinaNova.appendChild(divColCreditos);
    divDisciplinaNova.appendChild(divButton);

    var divPeriodo = document.getElementById("periodo"+numPeriodo);
    divPeriodo.appendChild(divDisciplinaNova);

}

function criaPeriodo() {
    var numPeriodo = document.getElementById("container").childElementCount -1;
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