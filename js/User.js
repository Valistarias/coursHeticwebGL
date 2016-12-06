class User {
    constructor(scene,canvas) {
    	this.scene = scene

        // On crée la caméra
        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, 10), scene)

        this.camera.setTarget(BABYLON.Vector3.Zero())

        this.camera.attachControl(canvas)
    } 
}