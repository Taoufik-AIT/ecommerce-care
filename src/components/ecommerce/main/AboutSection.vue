<template>
    <section class="about-section">
      <div class="about-content">
        <p class="about-text">
          Nous avons développé
          <img src="@/assets/img/img-7.jpg" alt="Gros plan sur la peau" class="round-image">
          des cosmétiques pour tous les types de peau et tous les âges. Les ingrédients naturels aideront
          <img src="@/assets/img/img-8.jpg" alt="Ingrédients naturels" class="round-image">
          votre peau à être saine, hydratée et tonique. Choisissez votre propre
          <img src="@/assets/img/img-10.jpg" alt="Personne avec une peau éclatante" class="round-image">
          soin personnel et donnez vie à votre peau.
        </p>      
</div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'AboutSection'
  }
  </script>
  
  <style scoped>
  .about-section {
    padding: 50px 20px;
    background-color: #f9f9f9;
  }
  
  .about-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .about-text {
    font-size: 2.5rem;
    line-height: 1.4;
    color: #333;
    text-align: center;
    font-family: satoshi;
  }
  
  .round-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    vertical-align: middle;
    margin: 0 10px;
  }
  
  @media (max-width: 768px) {
    .about-text {
      font-size: 1.8rem;
    }
    
    .round-image {
      width: 60px;
      height: 60px;
    }
  }
  </style>