/**
 * Web Atelier 2020  Exercise 7 - Single-Page Web Applications with Fetch and Client-side Views
 *
 * Student: __STUDENT NAME__
 *
 * Optional Tasks. PATCH method tests
 *
 */


const should = require('should');
const request = require('supertest')("http://localhost:3000");


describe('Optional Task. API - PATCH', function() {

    const oldID = '5f453b89e54198d2284adb76';

    let title = 'test image';

    let _id;

    function explainTestTitle(t) {
        t.test.title = t.test.title.replace(' picture', ` picture with _id='${_id}'`);
    }

    function validateNewPicture(picture) {
        //console.log(picture);
        picture.title.should.be.exactly(title);
        picture.desc.should.be.exactly('', 'by default description should be empty');
        picture.favourite.should.be.exactly(false, 'by default favourite should be false');
        picture.filename.should.be.exactly('usi.png');
        //picture.favourite_icon.should.be.exactly("&#9734;");
    }

    describe("Setup", function() {
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
    });

    describe('PATCH /picture/:id', function() {

        let patched_title = "patched title - " + Math.random().toString(36).slice(2);
        let patched_desc = "patched description - " + Math.random().toString(36).slice(2);
        let prev_title;
        let prev_desc;
        let prev_favourite;

        it('the new picture about to be patched should exist', function(done) {

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
                    prev_title = picture.title;
                    prev_desc = picture.desc;
                    prev_favourite = picture.favourite;
                    picture.filename.should.be.exactly('usi.png');

                    done();
                });

        });

        it('the patched new picture should have a new title', function(done) {

            explainTestTitle(this);

            request
                .patch('/pictures/' + _id)
                .field("title", patched_title)
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end(function(err, res) {
                    if (err) return done(err);

                    const picture = JSON.parse(res.text);
                    picture.title.should.be.exactly(patched_title);
                    picture.desc.should.be.exactly(prev_desc);
                    picture.favourite.should.be.exactly(prev_favourite);
                    picture.filename.should.be.exactly('usi.png');

                    done();
                });

        });

        it('the patched new picture should have a new description', function(done) {

            explainTestTitle(this);

            request
                .patch('/pictures/' + _id)
                .field("desc", patched_desc)
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end(function(err, res) {
                    if (err) return done(err);

                    const picture = JSON.parse(res.text);
                    picture.title.should.be.exactly(patched_title);
                    picture.desc.should.be.exactly(patched_desc);
                    picture.favourite.should.be.exactly(prev_favourite);
                    picture.filename.should.be.exactly('usi.png');

                    done();
                });

        });

        it('the patched new picture should have a new favourite', function(done) {

            explainTestTitle(this);

            request
                .patch('/pictures/' + _id)
                .field("favourite", !prev_favourite)
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end(function(err, res) {
                    if (err) return done(err);

                    const picture = JSON.parse(res.text);
                    picture.title.should.be.exactly(patched_title);
                    picture.desc.should.be.exactly(patched_desc);
                    picture.favourite.should.be.exactly(!prev_favourite);
                    picture.filename.should.be.exactly('usi.png');

                });

            request
                .patch('/pictures/' + _id)
                .field("favourite", false)
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end(function(err, res) {
                    if (err) return done(err);

                    const picture = JSON.parse(res.text);
                    picture.title.should.be.exactly(patched_title);
                    picture.desc.should.be.exactly(patched_desc);
                    picture.favourite.should.be.exactly(false);
                    picture.filename.should.be.exactly('usi.png');


            request
                .patch('/pictures/' + _id)
                .field("favourite", true)
                .expect(200)
                .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                .end(function(err, res) {
                    if (err) return done(err);

                    const picture = JSON.parse(res.text);
                    picture.title.should.be.exactly(patched_title);
                    picture.desc.should.be.exactly(patched_desc);
                    picture.favourite.should.be.exactly(true);
                    picture.filename.should.be.exactly('usi.png');

                    done();
                });

            });


        });

        it('a random picture should be not found ', function(done) {

            request
                .patch('/pictures/' + Math.random())
                .send()
                .expect(404, done);
        });


        it('an old picture ID should be not found ', function(done) {

            request
                .patch('/pictures/' + oldID)
                .send()
                .expect(404, done);
        });


    });


    describe("Teardown", function() {

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

    });

});