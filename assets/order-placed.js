$(document).ready(() => {
    document.body.classList.add('js-loading');
    window.addEventListener("load", showPage, false);
    function showPage() {
        document.body.classList.remove('js-loading');
        let icon = $('#check-icon')
        icon.addClass('order-animation')
    }

    localStorage.setItem('cart-items', JSON.stringify([]))

    $('#cart').click(() => {
        location.assign('./checkout.html')
    })
})