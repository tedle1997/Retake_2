/**
 * Web Atelier 2020  Exercise 7 - Single-Page Web Applications with Fetch and Client-side Views
 *
 * Student: __STUDENT NAME__
 *
 * Task 1. API Tests
 *
 */

const should = require('should');
const request = require('supertest')("http://localhost:3000");


describe('Task 1. API', function() {

    const oldID = '5f453b89e54198d2284adb76';

    let _id;

    function explainTestTitle(t) {
        t.test.title = t.test.title.replace(' picture', ` picture with _id='${_id}'`);
    }

    let title = 'test image';

    function validateNewPicture(picture) {
        //console.log(picture);
        picture.title.should.be.exactly(title);
        picture.desc.should.be.exactly('', 'by default description should be empty');
        picture.favourite.should.be.exactly(false, 'by default favourite should be false');
        picture.filter.should.be.exactly("none", 'by default filter should be "none"');
        picture.src.should.be.exactly('/images/'+picture.filename);
        picture.src_thumb.should.be.exactly('/image-thumbs/'+picture.filename);
        picture.author.should.be.exactly('', 'by default author should be empty');
        picture.quality.should.be.exactly(5, 'by default quality should be 5');

        //picture.favourite_icon.should.be.exactly("&#9734;");
    }

    let initialSize;

    describe('POST /pictures', function() {

        it('check initial picture collection size', function(done) {

            request
                .get('/pictures/')
                .set('Accept', 'application/json')
                .send()
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end((err, res) => {
                    if (err) return done(err);

                    const pictures = JSON.parse(res.text);
                    //check the initial size of the content present in the server
                    initialSize = pictures.length;
                    this.test.title = `check initial picture collection size (${initialSize})`;
                    done();
                });
        });

        it('should create a new picture if the request data is valid', function(done) {

            request
                .post('/pictures')
                .field("title", title)
                .attach("file", __dirname + '/assets/usi.png')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);

                    //console.log(res.text);

                    const picture = JSON.parse(res.text);
                    validateNewPicture(picture);
                    _id = picture._id; //grab the id for checking if we can read this
                    _id.should.not.be.undefined();

                    done();
                });
        });

        let newPicture;

        it(`new picture should be listed`, function(done) {

            request
                .get('/pictures/')
                .set('Accept', 'application/json')
                .send()
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end((err, res) => {
                    if (err) return done(err);

                    const pictures = JSON.parse(res.text);

                    _id.should.not.be.undefined();
                    this.test.title = `new picture with _id='${_id}' should be listed`;

                    //console.log(pictures);

                    pictures.should.be.not.empty();
                    pictures.map((o) => o._id).should.containEql(_id);
                    newPicture = pictures.find((o) => o._id == _id);
                    should(newPicture).not.be.undefined();
                    validateNewPicture(newPicture);

                    initialSize.should.be.equal(pictures.length - 1);

                    done();
                });
        });

        it('new picture should be downloaded', function(done) {

            this.test.title += " from " + newPicture.src;

            //console.log(newPicture)

            request
                .get(newPicture.src)
                .send()
                .expect(200)
                .expect('Content-Type', /png/, 'it should respond with Content-Type: image/png')
                .expect('Content-Length', '29750')
                .end(done);
        });

        it('new picture thumbnail should exist', function(done) {

            //console.log(newPicture)

            request
                .get(newPicture.src_thumb)
                .send()
                .expect(200)
                .expect('Content-Type', /png/, 'it should respond with Content-Type: image/png')
                .end(done);
        });

        it('should get a 400 Bad Request if file is missing from upload', function(done) {

            request
                .post('/pictures')
                .send()
                .expect(400, done);

        });

    });

    describe('GET /picture/:id', function() {

        it(`the new picture metadata should be found`, function(done) {

            explainTestTitle(this);

            request
                .get('/pictures/' + _id)
                .set('Accept', 'application/json')
                .send()
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end(function(err, res) {
                    if (err) return done(err);

                    const picture = JSON.parse(res.text);
                    validateNewPicture(picture);

                    done();
                });
        });

        it('a random picture should be not found ', function(done) {

            request
                .get('/pictures/' + Math.random())
                .send()
                .expect(404, done);
        });
    });

    describe('PUT /picture/:id', function() {

        it(`the new picture should be found before updating it`, function(done) {

            explainTestTitle(this);

            request
                .get('/pictures/' + _id)
                .send()
                .expect(200, done);
        });

        let updated_title = "updated title - " + Math.random().toString(36).slice(2);
        let updated_desc = "updated description - " + Math.random().toString(36).slice(2);

        let updated_pic;

        it('updating the new picture should change its title and description', function(done) {

            explainTestTitle(this);

            request
                .put('/pictures/' + _id)
                .field("title", updated_title)
                .field("desc", updated_desc)
                .field("favourite", true)
                .attach("file", __dirname + '/assets/usi.jpg')
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end(function(err, res) {
                    if (err) return done(err);

                    const picture = JSON.parse(res.text);
                    picture.title.should.be.exactly(updated_title);
                    picture.desc.should.be.exactly(updated_desc);
                    should(picture.favourite).be.true();
                    picture.src.should.be.exactly("/images/"+picture.filename);

                    updated_pic = picture;

                    done();
                });
        });

        it('the updated picture should change its title and description', function(done) {

            explainTestTitle(this);

            request
                .get('/pictures/' + _id)
                .set('Accept', 'application/json')
                .send()
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end(function(err, res) {
                    if (err) return done(err);

                    const picture = JSON.parse(res.text);
                    picture.title.should.be.exactly(updated_title);
                    picture.desc.should.be.exactly(updated_desc);
                    picture.favourite.should.be.exactly(true);
                    picture.src.should.be.exactly("/images/"+picture.filename);

                    done();
                });
        });

        it(`the updated picture should be downloadable`, function(done) {

            this.test.title += " with GET "+updated_pic.src;

            request
                .get(updated_pic.src)
                .send()
                .expect(200)
                .expect('Content-Type', /jpeg/, 'it should respond with Content-Type: image/jpeg')
                .expect('Content-Length', '60234')
                .end(done);

        });

        let newID = '5f428bb8fa5445f1c9ee013b';

        it(`cannot create a new picture given the id='${newID}' without files`, function(done) {

            request
                .put('/pictures/' + newID)
                .field("title", title)
                .field("desc", updated_desc)
                .field("favourite", true)
                .expect(400, done);

        });

        let newpic;

        it(`create a new picture given the id='${newID}'`, function(done) {

            request
                .put('/pictures/' + newID)
                .field("title", title)
                .field("desc", updated_desc)
                .field("favourite", true)
                .attach("file", __dirname + '/assets/usi.png')
                .expect(201)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end(function(err, res) {
                    if (err) return done(err);

                    const picture = JSON.parse(res.text);
                    picture.title.should.be.exactly(title);
                    picture.desc.should.be.exactly(updated_desc);
                    should(picture.favourite).be.true();
                    picture.src.should.be.exactly("/images/"+picture.filename);

                    newpic = picture;

                    done();
                });

        });

        it('new picture should be downloaded', function(done) {

            this.test.title += " with GET "+newpic.src;

            request
                .get(newpic.src)
                .send()
                .expect(200)
                .expect('Content-Type', /png/, 'it should respond with Content-Type: image/png')
                .expect('Content-Length', '29750')
                .end(done);
        });

        it(`cleanup newly put picture`, function(done) {

            request
                .delete('/pictures/' + newID)
                .send()
                .expect(204, done);

        });


        it(`newly put deleted picture should no longer be downloadable`, function(done) {

            request
                .get(newpic.src)
                .send()
                .expect(404, done);

        });

        it(`newly put deleted picture thumbnail should no longer be downloadable`, function(done) {

            request
                .get(newpic.src_thumb)
                .send()
                .expect(404, done);

        });

        it('a random picture cannot be put without a file upload ', function(done) {

            request
                .put('/pictures/' + Math.random())
                .send()
                .expect(400, done);
        });

    });



    describe('DELETE /picture/:id', function() {

        it(`the new picture should be found before deleting it`, function(done) {

            explainTestTitle(this);

            request
                .get('/pictures/' + _id)
                .send()
                .expect(200, done);
        });

        it('deleting the new picture should make it gone', function(done) {

            explainTestTitle(this);

            request
                .delete('/pictures/' + _id)
                .send()
                .expect(204, done);
        });

        it('the deleted new picture should be not found ', function(done) {

            explainTestTitle(this);

            request
                .get('/pictures/' + _id)
                .send()
                .expect(404, done);

        });

        it('the deleted updated new picture should no longer be downloadable ', function(done) {

            request
                .get('/images/usi.jpg')
                .send()
                .expect(404, done);
        });

        it('the deleted updated new picture thumbnail should no longer be downloadable ', function(done) {

            request
                .get('/image-thumbs/usi.jpg')
                .send()
                .expect(404, done);
        });

        it('deleting the new picture again should be not found ', function(done) {
            request
                .delete('/pictures/' + _id)
                .send()
                .expect(404, done);
        });

        it('deleted new picture should no longer be listed', function(done) {

            request
                .get('/pictures/')
                .set('Accept', 'application/json')
                .send()
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end((err, res) => {
                    if (err) return done(err);

                    explainTestTitle(this);

                    const pictures = JSON.parse(res.text);

                    pictures.map((o) => o._id).should.not.containEql(_id);
                    let newPicture = pictures.find((o) => o._id == _id);
                    should(newPicture).be.undefined;

                    initialSize.should.be.equal(pictures.length, 'the picture collection size should shrink back to the original one');

                    done();
                });
        });
    });

});