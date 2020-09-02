class devicemotion {
	constructor(dataset) {
		this.dataset = dataset
		document.getElementById('record').onchange = function () {
			if (typeof DeviceOrientationEvent.requestPermission === 'function') {
				DeviceOrientationEvent.requestPermission()
					.then(permissionState => {
						if (permissionState === 'granted') {
							// window.addEventListener('deviceorientation', (...args) => this.devicemotionListener(...args))
						}
					})
					.catch(console.error);
			}
		}
		window.addEventListener('deviceorientation', (...args) => this.devicemotionListener(...args))
	}

	devicemotionListener(event) {
		(this.dataset.orientation = this.dataset.orientation || []).push(event);
	}

	features() {
		var f = {}
		if ((this.dataset.orientation = this.dataset.orientation || []).length > 0) {
			var o = this.dataset.orientation
			var alpha = o.map(x => x.alpha)
			var beta = o.map(x => x.beta)
			var gamma = o.map(x => x.gamma)

			var d3 = o.map(x => Math.sqrt((x.alpha - math.mean(alpha)) ** 2 + (x.beta - math.mean(beta)) ** 2 + (x.gamma - math.mean(gamma)) ** 2))

			//f["mean"] = math.mean(d3);
			//f["max"] = math.max(d3);
			//f["sd"] = math.std(d3);

			f["d3_mean"] = math.mean(d3);
			f["alpha_moving_std_4"] = math.std(alpha);
			f["beta_moving_avg_4"] = math.mean(beta);
			console.log('d3_mean '+f["d3_mean"])
			console.log('alpha_std_4 '+f["alpha_moving_std_4"])
			console.log('beta_avg '+f["beta_moving_avg_4"])

		}

		return f;
	}

	flush() {
		this.dataset.orientation = [];
	}

}