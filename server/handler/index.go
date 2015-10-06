package handler

import (
	"time"

	"github.com/golang/glog"
	"golang.org/x/net/websocket"

	"github.com/yangsf5/claw/center"
)

func socketHandler(ws *websocket.Conn) {
	userName := ws.Request().FormValue("user")
	glog.Infof("Hall socket, name=%s", userName)

	center.Send("Web", "MobaWebsocket", 0, center.MsgTypeSystem, ws)

	for {
		time.Sleep(100 * time.Millisecond)
	}
}

