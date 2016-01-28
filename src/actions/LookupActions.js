import dispatcher from '../dispatchers/AppDispatcher';

class LookupActions {
    query(id, text) {
        return { id, text };
    }
}

export default dispatcher.createActions(LookupActions);
