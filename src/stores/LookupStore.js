import EventEmitter from 'events';
import fetch from '../core/fetch';
import dispatcher from '../dispatchers/AppDispatcher';
import LookupActions from '../actions/LookupActions';

class LookupStore extends EventEmitter {

    constructor() {
        super();
        this.bindListeners({
            query: LookupActions.query,
        });

        this.state = {
            lookupData: {},
        };

        this.on('init', () => this.query());
    }

    async query() {
        const vehicleResponse = await fetch('http://localhost:8080/vehicle?key=9300f7bc-2ca6-11e4-8758-42010af0fd79', {
            method: 'post',
        });

        this.setState({
            lookupData: await vehicleResponse.json(),
        });
    }
}

export default dispatcher.createStore(LookupStore, 'LookupStore');
