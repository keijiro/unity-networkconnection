#pragma strict

var skin : GUISkin;

var serverPrefab : GameObject;
var clientPrefab : GameObject;
var testerPrefab : GameObject;

private var instance : GameObject;

function OnGUI() {
    if (instance) return;

    GUI.skin = skin;

    var sw = Screen.width;
    var sh = Screen.height;

    GUILayout.BeginArea(Rect(0.1 * sw, 0.25 * sh, 0.8 * sw, 0.5 * sh));
    GUILayout.BeginVertical();

    GUILayout.Label("Launch as:");

    if (GUILayout.Button("a server")) {
        instance = Instantiate(serverPrefab);
    }
    
    if (GUILayout.Button("a client")) {
        instance = Instantiate(clientPrefab);
    }

    if (!Network.HavePublicAddress()) {
        GUILayout.Label("or run");

        if (GUILayout.Button("NAT type detection")) {
            instance = Instantiate(testerPrefab);
        }
    }

    GUILayout.EndVertical();
    GUILayout.EndArea();
}
