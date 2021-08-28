/**
 * Web Atelier 2020  Exercise 5 - Web APIs with Express
 *
 * Student: Thuong L Le
 *
 * /pictures router
 *
 */

const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs-extra');
const path = require('path');
let Jimp = require("jimp");

let models = require("../models").model;
const ObjectId = require('mongodb').ObjectId;
const eventBus = require('../ws').eventBus;


// let Pictures = {};
// let id = 0;
//
// /*
// *
// * */
//
// let addPicture = function(picture){
//     picture._id = id++;
//     Pictures[picture._id] = picture;
//     // slideshow_update();
//     fs.writeJSONSync("model.json", Pictures);
// };
// addPicture({
//     title : "campus 1",
//     desc : "no desc",
//     favorite : false,
//     filename : "campus1.jpg",
//     src : "/images/campus1.jpg",
//     src_thumb : "/image-thumbs/campus1.jpg",
//     filter : "none",
//     author : "",
//     quality : 5
// });
//
// addPicture({
//     title : "campus 2",
//     desc : "no desc",
//     favorite : false,
//     filename : "campus2.jpg",
//     src : "/images/campus2.jpg",
//     src_thumb : "/image-thumbs/campus2.jpg",
//     filter : "none",
//     author : "",
//     quality : 5
// });
//
// addPicture({
//     title : "campus 3",
//     desc : "no desc",
//     favorite : false,
//     filename : "campus3.jpg",
//     src : "/images/campus3.jpg",
//     src_thumb : "/image-thumbs/campus3.jpg",
//     filter : "none",
//     author : "",
//     quality : 5
// });
function insert(req, res){
    if(req.files === undefined) {
        res.status(400).end();
    }
    let data = {
        title : req.body.title === undefined ? "" : req.body.title,
        desc : req.body.desc === undefined ? "" : req.body.desc,
        favourite : req.body.favourite === undefined ? false : (req.body.favourite=='true'),
        filename : req.files.file.name,
        src : `/images/${req.files.file.name}`,
        src_thumb : `/image-thumbs/${req.files.file.name}`,
        filter : req.body.filter === undefined ? "none" : req.body.filter,
        author : req.body.author === undefined ? "" : req.body.author,
        quality : req.body.quality === undefined ? 5 : req.body.quality,
        file : req.files.file,
    };
    //upload file and create thumbnail
    let upload_path = path.join(__dirname,"..", "/public/images/", req.files.file.name);
    let upload_thumb_path = path.join(__dirname,"..", "/public/image-thumbs/", req.files.file.name);
    fs.writeFileSync(upload_path, req.files.file.data);
    Jimp.read(upload_path).then(image => {
        return image.scaleToFit(256, 256).write(upload_thumb_path);
    }).catch(err => {
        console.log(err);
    });
    models.pictures.insertOne(data).then(result =>{
        if(req.accepts("json")) {
            res.status(201).json(data);
        } else {
            res.status(406).end();
        }
    });

    //tell connected browsers that there is new picture
    eventBus.emit('picture.created', data);
}

router.get('/', function(req, res) {
    // let result = Object.values(Pictures); //array

    let filter = {};

    if (req.query.search) {
        filter = {
            $or: [{ "title": { $regex: req.query.search } },
                { "desc": { $regex: req.query.search } },
                { "favourite" : { $regex: req.query.search }},
                { "filename" : { $regex: req.query.search }},
                { "src" : { $regex: req.query.search }},
                { "src_thumb" : { $regex: req.query.search }},
                { "filter" : { $regex: req.query.search }},
                { "author" : { $regex: req.query.search }},
                { "quality" : { $regex: req.query.search }},
                ]
        };

    }
    console.log(req.query.search);
    models.pictures.find(filter).toArray().then(result => {
        console.log(result);
        let model = { Pictures : result,
            title: "Pictures Gallery" }

        if (req.accepts("html")) {
            res.render("pictures", model );
        }
        else if (req.accepts("json")) {
            res.json(result);
        } else {
            res.status(406).end(); //not acceptable
        }
    });


});


router.get('/slideshow',function(req,res){

    // let result = Object.values(Pictures); //array
    //
    // let id = models.pictures.createIndex({_id: 1});
    //
    // if(req.query.picture !== undefined){
    //     id = req.query.picture;
    //     console.log(id);
    // }

    models.pictures.find({}).toArray().then(result => {
        let target_id = result[0]._id;
        if(req.query.picture !== undefined){
            target_id = req.query.picture;
        }
        let prev = 0;
        let next = 0;
        let target_index = 0;
        for(let i = 0; i < result.length; i++){
            if(target_id === result[i]._id.toString()){
                target_index = i;
                if(i===0){
                    prev = result.length-1;
                    next = i+1;
                } else if(i === result.length-1){
                    prev = i-1;
                    next = 0;
                } else {
                    prev = i-1;
                    next = i+1;
                }
            }
        }

        let model = { target : result[target_index],
            first : result[0],
            next : result[next],
            prev : result[prev],
            title: "Slideshow" };
        if (req.accepts("json")){
            res.status(200).send(model);
        }
        else if(req.accepts("html")){
            res.render("slideshow", model);
        } else {
            res.status(406).end(); //not acceptable
        }
        eventBus.emit("slideshow.broadcast", model);
    });

});

router.get('/upload',function(req,res){
    res.send(`<form method="post" action="/pictures" enctype="multipart/form-data">
<p><input type="text" name="title" placeholder="Title" ></p>
<p><input type="text" name="desc" placeholder="Description" ></p>
<p><input type="text" name="favourite" placeholder="Favorite" ></p>
<p><input type="text" name="author" placeholder="Author" ></p>
<p><input type="text" name="quality" placeholder="Quality" ></p>
<p><input type="file" name="file" placeholder="Select File"></p>
<p><input type="submit" value="Upload picture to Gallery"></p>
</form>`)

})

router.post("/", (req, res) => {
    insert(req, res);
});

router.get('/:id', function(req, res) {

    let filter =  { _id: new ObjectId(req.params.id) };
    models.pictures.findOne(filter).then(result =>{
        if(result === null){
            res.status(404).end();
        } else if (req.accepts("json")) {
            res.json(result);
        } else {
            res.status(406).end(); //not acceptable
        }
    });

});

router.get('/:id/edit', function(req, res) {
    let filter =  { _id: new ObjectId(req.params.id) };
    models.pictures.findOne(filter).then(result =>{
        if(result === undefined){
            res.status(404).end();
        }
        let image_filter = req.query.filter;
        if(image_filter === undefined){
            image_filter = "none";
        }
        let model = {
            target : result, title : `Editor for ${result.title}`, filter : image_filter,
        }

        res.render("editor", model);

    });

});

router.post("/:id/duplicate", function(req, res){
    let filter =  { _id: new ObjectId(req.params.id) };
    models.pictures.findOne(filter).then(result =>{
        if(result === undefined){
            res.status(404).end();
        }

        result.file.name = "duplicate_"+result.file.name;;

        let data = {
            title : result.title,
            desc : result.desc,
            favourite : result.favourite,
            filename : "duplicate_"+result.filename,
            src : `/images/duplicate_${result.filename}`,
            src_thumb : `/image-thumbs/duplicate_${result.filename}`,
            filter : result.filter ,
            author : result.author  ,
            quality : result.quality ,
            file : result.file,
        };

        console.log(data);
        //upload file and create thumbnail
        let upload_path = path.join(__dirname,"..", "/public/images/", result.file.name);
        let upload_thumb_path = path.join(__dirname,"..", "/public/image-thumbs/", result.file.name);
        fs.writeFileSync(upload_path, result.file.data.buffer);
        Jimp.read(upload_path).then(image => {
            return image.scaleToFit(256, 256).write(upload_thumb_path);
        }).catch(err => {
            console.log(err);
        });
        models.pictures.insertOne(data).then(result =>{
            if(req.accepts("json")) {
                res.status(201).json(data);
            } else {
                res.status(406).end();
            }
            //tell connected browsers that there is new picture
            eventBus.emit('picture.created', data);
        });

    });
});

router.put('/:id', function(req,res){

    let filter =  { _id: new ObjectId(req.params.id) };

    models.pictures.findOne(filter).then(result =>{
        if(result===null){
            insert(req);
        } else {
            let data = {
                _id : result._id,
                title : req.body.title === undefined ? result.title : req.body.title,
                desc : req.body.desc === undefined ? result.desc : req.body.desc,
                favourite : req.body.favourite === undefined ? (result.favourite=='true') : (req.body.favourite=='true'),
                filename :  req.files? req.files.file.name : result.filename,
                src : req.files? `/images/${req.files.file.name}` : result.src ,
                src_thumb : req.files? `/image-thumbs/${req.files.file.name}` : result.src_thumb,
                filter : req.body.filter === undefined ? result.filter : req.body.filter,
                author : req.body.author === undefined ? result.author : req.body.author,
                quality : req.body.quality === undefined ? result.quality : req.body.quality,
            };
            if(req.files){
                data.file = req.files.file;
                let upload_path = path.join(__dirname,"..", "/public/images/", req.files.file.name);
                let upload_thumb_path = path.join(__dirname,"..", "/public/image-thumbs/", req.files.file.name);
                fs.writeFileSync(upload_path, req.files.file.data);
                Jimp.read(upload_path).then(image => {
                    return image.scaleToFit(256, 256).write(upload_thumb_path);
                }).catch(err => {
                    console.log(err);
                });
            }
            models.pictures.replaceOne(filter, data, { upsert: false })
                .then(result => {
                    res.status(200).end();
                    //tell connected browsers that there is new picture
                    eventBus.emit('picture.edited', result.value);
                });
        }
    });
});

router.delete('/:id', function(req,res) {

    let filter =  { _id: new ObjectId(req.params.id) };
    models.pictures.findOneAndDelete(filter).then(result => {
        if (result.value !== null) {
            let delete_path = path.join(__dirname,"..", "/public/images/", result.value.filename);
            let delete_thumb_path = path.join(__dirname,"..", "/public/image-thumbs/", result.value.filename);
            fs.removeSync(delete_path);
            fs.removeSync(delete_thumb_path);
            if(req.accepts("html")){
                res.redirect("/pictures");
            } else{
                res.status(204).end();
            }
        } else {
            res.status(404).end();
        }

        eventBus.emit('picture.deleted', result.value);
    });

});


module.exports = router;


