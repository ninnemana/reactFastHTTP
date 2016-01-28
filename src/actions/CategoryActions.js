import dispatcher from '../dispatchers/AppDispatcher';

class CategoryActions {
    getAll(id, text) {
        return { id, text };
    }
}

export default dispatcher.createActions(CategoryActions);
