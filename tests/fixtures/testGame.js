class PlayerController {
    // This should trigger the PERFORMANCE warning
    Update() {
        // Using string representation for pattern matching
        console.log("GetComponent<Rigidbody>()");
        this.transform = { position: { x: 1, y: 1, z: 1 } };
    }

    // This should trigger the PHYSICS warning
    FixedUpdate() {
        this.transform = { position: { x: 0, y: 0, z: 0 } };
    }

    // This should trigger the MEMORY_LEAK warning
    SpawnEnemy() {
        console.log("Instantiate(enemyPrefab)");
    }
} 