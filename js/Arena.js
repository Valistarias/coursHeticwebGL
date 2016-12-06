class Arena {
    constructor(scene) {
        // var cubeTest = new BABYLON.Mesh.CreateBox('cube',2,scene)
        var particles = new BABYLON.ParticleSystem('particules',10000,scene)
        particles.particleTexture = new BABYLON.Texture("assets/texturePack/Flare.png", scene)
        particles.emitter = new BABYLON.Vector3(0,0,0)
        // particles.gravity = new BABYLON.Vector3(0, 9.81, 0)
        particles.emitRate = 2000
        particles.color1 = new BABYLON.Color4(1,0.8,0.7, 1.0)
        particles.color2 = new BABYLON.Color4(1,0.8,0.7, 0)
        particles.minSize = 0.1;
        particles.maxSize = 0.5;
        particles.start()

        window.particles = particles

        var sphereEnv = new BABYLON.Mesh.CreateSphere('sphereEnv', 4, 20, scene, true, BABYLON.Mesh.DOUBLESIDE)
        sphereEnv.material = new BABYLON.StandardMaterial('mat',scene)
        sphereEnv.material.alpha = 0;
    }
}