const mongoose = require ("mongoose")

mongoose.connect("mongodb+srv://techrunstheworld:<db_password>@cluster0.3adps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed: Boolean

})
const todo = mongoose.model('todos',todoSchema)
module.export= {
    todo
}

