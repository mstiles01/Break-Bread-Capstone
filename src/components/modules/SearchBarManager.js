const remoteURL = "http://localhost:5002"

export default {
    searchBooks(input) {
        return fetch(`${remoteURL}/recipeBooks/?q=${input}`)
            .then(response => response.json());
    }
}