class Cookie {
  static urlsImagesNormales = [
    "./assets/images/Croissant@2x.png",
    "./assets/images/Cupcake@2x.png",
    "./assets/images/Danish@2x.png",
    "./assets/images/Donut@2x.png",
    "./assets/images/Macaroon@2x.png",
    "./assets/images/SugarCookie@2x.png",
  ];
  static urlsImagesSurlignees = [
    "./assets/images/Croissant-Highlighted@2x.png",
    "./assets/images/Cupcake-Highlighted@2x.png",
    "./assets/images/Danish-Highlighted@2x.png",
    "./assets/images/Donut-Highlighted@2x.png",
    "./assets/images/Macaroon-Highlighted@2x.png",
    "./assets/images/SugarCookie-Highlighted@2x.png",
  ];

  type;
  ligne;
  colonne;
  htmlImage;

  constructor(type, ligne, colonne) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;
    this.htmlImage = document.createElement("img");
    this.htmlImage.src = Cookie.urlsImagesNormales[type];
    this.htmlImage.height = 80;
    this.htmlImage.width = 80;
    this.htmlImage.dataset.ligne = ligne;
    this.htmlImage.dataset.colonne = colonne;
    this.htmlImage.classList = "cookies";

  }

  selectionnee() {
    this.htmlImage.classList.add("cookies-selected");
    this.htmlImage.src = Cookie.urlsImagesSurlignees[this.type];
  }

  deselectionnee() {
    this.htmlImage.classList.remove("cookies-selected");
    this.htmlImage.src = Cookie.urlsImagesNormales[this.type];
  }

  supprimer() {
    this.htmlImage.classList.add("cookie-cachee");
  }

  annulerASupprimer() {
    this.htmlImage.classList.remove("cookie-cachee");
  }

  isASupprimer() {
    return this.htmlImage.classList.contains("cookie-cachee");
  }

  static swapCookies(c1, c2) {
    let srcTemp = c1.htmlImage.src;
    let typeTemp = c1.type;

    c1.htmlImage.src = c2.htmlImage.src;
    c1.type = c2.type;

    c2.htmlImage.src = srcTemp;
    c2.type = typeTemp;
  }

  /** renvoie la distance entre deux cookies */
  static distance(cookie1, cookie2) {
    let l1 = cookie1.ligne;
    let c1 = cookie1.colonne;
    let l2 = cookie2.ligne;
    let c2 = cookie2.colonne;

    const distance = Math.sqrt((c2 - c1) * (c2 - c1) + (l2 - l1) * (l2 - l1));
    console.log("Distance = " + distance);
    return distance;
  }
}
