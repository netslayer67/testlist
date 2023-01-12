const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    axios
        .get(`https://api.github.com/search/users?q=${query}`)
        .then((response) => {
            res.send(response.data.items);
        })
        .catch((error) => {
            console.log(error);
            res.send([]);
        });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

document.getElementById("search-button").addEventListener("click", async () => {
    const userInput = document.getElementById("search-input").value;
    const { data } = await axios.get(`/search?q=${userInput}`);
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // clear previous search results
    data.forEach((user) => {
        const userItem = document.createElement("a");
        userItem.classList.add("list-group-item");
        userItem.innerHTML = `
        <img src="${user.avatar_url}" style="width:50px; height:50px;">
        <b>Name:</b> ${user.name} <b>Nickname:</b> ${user.login}
        `;
        userList.appendChild(userItem);
    });
});
////////////////////////////////
