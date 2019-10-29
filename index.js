// implement your API here
const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

const port = 5000;
server.listen(port, () => console.log("\nListening on port 5000...\n"));

const db = require("./data/db");

const addUser = async user => {
    const newUser = await db.insert(user);
    return newUser;
};

const getUserById = async id => {

}

server.post("/api/users", (req, res) => {
    const body = req.body

    if (!(body.name && body.bio)) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        });
    } else {
        const id = addUser(body);
        db
            .insert(body)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "There was an error while saving the user to the database", error: err });
            });
    }
});

server.get("/api/users", (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved", error: err });
        });
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            errorMessage: "Please provide id for the user."
        });
    } else {
        db
            .findById(id)
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The user information could not be retrieved." });
            })
    }
});

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            errorMessage: "Please provide id for the user."
        });
    } else {
        db
            .remove(id)
            .then(num => {
                if (num === 0) {
                    res.status(404).json({ message: "The user with the specified ID does not exist." });
                } else {
                    res.status(200).json({ deleted: num })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The user could not be removed" });
            });
    }
});

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if (!(body.name && body.bio)) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        db
            .update(id, body)
            .then(num => {
                if (num === 0) {
                    res.status(404).json({ message: "The user with the specified ID does not exist." });
                } else {
                    res.status(200).json(body);
                }
            })
            .catch();
    }
});