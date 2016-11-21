class User {
	constructor(Game){
		this.game = Game

		// On ajoute une caméra a la scène
		this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-5, 3, 0), this.game.scene)

		// On définis son origine à 0
		this.camera.setTarget(BABYLON.Vector3.Zero())

		// On attache les contrôles de la caméra au canvas
		this.camera.attachControl(this.game.canvas, true)
	}
}