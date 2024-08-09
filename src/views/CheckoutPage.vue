<template>
    <div class="checkout-page">
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div class="checkout-container">
        <div class="payment-details">
          <h1>DÉTAILS DU PAIEMENT</h1>
          <div class="payment-options">
            <label class="payment-option">
              <input type="radio" v-model="paymentMethod" value="paypal">
              PAYPAL
            </label>
            <label class="payment-option">
              <input type="radio" v-model="paymentMethod" value="creditCard">
              CARTE DE CRÉDIT
            </label>
          </div>
          <div class="form-group">
            <label>Prénom*</label>
            <input v-model="form.firstName" type="text" required>
          </div>
          <div class="form-group">
            <label>Nom*</label>
            <input v-model="form.lastName" type="text" required>
          </div>
          <div class="form-group">
            <label>Adresse*</label>
            <input v-model="form.address" type="text" required>
          </div>
          <div v-if="paymentMethod === 'creditCard'">
            <div class="form-group">
              <label>Nom du titulaire*</label>
              <input v-model="form.cardholderName" type="text" required>
            </div>
            <div class="form-group">
              <label>Numéro de carte*</label>
              <input v-model="form.cardNumber" type="text" required>
            </div>
            <div class="form-row">
              <div class="form-group half">
                <label>Date d'expiration*</label>
                <input v-model="form.expiryDate" type="text" placeholder="MM/AA" required>
              </div>
              <div class="form-group half">
                <label>CVV*</label>
                <input v-model="form.cvv" type="text" required>
              </div>
            </div>
          </div>
          <div v-else-if="paymentMethod === 'paypal'">
            <p>Vous serez redirigé vers PayPal pour finaliser votre achat.</p>
          </div>
          <button @click="confirmOrder" class="confirm-button">CONFIRMER</button>
        </div>
        <div class="order-summary">
          <h2>RÉSUMÉ DE LA COMMANDE</h2>
          <div v-for="item in cartItems" :key="item.id" class="order-item">
            <img :src="item.mainImage" :alt="item.name" class="item-image">
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p>{{ formatPrice(item.price) }} €</p>
            </div>
            <div class="item-quantity">{{ item.quantity }}</div>
          </div>
          <div class="order-totals">
            <div class="total-line">
              <span>COMMANDE</span>
              <span>{{ formatPrice(orderTotal) }} €</span>
            </div>
            <div class="total-line">
              <span>LIVRAISON</span>
              <span>{{ formatPrice(shippingCost) }} €</span>
            </div>
            <div class="total-line subtotal">
              <span>TOTAL</span>
              <span>{{ formatPrice(subtotal) }} €</span>
            </div>
          </div>
          <p class="free-shipping-note">*LIVRAISON GRATUITE POUR LES COMMANDES DE PLUS DE 49€</p>
        </div>
      </div>
      <RecommendedProducts />
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import RecommendedProducts from '@/components/ecommerce/RecommendedProducts.vue';
  
  export default {
    name: 'CheckoutPage',
    components: {
      RecommendedProducts,
    },
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const paymentMethod = ref('creditCard');
      const form = ref({
        firstName: '',
        lastName: '',
        address: '',
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      });
      const errorMessage = ref('');
      window.scrollTo(0, 0);

  
      const cartItems = computed(() => store.state.cart);
      const orderTotal = computed(() => store.getters.cartTotal);
      const shippingCost = computed(() => orderTotal.value > 49 ? 0 : 5);
      const subtotal = computed(() => orderTotal.value + shippingCost.value);
  
      const formatPrice = (price) => price.toFixed(2);
  
      const validateForm = () => {
        const requiredFields = ['firstName', 'lastName', 'address'];
        if (paymentMethod.value === 'creditCard') {
          requiredFields.push('cardholderName', 'cardNumber', 'expiryDate', 'cvv');
        }
        
        const emptyFields = requiredFields.filter(field => !form.value[field]);
        
        if (emptyFields.length > 0) {
          errorMessage.value = `Veuillez remplir tous les champs obligatoires : ${emptyFields.join(', ')}.`;
          return false;
        }
        errorMessage.value = '';
        return true;
      };
  
      const confirmOrder = () => {
        if (!validateForm()) return;
  
        const orderData = {
          paymentMethod: paymentMethod.value,
          ...form.value
        };
  
        store.dispatch('processOrder', orderData)
          .then(() => {
            router.push('/confirmation');
          })
          .catch((error) => {
            errorMessage.value = 'Une erreur est survenue lors du traitement de votre commande.';
          });
      };
  
      return {
        paymentMethod,
        form,
        cartItems,
        orderTotal,
        shippingCost,
        subtotal,
        formatPrice,
        confirmOrder,
        errorMessage
      };
    }
  };
  </script>
  
  <style scoped>
  .checkout-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    box-sizing: border-box;
  }
  
  .checkout-container {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: space-between;
  }
  
  .payment-details, .order-summary {
    flex: 1 1 400px;
    max-width: 550px;
  }
  
  h1, h2 {
    font-size: 24px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  
  .payment-options {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #666;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  .form-row {
    display: flex;
    gap: 15px;
  }
  
  .form-group.half {
    flex: 1;
    min-width: 0;
  }
  
  .confirm-button {
    width: 100%;
    padding: 15px;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
    text-transform: uppercase;
    margin-top: 20px;
  }
  
  /* Styles pour la section "RÉSUMÉ DE LA COMMANDE" (inchangés) */
  .order-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .item-quantity {
    margin-left: 15px;
  }
  
  .order-totals {
    margin-top: 20px;
    border-top: 1px solid #ddd;
    padding-top: 20px;
  }
  
  .total-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .subtotal {
    font-weight: bold;
  }
  
  .free-shipping-note {
    margin-top: 20px;
    font-size: 12px;
    color: #666;
  }
  
  .error-message {
    background-color: #ffebee;
    color: #c62828;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ef9a9a;
    box-sizing: border-box;
    width: 100%;
  }
  
  @media (max-width: 1240px) {
    .checkout-container {
      justify-content: center;
    }
  }
  
  @media (max-width: 900px) {
    .checkout-container {
      flex-direction: column;
      align-items: center;
    }
  
    .payment-details, .order-summary {
      width: 100%;
      max-width: 100%;
    }
  }
  
  @media (max-width: 600px) {
    .checkout-page {
      padding: 10px;
    }
  
    .form-row {
      flex-direction: column;
    }
  
    .form-group.half {
      width: 100%;
    }
  }
  </style>