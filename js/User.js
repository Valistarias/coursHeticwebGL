class User {
    constructor(scene,canvas) {

        // On crée la caméra
        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, 10), scene);

        // On demande à la caméra de regarder au point zéro de la scène
        this.camera.setTarget(BABYLON.Vector3.Zero());

        this.camera.attachControl(canvas);

    }
}