class Arena {
    constructor(scene) {

        // Création de notre lumière principale
        this.ambiantColor = new BABYLON.Color3(1,0.95,0.9);
        
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

        this.paintingTexture = new BABYLON.StandardMaterial("paintingTexture", scene);
        this.paintingTexture.specularColor = new BABYLON.Color3(0.3,0.3,0.3);
        this.paintingTexture.bumpTexture = new BABYLON.Texture("assets/texturePack/wall_brick_normal.jpg", scene);
        this.paintingTexture.maxSimultaneousLights = 20;

        var paintings = document.getElementById('imgMuseum')
        var paintings = paintings.getElementsByTagName("img");

        var numberRoom = Math.ceil((paintings.length)/2)

        var newRoom = this.NewSalle(scene, true, false)

        for (var i = 0; i < 2; i++) {
            var paint = this.NewPainting(i,newRoom,paintings[i],scene)
        };

        for (var i=1;i<numberRoom-1;i++){
            console.log('New salle !')
            var newRoom = this.NewSalle(scene, true, true)
            newRoom.position.z = 60 * i
            for (var y = 0; y < 2; y++) {
                let numberPaint = 2*i+y;
                var paint = this.NewPainting(numberPaint,newRoom,paintings[numberPaint],scene)
            };
        }

        var newRoom = this.NewSalle(scene, false, true)
        newRoom.position.z = 60 * (numberRoom-1)

        for (var i = (numberRoom-1)*2; i < paintings.length; i++) {
            var paint = this.NewPainting(i,newRoom,paintings[i],scene)
        };

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
    NewPainting(id,room,data,scene){
        let paint = new BABYLON.Mesh.CreateBox("painting",1,scene)
        paint.parent = room
        room.light1.includedOnlyMeshes.push(paint)
        room.light2.includedOnlyMeshes.push(paint)
        paint.scaling = new BABYLON.Vector3(0.5,data.width/50,data.height/50)
        
        if(id%2>0){
            paint.position.x = (50/2) - 1
            paint.rotation.x = degToRad(-90)
        }else{
            paint.position.x = (-50/2) + 1
            paint.rotation.x = degToRad(90)
        }
        paint.position.y = (paint.scaling.z/2) + 2
        paint.material = this.paintingTexture.clone("paint"+id)
        paint.material.diffuseTexture = BABYLON.Texture.CreateFromBase64String(data.src, "paintTexture64-" + id, scene, false, true); 

    }
}