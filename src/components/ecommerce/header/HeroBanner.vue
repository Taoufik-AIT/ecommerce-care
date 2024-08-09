<template>
    <div class="hero-banner" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="hero-content">
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
        <button @click="onCtaClick" class="cta-button">{{ ctaText }}</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeroBanner',
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: true
      },
      ctaText: {
        type: String,
        required: true
      },
      backgroundImage: {
        type: String,
        required: true
      }
    },
    methods: {
      onCtaClick() {
        this.$emit('cta-click')
      }
    }
  }
  </script>
  
  <style scoped>
  .hero-banner {
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F4F4F4;
    text-align: center;
  }
  
  .hero-content {
    max-width: 800px;
    padding: 20px;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .cta-button {
    padding: 10px 20px;
    font-size: 1.2rem;
    background-color: #ffffff;
    color: #000000;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: #f0f0f0;
  }
  </style>