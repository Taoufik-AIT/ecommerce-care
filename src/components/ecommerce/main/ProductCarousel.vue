<template>
  <div class="featured-products">
    <h2>{{ title }}</h2>
    <div class="carousel-container">
      <div class="products-row" ref="productsRow">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="favorite-button" @click.stop="toggleFavorite(product.id)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="heart-icon" :class="{ 'is-favorite': isFavorite(product.id) }">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <router-link :to="{ name: 'Product', params: { id: product.id.toString() } }" class="product-link">
            <div class="product-image-container">
              <img :src="product.mainImage" :alt="product.name" class="product-image">
              <div class="product-overlay">
                <p class="product-description">{{ product.description }}</p>
                <button 
                  @click.prevent="addToCart(product)"
                  class="add-to-cart-button"
                  :disabled="product.stock === 0"
                >
                  {{ product.stock === 0 ? 'INDISPONIBLE' : 'AJOUTER AU PANIER' }}
                </button>
              </div>
            </div>
            <div class="product-info">
              <div class="product-name-price">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-price">{{ formatPrice(product.price) }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="nav-button-container">
        <button class="nav-button prev" @click="prevSlide">&lt;</button>
        <button class="nav-button next" @click="nextSlide">&gt;</button>
      </div>
    </div>
    <button @click="$emit('shop')" class="shop-now-button">Shop Now</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { gsap } from 'gsap'

export default {
  name: 'ProductCarousel',
  props: {
    title: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const productsRow = ref(null)

    const isFavorite = (productId) => store.getters.isFavorite(productId)

    const toggleFavorite = (productId) => {
      store.dispatch('toggleFavorite', productId)
    }

    const addToCart = (product) => {
      if (product.stock > 0) {
        store.dispatch('addToCart', { product, quantity: 1 })
      }
    }

    const formatPrice = (price) => `${price.toFixed(2)} €`

    const animateSlide = (direction) => {
      const slideWidth = productsRow.value.children[0].offsetWidth + 20 // 20 is the gap
      const targetX = direction === 'next' ? -slideWidth : slideWidth

      gsap.to(productsRow.value, {
        x: `+=${targetX}`,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (direction === 'next') {
            productsRow.value.appendChild(productsRow.value.firstElementChild)
          } else {
            productsRow.value.prepend(productsRow.value.lastElementChild)
          }
          gsap.set(productsRow.value, { x: 0 })
        }
      })
    }

    const nextSlide = () => animateSlide('next')
    const prevSlide = () => animateSlide('prev')

    onMounted(() => {
      gsap.set(productsRow.value, { x: 0 })
    })

    return {
      productsRow,
      isFavorite,
      toggleFavorite,
      addToCart,
      formatPrice,
      nextSlide,
      prevSlide
    }
  }
}
</script>

<style scoped>
/* Styles précédents inchangés */

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

/* Reste des styles inchangés */
</style>  
  <style scoped>
  @font-face {
    font-family: 'satoshi';
    src: url('/public/fonts/Satoshi-Medium.otf') format('opentype');
  }
  
  .featured-products {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: satoshi, sans-serif;
  }
  
  .featured-products h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .carousel-container {
    position: relative;
    overflow: hidden;
  }
  
  .products-row {
    display: flex;
    gap: 20px;
  }
  
  .product-card {
    position: relative;
    flex: 0 0 calc(25% - 15px);
    max-width: 300px;
  }
  
  .product-link {
    text-decoration: none;
    color: inherit;
  }
  
  .product-image-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 100%;
  }
  
  @media (max-width: 768px) {
    .product-image-container {
        width: 200px;
    }
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
  
  .product-name {
    font-size: 14px;
    margin: 0;
    text-transform: uppercase;
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
  
  .nav-button {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid #000;
    border-radius: 100px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    cursor: pointer;
    font-size: 18px;
    z-index: 10;
  }
  
  .nav-button-container {
  
    display: flex;
    justify-content: end;
    gap: 4px;
    margin-top: 20px;
    width: 100%;
    
  }
  
  .shop-now-button {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  border: 1px solid #000;
  cursor: pointer;
  font-size: 16px;
  color: #000; /* Assure-toi que la couleur du texte initial est bien définie */
  transition: background-color 0.3s ease, color 0.3s ease; /* Ajoute une transition douce */
}

.shop-now-button:hover {
  background-color: #000;
  color: #F4F4F4;
}
  </style>