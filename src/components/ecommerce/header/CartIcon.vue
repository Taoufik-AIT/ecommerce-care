<template>
  <div class="cart-icon" @click="openCart">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
    <span v-if="itemCount > 0" class="item-count">{{ itemCount }}</span>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'CartIcon',
  props: {
    itemCount: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const store = useStore();

    const openCart = () => {
      store.dispatch('setCartVisibility', true);
    };

    return { openCart };
  }
};
</script>


  <style scoped>
  .cart-icon {
    position: relative;
    cursor: pointer;
  }
  
  .item-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #ff9900;
    color: white;
    border-radius: 50%;
    padding: 2px 2px;
    font-size: 12px;
    font-weight: bold;
    min-width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>