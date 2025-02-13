const express = require ('express');
const { createTodo, updateTodo } = require('./types');

const app = express(); 

app.use(express.json())

app.post('/todo', function (req,res){
    const createPlayload = req.body;
    const parsedPayload = createTodo.safeParse(createPlayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        })
        return;
    }


})

app.get('/todos', function(req,res){

})

app.put('/completed', function(req,res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload) {
        res.status(411).json({
            msg: "You have sent the wrong inputs"
        })
        return;
    }
    
})