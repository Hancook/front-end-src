requirejs.config({
	baseUrl: '/static/js',
	urlArgs: "bust=" + 222,
	shim: {
		json: {
            exports: 'JSON'
        },
    },
	paths: {
		'jquery':'vendors/jquery-3.2.0.min',
        'echarts':'vendors/echarts.min',
        'json':'vendors/json3.min',
	}
});
