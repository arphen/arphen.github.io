var myLog = {
    label: 'YOUR_LABEL',
    init: function(label) {
        myLog.label = label;
    },
    log: function(text) {
        try {
            var d = new Date();
            var n = d.toLocaleString();
            console.log(n + ' [' + myLog.label + '] ' + text);
        } catch (err) {}
    }
};
