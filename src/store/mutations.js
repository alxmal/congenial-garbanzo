export default {
    updateComics(state, payload) {
        const newState = { ...state, currentComics: { ...payload } };
        return newState;
    },
    updateNumRange(state, payload) {
        const newState = { ...state, comicsNumRange: [1, payload] };
        return newState;
    },
    setNumRangeUpdated(state, payload) {
        const newState = { ...state, isNumRangeUpdated: payload };
        return newState;
    },
    setIsLoading(state, payload) {
        const newState = { ...state, isLoading: payload };
        return newState;
    }
};
