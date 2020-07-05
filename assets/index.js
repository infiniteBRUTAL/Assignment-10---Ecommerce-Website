$(document).ready(function() {
    
    var productContainerClothing = $('#product-container-clothing')
    var productContainerAccessories = $('#product-container-accessories')
    var backendData
    var clothing
    var accessories

    $('#autoplay').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        draggable: true,
        useCSS: true,
    })

    $('#cart-items-count').text(() => {
        let items = JSON.parse(localStorage.getItem('cart-items'))
        if(items === null) {
            return 0
        }
        return items.length
    })

    const detailsPage = (id) => {
        localStorage.setItem('clickedId', JSON.stringify(id))
        location.assign('./assets/details.html')
    }

    const createProduct = (response) => {
        var productDetails = $('<div>')
        productDetails.addClass('product-details')
        productDetails.attr('id', response.id)

        productDetails.click(() => {
            detailsPage(productDetails.attr('id'))
        })

        var productImage = $('<img>')
        productImage.addClass('product-image')
        productImage.attr('src', response.preview)
        productImage.attr('attr', response.name)

        var aboutProduct = $('<div>')
        aboutProduct.addClass('about-product')

        var productDesc = $('<h3>')
        productDesc.addClass('product-desc')
        productDesc.text(response.name)

        var productBrand = $('<h4>')
        productBrand.addClass('product-brand')
        productBrand.text(response.brand)

        var productPrice = $('<span>')
        productPrice.addClass('product-price')
        productPrice.text('Rs ' + response.price)

        aboutProduct.append(productDesc, productBrand, productPrice)
        productDetails.append(productImage, aboutProduct)

        return productDetails
    }

    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', (e) => {
        backendData = e
        clothing = e.slice(0,5)
        accessories = e.slice(5)
        
        clothing.map((response) => {
            productContainerClothing.append(createProduct(response))
        })

        accessories.map((response) => {
            productContainerAccessories.append(createProduct(response))
        })
    })

    $('#cart').click(() => {
        location.assign('./assets/checkout.html')
    })
})