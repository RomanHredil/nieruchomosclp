("com-page-header-team", 
    function () {
    var a, e = this.e().find(".we-are"),
        t = this.e().find(".people-slider"),
        i = [],
        r = this.e().find(".head-item"),
        n = [{
            i: 0,
            from: 0,
            to: 0,
            center: 0,
            name: "all"
        }, {
            i: 0,
            from: 0,
            to: 7.769427,
            center: 6.675142,
            name: "founders"
        }, {
            i: 1,
            from: 7.769427,
            to: 18.274569,
            center: 16.98,
            name: "marketing"
        }, {
            i: 2,
            from: 18.274569,
            to: 32.500281,
            center: 31.296566,
            name: "engineers"
        }, {
            i: 3,
            from: 32.500281,
            to: 44.975136,
            center: 42.88085,
            name: "support"
        }, {
            i: 4,
            from: 44.975136,
            to: 56.024,
            center: 52.416277,
            name: "managers"
        }],
        o = !1,
        s = this.e().find("#people-video").get(0),
        l = null;

    function updateOptionsDimentions() {
        for (var e = 0; e < i.length; e++) i[e].w = i[e].e.outerWidth(), i[e].h = i[e].e.outerHeight(), i[e].svg.attr("viewbox", "0 0 " + i[e].w + " " + i[e].h), i[e].svg.attr("width", i[e].w), i[e].svg.attr("height", i[e].h), i[e].rect.attr({
            width: i[e].w - 2,
            height: i[e].h - 2,
            rx: i[e].h / 2,
            ry: i[e].h / 2
        }), i[e].rectBG.attr({
            width: i[e].w - 2,
            height: i[e].h - 2,
            rx: i[e].h / 2,
            ry: i[e].h / 2
        })
    }

    function getItemByName(e) {
        for (var t = null, r = 0; r < i.length; r++)
            if (i[r].name === e) {
                t = i[r];
                break
            } return t
    }

    function updateDashLength() {
        for (var e, t, r = 0; r < i.length; r++) t = i[r].h / 2, e = 2 * Math.PI * t, i[r].l = Math.round(2 * (i[r].w - 2 * t) + e), i[r].selected ? i[r].rect.attr({
            "stroke-dasharray": i[r].l - 5.5 + "," + (i[r].l - 3),
            "stroke-dashoffset": 0
        }) : i[r].rect.attr({
            "stroke-dasharray": i[r].l + "," + i[r].l,
            "stroke-dashoffset": i[r].l
        })
    }

    function Freeze(e) {
        if (e) {
            for (var t = 0; t < i.length; t++) i[t].e.addClass("frozen");
            o = !0
        } else {
            for (t = 0; t < i.length; t++) i[t].e.removeClass("frozen");
            o = !1
        }
    }

    function switchTo(e) {
        if (l.name !== e.name) {
            Freeze(!0), updateOptionsDimentions(), updateDashLength(), "init" === e && (e = getItemByName("all")).rect.attr({
                "stroke-dasharray": e.l - 5.5 + "," + e.l,
                "stroke-dashoffset": 0
            }), l.e.removeClass("selected");
            for (var t = 0; t < i.length; t++) i[t].rect.attr({
                style: "",
                "stroke-dasharray": i[t].l + "," + i[t].l,
                "stroke-dashoffset": i[t].l
            });
            e.e.addClass("selected");
            var r = l.timing.to - l.timing.center + (e.timing.center - e.timing.from);
            setTimeout(function () {
                console.log("animation complete!")
            }, 1e3 * r), e.rect.attr({
                style: "transition : stroke-dashoffset " + r + "s ease",
                "stroke-dasharray": e.l - 5.5 + "," + e.l,
                "stroke-dashoffset": 0
            });
            var n = e.e.parent();
            n.removeClass("role-all role-managers role-founders role-marketing role-engineers role-support"), n.addClass("role-" + (e ? e.name : "all")),
                function playToEnd(e, t) {
                    e ? (s.play(), clearTimeout(a), a = setTimeout(function () {
                        s.pause(), t && t()
                    }, 1e3 * (e.to - s.currentTime))) : t && t()
                }(l.timing, function () {
                    l.selected = !1, (l = e).selected = !0, e.timing ? function playToCenter(e, t) {
                        clearTimeout(a), s.currentTime = e.from, s.play(), a = setTimeout(function () {
                            s.pause(), t && t(), Freeze(!1)
                        }, 1e3 * (e.center - s.currentTime))
                    }(e.timing) : (s.currentTime = 0, l = null, Freeze(!1))
                })
        }
    }
    s.pause(), /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) ? t.css("display", "block") : e.css("display", "block"), r.each(function (e) {
        var t = $(this),
            r = {
                w: t.outerWidth(),
                h: t.outerHeight(),
                svg: t.find("svg").first(),
                l: 0,
                e: t,
                selected: !1,
                name: n[e].name,
                timing: n[e]
            };
        r.rect = Snap(r.svg[0]).selectAll(".rect")[0], r.rectBG = Snap(r.svg[0]).selectAll(".rect_bg")[0], t.on("click", function (e) {
            o || r.selected || switchTo(r)
        }), i.push(r)
    }), l = getItemByName("all"), updateOptionsDimentions(), updateDashLength(), SPL.on("page-resize", function () {
        updateDashLength()
    }), Object.defineProperty(HTMLMediaElement.prototype, "playing", {
        get: function () {
            return !!(0 < this.currentTime && !this.paused && !this.ended && 2 < this.readyState)
        }
    }), SPL.on("page-resize", function () {
        updateOptionsDimentions(), updateDashLength()
    }), SPL.on("page-ready", function () {
        switchTo("init")
    }), s.ontimeupdate = function () {
        l = getItemByName("all");
        for (var e = 0; e < n.length; e++) {
            var t = n[e];
            if (s.currentTime > t.from && s.currentTime <= t.to) {
                l = getItemByName(t.name);
                break
            }
        }
    }
});
