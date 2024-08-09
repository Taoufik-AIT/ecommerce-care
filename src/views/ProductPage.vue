<template>
  <div v-if="product" class="product-page" :key="product.id">
    <div class="product-main">
      <div class="product-gallery">
        <div class="main-image-container">
          <img :src="currentImage" :alt="product.name" class="main-image">
        </div>
        <div class="thumbnail-images">
          <div 
            class="thumbnail-container" 
            @click="setCurrentImage(product.mainImage)"
          >
            <img :src="product.mainImage" :alt="product.name" class="thumbnail-image">
          </div>
          <div 
            v-for="(image, index) in product.additionalImages" 
            :key="index" 
            class="thumbnail-container" 
            @click="setCurrentImage(image)"
          >
            <img :src="image" :alt="product.name" class="thumbnail-image">
          </div>
        </div>
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-price">{{ formatPrice(product.price) }} €</p>
        <p class="product-description">{{ product.description }}</p>
        <div class="quantity-selector">
          <button @click="decreaseQuantity">-</button>
          <input type="number" v-model.number="quantity" min="1" :max="product.stock">
          <button @click="increaseQuantity">+</button>
        </div>
        <button @click="addToCart" class="add-to-cart-button" :disabled="!canAddToCart">
          ADD TO CART
        </button>
        <p v-if="!canAddToCart" class="stock-warning">Out of stock</p>
      </div>
    </div>
    
    <SimilarProducts 
      :currentProductId="product.id"
      :currentProductCategory="product.category"
    />
  </div>
  <div v-else-if="loading" class="loading">Loading...</div>
  <div v-else class="error-message">Product not found</div>

  <!-- Ajout du footer -->
  <Footer />
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import SimilarProducts from '@/components/ecommerce/SimilarProducts.vue';
import Footer from '@/components/ecommerce/footer/Footer.vue'; // Importation du footer



export default {
  name: 'ProductPage',
  components: {
    SimilarProducts,
    Footer // Déclaration du footer comme composant
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const loading = ref(true);
    const quantity = ref(1);
    const currentImage = ref('');
    window.scrollTo(0, 0);

    const product = computed(() => store.getters.getProductById(Number(route.params.id)));
    const canAddToCart = computed(() => product.value && product.value.stock > 0);

    watch(product, (newProduct) => {
      if (newProduct) {
        currentImage.value = newProduct.mainImage;
        loading.value = false;
      }
    }, { immediate: true });

    const formatPrice = (price) => price.toFixed(2);

    const setCurrentImage = (image) => {
      currentImage.value = image;
    };

    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    const increaseQuantity = () => {
      if (quantity.value < product.value.stock) {
        quantity.value++;
      }
    };

    const addToCart = () => {
      if (canAddToCart.value) {
        store.dispatch('addToCart', { product: product.value, quantity: quantity.value });
      }
    };

    return {
      product,
      loading,
      quantity,
      canAddToCart,
      currentImage,
      formatPrice,
      setCurrentImage,
      decreaseQuantity,
      increaseQuantity,
      addToCart
    };
  }
};
</script>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.product-main {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
}

.product-gallery, .product-info {
  flex: 1 1 400px;
}

.main-image-container {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.main-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-images {
  display: flex;
  gap: 10px;
}

.thumbnail-container {
  flex: 1;
  padding-bottom: 25%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.thumbnail-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  font-size: 24px;
  margin-bottom: 20px;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.product-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.quantity-selector button {
  width: 30px;
  height: 30px;
  background: #f0f0f0;
  border: none;
  cursor: pointer;
}

.quantity-selector input {
  width: 50px;
  text-align: center;
  margin: 0 10px;
}

.add-to-cart-button {
  width: 100%;
  padding: 15px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover:not(:disabled) {
  background-color: #333;
}

.add-to-cart-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.stock-warning {
  color: #ff4d4d;
  margin-top: 10px;
}

.loading, .error-message {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

@media (max-width: 768px) {
  .product-main {
    flex-direction: column;
  }
}
</style>