// assets/js/app.js
(() => {
  'use strict';
    $("#y").text(new Date().getFullYear());

    const header = $(".site-header");
    function onScroll(){
    $(window).scrollTop() > 10 ? header.addClass("is-scrolled") : header.removeClass("is-scrolled");

    const pos = $(window).scrollTop() + 140;
    $("section[id]").each(function(){
        const id = this.id, top = $(this).offset().top, h = $(this).outerHeight();
        const active = (pos >= top && pos < top + h);
        const $desk = $(`.nav-list a[href="#${id}"]`);
        const $mob  = $(`#mobileNav .m-link[href="#${id}"]`);
        $desk.toggleClass("is-active", active);
        $mob.toggleClass("is-active", active);
    });
    }
    $(document).on("scroll", onScroll); onScroll();

    const $html = $("html");
    const $body = $("body");
    const $drawer = $("#mobileNav");
    const $backdrop = $("#backdrop");
    const $burger = $("#burger");
    let lastFocus = null;

    function openDrawer(){
    lastFocus = document.activeElement;
    $html.addClass("drawer-open");
    $body.addClass("no-scroll");
    $drawer.attr({"aria-hidden":"false"}).removeAttr("inert");
    $burger.attr("aria-expanded","true");

    const first = $drawer.find("a,button,[tabindex]:not([tabindex='-1'])").get(0);
    if(first) first.focus();
    }

    function closeDrawer(focusBurger = true){
    $html.removeClass("drawer-open");
    $body.removeClass("no-scroll");
    $drawer.attr({"aria-hidden":"true"}).attr("inert", "");
    $burger.attr("aria-expanded","false");
    if(focusBurger && lastFocus) $(lastFocus).focus();
    }

    $burger.on("click", function(){
    if ($html.hasClass("drawer-open")) closeDrawer();
    else openDrawer();
    });
    $backdrop.on("click", () => closeDrawer());

    $(document).on("keydown", function(e){
    if(!$html.hasClass("drawer-open")) return;
    if(e.key === "Escape"){ e.preventDefault(); closeDrawer(); return; }
    if(e.key !== "Tab") return;
    const focusables = $drawer.find("a, button, input, [tabindex]:not([tabindex='-1'])").filter(":visible");
    if(!focusables.length) return;
    const first = focusables.get(0), last = focusables.get(focusables.length - 1);
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    });

    $(window).on("resize", function(){
    if (window.matchMedia("(min-width: 981px)").matches) closeDrawer(false);
    });

    function smoothTo(href, closeAfter = false){
    const $t = $(href);
    if(!$t.length) return;

    const offset = $(".site-header").outerHeight() + 20;
    const dest = $t.offset().top - offset;
    const curr = $(window).scrollTop();
    const delta = Math.abs(curr - dest);

    if (delta < 4){
        if (closeAfter) closeDrawer();
        return;
    }
    $("html, body").stop(true).animate({ scrollTop: dest }, 280, "linear", function(){
        if (closeAfter) closeDrawer();
    });
    }

    $(document).on("click", '.nav-list a[href^="#"], #mobileNav .m-link[href^="#"]', function(e){
    const href = this.getAttribute("href");
    if (!href) return;
    e.preventDefault();
    const closeAfter = this.closest("#mobileNav") !== null;
    smoothTo(href, closeAfter);
    });

    $(".filters .chip").on("click", function () {
    $(".filters .chip").removeClass("is-active"); $(this).addClass("is-active");
    const f = $(this).data("filter");
    if (f === "*") { $(".portfolio .folio").show(); return; }
    $(".portfolio .folio").hide().filter("." + f).fadeIn(500);
    });
})();