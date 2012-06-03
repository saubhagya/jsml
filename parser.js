(function() {
   "use strict";

    var parseToHtml = function(obj, tag) {
	var el = document.createElement(tag);

        for (var key in obj) {
            var val = obj[key];

	    if (key === '_content')
                el.innerHTML = val;
	    else if (typeof val === 'object')
                el.appendChild(parseToHtml(val, key));
            else
		el.setAttribute(key, val);
	}
	return el;
    };

    var processData = function(data) {
        document.body = parseToHtml(JSON.parse(data), 'body');
    };

    var fetchData = function() {
        var xhr = new XMLHttpRequest(),
	    path = '.' + location.pathname;

	if (path === './')
	    path = './index';

        xhr.open('GET', path + '.json', true);
	xhr.send();
	xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                processData(this.responseText);
	    }
	};
    };

    fetchData();
})();

