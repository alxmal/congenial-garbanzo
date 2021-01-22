import Viewer from './components/Viewer';
import './styles/style.styl';



const init = () => {
    const comicsId = window.location.pathname;
    const viewer = new Viewer(comicsId);

    // let buttons = document.querySelectorAll('.btn');
    // buttons.forEach(btn => {
    //     btn.addEventListener('click', e => {
    //         let action = e.target.dataset.action,
    //             id = getId(action);
    //         viewer.request(id);
    //     });
    // });
};

document.addEventListener('DOMContentLoaded', init);
