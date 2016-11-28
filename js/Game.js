// Page entièrement chargé, on lance le jeu
document.addEventListener("DOMContentLoaded", function () {
    window.game = new Game('renderCanvas');
}, false);

class Game {
    constructor(canvasId){
        // Canvas et engine défini ici
        var canvas = document.getElementById(canvasId);
        var engine = new BABYLON.Engine(canvas, true);
        var _this = this;
        
        // On initie la scène avec une fonction associé à l'objet Game
        this.scene = this._initScene(engine);

        this.arena = new Arena(this.scene);

        this.user = new User(this.scene,canvas);

        
        var _Game = this;
        
        // Permet au jeu de tourner
        engine.runRenderLoop(function () {
            _this.scene.render();
            // _this.sphere.rotation.addInPlace(new BABYLON.Vector3(0.01,0.01,0.01));
        });

        // Ajuste la vue 3D si la fenetre est agrandi ou diminué
        window.addEventListener("resize", function () {
            if (engine) {
                engine.resize();
                // _this.sphere.rotation.addInPlace(new BABYLON.Vector3(-0.08,-0.08,-0.08));
            }
        },false);
    }
    _initScene(engine) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor=new BABYLON.Color3(1,1,1);
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