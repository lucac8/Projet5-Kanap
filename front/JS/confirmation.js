//Ajout de l'orderid dans le html recupéré dans l'url
document.getElementById("orderId").innerHTML = new URL(location.href).searchParams.get('id-order')