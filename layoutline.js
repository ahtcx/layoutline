window.Layoutline = function(layouts, delay) {
	if(layouts && delay) {
		if(window === this) return new window.Layoutline(layouts, delay);
		this.delay = delay;
		this.layouts = layouts;
		this.before = 0;
		this.chain = 0;
		this.chains = [];
		this.precision = [];
		return this;
	}
}

window.Layoutline.prototype = {
	getPredictedLayout: function() {
		var averagePrecision = this.getPrecision();
		return this.layouts[averagePrecision.indexOf(Math.max.apply(Math, averagePrecision))];
	},
	getPosition: function(character, layout, offsets) {
		for(row in layout) {
			for(cha in layout[row]) {
				if(layout[row][cha] === character) {
					return [parseFloat(cha) + offsets[row], parseFloat(row)];
				}
			}
		}
		return null;
	},
	getPrecision: function() {
		var averagePrecision = [];
		for(p in this.precision) {
			for(layout in this.layouts) {
				if(averagePrecision.length <= layout) averagePrecision.push(undefined);
				if(this.precision[p][layout] === null) averagePrecision[layout] = null;
				if(averagePrecision[layout] !== null) {
					if(averagePrecision[layout] === undefined) averagePrecision[layout] = this.precision[p][layout];
					averagePrecision[layout] = (averagePrecision[layout] + this.precision[p][layout]) / 2;
				}
			}
		}
		return averagePrecision;
	},
	keyPressed: function(character) {
		var now = Date.now();
		if(now - this.before <= this.delay) {
			this.chains[this.chain - 1].push(character);
		} else {
			this.chains.push([character]);
			this.chain += 1;
		}
		this.updatePrecision(this.chains[this.chain - 1], this.chains.length - 1);
		this.before = now;
	},
	updatePrecision: function(currentChain, index) {
		if(this.precision.length <= index) this.precision.push([]);
		for(layout in this.layouts) {
			if(this.precision[index].length <= layout) this.precision[index].push(undefined);
			if(currentChain.length > 1) {
				var lay = this.layouts[layout]['layout'],
					off = this.layouts[layout]['offsets'],
					lastPosition = this.getPosition(currentChain[currentChain.length - 2], lay, off),
					position = this.getPosition(currentChain[currentChain.length - 1], lay, off);
				if(lastPosition && position) {
					var distance = Math.sqrt(Math.pow(position[0] - lastPosition[0], 2) + Math.pow(position[1] - lastPosition[1], 2));
					if(this.precision[index][layout] === undefined) this.precision[index][layout] = 1 / distance;
					this.precision[index][layout] = (this.precision[index][layout] + 1 / distance) / 2;
				} else this.precision[index][layout] = null;
			}
		}
	}
}

