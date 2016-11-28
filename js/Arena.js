class Arena {
    constructor(scene) {

        // Création de notre lumière principale
        // this.light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        this.ambiantColor = new BABYLON.Color3(1,0.95,0.9);
        // this.ambiantColor = BABYLON.Color3.White()
        // CREATION DES LUMIERES
        

        var hemi1 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
        hemi1.diffuse = this.ambiantColor; 
        hemi1.intensity = 0.3;

        var hemi2 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, -1, 0), scene);
        hemi2.diffuse = this.ambiantColor; 
        hemi2.intensity = 0.3;

        this.wallMaterial = new BABYLON.StandardMaterial("wallTexture", scene);
        this.wallMaterial.diffuseTexture = new BABYLON.Texture("assets/texturePack/wall_brick.png", scene);
        this.wallMaterial.diffuseTexture.uScale = 3;
        this.wallMaterial.diffuseTexture.vScale = 3;
        this.wallMaterial.specularColor = BABYLON.Color3.Black();
        this.wallMaterial.bumpTexture = new BABYLON.Texture("assets/texturePack/wall_brick_normal.jpg", scene);
        this.wallMaterial.bumpTexture.uScale = 3;
        this.wallMaterial.bumpTexture.vScale = 3;
        this.wallMaterial.maxSimultaneousLights = 20;

        this.floorMaterial = new BABYLON.StandardMaterial("wallTexture", scene);
        this.floorMaterial.diffuseTexture = new BABYLON.Texture("assets/texturePack/wall_brick.png", scene);
        this.floorMaterial.diffuseTexture.uScale = 3;
        this.floorMaterial.diffuseTexture.vScale = 3;
        this.floorMaterial.specularColor = BABYLON.Color3.Black();
        this.floorMaterial.maxSimultaneousLights = 20;

        this.groundMaterial = new BABYLON.StandardMaterial("groundTexture", scene);
        this.groundMaterial.diffuseTexture = new BABYLON.Texture("assets/texturePack/floor_wood.png", scene);
        this.groundMaterial.diffuseTexture.uScale = 10;
        this.groundMaterial.diffuseTexture.vScale = 10;
        this.groundMaterial.maxSimultaneousLights = 20;

        this.beamMaterial = new BABYLON.StandardMaterial("beamTexture", scene);
        this.beamMaterial.diffuseTexture = new BABYLON.Texture("assets/texturePack/beam_wood.png", scene);
        this.beamMaterial.diffuseTexture.uScale = 0.3;
        this.beamMaterial.diffuseTexture.vScale = 0.2;
        this.beamMaterial.maxSimultaneousLights = 20;

        this.paintingTexture = new BABYLON.StandardMaterial("paintingTexture", scene);
        this.paintingTexture.specularColor = new BABYLON.Color3(0.3,0.3,0.3);
        this.paintingTexture.bumpTexture = new BABYLON.Texture("assets/texturePack/wall_brick_normal.jpg", scene);
        this.paintingTexture.maxSimultaneousLights = 20;

        var newRoom = this.NewSalle(scene, false, false)

    }
    NewSalle(scene, southGate, northGate){
        // Point de pivot de la pièce
        var roomCenter = BABYLON.Mesh.CreateBox("centerRoom", 1, scene);
        roomCenter.isVisible = false;
        roomCenter.paintings = [];

        // Ajout des light à la pièce
        roomCenter.light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(-15, 10, 0), scene);
        roomCenter.light1.parent = roomCenter;
        roomCenter.light1.diffuse = this.ambiantColor;
        roomCenter.light1.specular = new BABYLON.Color3(0.5,0.5,0.5);
        roomCenter.light1.range = 150;
        roomCenter.light1.intensity = 0.5;

        roomCenter.light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(15, 10, 0), scene);
        roomCenter.light2.parent = roomCenter;
        roomCenter.light2.diffuse = this.ambiantColor;
        roomCenter.light2.specular = new BABYLON.Color3(0.5,0.5,0.5);
        roomCenter.light2.range = 150;
        roomCenter.light2.intensity = 0.5;

        // DEFINITION DU SOL
        var ground = BABYLON.Mesh.CreateGround("ground1", 50, 60, 2, scene);
        ground.parent = roomCenter;
        ground.checkCollisions = true;
        ground.material = this.groundMaterial;
        roomCenter.light1.includedOnlyMeshes.push(ground);
        roomCenter.light2.includedOnlyMeshes.push(ground);

        // DEFINITION DES MURS
        var wallS = BABYLON.Mesh.CreateBox("wallS", 1, scene);
        wallS.parent = roomCenter;
        wallS.scaling.x = 50;
        wallS.scaling.y = 30;
        wallS.position.z = 30 - 0.5;
        wallS.position.y = 15;
        wallS.checkCollisions = true
        wallS.material = this.wallMaterial;
        roomCenter.light1.includedOnlyMeshes.push(wallS);
        roomCenter.light2.includedOnlyMeshes.push(wallS);

        if(southGate){
            wallS.scaling.x = 20;
            wallS.position.x = 15;

            var wallS2 = wallS.clone('wallS2');
            wallS2.parent = roomCenter;
            wallS2.position.x = -15;
            roomCenter.light1.includedOnlyMeshes.push(wallS2);
            roomCenter.light2.includedOnlyMeshes.push(wallS2);
        }

        var wallN = BABYLON.Mesh.CreateBox("wallS", 1, scene);
        wallN.parent = roomCenter;
        wallN.scaling.x = 50;
        wallN.scaling.y = 30;
        wallN.position.z = -30 + 0.5;
        wallN.position.y = 15;
        wallN.checkCollisions = true
        wallN.material = this.wallMaterial;
        roomCenter.light1.includedOnlyMeshes.push(wallN);
        roomCenter.light2.includedOnlyMeshes.push(wallN);
        
        roomCenter.light1.includedOnlyMeshes.push(wallN);
        roomCenter.light2.includedOnlyMeshes.push(wallN);

        if(northGate){
            wallN.scaling.x = 20;
            wallN.position.x = 15;

            var wallN2 = wallN.clone('wallN2');
            wallN2.parent = roomCenter;
            wallN2.position.x = -15;
            roomCenter.light1.includedOnlyMeshes.push(wallN2);
            roomCenter.light2.includedOnlyMeshes.push(wallN2);
        }

        var wallO = BABYLON.Mesh.CreateBox("wallO", 1, scene);
        wallO.parent = roomCenter;
        wallO.scaling.z = 60;
        wallO.scaling.y = 30;
        wallO.position.x = 25 - 0.5;
        wallO.position.y = 15;
        wallO.checkCollisions = true;
        wallO.material = this.wallMaterial;
        roomCenter.light1.includedOnlyMeshes.push(wallO);
        roomCenter.light2.includedOnlyMeshes.push(wallO);
        
        var wallE = wallO.clone('wallE')
        wallE.parent = roomCenter;
        wallE.parent = roomCenter;
        wallE.position.x = -25 + 0.5;
        roomCenter.light1.includedOnlyMeshes.push(wallE);
        roomCenter.light2.includedOnlyMeshes.push(wallE);

        // DEFINITION DU PLAFOND
        let plafond = BABYLON.Mesh.CreateBox("plafond", 1, scene);
        plafond.parent = roomCenter;
        plafond.scaling.z = 60;
        plafond.scaling.x = 50;
        plafond.position.y = 30;
        plafond.material = this.floorMaterial;
        roomCenter.light1.includedOnlyMeshes.push(plafond);
        roomCenter.light2.includedOnlyMeshes.push(plafond);

        return roomCenter;
    }
}