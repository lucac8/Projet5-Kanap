//RECUPERATION DE L'ID DU PRODUIT  
let idProduit = new URL(location.href).searchParams.get('id'); //On recuperer l'id grace au lien de la page (ajouter sur la page daccueil)
console.log(idProduit);

//Recuperation des infos produits et ajout a l'HTML
fetch(`http://localhost:3000/api/products/${idProduit}`).then(function(result) {

    result.json().then(function(data) {
        console.log(data);

        document.getElementById("title").innerHTML = data.name;
        document.getElementById("price").innerHTML = data.price ;
        document.getElementById("description").innerHTML = data.description ;

        let produitImg = document.createElement('img');
        document.getElementsByClassName("item__img")[0].appendChild(produitImg);
        produitImg.src = data.imageUrl ;
        produitImg.alt = data.altTxt ;


        for(let couleur of data.colors) {
            document.getElementById("colors").innerHTML += `<option value="${couleur}">${couleur}</option>`;
        }
    })
}).catch(function(error) { 
    alert('Erreur dans la récupération du produit')
});



//Fonction pour ajouter au localstorage 
addToCart.onclick = () => {

    let objProduit = {
        id : idProduit,
        quantite :  parseInt(document.getElementById("quantity").value) , //Parseint pour convertir la chaine de carac en chiffre 
        couleur : document.getElementById("colors").value ,
    };
    console.log(objProduit);

    if(objProduit.quantite <= 0 || objProduit.quantite>100 ) //Verif si la quantite selectionne est bonne (Entre 1 et 100)
    return alert('Choisir une quantité') ;
    
    if(objProduit.couleur == "") //Verif si une couleur est selectionne 
    return alert('Choisir une couleur');

    let panierActuel = JSON.parse(localStorage.getItem("panier"));  /* Retourne true si le localstorage a deja des elems donc applique le if */ 
    let arrayProduit = [];

    if(panierActuel)  {  

        // Test pour savoir si le produit est deja present dans le panier 
        let rechercheProduit = panierActuel.findIndex(x => x.id == objProduit.id && x.couleur == objProduit.couleur); //Renvoie -1 si rien trouver 

        if(rechercheProduit !== -1 ) { //Si recheche produit renvoie autre chose que -1 donc un produit est present
            console.log(panierActuel[rechercheProduit].quantite);
            console.log(objProduit.quantite);
            panierActuel[rechercheProduit].quantite += objProduit.quantite;
            console.log(panierActuel[rechercheProduit].quantite);
            localStorage.setItem("panier" , JSON.stringify(panierActuel)); //MAJ Localstorage
        }else{
            //Si panier deja creer mais nv produit  
            panierActuel.push(objProduit);
            localStorage.setItem("panier", JSON.stringify(panierActuel));
            console.log("Ajout produit au panier");
        }

    }else{
        //Si panier vide cree un tableau et met le premier produit
        arrayProduit.push(objProduit);
        localStorage.setItem("panier", JSON.stringify(arrayProduit));
        console.log("Panier remplie avec le 1er produit");
    }
}

    
    




