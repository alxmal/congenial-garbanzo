import Component from '../lib/component';
import store from '../store/index';

class ComicsItem extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.content')
        });
    }

    render() {
        store.state.isLoading
            ? (this.element.innerHTML = `<div class="loader flicker">Loading...</div>`)
            : (this.element.innerHTML = `
            <div class="viewer">
                <div class="comics">
                    <div class="comics-header">
                        <h3 class="title">${store.state.currentComics.title}</h3>
                        <p class="published">${store.state.currentComics.day}.${store.state.currentComics.month}.${store.state.currentComics.year}</p>
                    </div>
                    <img src="${store.state.currentComics.img}" alt="${store.state.currentComics.alt}"/>
                </div>
                <div class="transcript card">${store.state.currentComics.transcript}</div>
            </div>
        `);
    }
}

export default ComicsItem;
