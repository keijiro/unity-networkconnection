#pragma strict

static function StringFromLocal(player : NetworkPlayer) : String {
    if (player.guid) {
        return player.guid + " at " + player.externalIP + ":" + player.externalPort;
    } else {
        return player.ipAddress + ":" + player.port;
    }
}

static function StringFromConnection(player : NetworkPlayer) : String {
    if (player.guid) {
        return player.guid + " at " + player.ipAddress + ":" + player.port;
    } else {
        return player.ipAddress + ":" + player.port;
    }
}
