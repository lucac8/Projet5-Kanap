fetch('http://localhost:3000/api/products').then(function(result) {

    result.json().then(function(data) {
        console.log(data);

        let htmlContent = "";

        for (let produits of data) {
            
            htmlContent +=` 
            <a href="./product.html?id=${produits._id}"> 
                <article>
                    <img src="${produits.imageUrl}" alt="${produits.altTxt}">
                    <h3 class="productName">${produits.name}</h3>
                    <p class="productDescription">${produits.description}</p>
                </article>
            </a> ` 

            /*

            // CREATION DES ELEMENTS / CLASS 
            let produitLink = document.createElement('a');
            let produitArticle = document.createElement('article');
            let produitImg = document.createElement('img');
            let produitName = document.createElement('h3'); 
            produitName.classList.add("productName");
            let produitDescription = document.createElement('p');
            produitDescription.classList.add("productDescription")
            
            // AJOUT DANS LE HTML A LENDROIT VOULU 
            
            document.getElementById("items").appendChild(produitLink);
            produitLink.appendChild(produitArticle);
            produitArticle.appendChild(produitImg);
            produitArticle.appendChild(produitName);
            produitArticle.appendChild(produitDescription);

            // AJOUT DES DONNEES DE L'API

            produitLink.href = `product.html?id=${produit._id}`;
            produitImg.src = produit.imageUrl ;
            produitImg.alt = produit.altTxt ; 
            produitName.innerHTML = produit.name ; 
            produitDescription.innerHTML = produit.description ; 
            */
        }
        document.getElementById('items').innerHTML = htmlContent; 
    })
}).catch(function(error) { 
    console.log('Erreur dans la récupération des produits')
});


