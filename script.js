document.addEventListener('DOMContentLoaded', function() {
    // O código do carrossel foi removido pois a animação agora é feita via CSS.
    // Você pode adicionar outros scripts para o site aqui.

    // Shopping Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update cart display
    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.getElementById('cart-count');
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <span>${item.name} - R$ ${item.price}</span>
                <button class="remove-item" data-index="${index}">Remover</button>
            `;
            cartItems.appendChild(itemDiv);
            total += parseFloat(item.price);
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Add to cart event listeners
    document.querySelectorAll('.btn-comprar').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            cart.push({ name, price });
            updateCart();
            alert(`${name} adicionado ao carrinho!`);
        });
    });

    // Remove from cart
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Modal functionality
    const modal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-cart');
    const cartIcon = document.getElementById('cart-icon');

    // Open cart modal
    cartIcon.onclick = function() {
        modal.style.display = 'block';
    };

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Compra finalizada! Total: R$ ' + document.getElementById('cart-total').textContent);
            cart = [];
            updateCart();
            modal.style.display = 'none';
        } else {
            alert('Carrinho vazio!');
        }
    });

    // Initial cart update
    updateCart();
});
