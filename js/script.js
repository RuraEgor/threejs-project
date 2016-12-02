window.onload = function() {

	var width = window.innerWidth;
	var height = window.innerHeight;
	var canvas = document.getElementById("canvas");

	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	var ball = {
		protationX: 0,
		protationY: 0,
		protationZ: 0,
		rotationX: 0,
		rotationY: 0,
		rotationZ: 0.011,
	}

	var gui = new dat.GUI();
	gui.add(ball, "rotationX").min(-0.2).max(0.2).step(0.001);
	gui.add(ball, "rotationY").min(-0.2).max(0.2).step(0.001);
	gui.add(ball, "rotationZ").min(-0.2).max(0.2).step(0.001);

	gui.add(ball, "protationX").min(-5).max(5).step(1);
	gui.add(ball, "protationY").min(-5).max(5).step(1);
	gui.add(ball, "protationZ").min(-5).max(5).step(1);

	var renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0x000000);

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);

	camera.position.set(0, 0, 1000);

	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);

	// var geometry = new THREE.PlaneGeometry(300, 300, 12, 12);
	var geometry = new THREE.SphereGeometry(300, 14, 14);
	//var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
	//	wireframe: true
	var material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});

	for (var i = 0; i < geometry.faces.length; i++){
		geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random() );
	}

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	
	function loop() {
		mesh.position.x += ball.protationX;
		mesh.position.y += ball.protationY;
		mesh.position.z += ball.protationZ;

		mesh.rotation.x += ball.rotationX;
		mesh.rotation.y += ball.rotationY;
		mesh.rotation.z += ball.rotationZ;

		// mesh.rotation.y += Math.PI / 500;
		//mesh.rotation.z += Math.PI / 200;
		renderer.render(scene, camera);
		requestAnimationFrame(function() { loop(); });
	}

	loop();
}
