import { ref } from 'vue';

const createProduct = (id, name, price, stock, mainImage, additionalImages, description, category) => ({
  id,
  name,
  price,
  stock,
  mainImage: require(`@/assets/img/${mainImage}`),
  additionalImages: additionalImages.map(img => require(`@/assets/img/${img}`)),
  description,
  category
});

const products = ref([
  createProduct(1, 'Huile essentielle Lavande', 19.99, 0, 'img-1.jpg', ['img-8.jpg', 'img-5.jpg', 'img-3.jpg'], 'Ingrédients : Huile essentielle de lavande pure, huile de jojoba.', 'aromatherapie'),
  createProduct(2, 'Crème Collagène', 29.99, 8, 'img-33.jpg', ['img-4.jpg', 'img-5.jpg', 'img-6.jpg'], 'Ingrédients : Eau, glycérine, collagène hydrolysé, huile d\'argan, beurre de karité.', 'soins'),
  createProduct(3, 'Thé Maté Détox', 9.99, 20, 'img-3.jpg', ['img-7.jpg', 'img-8.jpg', 'img-9.jpg'], 'Ingrédients : Feuilles de maté, menthe poivrée, gingembre, citronnelle.', 'boissons'),
  createProduct(4, 'Bougie Lavande', 14.99, 12, 'img-4.jpg', ['img-10.jpg', 'img-11.jpg', 'img-12.jpg'], 'Ingrédients : Cire de soja, huile essentielle de lavande, mèche en coton.', 'accessoires'),
  createProduct(5, 'Massager Percussion', 89.99, 0, 'img-5.jpg', ['img-13.jpg', 'img-14.jpg', 'img-15.jpg'], 'Matériaux : ABS, silicone. Batterie lithium-ion incluse.', 'accessoires'),
  createProduct(6, 'Vitamine C', 24.99, 18, 'img-6.jpg', ['img-16.jpg', 'img-17.jpg', 'img-18.jpg'], 'Ingrédients : Acide ascorbique, bioflavonoïdes d\'agrumes, extrait d\'acérola.', 'complements'),
  createProduct(7, 'Diffuseur Ultrasonique', 49.99, 7, 'img-7.jpg', ['img-19.jpg', 'img-20.jpg', 'img-21.jpg'], 'Matériaux : Plastique ABS, verre. Capacité : 300ml.', 'accessoires'),
  createProduct(8, 'Tapis Yoga', 39.99, 10, 'img-8.jpg', ['img-22.jpg', 'img-23.jpg', 'img-24.jpg'], 'Matériau : TPE écologique. Dimensions : 183cm x 61cm.', 'accessoires'),
  createProduct(9, 'Gommage Sucre', 19.99, 14, 'img-9.jpg', ['img-25.jpg', 'img-26.jpg', 'img-27.jpg'], 'Ingrédients : Sucre de canne, huile de coco, huile d\'amande douce, vitamine E.', 'soins'),
  createProduct(10, 'Infusion Gingembre', 12.99, 20, 'img-10.jpg', ['img-28.jpg', 'img-29.jpg', 'img-30.jpg'], 'Ingrédients : Gingembre, citronnelle, écorce d\'orange, réglisse.', 'boissons'),
  createProduct(11, 'Coussin Chauffant', 34.99, 6, 'img-11.jpg', ['img-31.jpg', 'img-32.jpg', 'img-33.jpg'], 'Matériaux : Tissu polaire, remplissage de graines de lin. Lavable en machine.', 'accessoires'),
  createProduct(12, 'Crème Anti-Acné', 22.99, 13, 'img-12.jpg', ['img-1.jpg', 'img-2.jpg', 'img-3.jpg'], 'Ingrédients : Eau, acide salicylique, niacinamide, aloe vera, thé vert.', 'soins'),
  createProduct(13, 'Probiotiques', 29.99, 16, 'img-13.jpg', ['img-4.jpg', 'img-5.jpg', 'img-6.jpg'], 'Ingrédients : Lactobacillus acidophilus, Bifidobacterium lactis, inuline.', 'complements'),
  createProduct(14, 'Tapis Acupression', 44.99, 9, 'img-14.jpg', ['img-7.jpg', 'img-8.jpg', 'img-9.jpg'], 'Matériaux : Coton, mousse, pointes en plastique ABS. Dimensions : 68cm x 42cm.', 'accessoires'),
  createProduct(15, 'Huile essentielle Eucalyptus', 17.99, 17, 'img-15.jpg', ['img-10.jpg', 'img-11.jpg', 'img-12.jpg'], 'Ingrédients : Huile essentielle d\'eucalyptus pure 100% naturelle.', 'aromatherapie'),
  createProduct(16, 'Sérum Vitamine C', 39.99, 11, 'img-16.jpg', ['img-13.jpg', 'img-14.jpg', 'img-15.jpg'], 'Ingrédients : Eau, acide ascorbique, acide hyaluronique, extrait de thé vert.', 'soins'),
  createProduct(17, 'Tisane Camomille', 9.99, 20, 'img-17.jpg', ['img-16.jpg', 'img-17.jpg', 'img-18.jpg'], 'Ingrédients : Fleurs de camomille, mélisse, lavande.', 'boissons'),
  createProduct(18, 'Coussin Shiatsu', 54.99, 4, 'img-18.jpg', ['img-19.jpg', 'img-20.jpg', 'img-21.jpg'], 'Matériaux : Tissu respirant, nodes de massage rotatifs. Fonction chauffante.', 'accessoires'),
  createProduct(19, 'Jus Détox', 14.99, 15, 'img-19.jpg', ['img-22.jpg', 'img-23.jpg', 'img-24.jpg'], 'Ingrédients : Jus de pomme, épinard, concombre, citron, gingembre.', 'boissons'),
  createProduct(20, 'Bouteille Réutilisable', 24.99, 19, 'img-20.jpg', ['img-25.jpg', 'img-26.jpg', 'img-27.jpg'], 'Matériau : Acier inoxydable 18/8. Capacité : 500ml. Sans BPA.', 'accessoires'),
  createProduct(21, 'Huile essentielle Citronnelle', 16.99, 13, 'img-21.jpg', ['img-28.jpg', 'img-29.jpg', 'img-30.jpg'], 'Ingrédients : Huile essentielle de citronnelle pure 100% naturelle.', 'aromatherapie'),
  createProduct(22, 'Sérum Acide Hyaluronique', 44.99, 8, 'img-22.jpg', ['img-31.jpg', 'img-32.jpg', 'img-33.jpg'], 'Ingrédients : Eau, acide hyaluronique, glycérine, aloe vera.', 'soins'),
  createProduct(23, 'Thé Jasmin', 11.99, 20, 'img-23.jpg', ['img-1.jpg', 'img-2.jpg', 'img-3.jpg'], 'Ingrédients : Thé vert, fleurs de jasmin.', 'boissons'),
  createProduct(24, 'Bougie Bois de Santal', 19.99, 12, 'img-24.jpg', ['img-4.jpg', 'img-5.jpg', 'img-6.jpg'], 'Ingrédients : Cire de soja, huile essentielle de bois de santal, mèche en coton.', 'accessoires'),
  createProduct(25, 'Rouleau Jade', 29.99, 7, 'img-25.jpg', ['img-7.jpg', 'img-8.jpg', 'img-9.jpg'], 'Matériau : Jade naturel. Longueur : 15cm.', 'accessoires'),
  createProduct(26, 'Vitamine D3', 14.99, 18, 'img-26.jpg', ['img-10.jpg', 'img-11.jpg', 'img-12.jpg'], 'Ingrédients : Vitamine D3 (cholécalciférol), huile de tournesol.', 'complements'),
  createProduct(27, 'Coussin Méditation', 34.99, 6, 'img-27.jpg', ['img-13.jpg', 'img-14.jpg', 'img-15.jpg'], 'Matériaux : Coton biologique, rembourrage en sarrasin. Dimensions : 40cm x 20cm.', 'accessoires'),
  createProduct(28, 'Masque Argile', 12.99, 15, 'img-28.jpg', ['img-16.jpg', 'img-17.jpg', 'img-18.jpg'], 'Ingrédients : Argile verte, aloe vera, huile d\'argan, extrait de concombre.', 'soins'),    
  createProduct(29, 'Infusion Pissenlit', 9.99, 20, 'img-29.jpg', ['img-1.jpg', 'img-2.jpg', 'img-3.jpg'], 'Ingrédients : Racine de pissenlit, fenouil, menthe poivrée.', 'boissons'),
  createProduct(30, 'Massager Cou', 59.99, 5, 'img-30.jpg', ['img-4.jpg', 'img-5.jpg', 'img-6.jpg'], 'Matériaux : Cuir PU, tissu respirant. 8 modes de massage.', 'accessoires'),
  createProduct(31, 'Tisane Ginseng', 13.99, 17, 'img-31.jpg', ['img-7.jpg', 'img-8.jpg', 'img-9.jpg'], 'Ingrédients : Racine de ginseng, échinacée, gingembre.', 'boissons'),
  createProduct(32, 'Bougie Jasmin', 18.99, 14, 'img-32.jpg', ['img-10.jpg', 'img-11.jpg', 'img-12.jpg'], 'Ingrédients : Cire d\'abeille, huile essentielle de jasmin, mèche en coton.', 'accessoires'),
  createProduct(33, 'Rouleau Quartz Rose', 27.99, 9, 'img-33.jpg', ['img-13.jpg', 'img-14.jpg', 'img-15.jpg'], 'Matériau : Quartz rose naturel. Longueur : 15cm.', 'accessoires')]);

export function useProducts() {
  return {
    products
  };
}