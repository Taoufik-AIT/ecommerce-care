<template>
  <div>
    <transition name="fade">
      <div 
        v-if="isVisible" 
        class="cart-overlay"
        @click="closeCart"
      ></div>
    </transition>
    <div 
      ref="cartContainer" 
      class="shopping-cart" 
      :class="{ 'is-visible': isVisible }"
    >
      <div class="cart-header">
        <h2>CART ({{ cartItemCount }})</h2>
        <button @click="closeCart" class="close-button">CLOSE</button>
      </div>
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <router-link 
            :to="{ name: 'Product', params: { id: item.id.toString() } }" 
            class="item-link"
            @click.native="closeCart"
          >
            <img :src="item.mainImage" :alt="item.name" class="item-image">
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="item-price">${{ item.price.toFixed(2) }}</p>
            </div>
          </router-link>
          <div class="quantity-controls">
            <button @click.stop="updateQuantity(item.id, item.quantity - 1)" class="quantity-btn">-</button>
            <span>{{ item.quantity }}</span>
            <button @click.stop="updateQuantity(item.id, item.quantity + 1)" class="quantity-btn">+</button>
          </div>
          <button @click.stop="removeFromCart(item.id)" class="remove-button">×</button>
          <p v-if="item.quantity >= item.stock" class="stock-warning">Stock limité !</p>
        </div>
      </div>
      <div class="cart-footer">
        <p class="subtotal">Sous-total <span>${{ cartTotal.toFixed(2) }}</span></p>
        <button @click="checkout" class="checkout-button" :disabled="cartItems.length === 0">
          Procédez au paiement
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';

export default {
  name: 'ShoppingCart',
  setup() {
    const store = useStore();
    const router = useRouter();
    const cartContainer = ref(null);
    const isVisible = computed(() => store.state.cartVisibility);
    const cartItems = computed(() => store.state.cart);
    const cartTotal = computed(() => store.getters.cartTotal);
    const cartItemCount = computed(() => store.getters.cartItemCount);

    const updateQuantity = (productId, quantity) => {
      const item = cartItems.value.find(item => item.id === productId);
      if (quantity > 0 && quantity <= item.stock) {
        store.dispatch('updateCartQuantity', { productId, quantity });
      } else if (quantity > item.stock) {
        console.warn('Quantité demandée non disponible en stock');
      }
    };

    const removeFromCart = (productId) => {
      store.dispatch('removeFromCart', productId);
    };

    const closeCart = () => {
      store.dispatch('setCartVisibility', false);
    };

    const checkout = () => {
      if (cartItems.value.length > 0) {
        router.push('/checkout');
        closeCart();
      }
    };

    watch(isVisible, (newValue) => {
      if (newValue) {
        gsap.to(cartContainer.value, { x: 0, duration: 0.5, ease: 'power2.out' });
      } else {
        gsap.to(cartContainer.value, { x: '100%', duration: 0.5, ease: 'power2.in' });
      }
    });

    onMounted(() => {
      gsap.set(cartContainer.value, { x: '100%' });
    });

    return {
      isVisible,
      cartItems,
      cartTotal,
      cartItemCount,
      updateQuantity,
      removeFromCart,
      closeCart,
      checkout,
      cartContainer
    };
  }
};
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.shopping-cart {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 10000;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.close-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #151515;
}

.cart-items {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  color: #151515;
}

.cart-item {
  position: relative;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.item-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  margin-bottom: 10px;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
}

.item-details {
  flex-grow: 1;
}

.item-details h3 {
  margin: 0;
  font-size: 16px;
}

.item-price {
  font-weight: bold;
  margin: 5px 0;
  color: #151515b5;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.quantity-btn {
  width: 25px;
  height: 25px;
  background: #f0f0f0;
  color: #151515;
  border: none;
  cursor: pointer;
}

.remove-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #151515;
}

.stock-warning {
  color: #ff4d4d;
  font-size: 0.9em;
  margin-top: 10px;
  text-align: left;
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid #eee;
}

.subtotal {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 15px;
}

.checkout-button {
  width: 100%;
  padding: 15px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.checkout-button:hover:not(:disabled) {
  background-color: #333;
}

.checkout-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .shopping-cart {
    width: 100%;
  }
}
</style>