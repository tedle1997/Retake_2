/**
 * Web Atelier 2020  Exercise 7 - Single-Page Web Applications with Fetch and Client-side Views
 *
 * Student: __STUDENT NAME__
 *
 * Task 3. Application Views Tests
 *
 */

const should = require('should');
const request = require('supertest')("http://localhost:3000");
const cheerio = require('cheerio');


describe('Task 3. Testing Web Application Views', function() {

            let pics = ["usi.png", "usi.jpg"];
            let _ids = [];

            describe('Setup (upload some pictures)', function() {

                pics.forEach(p => {
                    it(`POST /pictures - upload '${p}'`, function(done) {

                        request
                            .post('/pictures')
                            .field("title", "Test Picture " + p)
                            .attach("file", __dirname + '/assets/' + p)
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                            .expect(201)
                            .end(function(err, res) {
                                if (err) return done(err);

                                const picture = JSON.parse(res.text);
                                let _id = picture._id; //grab the id for checking if we can read this
                                _id.should.not.be.undefined();
                                _ids.push(_id);

                                done();
                            });
                    });
                });

                it('check pictures ids', function() {
                    _ids.length.should.be.equal(pics.length);
                });

            });

            describe('Gallery - GET /pictures', function() {

                it('check gallery exists', function(done) {

                    request
                        .get('/pictures/')
                        .accept("text/html")
                        .send()
                        .expect(200)
                        .expect('Content-Type', /html/, 'it should respond with Content-Type: text/html')
                        .end(done);

                });

                it('check gallery contains links', function(done) {

                    request
                        .get('/pictures')
                        .accept("text/html")
                        .send()
                        .expect(200)
                        .end((err, res) => {
                            if (err) done(err);
                            else {

                                const $ = cheerio.load(res.text);

                                const links = Array.from($("a").map((i, a) => $(a).attr('href')));

                                const imgs = Array.from($("img").map((i, img) => $(img).attr('src')));

                                //console.log(links, imgs);

                                //slideshow links
                                should(links.filter(l => l.indexOf("slideshow") >= 0).length >= imgs.length).be.true();

                                //editor links
                                should(links.filter(l => l.indexOf("edit") >= 0).length == imgs.length).be.true();

                                //image download links
                                should(links.filter(l => l.indexOf("images") >= 0).length == imgs.length).be.true();

                                //image upload form link
                                should(links.indexOf("/pictures/upload") >= 0).be.true();

                                //every image corresponds to a download link
                                const images = imgs.map(i => i.replace("image-thumbs/", "images/"));

                                should(images.every(i => links.includes(i))).be.true();

                                done();

                            }
                        });

                });

                it('check gallery includes thumbnails', function(done) {
                    request
                        .get('/pictures/')
                        .accept("text/html")
                        .send()
                        .expect(200)
                        .end((err, res) => {
                            if (err) done(err);
                            else {
                                const $ = cheerio.load(res.text);
                                const imgs = Array.from($("img").map((i, img) => $(img).attr('src')));

                                //images are included from image-thumbs folder
                                should(imgs.map((img) => { return img.includes("image-thumbs") }).reduce((acc, curr) => acc && curr)).be.true();
                                done();
                            }
                        });
                });
            });

            describe('Upload - GET /pictures/upload', function() {

                it('check upload exists', function(done) {

                    request
                        .get('/pictures/upload')
                        .accept("text/html")
                        .send()
                        .expect(200)
                        .expect('Content-Type', /html/, 'it should respond with Content-Type: text/html')
                        .end(done);

                });

                it('check upload form contains the right fields and action URL', function(done) {

                    request
                        .get('/pictures/upload')
                        .accept("text/html")
                        .send()
                        .expect(200)
                        .expect('Content-Type', /html/, 'it should respond with Content-Type: text/html')
                        .end((err, res) => {
                            if (err) done(err);
                            else {

                                const $ = cheerio.load(res.text);

                                const fields = Array.from($("input, textarea").map((i, a) => $(a).attr('name') || $(a).attr('id')));

                                const forms = Array.from($("form").map((i, form) => {
                                    return {
                                        action: $(form).attr('action'),
                                        method: $(form).attr('method')
                                    }
                                }));

                                //console.log(fields, form);

                                ['file', 'title', 'author', 'desc', 'quality', 'favourite'].forEach((f) => {
                                    should(fields.indexOf(f) >= 0).be.true('Form should contain field with name or id = "' + f + '"');
                                })

                                should(forms.length).be.equal(1); //expect only one form
                                should(forms[0].action).be.equal("/pictures");
                                should(forms[0].method.toLowerCase()).be.equal("post");

                                done();

                            }
                        });

                });

            });

            describe('Editor - GET /pictures/:id/edit?filter', function() {

                it('check editor exists', function(done) {

                    request
                        .get('/pictures/' + _ids[0] + '/edit')
                        .accept("text/html")
                        .send()
                        .expect(200)
                        .expect('Content-Type', /html/, 'it should respond with Content-Type: text/html')
                        .end(done);

                });

                it('check editor page contains forms with the right fields and action URL', function(done) {

                    let _id = _ids[0];

                    request
                        .get('/pictures/' + _id + '/edit')
                        .accept("text/html")
                        .send()
                        .expect(200)
                        .expect('Content-Type', /html/, 'it should respond with Content-Type: text/html')
                        .end((err, res) => {
                            if (err) done(err);
                            else {

                                const $ = cheerio.load(res.text);

                                const fields = Array.from($("input, textarea").map((i, a) => $(a).attr('name') || $(a).attr('id')));

                                const forms = Array.from($("form").map((i, form) => {
                                    return {
                                        action: $(form).attr('action'),
                                        method: $(form).attr('method')
                                    }
                                }));

                                //console.log(fields, forms);

                                //'file' is not required
                                ['title', 'author', 'desc', 'quality', 'favourite'].forEach((f) => {
                                    should(fields.indexOf(f) >= 0).be.true('Form should contain field with name or id = "' + f + '"');
                                })

                                forms.forEach(f => {
                                    should(f.method.toLowerCase()).be.equal("post");

                                    let url = new URL(f.action, "http://localhost");

                                    //form should target the same picture id
                                    should(url.pathname.startsWith("/pictures/" + _id)).be.true();

                                    //there should be a method override
                                    let _method = url.searchParams.get("_method");
                                    should(_method).be.not.undefined();

                                    should(_method.toLowerCase() == "patch" || _method.toLowerCase() == "put" || _method.toLowerCase() == "delete").be.true();

                                })

                                done();

                            }
                        });

                });

            });

            describe('Slideshow - GET /pictures/slideshow?picture', function() {

                it('check slideshow exists', function(done) {

                    request
                        .get('/pictures/slideshow')
                        .accept("text/html")
                        .send()
                        .expect(200)
                        .expect('Content-Type', /html/, 'it should respond with Content-Type: text/html')
                        .end(done);

                });

                it('crawl slideshow', function(done) {

                    let pictures = {};
                    let pictures_src;
                    let crawled = new Set();

                    request
                        .get('/pictures/')
                        .set('Accept', 'application/json')
                        .send()
                        .expect(200)
                        .expect('Content-Type', /json/, 'it should respond with Content-Type: application/json')
                        .end((err, res) => {
                            if (err) return done(err);

                            pictures = JSON.parse(res.text);
                            //check the initial size of the content present in the server
                            initialSize = pictures.length;
                            this.test.title = `crawl slideshow with ${initialSize} pictures`;

                            pictures_src = Object.values(pictures).map(o=>o.src);

                            crawl("/pictures/slideshow", done);

                        });


                    function crawl(url, done) {

                        crawled.add(url);

                        request
                            .get(url)
                            .accept("text/html")
                            .send()
                            .expect(200)
                            .expect('Content-Type', /html/, 'it should respond with Content-Type: text/html')
                            .end((err, res) => {
                                if (err) done(err);
                                else {

                                    const $ = cheerio.load(res.text);

                                    const links = Array.from($("a").map((i,a)=>$(a).attr('href'))).filter(l=>l.indexOf("slideshow")>0);

                                    //each slideshow page should have at least 4 links
                                    should(links.length > 3).be.ok();

                                    //console.log(url,links);

                                    //should contain a link to the beginning of slideshow
                                    links.some(l => l.startsWith("/pictures/slideshow")).should.be.true();

                                    let img_src = Array.from($("img").map((i,a)=>$(a).attr('src')));

                                    //at least one image found in the page is one of the pictures
                                    pictures_src.some(s => img_src.indexOf(s)>=0).should.be.true();

                                    let sofar = Array.from(crawled);
                                    let newlinks = links.filter(x => sofar.indexOf(x) == -1);

                                    //console.log(sofar,newlinks);

                                    if (newlinks.length > 0) {
                                        crawl(newlinks[0], done);
                                    } else {
                                        //there is at least one page per picture
                                        should((crawled.size >= pictures.length)).be.true();
                                        done();
                                    }
                                }

                            });
                        };


                    });

                });



                describe("Teardown (cleanup some pictures)", function() {

                    it(`DELETE /pictures/:id`, function(done) {

                        //console.log(_ids);

                        let i = 0;

                        function d() {
                            i++;
                            if (i == _ids.length) {
                                done.apply(this, arguments);
                            }

                        }

                        _ids.forEach(id => {

                            request
                                .delete('/pictures/' + id)
                                .send()
                                .expect(204, d);

                        });
                    });
                })

            });