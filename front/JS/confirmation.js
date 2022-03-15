console.log(new URL(location.href).searchParams.get('id-order'));

//Ecrit l'id order en le récuperant dans l'url
document.getElementById("orderId").innerHTML = new URL(location.href).searchParams.get('id-order')