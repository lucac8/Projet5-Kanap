let arr = []; 
let panierActuel = JSON.parse(localStorage.getItem("panier"));
let productsId = [];

for(produit of panierActuel) {
  arr.push(`http://localhost:3000/api/products/${produit.id}`)
  productsId.push(produit.id)
} 
 
Promise.all(arr.map((url)=>{ //Retourne resolve pour le tableau quand pour tt les produits leurs info a ete recuperer de l'api
 
  return new Promise((resolve)=>{
    return  fetch(url)
    .then(response => response.json()).then(json => resolve(json))
  })

})).then((response)=>{
  let totQuantite = 0
  let totPrix = 0  
  let htmlContent = ""
  console.log(response)
  //Remplissage de la variable pour le html / calcul prix total et quantite total
  for(let i=0 ; i<panierActuel.length ; i++) {
    let produitCouleur = panierActuel[i].couleur 
    let produitQuantite = panierActuel[i].quantite 
    totQuantite += produitQuantite
    totPrix += response[i].price * produitQuantite 
    htmlContent += `
              <article class="cart__item" data-id="${panierActuel[i].id}" data-color="${produitCouleur}">
                  <div class="cart__item__img">
                    <img src="${response[i].imageUrl}" alt="${response[i].altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${response[i].name}</h2>
                      <p>${produitCouleur}</p>
                      <p>${response[i].price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitQuantite}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>
              `;
  }
  document.getElementById('cart__items').innerHTML = htmlContent ; 
  console.log(totPrix)
  document.getElementById('totalPrice').innerHTML = totPrix
  document.getElementById('totalQuantity').innerHTML = totQuantite
  boutonSupp()
  changeQtt()
  });

//Fonction pour supprimer un produit du panier  
function boutonSupp () {
  let btnSupp = document.querySelectorAll(".deleteItem");

  console.log(btnSupp);

  btnSupp.forEach(function (supp) { //Pour tester l'event a chauque bouton de la liste du queryselectorAll  (Chaque btn maitenant supp ecoute un event)
    supp.addEventListener("click", function() {  

      console.log(this.closest("[data-id]").dataset.id ) 
      console.log(this.closest("[data-color]").dataset.color)
      //this pour ecouter l'element puis closest pour trouver la div la plus proche avec un data-id et .dataset.id pour la recuperer
      let idSupp = this.closest("[data-id]").dataset.id ; 
      let colorSupp = this.closest("[data-color]").dataset.color;
      let indexSupp = panierActuel.findIndex( x => x.id == idSupp && x.couleur == colorSupp); //trouver le produit
      console.log(panierActuel[indexSupp])
      panierActuel.splice(indexSupp,1); //Supp le produit 
      console.log(panierActuel);
      localStorage.setItem("panier", JSON.stringify(panierActuel));
      location.reload(); //Rechager page 
    });
  });
}
//Fonction pour changer la quantite d'un produit dans le panier 
function changeQtt() {
  let btnQuantite = document.querySelectorAll(".itemQuantity");
  
  console.log(btnQuantite);

  btnQuantite.forEach(function (changeQuantite) {
    changeQuantite.addEventListener("change" , function() {

      let idChange = this.closest("[data-id]").dataset.id ; 
      let colorChange = this.closest("[data-color]").dataset.color;
      let newQuantite = parseInt(this.value);
      console.log(newQuantite);
      let indexChange = panierActuel.findIndex( x => x.id == idChange && x.couleur == colorChange);
      panierActuel[indexChange].quantite = newQuantite;
      console.log(panierActuel);
      localStorage.setItem("panier", JSON.stringify(panierActuel));
      location.reload();
    });
  });
}

//FORMULAIRE

let form = document.querySelector('.cart__order__form')
console.log()

//Ecouter le changement de chaque input du formulaire et verifier si bien rempli
form.firstName.addEventListener('change' , function() {
  validFirstName(this)
})

form.lastName.addEventListener('change' , function() {
  validLastName(this)
})

form.address.addEventListener('change' , function() {
  validAddress(this)
})

form.city.addEventListener('change' , function() {
  validCity(this)
})

form.email.addEventListener('change' , function() {
  validEmail(this)
})

//Liste fonction pour le formulaire avec chacune leurs regexp pour savoir si il est bien rempli
function validFirstName(inputFirstName) {
  let nameRegExp = new RegExp("([-,a-zA-ZÀ-ÿ. ']+[ ]*)+$" ,'g')

  if(nameRegExp.test(inputFirstName.value)) {
    console.log('bon remplissage')
    document.querySelector('#firstNameErrorMsg').innerHTML = ''
    return true
  }else{
    document.querySelector('#firstNameErrorMsg').innerHTML = 'Veuillez remplir correctement ce champ' 
  }
}

function validLastName(inputLastName) {
  let nameRegExp = new RegExp( "([-,a-zA-ZÀ-ÿ. ']+[ ]*)+$" ,'g')
  
  if(nameRegExp.test(inputLastName.value)) {
    console.log('bon remplissage')
    document.querySelector('#lastNameErrorMsg').innerHTML = ''
    return true
  }else{
    document.querySelector('#lastNameErrorMsg').innerHTML = 'Veuillez remplir correctement ce champ' 
    return false
  }
}


function validAddress(inputAdress) {

  if(inputAdress.value.length > 0) {
    console.log('bon remplissage')
    document.querySelector('#addressErrorMsg').innerHTML = ''
    return true
  }else{
    document.querySelector('#addressErrorMsg').innerHTML = 'Veuillez remplir correctement ce champ' 
    return false
  }
}

function validCity(inputCity) {
  let cityRegExp = new RegExp ("([-,a-zA-ZÀ-ÿ. ']+[ ]*)+$" , "g")

  if(cityRegExp.test(inputCity.value)) {
    console.log('bon remplissage')
    document.querySelector('#cityErrorMsg').innerHTML = ''
    return true
  }else{
    document.querySelector('#cityErrorMsg').innerHTML = 'Veuillez remplir correctement ce champ' 
    return false
  }
}

function validEmail(inputEmail) {
  //Création de l'expression régulière
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

  //Test de l'expression
  if (emailRegExp.test(inputEmail.value)) {
  console.log('bon remplissage')
  document.querySelector('#emailErrorMsg').innerHTML = ''
  return true
  }else{
  document.querySelector('#emailErrorMsg').innerHTML = 'Veuillez remplir correctement ce champ' 
  return false
  }
}

//Fonction pour que au click si formulaire bien rempli envoie les donnes a l'api et nous renvoie sur la page confiramation 
let order = document.querySelector('#order')
order.addEventListener('click' , function(event) {
  event.preventDefault()
  if(validFirstName(form.firstName) && validLastName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email) && panierActuel) {
    const data = {

      products: productsId,
      contact: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value,
      }
    }
    console.log(data)

    fetch("http://localhost:3000/api/products/order" , {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': "application/json",
        "Content-type": "application/json",
      }
    }).then(function(result) { result.json().then(function (content) {
        console.log("CONTENT", content) 
        console.log(content.orderId)
        localStorage.clear();
        window.location.href = `./confirmation.html?id-order=${content.orderId}`;
      })
    }).catch(function(error) { 
      alert('Erreur dans la récupération du produit')
    });
  }
  else{
    console.log('no')
  }
})

