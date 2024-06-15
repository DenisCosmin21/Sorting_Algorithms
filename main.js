let vizualizare = document.getElementsByClassName('linii')[0];
let element = "";
let V = [];
let copy = [];
let n = 40;
var i;
var j;
var poz = -1;
var schimbare;
var ongoing = false;
var run = false;
var o = 0;
let functie = "";
let green = [];

function setColor(nume){
    document.getElementById(nume).style.backgroundColor = "#b9b9b9";
}

function choose(name){
    document.getElementById('titlu').innerHTML = `${name}`;
    if(functie != ""){
        document.getElementById(functie).style.backgroundColor = "#e7e7e7";
    }
    functie = name;
    setColor(functie);
}

function generare(){
    console.log(ongoing);
    if(ongoing == false){
        for(i = 0;i < n;i++){
            V[i] = Math.floor(Math.random() * 100);
            for(j = 0;j < i;j++){
                if(V[i] == V[j] || V[i] == 0){
                    i--;
                    break;
                }
            }
            copy[i] = V[i];
        }
    }
    else{
        for(i = 0;i < n;i++){
            V[i] = copy[i];
        }
    }
    Afisare();
}

function bigger(a, b){
    return a<b;
}

function Inter_Schimbare(a, b){
    let copie = V[a];
    V[a] = V[b];
    V[b] = copie;
    
    document.getElementById(a).style.height = `${3 * V[a]}px`;
    document.getElementById(b).style.height = `${3 * V[b]}px`;
}

function Afisare(){
    element = "";
    for(i = 0;i < n;i++){
        element += `<div class="linie" id="${i}" style="height:${3 * V[i]}px"></div>`;
    }
    vizualizare.innerHTML = `${element}`;
}

function reset(){
    console.log(ongoing)
    for(let p = 0;p < 100;p++){
        clearInterval(p);
    }
    generare();
    ongoing = false;
}

function start(){
    if(functie == 'Selection-Sort'){
        Selection_Sort();
    }
    else if(functie == 'Bubble-Sort'){
        Bubble_Sort();
    }
    else if(functie == 'Insertion-Sort'){
        Insertion_Sort();
    }
}

function stop() {
    if(ongoing == true){
        reset();
    }
}

function Selection_Sort(){
    if(ongoing == true){
        reset();
    }
    ongoing = true;
    i = -1;
    let interval = setInterval(function() {
        if(i < n - 1){
            j = i+1;
            min = 100000;
            let interval2 = setInterval(function() {
                if(j > i+1 && j > poz+1){
                    document.getElementById(j-1).style.backgroundColor = "blue";
                }
                if(j < n){
                    document.getElementById(j).style.backgroundColor = "pink";
                    if(bigger(V[j], min)){
                        if(poz >=0 && poz != i-1){
                            document.getElementById(poz).style.backgroundColor = "blue"
                        }
                        poz = j;
                        min = V[j];
                        document.getElementById(poz).style.backgroundColor = "red";
                    }
                    j++;
                }
                else{
                    if(i != poz){
                        Inter_Schimbare(i, poz);
                        document.getElementById(poz).style.backgroundColor = "blue";
                    }
                    document.getElementById(i).style.backgroundColor = "green";
                    clearInterval(interval2);
                }
            },100);
            i++;
        }
        else{
            clearInterval(interval);
        }
    }, 105 * n);
    
}

function Bubble_Sort(){
    if(ongoing == true){
        reset();
    }
    ongoing = true;
    i = 0;
    let interval = setInterval(function() {
        if(i < n){
            j = 0;
            schimbare = false;
            let interval2 = setInterval(function(){
                    if(j < n - i){
                        if(j > 0){
                            document.getElementById(j - 1).style.backgroundColor = "blue";
                        }
                        document.getElementById(j).style.backgroundColor = "pink";
                        document.getElementById(j+1).style.backgroundColor = "red";
                        if(V[j] > V[j+1]){
                            Inter_Schimbare(j, j+1);
                            schimbare = true;
                        }
                        j++
                    }
                    else{
                        document.getElementById(n - i).style.backgroundColor = "green";
                        document.getElementById(n - i - 1).style.backgroundColor = "blue";
                        if(schimbare == false){
                            for(let j = 0;j < n - i;j++){
                                document.getElementById(j).style.backgroundColor = "green";
                            }                
                            clearInterval(interval);
                        }
                        clearInterval(interval2);
                    }
            },100);
            i++;
        }
        else{
            for(let j = 0;j < n - i;j++){
                document.getElementById(j).style.backgroundColor = "green";
            }
            clearInterval(interval);
        }
    },105 * n);
    
}

function Insertion_Sort() {
        if(ongoing == true){
            reset();
        }
        ongoing = true;
        i = 0;
        let interval = setInterval(function(){
            console.log(i);
            i++;
            if(V[0] < V[1]){
                green[0] = true;
            }
            if(i < n){
                j = i - 1;
                let k = i + 1;
                document.getElementById(i).style.backgroundColor = "red";
                let interval2 = setInterval(function() {
                    if((V[i] < V[j]) && j >= 0){
                        if(j + 1 != i){
                            document.getElementById(j+1).style.backgroundColor = "blue";
                        }
                        document.getElementById(j).style.backgroundColor = "pink";
                        j--;
                    }
                    else{
                        document.getElementById(j+1).style.backgroundColor = "blue";
                        j++;
                        let copy = V[i];
                        if(j != i){
                            let interval3 = setInterval(function() {
                                k--;
                                if(k > j){
                                    V[k] = V[k-1];
                                    green[j] = green[j-1];
                                    document.getElementById(k).style.backgroundColor = "pink";
                                    document.getElementById(k).style.height = `${3 * V[k]}px`;
                                }
                                else{
                                    V[j] = copy;
                                    for(let o = 0;o <= i;o++){
                                        document.getElementById(o).style.backgroundColor = "green";
                                    }
                                    document.getElementById(j).style.height = `${3 * V[j]}px`;
                                    console.log(V[j], V[i]);
                                    clearInterval(interval3);
                                }
                            },15);
                        }
                        else{
                            for(let o = 0;o <= i;o++){
                                document.getElementById(o).style.backgroundColor = "green";
                            }
                        }
                        clearInterval(interval2);
                    }
                },16 * k)
            }
            else{
                clearInterval(interval);
            }
            console.log(V);
        },15 * 15 * 10 * n);
}
