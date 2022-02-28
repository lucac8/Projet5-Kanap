/* RECUPERATION DE L'ID DU PRODUIT */ 
let idProduit = new URL(location.href).searchParams.get('id');
console.log(idProduit);

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
            let produitCouleur = document.createElement('option');
            document.getElementById("colors").appendChild(produitCouleur);
            produitCouleur.setAttribute("value" , `${couleur}`);
            produitCouleur.innerHTML = couleur ; 
        }
    })
}).catch(function(error) { 
    console.log('Erreur dans la récupération du produit')
});




addToCart.onclick = () => {

    let objProduit = {
        id : idProduit,
        quantite :  document.getElementById("quantity").value , 
        couleur : document.getElementById("colors").value ,
    };

    if(objProduit.quantite <= 0 || objProduit.quantite>100 )
    return alert('Choisir une quantité') ;
    
    if(objProduit.couleur == "")
    return alert('Choisir une couleur');

    console.log(objProduit);

    let panierActuel = JSON.parse(localStorage.getItem("panier"));  /* Retourne true si le localstorage a deja des elems donc applique le if */ 
    let arrayProduit = [];

    if(panierActuel)  {  

        // Test pour savoir si le produit est deja present dans le panier 
        let rechercheProduit = panierActuel.find(x => x.id == objProduit.id && x.couleur == objProduit.couleur); //Renvoie un objet 

        if(rechercheProduit) {
            console.log("test");
            console.log(rechercheProduit);
            objProduit.quantite = rechercheProduit.quantite + objProduit.quantite;
            console.log(objProduit) ;

        }else{
            //Si panier deja creer mais nv produit  
            panierActuel.push(objProduit);
            localStorage.setItem("panier", JSON.stringify(panierActuel));
            console.log("Ajout produit au panier");
        }

    }else{
        //Si panier vide 
        arrayProduit.push(objProduit);
        localStorage.setItem("panier", JSON.stringify(arrayProduit));
        console.log("Panier etait vide");
    }
}

    
    




