!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.pw = t() : e.pw = t()
}(self, (function() {
    return ( () => {
        var e = {
            757: (e, t, r) => {
                e.exports = r(666)
            }
            ,
            669: (e, t, r) => {
                e.exports = r(609)
            }
            ,
            448: (e, t, r) => {
                "use strict";
                var n = r(867)
                  , o = r(26)
                  , i = r(372)
                  , a = r(327)
                  , s = r(97)
                  , c = r(109)
                  , u = r(985)
                  , l = r(874)
                  , f = r(648)
                  , d = r(644)
                  , p = r(205);
                e.exports = function(e) {
                    return new Promise((function(t, r) {
                        var h, m = e.data, v = e.headers, y = e.responseType;
                        function g() {
                            e.cancelToken && e.cancelToken.unsubscribe(h),
                            e.signal && e.signal.removeEventListener("abort", h)
                        }
                        n.isFormData(m) && n.isStandardBrowserEnv() && delete v["Content-Type"];
                        var w = new XMLHttpRequest;
                        if (e.auth) {
                            var E = e.auth.username || ""
                              , b = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                            v.Authorization = "Basic " + btoa(E + ":" + b)
                        }
                        var x = s(e.baseURL, e.url);
                        function O() {
                            if (w) {
                                var n = "getAllResponseHeaders"in w ? c(w.getAllResponseHeaders()) : null
                                  , i = {
                                    data: y && "text" !== y && "json" !== y ? w.response : w.responseText,
                                    status: w.status,
                                    statusText: w.statusText,
                                    headers: n,
                                    config: e,
                                    request: w
                                };
                                o((function(e) {
                                    t(e),
                                    g()
                                }
                                ), (function(e) {
                                    r(e),
                                    g()
                                }
                                ), i),
                                w = null
                            }
                        }
                        if (w.open(e.method.toUpperCase(), a(x, e.params, e.paramsSerializer), !0),
                        w.timeout = e.timeout,
                        "onloadend"in w ? w.onloadend = O : w.onreadystatechange = function() {
                            w && 4 === w.readyState && (0 !== w.status || w.responseURL && 0 === w.responseURL.indexOf("file:")) && setTimeout(O)
                        }
                        ,
                        w.onabort = function() {
                            w && (r(new f("Request aborted",f.ECONNABORTED,e,w)),
                            w = null)
                        }
                        ,
                        w.onerror = function() {
                            r(new f("Network Error",f.ERR_NETWORK,e,w,w)),
                            w = null
                        }
                        ,
                        w.ontimeout = function() {
                            var t = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded"
                              , n = e.transitional || l;
                            e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                            r(new f(t,n.clarifyTimeoutError ? f.ETIMEDOUT : f.ECONNABORTED,e,w)),
                            w = null
                        }
                        ,
                        n.isStandardBrowserEnv()) {
                            var S = (e.withCredentials || u(x)) && e.xsrfCookieName ? i.read(e.xsrfCookieName) : void 0;
                            S && (v[e.xsrfHeaderName] = S)
                        }
                        "setRequestHeader"in w && n.forEach(v, (function(e, t) {
                            void 0 === m && "content-type" === t.toLowerCase() ? delete v[t] : w.setRequestHeader(t, e)
                        }
                        )),
                        n.isUndefined(e.withCredentials) || (w.withCredentials = !!e.withCredentials),
                        y && "json" !== y && (w.responseType = e.responseType),
                        "function" == typeof e.onDownloadProgress && w.addEventListener("progress", e.onDownloadProgress),
                        "function" == typeof e.onUploadProgress && w.upload && w.upload.addEventListener("progress", e.onUploadProgress),
                        (e.cancelToken || e.signal) && (h = function(e) {
                            w && (r(!e || e && e.type ? new d : e),
                            w.abort(),
                            w = null)
                        }
                        ,
                        e.cancelToken && e.cancelToken.subscribe(h),
                        e.signal && (e.signal.aborted ? h() : e.signal.addEventListener("abort", h))),
                        m || (m = null);
                        var R = p(x);
                        R && -1 === ["http", "https", "file"].indexOf(R) ? r(new f("Unsupported protocol " + R + ":",f.ERR_BAD_REQUEST,e)) : w.send(m)
                    }
                    ))
                }
            }
            ,
            609: (e, t, r) => {
                "use strict";
                var n = r(867)
                  , o = r(849)
                  , i = r(321)
                  , a = r(185)
                  , s = function e(t) {
                    var r = new i(t)
                      , s = o(i.prototype.request, r);
                    return n.extend(s, i.prototype, r),
                    n.extend(s, r),
                    s.create = function(r) {
                        return e(a(t, r))
                    }
                    ,
                    s
                }(r(546));
                s.Axios = i,
                s.CanceledError = r(644),
                s.CancelToken = r(972),
                s.isCancel = r(502),
                s.VERSION = r(288).version,
                s.toFormData = r(675),
                s.AxiosError = r(648),
                s.Cancel = s.CanceledError,
                s.all = function(e) {
                    return Promise.all(e)
                }
                ,
                s.spread = r(713),
                s.isAxiosError = r(268),
                e.exports = s,
                e.exports.default = s
            }
            ,
            972: (e, t, r) => {
                "use strict";
                var n = r(644);
                function o(e) {
                    if ("function" != typeof e)
                        throw new TypeError("executor must be a function.");
                    var t;
                    this.promise = new Promise((function(e) {
                        t = e
                    }
                    ));
                    var r = this;
                    this.promise.then((function(e) {
                        if (r._listeners) {
                            var t, n = r._listeners.length;
                            for (t = 0; t < n; t++)
                                r._listeners[t](e);
                            r._listeners = null
                        }
                    }
                    )),
                    this.promise.then = function(e) {
                        var t, n = new Promise((function(e) {
                            r.subscribe(e),
                            t = e
                        }
                        )).then(e);
                        return n.cancel = function() {
                            r.unsubscribe(t)
                        }
                        ,
                        n
                    }
                    ,
                    e((function(e) {
                        r.reason || (r.reason = new n(e),
                        t(r.reason))
                    }
                    ))
                }
                o.prototype.throwIfRequested = function() {
                    if (this.reason)
                        throw this.reason
                }
                ,
                o.prototype.subscribe = function(e) {
                    this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e]
                }
                ,
                o.prototype.unsubscribe = function(e) {
                    if (this._listeners) {
                        var t = this._listeners.indexOf(e);
                        -1 !== t && this._listeners.splice(t, 1)
                    }
                }
                ,
                o.source = function() {
                    var e;
                    return {
                        token: new o((function(t) {
                            e = t
                        }
                        )),
                        cancel: e
                    }
                }
                ,
                e.exports = o
            }
            ,
            644: (e, t, r) => {
                "use strict";
                var n = r(648);
                function o(e) {
                    n.call(this, null == e ? "canceled" : e, n.ERR_CANCELED),
                    this.name = "CanceledError"
                }
                r(867).inherits(o, n, {
                    __CANCEL__: !0
                }),
                e.exports = o
            }
            ,
            502: e => {
                "use strict";
                e.exports = function(e) {
                    return !(!e || !e.__CANCEL__)
                }
            }
            ,
            321: (e, t, r) => {
                "use strict";
                var n = r(867)
                  , o = r(327)
                  , i = r(782)
                  , a = r(572)
                  , s = r(185)
                  , c = r(97)
                  , u = r(875)
                  , l = u.validators;
                function f(e) {
                    this.defaults = e,
                    this.interceptors = {
                        request: new i,
                        response: new i
                    }
                }
                f.prototype.request = function(e, t) {
                    "string" == typeof e ? (t = t || {}).url = e : t = e || {},
                    (t = s(this.defaults, t)).method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
                    var r = t.transitional;
                    void 0 !== r && u.assertOptions(r, {
                        silentJSONParsing: l.transitional(l.boolean),
                        forcedJSONParsing: l.transitional(l.boolean),
                        clarifyTimeoutError: l.transitional(l.boolean)
                    }, !1);
                    var n = []
                      , o = !0;
                    this.interceptors.request.forEach((function(e) {
                        "function" == typeof e.runWhen && !1 === e.runWhen(t) || (o = o && e.synchronous,
                        n.unshift(e.fulfilled, e.rejected))
                    }
                    ));
                    var i, c = [];
                    if (this.interceptors.response.forEach((function(e) {
                        c.push(e.fulfilled, e.rejected)
                    }
                    )),
                    !o) {
                        var f = [a, void 0];
                        for (Array.prototype.unshift.apply(f, n),
                        f = f.concat(c),
                        i = Promise.resolve(t); f.length; )
                            i = i.then(f.shift(), f.shift());
                        return i
                    }
                    for (var d = t; n.length; ) {
                        var p = n.shift()
                          , h = n.shift();
                        try {
                            d = p(d)
                        } catch (e) {
                            h(e);
                            break
                        }
                    }
                    try {
                        i = a(d)
                    } catch (e) {
                        return Promise.reject(e)
                    }
                    for (; c.length; )
                        i = i.then(c.shift(), c.shift());
                    return i
                }
                ,
                f.prototype.getUri = function(e) {
                    e = s(this.defaults, e);
                    var t = c(e.baseURL, e.url);
                    return o(t, e.params, e.paramsSerializer)
                }
                ,
                n.forEach(["delete", "get", "head", "options"], (function(e) {
                    f.prototype[e] = function(t, r) {
                        return this.request(s(r || {}, {
                            method: e,
                            url: t,
                            data: (r || {}).data
                        }))
                    }
                }
                )),
                n.forEach(["post", "put", "patch"], (function(e) {
                    function t(t) {
                        return function(r, n, o) {
                            return this.request(s(o || {}, {
                                method: e,
                                headers: t ? {
                                    "Content-Type": "multipart/form-data"
                                } : {},
                                url: r,
                                data: n
                            }))
                        }
                    }
                    f.prototype[e] = t(),
                    f.prototype[e + "Form"] = t(!0)
                }
                )),
                e.exports = f
            }
            ,
            648: (e, t, r) => {
                "use strict";
                var n = r(867);
                function o(e, t, r, n, o) {
                    Error.call(this),
                    this.message = e,
                    this.name = "AxiosError",
                    t && (this.code = t),
                    r && (this.config = r),
                    n && (this.request = n),
                    o && (this.response = o)
                }
                n.inherits(o, Error, {
                    toJSON: function() {
                        return {
                            message: this.message,
                            name: this.name,
                            description: this.description,
                            number: this.number,
                            fileName: this.fileName,
                            lineNumber: this.lineNumber,
                            columnNumber: this.columnNumber,
                            stack: this.stack,
                            config: this.config,
                            code: this.code,
                            status: this.response && this.response.status ? this.response.status : null
                        }
                    }
                });
                var i = o.prototype
                  , a = {};
                ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED"].forEach((function(e) {
                    a[e] = {
                        value: e
                    }
                }
                )),
                Object.defineProperties(o, a),
                Object.defineProperty(i, "isAxiosError", {
                    value: !0
                }),
                o.from = function(e, t, r, a, s, c) {
                    var u = Object.create(i);
                    return n.toFlatObject(e, u, (function(e) {
                        return e !== Error.prototype
                    }
                    )),
                    o.call(u, e.message, t, r, a, s),
                    u.name = e.name,
                    c && Object.assign(u, c),
                    u
                }
                ,
                e.exports = o
            }
            ,
            782: (e, t, r) => {
                "use strict";
                var n = r(867);
                function o() {
                    this.handlers = []
                }
                o.prototype.use = function(e, t, r) {
                    return this.handlers.push({
                        fulfilled: e,
                        rejected: t,
                        synchronous: !!r && r.synchronous,
                        runWhen: r ? r.runWhen : null
                    }),
                    this.handlers.length - 1
                }
                ,
                o.prototype.eject = function(e) {
                    this.handlers[e] && (this.handlers[e] = null)
                }
                ,
                o.prototype.forEach = function(e) {
                    n.forEach(this.handlers, (function(t) {
                        null !== t && e(t)
                    }
                    ))
                }
                ,
                e.exports = o
            }
            ,
            97: (e, t, r) => {
                "use strict";
                var n = r(793)
                  , o = r(303);
                e.exports = function(e, t) {
                    return e && !n(t) ? o(e, t) : t
                }
            }
            ,
            572: (e, t, r) => {
                "use strict";
                var n = r(867)
                  , o = r(527)
                  , i = r(502)
                  , a = r(546)
                  , s = r(644);
                function c(e) {
                    if (e.cancelToken && e.cancelToken.throwIfRequested(),
                    e.signal && e.signal.aborted)
                        throw new s
                }
                e.exports = function(e) {
                    return c(e),
                    e.headers = e.headers || {},
                    e.data = o.call(e, e.data, e.headers, e.transformRequest),
                    e.headers = n.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers),
                    n.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function(t) {
                        delete e.headers[t]
                    }
                    )),
                    (e.adapter || a.adapter)(e).then((function(t) {
                        return c(e),
                        t.data = o.call(e, t.data, t.headers, e.transformResponse),
                        t
                    }
                    ), (function(t) {
                        return i(t) || (c(e),
                        t && t.response && (t.response.data = o.call(e, t.response.data, t.response.headers, e.transformResponse))),
                        Promise.reject(t)
                    }
                    ))
                }
            }
            ,
            185: (e, t, r) => {
                "use strict";
                var n = r(867);
                e.exports = function(e, t) {
                    t = t || {};
                    var r = {};
                    function o(e, t) {
                        return n.isPlainObject(e) && n.isPlainObject(t) ? n.merge(e, t) : n.isPlainObject(t) ? n.merge({}, t) : n.isArray(t) ? t.slice() : t
                    }
                    function i(r) {
                        return n.isUndefined(t[r]) ? n.isUndefined(e[r]) ? void 0 : o(void 0, e[r]) : o(e[r], t[r])
                    }
                    function a(e) {
                        if (!n.isUndefined(t[e]))
                            return o(void 0, t[e])
                    }
                    function s(r) {
                        return n.isUndefined(t[r]) ? n.isUndefined(e[r]) ? void 0 : o(void 0, e[r]) : o(void 0, t[r])
                    }
                    function c(r) {
                        return r in t ? o(e[r], t[r]) : r in e ? o(void 0, e[r]) : void 0
                    }
                    var u = {
                        url: a,
                        method: a,
                        data: a,
                        baseURL: s,
                        transformRequest: s,
                        transformResponse: s,
                        paramsSerializer: s,
                        timeout: s,
                        timeoutMessage: s,
                        withCredentials: s,
                        adapter: s,
                        responseType: s,
                        xsrfCookieName: s,
                        xsrfHeaderName: s,
                        onUploadProgress: s,
                        onDownloadProgress: s,
                        decompress: s,
                        maxContentLength: s,
                        maxBodyLength: s,
                        beforeRedirect: s,
                        transport: s,
                        httpAgent: s,
                        httpsAgent: s,
                        cancelToken: s,
                        socketPath: s,
                        responseEncoding: s,
                        validateStatus: c
                    };
                    return n.forEach(Object.keys(e).concat(Object.keys(t)), (function(e) {
                        var t = u[e] || i
                          , o = t(e);
                        n.isUndefined(o) && t !== c || (r[e] = o)
                    }
                    )),
                    r
                }
            }
            ,
            26: (e, t, r) => {
                "use strict";
                var n = r(648);
                e.exports = function(e, t, r) {
                    var o = r.config.validateStatus;
                    r.status && o && !o(r.status) ? t(new n("Request failed with status code " + r.status,[n.ERR_BAD_REQUEST, n.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],r.config,r.request,r)) : e(r)
                }
            }
            ,
            527: (e, t, r) => {
                "use strict";
                var n = r(867)
                  , o = r(546);
                e.exports = function(e, t, r) {
                    var i = this || o;
                    return n.forEach(r, (function(r) {
                        e = r.call(i, e, t)
                    }
                    )),
                    e
                }
            }
            ,
            546: (e, t, r) => {
                "use strict";
                var n = r(867)
                  , o = r(16)
                  , i = r(648)
                  , a = r(874)
                  , s = r(675)
                  , c = {
                    "Content-Type": "application/x-www-form-urlencoded"
                };
                function u(e, t) {
                    !n.isUndefined(e) && n.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
                }
                var l, f = {
                    transitional: a,
                    adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (l = r(448)),
                    l),
                    transformRequest: [function(e, t) {
                        if (o(t, "Accept"),
                        o(t, "Content-Type"),
                        n.isFormData(e) || n.isArrayBuffer(e) || n.isBuffer(e) || n.isStream(e) || n.isFile(e) || n.isBlob(e))
                            return e;
                        if (n.isArrayBufferView(e))
                            return e.buffer;
                        if (n.isURLSearchParams(e))
                            return u(t, "application/x-www-form-urlencoded;charset=utf-8"),
                            e.toString();
                        var r, i = n.isObject(e), a = t && t["Content-Type"];
                        if ((r = n.isFileList(e)) || i && "multipart/form-data" === a) {
                            var c = this.env && this.env.FormData;
                            return s(r ? {
                                "files[]": e
                            } : e, c && new c)
                        }
                        return i || "application/json" === a ? (u(t, "application/json"),
                        function(e, t, r) {
                            if (n.isString(e))
                                try {
                                    return (0,
                                    JSON.parse)(e),
                                    n.trim(e)
                                } catch (e) {
                                    if ("SyntaxError" !== e.name)
                                        throw e
                                }
                            return (0,
                            JSON.stringify)(e)
                        }(e)) : e
                    }
                    ],
                    transformResponse: [function(e) {
                        var t = this.transitional || f.transitional
                          , r = t && t.silentJSONParsing
                          , o = t && t.forcedJSONParsing
                          , a = !r && "json" === this.responseType;
                        if (a || o && n.isString(e) && e.length)
                            try {
                                return JSON.parse(e)
                            } catch (e) {
                                if (a) {
                                    if ("SyntaxError" === e.name)
                                        throw i.from(e, i.ERR_BAD_RESPONSE, this, null, this.response);
                                    throw e
                                }
                            }
                        return e
                    }
                    ],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                    maxBodyLength: -1,
                    env: {
                        FormData: r(623)
                    },
                    validateStatus: function(e) {
                        return e >= 200 && e < 300
                    },
                    headers: {
                        common: {
                            Accept: "application/json, text/plain, */*"
                        }
                    }
                };
                n.forEach(["delete", "get", "head"], (function(e) {
                    f.headers[e] = {}
                }
                )),
                n.forEach(["post", "put", "patch"], (function(e) {
                    f.headers[e] = n.merge(c)
                }
                )),
                e.exports = f
            }
            ,
            874: e => {
                "use strict";
                e.exports = {
                    silentJSONParsing: !0,
                    forcedJSONParsing: !0,
                    clarifyTimeoutError: !1
                }
            }
            ,
            288: e => {
                e.exports = {
                    version: "0.27.2"
                }
            }
            ,
            849: e => {
                "use strict";
                e.exports = function(e, t) {
                    return function() {
                        for (var r = new Array(arguments.length), n = 0; n < r.length; n++)
                            r[n] = arguments[n];
                        return e.apply(t, r)
                    }
                }
            }
            ,
            327: (e, t, r) => {
                "use strict";
                var n = r(867);
                function o(e) {
                    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
                }
                e.exports = function(e, t, r) {
                    if (!t)
                        return e;
                    var i;
                    if (r)
                        i = r(t);
                    else if (n.isURLSearchParams(t))
                        i = t.toString();
                    else {
                        var a = [];
                        n.forEach(t, (function(e, t) {
                            null != e && (n.isArray(e) ? t += "[]" : e = [e],
                            n.forEach(e, (function(e) {
                                n.isDate(e) ? e = e.toISOString() : n.isObject(e) && (e = JSON.stringify(e)),
                                a.push(o(t) + "=" + o(e))
                            }
                            )))
                        }
                        )),
                        i = a.join("&")
                    }
                    if (i) {
                        var s = e.indexOf("#");
                        -1 !== s && (e = e.slice(0, s)),
                        e += (-1 === e.indexOf("?") ? "?" : "&") + i
                    }
                    return e
                }
            }
            ,
            303: e => {
                "use strict";
                e.exports = function(e, t) {
                    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
                }
            }
            ,
            372: (e, t, r) => {
                "use strict";
                var n = r(867);
                e.exports = n.isStandardBrowserEnv() ? {
                    write: function(e, t, r, o, i, a) {
                        var s = [];
                        s.push(e + "=" + encodeURIComponent(t)),
                        n.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()),
                        n.isString(o) && s.push("path=" + o),
                        n.isString(i) && s.push("domain=" + i),
                        !0 === a && s.push("secure"),
                        document.cookie = s.join("; ")
                    },
                    read: function(e) {
                        var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                        return t ? decodeURIComponent(t[3]) : null
                    },
                    remove: function(e) {
                        this.write(e, "", Date.now() - 864e5)
                    }
                } : {
                    write: function() {},
                    read: function() {
                        return null
                    },
                    remove: function() {}
                }
            }
            ,
            793: e => {
                "use strict";
                e.exports = function(e) {
                    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
                }
            }
            ,
            268: (e, t, r) => {
                "use strict";
                var n = r(867);
                e.exports = function(e) {
                    return n.isObject(e) && !0 === e.isAxiosError
                }
            }
            ,
            985: (e, t, r) => {
                "use strict";
                var n = r(867);
                e.exports = n.isStandardBrowserEnv() ? function() {
                    var e, t = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");
                    function o(e) {
                        var n = e;
                        return t && (r.setAttribute("href", n),
                        n = r.href),
                        r.setAttribute("href", n),
                        {
                            href: r.href,
                            protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                            host: r.host,
                            search: r.search ? r.search.replace(/^\?/, "") : "",
                            hash: r.hash ? r.hash.replace(/^#/, "") : "",
                            hostname: r.hostname,
                            port: r.port,
                            pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname
                        }
                    }
                    return e = o(window.location.href),
                    function(t) {
                        var r = n.isString(t) ? o(t) : t;
                        return r.protocol === e.protocol && r.host === e.host
                    }
                }() : function() {
                    return !0
                }
            }
            ,
            16: (e, t, r) => {
                "use strict";
                var n = r(867);
                e.exports = function(e, t) {
                    n.forEach(e, (function(r, n) {
                        n !== t && n.toUpperCase() === t.toUpperCase() && (e[t] = r,
                        delete e[n])
                    }
                    ))
                }
            }
            ,
            623: e => {
                e.exports = null
            }
            ,
            109: (e, t, r) => {
                "use strict";
                var n = r(867)
                  , o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
                e.exports = function(e) {
                    var t, r, i, a = {};
                    return e ? (n.forEach(e.split("\n"), (function(e) {
                        if (i = e.indexOf(":"),
                        t = n.trim(e.substr(0, i)).toLowerCase(),
                        r = n.trim(e.substr(i + 1)),
                        t) {
                            if (a[t] && o.indexOf(t) >= 0)
                                return;
                            a[t] = "set-cookie" === t ? (a[t] ? a[t] : []).concat([r]) : a[t] ? a[t] + ", " + r : r
                        }
                    }
                    )),
                    a) : a
                }
            }
            ,
            205: e => {
                "use strict";
                e.exports = function(e) {
                    var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                    return t && t[1] || ""
                }
            }
            ,
            713: e => {
                "use strict";
                e.exports = function(e) {
                    return function(t) {
                        return e.apply(null, t)
                    }
                }
            }
            ,
            675: (e, t, r) => {
                "use strict";
                var n = r(867);
                e.exports = function(e, t) {
                    t = t || new FormData;
                    var r = [];
                    function o(e) {
                        return null === e ? "" : n.isDate(e) ? e.toISOString() : n.isArrayBuffer(e) || n.isTypedArray(e) ? "function" == typeof Blob ? new Blob([e]) : Buffer.from(e) : e
                    }
                    return function e(i, a) {
                        if (n.isPlainObject(i) || n.isArray(i)) {
                            if (-1 !== r.indexOf(i))
                                throw Error("Circular reference detected in " + a);
                            r.push(i),
                            n.forEach(i, (function(r, i) {
                                if (!n.isUndefined(r)) {
                                    var s, c = a ? a + "." + i : i;
                                    if (r && !a && "object" == typeof r)
                                        if (n.endsWith(i, "{}"))
                                            r = JSON.stringify(r);
                                        else if (n.endsWith(i, "[]") && (s = n.toArray(r)))
                                            return void s.forEach((function(e) {
                                                !n.isUndefined(e) && t.append(c, o(e))
                                            }
                                            ));
                                    e(r, c)
                                }
                            }
                            )),
                            r.pop()
                        } else
                            t.append(a, o(i))
                    }(e),
                    t
                }
            }
            ,
            875: (e, t, r) => {
                "use strict";
                var n = r(288).version
                  , o = r(648)
                  , i = {};
                ["object", "boolean", "number", "function", "string", "symbol"].forEach((function(e, t) {
                    i[e] = function(r) {
                        return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
                    }
                }
                ));
                var a = {};
                i.transitional = function(e, t, r) {
                    function i(e, t) {
                        return "[Axios v" + n + "] Transitional option '" + e + "'" + t + (r ? ". " + r : "")
                    }
                    return function(r, n, s) {
                        if (!1 === e)
                            throw new o(i(n, " has been removed" + (t ? " in " + t : "")),o.ERR_DEPRECATED);
                        return t && !a[n] && (a[n] = !0,
                        console.warn(i(n, " has been deprecated since v" + t + " and will be removed in the near future"))),
                        !e || e(r, n, s)
                    }
                }
                ,
                e.exports = {
                    assertOptions: function(e, t, r) {
                        if ("object" != typeof e)
                            throw new o("options must be an object",o.ERR_BAD_OPTION_VALUE);
                        for (var n = Object.keys(e), i = n.length; i-- > 0; ) {
                            var a = n[i]
                              , s = t[a];
                            if (s) {
                                var c = e[a]
                                  , u = void 0 === c || s(c, a, e);
                                if (!0 !== u)
                                    throw new o("option " + a + " must be " + u,o.ERR_BAD_OPTION_VALUE)
                            } else if (!0 !== r)
                                throw new o("Unknown option " + a,o.ERR_BAD_OPTION)
                        }
                    },
                    validators: i
                }
            }
            ,
            867: (e, t, r) => {
                "use strict";
                var n, o = r(849), i = Object.prototype.toString, a = (n = Object.create(null),
                function(e) {
                    var t = i.call(e);
                    return n[t] || (n[t] = t.slice(8, -1).toLowerCase())
                }
                );
                function s(e) {
                    return e = e.toLowerCase(),
                    function(t) {
                        return a(t) === e
                    }
                }
                function c(e) {
                    return Array.isArray(e)
                }
                function u(e) {
                    return void 0 === e
                }
                var l = s("ArrayBuffer");
                function f(e) {
                    return null !== e && "object" == typeof e
                }
                function d(e) {
                    if ("object" !== a(e))
                        return !1;
                    var t = Object.getPrototypeOf(e);
                    return null === t || t === Object.prototype
                }
                var p = s("Date")
                  , h = s("File")
                  , m = s("Blob")
                  , v = s("FileList");
                function y(e) {
                    return "[object Function]" === i.call(e)
                }
                var g = s("URLSearchParams");
                function w(e, t) {
                    if (null != e)
                        if ("object" != typeof e && (e = [e]),
                        c(e))
                            for (var r = 0, n = e.length; r < n; r++)
                                t.call(null, e[r], r, e);
                        else
                            for (var o in e)
                                Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
                }
                var E, b = (E = "undefined" != typeof Uint8Array && Object.getPrototypeOf(Uint8Array),
                function(e) {
                    return E && e instanceof E
                }
                );
                e.exports = {
                    isArray: c,
                    isArrayBuffer: l,
                    isBuffer: function(e) {
                        return null !== e && !u(e) && null !== e.constructor && !u(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                    },
                    isFormData: function(e) {
                        var t = "[object FormData]";
                        return e && ("function" == typeof FormData && e instanceof FormData || i.call(e) === t || y(e.toString) && e.toString() === t)
                    },
                    isArrayBufferView: function(e) {
                        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && l(e.buffer)
                    },
                    isString: function(e) {
                        return "string" == typeof e
                    },
                    isNumber: function(e) {
                        return "number" == typeof e
                    },
                    isObject: f,
                    isPlainObject: d,
                    isUndefined: u,
                    isDate: p,
                    isFile: h,
                    isBlob: m,
                    isFunction: y,
                    isStream: function(e) {
                        return f(e) && y(e.pipe)
                    },
                    isURLSearchParams: g,
                    isStandardBrowserEnv: function() {
                        return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document
                    },
                    forEach: w,
                    merge: function e() {
                        var t = {};
                        function r(r, n) {
                            d(t[n]) && d(r) ? t[n] = e(t[n], r) : d(r) ? t[n] = e({}, r) : c(r) ? t[n] = r.slice() : t[n] = r
                        }
                        for (var n = 0, o = arguments.length; n < o; n++)
                            w(arguments[n], r);
                        return t
                    },
                    extend: function(e, t, r) {
                        return w(t, (function(t, n) {
                            e[n] = r && "function" == typeof t ? o(t, r) : t
                        }
                        )),
                        e
                    },
                    trim: function(e) {
                        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                    },
                    stripBOM: function(e) {
                        return 65279 === e.charCodeAt(0) && (e = e.slice(1)),
                        e
                    },
                    inherits: function(e, t, r, n) {
                        e.prototype = Object.create(t.prototype, n),
                        e.prototype.constructor = e,
                        r && Object.assign(e.prototype, r)
                    },
                    toFlatObject: function(e, t, r) {
                        var n, o, i, a = {};
                        t = t || {};
                        do {
                            for (o = (n = Object.getOwnPropertyNames(e)).length; o-- > 0; )
                                a[i = n[o]] || (t[i] = e[i],
                                a[i] = !0);
                            e = Object.getPrototypeOf(e)
                        } while (e && (!r || r(e, t)) && e !== Object.prototype);
                        return t
                    },
                    kindOf: a,
                    kindOfTest: s,
                    endsWith: function(e, t, r) {
                        e = String(e),
                        (void 0 === r || r > e.length) && (r = e.length),
                        r -= t.length;
                        var n = e.indexOf(t, r);
                        return -1 !== n && n === r
                    },
                    toArray: function(e) {
                        if (!e)
                            return null;
                        var t = e.length;
                        if (u(t))
                            return null;
                        for (var r = new Array(t); t-- > 0; )
                            r[t] = e[t];
                        return r
                    },
                    isTypedArray: b,
                    isFileList: v
                }
            }
            ,
            666: e => {
                var t = function(e) {
                    "use strict";
                    var t, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", s = o.toStringTag || "@@toStringTag";
                    function c(e, t, r) {
                        return Object.defineProperty(e, t, {
                            value: r,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }),
                        e[t]
                    }
                    try {
                        c({}, "")
                    } catch (e) {
                        c = function(e, t, r) {
                            return e[t] = r
                        }
                    }
                    function u(e, t, r, n) {
                        var o = t && t.prototype instanceof v ? t : v
                          , i = Object.create(o.prototype)
                          , a = new A(n || []);
                        return i._invoke = function(e, t, r) {
                            var n = f;
                            return function(o, i) {
                                if (n === p)
                                    throw new Error("Generator is already running");
                                if (n === h) {
                                    if ("throw" === o)
                                        throw i;
                                    return k()
                                }
                                for (r.method = o,
                                r.arg = i; ; ) {
                                    var a = r.delegate;
                                    if (a) {
                                        var s = R(a, r);
                                        if (s) {
                                            if (s === m)
                                                continue;
                                            return s
                                        }
                                    }
                                    if ("next" === r.method)
                                        r.sent = r._sent = r.arg;
                                    else if ("throw" === r.method) {
                                        if (n === f)
                                            throw n = h,
                                            r.arg;
                                        r.dispatchException(r.arg)
                                    } else
                                        "return" === r.method && r.abrupt("return", r.arg);
                                    n = p;
                                    var c = l(e, t, r);
                                    if ("normal" === c.type) {
                                        if (n = r.done ? h : d,
                                        c.arg === m)
                                            continue;
                                        return {
                                            value: c.arg,
                                            done: r.done
                                        }
                                    }
                                    "throw" === c.type && (n = h,
                                    r.method = "throw",
                                    r.arg = c.arg)
                                }
                            }
                        }(e, r, a),
                        i
                    }
                    function l(e, t, r) {
                        try {
                            return {
                                type: "normal",
                                arg: e.call(t, r)
                            }
                        } catch (e) {
                            return {
                                type: "throw",
                                arg: e
                            }
                        }
                    }
                    e.wrap = u;
                    var f = "suspendedStart"
                      , d = "suspendedYield"
                      , p = "executing"
                      , h = "completed"
                      , m = {};
                    function v() {}
                    function y() {}
                    function g() {}
                    var w = {};
                    c(w, i, (function() {
                        return this
                    }
                    ));
                    var E = Object.getPrototypeOf
                      , b = E && E(E(P([])));
                    b && b !== r && n.call(b, i) && (w = b);
                    var x = g.prototype = v.prototype = Object.create(w);
                    function O(e) {
                        ["next", "throw", "return"].forEach((function(t) {
                            c(e, t, (function(e) {
                                return this._invoke(t, e)
                            }
                            ))
                        }
                        ))
                    }
                    function S(e, t) {
                        function r(o, i, a, s) {
                            var c = l(e[o], e, i);
                            if ("throw" !== c.type) {
                                var u = c.arg
                                  , f = u.value;
                                return f && "object" == typeof f && n.call(f, "__await") ? t.resolve(f.__await).then((function(e) {
                                    r("next", e, a, s)
                                }
                                ), (function(e) {
                                    r("throw", e, a, s)
                                }
                                )) : t.resolve(f).then((function(e) {
                                    u.value = e,
                                    a(u)
                                }
                                ), (function(e) {
                                    return r("throw", e, a, s)
                                }
                                ))
                            }
                            s(c.arg)
                        }
                        var o;
                        this._invoke = function(e, n) {
                            function i() {
                                return new t((function(t, o) {
                                    r(e, n, t, o)
                                }
                                ))
                            }
                            return o = o ? o.then(i, i) : i()
                        }
                    }
                    function R(e, r) {
                        var n = e.iterator[r.method];
                        if (n === t) {
                            if (r.delegate = null,
                            "throw" === r.method) {
                                if (e.iterator.return && (r.method = "return",
                                r.arg = t,
                                R(e, r),
                                "throw" === r.method))
                                    return m;
                                r.method = "throw",
                                r.arg = new TypeError("The iterator does not provide a 'throw' method")
                            }
                            return m
                        }
                        var o = l(n, e.iterator, r.arg);
                        if ("throw" === o.type)
                            return r.method = "throw",
                            r.arg = o.arg,
                            r.delegate = null,
                            m;
                        var i = o.arg;
                        return i ? i.done ? (r[e.resultName] = i.value,
                        r.next = e.nextLoc,
                        "return" !== r.method && (r.method = "next",
                        r.arg = t),
                        r.delegate = null,
                        m) : i : (r.method = "throw",
                        r.arg = new TypeError("iterator result is not an object"),
                        r.delegate = null,
                        m)
                    }
                    function T(e) {
                        var t = {
                            tryLoc: e[0]
                        };
                        1 in e && (t.catchLoc = e[1]),
                        2 in e && (t.finallyLoc = e[2],
                        t.afterLoc = e[3]),
                        this.tryEntries.push(t)
                    }
                    function C(e) {
                        var t = e.completion || {};
                        t.type = "normal",
                        delete t.arg,
                        e.completion = t
                    }
                    function A(e) {
                        this.tryEntries = [{
                            tryLoc: "root"
                        }],
                        e.forEach(T, this),
                        this.reset(!0)
                    }
                    function P(e) {
                        if (e) {
                            var r = e[i];
                            if (r)
                                return r.call(e);
                            if ("function" == typeof e.next)
                                return e;
                            if (!isNaN(e.length)) {
                                var o = -1
                                  , a = function r() {
                                    for (; ++o < e.length; )
                                        if (n.call(e, o))
                                            return r.value = e[o],
                                            r.done = !1,
                                            r;
                                    return r.value = t,
                                    r.done = !0,
                                    r
                                };
                                return a.next = a
                            }
                        }
                        return {
                            next: k
                        }
                    }
                    function k() {
                        return {
                            value: t,
                            done: !0
                        }
                    }
                    return y.prototype = g,
                    c(x, "constructor", g),
                    c(g, "constructor", y),
                    y.displayName = c(g, s, "GeneratorFunction"),
                    e.isGeneratorFunction = function(e) {
                        var t = "function" == typeof e && e.constructor;
                        return !!t && (t === y || "GeneratorFunction" === (t.displayName || t.name))
                    }
                    ,
                    e.mark = function(e) {
                        return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g,
                        c(e, s, "GeneratorFunction")),
                        e.prototype = Object.create(x),
                        e
                    }
                    ,
                    e.awrap = function(e) {
                        return {
                            __await: e
                        }
                    }
                    ,
                    O(S.prototype),
                    c(S.prototype, a, (function() {
                        return this
                    }
                    )),
                    e.AsyncIterator = S,
                    e.async = function(t, r, n, o, i) {
                        void 0 === i && (i = Promise);
                        var a = new S(u(t, r, n, o),i);
                        return e.isGeneratorFunction(r) ? a : a.next().then((function(e) {
                            return e.done ? e.value : a.next()
                        }
                        ))
                    }
                    ,
                    O(x),
                    c(x, s, "Generator"),
                    c(x, i, (function() {
                        return this
                    }
                    )),
                    c(x, "toString", (function() {
                        return "[object Generator]"
                    }
                    )),
                    e.keys = function(e) {
                        var t = [];
                        for (var r in e)
                            t.push(r);
                        return t.reverse(),
                        function r() {
                            for (; t.length; ) {
                                var n = t.pop();
                                if (n in e)
                                    return r.value = n,
                                    r.done = !1,
                                    r
                            }
                            return r.done = !0,
                            r
                        }
                    }
                    ,
                    e.values = P,
                    A.prototype = {
                        constructor: A,
                        reset: function(e) {
                            if (this.prev = 0,
                            this.next = 0,
                            this.sent = this._sent = t,
                            this.done = !1,
                            this.delegate = null,
                            this.method = "next",
                            this.arg = t,
                            this.tryEntries.forEach(C),
                            !e)
                                for (var r in this)
                                    "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t)
                        },
                        stop: function() {
                            this.done = !0;
                            var e = this.tryEntries[0].completion;
                            if ("throw" === e.type)
                                throw e.arg;
                            return this.rval
                        },
                        dispatchException: function(e) {
                            if (this.done)
                                throw e;
                            var r = this;
                            function o(n, o) {
                                return s.type = "throw",
                                s.arg = e,
                                r.next = n,
                                o && (r.method = "next",
                                r.arg = t),
                                !!o
                            }
                            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                var a = this.tryEntries[i]
                                  , s = a.completion;
                                if ("root" === a.tryLoc)
                                    return o("end");
                                if (a.tryLoc <= this.prev) {
                                    var c = n.call(a, "catchLoc")
                                      , u = n.call(a, "finallyLoc");
                                    if (c && u) {
                                        if (this.prev < a.catchLoc)
                                            return o(a.catchLoc, !0);
                                        if (this.prev < a.finallyLoc)
                                            return o(a.finallyLoc)
                                    } else if (c) {
                                        if (this.prev < a.catchLoc)
                                            return o(a.catchLoc, !0)
                                    } else {
                                        if (!u)
                                            throw new Error("try statement without catch or finally");
                                        if (this.prev < a.finallyLoc)
                                            return o(a.finallyLoc)
                                    }
                                }
                            }
                        },
                        abrupt: function(e, t) {
                            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                                var o = this.tryEntries[r];
                                if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                                    var i = o;
                                    break
                                }
                            }
                            i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                            var a = i ? i.completion : {};
                            return a.type = e,
                            a.arg = t,
                            i ? (this.method = "next",
                            this.next = i.finallyLoc,
                            m) : this.complete(a)
                        },
                        complete: function(e, t) {
                            if ("throw" === e.type)
                                throw e.arg;
                            return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
                            this.method = "return",
                            this.next = "end") : "normal" === e.type && t && (this.next = t),
                            m
                        },
                        finish: function(e) {
                            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                var r = this.tryEntries[t];
                                if (r.finallyLoc === e)
                                    return this.complete(r.completion, r.afterLoc),
                                    C(r),
                                    m
                            }
                        },
                        catch: function(e) {
                            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                var r = this.tryEntries[t];
                                if (r.tryLoc === e) {
                                    var n = r.completion;
                                    if ("throw" === n.type) {
                                        var o = n.arg;
                                        C(r)
                                    }
                                    return o
                                }
                            }
                            throw new Error("illegal catch attempt")
                        },
                        delegateYield: function(e, r, n) {
                            return this.delegate = {
                                iterator: P(e),
                                resultName: r,
                                nextLoc: n
                            },
                            "next" === this.method && (this.arg = t),
                            m
                        }
                    },
                    e
                }(e.exports);
                try {
                    regeneratorRuntime = t
                } catch (e) {
                    "object" == typeof globalThis ? globalThis.regeneratorRuntime = t : Function("r", "regeneratorRuntime = r")(t)
                }
            }
        }
          , t = {};
        function r(n) {
            var o = t[n];
            if (void 0 !== o)
                return o.exports;
            var i = t[n] = {
                exports: {}
            };
            return e[n](i, i.exports, r),
            i.exports
        }
        r.n = e => {
            var t = e && e.__esModule ? () => e.default : () => e;
            return r.d(t, {
                a: t
            }),
            t
        }
        ,
        r.d = (e, t) => {
            for (var n in t)
                r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: t[n]
                })
        }
        ,
        r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r.r = e => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ;
        var n = {};
        return ( () => {
            "use strict";
            function e(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function t(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            function o(e, r, n) {
                return r && t(e.prototype, r),
                n && t(e, n),
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }),
                e
            }
            function i(e, t, r) {
                return t in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r,
                e
            }
            function a(e, t, r, n, o, i, a) {
                try {
                    var s = e[i](a)
                      , c = s.value
                } catch (e) {
                    return void r(e)
                }
                s.done ? t(c) : Promise.resolve(c).then(n, o)
            }
            function s(e) {
                return function() {
                    var t = this
                      , r = arguments;
                    return new Promise((function(n, o) {
                        var i = e.apply(t, r);
                        function s(e) {
                            a(i, n, o, s, c, "next", e)
                        }
                        function c(e) {
                            a(i, n, o, s, c, "throw", e)
                        }
                        s(void 0)
                    }
                    ))
                }
            }
            r.r(n),
            r.d(n, {
                PayWidget: () => z,
                Widget: () => Y,
                constant: () => V,
                sessionId: () => J
            });
            var c, u = r(757), l = r.n(u);
            function f(e, t) {
                return d.apply(this, arguments)
            }
            function d() {
                return (d = s(l().mark((function e(t, r) {
                    var n, o, i, a, s;
                    return l().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.prev = 0,
                                n = (new TextEncoder).encode(t),
                                o = (new TextEncoder).encode(r),
                                e.next = 5,
                                crypto.subtle.importKey("raw", n, {
                                    name: "HMAC",
                                    hash: "SHA-256"
                                }, !1, ["sign"]);
                            case 5:
                                return i = e.sent,
                                e.next = 8,
                                crypto.subtle.sign("HMAC", i, o);
                            case 8:
                                return a = e.sent,
                                s = new Uint8Array(a),
                                e.abrupt("return", p(s));
                            case 13:
                                throw e.prev = 13,
                                e.t0 = e.catch(0),
                                new Error(c.CreateSignatureError,{
                                    cause: e.t0
                                });
                            case 16:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, null, [[0, 13]])
                }
                )))).apply(this, arguments)
            }
            function p(e) {
                return Array.from(e, (function(e) {
                    return ("0" + (255 & e).toString(16)).slice(-2)
                }
                )).join("")
            }
            function h(e, t) {
                return m.apply(this, arguments)
            }
            function m() {
                return (m = s(l().mark((function e(t, r) {
                    return l().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                f(t, r);
                            case 2:
                                return e.abrupt("return", e.sent);
                            case 3:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )))).apply(this, arguments)
            }
            !function(e) {
                e.WidgetLoaded = "PAY_WIDGET:LOADED",
                e.CreateNetworkError = "PAY_WIDGET:CREATE_NETWORK_ERROR",
                e.CreateBadRequestError = "PAY_WIDGET:CREATE_BAD_REQUEST_ERROR",
                e.CreateSignatureError = "PAY_WIDGET:CREATE_SIGNATURE_ERROR",
                e.CreateInvalidParams = "PAY_WIDGET:CREATE_INVALID_PARAMS",
                e.TransactionFail = "PAY_WIDGET:TRANSACTION_FAIL",
                e.CloseBeforePay = "PAY_WIDGET:CLOSE_BEFORE_PAY",
                e.CloseAfterFail = "PAY_WIDGET:CLOSE_AFTER_FAIL",
                e.CloseCommonError = "PAY_WIDGET:CLOSE_COMMON_ERROR",
                e.CloseAfterSuccess = "PAY_WIDGET:CLOSE_AFTER_SUCCESS",
                e.CloseBeforeRedirect = "PAY_WIDGET:CLOSE_BEFORE_REDIRECT"
            }(c || (c = {}));
            var v;
            !function(e) {
                e.ConnectError = "connect-error"
            }(v || (v = {}));
            var y = "https://widget.payselection.com" + "/error?code=".concat(v.ConnectError)
              , g = function() {
                function t() {
                    e(this, t)
                }
                var r;
                return o(t, null, [{
                    key: "removeClass",
                    value: function(e, t) {
                        for (var r = e.className; -1 !== r.indexOf(t); )
                            r = (r = r.replace(t, "")).trim();
                        e.className = r
                    }
                }, {
                    key: "getDeviceData",
                    value: function() {
                        var e, t, r, n, o;
                        return {
                            mobile: null === (e = navigator) || void 0 === e || null === (t = e.userAgentData) || void 0 === t ? void 0 : t.mobile,
                            platform: (null === (r = navigator) || void 0 === r || null === (n = r.userAgentData) || void 0 === n ? void 0 : n.platform) || (null === (o = navigator) || void 0 === o ? void 0 : o.platform) || "unknown"
                        }
                    }
                }, {
                    key: "getExtraData",
                    value: function() {
                        var e = new Date;
                        return {
                            ScreenHeight: screen.height || window.innerHeight || document.body.clientHeight,
                            ScreenWidth: screen.width || window.innerWidth || document.body.clientWidth,
                            JavaEnabled: window.navigator.javaEnabled(),
                            TimeZoneOffset: e.getTimezoneOffset(),
                            Region: window.navigator.language,
                            ColorDepth: screen.colorDepth,
                            UserAgent: window.navigator.userAgent,
                            acceptHeader: "text/html",
                            javaScriptEnabled: !0
                        }
                    }
                }, {
                    key: "hideHtmlElement",
                    value: function(e) {
                        e.style.opacity = "0",
                        e.style.display = "none"
                    }
                }, {
                    key: "makeId",
                    value: function(e) {
                        for (var t = "", r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = r.length, o = 0; o < e; o++)
                            t += r.charAt(Math.floor(Math.random() * n));
                        return t
                    }
                }, {
                    key: "isInvalidOptions",
                    value: function(e, t, r) {
                        return !(t && r && e && e.PaymentRequest && e.PaymentRequest.Description && e.PaymentRequest.Currency && e.PaymentRequest.Amount && e.PaymentRequest.OrderId)
                    }
                }, {
                    key: "isCloseEvent",
                    value: function(e) {
                        return e === c.CloseBeforePay || e === c.CloseAfterSuccess || e === c.CloseAfterFail || e === c.CloseCommonError
                    }
                }, {
                    key: "requestSignatureMessage",
                    value: (r = s(l().mark((function e(t, r, n, o, i) {
                        var a;
                        return l().wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return a = ["POST", t, r, n, JSON.stringify(o)],
                                    e.next = 3,
                                    h(i, a.join("\n"));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    ))),
                    function(e, t, n, o, i) {
                        return r.apply(this, arguments)
                    }
                    )
                }]),
                t
            }();
            function w(e) {
                return w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                w(e)
            }
            function E(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = new Array(t); r < t; r++)
                    n[r] = e[r];
                return n
            }
            i(g, "createSignatureMessage", function() {
                var e = s(l().mark((function e(t) {
                    return l().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                h("key", t.join("\n"));
                            case 2:
                                return e.abrupt("return", e.sent);
                            case 3:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }());
            var b = !1;
            if ("undefined" != typeof window) {
                var x = {
                    get passive() {
                        b = !0
                    }
                };
                window.addEventListener("testPassive", null, x),
                window.removeEventListener("testPassive", null, x)
            }
            var O, S, R, T, C = "undefined" != typeof window && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || "MacIntel" === window.navigator.platform && window.navigator.maxTouchPoints > 1), A = [], P = !1, k = -1, _ = function(e) {
                return A.some((function(t) {
                    return !(!t.options.allowTouchMove || !t.options.allowTouchMove(e))
                }
                ))
            }, j = function(e) {
                var t = e || window.event;
                return !(null == t || !t.target || !_(t.target)) || t.touches.length > 1 || (t.preventDefault && t.preventDefault(),
                !1)
            }, L = function(e, t) {
                if (e) {
                    if (!A.some((function(t) {
                        return t.targetElement === e
                    }
                    ))) {
                        var r = {
                            targetElement: e,
                            options: t || {}
                        };
                        A = [].concat(function(e) {
                            if (Array.isArray(e))
                                return E(e)
                        }(n = A) || function(e) {
                            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                                return Array.from(e)
                        }(n) || function(e, t) {
                            if (e) {
                                if ("string" == typeof e)
                                    return E(e, t);
                                var r = Object.prototype.toString.call(e).slice(8, -1);
                                return "Object" === r && e.constructor && (r = e.constructor.name),
                                "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? E(e, t) : void 0
                            }
                        }(n) || function() {
                            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }(), [r]),
                        C ? window.requestAnimationFrame((function() {
                            if (void 0 === S) {
                                S = {
                                    position: document.body.style.position,
                                    top: document.body.style.top,
                                    left: document.body.style.left
                                };
                                var e = window
                                  , t = e.scrollY
                                  , r = e.scrollX
                                  , n = e.innerHeight;
                                document.body.style.position = "fixed",
                                document.body.style.width = "100%",
                                document.body.style.height = "auto",
                                document.body.style.top = "".concat(-t, "px"),
                                document.body.style.left = "".concat(-r, "px"),
                                setTimeout((function() {
                                    return window.requestAnimationFrame((function() {
                                        var e = n - window.innerHeight;
                                        e && t >= n && (document.body.style.top = String(-(t + e)))
                                    }
                                    ))
                                }
                                ), 300)
                            }
                        }
                        )) : function(e) {
                            if (void 0 === R) {
                                var t = !!e && !0 === e.reserveScrollBarGap
                                  , r = window.innerWidth - document.documentElement.clientWidth;
                                if (t && r > 0) {
                                    var n = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
                                    R = document.body.style.paddingRight,
                                    document.body.style.paddingRight = "".concat(n + r, "px")
                                }
                            }
                            void 0 === O && (O = document.body.style.overflow,
                            document.body.style.overflow = "hidden")
                        }(t),
                        C && (e.ontouchstart = function(e) {
                            1 === e.targetTouches.length && (k = e.targetTouches[0].clientY)
                        }
                        ,
                        e.ontouchmove = function(t) {
                            1 === t.targetTouches.length && function(e, t) {
                                var r = e.targetTouches[0].clientY - k;
                                (null == e || !e.target || !_(e.target)) && (t && 0 === t.scrollTop && r > 0 || function(e) {
                                    return !!e && e.scrollHeight - e.scrollTop <= e.clientHeight
                                }(t) && r < 0 ? j(e) : e.stopPropagation())
                            }(t, e)
                        }
                        ,
                        P || (document.addEventListener("touchmove", j, b ? {
                            passive: !1
                        } : void 0),
                        P = !0))
                    }
                } else
                    console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
                var n
            }, D = function() {
                function t(r) {
                    var n = this;
                    e(this, t),
                    i(this, "savedScrollPosition", null),
                    i(this, "widgetMetaName", "payselection-widget-viewport"),
                    i(this, "hideWindow", (function() {
                        var e;
                        (e = n.container) ? (A = A.filter((function(t) {
                            return t.targetElement !== e
                        }
                        )),
                        C && (e.ontouchstart = null,
                        e.ontouchmove = null,
                        P && 0 === A.length && (document.removeEventListener("touchmove", j, b ? {
                            passive: !1
                        } : void 0),
                        P = !1)),
                        C ? function() {
                            if (void 0 !== S) {
                                var e = -parseInt(document.body.style.top, 10)
                                  , t = -parseInt(document.body.style.left, 10);
                                document.body.style.position = S.position,
                                document.body.style.top = S.top,
                                document.body.style.left = S.left,
                                window.scrollTo(t, e),
                                S = void 0
                            }
                        }() : (void 0 !== R && (document.body.style.paddingRight = R,
                        R = void 0),
                        void 0 !== O && (document.body.style.overflow = O,
                        O = void 0))) : console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices."),
                        n.savedScrollPosition && (window.scrollTo(0, n.savedScrollPosition),
                        n.savedScrollPosition = null),
                        n.removeKeyDownListener(),
                        n.container.remove(),
                        n.removeViewPortMeta()
                    }
                    )),
                    i(this, "addViewPortMeta", (function() {
                        var e = document.getElementsByTagName("head")[0]
                          , t = document.createElement("meta");
                        t.id = n.widgetMetaName,
                        t.name = "viewport",
                        t.content = "width=device-width, height=device-height, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
                        e.appendChild(t)
                    }
                    )),
                    i(this, "removeViewPortMeta", (function() {
                        var e = document.getElementById(n.widgetMetaName);
                        e && document.getElementsByTagName("head")[0].removeChild(e)
                    }
                    )),
                    i(this, "setKeyDownListener", (function() {
                        document.addEventListener("keydown", n.keyDownPrevent)
                    }
                    )),
                    i(this, "removeKeyDownListener", (function() {
                        document.removeEventListener("keydown", n.keyDownPrevent)
                    }
                    )),
                    i(this, "keyDownPrevent", (function(e) {
                        e.preventDefault(),
                        n.iframe.focus()
                    }
                    )),
                    this.iframe = document.createElement("iframe"),
                    this.iframe.tabIndex = 0,
                    this.iframe.setAttribute("allowpaymentrequest", ""),
                    this.iframe.setAttribute("allowtransparency", ""),
                    this.iframe.style.cssText = "height: 100% !important;width: 100% !important;position: fixed !important;z-index: 9999 !important;border: 0 !important; top: 0 !important;bottom: 0 !important;left: 0 !important;right: 0px !important;max-height: 100% !important; background: transparent; visibility: hidden;",
                    this.iframe.onload = function() {
                        n.setKeyDownListener()
                    }
                    ,
                    this.container = t.createContainer(),
                    this.addViewPortMeta(),
                    this.container.appendChild(this.iframe),
                    L(this.container);
                    var o = t.ensureContainer(r);
                    o && o.appendChild(this.container),
                    console.log("iframe!")
                }
                return o(t, [{
                    key: "changeToUrl",
                    value: function(e) {
                        this.iframe.src = e
                    }
                }, {
                    key: "setVisible",
                    value: function() {
                        this.iframe.style.visibility = "visible"
                    }
                }], [{
                    key: "createContainer",
                    value: function() {
                        var e = document.createElement("div");
                        return e.id = "cp-scrollable-" + Math.floor(1e8 * Math.random()).toString(),
                        e.style.cssText = "z-index:9997;text-align:left;height:100%;width:100%;position:fixed;left:0;top:0;transition:opacity 0.15s;overflow:auto;-webkit-overflow-scrolling:touch;pointer-events:all;",
                        e
                    }
                }, {
                    key: "ensureContainer",
                    value: function(e) {
                        if (null == e)
                            return document.body;
                        if ("string" == typeof e) {
                            var t = document.getElementById(e);
                            return null == t ? document.body : t
                        }
                        return "object" === w(e) && 1 === e.nodeType ? e : void 0
                    }
                }]),
                t
            }(), N = function() {
                function t() {
                    var r = this;
                    e(this, t),
                    i(this, "callbacks", {}),
                    i(this, "messageCallback", (function() {
                        return null
                    }
                    )),
                    i(this, "receiveMessage", (function(e) {
                        e.data.code === c.WidgetLoaded ? (r.messageCallback(e.data),
                        function(e) {
                            console.log("destroyLoadingOverlay!");
                            var t = e.getElementById("paywidget-loader-overlay");
                            t && t.parentNode && t.parentNode.removeChild(t)
                        }(document)) : e.data.code === c.TransactionFail ? r.callbacks.onError && r.callbacks.onError(e.data) : e.data.code === c.CloseAfterSuccess ? (r.callbacks.onSuccess && r.callbacks.onSuccess(e.data),
                        r.messageCallback(e.data),
                        r.removeListener()) : g.isCloseEvent(e.data.code) ? (r.callbacks.onClose && r.callbacks.onClose(e.data),
                        r.messageCallback(e.data),
                        r.removeListener()) : e.data.code === c.CloseBeforeRedirect && (r.messageCallback(e.data),
                        r.removeListener(),
                        e.data.returnUrl && window.location.replace(e.data.returnUrl)),
                        console.log(e)
                    }
                    )),
                    console.log("message service!")
                }
                return o(t, [{
                    key: "setCallbacks",
                    value: function(e, t) {
                        t && (this.callbacks = t),
                        this.messageCallback = e
                    }
                }, {
                    key: "addListener",
                    value: function() {
                        this.removeListener(),
                        addEventListener("message", this.receiveMessage, !1)
                    }
                }, {
                    key: "removeListener",
                    value: function() {
                        removeEventListener("message", this.receiveMessage, !1)
                    }
                }]),
                t
            }(), I = r(669), B = r.n(I);
            function U(e) {
                var t = e.split("//");
                if (t.length < 2)
                    return e;
                var r = t[0]
                  , n = t[1].split(".")
                  , o = n.length - 2;
                o > 0 && n.splice(0, o);
                var i = n.join(".");
                return "".concat(r, "//").concat(i)
            }
            function M(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                    ))),
                    r.push.apply(r, n)
                }
                return r
            }
            function F(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? M(Object(r), !0).forEach((function(t) {
                        i(e, t, r[t])
                    }
                    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : M(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                    ))
                }
                return e
            }
            !function(e) {
                e.Widget = "Widget"
            }(T || (T = {}));
            var W, q = function() {
                var e = s(l().mark((function e(t, r, n) {
                    var o, i, a, s, c, u;
                    return l().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return o = "https://webform.payselection.com/webpayments/create",
                                i = g.makeId(6),
                                a = window.location.origin,
                                n && n.only2Level && (a = U(window.location.origin)),
                                t.MetaData && (t.MetaData.Initiator = T.Widget),
                                s = {
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded",
                                        "X-SITE-ID": r.serviceId,
                                        "X-REQUEST-ID": i,
                                        "X-REQUEST-SIGNATURE": ""
                                    }
                                },
                                e.next = 9,
                                g.requestSignatureMessage(a, r.serviceId, i, t, r.key || "key");
                            case 9:
                                return c = e.sent,
                                s.headers["X-REQUEST-SIGNATURE"] = c,
                                null != r && r.logger && (u = ["POST", a, r.serviceId, i, JSON.stringify(t)].join("\n"),
                                G("create", [{
                                    signature: c,
                                    message: u,
                                    key: r.key || "key",
                                    requestId: i,
                                    origin: a,
                                    serviceData: r,
                                    payment: t
                                }])),
                                e.abrupt("return", B().post(o, t, s));
                            case 13:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function(t, r, n) {
                    return e.apply(this, arguments)
                }
            }(), G = function() {
                var e = s(l().mark((function e(t) {
                    var r, n, o, i, a = arguments;
                    return l().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return r = a.length > 1 && void 0 !== a[1] ? a[1] : [],
                                n = "/payments/ui_logger",
                                o = {
                                    message: "WIDGET LIBRARY: " + t,
                                    params: F(F({
                                        sessionId: J
                                    }, r), {}, {
                                        device: g.getDeviceData(),
                                        extraData: g.getExtraData()
                                    })
                                },
                                i = ["POST", n, J, JSON.stringify(o)],
                                e.t0 = B(),
                                e.t1 = "".concat("https://webform.payselection.com").concat(n),
                                e.t2 = o,
                                e.t3 = J,
                                e.next = 10,
                                g.createSignatureMessage(i);
                            case 10:
                                return e.t4 = e.sent,
                                e.t5 = {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    "X-CUSTOMER-SESSION-ID": e.t3,
                                    "X-REQUEST-SIGNATURE": e.t4
                                },
                                e.t6 = {
                                    headers: e.t5
                                },
                                e.abrupt("return", e.t0.post.call(e.t0, e.t1, e.t2, e.t6));
                            case 14:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }();
            !function(e) {
                e.signatureError = "Check params required to create signature; signature can be created only under HTTPS protocol"
            }(W || (W = {}));
            var H = function() {
                function t() {
                    var r = this
                      , n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    e(this, t),
                    i(this, "handleMessage", (function(e) {
                        var t;
                        console.log("handledMessage: ", e),
                        e.code === c.WidgetLoaded ? null === (t = r.containerManager) || void 0 === t || t.setVisible() : r.containerManager && g.isCloseEvent(e.code) && r.containerManager.hideWindow()
                    }
                    )),
                    this.messageService = new N,
                    console.log("PayWidget constr"),
                    this.options = n
                }
                return o(t, [{
                    key: "pay",
                    value: function(e, t, r, n) {
                        var o, i = this;
                        if (function(e) {
                            var t = e.createElement("div");
                            t.id = "paywidget-loader-overlay",
                            t.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; text-align: center; background-color: transparent; z-index: 9999; display: flex; justify-content: center; align-items: center;";
                            var r = new DOMParser
                              , n = r.parseFromString('<svg width="100" height="100" viewBox="-20 -20 42 42" xmlns="http://www.w3.org/2000/svg" stroke="#3233FF" shape-rendering="geometricPrecision" data-testid="oval-svg">\n      <g fill="none" fill-rule="evenodd">\n        <g transform="translate(1 1)" stroke-width="2" data-testid="oval-secondary-group">\n          <circle stroke-opacity="0.5" cx="0" cy="0" r="20" stroke="#FFFFFF" stroke-width="2" />\n          <path d="M20 0c0-9.94-8.06-20-20-20">\n            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="1s" repeatCount="indefinite" />\n          </path>\n        </g>\n      </g>\n    </svg>', "image/svg+xml").firstChild
                              , o = r.parseFromString('<svg xmlns="http://www.w3.org/2000/svg" class="paywidget-loader-logo" xml:space="preserve" width="76px" height="76px" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 76 76" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <g>\n        <path fill="#FEFEFE" fill-rule="nonzero" d="M76 38c0,-20.99 -17.01,-38 -38,-38 -20.99,0 -38,17.01 -38,38 0,20.99 17.01,38 38,38 20.95,0 38,-17.01 38,-38z" opacity="0.5" />\n        <path fill="#3233FF" fill-rule="nonzero" d="M8.91 40.15c0,-2.69 0.41,-4.93 1.22,-6.76 0.61,-1.35 1.42,-2.57 2.44,-3.63 1.06,-1.06 2.2,-1.87 3.42,-2.36 1.63,-0.7 3.54,-1.06 5.66,-1.06 3.86,0 6.99,1.22 9.31,3.62 2.32,2.41 3.5,5.75 3.5,10.07 0,4.23 -1.14,7.57 -3.46,9.98 -2.32,2.4 -5.41,3.58 -9.27,3.58 -3.91,0 -7.04,-1.18 -9.36,-3.58 -2.32,-2.41 -3.46,-5.66 -3.46,-9.86zm5.45 -0.2c0,2.97 0.69,5.25 2.08,6.8 1.38,1.55 3.13,2.28 5.25,2.28 2.11,0 3.86,-0.77 5.2,-2.28 1.39,-1.55 2.04,-3.83 2.04,-6.89 0,-3.01 -0.65,-5.25 -2,-6.76 -1.3,-1.47 -3.05,-2.24 -5.24,-2.24 -2.2,0 -3.95,0.77 -5.29,2.28 -1.35,1.51 -2.04,3.79 -2.04,6.81zm28.32 13.19l0 -26.35 5.17 0 10.78 17.6 0 -17.6 4.92 0 0 26.35 -5.33 0 -10.62 -17.19 0 17.19 -4.92 0z" />\n      </g>\n    </svg>', "image/svg+xml").firstChild;
                            o.style.cssText = "position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding-bottom: 4px;";
                            var i = e.createElement("span");
                            i.appendChild(n),
                            i.appendChild(o),
                            i.style.cssText = "position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);",
                            i.id = "paywidget-loader-container";
                            var a = e.createElement("style");
                            a.appendChild(e.createTextNode("@keyframes identifier {\n            0% {\n                opacity: 0;\n            }\n            100% {\n                opacity: 1;\n            }\n        }\n\n        #paywidget-loader-container {\n            -webkit-animation: identifier 0.5s ease-out;\n            -moz-animation: identifier 0.5s ease-out;\n            -ms-animation: identifier 0.5s ease-out;\n            -o-animation: identifier 0.5s ease-out;\n            animation: identifier 0.5s ease-out;\n        };")),
                            t.appendChild(a),
                            t.appendChild(i),
                            e.body.appendChild(t)
                        }(document),
                        this.messageService.setCallbacks(this.handleMessage, r),
                        this.messageService.addListener(),
                        this.containerManager = this.createFrameConnector(),
                        g.isInvalidOptions(t, e.serviceId, e.key))
                            return console.log("Validate request options error"),
                            r && r.onError && r.onError({
                                code: c.CreateInvalidParams
                            }),
                            void (null === (o = this.containerManager) || void 0 === o || o.changeToUrl(y));
                        q(t, e, n).then((function(e) {
                            var t;
                            console.log("create response ==== : ", e),
                            null === (t = i.containerManager) || void 0 === t || t.changeToUrl(e.data)
                        }
                        )).catch((function(e) {
                            var t;
                            if (null === (t = i.containerManager) || void 0 === t || t.changeToUrl("https://widget.payselection.com/error"),
                            r && r.onError) {
                                switch (e.code) {
                                case "ERR_BAD_REQUEST":
                                    var n, o;
                                    r.onError({
                                        code: c.CreateBadRequestError,
                                        errorMessage: null == e || null === (n = e.response) || void 0 === n || null === (o = n.data) || void 0 === o ? void 0 : o.Code
                                    });
                                    break;
                                case "ERR_NETWORK":
                                    var a, s;
                                    r.onError({
                                        code: c.CreateNetworkError,
                                        errorMessage: null == e || null === (a = e.response) || void 0 === a || null === (s = a.data) || void 0 === s ? void 0 : s.Code
                                    })
                                }
                                e.message === c.CreateSignatureError && r.onError({
                                    code: c.CreateSignatureError,
                                    errorMessage: W.signatureError
                                }),
                                console.log("ERROR: ====", e)
                            }
                        }
                        ))
                    }
                }, {
                    key: "createFrameConnector",
                    value: function() {
                        return new D(this.options.container)
                    }
                }]),
                t
            }()
              , z = H
              , Y = H
              , V = {}
              , J = "f".concat((~~(1e8 * Math.random())).toString(16))
        }
        )(),
        n
    }
    )()
}
));
