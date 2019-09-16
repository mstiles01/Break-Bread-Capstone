const remoteURL = "http://localhost:5002"

export default {
postNewBio(newBio) {
    return fetch(`${remoteURL}/recipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBio)
    }).then(data => data.json())
},
editBio(editedUseroObj, editedUserId) {
    return fetch(`${remoteURL}/users/${editedUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedUseroObj)
    }).then(data => data.json());
  }
}

