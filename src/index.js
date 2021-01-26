import Viewer from './components/Viewer';
import './styles/style.styl';

const init = () => {
    const comicsId = window.location.pathname;
    const viewer = new Viewer(comicsId);
    viewer.render();
};

document.addEventListener('DOMContentLoaded', init);
