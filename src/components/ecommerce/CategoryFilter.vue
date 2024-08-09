<template>
    <div class="category-filter">
      <button 
        v-for="category in categories" 
        :key="category.value"
        @click="selectCategory(category.value)"
        :class="{ 'active': selectedCategory === category.value }"
        class="category-button"
      >
        {{ category.label }}
      </button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'CategoryFilter',
    setup() {
      const store = useStore();
      const selectedCategory = computed(() => store.state.selectedCategory);
  
      const categories = [
        { value: 'all', label: 'Tous' },
        { value: 'aromatherapie', label: 'Aromathérapie' },
        { value: 'soins', label: 'Soins' },
        { value: 'boissons', label: 'Boissons' },
        { value: 'accessoires', label: 'Accessoires' },
        { value: 'complements', label: 'Compléments' }
      ];
  
      const selectCategory = (category) => {
        store.dispatch('setCategory', category);
      };
  
      return {
        categories,
        selectedCategory,
        selectCategory
      };
    }
  }
  </script>
  
  <style scoped>
  .category-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 5px;
    padding: 0;
  }
  
  .category-button {
    background: none;
    border: none;
    padding: 5px 0;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s ease;
    color: #888;
    position: relative;
  }
  
  .category-button::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #333;
    transition: width 0.4s ease;
  }
  
  .category-button:hover,
  .category-button.active {
    color: #333;
  }
  
  .category-button.active::after {
    width: 100%;
  }
  </style>