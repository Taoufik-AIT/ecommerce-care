<template>
    <div class="confirmation-page">
      <div class="confirmation-content">
        <h1>Commande Confirmée</h1>
        <p>Merci pour votre achat. Votre commande a été traitée avec succès.</p>
        <p class="order-number">Numéro de commande : {{ orderNumber }}</p>
        <p class="countdown">Retour à l'accueil dans {{ countdown }} secondes</p>
        <button @click="goHome" class="home-button">Retour à l'accueil</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  export default {
    name: 'ConfirmationPage',
    setup() {
      const router = useRouter();
      const store = useStore();
      const countdown = ref(5);
      const orderNumber = ref('');
      let timer;
  
      onMounted(() => {
        const lastOrder = store.state.orderHistory[store.state.orderHistory.length - 1];
        orderNumber.value = lastOrder ? lastOrder.id : 'N/A';
  
        timer = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            clearInterval(timer);
            goHome();
          }
        }, 1000);
      });
  
      onUnmounted(() => {
        clearInterval(timer);
      });
  
      const goHome = () => {
        router.push('/');
      };
  
      return {
        countdown,
        orderNumber,
        goHome
      };
    }
  };
  </script>
  
  <style scoped>
  .confirmation-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .confirmation-content {
    background-color: white;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h1 {
    color: #000;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 0.5rem;
  }
  
  .order-number {
    font-weight: bold;
    color: #3498db;
  }
  
  .countdown {
    font-style: italic;
    margin-top: 1rem;
  }
  
  .home-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #000;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .home-button:hover {
    background-color: #4f5254;
  }
  </style>