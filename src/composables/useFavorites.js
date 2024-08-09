import { ref } from 'vue';

const favorites = ref([]);

export function useFavorites() {
  const toggleFavorite = (productId) => {
    const index = favorites.value.findIndex(id => id === productId);
    if (index === -1) {
      favorites.value.push(productId);
    } else {
      favorites.value.splice(index, 1);
    }
  };

  const isFavorite = (productId) => {
    return favorites.value.includes(productId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
}