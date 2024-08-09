<template>
    <transition name="fade">
      <div v-if="notification" class="notification" :class="notification.type">
        <p>{{ notification.message }}</p>
        <p v-if="countdown > 0" class="countdown">Redirection dans {{ countdown }} secondes...</p>
      </div>
    </transition>
  </template>
  
  <script>
  import { ref, computed, watch, onUnmounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'Notification',
    setup() {
      const store = useStore();
      const countdown = ref(0);
      let timer;
  
      const notification = computed(() => store.state.notification);
  
      watch(() => store.state.notification, (newNotification) => {
        if (newNotification && newNotification.countdown) {
          countdown.value = newNotification.countdown;
          startCountdown();
        } else {
          countdown.value = 0;
          clearInterval(timer);
        }
      });
  
      const startCountdown = () => {
        clearInterval(timer);
        timer = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            clearInterval(timer);
          }
        }, 1000);
      };
  
      onUnmounted(() => {
        clearInterval(timer);
      });
  
      return {
        notification,
        countdown
      };
    }
  }
  </script>
  
  <style scoped>
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    max-width: 300px;
  }
  
  .success {
    background-color: #4CAF50;
  }
  
  .error {
    background-color: #f44336;
  }
  
  .countdown {
    font-size: 0.9em;
    margin-top: 10px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>