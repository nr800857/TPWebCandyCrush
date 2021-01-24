// 1 On définisse une sorte de "programme principal"
// le point d'entrée du code qui sera appelée dès que la
// page ET SES RESSOURCES est chargée

window.onload = init;

let grille;
let secondes = 0;
let minutes = 0; 

function init() {
  console.log("Page et ressources prêtes à l'emploi");
  // appelée quand la page et ses ressources sont prêtes.
  // On dit aussi que le DOM est ready (en fait un peu plus...)
  setInterval("timer()", 1000);
  grille = new Grille(9, 9);
  grille.showCookies();
}

//Fonction pour afficher le temps
function timer(){
  //Mettre un 0 devant les secondes si elles sont inférieurs à 10
  if(secondes<10){
    document.getElementById("infos").firstElementChild.textContent = "Temps : " + minutes + ":0" + secondes;
  }
  else{
    document.getElementById("infos").firstElementChild.textContent = "Temps : " + minutes + ":" + secondes;
  }
  
  if(secondes === 60) {
    secondes = 0;
    minutes++;
  }
  else {
    secondes++;
  }
  
}