function getTimersWall(){
    API.getTimers("").then(result => {

        let model = {
            Timers: result,
            title: "Timer App"
        }

        document.getElementById('timers-wall').innerHTML = ejs.views_timers(model);

        result.forEach((timer) => {
            let countDownDate = parseInt(timer.started)+parseInt(timer.duration);
            let x = setInterval(function() {

                // Get today's date and time
                let now = new Date().getTime();

                // Find the distance between now and the count down date
                let distance = countDownDate - now;

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById(timer._id+"_display").innerHTML = "EXPIRED";
                    if(timer.sound!=="no_sound"){
                        let audio = new Audio("../sound/"+timer.sound+".mp3");
                        audio.play();
                    }
                }

                if(timer.state)

                // Time calculations for days, hours, minutes and seconds
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                let miliseconds = Math.floor((distance % 6));

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
    newTimer.innerHTML = ejs.views_new_timer();

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

function editTimer(url) {
    let url_path = url.pathname.replace("/edit","");
    // if(url.pathname.split("?"))
    let image_filter = "";
    if(url.search === ""){
        image_filter = "none"
    } else {
        image_filter = url.search.replace("?filter=", "");
    }
    console.log(url_path);

}
function pauseResumeTimer(url){

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
    if (button_url.pathname.endsWith("/edit")) {
        editTimer(url);
    }
    if(button_url.pathname.endsWith("/pause")){
        pauseResumeTimer(url);
    }

}


API = function (){


    function getTimers(q){
        return fetch("/timer?search="+q, { headers: { "Accept": "application/json" } }).then(res =>{
            return res.json();
        })
    }

    //List of all API functions
    return {
        getTimers,
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
        event.forEach((timer)=>{
           fetch("/timer/"+timer._id,{method:"POST"}).then(res=>{
               console.log("updated database");
           })
        });
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




    let msg = {test:"Hello server"};
    socket.emit("messagetest",msg)

    socket.on("messagetest", msg=>{
        console.log(msg);
    })

    getTimersWall();

}
