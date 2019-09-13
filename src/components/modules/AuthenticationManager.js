const remoteURL = "http://localhost:5002"

export default {
    getAllUsers() {
        return fetch(`${remoteURL}/users`)
            .then(response => response.json());
    },
    checkUsers(email, password) {
        return fetch(`${remoteURL}/users?email=${email}&&password=${password}`)
            .then(response => response.json());
    },

    postUser(userObject) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        }).then(data => data.json())
    },

    getUser(id) {
        return fetch(`${remoteURL}/users/${id}`)
            .then(response => response.json());
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