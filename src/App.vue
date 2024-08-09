<template>
  <div id="app">
    <Navbar 
      :cartItemCount="cartItemCount"
      :favoriteItemCount="favoriteItemCount"
      @toggle-cart="toggleCart"
    />
    <Notification v-if="notification" :notification="notification" />
    <router-view></router-view>
    <ShoppingCart ref="shoppingCart" />
    <Footer />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Navbar from '@/components/ecommerce/header/Navbar.vue';
import ShoppingCart from '@/components/ecommerce/ShoppingCart.vue';
import Notification from '@/components/ecommerce/Notification.vue';
import Footer from './components/ecommerce/footer/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    ShoppingCart,
    Notification,
    Footer
  },
  setup() {
    const store = useStore();
    const shoppingCart = ref(null);

    const cartItemCount = computed(() => store.getters.cartItemCount);
    const favoriteItemCount = computed(() => store.state.favorites.length);
    const notification = computed(() => store.getters.currentNotification);

    const toggleCart = () => {
      store.dispatch('setCartVisibility', !store.state.cartVisibility);
    };

    return {
      cartItemCount,
      favoriteItemCount,
      toggleCart,
      shoppingCart,
      notification
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f0f0f0;
}
</style>