//Récupération de données provenant de différents produits et affichage de celles-ci
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
        }
        document.getElementById('items').innerHTML = htmlContent; 
    })
}).catch(function(error) { 
    alert('Erreur dans la récupération des produits')
});


