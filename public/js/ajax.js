let interval_dictionary = {};

function getTimersWall(){
    API.getTimers("").then(result => {

        let model = {
            Timers: result,
            title: "Timer App"
        }

        document.getElementById('timers-wall').innerHTML = ejs.views_timers(model);
        result.forEach((timer) => {
            let countDownDate = parseInt(timer.started)+parseInt(timer.duration);
            let x = setInterval(function(){

                // Get today's date and time
                let now = new Date().getTime();

                // Find the distance between now and the count down date
                let distance = countDownDate - now;

                if(timer.state === "paused"){
                    distance = parseInt(timer.expires)-parseInt(timer.started);
                    let pause_resume_btn = document.getElementById(timer._id+"_pause_resume");
                    if(pause_resume_btn.innerHTML === "Pause"){
                        clearInterval(interval_dictionary[timer._id]);
                        pause_resume_btn.innerHTML = "Resume";
                        let link = pause_resume_btn.getAttribute('href').replace("/pause", "/resume");
                        pause_resume_btn.setAttribute('href',link);
                    } else {
                        pause_resume_btn.innerHTML = "Pause";
                        let link = pause_resume_btn.getAttribute('href').replace("/resume", "/pause");
                        pause_resume_btn.setAttribute('href',link);
                    }
                }


                // Time calculations for days, hours, minutes and seconds
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                switch (timer.style){
                    case "style_1":{
                        let target = document.getElementById(timer._id + "_display");
                        if (target === null) break;
                        target.innerHTML =
                            `<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
                                <div class="flex flex-col p-2 bg-accent rounded-box text-neutral-content">
                                    <span class="font-mono text-5xl countdown">
                                    <span style="--value:${days}"></span>
                                    </span>
                                    days
                                </div>
                                <div class="flex flex-col p-2 bg-accent rounded-box text-neutral-content">
                                    <span class="font-mono text-5xl countdown">
                                    <span style="--value:${hours}"></span>
                                    </span>
                                    hours
                                </div>
                                <div class="flex flex-col p-2 bg-accent rounded-box text-neutral-content">
                                    <span class="font-mono text-5xl countdown">
                                    <span style="--value:${minutes}"></span>
                                    </span>
                                    min
                                </div>
                                <div class="flex flex-col p-2 bg-accent rounded-box text-neutral-content">
                                    <span class="font-mono text-5xl countdown">
                                    <span style="--value:${seconds};"></span>
                                    </span>
                                    sec
                                </div>
                            </div>`;
                        document.getElementById(timer._id+"_edit_btn").classList.add("btn-accent");
                        document.getElementById(timer._id+"_pause_resume").classList.add("btn-accent");
                        document.getElementById(timer._id+"_delete").classList.add("btn-accent");
                        }
                        break;
                    case "style_2": {
                        let target = document.getElementById(timer._id + "_display");
                        if (target === null) break;
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
                    }
                        break;
                    case "style_3": {
                        let target = document.getElementById(timer._id + "_display");
                        if (target === null) break;
                        target.innerHTML =
                            `<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
                        <div class="flex flex-col p-2  bg-secondary rounded-box text-neutral-content">
                        <span class="font-mono text-5xl countdown">
                        <span style="--value:${days}"></span>
                        </span>
                        days       
                        </div>
                        
                        <div class="flex flex-col p-2  bg-secondary rounded-box text-neutral-content">
                        <span class="font-mono text-5xl countdown">
                        <span style="--value:${hours}"></span>
                        </span>
                        hours
                        
                        </div>
                        <div class="flex flex-col p-2  bg-secondary rounded-box text-neutral-content">
                        <span class="font-mono text-5xl countdown">
                        <span style="--value:${minutes}"></span>
                        </span>
                        min
                        
                        </div>
                        <div class="flex flex-col p-2  bg-secondary rounded-box text-neutral-content">
                        <span class="font-mono text-5xl countdown">
                        <span style="--value:${seconds}"></span>
                        </span>
                        sec
                        
                        </div>
                        </div>`;
                        document.getElementById(timer._id+"_edit_btn").classList.add("btn-secondary");
                        document.getElementById(timer._id+"_pause_resume").classList.add("btn-secondary");
                        document.getElementById(timer._id+"_delete").classList.add("btn-secondary");

                    }
                        break;
                }
                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(x);
                    const expired_timer = document.getElementById(timer._id+"_display");
                    if(timer.sound!=="no_sound" && expired_timer!==null){
                        expired_timer.innerHTML =
                            `<h1 class="font-mono text-5xl">TIMER EXPIRED</h1>`;
                        let audio = new Audio("../sound/"+timer.sound+".mp3");
                        audio.play();
                    }
                }

            }, 100);
            interval_dictionary[timer._id] = x;

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
    const timer_id = url.split("/")[2];
    clearInterval(interval_dictionary[timer_id]);
    fetch(url, { method: "DELETE"}).then(res=>{
        getTimersWall();
    });
}

function addDurationToFormData(form_data){

    let days = parseInt(form_data.get("days"));
    let hours = parseInt(form_data.get("hours"));
    let minutes = parseInt(form_data.get("minutes"));
    let seconds = parseInt(form_data.get("seconds"));

    let duration = days * 1000 * 60 * 60 * 24 + hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000
    form_data.append("duration", duration);
}

function newTimer(){
    let newTimer = document.getElementById('new-timer')
    newTimer.innerHTML = ejs.views_new_timer();

    //new user form
    let form = newTimer.querySelector("form");
    form.addEventListener("submit", (event) => {
        //stop browser from submitting form and reloading page
        event.preventDefault();

        // prepare body of request from the content of the form
        let form_data = new FormData(form);
        addDurationToFormData(form_data);
        fetch("/timer", { method: "POST", body: form_data }).then(res => {
            newTimer.innerHTML = "";
            getTimersWall();
        })
    });
}

function editTimer(url) {

    let id = url.pathname.split("/")[2];

    fetch("/timer/"+id,{method:"GET", headers:{accept:"application/json"}}).then(result=>{
        return result.json();
    }).then(data => {
        console.log(data);
        let model = {
            timer: data
        }
        let editor = document.getElementById(id+"_edit");
        editor.innerHTML = ejs.views_timer_editor(model);
    }).then(res => {
        let editor = document.getElementById(id+"_edit");
        let form = editor.querySelector("form");
        form.addEventListener("submit", (event)=>{
            event.preventDefault();

            let edited_form_data = new FormData(form);
            addDurationToFormData(edited_form_data);

            fetch("/timer/"+id, {method:"PUT", body: edited_form_data}).then(result => {
                editor.innerHTML = "";
            })
        })
    })


    // let url_path = url.pathname.replace("/edit","");
    // // if(url.pathname.split("?"))
    // let image_filter = "";
    // if(url.search === ""){
    //     image_filter = "none"
    // } else {
    //     image_filter = url.search.replace("?filter=", "");
    // }
    // console.log(url_path);
}

function pauseResumeTimer(url){
    fetch(url, {method: "POST"}).then(() => {
    });
}

function linkClick(event) {
    event.preventDefault();

    let url = new URL(event.currentTarget.href);
    let button_url = new URL(event.target.href);
    // console.log(button_url);

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
        console.log(button_url.pathname);
        pauseResumeTimer(url);
    }
    if(button_url.pathname.endsWith("/resume")){
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
        window.location.reload();
    })

    socket.on("ws.timer.deleted", (event) =>{
       getTimersWall();
    })

    socket.on("timer.paused", (event)=>{
        window.location.reload();
    })

    socket.on("timer.resumed", (event)=>{
        window.location.reload();
    })

    let msg = {test:"Hello server"};
    socket.emit("messagetest",msg)

    socket.on("messagetest", msg=>{
        console.log(msg);
    })

    getTimersWall();

}
