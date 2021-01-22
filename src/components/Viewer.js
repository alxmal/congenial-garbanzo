import Comics from './Comics';
import ComicsItem from './ComicsItem';
import randomize from '../utils/randomize';

class Viewer {
    constructor(id) {
        this.id = id;
        this.state = {
            currentComicsData: {},
            comicsNumRange: [1, 1],
            numRangeIsUpdated: false,
            origin: location.origin,
            path: location.pathname
        };
        this.renderHook = document.querySelector('.viewbox');
        this.init();
    }

    init() {
        this.request(this.id);
        this.initControls()
    }

    initControls() {
        let buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', e => {
                let action = e.target.dataset.action,
                    id = this.getId(action);
                this.request(id);
            });
        });
    }

    getId = action => {
        switch (action) {
            case 'first':
                return `/${this.state.comicsNumRange[0]}`;
            case 'prev':
                return `/${--this.state.currentComicsData.num}`;
            case 'random':
                let id = randomize(this.state.comicsNumRange);
                return `/${id}`;
            case 'next':
                return `/${++this.state.currentComicsData.num}`;
            case 'last':
                return `/${this.state.comicsNumRange[1]}`;
            default:
                break;
        }
    };

    request = id => {
        let urlString = `${API_URL}${id}/info.0.json`;
        this.renderHook.innerHTML = `<div class="loader flicker">Loading...</div>`
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

                this.update(data);

                // Don't update range flag
                !this.state.numRangeIsUpdated
                    ? (this.state.numRangeIsUpdated = true)
                    : (this.state.numRangeIsUpdated = false);

                this.setLocation(id);
                this.render();
            });
    };

    setLocation = id => {
        window.history.pushState('', '', id);
    };

    update = data => {
        this.state.currentComicsData = { ...data };
        // Initial update range
        if (!this.state.numRangeIsUpdated)
            this.state.comicsNumRange[1] = data.num;
    };

    render = () => {
        const comicsItem = new ComicsItem(this.state.currentComicsData);
        const comicsEl = comicsItem.render();
        this.renderHook.innerHTML = '';
        this.renderHook.append(comicsEl);
    };
}

export default Viewer;
