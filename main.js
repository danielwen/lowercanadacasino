function navop(e) {
    e.preventDefault();
    if (window.innerWidth < 1050) $("#header").toggleClass("expand");
}

function overview() {
    var overview = $("#overview");
    if (window.innerWidth < 1050 && !overview.hasClass("float")) {
        overview.remove().addClass("float info white");
        $("#floats").prepend(overview);
    } else if (window.innerWidth >= 1050 && overview.hasClass("float")) {
        overview.remove().removeClass("float info white");
        $("#side").append(overview);
    }
}
function robotResize() {
    overview();
    var width = $("#gallery").css("width").slice(0,-2);
    var height = parseInt(width*5/8) + "px";
    $("#gallerywrap").css("height", height);
}

var gallerytimer = true;
function gallery(dir) {
    gallerytimer = false;
    var gallery = $("#gallery");
    if (dir > 0) {
        var ext = gallery.children().first();
        ext.remove().css("left", "200%");
    } else {
        var ext = gallery.children().last();
        ext.remove().css("left", "-100%");
    }
    gallery.children().each(function() {
        var temp = this.style.left.slice(0,-1);
        this.style.left = parseInt(temp) - dir*100 + "%";
    });
    if (dir > 0) gallery.append(ext);
    else gallery.prepend(ext);
    var t = setTimeout(function() {
        gallerytimer = true;
    }, 510);
}

var logtoggle = true;
function logmonth(target) {
    logtoggle = false;
    var month = target.attr("href");
    var pos = $(month).offset().top;
    var scroll = $(window).scrollTop();
    var diff = pos - scroll;
    if (diff == 0) {
        logtoggle = true;
    } else {
        var page = $("#page");
        page.css("margin-top", diff + "px");
        $(window).scrollTop(scroll + diff);
        page.css({"transition": "margin-top 1s",
                  "margin-top": "0px"
                 });
        page.on("transitionend", function() {
            page.css("transition", "none");
            window.location.hash = month;
            logtoggle = true;
        });
    }
}

var entrytimer = true;
function entry2(active) {
    var last = active.children().last();
    active.children().first().css("top", "0px");
    last.css("top", "500px");
    var t = setTimeout(function() {
        last.remove();
        last.css("top", "-500px");
        active.prepend(last);
        entrytimer = true;
    }, 510);
}
function entry(target) {
    entrytimer = false;
    var active = $(".active");
    if (active.length != 0) {
        entry2(active);
        active.removeClass("active");
        var t = setTimeout(function() {
            entry2(target);
            target.addClass("active");
        }, 250);
    } else {
        entry2(target);
        target.addClass("active");
    }
}

$("document").ready(function() {
    var page = document.title.match(/[^-]+/)[0].slice(0, -1);
    var header = $("#header");
    if (page == "The robot" || page == "Le robot") {
    	$("#navrobot").click(function(e) {
            navop(e);
        });
        $(window).resize(function() {
            var t = setTimeout(robotResize, 200);
        });
        $("#galleryleft").click(function(e) {
            e.preventDefault();
            if (gallerytimer) gallery(-1);
        });
        $("#galleryright").click(function(e) {
            e.preventDefault();
            if (gallerytimer) gallery(1);
        });
        robotResize();
    } else if (page == "The game" || page == "Le jeu") {
    	$("#navgame").click(function(e) {
            navop(e);
        });
        $(window).resize(function() {
            var t = setTimeout(overview, 200);
        });
        overview();
    } else if (page == "Event log" || page == "Journal") {
        $("#navevents").click(function(e) {
            navop(e);
        });
        $(".logmonth").click(function(e) {
            e.preventDefault();
            if (logtoggle) {
                logmonth($(this));
            }
        });
        $(".datewrap").click(function() {
            if (entrytimer && !$(this).hasClass("active")) {
                entry($(this));
            }
        });
    } else if (page == "About us" || page == "À propos") {
    	$("#navabout").click(function(e) {
            navop(e);
        });
    }
    if (window.innerWidth < 1100) {
        $(window).scroll(function() {
            header.removeClass("expand");
        });
        $(window).on("touchmove", function() {
            header.removeClass("expand");
        });
        if (window.innerWidth >= 780) {
            var collapsetime = setTimeout(function() {
                header.removeClass("expand");
            }, 1500);
        }
    }
    $("#navexpand").click(function() {
        header.toggleClass("expand");
    });
});