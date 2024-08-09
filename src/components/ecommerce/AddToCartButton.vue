<template>
  <div class="add-to-cart-container" v-if="product">
    <input 
      v-model.number="quantity" 
      type="number" 
      min="1" 
      :max="product.stock" 
      class="quantity-input"
    >
    <button 
      @click="addToCart" 
      class="add-to-cart-btn" 
      :disabled="!canAddToCart"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AddToCartButton',
  props: {
    buttonText: {
      type: String,
      default: 'Ajouter au panier'
    },
    product: {
      type: Object,
      required: true
    },
    currentCartQuantity: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const store = useStore()
    const quantity = ref(1)

    const canAddToCart = computed(() => {
      return props.product && 
             quantity.value > 0 && 
             quantity.value <= (props.product.stock - props.currentCartQuantity);
    })

    const addToCart = () => {
      if (canAddToCart.value) {
        store.dispatch('addToCart', { product: props.product, quantity: quantity.value })
        quantity.value = 1 // Reset quantity after adding to cart
      }
    }

    return {
      quantity,
      canAddToCart,
      addToCart
    }
  }
}
</script>

<style scoped>
.add-to-cart-btn {
  background-color: #3ab64c;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.quantity-input {
  width: 50px;
  padding: 5px;
  margin-right: 10px;
}
</style>