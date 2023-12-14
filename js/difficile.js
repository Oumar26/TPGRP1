//Recuperer toutes les div
const crds= document.querySelectorAll('.card')
//randomisation
//La propriété style.order definit l'ordre de passage des conteneurs
crds.forEach(card => {
    let pos= Math.floor(Math.random() * 16);
    card.style.order= pos;
});
let flip= false;//variable booléenne pour la gestion de deux cards, true-->pour le premier click, et false pour le second
let pause=false;//une variable booléenne qui bloquera les autres cards quand deux sont selectionnés
let premierClick,deuxiemeClick;
let gameOver = false;//Pour stopper le jeux lorsqu'il perd
let gagner= false;//Pour stopper le jeux lorsqu'il gagne
let carteTrouver=0;
let nb=10;//nombre de tentatives

const doc= document.getElementById("count");
doc.innerHTML= "Coups: "+ nb;
 

//Boucle foreach pour parcourir cet array et ajouter des events
crds.forEach(card => card.addEventListener(('click'), effetFlip) );


function effetFlip(){
    if(gameOver || gagner)return ;
    if(pause) return;//il va bloquer un click sur une troisième card, pendant l'evaluation des deux premières
    if(this===premierClick) return;//Dans le cas d'un double clique sur la même carte
    this.classList.add('cliq')//creation d'une classList
    if(!flip){
        flip=true//premier clique
        premierClick= this
    }else{
        //deuxieme Clique
        flip= false;
        deuxiemeClick= this

        //Matching
        console.log(premierClick, deuxiemeClick)
        matchCard()
        nouvellePartie()
    }

}



function matchCard(){
    pause=true;
    if(premierClick.dataset.img === deuxiemeClick.dataset.img){
        premierClick.removeEventListener('click' , effetFlip)
        deuxiemeClick.removeEventListener('click', effetFlip)
        premierClick=null
        deuxiemeClick=null
        pause=false
        flip=false
        carteTrouver++
    }else{
        //Les supprimer de la classList 
        setTimeout(()=>{
            premierClick.classList.remove('cliq')
            deuxiemeClick.classList.remove('cliq')

            flip=false
            pause=false;
        }, 1000);
    }
    nb--;
    doc.innerHTML= "Coups: "+ nb
}

function nouvellePartie(){
    if(nb==0 && carteTrouver!=4){
        displayGameOver()
        gameOver = true
        }else{
            gameOver= false
        }

        if(carteTrouver==4 ||(nb==0 && carteTrouver==8)){
            displayGagner()
            gagner= true
        }else{
            gagner = false;
        }
}

//perdu
function displayGameOver(){
document.getElementById("gO").style.display = "block";
}


//gagner
function displayGagner(){
    document.getElementById("gagne").style.display = "block";
}



function reload(){
window.location.reload();
}


function menu(){
    window.location.href="level.html"
}

