package hall

import (
	"math/rand"
	"github.com/golang/glog"

	"github.com/yangsf5/moba/server/proto"
)

func HandleClientMessage(session int, msgType string, msgData interface{}) {
	u, ok := sessions[session]
	if !ok {
		glog.Errorf("HallClientMessage session not in hall, sessionId=%d", session)
		return
	}

	switch msgType {
	case "chat":
		chatMsg := &proto.HCChat{u.Name(), msgData.(string)}
		Broadcast(proto.Encode("MobaHall", chatMsg))
	case "shoot":
		targetName := msgData.(string)
		targetUser := group.GetPeer(targetName)
		if targetUser == nil {
			break
		}
		if battleStatus != "firing" {
			break
		}
		shootMsg := &proto.HCShoot{u.Name(), targetName, rand.Intn(3)}
		Broadcast(proto.Encode("MobaHall", shootMsg))
	}
}
