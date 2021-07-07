

var list_projects;
$.getJSON("files/projects.json", function (json) {
    list_projects = json.projects;
});

function openDetailsProject(element){
    selectedProject = element.id;
    var title = list_projects[element.id].title;
    
    var knowledge = "<ul>";
    list_projects[element.id].knowledge.forEach(item => {
        knowledge +='<li>'+item+'</li>';
    });
    knowledge += "</ul>";

    var multimedia = "";
    if(list_projects[element.id].multimedia === "video"){
        multimedia += 
        '<video id="video'+element.id+'" '+
            'src="video/'+list_projects[element.id].video+'" controls autoplay>'+
        '</video>';
    } else{ //images
        multimedia +=
        '<div class="slideshow-container">';
        
        if(list_projects[element.id].images.length == 0){ 
            multimedia +=
            '<div class="mySlides fade">'+
                '<img src="img/portfolio/'+list_projects[element.id].logo+'/'+
                list_projects[element.id].logo+list_projects[element.id].logo_ext
                +'">'+
            '</div>';
        }else {
            list_projects[element.id].images.forEach(item => {
                multimedia +=
                '<div class="mySlides fade">'+
                    '<img src="img/portfolio/'+list_projects[element.id].logo+'/'+
                    list_projects[element.id].logo+'_'+item+list_projects[element.id].logo_ext
                    +'">'+
                '</div>';
            });
            multimedia += 
            '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>'+
            '<a class="next" onclick="plusSlides(1)">&#10095;</a>';
        }
        
        
        multimedia += 
        '</div>';
    }
    
    var content = 
    '<div class="dialog-content-header">'+
        '<h1>'+ title+'</h1>'+
        '<hr>'+
    '</div>'+
    '<div class="dialog-content-body">'+
        '<div class="dialog-content-body-section multimedia">'
            +
            multimedia
            +
        '</div>'+
        '<div class="dialog-content-body-section description">'
            +
            knowledge
            +
        '</div>'+
    '</div>';

    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'escape'],
        closeLabel: "Close",
        onOpen: function() {
            if (list_projects[element.id].type === "APP") {
                var div_multimedia = document.getElementsByClassName("multimedia")[0];
                div_multimedia.style.flex = 1;
                div_multimedia.style.display = "flex";
                div_multimedia.style.justifyContent = "center";
                document.getElementsByClassName("description")[0]
                    .style.flex = 1;
                if(list_projects[element.id].multimedia === "images"){
                    slideIndex = 1;
                    showSlides(slideIndex);
                }
                else{
                    var videoplayer = document.getElementById("video"+element.id);
                    videoplayer.style.width = "200px";
                    videoplayer.style.height = "350px";
                }    
            }
            else {
                var div_multimedia = document.getElementsByClassName("multimedia")[0];
                div_multimedia.style.flex = 3;
                div_multimedia.style.display = "flex";
                div_multimedia.style.justifyContent = "center";
                document.getElementsByClassName("description")[0]
                    .style.flex = 1;
                if(list_projects[element.id].multimedia === "images"){
                    slideIndex = 1;
                    showSlides(slideIndex);
                }
                else{
                    var videoplayer = document.getElementById("video"+element.id);
                    videoplayer.style.width = "100%";
                    videoplayer.style.height = "350px";
                }
            }
        },
        onClose: function() {
            var elem = document.getElementsByClassName("tingle-modal")[0];
            elem.parentNode.removeChild(elem);
        }        
    });
    modal.setContent(content);
    if(list_projects[element.id].title != "Virtual Classroom"){
        modal.addFooterBtn('Watch on Github', 'tingle-btn tingle-btn--primary', function() {
            window.open(list_projects[element.id].github, "_blank");     
            modal.close();
        });
    }
    
    modal.open();
}

function setEffectHover(element) {
    var w = window.innerWidth;
    var project = element.parentElement.parentElement.parentElement.classList[0];
    var currentDIV = document.getElementById(
            document.getElementsByClassName(project)[0].children[0].children[0].children[1].id);
    if (w > 700) { //4 columnas
        if (project === "div1") //Virtual Classroom
        { 
            var div2 = document.getElementById("2");
            var div6 = document.getElementById("6");
            removeAllEffectOnDIV(div2);
            removeAllEffectOnDIV(div6);
            div2.classList.add("overlayLeftRight");
            div6.classList.add("overlayTopBottom");
        } 
        else if (project === "div2") //Portafolio
        { 
            var div1 = document.getElementById("1");
            var div3 = document.getElementById("3");
            var div9 = document.getElementById("9");
            removeAllEffectOnDIV(div1);
            removeAllEffectOnDIV(div3);
            removeAllEffectOnDIV(div9);
            div1.classList.add("overlayRightLeft");
            div3.classList.add("overlayLeftRight");
            div9.classList.add("overlayTopBottom");
        } 
        else if (project === "div3") //Covid
        { 
            var div2 = document.getElementById("2");
            var div4 = document.getElementById("4");
            var div5 = document.getElementById("5");
            removeAllEffectOnDIV(div2);
            removeAllEffectOnDIV(div4);
            removeAllEffectOnDIV(div5);
            div2.classList.add("overlayRightLeft");
            div4.classList.add("overlayLeftRight");
            div5.classList.add("overlayTopBottom");
        } 
        else if (project === "div4") //ToDoList
        { 
            var div3 = document.getElementById("3");
            var div5 = document.getElementById("5");
            removeAllEffectOnDIV(div3);
            removeAllEffectOnDIV(div5);
            div3.classList.add("overlayRightLeft");
            div5.classList.add("overlayTopBottom");

        } 
        else if (project === "div5") //Paint
        { 
            var div3 = document.getElementById("3");
            var div4 = document.getElementById("4");
            var div8 = document.getElementById("8");
            var div9 = document.getElementById("9");
            removeAllEffectOnDIV(div3);
            removeAllEffectOnDIV(div4);
            removeAllEffectOnDIV(div8);
            removeAllEffectOnDIV(div9);
            div3.classList.add("overlayBottomTop");
            div4.classList.add("overlayBottomTop");
            div8.classList.add("overlayTopBottom");
            div9.classList.add("overlayRightLeft");
        } 
        else if (project === "div6") //CAR
        { 
            var div1 = document.getElementById("1");
            var div7 = document.getElementById("7");
            var div9 = document.getElementById("9");
            removeAllEffectOnDIV(div1);
            removeAllEffectOnDIV(div7);
            removeAllEffectOnDIV(div9);
            div1.classList.add("overlayBottomTop");
            div7.classList.add("overlayTopBottom");
            div9.classList.add("overlayLeftRight");
        } 
        else if (project === "div7") //Graficas 
        {
            var div6 = document.getElementById("6");
            var div10 = document.getElementById("10");
            var div11 = document.getElementById("11");
            removeAllEffectOnDIV(div6);
            removeAllEffectOnDIV(div10);
            removeAllEffectOnDIV(div11);
            div6.classList.add("overlayBottomTop");
            div10.classList.add("overlayTopBottom");
            div11.classList.add("overlayLeftRight");
        } 
        else if (project === "div8") //Hotel Sweet Dreams
        { 
            var div5 = document.getElementById("5");
            var div12 = document.getElementById("12");
            var div14 = document.getElementById("14");
            removeAllEffectOnDIV(div5);
            removeAllEffectOnDIV(div12);
            removeAllEffectOnDIV(div14);
            div5.classList.add("overlayBottomTop");
            div12.classList.add("overlayRightLeft");
            div14.classList.add("overlayTopBottom");
        } 
        else if (project === "div9") //Simulador 
        { 
            var div2 = document.getElementById("2");
            var div5 = document.getElementById("5");
            var div6 = document.getElementById("6");
            var div11 = document.getElementById("11");
            var div12 = document.getElementById("12");
            removeAllEffectOnDIV(div2);
            removeAllEffectOnDIV(div5);
            removeAllEffectOnDIV(div6);
            removeAllEffectOnDIV(div11);
            removeAllEffectOnDIV(div12);
            div2.classList.add("overlayBottomTop");
            div5.classList.add("overlayLeftRight");
            div6.classList.add("overlayRightLeft");
            div11.classList.add("overlayTopBottom");
            div12.classList.add("overlayTopBottom");
        } 
        else if (project === "div10") //World TV
        { 
            var div7 = document.getElementById("7");
            var div11 = document.getElementById("11");
            var div13 = document.getElementById("13");
            removeAllEffectOnDIV(div7);
            removeAllEffectOnDIV(div11);
            removeAllEffectOnDIV(div13);
            div7.classList.add("overlayBottomTop");
            div11.classList.add("overlayBottomTop");
            div13.classList.add("overlayLeftRight");
        } 
        else if (project === "div11") //Login
        { 
            var div7 = document.getElementById("7");
            var div9 = document.getElementById("9");
            var div10 = document.getElementById("10");
            var div12 = document.getElementById("12");
            removeAllEffectOnDIV(div7);
            removeAllEffectOnDIV(div9);
            removeAllEffectOnDIV(div10);
            removeAllEffectOnDIV(div12);
            div7.classList.add("overlayRightLeft");
            div9.classList.add("overlayBottomTop");
            div10.classList.add("overlayTopBottom");
            div12.classList.add("overlayLeftRight");
        } 
        else if (project === "div12") //Firechat
        { 
            var div8 = document.getElementById("8");
            var div9 = document.getElementById("9");
            var div11 = document.getElementById("11");
            var div13 = document.getElementById("13");
            removeAllEffectOnDIV(div8);
            removeAllEffectOnDIV(div9);
            removeAllEffectOnDIV(div11);
            removeAllEffectOnDIV(div13);
            div8.classList.add("overlayLeftRight");
            div9.classList.add("overlayBottomTop");
            div11.classList.add("overlayRightLeft");
            div13.classList.add("overlayTopBottom");
        } 
        else if (project === "div13") //Aula virtual
        { 
            var div10 = document.getElementById("10");
            var div12 = document.getElementById("12");
            var div14 = document.getElementById("14");
            removeAllEffectOnDIV(div10);
            removeAllEffectOnDIV(div12);
            removeAllEffectOnDIV(div14);
            div10.classList.add("overlayRightLeft");
            div12.classList.add("overlayBottomTop");
            div14.classList.add("overlayLeftRight");
        } 
        else if (project === "div14") //Servidor web
        { 
            var div8 = document.getElementById("8");
            var div13 = document.getElementById("13");
            removeAllEffectOnDIV(div8);
            removeAllEffectOnDIV(div13);
            div8.classList.add("overlayBottomTop");
            div13.classList.add("overlayRightLeft");
        }
    } 
    else if (w > 500 && w < 700) //3 columnas
    { 
        if (project === "div1") //Virtual Classroom
        { 
            var div2 = document.getElementById("2");
            var div6 = document.getElementById("6");
            removeAllEffectOnDIV(div2);
            removeAllEffectOnDIV(div6);
            div2.classList.add("overlayLeftRight");
            div6.classList.add("overlayTopBottom");
        } 
        else if (project === "div2") //Portafolio
        { 
            var div1 = document.getElementById("1");
            var div9 = document.getElementById("9");
            removeAllEffectOnDIV(div1);
            removeAllEffectOnDIV(div9);
            div1.classList.add("overlayRightLeft");
            div9.classList.add("overlayTopBottom");
        } 
        else if (project === "div3") //Covid
        { 
            var div4 = document.getElementById("4");
            var div5 = document.getElementById("5");
            var div13 = document.getElementById("13");
            removeAllEffectOnDIV(div4);
            removeAllEffectOnDIV(div5);
            removeAllEffectOnDIV(div13);
            div4.classList.add("overlayTopBottom");
            div5.classList.add("overlayRightLeft");
            div13.classList.add("overlayBottomTop");
        } 
        else if (project === "div4") //ToDoList
        { 
            var div3 = document.getElementById("3");
            var div8 = document.getElementById("8");
            var div14 = document.getElementById("14");
            removeAllEffectOnDIV(div3);
            removeAllEffectOnDIV(div8);
            removeAllEffectOnDIV(div14);
            div3.classList.add("overlayBottomTop");
            div8.classList.add("overlayRightLeft");
            div14.classList.add("overlayTopBottom");

        } 
        else if (project === "div5") //Paint
        {
            var div3 = document.getElementById("3");
            var div8 = document.getElementById("8");
            var div10 = document.getElementById("10");
            removeAllEffectOnDIV(div3);
            removeAllEffectOnDIV(div8);
            removeAllEffectOnDIV(div10);
            div3.classList.add("overlayLeftRight");
            div8.classList.add("overlayTopBottom");
            div10.classList.add("overlayBottomTop");
        } 
        else if (project === "div6") //CAR 
        {
            var div1 = document.getElementById("1");
            var div7 = document.getElementById("7");
            var div9 = document.getElementById("9");
            removeAllEffectOnDIV(div1);
            removeAllEffectOnDIV(div7);
            removeAllEffectOnDIV(div9);
            div1.classList.add("overlayBottomTop");
            div7.classList.add("overlayTopBottom");
            div9.classList.add("overlayLeftRight");

        } 
        else if (project === "div7") //Graficas 
        { 
            var div6 = document.getElementById("6");
            var div10 = document.getElementById("10");
            var div11 = document.getElementById("11");
            removeAllEffectOnDIV(div6);
            removeAllEffectOnDIV(div10);
            removeAllEffectOnDIV(div11);
            div6.classList.add("overlayBottomTop");
            div10.classList.add("overlayTopBottom");
            div11.classList.add("overlayLeftRight");
        } 
        else if (project === "div8") //Hotel Sweet Dreams
        { 
            var div4 = document.getElementById("4");
            var div5 = document.getElementById("5");
            var div14 = document.getElementById("14");
            removeAllEffectOnDIV(div4);
            removeAllEffectOnDIV(div5);
            removeAllEffectOnDIV(div14);
            div4.classList.add("overlayLeftRight");
            div5.classList.add("overlayBottomTop");
            div14.classList.add("overlayTopBottom");
        } 
        else if (project === "div9") //Simulador
        { 
            var div2 = document.getElementById("2");
            var div6 = document.getElementById("6");
            var div11 = document.getElementById("11");
            var div12 = document.getElementById("12");
            removeAllEffectOnDIV(div2);
            removeAllEffectOnDIV(div6);
            removeAllEffectOnDIV(div11);
            removeAllEffectOnDIV(div12);
            div2.classList.add("overlayBottomTop");
            div6.classList.add("overlayRightLeft");
            div11.classList.add("overlayTopBottom");
            div12.classList.add("overlayTopBottom");
        } 
        else if (project === "div10") //World TV
        { 
            var div5 = document.getElementById("5");
            var div7 = document.getElementById("7");
            var div11 = document.getElementById("11");
            var div13 = document.getElementById("13");
            removeAllEffectOnDIV(div5);
            removeAllEffectOnDIV(div7);
            removeAllEffectOnDIV(div11);
            removeAllEffectOnDIV(div13);
            div5.classList.add("overlayTopBottom");
            div7.classList.add("overlayBottomTop");
            div11.classList.add("overlayBottomTop");
            div13.classList.add("overlayLeftRight");
        } 
        else if (project === "div11") //Login
        { 
            var div7 = document.getElementById("7");
            var div9 = document.getElementById("9");
            var div10 = document.getElementById("10");
            var div12 = document.getElementById("12");
            removeAllEffectOnDIV(div7);
            removeAllEffectOnDIV(div9);
            removeAllEffectOnDIV(div10);
            removeAllEffectOnDIV(div12);
            div7.classList.add("overlayRightLeft");
            div9.classList.add("overlayBottomTop");
            div10.classList.add("overlayTopBottom");
            div12.classList.add("overlayLeftRight");
        } 
        else if (project === "div12") //Firechat
        { 
            var div9 = document.getElementById("9");
            var div11 = document.getElementById("11");
            var div13 = document.getElementById("13");
            removeAllEffectOnDIV(div9);
            removeAllEffectOnDIV(div11);
            removeAllEffectOnDIV(div13);
            div9.classList.add("overlayBottomTop");
            div11.classList.add("overlayRightLeft");
            div13.classList.add("overlayTopBottom");
        } 
        else if (project === "div13") //Aula virtual
        { 
            var div3 = document.getElementById("3");
            var div10 = document.getElementById("10");
            var div12 = document.getElementById("12");
            removeAllEffectOnDIV(div3);
            removeAllEffectOnDIV(div10);
            removeAllEffectOnDIV(div12);
            div3.classList.add("overlayTopBottom");
            div10.classList.add("overlayRightLeft");
            div12.classList.add("overlayBottomTop");
        } 
        else if (project === "div14") //Servidor web
        { 
            var div4 = document.getElementById("4");
            var div8 = document.getElementById("8");
            removeAllEffectOnDIV(div4);
            removeAllEffectOnDIV(div8);
            div4.classList.add("overlayBottomTop");
            div8.classList.add("overlayBottomTop");
        }
    } 
    else //1 columna
    { 
        if (project === "div1") //Virtual Classroom
        { 
            var div2 = document.getElementById("2");
            removeAllEffectOnDIV(div2);
            div2.classList.add("overlayTopBottom");
        } 
        else if (project === "div2") //Portafolio
        { 
            var div1 = document.getElementById("1");
            var div3 = document.getElementById("3");
            removeAllEffectOnDIV(div1);
            removeAllEffectOnDIV(div3);
            div1.classList.add("overlayBottomTop");
            div3.classList.add("overlayTopBottom");
        } 
        else if (project === "div3") //Covid
        { 
            var div2 = document.getElementById("2");
            var div4 = document.getElementById("4");
            removeAllEffectOnDIV(div2);
            removeAllEffectOnDIV(div4);
            div2.classList.add("overlayBottomTop");
            div4.classList.add("overlayTopBottom");
        } 
        else if (project === "div4") //ToDoList
        { 
            var div3 = document.getElementById("3");
            var div5 = document.getElementById("5");
            removeAllEffectOnDIV(div3);
            removeAllEffectOnDIV(div5);
            div3.classList.add("overlayBottomTop");
            div5.classList.add("overlayTopBottom");
        } 
        else if (project === "div5") //Paint
        {
            var div4 = document.getElementById("4");
            var div6 = document.getElementById("6");
            removeAllEffectOnDIV(div4);
            removeAllEffectOnDIV(div6);
            div4.classList.add("overlayBottomTop");
            div6.classList.add("overlayTopBottom");
        } 
        else if (project === "div6") //CAR 
        {
            var div5 = document.getElementById("5");
            var div7 = document.getElementById("7");
            removeAllEffectOnDIV(div5);
            removeAllEffectOnDIV(div7);
            div5.classList.add("overlayBottomTop");
            div7.classList.add("overlayTopBottom");

        } 
        else if (project === "div7") //Graficas 
        { 
            var div6 = document.getElementById("6");
            var div8 = document.getElementById("8");
            removeAllEffectOnDIV(div6);
            removeAllEffectOnDIV(div8);
            div6.classList.add("overlayBottomTop");
            div8.classList.add("overlayTopBottom");
        } 
        else if (project === "div8") //Hotel Sweet Dreams
        { 
            var div7 = document.getElementById("7");
            var div9 = document.getElementById("9");
            removeAllEffectOnDIV(div7);
            removeAllEffectOnDIV(div9);
            div7.classList.add("overlayBottomTop");
            div9.classList.add("overlayTopBottom");
        } 
        else if (project === "div9") //Simulador
        { 
            var div8 = document.getElementById("8");
            var div10 = document.getElementById("10");
            removeAllEffectOnDIV(div8);
            removeAllEffectOnDIV(div10);
            div8.classList.add("overlayBottomTop");
            div10.classList.add("overlayTopBottom");
        } 
        else if (project === "div10") //World TV
        { 
            var div9 = document.getElementById("9");
            var div11 = document.getElementById("11");
            removeAllEffectOnDIV(div9);
            removeAllEffectOnDIV(div11);
            div9.classList.add("overlayBottomTop");
            div11.classList.add("overlayTopBottom");
        } 
        else if (project === "div11") //Login
        { 
            var div10 = document.getElementById("10");
            var div12 = document.getElementById("12");
            removeAllEffectOnDIV(div10);
            removeAllEffectOnDIV(div12);
            div10.classList.add("overlayBottomTop");
            div12.classList.add("overlayTopBottom");
        } 
        else if (project === "div12") //Firechat
        { 
            var div11 = document.getElementById("11");
            var div13 = document.getElementById("13");
            removeAllEffectOnDIV(div11);
            removeAllEffectOnDIV(div13);
            div11.classList.add("overlayBottomTop");
            div13.classList.add("overlayTopBottom");
        } 
        else if (project === "div13") //Aula virtual
        { 
            var div12 = document.getElementById("12");
            var div14 = document.getElementById("14");
            removeAllEffectOnDIV(div12);
            removeAllEffectOnDIV(div14);
            div12.classList.add("overlayBottomTop");
            div14.classList.add("overlayTopBottom");
        } 
        else if (project === "div14") //Servidor web
        { 
            var div13 = document.getElementById("13");
            removeAllEffectOnDIV(div13);
            div13.classList.add("overlayBottomTop");
        }
    }
    removeAllEffectOnDIV(currentDIV);
    currentDIV.classList.add("overlay");
}

function removeAllEffectOnDIV(div) {
    if (div.classList.contains("overlay")) {
        div.classList.remove("overlay");
    }
    if (div.classList.contains("overlayLeftRight")) {
        div.classList.remove("overlayLeftRight");
    }
    if (div.classList.contains("overlayRightLeft")) {
        div.classList.remove("overlayRightLeft");
    }
    if (div.classList.contains("overlayTopBottom")) {
        div.classList.remove("overlayTopBottom");
    }
    if (div.classList.contains("overlayBottomTop")) {
        div.classList.remove("overlayBottomTop");
    }
}

var slideIndex = 1;
var selectedProject = 0;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "flex";
    var img = slides[slideIndex-1].children[0];
    if (list_projects[selectedProject].type === "APP") {
        img.style.width = "200px";
        img.style.height = "350px";
    }
    else{
        img.style.width = "450px";
        img.style.height = "350px";
    }
}