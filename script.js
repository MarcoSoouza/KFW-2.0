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
        if (cart.length === 0) {
            alert('Carrinho vazio!');
            return;
        }

        const address = document.getElementById('address-input').value.trim();
        if (!address) {
            alert('Por favor, informe o endereço de entrega.');
            return;
        }

        // Generate WhatsApp message
        let message = 'Olá! Gostaria de finalizar a compra dos seguintes itens:\n\n';
        cart.forEach(item => {
            message += `- ${item.name}: R$ ${item.price}\n`;
        });
        message += `\nTotal: R$ ${document.getElementById('cart-total').textContent}\n`;
        message += `Endereço de entrega: ${address}\n\n`;
        message += 'Aguardo confirmação do pedido.';

        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/5511932282468?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Clear cart and close modal
        cart = [];
        updateCart();
        document.getElementById('address-input').value = '';
        modal.style.display = 'none';
    });

    // Initial cart update
    updateCart();
});
