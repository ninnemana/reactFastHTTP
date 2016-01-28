import EventEmitter from 'events';
import fetch from '../core/fetch';
import dispatcher from '../dispatchers/AppDispatcher';
import CategoryActions from '../actions/CategoryActions';

class CategoryStore extends EventEmitter {

    constructor() {
        super();
        this.bindListeners({
            getAll: CategoryActions.getAll,
        });

        this.state = {
            categories: [],
        };

        this.getAll();
    }

    async getAll() {
        const catResponse = await fetch('https://api.curtmfg.com/v3/category?brandID=3&key=9300f7bc-2ca6-11e4-8758-42010af0fd79');

        this.setState({
            categories: await catResponse.json(),
        });
    }
}

export default dispatcher.createStore(CategoryStore, 'CategoryStore');
