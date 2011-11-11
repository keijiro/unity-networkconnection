#pragma strict

var skin : GUISkin;

private var status : ConnectionTesterStatus;

function Start() {
    status = Network.TestConnectionNAT();
}

function Update() {
    if (status == ConnectionTesterStatus.Undetermined) {
        status = Network.TestConnection();
    }
}

function OnGUI() {
    GUI.skin = skin;

    var sw = Screen.width;
    var sh = Screen.height;

    GUILayout.BeginArea(Rect(0.1 * sw, 0.1 * sh, 0.8 * sw, 0.8 * sh));

    if (status == ConnectionTesterStatus.Error) {
        GUILayout.Label("An error occurred.");
    } else if (status == ConnectionTesterStatus.Undetermined) {
        GUILayout.Label("Testing in progress.");
    } else if (status == ConnectionTesterStatus.LimitedNATPunchthroughPortRestricted) {
        GUILayout.Label("Completed. Result: Port-restricted NAT type.");
    } else if (status == ConnectionTesterStatus.LimitedNATPunchthroughSymmetric) {
        GUILayout.Label("Completed. Result: Symmetric NAT type.");
    } else if (status == ConnectionTesterStatus.NATpunchthroughFullCone) {
        GUILayout.Label("Completed. Result: Full cone NAT type.");
    } else if (status == ConnectionTesterStatus.NATpunchthroughAddressRestrictedCone) {
        GUILayout.Label("Completed. Result: Address-restricted cone NAT type.");
    } else {
        GUILayout.Label("Completed. Result: Public IP address.");
    }

    GUILayout.FlexibleSpace();

    if (GUILayout.Button("Abort", GUILayout.Height(sh * 0.1))) {
        Network.Disconnect();
        Destroy(gameObject);
    }

    GUILayout.EndArea();
}
