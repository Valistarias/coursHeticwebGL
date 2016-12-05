class User {
    constructor(scene,canvas) {
    	this.scene = scene

        // On crée la caméra
        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, 10), scene)

        this.camera.setTarget(BABYLON.Vector3.Zero())

        this.camera.attachControl(canvas)

    	this._initPointerLock()

    	this.camera.ellipsoid = new BABYLON.Vector3(1, 2, 1)

    	this.camera.checkCollisions = true

        this.camera.applyGravity = true
    } 
    _initPointerLock (){
        
        // Requete pour la capture du pointeur
        var canvas = this.scene.getEngine().getRenderingCanvas()

        canvas.addEventListener("click", function(evt) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock()
            }
        }, false)

        // Evenement pour changer le paramètre de rotation
        var pointerlockchange = (event) => {
            this.controlEnabled = (document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas || document.msPointerLockElement === canvas || document.pointerLockElement === canvas)
            if (!this.controlEnabled) {
                this.rotEngaged = false
            } else {
                this.rotEngaged = true
            }
        }
        
        // Event pour changer l'état du pointeur, sous tout les types de navigateur
        document.addEventListener("pointerlockchange", pointerlockchange, false)
        document.addEventListener("mspointerlockchange", pointerlockchange, false)
        document.addEventListener("mozpointerlockchange", pointerlockchange, false)
        document.addEventListener("webkitpointerlockchange", pointerlockchange, false)
    }
}