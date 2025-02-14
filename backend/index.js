const express = require ('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');


const app = express(); 

app.use(express.json())

app.post('/todo', async function (req,res){
    const createPlayload = req.body;
    const parsedPayload = createTodo.safeParse(createPlayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        })
        return;
    }
    await todo.create({
        title: createPlayload.title,
        description : createPlayload.description,
    })
    res.json({
        msg : "Todo Created"
    })

})

app.get('/todos', async function(req,res){
    const todos = await todo.find({});
    res.json({
        todos
    })
    

})
app.put('/completed', async function(req,res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload) {
        res.status(411).json({
            msg: "You have sent the wrong inputs"
        })
        return;
    }

    await todo.update({
        _id: req.body.id,
        completed : true
        
    })

    res.json({
        msg: "Todo marked as completed"
    })
    
})