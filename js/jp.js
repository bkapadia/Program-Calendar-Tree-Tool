(function () {
    var a = function () {
        var ac = function () {
            var ah = {};
            this.bind = function (ak, al) {
                var ai = function (an, am) {
                    B(ah, an, am)
                };
                if (ak.constructor == Array) {
                    for (var aj = 0; aj < ak.length; aj++) {
                        ai(ak[aj], al)
                    }
                } else {
                    ai(ak, al)
                }
            };
            this.fireUpdate = function (aj, ak) {
                if (ah[aj]) {
                    for (var ai = 0; ai < ah[aj].length; ai++) {
                        try {
                            ah[aj][ai][aj](ak)
                        } catch (al) {
                            n("jsPlumb: fireUpdate failed for event " + aj + ";not fatal.")
                        }
                    }
                }
            };
            this.clearListeners = function () {
                delete ah;
                ah = {}
            }
        };
        var l = this;
        var R = !! !document.createElement("canvas").getContext;
        var o = null;
        var X = function () {
            b.repaintEverything()
        };
        var f = true;

        function W() {
            if (f) {
                X()
            }
        }
        var V = null;
        var T = {};
        var C = {};
        var u = {};
        var F = {};
        var k = {};
        var J = {};
        var S = {};
        var I = true;
        var y = [];
        var Y = {};
        var g = "DEFAULT";
        var L = 1200;
        var P = function (aj, ak, ah, an) {
            var am = function (aq, ap) {
                if (aq === ap) {
                    return true
                } else {
                    if (typeof aq == "object" && typeof ap == "object") {
                        var ar = true;
                        for (var ao in aq) {
                            if (!am(aq[ao], ap[ao])) {
                                ar = false;
                                break
                            }
                        }
                        for (var ao in ap) {
                            if (!am(ap[ao], aq[ao])) {
                                ar = false;
                                break
                            }
                        }
                        return ar
                    }
                }
            };
            for (var al = +ah || 0, ai = aj.length; al < ai; al++) {
                if (am(aj[al], ak)) {
                    return al
                }
            }
            return -1
        };
        var B = function (ak, ai, aj) {
            var ah = ak[ai];
            if (ah == null) {
                ah = [];
                ak[ai] = ah
            }
            ah.push(aj);
            return ah
        };
        var A = function (ah, ai) {
            if (!ai) {
                document.body.appendChild(ah)
            } else {
                b.CurrentLibrary.appendElement(ah, ai)
            }
        };
        var ad = function () {
            return "" + (new Date()).getTime()
        };
        var ae = function (am, au, ap) {
            var ah = q(am, "id");
            var ai = T[ah];
            if (!ap) {
                ap = ad()
            }
            if (ai) {
                m({
                    elId: ah,
                    offset: au,
                    recalc: false,
                    timestamp: ap
                });
                var aq = F[ah],
                    ao = y[ah];
                for (var an = 0; an < ai.length; an++) {
                    ai[an].paint({
                        timestamp: ap,
                        offset: aq,
                        dimensions: ao
                    });
                    var aj = ai[an].connections;
                    for (var al = 0; al < aj.length; al++) {
                        aj[al].paint({
                            elId: ah,
                            ui: au,
                            recalc: false,
                            timestamp: ap
                        });
                        var aw = aj[al].endpoints[0] == ai[an] ? 1 : 0;
                        if (aj[al].endpoints[aw].anchor.isDynamic && !aj[al].endpoints[aw].isFloating()) {
                            var ak = aw == 0 ? aj[al].sourceId : aj[al].targetId;
                            var ar = F[ak],
                                at = y[ak];
                            var av = aj[al].endpoints[aw].anchor.compute({
                                xy: [ar.left, ar.top],
                                wh: at,
                                element: aj[al].endpoints[aw],
                                txy: [aq.left, aq.top],
                                twh: ao,
                                tElement: ai[an]
                            });
                            aj[al].endpoints[aw].paint({
                                anchorLoc: av
                            })
                        }
                    }
                }
            }
        };
        var s = function (ai, ak) {
            var al = null;
            if (ai.constructor == Array) {
                al = [];
                for (var ah = 0; ah < ai.length; ah++) {
                    var aj = U(ai[ah]),
                        am = q(aj, "id");
                    al.push(ak(aj, am))
                }
            } else {
                var aj = U(ai),
                    am = q(aj, "id");
                al = ak(aj, am)
            }
            return al
        };
        var n = function (ah) {
            if (l.logEnabled && typeof console != "undefined") {
                console.log(ah)
            }
        };
        var q = function (ah, ai) {
            return b.CurrentLibrary.getAttribute(U(ah), ai)
        };
        var Q = function (ai, aj, ah) {
            b.CurrentLibrary.setAttribute(U(ai), aj, ah)
        };
        var af = function (ai, ah) {
            b.CurrentLibrary.addClass(U(ai), ah)
        };
        var H = function (ai, ah) {
            b.CurrentLibrary.removeClass(U(ai), ah)
        };
        var U = function (ah) {
            return b.CurrentLibrary.getElementObject(ah)
        };
        var d = function (ah) {
            return b.CurrentLibrary.getOffset(U(ah))
        };
        var h = function (ah) {
            return b.CurrentLibrary.getSize(U(ah))
        };
        var ag = function (ah, ai) {
            var aj = U(ah);
            var ak = q(aj, "id");
            if (!ak || ak == "undefined") {
                if (arguments.length == 2 && arguments[1] != undefined) {
                    ak = ai
                } else {
                    ak = "jsPlumb_" + ad()
                }
                Q(aj, "id", ak)
            }
            return ak
        };
        var G = function (ah) {
            return C[ah]
        };
        var x = function (al, ak, aj) {
            var ah = ak == null ? I : ak;
            if (ah) {
                if (b.CurrentLibrary.isDragSupported(al) && !b.CurrentLibrary.isAlreadyDraggable(al)) {
                    var ai = aj || l.Defaults.DragOptions || b.Defaults.DragOptions;
                    ai = b.extend({}, ai);
                    var an = b.CurrentLibrary.dragEvents.drag;
                    var am = b.CurrentLibrary.dragEvents.stop;
                    ai[an] = Z(ai[an], function () {
                        var ao = b.CurrentLibrary.getUIPosition(arguments);
                        ae(al, ao);
                        af(al, "jsPlumb_dragged")
                    });
                    ai[am] = Z(ai[am], function () {
                        var ao = b.CurrentLibrary.getUIPosition(arguments);
                        ae(al, ao);
                        H(al, "jsPlumb_dragged")
                    });
                    var ah = S[ag(al)];
                    ai.disabled = ah == null ? false : !ah;
                    b.CurrentLibrary.initDraggable(al, ai)
                }
            }
        };
        var E = function (ai, ak, aj) {
            var ah = document.createElement("canvas");
            A(ah, ak);
            ah.style.position = "absolute";
            if (ai) {
                ah.className = ai
            }
            ag(ah, aj);
            if (R) {
                b.sizeCanvas(ah, 0, 0, L, L);
                ah = G_vmlCanvasManager.initElement(ah)
            }
            return ah
        };
        var D = function (aj, al) {
            var ah = T[aj];
            if (ah && ah.length) {
                for (var ak = 0; ak < ah.length; ak++) {
                    for (var ai = 0; ai < ah[ak].connections.length; ai++) {
                        var am = al(ah[ak].connections[ai]);
                        if (am) {
                            return
                        }
                    }
                }
            }
        };
        var t = function (ai) {
            for (var ah in T) {
                D(ah, ai)
            }
        };
        var O = function (ah, ai) {
            if (ah != null) {
                if (!ai) {
                    try {
                        document.body.removeChild(ah)
                    } catch (aj) {}
                } else {
                    b.CurrentLibrary.removeElement(ah, ai)
                }
            }
        };
        var z = function (aj, ai) {
            for (var ah = 0; ah < aj.length; ah++) {
                O(aj[ah], ai)
            }
        };
        var v = function (al, aj, ak) {
            if (aj != null) {
                var ah = al[aj];
                if (ah != null) {
                    var ai = P(ah, ak);
                    if (ai >= 0) {
                        delete(ah[ai]);
                        ah.splice(ai, 1);
                        return true
                    }
                }
            }
            return false
        };
        var c = function (ai, ah) {
            return s(ai, function (aj, ak) {
                S[ak] = ah;
                if (b.CurrentLibrary.isDragSupported(aj)) {
                    b.CurrentLibrary.setDraggable(aj, ah)
                }
            })
        };
        var aa = function (ah, ai) {
            D(q(ah, "id"), function (aj) {
                aj.canvas.style.display = ai
            })
        };
        var w = function (ah) {
            return s(ah, function (aj, ai) {
                var ak = S[ai] == null ? I : S[ai];
                ak = !ak;
                S[ai] = ak;
                b.CurrentLibrary.setDraggable(aj, ak);
                return ak
            })
        };
        var e = function (ah) {
            D(ah, function (aj) {
                var ai = ("none" == aj.canvas.style.display);
                aj.canvas.style.display = ai ? "block" : "none"
            })
        };
        var m = function (am) {
            var ak = am.timestamp,
                ah = am.recalc,
                al = am.offset,
                ai = am.elId;
            if (!ah) {
                if (ak && ak === k[ai]) {
                    return
                }
            }
            if (ah || al == null) {
                var aj = U(ai);
                y[ai] = h(aj);
                F[ai] = d(aj);
                k[ai] = ak
            } else {
                F[ai] = al
            }
        };
        var Z = function (aj, ah, ai) {
            aj = aj || function () {};
            ah = ah || function () {};
            return function () {
                var ak = null;
                try {
                    ak = ah.apply(this, arguments)
                } catch (al) {
                    n("jsPlumb function failed : " + al)
                }
                if (ai == null || (ak !== ai)) {
                    try {
                        aj.apply(this, arguments)
                    } catch (al) {
                        n("wrapped function failed : " + al)
                    }
                }
                return ak
            }
        };
        var M = function (al) {
            var aj = this;
            this.x = al.x || 0;
            this.y = al.y || 0;
            var ai = al.orientation || [0, 0];
            var ak = null,
                ah = null;
            this.offsets = al.offsets || [0, 0];
            aj.timestamp = null;
            this.compute = function (ar) {
                var ax = ar.xy,
                    an = ar.wh,
                    at = ar.element,
                    au = ar.timestamp;
                if (au && au === aj.timestamp) {
                    return ah
                }
                ah = [ax[0] + (aj.x * an[0]) + aj.offsets[0], ax[1] + (aj.y * an[1]) + aj.offsets[1]];
                var ao = at ? at.container : null;
                var av = {
                    left: 0,
                    top: 0
                };
                if (ao != null) {
                    var am = U(ao);
                    var ap = d(am);
                    var aq = b.CurrentLibrary.getScrollLeft(am);
                    var aw = b.CurrentLibrary.getScrollTop(am);
                    av.left = ap.left - aq;
                    av.top = ap.top - aw;
                    ah[0] = ah[0] - av.left;
                    ah[1] = ah[1] - av.top
                }
                aj.timestamp = au;
                return ah
            };
            this.getOrientation = function () {
                return ai
            };
            this.equals = function (am) {
                if (!am) {
                    return false
                }
                var an = am.getOrientation();
                var ap = this.getOrientation();
                return this.x == am.x && this.y == am.y && this.offsets[0] == am.offsets[0] && this.offsets[1] == am.offsets[1] && ap[0] == an[0] && ap[1] == an[1]
            };
            this.getCurrentLocation = function () {
                return ah
            }
        };
        var r = function (an) {
            var al = an.reference;
            var am = an.referenceCanvas;
            var aj = h(U(am));
            var ai = 0,
                ao = 0;
            var ah = null;
            var ak = null;
            this.compute = function (au) {
                var ar = au.xy,
                    aq = au.element;
                var ap = [ar[0] + (aj[0] / 2), ar[1] + (aj[1] / 2)];
                if (aq.container != null) {
                    var at = d(aq.container);
                    ap[0] = ap[0] - at.left;
                    ap[1] = ap[1] - at.top
                }
                ak = ap;
                return ap
            };
            this.getOrientation = function () {
                if (ah) {
                    return ah
                } else {
                    var ap = al.getOrientation();
                    return [Math.abs(ap[0]) * ai * -1, Math.abs(ap[1]) * ao * -1]
                }
            };
            this.over = function (ap) {
                ah = ap.getOrientation()
            };
            this.out = function () {
                ah = null
            };
            this.getCurrentLocation = function () {
                return ak
            }
        };
        var K = function (aj, ai) {
            this.isSelective = true;
            this.isDynamic = true;
            var aq = aj || [];
            var ao = function (ar) {
                return ar.constructor == M ? ar : b.makeAnchor(ar)
            };
            for (var an = 0; an < aq.length; an++) {
                aq[an] = ao(aq[an])
            }
            this.addAnchor = function (ar) {
                aq.push(ao(ar))
            };
            this.getAnchors = function () {
                return aq
            };
            var ak = aq.length > 0 ? aq[0] : null;
            var am = aq.length > 0 ? 0 : -1;
            this.locked = false;
            var ap = this;
            var al = function (au, ar, aA, az, at) {
                var aw = az[0] + (au.x * at[0]),
                    av = az[1] + (au.y * at[1]);
                return Math.sqrt(Math.pow(ar - aw, 2) + Math.pow(aA - av, 2))
            };
            var ah = ai || function (aC, at, au, av, ar) {
                    var ax = au[0] + (av[0] / 2),
                        aw = au[1] + (av[1] / 2);
                    var az = -1,
                        aB = Infinity;
                    for (var ay = 0; ay < ar.length; ay++) {
                        var aA = al(ar[ay], ax, aw, aC, at);
                        if (aA < aB) {
                            az = ay + 0;
                            aB = aA
                        }
                    }
                    return ar[az]
                };
            this.compute = function (aw) {
                var av = aw.xy,
                    ar = aw.wh,
                    au = aw.timestamp,
                    at = aw.txy,
                    ay = aw.twh;
                if (ap.locked || at == null || ay == null) {
                    return ak.compute(aw)
                } else {
                    aw.timestamp = null
                }
                ak = ah(av, ar, at, ay, aq);
                var ax = ak.compute(aw);
                return ax
            };
            this.getCurrentLocation = function () {
                var ar = ak != null ? ak.getCurrentLocation() : null;
                return ar
            };
            this.getOrientation = function () {
                return ak != null ? ak.getOrientation() : [0, 0]
            };
            this.over = function (ar) {
                if (ak != null) {
                    ak.over(ar)
                }
            };
            this.out = function () {
                if (ak != null) {
                    ak.out()
                }
            }
        };
        var p = function (am) {
            ac.apply(this);
            var at = this;
            var ai = new String("_jsplumb_c_" + (new Date()).getTime());
            this.getId = function () {
                return ai
            };
            this.container = am.container || l.Defaults.Container;
            this.source = U(am.source);
            this.target = U(am.target);
            if (am.sourceEndpoint) {
                this.source = am.sourceEndpoint.getElement()
            }
            if (am.targetEndpoint) {
                this.target = am.targetEndpoint.getElement()
            }
            this.sourceId = q(this.source, "id");
            this.targetId = q(this.target, "id");
            this.endpointsOnTop = am.endpointsOnTop != null ? am.endpointsOnTop : true;
            this.scope = am.scope;
            this.endpoints = [];
            this.endpointStyles = [];
            var ah = function (au) {
                if (au) {
                    return b.makeAnchor(au)
                }
            };
            var ap = function (au, ax, av, aw) {
                if (au) {
                    at.endpoints[ax] = au;
                    au.addConnection(at)
                } else {
                    if (!av.endpoints) {
                        av.endpoints = [null, null]
                    }
                    var aC = av.endpoints[ax] || av.endpoint || l.Defaults.Endpoints[ax] || b.Defaults.Endpoints[ax] || l.Defaults.Endpoint || b.Defaults.Endpoint || new b.Endpoints.Dot();
                    if (aC.constructor == String) {
                        aC = new b.Endpoints[aC]()
                    }
                    if (!av.endpointStyles) {
                        av.endpointStyles = [null, null]
                    }
                    var aA = av.endpointStyles[ax] || av.endpointStyle || l.Defaults.EndpointStyles[ax] || b.Defaults.EndpointStyles[ax] || l.Defaults.EndpointStyle || b.Defaults.EndpointStyle;
                    var az = av.anchors ? av.anchors[ax] : ah(l.Defaults.Anchors[ax]) || ah(b.Defaults.Anchors[ax]) || ah(l.Defaults.Anchor) || ah(b.Defaults.Anchor) || ah("BottomCenter");
                    var aB = av.uuids ? av.uuids[ax] : null;
                    var ay = new ab({
                        style: aA,
                        endpoint: aC,
                        connections: [at],
                        uuid: aB,
                        anchor: az,
                        source: aw,
                        container: at.container
                    });
                    at.endpoints[ax] = ay;
                    return ay
                }
            };
            var al = ap(am.sourceEndpoint, 0, am, at.source);
            if (al) {
                B(T, this.sourceId, al)
            }
            var ak = ap(am.targetEndpoint, 1, am, at.target);
            if (ak) {
                B(T, this.targetId, ak)
            }
            if (!this.scope) {
                this.scope = this.endpoints[0].scope
            }
            this.connector = this.endpoints[0].connector || this.endpoints[1].connector || am.connector || l.Defaults.Connector || b.Defaults.Connector || new b.Connectors.Bezier();
            if (this.connector.constructor == String) {
                this.connector = new b.Connectors[this.connector]()
            }
            this.paintStyle = this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || am.paintStyle || l.Defaults.PaintStyle || b.Defaults.PaintStyle;
            this.backgroundPaintStyle = this.endpoints[0].connectorBackgroundStyle || this.endpoints[1].connectorBackgroundStyle || am.backgroundPaintStyle || l.Defaults.BackgroundPaintStyle || b.Defaults.BackgroundPaintStyle;
            this.overlays = am.overlays || [];
            this.addOverlay = function (au) {
                overlays.push(au)
            };
            this.labelStyle = am.labelStyle || l.Defaults.LabelStyle || b.Defaults.LabelStyle;
            this.label = am.label;
            if (this.label) {
                this.overlays.push(new b.Overlays.Label({
                    labelStyle: this.labelStyle,
                    label: this.label
                }))
            }
            m({
                elId: this.sourceId
            });
            m({
                elId: this.targetId
            });
            this.distanceFrom = function (au) {
                return at.connector.distanceFrom(au)
            };
            this.setLabel = function (au) {
                at.label = au;
                l.repaint(at.source)
            };
            var ao = F[this.sourceId],
                an = y[this.sourceId];
            var ar = F[this.targetId];
            otherWH = y[this.targetId];
            var aq = this.endpoints[0].anchor.compute({
                xy: [ao.left, ao.top],
                wh: an,
                element: this.endpoints[0],
                txy: [ar.left, ar.top],
                twh: otherWH,
                tElement: this.endpoints[1]
            });
            this.endpoints[0].paint({
                anchorLoc: aq
            });
            aq = this.endpoints[1].anchor.compute({
                xy: [ar.left, ar.top],
                wh: otherWH,
                element: this.endpoints[1],
                txy: [ao.left, ao.top],
                twh: an,
                tElement: this.endpoints[0]
            });
            this.endpoints[1].paint({
                anchorLoc: aq
            });
            var aj = E(b.connectorClass, at.container);
            this.canvas = aj;
            this.paint = function (aP) {
                aP = aP || {};
                var aE = aP.elId,
                    aG = aP.ui,
                    aC = aP.recalc,
                    av = aP.timestamp;
                var ay = at.floatingAnchorIndex;
                var aH = false;
                var aO = aH ? this.sourceId : this.targetId,
                    aB = aH ? this.targetId : this.sourceId;
                var aw = aH ? 0 : 1,
                    aQ = aH ? 1 : 0;
                var au = aH ? this.target : this.source;
                if (this.canvas.getContext) {
                    m({
                        elId: aE,
                        offset: aG,
                        recalc: aC,
                        timestamp: av
                    });
                    m({
                        elId: aO,
                        timestamp: av
                    });
                    var aJ = aj.getContext("2d");
                    var az = this.endpoints[aQ].anchor.getCurrentLocation();
                    var aA = this.endpoints[aQ].anchor.getOrientation();
                    var aM = this.endpoints[aw].anchor.getCurrentLocation();
                    var aN = this.endpoints[aw].anchor.getOrientation();
                    var ax = 0;
                    for (var aL = 0; aL < at.overlays.length; aL++) {
                        var aI = at.overlays[aL];
                        var aF = aI.computeMaxSize(at.connector, aJ);
                        if (aF > ax) {
                            ax = aF
                        }
                    }
                    var aK = this.connector.compute(az, aM, this.endpoints[aQ].anchor, this.endpoints[aw].anchor, this.paintStyle.lineWidth, ax);
                    b.sizeCanvas(aj, aK[0], aK[1], aK[2], aK[3]);
                    var aD = function (aR, aU) {
                        aR.save();
                        b.extend(aR, aU);
                        if (aU.gradient && !R) {
                            var aT = at.connector.createGradient(aK, aR, (aE == this.sourceId));
                            for (var aS = 0; aS < aU.gradient.stops.length; aS++) {
                                aT.addColorStop(aU.gradient.stops[aS][0], aU.gradient.stops[aS][1])
                            }
                            aR.strokeStyle = aT
                        }
                        at.connector.paint(aK, aR);
                        aR.restore()
                    };
                    if (this.backgroundPaintStyle != null) {
                        aD(aJ, this.backgroundPaintStyle)
                    }
                    aD(aJ, this.paintStyle);
                    for (var aL = 0; aL < at.overlays.length; aL++) {
                        var aI = at.overlays[aL];
                        aI.draw(at.connector, aJ)
                    }
                }
            };
            this.repaint = function () {
                this.paint({
                    elId: this.sourceId,
                    recalc: true
                })
            };
            x(at.source, am.draggable, am.dragOptions);
            x(at.target, am.draggable, am.dragOptions);
            if (this.source.resize) {
                this.source.resize(function (au) {
                    b.repaint(at.sourceId)
                })
            }
        };
        var ab = function (aG) {
            aG = aG || {};
            var au = this;
            var av = new String("_jsplumb_e_" + (new Date()).getTime());
            this.getId = function () {
                return av
            };
            if (aG.dynamicAnchors) {
                au.anchor = new K(b.makeAnchors(aG.dynamicAnchors))
            } else {
                au.anchor = aG.anchor ? b.makeAnchor(aG.anchor) : aG.anchors ? b.makeAnchor(aG.anchors) : b.makeAnchor("TopCenter")
            }
            var ar = aG.endpoint || new b.Endpoints.Dot();
            if (ar.constructor == String) {
                ar = new b.Endpoints[ar]()
            }
            au.endpoint = ar;
            var an = aG.style || l.Defaults.EndpointStyle || b.Defaults.EndpointStyle;
            this.connectorStyle = aG.connectorStyle;
            this.connectorOverlays = aG.connectorOverlays;
            this.connector = aG.connector;
            this.isSource = aG.isSource || false;
            this.isTarget = aG.isTarget || false;
            var at = aG.source,
                ap = aG.uuid;
            var aE = null,
                aj = null;
            if (ap) {
                C[ap] = au
            }
            this.container = aG.container || l.Defaults.Container || b.Defaults.Container;
            var am = q(at, "id");
            this.elementId = am;
            var aA = aG.maxConnections || 1;
            this.canvas = aG.canvas || E(b.endpointClass, this.container, aG.uuid);
            this.connections = aG.connections || [];
            this.scope = aG.scope || g;
            this.timestamp = null;
            var aq = aG.reattach || false;
            this.dragAllowedWhenFull = aG.dragAllowedWhenFull || true;
            this.computeAnchor = function (aH) {
                return au.anchor.compute(aH)
            };
            this.addConnection = function (aH) {
                au.connections.push(aH)
            };
            this.detach = function (aI, aK) {
                var aH = P(au.connections, aI);
                if (aH >= 0) {
                    au.connections.splice(aH, 1);
                    if (!aK) {
                        var aJ = aI.endpoints[0] == au ? aI.endpoints[1] : aI.endpoints[0];
                        aJ.detach(aI, true)
                    }
                    O(aI.canvas, aI.container);
                    v(u, aI.scope, aI);
                    if (!aK) {
                        N(aI)
                    }
                }
            };
            this.detachAll = function () {
                while (au.connections.length > 0) {
                    au.detach(au.connections[0])
                }
            };
            this.detachFrom = function (aI) {
                var aJ = [];
                for (var aH = 0; aH < au.connections.length; aH++) {
                    if (au.connections[aH].endpoints[1] == aI || au.connections[aH].endpoints[0] == aI) {
                        aJ.push(au.connections[aH])
                    }
                }
                for (var aH = 0; aH < aJ.length; aH++) {
                    au.detach(aJ[aH])
                }
            };
            this.detachFromConnection = function (aI) {
                var aH = P(au.connections, aI);
                if (aH >= 0) {
                    au.connections.splice(aH, 1)
                }
            };
            this.getElement = function () {
                return at
            };
            this.getUuid = function () {
                return ap
            };
            this.makeInPlaceCopy = function () {
                var aH = new ab({
                    anchor: au.anchor,
                    source: at,
                    style: an,
                    endpoint: ar
                });
                return aH
            };
            this.isConnectedTo = function (aJ) {
                var aI = false;
                if (aJ) {
                    for (var aH = 0; aH < au.connections.length; aH++) {
                        if (au.connections[aH].endpoints[1] == aJ) {
                            aI = true;
                            break
                        }
                    }
                }
                return aI
            };
            this.isFloating = function () {
                return aE != null
            };
            var aD = function () {
                return (au.connections.length < aA) ? null : au.connections[0]
            };
            this.isFull = function () {
                return aA < 1 ? false : (au.connections.length >= aA)
            };
            this.setDragAllowedWhenFull = function (aH) {
                au.dragAllowedWhenFull = aH
            };
            this.equals = function (aH) {
                return this.anchor.equals(aH.anchor)
            };
            this.paint = function (aK) {
                aK = aK || {};
                var aO = aK.timestamp;
                if (!aO || au.timestamp !== aO) {
                    var aN = aK.anchorPoint,
                        aJ = aK.canvas,
                        aL = aK.connectorPaintStyle;
                    if (aN == null) {
                        var aT = aK.offset || F[am];
                        var aH = aK.dimensions || y[am];
                        if (aT == null || aH == null) {
                            m({
                                elId: am,
                                timestamp: aO
                            });
                            aT = F[am];
                            aH = y[am]
                        }
                        var aI = {
                            xy: [aT.left, aT.top],
                            wh: aH,
                            element: au,
                            timestamp: aO
                        };
                        if (au.anchor.isDynamic) {
                            if (au.connections.length > 0) {
                                var aQ = au.connections[0];
                                var aS = aQ.endpoints[0] == au ? 1 : 0;
                                var aM = aS == 0 ? aQ.sourceId : aQ.targetId;
                                var aP = F[aM],
                                    aR = y[aM];
                                aI.txy = [aP.left, aP.top];
                                aI.twh = aR;
                                aI.tElement = aQ.endpoints[aS]
                            }
                        }
                        aN = au.anchor.compute(aI)
                    }
                    ar.paint(aN, au.anchor.getOrientation(), aJ || au.canvas, an, aL || an);
                    au.timestamp = aO
                }
            };
            this.removeConnection = this.detach;
            if (aG.isSource && b.CurrentLibrary.isDragSupported(at)) {
                var az = null,
                    av = null,
                    ay = null,
                    ah = false,
                    ai = null;
                var ak = function () {
                    ay = aD();
                    if (au.isFull() && !au.dragAllowedWhenFull) {
                        return false
                    }
                    m({
                        elId: am
                    });
                    aj = au.makeInPlaceCopy();
                    aj.paint();
                    az = document.createElement("div");
                    var aJ = U(az);
                    A(az, au.container);
                    var aK = ag(aJ);
                    m({
                        elId: aK
                    });
                    Q(U(au.canvas), "dragId", aK);
                    Q(U(au.canvas), "elId", am);
                    var aI = new r({
                        reference: au.anchor,
                        referenceCanvas: au.canvas
                    });
                    aE = new ab({
                        style: {
                            fillStyle: "rgba(0,0,0,0)"
                        },
                        endpoint: ar,
                        anchor: aI,
                        source: aJ
                    });
                    if (ay == null) {
                        au.anchor.locked = true;
                        ay = new p({
                            sourceEndpoint: au,
                            targetEndpoint: aE,
                            source: U(at),
                            target: U(az),
                            anchors: [au.anchor, aI],
                            paintStyle: aG.connectorStyle,
                            connector: aG.connector,
                            overlays: au.connectorOverlays
                        })
                    } else {
                        ah = true;
                        al(U(aj.canvas));
                        var aH = ay.sourceId == am ? 0 : 1;
                        ay.floatingAnchorIndex = aH;
                        au.detachFromConnection(ay);
                        if (aH == 0) {
                            ai = [ay.source, ay.sourceId];
                            ay.source = U(az);
                            ay.sourceId = aK
                        } else {
                            ai = [ay.target, ay.targetId];
                            ay.target = U(az);
                            ay.targetId = aK
                        }
                        ay.endpoints[aH == 0 ? 1 : 0].anchor.locked = true;
                        ay.suspendedEndpoint = ay.endpoints[aH];
                        ay.endpoints[aH] = aE
                    }
                    J[aK] = ay;
                    aE.addConnection(ay);
                    B(T, aK, aE)
                };
                var aB = aG.dragOptions || {};
                var aw = b.extend({}, b.CurrentLibrary.defaultDragOptions);
                aB = b.extend(aw, aB);
                aB.scope = aB.scope || au.scope;
                var ax = b.CurrentLibrary.dragEvents.start;
                var aF = b.CurrentLibrary.dragEvents.stop;
                var ao = b.CurrentLibrary.dragEvents.drag;
                aB[ax] = Z(aB[ax], ak);
                aB[ao] = Z(aB[ao], function () {
                    var aH = b.CurrentLibrary.getUIPosition(arguments);
                    b.CurrentLibrary.setOffset(az, aH);
                    ae(U(az), aH)
                });
                aB[aF] = Z(aB[aF], function () {
                    v(T, av, aE);
                    z([az, aE.canvas], at);
                    O(aj.canvas, at);
                    var aH = ay.floatingAnchorIndex == null ? 1 : ay.floatingAnchorIndex;
                    ay.endpoints[aH == 0 ? 1 : 0].anchor.locked = false;
                    if (ay.endpoints[aH] == aE) {
                        if (ah && ay.suspendedEndpoint) {
                            if (aH == 0) {
                                ay.source = ai[0];
                                ay.sourceId = ai[1]
                            } else {
                                ay.target = ai[0];
                                ay.targetId = ai[1]
                            }
                            ay.endpoints[aH] = ay.suspendedEndpoint;
                            if (aq) {
                                ay.floatingAnchorIndex = null;
                                ay.suspendedEndpoint.addConnection(ay);
                                b.repaint(ai[1])
                            } else {
                                ay.endpoints[aH == 0 ? 1 : 0].detach(ay)
                            }
                        } else {
                            O(ay.canvas, au.container);
                            au.detachFromConnection(ay)
                        }
                    }
                    au.anchor.locked = false;
                    au.paint();
                    ay.repaint();
                    ay = null;
                    delete aj;
                    delete T[aE.elementId];
                    delete aE
                });
                var aC = U(au.canvas);
                b.CurrentLibrary.initDraggable(aC, aB)
            }
            var al = function (aK) {
                if (aG.isTarget && b.CurrentLibrary.isDropSupported(at)) {
                    var aH = aG.dropOptions || l.Defaults.DropOptions || b.Defaults.DropOptions;
                    aH = b.extend({}, aH);
                    aH.scope = aH.scope || au.scope;
                    var aN = null;
                    var aL = b.CurrentLibrary.dragEvents.drop;
                    var aM = b.CurrentLibrary.dragEvents.over;
                    var aI = b.CurrentLibrary.dragEvents.out;
                    var aJ = function () {
                        var aP = U(b.CurrentLibrary.getDragObject(arguments));
                        var aV = q(aP, "dragId");
                        var aR = q(aP, "elId");
                        var aT = J[aV];
                        var aO = aT.floatingAnchorIndex == null ? 1 : aT.floatingAnchorIndex,
                            aS = aO == 0 ? 1 : 0;
                        if (!au.isFull() && !(aO == 0 && !au.isSource) && !(aO == 1 && !au.isTarget)) {
                            if (aO == 0) {
                                aT.source = at;
                                aT.sourceId = am
                            } else {
                                aT.target = at;
                                aT.targetId = am
                            }
                            aT.endpoints[aO].detachFromConnection(aT);
                            if (aT.suspendedEndpoint) {
                                aT.suspendedEndpoint.detachFromConnection(aT)
                            }
                            aT.endpoints[aO] = au;
                            au.addConnection(aT);
                            if (!aT.suspendedEndpoint) {
                                B(u, aT.scope, aT);
                                x(at, aG.draggable, {})
                            } else {
                                var aU = aT.suspendedEndpoint.getElement(),
                                    aQ = aT.suspendedEndpoint.elementId;
                                l.fireUpdate("jsPlumbConnectionDetached", {
                                    source: aO == 0 ? aU : aT.source,
                                    target: aO == 1 ? aU : aT.target,
                                    sourceId: aO == 0 ? aQ : aT.sourceId,
                                    targetId: aO == 1 ? aQ : aT.targetId,
                                    sourceEndpoint: aO == 0 ? aT.suspendedEndpoint : aT.endpoints[0],
                                    targetEndpoint: aO == 1 ? aT.suspendedEndpoint : aT.endpoints[1]
                                })
                            }
                            b.repaint(aR);
                            l.fireUpdate("jsPlumbConnection", {
                                source: aT.source,
                                target: aT.target,
                                sourceId: aT.sourceId,
                                targetId: aT.targetId,
                                sourceEndpoint: aT.endpoints[0],
                                targetEndpoint: aT.endpoints[1]
                            })
                        }
                        delete J[aV]
                    };
                    aH[aL] = Z(aH[aL], aJ);
                    aH[aM] = Z(aH[aM], function () {
                        var aP = b.CurrentLibrary.getDragObject(arguments);
                        var aR = q(U(aP), "dragId");
                        var aQ = J[aR];
                        var aO = aQ.floatingAnchorIndex == null ? 1 : aQ.floatingAnchorIndex;
                        aQ.endpoints[aO].anchor.over(au.anchor)
                    });
                    aH[aI] = Z(aH[aI], function () {
                        var aP = b.CurrentLibrary.getDragObject(arguments);
                        var aR = q(U(aP), "dragId");
                        var aQ = J[aR];
                        var aO = aQ.floatingAnchorIndex == null ? 1 : aQ.floatingAnchorIndex;
                        aQ.endpoints[aO].anchor.out()
                    });
                    b.CurrentLibrary.initDroppable(aK, aH)
                }
            };
            al(U(au.canvas));
            return au
        };
        this.Defaults = {
            Anchor: null,
            Anchors: [null, null],
            BackgroundPaintStyle: null,
            Connector: null,
            Container: null,
            DragOptions: {},
            DropOptions: {},
            Endpoint: null,
            Endpoints: [null, null],
            EndpointStyle: {
                fillStyle: null
            },
            EndpointStyles: [null, null],
            LabelStyle: {
                fillStyle: "rgba(0,0,0,0)",
                color: "black"
            },
            LogEnabled: true,
            MaxConnections: null,
            PaintStyle: {
                lineWidth: 10,
                strokeStyle: "red"
            },
            Scope: "_jsPlumb_DefaultScope"
        };
        this.logEnabled = this.Defaults.LogEnabled;
        this.connectorClass = "_jsPlumb_connector";
        this.endpointClass = "_jsPlumb_endpoint";
        this.overlayClass = "_jsPlumb_overlay";
        this.Anchors = {};
        this.Connectors = {};
        this.Endpoints = {};
        this.Overlays = {};
        this.addEndpoint = function (am, an) {
            an = b.extend({}, an);
            an.endpoint = an.endpoint || l.Defaults.Endpoint || b.Defaults.Endpoint;
            an.endpointStyle = an.endpointStyle || l.Defaults.EndpointStyle || b.Defaults.EndpointStyle;
            var ak = U(am),
                ao = q(ak, "id");
            an.source = ak;
            m({
                elId: ao
            });
            var al = new ab(an);
            B(T, ao, al);
            var ah = F[ao],
                aj = y[ao];
            var ai = al.anchor.compute({
                xy: [ah.left, ah.top],
                wh: aj,
                element: al
            });
            al.paint({
                anchorLoc: ai
            });
            return al
        };
        this.addEndpoints = function (ak, ah) {
            var aj = [];
            for (var ai = 0; ai < ah.length; ai++) {
                aj.push(l.addEndpoint(ak, ah[ai]))
            }
            return aj
        };
        this.animate = function (aj, ai, ah) {
            var ak = U(aj),
                an = q(aj, "id");
            ah = ah || {};
            var am = b.CurrentLibrary.dragEvents.step;
            var al = b.CurrentLibrary.dragEvents.complete;
            ah[am] = Z(ah[am], function () {
                l.repaint(an)
            });
            ah[al] = Z(ah[al], function () {
                l.repaint(an)
            });
            b.CurrentLibrary.animate(ak, ai, ah)
        };
        this.connect = function (am) {
            var ai = b.extend({}, am);
            if (am.uuids) {
                ai.sourceEndpoint = G(am.uuids[0]);
                ai.targetEndpoint = G(am.uuids[1])
            }
            if (ai.sourceEndpoint && ai.sourceEndpoint.isFull()) {
                n("could not add connection; source endpoint is full");
                return
            }
            if (ai.targetEndpoint && ai.targetEndpoint.isFull()) {
                n("could not add connection; target endpoint is full");
                return
            }
            if (ai.dynamicAnchors) {
                var aj = ai.dynamicAnchors.constructor == Array;
                var ah = aj ? new K(b.makeAnchors(ai.dynamicAnchors)) : new K(b.makeAnchors(ai.dynamicAnchors.source));
                var ak = aj ? new K(b.makeAnchors(ai.dynamicAnchors)) : new K(b.makeAnchors(ai.dynamicAnchors.target));
                ai.anchors = [ah, ak]
            }
            var al = new p(ai);
            B(u, al.scope, al);
            l.fireUpdate("jsPlumbConnection", {
                source: al.source,
                target: al.target,
                sourceId: al.sourceId,
                targetId: al.targetId,
                sourceEndpoint: al.endpoints[0],
                targetEndpoint: al.endpoints[1]
            });
            ae(al.source);
            return al
        };
        this.deleteEndpoint = function (ai) {
            var an = (typeof ai == "string") ? C[ai] : ai;
            if (an) {
                var ak = an.getUuid();
                if (ak) {
                    C[ak] = null
                }
                an.detachAll();
                O(an.canvas, an.container);
                for (var am in T) {
                    var ah = T[am];
                    if (ah) {
                        var al = [];
                        for (var aj = 0; aj < ah.length; aj++) {
                            if (ah[aj] != an) {
                                al.push(ah[aj])
                            }
                        }
                        T[am] = al
                    }
                }
                delete an
            }
        };
        this.deleteEveryEndpoint = function () {
            for (var aj in T) {
                var ah = T[aj];
                if (ah && ah.length) {
                    for (var ai = 0; ai < ah.length; ai++) {
                        l.deleteEndpoint(ah[ai])
                    }
                }
            }
            delete T;
            T = {};
            delete C;
            C = {}
        };
        var N = function (ah) {
            l.fireUpdate("jsPlumbConnectionDetached", {
                source: ah.source,
                target: ah.target,
                sourceId: ah.sourceId,
                targetId: ah.targetId,
                sourceEndpoint: ah.endpoints[0],
                targetEndpoint: ah.endpoints[1]
            })
        };
        this.detach = function (al, am) {
            if (arguments.length == 2) {
                var ak = U(al),
                    ai = ag(ak);
                var aj = U(am),
                    an = ag(aj);
                D(ai, function (ao) {
                    if ((ao.sourceId == ai && ao.targetId == an) || (ao.targetId == ai && ao.sourceId == an)) {
                        O(ao.canvas, ao.container);
                        ao.endpoints[0].removeConnection(ao);
                        ao.endpoints[1].removeConnection(ao);
                        v(u, ao.scope, ao);
                        N(ao)
                    }
                })
            } else {
                if (arguments.length == 1) {
                    if (arguments[0].constructor == p) {
                        arguments[0].endpoints[0].detachFrom(arguments[0].endpoints[1]);
                        N(arguments[0])
                    } else {
                        if (arguments[0].connection) {
                            arguments[0].connection.endpoints[0].detachFrom(arguments[0].connection.endpoints[1]);
                            N(arguments[0].connection)
                        } else {
                            var ah = b.extend({}, al);
                            if (ah.uuids) {
                                G(ah.uuids[0]).detachFrom(G(ah.uuids[1]))
                            } else {
                                if (ah.sourceEndpoint && ah.targetEndpoint) {
                                    ah.sourceEndpoint.detachFrom(ah.targetEndpoint)
                                } else {
                                    sourceId = ag(ah.source);
                                    targetId = ag(ah.target);
                                    D(sourceId, function (ao) {
                                        if ((ao.sourceId == sourceId && ao.targetId == targetId) || (ao.targetId == sourceId && ao.sourceId == targetId)) {
                                            O(ao.canvas, ao.container);
                                            ao.endpoints[0].removeConnection(ao);
                                            ao.endpoints[1].removeConnection(ao);
                                            v(u, ao.scope, ao);
                                            N(ao)
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            }
        };
        this.detachAllConnections = function (aj) {
            var ak = q(aj, "id");
            var ah = T[ak];
            if (ah && ah.length) {
                for (var ai = 0; ai < ah.length; ai++) {
                    ah[ai].detachAll()
                }
            }
        };
        this.detachAll = this.detachAllConnections;
        this.detachEveryConnection = function () {
            for (var aj in T) {
                var ah = T[aj];
                if (ah && ah.length) {
                    for (var ai = 0; ai < ah.length; ai++) {
                        ah[ai].detachAll()
                    }
                }
            }
            delete u;
            u = {}
        };
        this.detachEverything = this.detachEveryConnection;
        this.draggable = function (aj, ah) {
            if (typeof aj == "object" && aj.length) {
                for (var ai = 0; ai < aj.length; ai++) {
                    var ak = U(aj[ai]);
                    if (ak) {
                        x(ak, true, ah)
                    }
                }
            } else {
                if (aj._nodes) {
                    for (var ai = 0; ai < aj._nodes.length; ai++) {
                        var ak = U(aj._nodes[ai]);
                        if (ak) {
                            x(ak, true, ah)
                        }
                    }
                } else {
                    var ak = U(aj);
                    if (ak) {
                        x(ak, true, ah)
                    }
                }
            }
        };
        this.extend = function (ai, ah) {
            return b.CurrentLibrary.extend(ai, ah)
        };
        this.getConnections = function (aq) {
            var ah = {};
            aq = aq || {};
            var ap = function (ar) {
                var at = [];
                if (ar) {
                    if (typeof ar == "string") {
                        at.push(ar)
                    } else {
                        at = ar
                    }
                }
                return at
            };
            var ao = ap(aq.scope);
            var ai = ap(aq.source);
            var am = ap(aq.target);
            var aj = function (at, ar) {
                return at.length > 0 ? P(at, ar) != -1 : true
            };
            for (var al in u) {
                if (aj(ao, al)) {
                    ah[al] = [];
                    for (var ak = 0; ak < u[al].length; ak++) {
                        var an = u[al][ak];
                        if (aj(ai, an.sourceId) && aj(am, an.targetId)) {
                            ah[al].push({
                                sourceId: an.sourceId,
                                targetId: an.targetId,
                                source: an.source,
                                target: an.target,
                                sourceEndpoint: an.endpoints[0],
                                targetEndpoint: an.endpoints[1],
                                connection: an
                            })
                        }
                    }
                }
            }
            return ah
        };
        this.getDefaultScope = function () {
            return g
        };
        this.getEndpoint = G;
        this.getId = ag;
        this.hide = function (ah) {
            aa(ah, "none")
        };
        this.makeAnchor = function (ao, al, am, aj, ak, ah) {
            if (arguments.length == 0) {
                return null
            }
            var ai = {};
            if (arguments.length == 1) {
                var ap = arguments[0];
                if (ap.compute && ap.getOrientation) {
                    return ap
                } else {
                    if (typeof ap == "string") {
                        return l.Anchors[arguments[0]]()
                    } else {
                        if (ap.constructor == Array) {
                            if (ap[0].constructor == Array || ap[0].constructor == String) {
                                return new K(ap)
                            } else {
                                return b.makeAnchor.apply(this, ap)
                            }
                        } else {
                            if (typeof arguments[0] == "object") {
                                b.extend(ai, ao)
                            }
                        }
                    }
                }
            } else {
                ai = {
                    x: ao,
                    y: al
                };
                if (arguments.length >= 4) {
                    ai.orientation = [arguments[2], arguments[3]]
                }
                if (arguments.length == 6) {
                    ai.offsets = [arguments[4], arguments[5]]
                }
            }
            var an = new M(ai);
            an.clone = function () {
                return new M(ai)
            };
            return an
        };
        this.makeAnchors = function (ai) {
            var aj = [];
            for (var ah = 0; ah < ai.length; ah++) {
                if (typeof ai[ah] == "string") {
                    aj.push(l.Anchors[ai[ah]]())
                } else {
                    if (ai[ah].constructor == Array) {
                        aj.push(b.makeAnchor(ai[ah]))
                    }
                }
            }
            return aj
        };
        this.makeDynamicAnchor = function (ah, ai) {
            return new K(ah, ai)
        };
        this.repaint = function (ai) {
            var aj = function (ak) {
                ae(U(ak))
            };
            if (typeof ai == "object") {
                for (var ah = 0; ah < ai.length; ah++) {
                    aj(ai[ah])
                }
            } else {
                aj(ai)
            }
        };
        this.repaintEverything = function () {
            var ai = ad();
            for (var ah in T) {
                ae(U(ah), null, ai)
            }
        };
        this.removeAllEndpoints = function (aj) {
            var ah = q(aj, "id");
            var ak = T[ah];
            for (var ai in ak) {
                l.deleteEndpoint(ak[ai])
            }
            T[ah] = []
        };
        this.removeEveryEndpoint = this.deleteEveryEndpoint;
        this.removeEndpoint = function (ah, ai) {
            l.deleteEndpoint(ai)
        };
        this.reset = function () {
            this.deleteEveryEndpoint();
            this.clearListeners()
        };
        this.setAutomaticRepaint = function (ah) {
            f = ah
        };
        this.setDefaultNewCanvasSize = function (ah) {
            L = ah
        };
        this.setDefaultScope = function (ah) {
            g = ah
        };
        this.setDraggable = c;
        this.setDraggableByDefault = function (ah) {
            I = ah
        };
        this.setDebugLog = function (ah) {
            o = ah
        };
        this.setRepaintFunction = function (ah) {
            X = ah
        };
        this.show = function (ah) {
            aa(ah, "block")
        };
        this.sizeCanvas = function (aj, ah, al, ai, ak) {
            if (aj) {
                aj.style.height = ak + "px";
                aj.height = ak;
                aj.style.width = ai + "px";
                aj.width = ai;
                aj.style.left = ah + "px";
                aj.style.top = al + "px"
            }
        };
        this.getTestHarness = function () {
            return {
                endpointsByElement: T,
                endpointCount: function (ah) {
                    var ai = T[ah];
                    return ai ? ai.length : 0
                },
                connectionCount: function (ah) {
                    ah = ah || g;
                    var ai = u[ah];
                    return ai ? ai.length : 0
                },
                findIndex: P,
                getId: ag
            }
        };
        this.toggle = e;
        this.toggleVisible = e;
        this.toggleDraggable = w;
        this.unload = function () {
            delete T;
            delete C;
            delete F;
            delete y;
            delete J;
            delete S
        };
        this.wrap = Z;
        ac.apply(this);
        this.addListener = this.bind
    };
    var b = window.jsPlumb = new a();
    b.getInstance = function (d) {
        var c = new a();
        if (d) {
            b.extend(c.Defaults, d)
        }
        return c
    }
})();
(function () {
    var b = !! !document.createElement("canvas").getContext;
    var a = function (c, f, e, d) {
        return function () {
            return jsPlumb.makeAnchor(c, f, e, d)
        }
    };
    jsPlumb.Anchors.TopCenter = a(0.5, 0, 0, -1);
    jsPlumb.Anchors.BottomCenter = a(0.5, 1, 0, 1);
    jsPlumb.Anchors.LeftMiddle = a(0, 0.5, -1, 0);
    jsPlumb.Anchors.RightMiddle = a(1, 0.5, 1, 0);
    jsPlumb.Anchors.Center = a(0.5, 0.5, 0, 0);
    jsPlumb.Anchors.TopRight = a(1, 0, 0, -1);
    jsPlumb.Anchors.BottomRight = a(1, 1, 0, 1);
    jsPlumb.Anchors.TopLeft = a(0, 0, 0, -1);
    jsPlumb.Anchors.BottomLeft = a(0, 1, 0, 1);
    jsPlumb.Defaults.DynamicAnchors = function () {
        return jsPlumb.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"])
    };
    jsPlumb.Anchors.AutoDefault = function () {
        return jsPlumb.makeDynamicAnchor(jsPlumb.Defaults.DynamicAnchors())
    };
    jsPlumb.Connectors.Straight = function () {
        var q = this;
        var k = null;
        var e, l, o, n, m, f, p, h, g, d, c;
        this.compute = function (u, I, E, r, B, t) {
            var H = Math.abs(u[0] - I[0]);
            var A = Math.abs(u[1] - I[1]);
            var C = false,
                v = false;
            var z = 0.45 * H,
                s = 0.45 * A;
            H *= 1.9;
            A *= 1.9;
            var F = Math.min(u[0], I[0]) - z;
            var D = Math.min(u[1], I[1]) - s;
            var G = Math.max(2 * B, t);
            if (H < G) {
                H = G;
                F = u[0] + ((I[0] - u[0]) / 2) - (G / 2);
                z = (H - Math.abs(u[0] - I[0])) / 2
            }
            if (A < G) {
                A = G;
                D = u[1] + ((I[1] - u[1]) / 2) - (G / 2);
                s = (A - Math.abs(u[1] - I[1])) / 2
            }
            h = u[0] < I[0] ? z : H - z;
            g = u[1] < I[1] ? s : A - s;
            d = u[0] < I[0] ? H - z : z;
            c = u[1] < I[1] ? A - s : s;
            k = [F, D, H, A, h, g, d, c];
            n = d - h, m = (c - g);
            e = m / n, l = -1 / e;
            o = -1 * ((e * h) - g);
            f = Math.atan(e);
            p = Math.atan(l);
            return k
        };
        this.paint = function (s, r) {
            r.beginPath();
            r.moveTo(s[4], s[5]);
            r.lineTo(s[6], s[7]);
            r.stroke()
        };
        this.pointOnPath = function (r) {
            var s = h + (r * n);
            var t = e == Infinity ? s + o : (e * s) + o;
            return {
                x: s,
                y: t
            }
        };
        this.gradientAtPoint = function (r) {
            return e
        };
        this.pointAlongPathFrom = function (s, w) {
            var u = q.pointOnPath(s);
            var t = w > 0 ? 1 : -1;
            var v = Math.abs(w * Math.sin(f));
            if (g > c) {
                v = v * -1
            }
            var r = Math.abs(w * Math.cos(f));
            if (h > d) {
                r = r * -1
            }
            return {
                x: u.x + (t * r),
                y: u.y + (t * v)
            }
        };
        this.perpendicularToPathAt = function (u, v, A) {
            var w = q.pointAlongPathFrom(u, A);
            var t = q.gradientAtPoint(w.location);
            var s = Math.atan(-1 / t);
            var z = v / 2 * Math.sin(s);
            var r = v / 2 * Math.cos(s);
            return [{
                x: w.x + r,
                y: w.y + z
            }, {
                x: w.x - r,
                y: w.y - z
            }]
        };
        this.createGradient = function (s, r) {
            return r.createLinearGradient(s[4], s[5], s[6], s[7])
        }
    };
    jsPlumb.Connectors.Bezier = function (c) {
        var q = this;
        this.majorAnchor = c || 150;
        this.minorAnchor = 10;
        var k = null;
        this._findControlPoint = function (A, r, v, y, s) {
            var x = y.getOrientation(),
                z = s.getOrientation();
            var u = x[0] != z[0] || x[1] == z[1];
            var t = [];
            var B = q.majorAnchor,
                w = q.minorAnchor;
            if (!u) {
                if (x[0] == 0) {
                    t.push(r[0] < v[0] ? A[0] + w : A[0] - w)
                } else {
                    t.push(A[0] - (B * x[0]))
                }
                if (x[1] == 0) {
                    t.push(r[1] < v[1] ? A[1] + w : A[1] - w)
                } else {
                    t.push(A[1] + (B * z[1]))
                }
            } else {
                if (z[0] == 0) {
                    t.push(v[0] < r[0] ? A[0] + w : A[0] - w)
                } else {
                    t.push(A[0] + (B * z[0]))
                }
                if (z[1] == 0) {
                    t.push(v[1] < r[1] ? A[1] + w : A[1] - w)
                } else {
                    t.push(A[1] + (B * x[1]))
                }
            }
            return t
        };
        var p, o, l, d, l, g, f, e, n, h;
        this.compute = function (L, u, J, s, r, F) {
            r = r || 0;
            n = Math.abs(L[0] - u[0]) + r;
            h = Math.abs(L[1] - u[1]) + r;
            f = Math.min(L[0], u[0]) - (r / 2);
            e = Math.min(L[1], u[1]) - (r / 2);
            l = L[0] < u[0] ? n - (r / 2) : (r / 2);
            g = L[1] < u[1] ? h - (r / 2) : (r / 2);
            d = L[0] < u[0] ? (r / 2) : n - (r / 2);
            _ty = L[1] < u[1] ? (r / 2) : h - (r / 2);
            p = q._findControlPoint([l, g], L, u, J, s);
            o = q._findControlPoint([d, _ty], u, L, s, J);
            var E = Math.min(l, d);
            var D = Math.min(p[0], o[0]);
            var z = Math.min(E, D);
            var K = Math.max(l, d);
            var H = Math.max(p[0], o[0]);
            var w = Math.max(K, H);
            if (w > n) {
                n = w
            }
            if (z < 0) {
                f += z;
                var A = Math.abs(z);
                n += A;
                p[0] += A;
                l += A;
                d += A;
                o[0] += A
            }
            var I = Math.min(g, _ty);
            var G = Math.min(p[1], o[1]);
            var v = Math.min(I, G);
            var B = Math.max(g, _ty);
            var y = Math.max(p[1], o[1]);
            var t = Math.max(B, y);
            if (t > h) {
                h = t
            }
            if (v < 0) {
                e += v;
                var x = Math.abs(v);
                h += x;
                p[1] += x;
                g += x;
                _ty += x;
                o[1] += x
            }
            if (F && n < F) {
                var C = (F - n) / 2;
                n = F;
                f -= C;
                l = l + C;
                d = d + C;
                p[0] = p[0] + C;
                o[0] = o[0] + C
            }
            if (F && h < F) {
                var C = (F - h) / 2;
                h = F;
                e -= C;
                g = g + C;
                _ty = _ty + C;
                p[1] = p[1] + C;
                o[1] = o[1] + C
            }
            k = [f, e, n, h, l, g, d, _ty, p[0], p[1], o[0], o[1]];
            return k
        };
        this.paint = function (s, r) {
            r.beginPath();
            r.moveTo(s[4], s[5]);
            r.bezierCurveTo(s[8], s[9], s[10], s[11], s[6], s[7]);
            r.stroke()
        };
        var m = function () {
            return [{
                x: l,
                y: g
            }, {
                x: p[0],
                y: p[1]
            }, {
                x: o[0],
                y: o[1]
            }, {
                x: d,
                y: _ty
            }]
        };
        this.distanceFrom = function (r) {
            var s = [{
                x: k[4],
                y: k[5]
            }, {
                x: k[8],
                y: k[9]
            }, {
                x: k[10],
                y: k[11]
            }, {
                x: k[6],
                y: k[7]
            }];
            return (jsBezier.distanceFromCurve(r, s))
        };
        this.nearestPointTo = function (r) {
            var s = [{
                x: k[4],
                y: k[5]
            }, {
                x: k[8],
                y: k[9]
            }, {
                x: k[10],
                y: k[11]
            }, {
                x: k[6],
                y: k[7]
            }];
            return (jsBezier.nearestPointOnCurve(r, s))
        };
        this.pointOnPath = function (r) {
            return jsBezier.pointOnCurve(m(), r)
        };
        this.gradientAtPoint = function (r) {
            return jsBezier.gradientAtPoint(m(), r)
        };
        this.pointAlongPathFrom = function (r, s) {
            return jsBezier.pointAlongCurveFrom(m(), r, s)
        };
        this.perpendicularToPathAt = function (r, s, t) {
            return jsBezier.perpendicularToCurveAt(m(), r, s, t)
        };
        this.createGradient = function (t, r, s) {
            return (s) ? r.createLinearGradient(t[4], t[5], t[6], t[7]) : r.createLinearGradient(t[6], t[7], t[4], t[5])
        }
    };
    jsPlumb.Endpoints.Dot = function (h) {
        h = h || {
            radius: 10
        };
        var f = this;
        this.radius = h.radius;
        var g = 0.5 * this.radius;
        var d = this.radius / 3;
        var e = function (k) {
            try {
                return parseInt(k)
            } catch (l) {
                if (k.substring(k.length - 1) == "%") {
                    return parseInt(k.substring(0, k - 1))
                }
            }
        };
        var c = function (m) {
            var k = g;
            var l = d;
            if (m.offset) {
                k = e(m.offset)
            }
            if (m.innerRadius) {
                l = e(m.innerRadius)
            }
            return [k, l]
        };
        this.paint = function (z, m, o, n, q) {
            var u = n.radius || f.radius;
            var w = z[0] - u;
            var v = z[1] - u;
            jsPlumb.sizeCanvas(o, w, v, u * 2, u * 2);
            var A = o.getContext("2d");
            var l = jsPlumb.extend({}, n);
            if (l.fillStyle == null) {
                l.fillStyle = q.strokeStyle
            }
            jsPlumb.extend(A, l);
            if (n.gradient && !b) {
                var p = c(n.gradient);
                var s = m[1] == 1 ? p[0] * -1 : p[0];
                var k = m[0] == 1 ? p[0] * -1 : p[0];
                var t = A.createRadialGradient(u, u, u, u + k, u + s, p[1]);
                for (var r = 0; r < n.gradient.stops.length; r++) {
                    t.addColorStop(n.gradient.stops[r][0], n.gradient.stops[r][1])
                }
                A.fillStyle = t
            }
            A.beginPath();
            A.arc(u, u, u, 0, Math.PI * 2, true);
            A.closePath();
            A.fill()
        }
    };
    jsPlumb.Endpoints.Rectangle = function (d) {
        d = d || {
            width: 20,
            height: 20
        };
        var c = this;
        this.width = d.width;
        this.height = d.height;
        this.paint = function (e, l, k, n, p) {
            var s = n.width || c.width;
            var q = n.height || c.height;
            var o = e[0] - (s / 2);
            var m = e[1] - (q / 2);
            jsPlumb.sizeCanvas(k, o, m, s, q);
            var t = k.getContext("2d");
            var v = jsPlumb.extend({}, n);
            if (v.fillStyle == null) {
                v.fillStyle = p.strokeStyle
            }
            jsPlumb.extend(t, v);
            var r = (/MSIE/.test(navigator.userAgent) && !window.opera);
            if (n.gradient && !r) {
                var h = l[1] == 1 ? q : l[1] == 0 ? q / 2 : 0;
                var f = l[1] == -1 ? q : l[1] == 0 ? q / 2 : 0;
                var A = l[0] == 1 ? s : l[0] == 0 ? s / 2 : 0;
                var w = l[0] == -1 ? s : l[0] == 0 ? q / 2 : 0;
                var z = t.createLinearGradient(A, h, w, f);
                for (var u = 0; u < n.gradient.stops.length; u++) {
                    z.addColorStop(n.gradient.stops[u][0], n.gradient.stops[u][1])
                }
                t.fillStyle = z
            }
            t.beginPath();
            t.rect(0, 0, s, q);
            t.closePath();
            t.fill()
        }
    };
    jsPlumb.Endpoints.Triangle = function (d) {
        d = d || {
            width: 15,
            height: 15
        };
        var c = this;
        this.width = d.width;
        this.height = d.height;
        this.paint = function (q, f, h, g, l) {
            var e = g.width || c.width;
            var r = g.height || c.height;
            var p = q[0] - e / 2;
            var o = q[1] - r / 2;
            jsPlumb.sizeCanvas(h, p, o, e, r);
            var s = h.getContext("2d");
            var n = 0,
                m = 0,
                k = 0;
            if (f[0] == 1) {
                n = e;
                m = r;
                k = 180
            }
            if (f[1] == -1) {
                n = e;
                k = 90
            }
            if (f[1] == 1) {
                m = r;
                k = -90
            }
            s.fillStyle = g.fillStyle;
            s.translate(n, m);
            s.rotate(k * Math.PI / 180);
            s.beginPath();
            s.moveTo(0, 0);
            s.lineTo(e / 2, r / 2);
            s.lineTo(0, r);
            s.closePath();
            s.fill()
        }
    };
    jsPlumb.Endpoints.Image = function (f) {
        var c = this;
        this.img = new Image();
        var d = false;
        this.img.onload = function () {
            c.ready = true
        };
        this.img.src = f.src || f.url;
        var e = function (p, h, l, k, m) {
            var g = c.img.width || k.width;
            var q = c.img.height || k.height;
            var o = p[0] - (g / 2);
            var n = p[1] - (q / 2);
            jsPlumb.sizeCanvas(l, o, n, g, q);
            var r = l.getContext("2d");
            r.drawImage(c.img, 0, 0)
        };
        this.paint = function (l, g, h, m, k) {
            if (c.ready) {
                e(l, g, h, m, k)
            } else {
                window.setTimeout(function () {
                    c.paint(l, g, h, m, k)
                }, 200)
            }
        }
    };
    jsPlumb.Overlays.Arrow = function (e) {
        e = e || {};
        var m = this;
        var d = e.length || 20;
        var c = e.width || 20;
        var k = e.fillStyle || "black";
        var h = e.strokeStyle;
        var f = e.lineWidth || 1;
        this.loc = e.location || 0.5;
        var l = e.foldback || 0.623;
        var g = function (n, p) {
            if (l == 0.5) {
                return n.pointOnPath(p)
            } else {
                var o = 0.5 - l;
                return n.pointAlongPathFrom(p, d * o)
            }
        };
        this.computeMaxSize = function () {
            return c * 1.5
        };
        this.draw = function (q, p) {
            var u = q.pointAlongPathFrom(m.loc, d / 2);
            var s = q.pointAlongPathFrom(m.loc, -d / 2),
                o = s.x,
                n = s.y;
            var r = q.perpendicularToPathAt(m.loc, c, -d / 2);
            var t = g(q, m.loc);
            p.lineWidth = f;
            p.beginPath();
            p.moveTo(u.x, u.y);
            p.lineTo(r[0].x, r[0].y);
            p.lineTo(t.x, t.y);
            p.lineTo(r[1].x, r[1].y);
            p.lineTo(u.x, u.y);
            p.closePath();
            if (h) {
                p.strokeStyle = h;
                p.stroke()
            }
            p.fillStyle = k;
            p.fill()
        }
    };
    jsPlumb.Overlays.PlainArrow = function (d) {
        d = d || {};
        var c = jsPlumb.extend(d, {
            foldback: 1
        });
        jsPlumb.Overlays.Arrow.call(this, c)
    };
    jsPlumb.Overlays.Diamond = function (e) {
        e = e || {};
        var c = e.length || 40;
        var d = jsPlumb.extend(e, {
            length: c / 2,
            foldback: 2
        });
        jsPlumb.Overlays.Arrow.call(this, d)
    };
    jsPlumb.Overlays.Label = function (l) {
        this.labelStyle = l.labelStyle || jsPlumb.Defaults.LabelStyle;
        this.label = l.label;
        var d = this;
        var c = null,
            k = null,
            f = null,
            g = null;
        this.location = l.location || 0.5;
        this.cachedDimensions = null;
        var h = function (n) {
            if (d.cachedDimensions) {
                return d.cachedDimensions
            }
            f = typeof d.label == "function" ? d.label(d) : d.label;
            var r = {};
            if (f) {
                var m = f.split(/\n|\r\n/);
                n.save();
                if (d.labelStyle.font) {
                    n.font = d.labelStyle.font
                }
                var o = e(m, n);
                var p = n.measureText("M").width;
                g = d.labelStyle.padding || 0.25;
                c = o + (2 * o * g);
                k = (m.length * p) + (2 * p * g);
                var q = m.length * p;
                n.restore();
                r = {
                    width: c,
                    height: k,
                    lines: m,
                    oneLine: p,
                    padding: g,
                    textHeight: q
                }
            }
            if (typeof d.label != "function") {
                d.cachedDimensions = r
            }
            return r
        };
        this.computeMaxSize = function (n, m) {
            var o = h(m);
            return o.width ? Math.max(o.width, o.height) * 1.5 : 0
        };
        var e = function (o, n) {
            var m = 0;
            for (var q = 0; q < o.length; q++) {
                var p = n.measureText(o[q]).width;
                if (p > m) {
                    m = p
                }
            }
            return m
        };
        this.draw = function (n, m) {
            var p = h(m);
            if (p.width) {
                var o = n.pointOnPath(d.location);
                if (d.labelStyle.font) {
                    m.font = d.labelStyle.font
                }
                if (d.labelStyle.fillStyle) {
                    m.fillStyle = d.labelStyle.fillStyle
                } else {
                    m.fillStyle = "rgba(0,0,0,0)"
                }
                m.fillRect(o.x - (p.width / 2), o.y - (p.height / 2), p.width, p.height);
                if (d.labelStyle.color) {
                    m.fillStyle = d.labelStyle.color
                }
                m.textBaseline = "middle";
                m.textAlign = "center";
                for (i = 0; i < p.lines.length; i++) {
                    m.fillText(p.lines[i], o.x, o.y - (p.textHeight / 2) + (p.oneLine / 2) + (i * p.oneLine))
                }
                if (d.labelStyle.borderWidth > 0) {
                    m.strokeStyle = d.labelStyle.borderStyle || "black";
                    m.strokeRect(o.x - (p.width / 2), o.y - (p.height / 2), p.width, p.height)
                }
            }
        }
    };
    jsPlumb.Overlays.Image = function (e) {
        var l = this;
        this.location = e.location || 0.5;
        this.img = new Image();
        var m = null;
        var f = null;
        var d, c;
        var k = e.events || {};
        var h = function () {
            if (l.ready) {
                window.clearInterval(f);
                m = document.createElement("img");
                m.src = l.img.src;
                m.style.position = "absolute";
                m.style.display = "none";
                m.className = "_jsPlumb_overlay";
                document.body.appendChild(m);
                for (var n in k) {
                    jsPlumb.CurrentLibrary.bind(m, n, k[n])
                }
                if (d && c) {
                    g(d, c);
                    c = null;
                    d = null
                }
            }
        };
        this.img.onload = function () {
            l.ready = true
        };
        this.img.src = e.src || e.url;
        f = window.setInterval(h, 250);
        this.computeMaxSize = function (o, n) {
            return [l.img.width, l.img.height]
        };
        var g = function (q, p) {
            var s = q.pointOnPath(l.location);
            var r = jsPlumb.CurrentLibrary.getElementObject(p.canvas);
            var n = jsPlumb.CurrentLibrary.getOffset(r);
            var t = {
                left: n.left + s.x - (l.img.width / 2),
                top: n.top + s.y - (l.img.height / 2)
            };
            jsPlumb.CurrentLibrary.setOffset(m, t);
            m.style.display = "block"
        };
        this.draw = function (o, n) {
            if (l.ready) {
                g(o, n)
            } else {
                d = o;
                c = n
            }
        }
    }
})();
(function (a) {
    a.fn.plumb = function (b) {
        var b = a.extend({}, b);
        return this.each(function () {
            var c = a.extend({
                source: a(this)
            }, b);
            jsPlumb.connect(c)
        })
    };
    a.fn.detach = function (b) {
        return this.each(function () {
            if (b) {
                var d = a(this).attr("id");
                if (typeof b == "string") {
                    b = [b]
                }
                for (var c = 0; c < b.length; c++) {
                    jsPlumb.detach(d, b[c])
                }
            }
        })
    };
    a.fn.detachAll = function () {
        return this.each(function () {
            var b = a(this).attr("id");
            jsPlumb.detachAll(b)
        })
    };
    a.fn.addEndpoint = function (b) {
        var c = [];
        this.each(function () {
            c.push(jsPlumb.addEndpoint(a(this).attr("id"), b))
        });
        return c[0]
    };
    a.fn.addEndpoints = function (b) {
        var c = [];
        return this.each(function () {
            var f = jsPlumb.addEndpoints(a(this).attr("id"), b);
            for (var d = 0; d < f.length; d++) {
                c.push(f[d])
            }
        })
    };
    a.fn.removeEndpoint = function (b) {
        this.each(function () {
            jsPlumb.removeEndpoint(a(this).attr("id"), b)
        })
    }
})(jQuery);
(function (a) {
    jsPlumb.CurrentLibrary = {
        addClass: function (c, b) {
            c.addClass(b)
        },
        animate: function (d, c, b) {
            d.animate(c, b)
        },
        appendElement: function (c, b) {
            jsPlumb.CurrentLibrary.getElementObject(b).append(c)
        },
        bind: function (b, c, d) {
            b = jsPlumb.CurrentLibrary.getElementObject(b);
            b.bind(c, d)
        },
        dragEvents: {
            start: "start",
            stop: "stop",
            drag: "drag",
            step: "step",
            over: "over",
            out: "out",
            drop: "drop",
            complete: "complete"
        },
        extend: function (c, b) {
            return a.extend(c, b)
        },
        getAttribute: function (b, c) {
            return b.attr(c)
        },
        getDragObject: function (b) {
            return b[1].draggable
        },
        getElementObject: function (b) {
            return typeof (b) == "string" ? a("#" + b) : a(b)
        },
        getOffset: function (b) {
            return b.offset()
        },
        getScrollLeft: function (b) {
            return b.scrollLeft()
        },
        getScrollTop: function (b) {
            return b.scrollTop()
        },
        getSize: function (b) {
            return [b.outerWidth(), b.outerHeight()]
        },
        getUIPosition: function (b) {
            var c = b[1];
            return c.offset || c.absolutePosition
        },
        initDraggable: function (c, b) {
            b.helper = null;
            b.scope = b.scope || jsPlumb.Defaults.Scope;
            c.draggable(b)
        },
        initDroppable: function (c, b) {
            b.scope = b.scope || jsPlumb.Defaults.Scope;
            c.droppable(b)
        },
        isAlreadyDraggable: function (b) {
            b = jsPlumb.CurrentLibrary.getElementObject(b);
            return b.hasClass("ui-draggable")
        },
        isDragSupported: function (c, b) {
            return c.draggable
        },
        isDropSupported: function (c, b) {
            return c.droppable
        },
        removeClass: function (c, b) {
            c.removeClass(b)
        },
        removeElement: function (b, c) {
            jsPlumb.CurrentLibrary.getElementObject(b).remove()
        },
        setAttribute: function (c, d, b) {
            c.attr(d, b)
        },
        setDraggable: function (c, b) {
            c.draggable("option", "disabled", !b)
        },
        setOffset: function (b, c) {
            jsPlumb.CurrentLibrary.getElementObject(b).offset(c)
        }
    }
})(jQuery);
(function () {
    if (typeof Math.sgn == "undefined") {
        Math.sgn = function (w) {
            return w == 0 ? 0 : w > 0 ? 1 : -1
        }
    }
    var h = {
        subtract: function (x, w) {
            return {
                x: x.x - w.x,
                y: x.y - w.y
            }
        },
        dotProduct: function (x, w) {
            return (x.x * w.x) + (x.y * w.y)
        },
        square: function (w) {
            return Math.sqrt((w.x * w.x) + (w.y * w.y))
        },
        scale: function (w, x) {
            return {
                x: w.x * x,
                y: w.y * x
            }
        }
    };
    var o = 64,
        r = Math.pow(2, -o - 1),
        d = 3,
        a = 5;
    var p = function (E, x) {
        var B = new Array(a);
        var D = e(E, x);
        var A = q(D, a, B, 0);
        var F = h.subtract(E, x[0]),
            C = h.square(F),
            G = 0;
        for (var z = 0; z < A; z++) {
            F = h.subtract(E, t(x, d, B[z], null, null));
            var y = h.square(F);
            if (y < C) {
                C = y;
                G = B[z]
            }
        }
        F = h.subtract(E, x[d]);
        y = h.square(F);
        if (y < C) {
            C = y;
            G = 1
        }
        return {
            location: G,
            distance: C
        }
    };
    var b = function (w, x) {
        var y = p(w, x);
        return {
            point: t(x, d, y.location, null, null),
            location: y.location
        }
    };
    var e = function (L, C) {
        var I = new Array(d + 1),
            H = new Array(d),
            A = [],
            K = [];
        var J = [
            [1, 0.6, 0.3, 0.1],
            [0.4, 0.6, 0.6, 0.4],
            [0.1, 0.3, 0.6, 1]
        ];
        for (var G = 0; G <= d; G++) {
            I[G] = h.subtract(C[G], L)
        }
        for (var G = 0; G <= d - 1; G++) {
            H[G] = h.subtract(C[G + 1], C[G]);
            H[G] = h.scale(H[G], 3)
        }
        for (var M = 0; M <= d - 1; M++) {
            for (var E = 0; E <= d; E++) {
                if (!A[M]) {
                    A[M] = []
                }
                A[M][E] = h.dotProduct(H[M], I[E])
            }
        }
        for (G = 0; G <= a; G++) {
            if (!K[G]) {
                K[G] = []
            }
            K[G].y = 0;
            K[G].x = parseFloat(G) / a
        }
        var B = d,
            D = d - 1;
        for (var F = 0; F <= B + D; F++) {
            var y = Math.max(0, F - D);
            var x = Math.min(F, B);
            for (G = y; G <= x; G++) {
                j = F - G;
                K[G + j].y += A[j][G] * J[j][G]
            }
        }
        return K
    };
    var q = function (F, y, H, z) {
        var A;
        var C = new Array(a + 1),
            D = new Array(a + 1);
        var B, E;
        var G = new Array(a + 1),
            x = new Array(a + 1);
        switch (c(F, y)) {
            case 0:
                return 0;
            case 1:
                if (z >= o) {
                    H[0] = (F[0].x + F[a].x) / 2;
                    return 1
                }
                if (n(F, y)) {
                    H[0] = f(F, y);
                    return 1
                }
                break
        }
        t(F, y, 0.5, C, D);
        B = q(C, y, G, z + 1);
        E = q(D, y, x, z + 1);
        for (A = 0; A < B; A++) {
            H[A] = G[A]
        }
        for (A = 0; A < E; A++) {
            H[A + B] = x[A]
        }
        return (B + E)
    };
    var c = function (B, A) {
        var z = 0;
        var x, w;
        x = w = Math.sgn(B[0].y);
        for (var y = 1; y <= A; y++) {
            x = Math.sgn(B[y].y);
            if (x != w) {
                z++
            }
            w = x
        }
        return z
    };
    var n = function (E, y) {
        var K;
        var x, w, G, D;
        var O, N, M, A, z, Q, C, H, P, B, F;
        O = E[0].y - E[y].y;
        N = E[y].x - E[0].x;
        M = E[0].x * E[y].y - E[y].x * E[0].y;
        var J = max_distance_below = 0;
        for (var L = 1; L < y; L++) {
            var I = O * E[L].x + N * E[L].y + M;
            if (I > J) {
                J = I
            } else {
                if (I < max_distance_below) {
                    max_distance_below = I
                }
            }
        }
        Q = 0;
        C = 1;
        H = 0;
        P = O;
        B = N;
        F = M - J;
        A = Q * B - P * C;
        z = 1 / A;
        x = (C * F - B * H) * z;
        P = O;
        B = N;
        F = M - max_distance_below;
        A = Q * B - P * C;
        z = 1 / A;
        w = (C * F - B * H) * z;
        G = Math.min(x, w);
        D = Math.max(x, w);
        K = D - G;
        return (K < r) ? 1 : 0
    };
    var f = function (y, z) {
        var C = 1,
            E = 0;
        var F = y[z].x - y[0].x,
            G = y[z].y - y[0].y;
        var w = y[0].x - 0,
            A = y[0].y - 0;
        var D = F * E - G * C,
            x = 1 / D;
        var B = (F * A - G * w) * x;
        return 0 + C * B
    };
    var t = function (D, C, A, B, z) {
        var w = [
            []
        ];
        for (var x = 0; x <= C; x++) {
            w[0][x] = D[x]
        }
        for (var y = 1; y <= C; y++) {
            for (var x = 0; x <= C - y; x++) {
                if (!w[y]) {
                    w[y] = []
                }
                if (!w[y][x]) {
                    w[y][x] = {}
                }
                w[y][x].x = (1 - A) * w[y - 1][x].x + A * w[y - 1][x + 1].x;
                w[y][x].y = (1 - A) * w[y - 1][x].y + A * w[y - 1][x + 1].y
            }
        }
        if (B != null) {
            for (x = 0; x <= C; x++) {
                B[x] = w[x][0]
            }
        }
        if (z != null) {
            for (x = 0; x <= C; x++) {
                z[x] = w[C - x][x]
            }
        }
        return (w[C][0])
    };
    var l = function (E, z) {
        function D(x) {
            return x * x * x
        }
        function C(x) {
            return 3 * x * x * (1 - x)
        }
        function B(x) {
            return 3 * x * (1 - x) * (1 - x)
        }
        function A(x) {
            return (1 - x) * (1 - x) * (1 - x)
        }
        var w = E[0].x * D(z) + E[1].x * C(z) + E[2].x * B(z) + E[3].x * A(z);
        var F = E[0].y * D(z) + E[1].y * C(z) + E[2].y * B(z) + E[3].y * A(z);
        return {
            x: w,
            y: F
        }
    };
    var s = function (D, z) {
        function C(x) {
            return x * x
        }
        function B(x) {
            return 2 * x * (1 - x)
        }
        function A(x) {
            return (1 - x) * (1 - x)
        }
        var w = D[0].x * C(z) + D[1].x * B(z) + D[2].x * A(z);
        var E = D[0].y * C(z) + D[1].y * B(z) + D[2].y * A(z);
        return {
            x: w,
            y: E
        }
    };
    var k = function (y, D, w) {
        var B = function (G, F) {
            return Math.sqrt(Math.pow(G.x - F.x, 2) + Math.pow(G.y - F.y, 2))
        };
        var A = l(y, D),
            z = 0,
            x = D,
            C = w > 0 ? 1 : -1,
            E = null;
        while (z < Math.abs(w)) {
            x += (0.005 * C);
            E = l(y, x);
            z += B(E, A);
            A = E
        }
        return {
            point: E,
            location: x
        }
    };
    var v = function (x, w, y) {
        return k(x, w, y).point
    };
    var m = function (B, x) {
        var A = l(B, x);
        var z = s(B, x);
        var w = z.y - A.y,
            y = z.x - A.x;
        return Math.atan(w / y)
    };
    var u = function (B, F, A, w) {
        w = w == null ? 0 : w;
        var z = k(B, F, w);
        var C = m(B, z.location);
        var G = Math.atan(-1 / C);
        var D = A / 2 * Math.sin(G);
        var E = A / 2 * Math.cos(G);
        return [{
            x: z.point.x + E,
            y: z.point.y + D
        }, {
            x: z.point.x - E,
            y: z.point.y - D
        }]
    };
    var g = window.jsBezier = {
        distanceFromCurve: p,
        gradientAtPoint: m,
        nearestPointOnCurve: b,
        pointOnCurve: l,
        pointAlongCurveFrom: v,
        perpendicularToCurveAt: u,
        quadraticPointOnCurve: s
    }
})(); // JavaScript Document