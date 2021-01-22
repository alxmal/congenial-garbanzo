const randomize = range => {
    const getRandom = rangeArr => {
        let [min, max] = rangeArr;
        return Math.round(Math.random() * (max - min) + min);
    };
    return getRandom(range);
};

export default randomize;
