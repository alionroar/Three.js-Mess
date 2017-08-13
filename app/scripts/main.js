var canvas = document.getElementById('canvas');
var renderer = new THREE.WebGLRenderer({canvas: canvas});
canvas.width  = canvas.clientWidth;
canvas.height = canvas.clientHeight;
renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
var camera = new THREE.PerspectiveCamera( 50, canvas.clientWidth/canvas.clientHeight, 0.1, 1000 );

// var renderer = new THREE.WebGLRenderer();
//renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1, 15, 15);
var material = 	[
  new THREE.MeshBasicMaterial({color:0xe1eaf4, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({color:0xf0e5eb, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({color:0xfde0d7, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({color:0xd4ebdb, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({color:0xfbf9da, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({color:0xeff2f5, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
  ];
var cubeMaterial = new THREE.MeshFaceMaterial(material);
var cubes = [];

// var ambientLight = new THREE.AmbientLight(0x404040);
// scene.add(ambientLight);
// var pointLight = new THREE.PointLight(0x404040);
// scene.add(pointLight);
// pointLight.position.set(0,200,0);

camera.position.z = 0;
camera.position.x = -1;


var animate = function () {
  requestAnimationFrame( animate );

  for(var i = 0; i< cubes.length; i++){
    var cube = cubes[i];
    cube.position.set((i-cubes.length/2)*2, -1, -4);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
};

animate();



onResize(canvas, function(){
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  renderer.setViewport(0,0,canvas.clientWidth, canvas.clientHeight);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  for(var i=0; i<cubes.length; i++){
    scene.remove(cubes[i]);
  }
  cubes=[];
  console.log(canvas.clientWidth);
  for (var i = 0; i<canvas.clientWidth/100; i++){
    var cube = new THREE.Mesh( geometry, cubeMaterial );
    //BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
    geometry.parameters; // outputs an object {width: 1, height: 1, depth: 1, widthSegments: undefined, heightSegments: undefined}
    cube.geometry.parameters; // as above
    cube.geometry.parameters.width; // === 1
    cube.geometry.parameters.widthSegments; // === undefined.
    scene.add(cube);
    cubes.push(cube);

  }


});

// var render = function(){
//   requestAnimationFrame(render);
//
//
// }

      /**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

  canvas: !! window.CanvasRenderingContext2D,
  webgl: ( function () {

    try {

      var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

    } catch ( e ) {

      return false;

    }

  } )(),

  workers: !! window.Worker,
  fileapi: window.File && window.FileReader && window.FileList && window.Blob,

  getWebGLErrorMessage: function () {

    var element = document.createElement( 'div' );
    element.id = 'webgl-error-message';
    element.style.fontFamily = 'monospace';
    element.style.fontSize = '13px';
    element.style.fontWeight = 'normal';
    element.style.textAlign = 'center';
    element.style.background = '#fff';
    element.style.color = '#000';
    element.style.padding = '1.5em';
    element.style.width = '400px';
    element.style.margin = '5em auto 0';

    if ( ! this.webgl ) {

      element.innerHTML = window.WebGLRenderingContext ? [
        'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
        'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
      ].join( '\n' ) : [
        'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
        'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
      ].join( '\n' );

    }

    return element;

  },

  addGetWebGLMessage: function ( parameters ) {

    var parent, id, element;

    parameters = parameters || {};

    parent = parameters.parent !== undefined ? parameters.parent : document.body;
    id = parameters.id !== undefined ? parameters.id : 'oldie';

    element = Detector.getWebGLErrorMessage();
    element.id = id;

    parent.appendChild( element );

  }

};

// browserify support
if ( typeof module === 'object' ) {

  module.exports = Detector;

}
  if (Detector.webgl) {
// Initiate function or other initializations here
animate();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
