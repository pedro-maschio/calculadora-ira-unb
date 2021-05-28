function checkLocalStorage() {
    if (typeof(Storage) === "undefined") {
        document.getElementById("salvaDados").style.display = "none";
    } else {
        
        if(window.localStorage.length == 0)
            criaDisciplina();

        for(var i  = 1; i <= window.localStorage.length; i++) {
            var periodo = Object.entries(JSON.parse(window.localStorage.getItem(i)))
            var j = 0;
            for(const [key, value] of periodo) {
                criaDisciplina(true, i, j, value);
                j++;
            }
            if(i != window.localStorage.length)
                criaPeriodo(true);
        }
    }
}

function salvarDados() {
    var divContainer = document.getElementById('container');

    window.localStorage.clear(); // limpo tudo que estava salvo anteriormente

    var periodos = divContainer.children;

    // começamos do 1 pois há a linha superior
    for(var i = 1; i < periodos.length; i++) {  
        var periodo = {}
        // cada período tem um h3 e divs com disciplinas;
        var disciplinas = periodos[i].children;
 
        for(var j = 1; j < disciplinas.length; j++) {
            var disciplina = [];

            var camposDisciplina = disciplinas[j].children;

            // só existe um select em cada div, children[0] por isso
            disciplina.push(camposDisciplina[0].children[0].selectedIndex);
            disciplina.push(camposDisciplina[1].children[0].selectedIndex);
            
            periodo[j] = disciplina;
        }
        window.localStorage.setItem(i, JSON.stringify(periodo));
    }

    //console.log(window.localStorage);

    // for(var i = 1; i <= window.localStorage.length; i++) {
    //     console.log(JSON.parse(window.localStorage.getItem(i))[1]);
    //     console.log(JSON.parse(window.localStorage.getItem(i))[2]);

    //     console.log("\n\n\n\n\n\n\n");

    // }
}

function calculaIRA() {
    var numPeriodo = document.getElementById("container").childElementCount - 1;
    var totalDisciplinas = 0;

    // índice de rendimento acadêmico
    var numeradorIra = 0;
    var denominadorIra = 0;

    // média ponderada
    var numeradorMp = 0;
    var denominadorMp = 0;

    for(var i = 1; i <= numPeriodo; i++) {
        var periodo = document.getElementById("periodo"+i);
        var numDisciplinas = periodo.childElementCount - 1;

        for(var j = 1; j <= numDisciplinas; j++) {
            var numCreditos = document.getElementById("periodo"+i+"-disciplina"+j+"-creditos").value;
            var mencao = parseInt(document.getElementById("periodo"+i+"-disciplina"+j+"-mencao").value);
            
            if(mencao != -1 && numCreditos != -1) {
                totalDisciplinas++;
                 
                numeradorIra += mencao * parseInt(numCreditos) * Math.min(6, i);
                denominadorIra += parseInt(numCreditos) * Math.min(6, i);

                numeradorMp += mencao * parseInt(numCreditos);
                denominadorMp += parseInt(numCreditos);
            }
        }
    }

    var ira = numeradorIra / denominadorIra;
    var mp = numeradorMp / denominadorMp;

    if(ira != NaN && ira >= 0 && mp != NaN && mp >= 0)
        document.getElementById("ira-mp").innerText = "IRA: " + ira.toFixed(4) + " MP: " + mp.toFixed(4);
    
}

document.getElementById('container').onchange = function() {
    calculaIRA();
}

function removeDisciplina() {
   
    if(typeof(this.id) != 'undefined') {
        numPeriodo = parseInt(this.id.split('-')[1]);
        numDisciplina = parseInt(this.id.split('-')[2]);
    }   

    var divPeriodo = document.getElementById('periodo'+numPeriodo);
    
    if(numDisciplina > 1) {
        // só removemos a disciplina atual
       
        divPeriodo.removeChild(document.getElementById('periodo'+numPeriodo+"-disciplina"+numDisciplina))
        
        // criamos os botões na disciplina de cima
        numDisciplina = numDisciplina - 1;

        var divDisciplina = document.getElementById("periodo"+numPeriodo+"-disciplina"+numDisciplina);
        var divButton = document.createElement("div");
        divButton.setAttribute("class", "col-sm");
        divButton.setAttribute("id", "divButton-"+numPeriodo+"-"+numDisciplina);

        divButton.appendChild(criaBotaoAdicionar(numPeriodo, numDisciplina));
        divButton.appendChild(criaBotaoRemover(numPeriodo, numDisciplina));
        divDisciplina.appendChild(divButton)
    } else if(numPeriodo > 1) {
        // removemos o período
        var divContainer = document.getElementById('container');
        divContainer.removeChild(divPeriodo);

        // renomeio os períodos
   
        var periodos = divContainer.children;

        // pulo o primeiro pois ele é a linha superior
        for(var i = 1; i < periodos.length; i++) {
            periodos[i].id = "periodo"+i;

            // cada período tem um h3 e divs com disciplinas;
            var disciplinas = periodos[i].children;
            disciplinas[0].innerText = i+"º Período";
            
            for(var j = 1; j < disciplinas.length; j++) {
                disciplinas[j].id = "periodo"+i+"-disciplina"+j;

                // dentro de cada disciplina há 2 ou três divs (três quando há botões)

                var camposDisciplina = disciplinas[j].children;

                for(var k = 0; k < camposDisciplina.length; k++) {
                    if(k == 2) {
                        // há dois botões como filho
                        camposDisciplina[k].id = "divButton-"+i+"-"+j;

                        var botoes = camposDisciplina[k].children;
                        botoes[0].id = "adicionarDisciplina-"+i+"-"+j;                        
                        botoes[1].id = "removerDisciplina-"+i+"-"+j;
                    } else {
                        // há um select como filho

                        camposDisciplina[k].children[0].id = "periodo"+i+"-disciplina"+j+"-";

                        if(k == 0) {
                            camposDisciplina[k].children[0].id += "creditos";
                        } else {
                            camposDisciplina[k].children[0].id += "mencao";
                        }
                    }
                }
            }
        }

     
    }
    calculaIRA();
}

function criaBotaoAdicionar(numPeriodo, numDisciplina) {
    var botaoAdicionar = document.createElement("button");
    botaoAdicionar.setAttribute("id", "adicionarDisciplina-"+numPeriodo+"-"+numDisciplina);
    botaoAdicionar.setAttribute("class", "btn btn-primary");
    botaoAdicionar.innerText = "Adicionar Disciplina";
    botaoAdicionar.onclick = criaDisciplina;

    return botaoAdicionar;
}

function criaBotaoRemover(numPeriodo, numDisciplina) {
    var botaoRemover = document.createElement("button");
    botaoRemover.setAttribute("id", "removerDisciplina-"+numPeriodo+"-"+numDisciplina);
    botaoRemover.setAttribute("class", "btn btn-danger");
    botaoRemover.innerText = "Remover Disciplina";
    botaoRemover.onclick = removeDisciplina;

    return botaoRemover;
}

function criaDisciplina(salva=false, numPeriodo = -1, numDisciplina = -1, dados=[]) {
    var container = document.getElementById("container");
  
    if(salva !== MouseEvent) {
        numPeriodo = container.childElementCount-1;

        if(typeof(this.id) != 'undefined')
            numPeriodo = parseInt(this.id.split("-")[1]);

        numDisciplina = document.getElementById("periodo"+numPeriodo).childElementCount-1;
    } 

    var botaoAdicionar = document.getElementById("adicionarDisciplina-"+numPeriodo+"-"+numDisciplina);
    var divBotao = document.getElementById("divButton-"+numPeriodo+"-"+numDisciplina)

    // removo os botoes da disciplina de cima
    if(typeof(botaoAdicionar) != 'undefined' && botaoAdicionar != null)
        botaoAdicionar.remove();
    if(typeof(divBotao) != 'undefined' && divBotao != null)
        divBotao.remove();

    var entradaCreditos = document.createElement('select');
    entradaCreditos.setAttribute("id", "periodo"+numPeriodo+"-disciplina"+(numDisciplina+1)+"-creditos");
    entradaCreditos.setAttribute("class", "form-select");
    

    var textosCreditos = ["Créditos", "2", "4", "6"];
    var valoresCreditos = [-1, 2, 4, 6];

    for(var i = 0; i < 4; i++) {
        var selecione = document.createElement('option')
        selecione.innerText = textosCreditos[i];
        selecione.value = valoresCreditos[i]
        entradaCreditos.appendChild(selecione)
    }

    var entradaMencao  = document.createElement("select");
    entradaMencao.setAttribute("id", "periodo"+numPeriodo+"-disciplina"+(numDisciplina+1)+"-mencao");
    entradaMencao.setAttribute("class", "form-select");

    var mencoes = ["Menção", "SR", "II", "MI", "MM", "MS", "SS"];

    for(var i = 0; i < 7; i++) {
        var opcaoMencao = document.createElement("option");
        opcaoMencao.innerText = mencoes[i];
        opcaoMencao.value = i-1; // o "menção" deve ter valor -1
        entradaMencao.appendChild(opcaoMencao);
    }

    // +1 pois é a próxima disciplina
    var botaoAdicionar = criaBotaoAdicionar(numPeriodo, numDisciplina + 1);
    var botaoRemover = criaBotaoRemover(numPeriodo, numDisciplina + 1);
    
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

    if(salva == true) {


        entradaCreditos.selectedIndex = dados[0];
        entradaMencao.selectedIndex = dados[1];
        
    }

    divColDisciplina.appendChild(entradaCreditos);
    divColCreditos.appendChild(entradaMencao);

    divButton.appendChild(botaoAdicionar);
    divButton.appendChild(botaoRemover);

    divDisciplinaNova.appendChild(divColDisciplina);
    divDisciplinaNova.appendChild(divColCreditos);
    divDisciplinaNova.appendChild(divButton);

    var divPeriodo = document.getElementById("periodo"+numPeriodo);
    divPeriodo.appendChild(divDisciplinaNova);

}

function criaPeriodo(salvo=false) {
    var numPeriodo = document.getElementById("container").childElementCount;
    var divContainer = document.getElementById("container");

    var divNovoPeriodo = document.createElement("div");
    divNovoPeriodo.setAttribute("id", "periodo"+numPeriodo);

    var titulo = document.createElement("h3");
    titulo.innerText = numPeriodo + "º Período";

    divNovoPeriodo.appendChild(titulo);
    divContainer.appendChild(divNovoPeriodo);

    if(salvo == false)
        criaDisciplina();
}

