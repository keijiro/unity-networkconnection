#pragma strict

var skin : GUISkin;

private var hostData : HostData;

function Start() {
    MasterServer.ClearHostList();
    MasterServer.RequestHostList("radiumsoftware_networking_test");
}

function Update() {
    if (hostData == null) {
        var hostList = MasterServer.PollHostList();
        if (hostList.Length > 0) {
            hostData = hostList[0];
            Network.Connect(hostData);
        }
    }
}

function OnGUI() {
    GUI.skin = skin;

    var sw = Screen.width;
    var sh = Screen.height;

    GUILayout.BeginArea(Rect(0.1 * sw, 0.1 * sh, 0.8 * sw, 0.8 * sh));
    GUILayout.Label("Running as a client.");
    GUILayout.Label(Utility.StringFromLocal(Network.player));

    if (hostData) {
        GUILayout.Label("Game name:");
        GUILayout.Label(hostData.gameName);

        if (Network.connections.Length > 0) {
            GUILayout.Label("Server info:");
            GUILayout.Label(Utility.StringFromConnection(Network.connections[0]));
        } else {
            GUILayout.Label("Connecting to the server.");
        }
    } else {
        GUILayout.Label("Waiting for host list.");
    }

    GUILayout.FlexibleSpace();

    if (GUILayout.Button("Abort", GUILayout.Height(sh * 0.1))) {
        Network.Disconnect();
        Destroy(gameObject);
    }

    GUILayout.EndArea();
}
