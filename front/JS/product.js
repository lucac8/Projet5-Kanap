//RECUPERATION DE L'ID DU PRODUIT  
let idProduit = new URL(location.href).searchParams.get('id'); 

//Recuperation des infos produits et ajout a l'HTML
fetch(`http://localhost:3000/api/products/${idProduit}`).then(function(result) {

    result.json().then(function(data) {

        document.getElementById("title").innerHTML = data.name;
        document.getElementById("price").innerHTML = data.price ;
        document.getElementById("description").innerHTML = data.description ;
        document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}"></img>`
        for(let couleur of data.colors) {
            document.getElementById("colors").innerHTML += `<option value="${couleur}">${couleur}</option>`;
        }
    })
}).catch(function(error) { 
    alert('Erreur dans la récupération du produit')
});



//Fonction pour ajouter au localstorage 

addToCart.addEventListener('click' , function() {
    ajoutPanier()
})

function ajoutPanier() {

    let objProduit = {
        id : idProduit,
        quantite :  parseInt(document.getElementById("quantity").value) , 
        couleur : document.getElementById("colors").value ,
    };

    if(objProduit.quantite <= 0 || objProduit.quantite>100 ) //Test pour voir si la quantite selectionne est bonne (Entre 1 et 100)
    return alert('Choisir une quantité') ;
    
    if(objProduit.couleur == "") //Test pour voir si une couleur est selectionne 
    return alert('Choisir une couleur');

    let panierActuel = JSON.parse(localStorage.getItem("panier"));  
    let arrayProduit = [];

    if(panierActuel)  {  //Si le tableau panier n'est pas vide renvoie true 
        let rechercheProduit = panierActuel.findIndex(x => x.id == objProduit.id && x.couleur == objProduit.couleur); 

        if(rechercheProduit !== -1 ) { //Si recheche produit renvoie autre chose que -1 donc un produit est present
            panierActuel[rechercheProduit].quantite += objProduit.quantite;
            localStorage.setItem("panier" , JSON.stringify(panierActuel)); 
        }else{ 
            //Si panier deja creer mais nouveau produit 
            panierActuel.push(objProduit);
            localStorage.setItem("panier", JSON.stringify(panierActuel));
        }

    }else{
        //Si pas de panier ajoute produit a un tableau et cree le panier 
        arrayProduit.push(objProduit);
        localStorage.setItem("panier", JSON.stringify(arrayProduit));
    }
}


