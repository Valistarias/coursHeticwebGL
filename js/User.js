class User {
    constructor(scene,canvas) {
    	this.scene = scene

        // On crée la caméra
        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, 10), scene)

        this.camera.setTarget(BABYLON.Vector3.Zero())

        this.camera.attachControl(canvas)

    	this._initPointerLock()

    	this.speed = 80

    	this.camera.ellipsoid = new BABYLON.Vector3(1, 2, 1)

    	this.camera.checkCollisions = true

        this.camera.applyGravity = true
    }

    _checkMove() {
    	let ratioFps = Math.round(1000/this.scene.getEngine().getDeltaTime())
        let relativeSpeed = this.speed / ratioFps

        if(this.camera.axisMovement[0]){
            let forward = new BABYLON.Vector3(
                parseFloat(Math.sin(parseFloat(this.camera.rotation.y))) * relativeSpeed/1.4, 
                0, 
                parseFloat(Math.cos(parseFloat(this.camera.rotation.y))) * relativeSpeed/1.4
            )
            this.camera.position = this.camera.position.addInPlace(forward)
        }
        if(this.camera.axisMovement[1]){
            let backward = new BABYLON.Vector3(
                parseFloat(-Math.sin(parseFloat(this.camera.rotation.y))) * relativeSpeed/1.4, 
                0, 
                parseFloat(-Math.cos(parseFloat(this.camera.rotation.y))) * relativeSpeed/1.4
            )
            this.camera.position = this.camera.position.addInPlace(backward)
        }
        if(this.camera.axisMovement[2]){
            let left = new BABYLON.Vector3(
                parseFloat(Math.sin(parseFloat(this.camera.rotation.y) + degToRad(-90))) * relativeSpeed/1.4, 
                0, 
                parseFloat(Math.cos(parseFloat(this.camera.rotation.y) + degToRad(-90))) * relativeSpeed/1.4
            )
            this.camera.position = this.camera.position.addInPlace(left)
        }
        if(this.camera.axisMovement[3]){
            let right = new BABYLON.Vector3(
                parseFloat(-Math.sin(parseFloat(this.camera.rotation.y) + degToRad(-90))) * relativeSpeed/1.4, 
                0, 
                parseFloat(-Math.cos(parseFloat(this.camera.rotation.y) + degToRad(-90))) * relativeSpeed/1.4
            )
            this.camera.position = this.camera.position.addInPlace(right)
        }
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