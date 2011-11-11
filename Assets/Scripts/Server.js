#pragma strict

var skin : GUISkin;

private var gameName : String;

function Start() {
    gameName = "Test Game (" + Random.Range(0, 65536) + ")";
    Network.InitializeServer(8, Random.Range(16393, 16473), !Network.HavePublicAddress());
    MasterServer.RegisterHost("radiumsoftware_networking_test", gameName);
}

function OnGUI() {
    GUI.skin = skin;

    var sw = Screen.width;
    var sh = Screen.height;

    GUILayout.BeginArea(Rect(0.1 * sw, 0.1 * sh, 0.8 * sw, 0.8 * sh));

    GUILayout.Label("Running as a server.");
    GUILayout.Label(Utility.StringFromLocal(Network.player));

    GUILayout.Label("Game name:");
    GUILayout.Label(gameName);

    GUILayout.Label("Connections:");
    for (var connection in Network.connections) {
        GUILayout.Label(Utility.StringFromConnection(connection));
    }

    GUILayout.FlexibleSpace();

    if (GUILayout.Button("Abort", GUILayout.Height(sh * 0.1))) {
        Network.Disconnect();
        Destroy(gameObject);
    }

    GUILayout.EndArea();
}
