class jActivity {
	constructor(base, sensorClasses, callback, label, interval) {
		this.callback = callback
		this.label = label
		this.interval = interval
		this.base = base
		var dataset = {}
		this.dataset = dataset;

		var sensors = []
		this.sensors = sensors;


		sensorClasses.forEach(function (sensorClass) {
			var sensor = new sensorClass(dataset);
			sensors.push(sensor)
		})


		// get stylesheet for transformation 
		// TODO: could store this globally to not trigger recompilation 
		var pmml2js = new Promise((resolve, reject) => {
			var onSuccess = function (xsl_file) {
				resolve(function (model) {
					let generated_code = transform(model, xsl_file)
					console.log(generated_code.textContent)
					let x = eval(generated_code.textContent);
					return x
				})
			}
			$.ajax({
				type: "GET",
				url: ("https://julian3012.github.io/Webapplication/js/pmml2js_dt_4_3_with_compound_sp.xml"), //pmml2js_dt_4_3_with_compound_sp
				success: onSuccess
			})
		})

		// get PMML 
		var pmml = new Promise((resolve, reject) => {

			var onSuccess = function (data) {
				pmml = $.parseXML(data)
				resolve(pmml)
			}
			var onError = function (jqXHR, textStatus, errorThrown) {
				alert(textStatus)
				resolve(null)
			}

			$.ajax({
				type: "GET",
				url: ("https://julian3012.github.io/Webapplication/models/ClassificationTree_woSurrogate_new3.pmml"), //ClassificationTree_woSurrogate_new    ClassificationTree
				success: onSuccess,
				error: onError,
			})
			/*
						$.ajax({
							type: "POST",
							url: (this.base + "R/getPMML/json"),
							data: 'json_data={"sensor": ' + JSON.stringify(this.sensors) + ',"label": ' + JSON.stringify(this.label) + ',"classifier": "rpart"}',
							success: onSuccess,
							dataType: "json"
						})
						*/
		})

		// once we have both we generate the classifier and register the callback
		Promise.all([pmml2js, pmml]).then(p => {
			this.classifier = p[0](p[1]) //generate and store classifiier 
			// then call by interval assuming someone fills the dataset
			window.setInterval(
				function (scope) {
					// calculate features
					// TODO: currently only average!!!
					let features = {}

					for (var sensor in scope.sensors) {
						var sf = sensors[sensor].features()
						for (var feature in sf) {
							features[feature] = sf[feature]
						}
					}

					scope.callback(scope.classifier.evaluate(features))
					console.log(scope.classifier.evaluate(features));
					sensors[sensor].flush()
				}, interval, this)
		})
	}
}