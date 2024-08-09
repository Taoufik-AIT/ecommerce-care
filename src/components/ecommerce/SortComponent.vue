<template>
    <div class="sort-container">
      <div class="sort-header" @click="toggleDropdown">
        Trier par
        <span class="arrow" :class="{ 'arrow-up': isOpen }">&#9660;</span>
      </div>
      <div v-if="isOpen" class="sort-dropdown">
        <div
          v-for="option in sortOptions"
          :key="option.value"
          @click="selectOption(option.value)"
          :class="{ 'selected': selectedSort === option.value }"
          class="sort-option"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SortComponent',
    data() {
      return {
        isOpen: false,
        selectedSort: 'default',
        sortOptions: [
          { value: 'default', label: 'Par défaut' },
          { value: 'price-asc', label: 'Prix, croissant' },
          { value: 'price-desc', label: 'Prix, décroissant' },
          { value: 'name-asc', label: 'Nom, A-Z' },
          { value: 'name-desc', label: 'Nom, Z-A' }
        ]
      }
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen
      },
      selectOption(value) {
        this.selectedSort = value
        this.$store.dispatch('setSortOrder', value)
        this.isOpen = false
      }
    }
  }
  </script>
  
  <style scoped>
  
  @font-face {
  font-family: 'satoshi';
  src: url('/public/fonts/Satoshi-Medium.otf') format('opentype');
}
  .sort-container {
    position: relative;
    width: 170px;
    font-family: satoshi;
    z-index: 1000;
  }
  
  .sort-header {
    background-color: #F4F4F4;
    border: 1px solid #a4a4a4;
    padding: 8.5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .arrow {
    font-size: 10px;
    transition: transform 0.3s ease;
  }
  
  .arrow-up {
    transform: rotate(180deg);
  }
  
  .sort-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #F4F4F4;
    border: 1px solid #ccc;
    border-top: none;
    z-index: 1001;
  }
  
  .sort-option {
    padding: 10px;
    cursor: pointer;
  }
  
  .sort-option:hover {
    background-color: #f0f0f0;
  }
  
  .sort-option.selected {
    font-weight: bold;
    color: black;
  }
  
  .sort-option:not(.selected) {
    color: #9B9B9B;
  }
  </style>