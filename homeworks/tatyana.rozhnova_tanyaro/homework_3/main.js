(function () {
    context = {
        setTimeout: function (delay, callback) {
            window.setTimeout(callback, delay)
        }
    };

    setInterval = function (callback, delay) {
        context.setTimeout(delay, callback);
    };

    setInterval(function () {
        console.log('aaaa')
    }, 3000);

    function fncToDelay(param) {

        console.log('Delayed run : ' + param);

    }

    function freeze(delay, fnc) {
        var timeout;
        return function () {
            var args = arguments;
            if (timeout) {
                return false;
            } else {
                timeout = setTimeout(function () {
                    fnc.apply(this, args);
                }, delay);
            }
        }
    }

    var frozenFunc = freeze(1000, fncToDelay);

    frozenFunc('1');
    frozenFunc('2');
    frozenFunc('3');
    frozenFunc('4');
    frozenFunc('5');
    frozenFunc('6');
    frozenFunc('7');
    frozenFunc('8');
    frozenFunc('9');

    function originalFnc(string) {
        console.log(string.replace(/\b\w/g, function (char) {
            return char.toUpperCase()
        }))
    }

    function filterDigits(string) {
        return string.replace(/[0-9]/g,'')
    }

    function filterWhiteSpaces(string) {
        return string.replace(/ +/g,' ')
    }

    function filterSpecial (string) {
        return string.replace(/[!@#$%^&*()+=]/g,'')
    }

    function createPipe(originalFnc, pipeline) {
        return function () {
            var str = arguments[0];
            pipeline.forEach(function (callback) {
                str = callback.apply(this, [str]);
            });
            originalFnc.apply(this, [str]);
        }
    }

    var pipe = createPipe(originalFnc, [filterDigits,filterSpecial,filterWhiteSpaces]);

    pipe('on345l90y    te**x((((t     h$&er@@@e');

})();