import { Router } from './components/Router';
import randomize from './utils/randomize';
import './styles/style.styl';

let state = {
    currentComicsData: {},
    comicsNumRange: [1, 1],
    numRangeIsUpdated: false,
    origin: location.origin,
    path: location.pathname
};

const getId = action => {
    switch (action) {
        case 'first':
            return `/${state.comicsNumRange[0]}`;
        case 'prev':
            return `/${--state.currentComicsData.num}`;
        case 'random':
            let id = randomize(state.comicsNumRange);
            return `/${id}`;
        case 'next':
            return `/${++state.currentComicsData.num}`;
        case 'last':
            return `/${state.comicsNumRange[1]}`;
        default:
            break;
    }
};

class Comics {
    constructor(title, img, alt, day, month, year, transcript) {
        this.title = title;
        this.img = img;
        this.alt = alt;
        this.day = day;
        this.month = month;
        this.year = year;
        this.transcript = transcript;
    }
}

class ComicsItem {
    constructor(data) {
        this.data = data;
    }

    render = () => {
        const viewBox = document.createElement('div');
        viewBox.classList.add('viewer');
        viewBox.innerHTML = `
            <div>
                <div class="comics">
                    <div class="comics-header">
                        <h3 class="title">${this.data.title}</h3>
                        <p class="published">${this.data.day}.${this.data.month}.${this.data.year}</p>
                    </div>
                    <img src="${this.data.img}" alt="${this.data.alt}"/>
                </div>
                <div class="transcript card">${this.data.transcript}</div>
            </div>
        `;
        return viewBox;
    };
}

class Viewer {
    constructor(id) {
        this.id = id;
        this.root = '/';
        this.init();
    }

    init() {
        this.request(this.id);
    }

    request = id => {
        let urlString = `http://localhost:8010/proxy${id}/info.0.json`;
        console.log(id);
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
                !state.numRangeIsUpdated
                    ? (state.numRangeIsUpdated = true)
                    : (state.numRangeIsUpdated = false);

                this.setLocation(id);
                this.render();
            });
    };

    setLocation = id => {
        window.history.pushState('', '', id);
    };

    update = data => {
        state.currentComicsData = { ...data };
        // Initial update range
        if (!state.numRangeIsUpdated) state.comicsNumRange[1] = data.num;
    };

    render = () => {
        const renderHook = document.querySelector('.viewbox');
        const comicsItem = new ComicsItem(state.currentComicsData);
        const comicsEl = comicsItem.render();
        renderHook.innerHTML = '';
        renderHook.append(comicsEl);
    };
}

const init = () => {
    console.log(state.path);
    const comicsId = state.path;
    const viewer = new Viewer(comicsId);
    // const router = new Router();
    // router.root = state.origin;
    // router.add({
    //     name: 'comic',
    //     path: '/:id',
    //     handler: params => {
    //         viewer.request(params.id);
    //     }
    // });

    let buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', e => {
            let action = e.target.dataset.action,
                id = getId(action);
            viewer.request(id);
        });
    });
};

document.addEventListener('DOMContentLoaded', init);
