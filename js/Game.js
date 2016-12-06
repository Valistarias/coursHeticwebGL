// Page entièrement chargé, on lance le jeu
document.addEventListener("DOMContentLoaded",() => {
    window.game = new Game('renderCanvas');
}, false);

class Game {
    constructor(canvasId){
        // Canvas et engine défini ici
        var canvas = document.getElementById(canvasId)
        var engine = new BABYLON.Engine(canvas, true)
        
        // On initie la scène avec une fonction associé à l'objet Game
        this.scene = this._initScene(engine)

        this.arena = new Arena(this.scene)

        this.user = new User(this.scene,canvas)

        
        var _Game = this;
        
        // Permet au jeu de tourner
        engine.runRenderLoop(() => {
            this.scene.render()
        });

        // Ajuste la vue 3D si la fenetre est agrandi ou diminué
        window.addEventListener("resize", () => {
            if (engine) {
                engine.resize()
            }
        },false);
    }
    _initScene(engine) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0,0,0)
        return scene;
    }
};


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