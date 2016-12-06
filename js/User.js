class User {
    constructor(scene,canvas) {
    	this.scene = scene

        // On crée la caméra
        this.camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI/2, 10, BABYLON.Vector3.Zero(), this.scene)

        this.camera.attachControl(canvas)

        window.addEventListener("mousemove", (evt) => {
            var pick = this.scene.pick(evt.pageX,evt.pageY)
            if(window.particles){
                window.particles.emitter = pick.pickedPoint
            }
            
        }, false);
    }
}