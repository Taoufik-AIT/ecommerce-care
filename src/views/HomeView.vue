<template>
  <div class="home">
    <header class="hero">
      <nav class="navbar">
        <div class="navbar-links">
          <router-link to="/favorites" class="icon-link">
            <i class="fas fa-heart"></i>
          </router-link>
          <router-link to="/cart" class="icon-link">
            <i class="fas fa-shopping-cart"></i>
          </router-link>
        </div>
      </nav>
      <div class="hero-content">
        <h1>Découvrez la puissance de la beauté naturelle</h1>
        <p>Découvrez les bienfaits de nos produits cosmétiques naturels et écologiques, fabriqués avec les meilleurs ingrédients.</p>
        <div class="cta-buttons">
          <button @click="goToCatalog" class="btn btn-primary">Shop</button>
        </div>
      </div>
    </header>
    
    <main>
      <AboutSection />
      <ProductCarousel 
        title="Nos derniers produits"
        :products="featuredProducts"
        @shop="goToCatalog"
      />
    </main>
    
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AboutSection from '@/components/ecommerce/main/AboutSection.vue'
import ProductCarousel from '@/components/ecommerce/main/ProductCarousel.vue'

export default {
  name: 'Home',
  components: {
    AboutSection,
    ProductCarousel,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    window.scrollTo(0, 0);


    const featuredProducts = computed(() => {
      return store.state.products.slice(0, 8) // Prend les 8 premiers produits
    })

    const goToCatalog = () => {
      router.push('/catalog')
    }

    return {
      featuredProducts,
      goToCatalog
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hero {
  height: 100vh;
  background-image: url('@/assets/img/img-24.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden; /* Assure que le pseudo-élément ne déborde pas */
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); 
  z-index: 1; 
}
.hero-content {
  position: relative; 
  z-index: 2; 
  max-width: 60%;
  color: #F4F4F4;
  text-align: left;
  font-family: satoshi;
}

.navbar {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.navbar-links {
  display: flex;
  gap: 1rem;
}

.icon-link {
  color: #fff;
  font-size: 1.2rem;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  max-width: 60%;
  color: #fff;
  text-align: left;
}

h1 {
  font-size: 4rem; /* Taille fixe pour plus de cohérence */
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-weight: bold;
}

p {
  font-size: 1.25rem; /* Taille fixe pour plus de cohérence */
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.btn-primary {
  background-color: #fff;
  color: #000;
  border: none;
}

.btn-primary:hover {
  background-color: #f0f0f0;
}

main {
  flex-grow: 1;
}

@media (max-width: 1200px) {
  .hero-content {
    max-width: 70%;
  }

  h1 {
    font-size: 3.5rem;
  }

  p {
    font-size: 1.2rem;
  }
}

@media (max-width: 992px) {
  .hero-content {
    max-width: 80%;
  }

  h1 {
    font-size: 3rem;
  }

  p {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .hero-content {
    left: 5%;
    max-width: 90%;
  }

  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1rem;
  }

  .btn {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .hero-content {
    left: 5%;
    max-width: 90%;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 0.9rem;
  }

  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>