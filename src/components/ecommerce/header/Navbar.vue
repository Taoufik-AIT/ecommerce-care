<template>
  <nav class="navbar">
    <div class="nav-links">
  <router-link to="/" class="logo">GentleCare</router-link>
  <router-link to="/catalog"class="catalog">Catalogue</router-link>
</div>
    <div class="nav-icons">
      <router-link to="/favorites" class="icon-link" title="Favoris">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="heart-icon">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span v-if="favoriteItemCount > 0" class="badge">{{ favoriteItemCount }}</span>
      </router-link>
      <CartIcon 
        :itemCount="cartItemCount" 
        @toggle-cart="toggleCart"
      />
    </div>
  </nav>
</template>

<script>
import CartIcon from '@/components/ecommerce/header/CartIcon.vue';

export default {
  name: 'Navbar',
  components: {
    CartIcon
  },
  props: {
    cartItemCount: {
      type: Number,
      default: 0
    },
    favoriteItemCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    toggleCart() {
      this.$emit('toggle-cart');
    }
  }
}
</script>

<style scoped>
.navbar {
position: sticky;
top: 0;
left: 0;
z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #F0F0F0;
}

.logo {
  font-weight: bold; 
  font-size: 1.5em; 
  color: #333; 
  text-decoration: none; 
  margin-right: 20px; 
  display: inline-block; 
}

.catalog {
  justify-content: center;
  align-items: center;
  display: flex;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  text-decoration: none;
  color: #151515;
}

.nav-links a.router-link-exact-active {
  font-weight: bold;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #151515;
  text-decoration: none;
}

.heart-icon {
  transition: color 0.3s ease;
}

.icon-link:hover .heart-icon {
  color: #ff4136;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4136;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
}
</style>