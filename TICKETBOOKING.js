
if (document.readyState == 'loading') {                                          //checks if HTML and CSS has loaded.
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
function start(){                                                               
    var quantityeb = document.getElementsByClassName('quantity');               
    for (var i = 0; i < quantityeb.length; i++) {                           
        var input = quantityeb[i];
        input.addEventListener('change', quantityChanged);
    }
}
var nm = document.getElementById('name');                                 //checks if name is filled
nm.addEventListener('input', checkNm);
function checkNm(){
  if(nm.value.length<1){
    swal('Please enter your name');
    nm.value = "";
  }
}

var phno = document.getElementById('phno');                            //checks if phone number is a 10 digit number
phno.addEventListener('input', checkPhNo);
function checkPhNo(){
  if(isNaN(phno.value)|| phno.value.length>10){
    swal('Invalid Phone Number');
    phno.value = "";
  }
}
var email = document.getElementById('email');                          //checks if the entered id is a valid email id
email.addEventListener('input', checkEmail);
function checkEmail() {  

  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;  
  if (!filter.test(email.value)) {  
      swal('Please provide a valid email address');  
      email.value="";
      email.focus;  
      return false;  
  }  
}   
var submitButton = document.getElementById('btn');                     //displays message on submitting 
submitButton.addEventListener('click', submitfn);
function submitfn(){
  swal({
    title: "Submitted",
    text: "Thanks for Submitting",
    icon: "success",
  }).then(function(){
    window.open("payment.html");
  });
  
}

function quantityChanged(event) {                                               //checks if the quantity is greater than 0 and less than 200
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
            input.value = 0;
    }
    else if(input.value>=200){
      swal("We appreciate your enthusiasm but we're limited on stock right now :/");
      input.value = 200;
    }
    updateTotal();
}
function updateTotal() {      
    var tbl=document.getElementsByClassName('tbl')[0];                                                   //function to update total after quantity is changed 
    var eb = tbl.getElementsByClassName('a1');
    var total = 0;
    for(var i=0; i<eb.length ; i++)
    {
        var a = eb[i];
        var priceelem = a.getElementsByClassName('price')[0];
        var qtyelem = a.getElementsByClassName('quantity')[0]; 
        var price = parseFloat(priceelem.innerText.replace('$',''));
        var qty = qtyelem.value;
        total = total + (price*qty);
    }
    document.getElementById('total').innerText = '$' + total
}
