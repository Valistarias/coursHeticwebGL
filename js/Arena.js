class Arena{
	constructor(Game){
		this.game = Game
		let scene = this.game.scene

		var groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene)
		// groundMaterial.diffuseColor = new BABYLON.Color3(1,0,0)
		groundMaterial.diffuseTexture = new BABYLON.Texture('assets/texture/wood.png',scene)
		groundMaterial.diffuseTexture.uScale = 10
		groundMaterial.diffuseTexture.vScale = 10

		var wallMaterial = new BABYLON.StandardMaterial('wallMaterial', scene)
		// wallMaterial.diffuseColor = new BABYLON.Color3(1,0,0)
		wallMaterial.diffuseTexture = new BABYLON.Texture('assets/texture/concrete.png',scene)
		wallMaterial.bumpTexture = new BABYLON.Texture('assets/texture/bumpConcrete.png',scene)
		wallMaterial.bumpTexture.uScale = 20
		wallMaterial.bumpTexture.vScale = 10
		wallMaterial.diffuseTexture.uScale = 20
		wallMaterial.diffuseTexture.vScale = 10
		wallMaterial.specularColor = new BABYLON.Color3(0,0,0)

		// On ajoute une lumière
		var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene)
		light.intensity = 0.2

		var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -1, 0), scene)
		light2.intensity = 0.2

		var mLight = new BABYLON.PointLight("light3", new BABYLON.Vector3(0,3,0), scene)
		mLight.range = 10

		// On crée un plan
		var ground = BABYLON.Mesh.CreateGround("ground1", 15, 10, 2, scene)
		ground.material = groundMaterial

		var mur1 = BABYLON.Mesh.CreateBox("mur1", 1, scene)
		mur1.scaling = new BABYLON.Vector3(15,5,1)
		mur1.position = new BABYLON.Vector3(0,2.5,5)
		mur1.material = wallMaterial;

		var mur2 = mur1.clone("mur2")
		mur2.position.z = -5

		var mur3 = BABYLON.Mesh.CreateBox("mur3", 1, scene)
		mur3.scaling = new BABYLON.Vector3(10,5,1)
		mur3.position = new BABYLON.Vector3(7.5,2.5,0)
		mur3.rotation.y = degToRad(90)
		mur3.material = wallMaterial;

		var mur4 = mur3.clone("mur4")
		mur4.position.x = -7.5

		var floor = BABYLON.Mesh.CreatePlane("floor", 1, scene)
		floor.scaling = new BABYLON.Vector3(15,10,1)
		floor.rotation.x = degToRad(-90)
		floor.position.y = 5
	}
}