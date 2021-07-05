//====================================================================================================================//
// Node Component //
//====================================================================================================================//
Vue.component("node", {
	props: ["node"],
	template:
	'<div class="node text-node" ref="node" v-bind:style="{left: node.left, top: node.top, width: node.width}"> \
		<div class="title">{{node.name}}</div> \
		<div class="content" v-html="node.html"></div> \
	</div>'
})

//====================================================================================================================//
// Start Vue //
//====================================================================================================================//
var vue = new Vue({
	el: "#frame",
	data: {
		nodes: [],
		links: []
	},
	created: ReadData,
	methods: {
		save: function() {
	        const data = JSON.stringify(this.nodes)
	        window.localStorage.setItem("nodes", data);
		},
		load: function() {
			const data = JSON.parse(window.localStorage.getItem("nodes"))
			vue.nodes = data;
			console.log(data)
		},
		drawLink: function(link) {
			console.log(link.start + " - " + link.end);
			console.log(this.nodes[link.start].left);
			var x1 = parseInt(this.nodes[link.start].left, 10) + 4000;
			var y1 = parseInt(this.nodes[link.start].top, 10) + 4000;
			var x2 =  parseInt(this.nodes[link.end].left, 10) + 4000;
			var y2 = parseInt(this.nodes[link.end].top, 10) + 4000;
			var path1 = "M " + x1 + " " + y1 + " C " + (x1 + 200) + " " + y1 + ", " + (x2 - 200) + " " + y2 + ", " + x2 + " " + y2;

			return path1;//"M 4000 4200 C 4000 4200, 8000 8000, 8000 8000"
		}
	}
});

//====================================================================================================================//
// Read Data //
//====================================================================================================================//
function ReadData(){
	fetch("/data/data.json")
	.then(function(e) {
		return e.json();
	})
	.then(function(e) {
		for(i in e.nodes) {
			vue.nodes.push(e.nodes[i])
		}

		for (i in e.links) {
			vue.links.push(e.links[i])
		}
	});
}
