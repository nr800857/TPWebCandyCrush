/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
class Grille {

  tabCookie;
  cookiesCliquees = [];
  nbCookiesDifferents = 6;
  score = 0;

  constructor(l, c) {
    this.nbLignes = l;
    this.nbColonnes = c;
    this.remplirTableauDeCookies();

  }

  /**
   * parcours la liste des divs de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies() {
    let caseDivs = document.querySelectorAll("#grille div");

    caseDivs.forEach((div, index) => {
      let ligne = Math.floor(index/this.nbLignes);
      let colonne = index % this.nbColonnes;

      //console.log("On remplit le div index=" + index + " l=" + ligne + " col=" + colonne);
      let img = this.tabCookie[ligne][colonne].htmlImage;

      img.onclick = (evt) => {

        let imageCliquee = evt.target;
        const l = imageCliquee.dataset.ligne;
        const c = imageCliquee.dataset.colonne;
        let cookie = this.getCookieDepuisLC(l, c);

        if (this.cookiesCliquees.length === 0) {
            //On vient de cliquer sur le cookie de départ
            //this.cookiesCliquees[0] = this.getCookieDepuisLC(l, c); Equivalent
            this.cookiesCliquees.push(cookie);
            cookie.selectionnee();
        }
        else if(this.cookiesCliquees.length === 1){
          let cookie2 = cookie;
          this.cookiesCliquees.push(cookie2);
          cookie2.selectionnee();

          if(this.distanceCookiesSelectioneeOK()){
              this.swapCookies();
          }
            this.cookiesCliquees[0].deselectionnee();
            this.cookiesCliquees[1].deselectionnee();
            this.cookiesCliquees = [];
          
        }}


        img.ondragstart = (evt) => {
          let imageCliquee = evt.target;
          const l = imageCliquee.dataset.ligne;
          const c = imageCliquee.dataset.colonne;
          let cookieDragger = this.getCookieDepuisLC(l, c);

          this.cookiesCliquees = [];
          this.cookiesCliquees.push(cookieDragger);
          cookieDragger.selectionnee();

        }

        img.ondragover = (evt) => {
          evt.preventDefault();
        }

        img.ondragenter = (evt) => {
          //let img = evt.target;
          //img.classList.add("grilleDragOver");
        }

        img.ondragleave = (evt) => {
          //let img = evt.target;
          //img.classList.remove("grilleDragOver");
        }

        img.ondrop = (evt) => {
          let imageDropper = evt.target;
          const l = imageDropper.dataset.ligne;
          const c = imageDropper.dataset.colonne;
          let cookie2 = this.getCookieDepuisLC(l, c);

          this.cookiesCliquees.push(cookie2);
          cookie2.selectionnee();

          if(this.distanceCookiesSelectioneeOK()){
              this.swapCookies();
          }
            this.cookiesCliquees[0].deselectionnee();
            this.cookiesCliquees[1].deselectionnee();
            this.cookiesCliquees = [];
        }
      div.appendChild(img);
    });
  }

  getCookieDepuisLC(ligne, colonne){
    return this.tabCookie[ligne][colonne];
  }

  distanceCookiesSelectioneeOK() {
      if (Math.abs(this.cookiesCliquees[0].ligne - this.cookiesCliquees[1].ligne) == 1) {
          return Math.abs(this.cookiesCliquees[0].colonne - this.cookiesCliquees[1].colonne) == 0
      }
      else if ( Math.abs(this.cookiesCliquees[0].colonne - this.cookiesCliquees[1].colonne) == 1){
          return Math.abs(this.cookiesCliquees[0].ligne - this.cookiesCliquees[1].ligne) == 0
      } 
  }

  swapCookies(){
    let cookie1 = this.cookiesCliquees[0];
    let cookie2 = this.cookiesCliquees[1];
    let srcTemp = cookie1.htmlImage.src;
    let typeTemp = cookie1.type;

    cookie1.htmlImage.src = cookie2.htmlImage.src;
    cookie1.type = cookie2.type;

    cookie2.htmlImage.src = srcTemp;
    cookie2.type = typeTemp;

    do {
      this.chuteCookies();
      this.score++;
      document.getElementById("infos").children[1].textContent = "Score : " + this.score;
    } while (this.detecteTousLesAlignements());
    
    //this.detecteTousLesAlignements();
    //this.chuteCookies();
  }
  
  /**
   * Initialisation du niveau de départ. Le paramètre est le nombre de cookies différents
   * dans la grille. 4 types (4 couleurs) = facile de trouver des possibilités de faire
   * des groupes de 3. 5 = niveau moyen, 6 = niveau difficile
   *
   * Améliorations : 1) s'assurer que dans la grille générée il n'y a pas déjà de groupes
   * de trois. 2) S'assurer qu'il y a au moins 1 possibilité de faire un groupe de 3 sinon
   * on a perdu d'entrée. 3) réfléchir à des stratégies pour générer des niveaux plus ou moins
   * difficiles.
   *
   * On verra plus tard pour les améliorations...
   */
  remplirTableauDeCookies() {
    // A FAIRE
    // déclarer le tableau des cookies
    this.tabCookie = create2DArray(9);

    do {
      //console.log("ON ESSAIE DE GENERER UNE GRILLE SANS ALIGNEMENTS");
      // faire ceci tant que la condition dans le while est vraie
      //le remplir ligne par ligne et colonne par colonne
      // avec une instance de cookie dont le type est tiré
      // au hasard parmi les nbDeCookiesDifferents possibles
      for (let l = 0; l < this.nbLignes; l++) {
        for (let c = 0; c < this.nbColonnes; c++) {
          let type = Math.floor(Math.random() * this.nbCookiesDifferents);
          this.tabCookie[l][c] = new Cookie(type, l, c);
        }
      }
    } while (this.detecteTousLesAlignements());

    // on a généré une grille sans aucun alignement au départ
    console.log("GRILLE SANS ALIGNEMENTS GENEREE");
  }

  detecteTousLesAlignements() {
    this.nbAlignements = 0;

    // pour chaque ligne on va appeler detecteAlignementLigne et idem pour chaque colonne
    for (let l = 0; l < this.nbLignes; l++) {
      this.detecteAlignementLigne(l);
    }

    for (let c = 0; c < this.nbColonnes; c++) {
      this.detecteAlignementColonne(c);
    }
   
    return this.nbAlignements !== 0;
  }

  detecteAlignementLigne(ligne) {
    // on va parcourir la ligne et voir si on des alignements
    let ligneGrille = this.tabCookie[ligne];

    //console.log(ligneGrille); // ok ça, c'est le tableau des cookies sur la ligne
    // on va le parcourir de l'index 0 à l'index 6 inclu (this.nbColonnes -3);le dernier
    // triplet testé sera composé des cookies aux indexes 6, 7 et 8 (on va de 0 à 9)

    for (let l = 0; l <= this.nbColonnes - 3; l++) {
      //console.log("Je teste les indexes " + l + " " + (l + 1) + " " + (l + 2));
      let cookie1 = ligneGrille[l];
      let cookie2 = ligneGrille[l + 1];
      let cookie3 = ligneGrille[l + 2];

      if (cookie1.type === cookie2.type && cookie1.type === cookie3.type) {
        // on marque les trois
        cookie1.supprimer();
        cookie2.supprimer();
        cookie3.supprimer();
        this.nbAlignements++;
      }
    }
  }

  detecteAlignementColonne(colonne) {
    // on veut afficher les cookies situées sur une colonne donnée
    for (let ligne = 0; ligne <= this.nbLignes - 3; ligne++) {
      //console.log("On va examiner la case " + ligne + " " + colonne);
      let cookie1 = this.tabCookie[ligne][colonne];
      let cookie2 = this.tabCookie[ligne + 1][colonne];
      let cookie3 = this.tabCookie[ligne + 2][colonne];

      if (cookie1.type === cookie2.type && cookie1.type === cookie3.type) {
        // on marque les trois
        cookie1.supprimer();
        cookie2.supprimer();
        cookie3.supprimer();

        this.nbAlignements++;
      }
    }
  }

  //Recherche les cookies à supprimer et fait tomber les cookies se trouvant au dessus de celui-ci
  chuteCookies(){
    //Boucle de la matrice en partant du bas
    for(let l = this.nbLignes-1 ; l>0 ; l--){
      for(let c = 0 ; c<this.nbColonnes ; c++){
        //Si une case est à supprimer
        if(this.tabCookie[l][c].isASupprimer() && this.cookieAuDessus(l,c) != 0){
            let ligneAuDessus = 1;
            
            while(this.tabCookie[l-ligneAuDessus][c].isASupprimer()) {
            ligneAuDessus++;
            }
            Cookie.swapCookies(this.tabCookie[l-ligneAuDessus][c], this.tabCookie[l][c])
            this.tabCookie[l-ligneAuDessus][c].supprimer();
            this.tabCookie[l][c].annulerASupprimer();
        
        }
      }
    }
    this.remplirCookieSupprimer();

  }

  //Compte le nombre de cookies qui sont au dessus dans le tableau à la ligne et colonne donnée
  cookieAuDessus(l, c){
    let compteur = 0;

    for(let i = l ; i>=0 ; i-- ){
      if(!this.tabCookie[i][c].isASupprimer()){
        compteur++;
      }
    }

    return compteur;
  }

  //Remplie les case vides par de nouveaux cookies aléatoire
  remplirCookieSupprimer(){
    for(let l = this.nbLignes-1 ; l>=0 ; l--){
      for(let c = 0 ; c<this.nbColonnes ; c++){
        if(this.tabCookie[l][c].isASupprimer()){
            this.tabCookie[l][c].type = Math.floor(Math.random() * this.nbCookiesDifferents);
            this.tabCookie[l][c].htmlImage.src = Cookie.urlsImagesNormales[this.tabCookie[l][c].type];
            this.tabCookie[l][c].annulerASupprimer();
        }
      }
    }
  }


}
