package room

import (
	"github.com/golang/glog"
	"math/rand"

	"github.com/yangsf5/moba/server/proto"
)

func (r *Room) HandleClientMessage(session int, msgType string, msgData interface{}) {
	u, ok := r.sessions[session]
	if !ok {
		glog.Errorf("RoomService-%s HallClientMessage session not in room, sessionId=%d", r.serviceName, session)
		return
	}

	switch msgType {
	case "shoot":
		targetName := msgData.(string)
		targetUser := r.group.GetPeer(targetName)
		if targetUser == nil {
			break
		}
		if r.battleStatus != "firing" {
			break
		}
		mobaUser := targetUser.(User)
		hp := mobaUser.GetHP() - rand.Intn(3)
		mobaUser.SetHP(hp)
		shootMsg := &proto.RCShoot{u.Name(), targetName, hp}
		r.Broadcast(proto.Encode(r.serviceName, shootMsg))
	}
}
