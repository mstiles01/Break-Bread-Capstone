const remoteURL = "http://localhost:5002"

export default {
  getBook(id) {
    return fetch(`${remoteURL}/recipeBooks/${id}?_embed=recipes`)
    .then(result => result.json())
  },
// possible expand in getAllBooks
  getAllBooks() {
    return fetch(`${remoteURL}/recipeBooks`)
    .then(result => result.json())
  },
  deleteBook(id) {
    return fetch(`http://localhost:5002/recipeBooks/${id}`, {
        method: "DELETE"
    })
    .then(result => result.json())
  },
  postBook(newBook) {
    return fetch(`${remoteURL}/recipeBooks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    }).then(data => data.json())
},

editBook(editedBookObj, editedBookId) {
    return fetch(`${remoteURL}/recipeBooks/${editedBookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedBookObj)
    }).then(data => data.json());
  },
}