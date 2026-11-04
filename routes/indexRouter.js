const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

//display the messages in the index page

indexRouter.get("/", (req, res) => {
  res.render("index", { messages });
});

//display the form to add a new message
indexRouter.get("/new", (req, res) => {
    res.render("form");
});

//handle the form submission and add a new message to the messages array
indexRouter.post("/new", (req, res) => {
    const { user, text } = req.body;

    messages.push({ text, user, added: new Date() });
    res.redirect("/");
});


//handle the deletion of a message
indexRouter.post("/delete/:id", (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id < 0 || id >= messages.length) {
        return res.status(404).send("Invalid message index");
    }
    messages.splice(id, 1);
    res.redirect("/");
});
module.exports = indexRouter;