<template>
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>À propos</h3>
          <p>Découvrez nos produits naturels pour votre bien-être quotidien.</p>
        </div>
        <div class="footer-section">
          <h3>Liens rapides</h3>
          <ul>
            <li><router-link to="/">Accueil</router-link></li>
            <li><router-link to="/catalog">Catalogue</router-link></li>
            <li><router-link to="/favorites">Favoris</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@gentlecare.com</p>
          <p>Téléphone: +33 1 23 45 67 89</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 GentleCare. Tous droits réservés.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
  .site-footer {
    background-color: #f8f8f8;
    padding: 40px 20px;
    margin-top: 40px;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-section {
    flex: 1;
    margin: 0 15px;
  }
  
  .footer-section h3 {
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 10px;
  }
  
  .footer-section a {
    color: #333;
    text-decoration: none;
  }
  
  .footer-section a:hover {
    text-decoration: underline;
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
    }
  
    .footer-section {
      margin-bottom: 20px;
    }
  }
  </style>