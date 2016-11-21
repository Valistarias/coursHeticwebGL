// On définis ou se trouve le canvas
var canvas = document.getElementById('renderCanvas');

//On créer le moteur 3D
var engine = new BABYLON.Engine(canvas, true);

// On crée notre scène
var scene = new BABYLON.Scene(engine);

scene.clearColor = new BABYLON.Color3(0,0,0);

// On ajoute une caméra a la scène
var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-5, 3, 0), scene);

// On définis son origine à 0
camera.setTarget(BABYLON.Vector3.Zero());

// On attache les contrôles de la caméra au canvas
camera.attachControl(canvas, true);

// On ajoute une lumière
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.2;

var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -1, 0), scene);
light2.intensity = 0.2;

var mLight = new BABYLON.PointLight("light3", new BABYLON.Vector3(0,3,0), scene)
mLight.range = 10;

// On crée un plan
var ground = BABYLON.Mesh.CreateGround("ground1", 15, 10, 2, scene);

var mur1 = BABYLON.Mesh.CreateBox("mur1", 1, scene);
mur1.scaling = new BABYLON.Vector3(15,5,1);
mur1.position = new BABYLON.Vector3(0,2.5,5);

var mur2 = mur1.clone("mur2");
mur2.position.z = -5;

var mur3 = BABYLON.Mesh.CreateBox("mur3", 1, scene);
mur3.scaling = new BABYLON.Vector3(10,5,1);
mur3.position = new BABYLON.Vector3(7.5,2.5,0);
mur3.rotation.y = degToRad(90);

var mur4 = mur3.clone("mur4");
mur4.position.x = -7.5;

var floor = BABYLON.Mesh.CreatePlane("floor", 1, scene);
floor.scaling = new BABYLON.Vector3(15,10,1);
floor.rotation.x = degToRad(-90);
floor.position.y = 5;

// Cette boucle se lance a chaque fois que c'est possible
engine.runRenderLoop(function () {
    scene.render();
});

// ------------------------- TRANSFO DE DEGRES/RADIANS 
function degToRad(deg)
{
   return (Math.PI*deg)/180
}
// ----------------------------------------------------

// -------------------------- TRANSFO DE DEGRES/RADIANS 
function radToDeg(rad)
{
   // return (Math.PI*deg)/180
   return (rad*180)/Math.PI
}
// ----------------------------------------------------