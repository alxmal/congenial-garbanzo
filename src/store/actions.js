export default {
    updateComics(context, payload) {
        context.commit('updateComics', payload);
    },
    updateNumRange(context, payload) {
        context.commit('updateNumRange', payload);
    },
    setNumRangeUpdated(context, payload) {
        context.commit('setNumRangeUpdated', payload);
    },
    setIsLoading(context, payload) {
        context.commit('setIsLoading', payload);
    }
};
