var _debug = false;

var all = function(tasks) {
	
	if (!Array.isArray(tasks))
		throw 'pchain: The specified tasks parameter is not an array.';

	var i = 0;
	return new Promise((resolve, reject) => {
		
		function doTask(data) {
			
			if (i >= tasks.length) {
				_debug && console.log('pchain: RESOLVE - ', data);
				resolve(data);
				return;
			}
			
			var t = tasks[i++];
			var msg;
			if (_debug) {
				msg = 'index=' + (i - 1) + ', func=' + (t.name || '<anonymous>') + ((typeof data === 'undefined') ? '' : (', data=' + data));
				console.log('pchain:', msg);
			}
			
			var p = typeof t === 'function' ? t(data) : t;

			if (typeof p === 'undefined') {
				setTimeout(() => { doTask() }, 0);
				return;
			}
			
			if (typeof p.then !== 'function') {
				setTimeout(() => { doTask(p) }, 0);
				return;
			}
			
			p.then((data) => {
				setTimeout(() => { doTask(data) }, 0);				
			}, (err) => {
				_debug && console.log('pchain: REJECT - ', err, msg);
				reject(err);
			});
		}
		
		doTask();
	});
};

var pchain = all;

pchain.sleep = (millis) => {
	var ret = new Promise((resolve) => {
		setTimeout(resolve, millis);
	});
	ret.name = 'pchain.sleep';
	return ret;
};

pchain.debug = (flag) => {
	_debug = flag === undefined || !!flag;
	return pchain;
};

module.exports = pchain;
