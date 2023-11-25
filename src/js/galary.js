import { UnsplashAPI } from './UnsplashAPI';
import { createGalleryCard } from './createMarkup';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { Notify } from 'notiflix';

const refs = {
	gallery: document.querySelector('.js-gallery'),
	container: document.getElementById('tui-pagination-container'),
	form: document.querySelector('.js-search-form'),
};

refs.form.addEventListener('submit', onFormSearch);

const options = {
	totalItems: 0,
	itemsPerPage: 12,
	visiblePages: 5,
	page: 1,
};

const pagination = new Pagination(refs.container, options);

const page = pagination.getCurrentPage();

const apiService = new UnsplashAPI();
apiService.getImagePopular(page).then(({ results, total }) => {
	const markup = createGalleryCard(results);
	refs.gallery.innerHTML = markup;
	pagination.reset(total);
});

pagination.on('afterMove', getPopular);

function getPopular(event) {
	const currentPage = event.page;
	console.log(currentPage);
	apiService.getImagePopular(currentPage).then(({ results, total }) => {
		const markup = createGalleryCard(results);
		refs.gallery.innerHTML = markup;
	});
}

function onFormSearch(event) {
	event.preventDefault()
	const queryForm = event.target.elements.query.value.trim()
	if (!queryForm) {
		return Notify.info('enter something for search!');
	}

pagination.off('afterMove', getPopular);

	apiService.query = queryForm;
	apiService.getImageByQuery(page).then(({ total, results }) => {
		const markup = createGalleryCard(results);
	refs.gallery.innerHTML = markup;
	pagination.reset(total);
	})
	pagination.on('afterMove', getByQuery);
}

