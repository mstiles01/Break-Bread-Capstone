const remoteURL = "http://localhost:5002"

export default {
  getRecipes(id) {
    return fetch(`${remoteURL}/recipes/${id}`)
    .then(result => result.json())
  },
  getAllRecipes() {
    return fetch(`${remoteURL}/recipes`)
    .then(result => result.json())
  },
  deleteRecipe(id) {
    return fetch(`http://localhost:5002/recipes/${id}`, {
        method: "DELETE"
    })
    .then(result => result.json())
  },
  postRecipe(newRecipe) {
    return fetch(`${remoteURL}/recipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRecipe)
    }).then(data => data.json())
},

editRecipe(editedRecipeObj, editedRecipeId) {
    return fetch(`${remoteURL}/recipes/${editedRecipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedRecipeObj)
    }).then(data => data.json());
  },
}