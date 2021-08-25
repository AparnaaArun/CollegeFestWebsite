if (document.readyState == 'loading') {                                          //checks if HTML and CSS has loaded.
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')       
    for (var i = 0; i < removeCartItemButtons.length; i++) {                    //loop to set event listeners for all remove buttons
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')     
    for (var i = 0; i < quantityInputs.length; i++) {                           //loop to set event listeners for all quantity change.
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')     
    for (var i = 0; i < addToCartButtons.length; i++) {                         //loop to set event listeners for all addToCart buttons.
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);      //adds event listener for purchase button.
}

function purchaseClicked() {           
    swal({
        title: "Purchase Clicked",
        text: "Are you sure you want to redirect to payment page?",
        icon: "success",
        button: "YESSS",
      }).then(function(){
          window.location = "payment.html"
      });                                                                      //function to alert and removechild after purchase is clicked.
    var cartItems = document.getElementsByClassName('cart-items')[0];       
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
     
}

function removeCartItem(event) {                                                //function to remove cart item.
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {                                               //function to change quantity.
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    else if(input.value>20){
        swal("We appreciate your enthusiasm but we're limited on stock right now :/");
        input.value = 20;
    }
    updateCartTotal();
}

function addToCartClicked(event) {                                               //function that gets triggered when addToCartButton is clicked.
    var button = event.target;  
    var shopItem = button.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {                                  //function to add item to cart.
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            swal('Oops! This item has already been added to the card :/');
            return;
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn1 btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);;
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {                                                            //function to update card total after quantity is changed or when elements are added or removed.
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
