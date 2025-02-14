const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');

const PORT = 3000;
const app = express();

app.use(express.json());

app.post('/todo', async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        return res.status(411).json({ msg: "You sent the wrong inputs" });
    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
    });

    res.json({ msg: "Todo Created" });
});

app.get('/todos', async function (req, res) {
    const todos = await todo.find({});
    res.json({ todos });
});

app.put('/completed', async function (req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        return res.status(411).json({ msg: "You have sent the wrong inputs" });
    }

    await todo.updateOne(
        { _id: req.body.id },
        { $set: { completed: true } }
    );

    res.json({ msg: "Todo marked as completed" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
