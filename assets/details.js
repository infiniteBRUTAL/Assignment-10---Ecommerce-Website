$(document).ready(() => {
    let backendData
    let id = Number(JSON.parse(localStorage.getItem('clickedId')))
    let productDisplayAll = $('#product-details-all')

    $('#cart-items-count').text(() => {
        let items = JSON.parse(localStorage.getItem('cart-items'))
        if(items === null) {
            return 0
        }
        return items.length
    })

    const addToCart = (productId) => {

        if(JSON.parse(localStorage.getItem('cart-items')) === null || JSON.parse(localStorage.getItem('cart-items')) === undefined) {
            localStorage.setItem('cart-items', JSON.stringify([]))
        }

        let cartItems = JSON.parse(localStorage.getItem('cart-items'))

        if(cartItems.length === 0) {
            cartItems.push({
                id: productId,
                quantity: 1
            })
        } 
        
        else if(cartItems.length >= 1) {
            let exists
            cartItems.map(() => {
                if(cartItems.some(cartId => cartId.id == `${productId}`)) {  
                    exists = cartItems.findIndex(x => x.id === `${productId}`)
                }
            })

            if(exists === undefined) {
                cartItems.push({
                    id: productId,
                    quantity: 1
                })
            } else if(exists >= 0) {
                cartItems[exists]['quantity'] = cartItems[exists]['quantity'] + 1
            }

        } 

        $('#cart-items-count').text(cartItems.length)

        localStorage.setItem('cart-items', JSON.stringify(cartItems))
    }

    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', (e) => {
        backendData = e
        const displayProduct = () => {
            backendData.map((e) => {
                if(e.id == id) {
    
                    let detailsImage = $('#details-img')
                    detailsImage.attr('src', e.preview)
                    detailsImage.attr('alt', e.name)
    
                    let previewImage = e.photos
    
                    let productDetailsName = $('<p>')
                    productDetailsName.attr('id', 'product-details-name')
                    productDetailsName.text(e.name)
    
                    let productDetailsBrand = $('<p>')
                    productDetailsBrand.attr('id', 'product-details-brand')
                    productDetailsBrand.text(e.brand)
    
                    let productDetailsPrice = $('<p>')
                    productDetailsPrice.attr('id', 'product-details-price')
                    productDetailsPrice.html('Price: Rs ' + '<b id="rendered-price">' + e.price + '</b>')
    
                    let productDetailsDesc = $('<div>')
                    productDetailsDesc.attr('id', 'product-details-desc')
                    let detailsDesc = $('<p>')
                    detailsDesc.attr('id', 'details-desc')
                    detailsDesc.text(e.description)
                    productDetailsDesc.append("Description", detailsDesc)
    
                    let productDetailsPreview = $('<div>')
                    productDetailsPreview.attr('id', 'product-details-preview')
                    productDetailsPreview.html('<p> Product Preview </p>')
                    let previewImageContainer = $('<div>')
                    previewImageContainer.attr('id', 'preview-container')
                    productDetailsPreview.append(previewImageContainer)

                    const previewImageTemplate = (imgSrc) => {
                        let previewImageTemplate = $('<img>')
                        previewImageTemplate.addClass('preview-images')
                        previewImageTemplate.attr('src', imgSrc)
                        $('.preview-images:first-of-type').css('border-color', '#fff')

                        previewImageTemplate.click(() => {
                            detailsImage.attr('src', imgSrc)
                            $('.preview-images').css('border-color', '#fff')
                            previewImageTemplate.css('border-color', '#009688')
                        })

                        previewImageTemplate.hover(function(){
                            previewImageTemplate.css("background-color", "#009688");
                            previewImageTemplate.css('outline', 'none')
                            previewImageTemplate.css('transform', 'scale(1.1)')
                        }, function(){
                            $(this).css("background-color", "#fff");
                            previewImageTemplate.css('transform', 'scale(1)')
                        })

                        return previewImageTemplate
                    }

                    previewImage.map((images) => {
                        previewImageContainer.append(previewImageTemplate(images))
                    } )

                    let addCartBtn = $('<button>')
                    addCartBtn.attr('id', 'add-to-cart-btn')
                    addCartBtn.text('Add to Cart')
                    addCartBtn.click(() => {
                        addToCart(e.id)
                        addCartBtn.addClass('run-animation')
                        setTimeout(() => {
                            addCartBtn.removeClass('run-animation')
                        }, 300)
                    })
                    
                    productDisplayAll.append(productDetailsName, productDetailsBrand, productDetailsPrice, productDetailsDesc, productDetailsPreview, addCartBtn)

                }
            })
        }

        displayProduct()
    } )
    
    $('#cart').click(() => {
        location.assign('./checkout.html')
    })
})