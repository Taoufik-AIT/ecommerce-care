<template>
    <section class="image-text-section">
      <img :src="imageSrc" :alt="imageAlt">
      <div class="text-content">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ImageTextSection',
    props: {
      imageSrc: {
        type: String,
        required: true
      },
      imageAlt: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .image-text-section {
    display: flex;
    align-items: center;
    gap: 40px;
    margin: 40px 0;
  }
  
  img {
    width: 50%;
    max-width: 500px;
    height: auto;
  }
  
  .text-content {
    flex: 1;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .image-text-section {
      flex-direction: column;
    }
  
    img {
      width: 100%;
      max-width: 100%;
    }
  }
  </style>