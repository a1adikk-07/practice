import { UnsplashAPI } from './UnsplashAPI';
const apiService = new UnsplashAPI();
apiService
  .getImagePopular(1)
  .then(({ results, total }) => console.log(results, total));
