var all = function(tasks, initData) {
	
	if (!Array.isArray(tasks))
		throw 'pchain: The specified tasks parameter is not an array.';

	var i = 0;
	return new Promise((resolve, reject) => {
		
		function doTask(data) {
			if (i >= tasks.length) {
				resolve(data);
				return;
			}
			
			var t = tasks[i++];
			var p = typeof t === 'function' ? t(data) : t;
			p.then((data) => {
				doTask(data);
			}, (err) => {
				reject(err);
			});
		}
		
		doTask(initData);
	});
};

var pchain = all;

module.exports = pchain;
