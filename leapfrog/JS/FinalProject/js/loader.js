function loadLevel(name) {
    return fetch(`levels/${name}.json`)
    .then(level => level.json());
}
