import Comics from './Comics';
import ComicsItem from './ComicsItem';
import randomize from '../utils/randomize';
import store from '../store/index';
import Component from '../lib/component';

class Viewer extends Component {
    constructor(id) {
        super({ store, element: document.querySelector('.viewbox') });
        this.id = id;
        this.origin = store.state.origin;
        this.path = store.state.path;
        this.comicsItem = new ComicsItem();
        this.request(this.path);
        this.initControls();
    }

    initControls = () => {
        let buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', e => {
                let action = e.target.dataset.action,
                    id = this.getId(action);
                this.request(id);
            });
        });
    };

    getId = action => {
        switch (action) {
            case 'first':
                return `/${store.state.comicsNumRange[0]}`;
            case 'prev':
                return `/${--store.state.currentComics.num}`;
            case 'random':
                let id = randomize(store.state.comicsNumRange);
                return `/${id}`;
            case 'next':
                return `/${++store.state.currentComics.num}`;
            case 'last':
                return `/${store.state.comicsNumRange[1]}`;
            default:
                break;
        }
    };

    request = (id = '') => {
        let urlString = `${API_URL}${id}/info.0.json`;

        store.dispatch('setIsLoading', true);

        fetch(urlString)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let { title, img, alt, day, month, year, transcript } = data;
                this.comics = new Comics(
                    title,
                    img,
                    alt,
                    day,
                    month,
                    year,
                    transcript
                );

                store.dispatch('setIsLoading', false);

                store.dispatch('updateComics', data);
                store.dispatch('updateNumRange', data.num);
                store.dispatch('setNumRangeUpdated', true);

                !store.state.isNumRangeUpdated
                    ? store.dispatch('setNumRangeUpdated', true)
                    : store.dispatch('setNumRangeUpdated', true);

                this.setLocation(id);
                this.render();
            });
    };

    setLocation = id => {
        window.history.pushState('', '', id);
    };

    render() {
        this.comicsItem.render();
    }
}

export default Viewer;
