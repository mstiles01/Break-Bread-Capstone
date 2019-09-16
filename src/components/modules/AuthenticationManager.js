const remoteURL = "http://localhost:5002"
// change AuthenticationManager to UserManager.
// refactor for profileManager

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
    

      post(newBio) {
        return fetch(`${remoteURL}/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBio)
        }).then(data => data.json())
    },
}