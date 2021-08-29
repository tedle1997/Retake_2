/**
 * Web Atelier 2020  Exercise 7 - Single-Page Web Applications with Fetch and Client-side Views
 *
 * Student: Thuong L Le
 *
 * Client-side scripts
 *
 */


// function search(q) {
//     fetch("/pictures?search=" + q).then(res => { //response starts to arrive
//         console.log(res.status);
//         return res.text();
//     }).then(body => { //response has completed download
//         // console.log(body);
//         document.getElementById('results').innerHTML = body;
//
//         document.getElementById('results').querySelectorAll("a").forEach(a => {
//             a.addEventListener("click", linkClick);
//         })
//     })
// }


/**
 * @param {number[]} a - The array over which to iterate.
 * @return {function} - call this function to retrieve the next element of the array. The function throws an error if called again after it reaches the last element.
 */
// function iterator(a) {
//     if(!Array.isArray(a)) return undefined;
//     let position  = 0;
//     function next(b){
//         console.log(position);
//         console.log(a[position]);
//         if (b === undefined){
//             if(position < a.length){
//                 position += 1;
//                 return a[position-1];
//             } else throw new Error("Array is empty");
//         }
//         else if (Array.isArray(b)){
//             a = b;
//             position = 0;
//             return next;
//         }
//         else if(typeof b === "number") {
//             position += b;
//             return position;
//         }
//     }
//     return next;
// }

// function init_slideshow(result, automatic = false, delay = 3000)
// {
//         let dom = document.getElementById("slideshow");

//         let next = iterator(result); //f3 = next   f4 = iterator  // next, iterator

//         function advance(){
//             try {
//                 dom.src = next().src;
//             } catch (e) {
//                 next = iterator(result);
//                 dom.src = next().src;

//             }
//         }
//         if(automatic){
//             dom.src = next().src;
//             let i = setInterval(advance, delay);
//         }
//         else{
//             advance();
//         }
//         return advance;
// }

function getTimersWall(){
    API.getTimers("").then(result => {

        let model = {
            Timers: result,
            title: "Timer App"
        }

        let html = ejs.views_timers(model);
        document.getElementById('timers-wall').innerHTML = html;

        result.forEach((timer) => {
            var countDownDate = parseInt(timer.started)+parseInt(timer.duration);
            var x = setInterval(function() {

                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById(timer._id+"_display").innerHTML = "EXPIRED";
                    if(timer.sound!=="no_sound"){
                        let audio = new Audio("../sound/"+timer.sound+".mp3");
                        audio.play();
                    }
                }

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                var miliseconds = Math.floor((distance % 6));

                switch (timer.style){
                    case "style_1":{
                            let target = document.getElementById(timer._id+"_display");
                            if(target === null) break;
                            target.innerHTML =
                                days + " days " + hours + " hours "
                                + minutes + " minutes " + seconds + "seconds ";
                        }
                        break;
                    case "style_2":
                        let target = document.getElementById(timer._id+"_display");
                        if(target === null) break;
                        target.innerHTML =
                        `<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
                        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span class="font-mono text-5xl countdown">
                        <span style="--value:${days}"></span>
                        </span>
                        days
                        
                        </div>
                        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span class="font-mono text-5xl countdown">
                        <span style="--value:${hours}"></span>
                        </span>
                        hours
                        
                        </div>
                        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span class="font-mono text-5xl countdown">
                        <span style="--value:${minutes}"></span>
                        </span>
                        min
                        
                        </div>
                        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span class="font-mono text-5xl countdown">
                        <span style="--value:${seconds};"></span>
                        </span>
                        sec
                        
                        </div>
                        </div>`
                        break;
                    case "style_3":
                        break;
                }


            }, 100);
        });

        //intercept link clicks
        document.getElementById('timers-wall').querySelectorAll("a").forEach(a => {
            a.addEventListener("click", linkClick);
        })

    });
}

function deleteTimer(url){
    url = url.pathname.replace("/delete", "");
    console.log(url);
    fetch(url, { method: "DELETE"}).then(res=>{
        getTimersWall();
    });
}

function newTimer(){
    let newTimer = document.getElementById('new-timer')
    newTimer.innerHTML = `
    <div class="p-10 card bg-base-200">
        <form class="form-control">
            Timer's Title
            <input type="text" placeholder="Title" class="input input-info input-bordered" name="title"> 
            Days
            <input type="range" min="0" max="366" value="0" class="range range-lg" name="days" 
            oninput="this.nextElementSibling.value = this.value">
            <output>0</output> 
            Hours
            <input type="range" max="23" value="0" class="range range-primary range-lg" name="hours"
            oninput="this.nextElementSibling.value = this.value">
            <output>0</output>  
            Minutes
            <input type="range" max="59" value="0" class="range range-secondary range-lg" name="minutes"
            oninput="this.nextElementSibling.value = this.value">
            <output>0</output>  
            Seconds
            <input type="range" max="59" value="0" class="range range-accent range-lg" name="seconds"
            oninput="this.nextElementSibling.value = this.value">
            <output>0</output>
            <select class="select select-bordered select-info w-full max-w-xs" name="sound">
              <option disabled="disabled">Choose your timer sound</option> 
              <option selected="selected" value="no_sound">no sound</option> 
              <option value="sound_1">Sound 1</option> 
              <option value="sound_2">Sound 2</option> 
              <option value="sound_3">Sound 3</option>
            </select>
            <select class="select select-bordered select-info w-full max-w-xs" name="style">
              <option disabled="disabled">Choose your timer's style</option> 
              <option value="style_1">Style 1</option> 
              <option selected value="style_2">Style 2</option> 
              <option value="style_3">Style 3</option>
            </select>
            <input type="submit" value="Submit" class="btn"/>
        </form>
    </div>
    `;

    //new user form
    let form = newTimer.querySelector("form");
    form.addEventListener("submit", (event) => {
        //stop browser from submitting form and reloading page
        event.preventDefault();

        //prepare body of request from the content of the form
        let form_data = new FormData(form);
        let days = parseInt(form_data.get("days"));
        let hours = parseInt(form_data.get("hours"));
        let minutes = parseInt(form_data.get("minutes"));
        let seconds = parseInt(form_data.get("seconds"));


        let duration = days * 1000 * 60 * 60 * 24 + hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000
        form_data.append("duration", duration);
        console.log(form_data.get("title"));
        console.log(form_data.get("duration"));

        fetch("/timer", { method: "POST", body: form_data }).then(res => {
            newTimer.innerHTML = "";
            getTimersWall();

        })
    });
}


function slideshow(id){
    let slideshow_elem = document.getElementById("slideshow");
    fetch(`/pictures/slideshow?picture=${id}`,
        {headers: {"Accept" : "application/json"}})
        .then(result => {
            return result.json()

        })
        .then(data => {
            console.log(data);
            slideshow_elem.innerHTML = ejs.views_slideshow(data);
            slideshow_elem.querySelectorAll("a").forEach(link=>{

                link.addEventListener("click", (event)=>{
                    event.preventDefault();

                    slideshow(link.href.split("=")[1]);
                });
            })
        })
}

function linkClick(event) {
    event.preventDefault();


    let url = new URL(event.currentTarget.href);
    let button_url = new URL(event.target.href);
    console.log(button_url);

    //Timers links:
    if (button_url.pathname.endsWith("/delete")){
        deleteTimer(url);
    }
    if (button_url.pathname.endsWith("/new")){
        newTimer();
    }

    //Pictures links
    if (url.pathname === "/pictures/upload") {
        addPicture();
    }
    if (url.pathname.endsWith("/edit")) {
        editPicture(url);
    }
    if(url.pathname.endsWith("/duplicate")){
        duplicatePicture(url);
    }
    // if (url.pathname.endsWith("/delete")){
    //     deletePicture(url);
    // }

}

function searchJSON(q){

    API.search(q).then(result=>{
        let model = {
            title: "Search Results"
        }
        if(q !== ""){
            model.Pictures = result
        } else {
            model.Pictures = [];
        }

        let html = ejs.views_pictures(model);
        document.getElementById('results').innerHTML = html;


        //intercept link clicks
        document.getElementById('results').querySelectorAll("a").forEach(a => {
            a.addEventListener("click", linkClick);
        })


    })
}

function editPicture(url){
    let url_path = url.pathname.replace("/edit","");
    // if(url.pathname.split("?"))
    let image_filter = "";
    if(url.search === ""){
        image_filter = "none"
    } else {
        image_filter = url.search.replace("?filter=", "");
    }
    console.log(url_path);
    //fetch GET and render it
    fetch(url_path, {headers: {"Accept" : "application/json"}})
        .then(res => {
            return res.json()})
        .then(obj => {
            console.log(obj);
            if(image_filter === undefined){
                image_filter = "none";
            }
            let model = {
                target : obj, title : `Editor for ${obj.title}`, filter : image_filter,
            }

            //Render the editor html
            let html = ejs.views_editor(model);
            document.getElementById("edit").innerHTML = html;

            let edit_form = document.getElementById("edit").querySelector("form.edit");
            edit_form.addEventListener("submit", (event) =>{
                event.preventDefault();
                console.log(edit_form);
                let url_put = url.pathname.replace("/edit","");
                fetch(url_put, {method: "PUT", body: new FormData(edit_form)}).then(res=>{
                    getGallery();
                    document.getElementById("edit").innerHTML = "";
                })
            })

            let form = document.getElementById('edit').querySelectorAll("form.filter").forEach(a => {
                let link = a.querySelector("a");
                if(link !== null){
                    link.addEventListener("click", (event) => {
                        linkClick(event);
                    });
                }
                let data = new FormData(a);


                a.addEventListener("submit",(event)=>{
                    event.preventDefault();

                    fetch(url_path, {method: "PUT", body: new FormData(a), }).then(res=>{
                        getGallery();
                        document.getElementById("edit").innerHTML = "";
                    })
                })
            })
        })
}

function addPicture() {
    API.getupload().then(html => {
        let newPicture = document.getElementById('upload');
        newPicture.innerHTML = html;

        //new user form
        let form = newPicture.querySelector("form");
        form.addEventListener("submit", (event) => {
            //stop browser from submitting form and reloading page
            event.preventDefault();

            //prepare body of request from the content of the form
            let body = new FormData(form);
            //console.log(body);//

            fetch("/pictures", { method: "POST", body }).then(res => {
                newPicture.innerHTML = "";

                //refresh the list of users
                document.querySelector("input[name='search']").value = "";

                getGallery();

            })
        });
    })
}

function duplicatePicture(url){
    fetch(url, { method: "POST"}).then(res=>{
        getGallery();
    })
}

function deletePicture(url){
    url = url.pathname.replace("/delete", "");
    console.log(url);
    fetch(url, { method: "DELETE"}).then(res=>{
        getGallery();
    })
}

function getGallery() {
    API.search("").then(result => {
        console.log(result);
        let model = {
            Pictures: result,
            title: "Pictures Gallery"
        }
        let html = ejs.views_pictures(model);
        document.getElementById('gallery').innerHTML = html;


        //intercept link clicks
        document.getElementById('gallery').querySelectorAll("a").forEach(a => {
            a.addEventListener("click", linkClick);
        })

        document.getElementById('gallery').querySelectorAll("button").forEach(button =>{
            let picture_id = button.id.split("_")[0];
            button.addEventListener("click", (event)=>{
                event.preventDefault();
                slideshow(picture_id);
            });
        });
    })
}


API = function (){

    //fetch the search from API
    function search(q){
        return fetch("/pictures?search=" + q, { headers: { "Accept": "application/json" } }).then(res => { //response starts to arrive
            // console.log(res.status);
            return res.json(); //return the result of JSON.parse
        })
    }

    function getupload() {
        return fetch("/pictures/upload").then(res => res.text())
    }

    function getTimers(q){
        return fetch("/timer?search="+q, { headers: { "Accept": "application/json" } }).then(res =>{
            return res.json();
        })
    }

    function getNewTimerForm(){
        return fetch("/timer/new").then(res => res.text())
    }

    //List of all API functions
    return {
        search,
        getupload,
        getTimers,
        getNewTimerForm
    }
}()

function init(){

    let socket = io();

    socket.on("connect", ()=>{
        console.log("connected");
        document.getElementById("connection").innerHTML = `Connected to server`;
    })
    socket.on("disconnect", ()=>{
        console.log("disconnected");
        document.getElementById("connection").innerHTML = "Disconnected from server";
        // document.getElementById("slideshow").innerHTML = "";
    })

    socket.on("timer.expired", (event)=>{
        //TODO: Show expired and change the state of the timer.
    })

    socket.on("timer.created", (event)=>{
        getTimersWall();
    })

    socket.on("timer.edited", (event) => {
        getTimersWall();
    })

    socket.on("timer.deleted", (event) =>{
       getTimersWall();
    })


    /*Socket for pictures apps*/

    // socket.on('picture.created', (event)=>{
    //     getGallery();
    //     //if the new object matches the search results it will be displayed
    // })
    //
    // socket.on('picture.edited', (event)=>{
    //     getGallery();
    //     //if the new object matches the search results it will be displayed
    // })
    //
    // socket.on('picture.deleted', (event)=>{
    //     console.log("DELETED",event);
    //
    //     getGallery();
    //
    //     //searchJSON(input.value);
    //     //if the new object matches the search results it will be displayed
    // })
    //
    // socket.on('slideshow', (data)=>{
    //     console.log("receive broadcast");
    //     document.getElementById("slideshow").innerHTML = ejs.views_slideshow(data);
    //     document.getElementById("slideshow").querySelectorAll("a").forEach(link=>{
    //
    //         link.addEventListener("click", (event)=>{
    //             event.preventDefault();
    //             slideshow(link.href.split("=")[1]);
    //         });
    //     })
    //     // slideshow(id);
    // });

    let msg = {test:"Hello server"};
    socket.emit("messagetest",msg)

    socket.on("messagetest", msg=>{
        console.log(msg);
    })

    //Upload button
    //Slideshow
    //Gallery with thumbnails
    // getGallery();
    //Edit form to edit the image filter
    //Duplicate button
    //search for title or description

    //search handler
    // let search_input = document.querySelector("input[name='search']");
    // search_input.addEventListener("input", (event) => {
    //     console.log(search_input.value);
    //     searchJSON(search_input.value);
    // });

    //initialize the slide show

    getTimersWall();

}
