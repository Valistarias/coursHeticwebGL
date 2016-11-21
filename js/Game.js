document.addEventListener("DOMContentLoaded", function () {
	let canvas = document.getElementById('renderCanvas')
	let game = new Game(canvas)
	game.createScene()
});

class Game {
	constructor(canvas){
		//On créer le moteur 3D
		this.canvas = canvas
		this.engine = new BABYLON.Engine(canvas, true)
	}
	createScene(){
		// On crée notre scène
		this.scene = new BABYLON.Scene(this.engine)

		this.scene.clearColor = new BABYLON.Color3(0,0,0)

		this.user = new User(this)

		this.arena = new Arena(this)

		// Cette boucle se lance a chaque fois que c'est possible
		this.engine.runRenderLoop(() => {
		    this.scene.render()
		});

		// Ajuste la vue 3D si la fenetre est agrandi ou diminué
	    window.addEventListener("resize", () => {
	        if (this.engine) {
	            this.engine.resize()
	        }
	    },false);
	}
}

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