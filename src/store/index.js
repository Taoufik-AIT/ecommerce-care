import { createStore } from 'vuex'
import { useProducts } from '@/composables/useProducts'
import { useFavorites } from '@/composables/useFavorites'

const { products } = useProducts()
const { favorites, toggleFavorite, isFavorite } = useFavorites()

export default createStore({
  state: {
    defaultProducts: [...products.value],
    products: products.value,
    favorites: favorites.value,
    cart: [],
    searchQuery: '',
    cartVisibility: false,
    sortOrder: 'default',
    selectedCategory: 'all',
    notification: null,
    orderHistory: []
  },
  mutations: {
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    TOGGLE_FAVORITE(state, productId) {
      toggleFavorite(productId);
      state.favorites = [...favorites.value];
    },
    ADD_TO_CART(state, { product, quantity }) {
      const existingItem = state.cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ ...product, quantity });
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
    UPDATE_CART_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    SET_CART_VISIBILITY(state, visibility) {
      state.cartVisibility = visibility;
    },
    SET_SORT_ORDER(state, order) {
      state.sortOrder = order;
    },
    SET_CATEGORY(state, category) {
      state.selectedCategory = category;
    },
    SET_NOTIFICATION(state, notification) {
      state.notification = notification;
    },
    CLEAR_NOTIFICATION(state) {
      state.notification = null;
    },
    ADD_TO_ORDER_HISTORY(state, order) {
      state.orderHistory.push(order);
    }
  },
  actions: {
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    },
    toggleFavorite({ commit }, productId) {
      commit('TOGGLE_FAVORITE', productId);
    },
    addToCart({ commit, state }, { product, quantity }) {
      const currentQuantity = state.cart.find(item => item.id === product.id)?.quantity || 0;
      if (product.stock >= currentQuantity + quantity) {
        commit('ADD_TO_CART', { product, quantity });
        commit('SET_CART_VISIBILITY', true);
      } else {
        this.dispatch('setNotification', {
          type: 'error',
          message: 'Quantité demandée non disponible en stock'
        });
      }
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    updateCartQuantity({ commit, state }, { productId, quantity }) {
      const product = state.products.find(p => p.id === productId);
      if (product && product.stock >= quantity) {
        commit('UPDATE_CART_QUANTITY', { productId, quantity });
      } else {
        this.dispatch('setNotification', {
          type: 'error',
          message: 'Quantité demandée non disponible en stock'
        });
      }
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    setCartVisibility({ commit }, visibility) {
      commit('SET_CART_VISIBILITY', visibility);
    },
    setSortOrder({ commit }, order) {
      commit('SET_SORT_ORDER', order);
    },
    setCategory({ commit }, category) {
      commit('SET_CATEGORY', category);
    },
    setNotification({ commit }, notification) {
      commit('SET_NOTIFICATION', notification);
      if (!notification.persist) {
        setTimeout(() => {
          commit('CLEAR_NOTIFICATION');
        }, notification.countdown ? notification.countdown * 1000 : 5000);
      }
    },
    processOrder({ commit, state, dispatch }, orderData) {
      return new Promise((resolve, reject) => {
        // Simuler un appel API pour traiter la commande
        setTimeout(() => {
          const order = {
            id: Date.now(),
            items: [...state.cart],
            total: state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
            date: new Date().toISOString(),
            ...orderData
          };
          
          commit('ADD_TO_ORDER_HISTORY', order);
          commit('CLEAR_CART');
          dispatch('setNotification', {
            type: 'success',
            message: 'Votre commande a été traitée avec succès. Merci pour votre achat!',
            countdown: 5
          });
          resolve(order);
        }, 1000); // Simuler un délai de traitement
      });
    }
  },
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id);
    },
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    cartItemCount: (state) => {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    },
    isFavorite: (state) => (productId) => {
      return isFavorite(productId);
    },
    filteredAndSortedProducts: (state) => {
      let result = state.sortOrder === 'default' ? [...state.defaultProducts] : [...state.products];

      if (state.selectedCategory !== 'all') {
        result = result.filter(product => product.category === state.selectedCategory);
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.price.toString().includes(query)
        );
      }

      switch (state.sortOrder) {
        case 'price-asc':
          return result.sort((a, b) => a.price - b.price);
        case 'price-desc':
          return result.sort((a, b) => b.price - a.price);
        case 'name-asc':
          return result.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
          return result.sort((a, b) => b.name.localeCompare(a.name));
        default:
          return result;
      }
    },
    getSimilarProducts: (state) => ({ category, excludeId, limit }) => {
      return state.products
        .filter(product => product.category === category && product.id !== excludeId)
        .sort(() => 0.5 - Math.random())
        .slice(0, limit);
    }
  }
})