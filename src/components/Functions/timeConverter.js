exports.timeConverter = (time) => {
    const date = new Date(time);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
}