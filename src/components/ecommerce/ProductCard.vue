<template>
  <div class="product-card">
    <div class="favorite-button" @click.stop="toggleFavorite">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="heart-icon" :class="{ 'is-favorite': isFavorite }">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </div>
    <router-link :to="{ name: 'Product', params: { id: id.toString() } }" class="product-link">
      <div class="product-image-container">
        <img :src="mainImage" :alt="name" class="product-image">
        <div class="product-overlay">
          <p class="product-description">{{ description }}</p>
          <button 
            @click.prevent="addToCart" 
            class="add-to-cart-button"
            :disabled="stock === 0"
          >
            {{ stock === 0 ? 'INDISPONIBLE' : 'AJOUTER AU PANIER' }}
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-name-price">
          <h2 class="product-name">{{ name }}</h2>
          <p class="product-price">{{ formattedPrice }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    mainImage: { type: String, required: true },
    description: { type: String, default: '' },
    stock: { type: Number, default: 0 }
  },
  setup(props) {
    const store = useStore()

    const formattedPrice = computed(() => `${props.price.toFixed(2)} €`)

    const isFavorite = computed(() => store.getters.isFavorite(props.id))

    const addToCart = () => {
      if (props.stock > 0) {
        store.dispatch('addToCart', { product: props, quantity: 1 })
      }
    }

    const toggleFavorite = () => {
      store.dispatch('toggleFavorite', props.id)
    }

    return {
      formattedPrice,
      isFavorite,
      addToCart,
      toggleFavorite
    }
  }
}
</script>


<style scoped>
@font-face {
  font-family: 'satoshi';
  src: url('/public/fonts/Satoshi-Medium.otf') format('opentype');
}

.product-card {
  position: relative;
  font-family: satoshi, sans-serif;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
}

.product-link {
  text-decoration: none;
  color: inherit;
}

.product-image-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 100%; /* Maintient un ratio carré */
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 5;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-description {
  color: #F4F4F4;
  margin-bottom: 10px;
  font-size: 14px;
}

.add-to-cart-button {
  background-color: transparent;
  color: #F4F4F4;
  border: 1px solid #F4F4F4;
  padding: 10px;
  width: 100%;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 12px;
}

.add-to-cart-button:hover:not(:disabled) {
  background-color: #F4F4F4;
  color: black;
}

.add-to-cart-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.product-info {
  padding: 10px 0;
}

.product-name-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.product-name {
  font-size: 14px;
  margin: 0;
  text-transform: uppercase;
  max-width: 70%;
}

.product-price {
  font-size: 14px;
  margin: 0;
  font-weight: bold;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}

.heart-icon {
  width: 20px;
  height: 20px;
  stroke: #F4F4F4;
  fill: transparent;
  transition: fill 0.3s ease, stroke 0.3s ease;
}

.heart-icon.is-favorite {
  fill: #F4F4F4;
  stroke: #F4F4F4;
}

@media (max-width: 768px) {
  .product-card {
    max-width: 100%;
  }

  .product-name, .product-price {
    font-size: 12px;
  }

  .add-to-cart-button {
    font-size: 10px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .product-description {
    font-size: 12px;
  }

  .product-name, .product-price {
    font-size: 11px;
  }

  .add-to-cart-button {
    font-size: 9px;
    padding: 6px;
  }
}
</style>