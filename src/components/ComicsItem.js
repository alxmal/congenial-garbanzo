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

export default ComicsItem;
