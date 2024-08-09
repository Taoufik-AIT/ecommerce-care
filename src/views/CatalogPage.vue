<template>
  <div class="catalog-page">
    <h1>Découvrez nos produits premium <br>
    pour un bien-être quotidien exceptionnel. 
    </h1>
    <div class="filter-container">
      <CategoryFilter @category-selected="onCategorySelected" />
      <div class="search-sort-container">
        <SearchBar />
        <SortComponent />
      </div>
    </div>
    
    <div v-if="filteredAndSortedProducts.length > 0" class="product-grid">
      <ProductCard 
        v-for="product in visibleProducts" 
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :mainImage="product.mainImage"
        :description="product.description"
        :stock="product.stock"
      />
    </div>
    
    <div v-else class="no-results">
      Aucun produit trouvé pour "{{ searchQuery }}".
    </div>
    
    <div v-if="isLoading" class="loading">Chargement...</div>
    
    <div ref="loadTrigger" class="load-trigger"></div>
  </div>
  

</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import SearchBar from '@/components/ecommerce/SearchBar.vue';
import ProductCard from '@/components/ecommerce/ProductCard.vue';
import SortComponent from '@/components/ecommerce/SortComponent.vue';
import CategoryFilter from '@/components/ecommerce/CategoryFilter.vue';



export default {
  name: 'CatalogPage',
  components: { SearchBar, ProductCard, SortComponent, CategoryFilter },
  setup() {
    const store = useStore();
    const visibleProductCount = ref(9);
    const isLoading = ref(false);
    const loadTrigger = ref(null);
    window.scrollTo(0, 0);

    const searchQuery = computed(() => store.state.searchQuery);
    const filteredAndSortedProducts = computed(() => store.getters.filteredAndSortedProducts);

    const visibleProducts = computed(() => 
      filteredAndSortedProducts.value.slice(0, visibleProductCount.value)
    );

    const hasMoreProducts = computed(() => 
      visibleProducts.value.length < filteredAndSortedProducts.value.length
    );

    const onCategorySelected = (category) => {
      store.dispatch('setCategory', category);
    };

    const loadMoreProducts = () => {
      if (hasMoreProducts.value && !isLoading.value) {
        isLoading.value = true;
        setTimeout(() => {
          visibleProductCount.value += 9;
          isLoading.value = false;
        }, 1000);
      }
    };

    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreProducts.value) {
          loadMoreProducts();
        }
      }, { threshold: 0.1 });

      if (loadTrigger.value) {
        observer.observe(loadTrigger.value);
      }

      onUnmounted(() => observer.disconnect());
    });

    return {
      searchQuery,
      filteredAndSortedProducts,
      visibleProducts,
      isLoading,
      loadTrigger,
      onCategorySelected
    };
  }
};
</script>


<style scoped>

.catalog-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-sort-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

h1 {
  text-align: left;
  margin-bottom: 100px;
  font-family: satoshi;
  font-weight: lighter;
  font-size: 40px;
  max-width: 90rem;
}

.no-results, .loading {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #9B9B9B;
}

.load-trigger {
  height: 20px;
  margin-top: 20px;
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-sort-container {
    margin-top: 20px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .catalog-page {
    padding: 10px;
  }
}
</style>