
var test = require('../tape-dispenser').test
var P = require('bluebird');
P.longStackTraces();

function delay(t) {
    var resolver = P.pending();
    setTimeout(function() {
        resolver.fulfill();
    });
    return resolver.promise;
}

test("non-promise test", function(t) {
    t.ok(true);
    t.end();
});

test("simple delay", function(t) {
    return delay(1);
});

test("plan", function(t) {
    t.plan(2);
    t.ok(true);
    t.ok(true);
    return delay(1);
})

test("inner", function(t) {
    t.test("delay1", function(t) {
        return delay(1);
    });
    t.test("delay2", function() {
        return delay(1);
    });
});
