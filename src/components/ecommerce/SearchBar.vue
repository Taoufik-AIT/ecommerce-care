<template>
  <div class="search-bar">
    <input 
      v-model="localSearchQuery"
      @input="onInput"
      @keyup.enter="onSearch"
      type="text" 
      placeholder="Rechercher un produit..."
      class="search-input"
    >
    <svg 
      @click="onSearch"
      class="search-icon" 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'SearchBar',
  setup() {
    const store = useStore();
    const localSearchQuery = ref('');

    // Synchroniser le state local avec le store
    watch(() => store.state.searchQuery, (newQuery) => {
      localSearchQuery.value = newQuery;
    });

    const onInput = () => {
      store.dispatch('setSearchQuery', localSearchQuery.value);
    };

    const onSearch = () => {
      store.dispatch('setSearchQuery', localSearchQuery.value);
    };

    return {
      localSearchQuery,
      onInput,
      onSearch
    };
  }
}
</script>


<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 300px;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  font-size: 16px;
  border: 1px solid #a4a4a4;
  background-color: #F4F4F4;
  outline: none;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #b6b6b6;
  cursor: pointer;
  transition: color 0.3s;
}
</style>