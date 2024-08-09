<template>
  <div class="favorites-page">
    <h1>Mes Favoris</h1>
    <div v-if="favoriteProducts.length" class="favorites-grid">
      <ProductCard
        v-for="product in favoriteProducts"
        :key="product.id"
        v-bind="product"
      />
    </div>
    <p v-else>Vous n'avez pas encore de favoris.</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ProductCard from '@/components/ecommerce/ProductCard.vue';

export default {
  name: 'FavoritesPage',
  components: { ProductCard },
  setup() {
    const store = useStore();
    window.scrollTo(0, 0);


    const favoriteProducts = computed(() => 
      store.state.products.filter(product => store.state.favorites.includes(product.id))
    );

    return {
      favoriteProducts
    };
  }
}
</script>

<style scoped>
.favorites-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>