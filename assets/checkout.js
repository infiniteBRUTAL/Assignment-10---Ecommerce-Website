$(document).ready(() => {
    let allItems = JSON.parse(localStorage.getItem('cart-items'))
    let productsContainer = $('#left')
    let totalPrice = 0

    $('#cart-items-count').text(() => {
        let items = JSON.parse(localStorage.getItem('cart-items'))
        if(items === null) {
            return 0
        }
        return items.length
    })

    const cartItems = (item, product) => {

        totalPrice += (item.quantity * product.price)

        let productContainer = $("<div>")
        productContainer.addClass('checkout-product-container')

        let productImage = $("<img>")
        productImage.addClass('checkout-product-image')
        productImage.attr('src', product.preview)
        productImage.attr('alt', product.name)

        let productDesc = $("<div>")
        productDesc.addClass('checkout-product-details')

        let productName = $("<p>")
        productName.addClass('checkout-product-name')
        productName.text(product.name)

        let productQuantity = $("<p>")
        productQuantity.addClass('checkout-product-quantity')
        productQuantity.text('x' + item.quantity)

        let productPrice = $("<p>")
        productPrice.addClass('checkout-product-total')
        productPrice.text(() => {
            return ('Amount:Rs ' + (item.quantity * product.price))
        })

        productDesc.append(productName, productQuantity, productPrice)
        productContainer.append(productImage, productDesc)

        console.log(totalPrice)
        return productContainer
    }

    allItems.map((item) => {
        $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + item.id, (response) => {
        productsContainer.append(cartItems(item, response))
    }).then(() => {
        let amount = $('#amount')
        amount.text(totalPrice)
        
        let totalAmount = $('#total-items-count')
        totalAmount.text('Total Items: ' + allItems.length)
    })
    })

    $('#place-order').click(() => {
        location.assign('./orderplaced.html')
    })

    $('#cart').click(() => {
        location.assign('./checkout.html')
    })
})