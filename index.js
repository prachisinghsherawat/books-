const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());


// step1 : connect to MongoDb

const connect = () =>{
    return mongoose.connect(
        "mongodb+srv://Prachi:prachi_123@cluster0.o9cs6.mongodb.net/mySelect?retryWrites=true&w=majority"
    );
};


// step2 : create a Schema

const authorSchema = new mongoose.Schema({

    id: {type : Number , required : true},
    first_name: {type : String , required : true},
    last_name: {type : String , required : true},

});

const sectionSchema = new mongoose.Schema({

    section_name : {type : String , required : true},
    authors_id : [{ type : mongoose.Schema.Types.ObjectId,ref: 'author', required : true}],

});

const bookSchema = new mongoose.Schema({

    title :  {type : String , required : true},
    body  :  {type : String , required : true},
    author_id : [{ type : mongoose.Schema.Types.ObjectId,ref: 'author', required : true }],
    section_id : { type : mongoose.Schema.Types.ObjectId,ref: 'section', required : true},

});



// step3 : create a model 

const Author = mongoose.model("author",authorSchema);

const Section = mongoose.model("section",sectionSchema);

const Book = mongoose.model("book",bookSchema);


// ----------------------------------------  Author CRUD  ------------------------------------------------

app.post("/authors" , async(req,res) =>{

    try{
        const authors = await Author.create(req.body);
        return res.status(201).send(authors);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


app.get("/authors" , async(req,res) =>{

    try{
        const authors = await Author.find().lean().exec();
        return res.status(201).send(authors);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


app.patch("/authors" , async(req,res) =>{

    try{
        const authors = await Author.findByIdAndUpdate(req.params.id ,req.body, {new : true}).lean().exec();
        return res.status(201).send(authors);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


app.delete("/authors" , async(req,res) =>{

    try{
        const authors = await Author.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(authors);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});



// ----------------------------------------  Section CRUD  ------------------------------------------------


app.post("/section" , async(req,res) =>{

    try{
        const section = await Section.create(req.body);
        return res.status(201).send(section);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


app.get("/section" , async(req,res) => {

    try{
        const section = await Section.find().lean().exec();
        return res.status(201).send(section);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


app.patch("/section" , async(req,res) =>{

    try{
        const section = await Section.findByIdAndUpdate(req.params.id ,req.body, {new : true}).lean().exec();
        return res.status(201).send(section);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


app.delete("/section" , async(req,res) =>{

    try{
        const section = await Section.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(section);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});



// ----------------------------------------  Book CRUD  ------------------------------------------------


app.post("/books" , async(req,res) =>{

    try{
        const books = await Book.create(req.body);
        return res.status(201).send(books);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


app.get("/books" , async(req,res) =>{

    try{
        const books = await Book.find().populate("author_id").populate("section_id").lean().exec();
        return res.status(201).send(books);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


app.patch("/books" , async(req,res) =>{

    try{
        const books = await Book.findByIdAndUpdate(req.params.id ,req.body, {new : true}).lean().exec();
        return res.status(201).send(books);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


app.delete("/books" , async(req,res) =>{

    try{
        const books = await Book.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(books);

    }
    catch(err){
        return res.status(500).send(err.message);
    }
});






app.listen(2208,async function(){

    try{
        await connect();
        console.log("listening on port 2208")
    }
    catch(err){
        console.log(err.message)
    }   
});