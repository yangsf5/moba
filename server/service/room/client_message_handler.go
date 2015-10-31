package room

import (
	"fmt"
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
	case "chooseHero":
		if r.battleStatus != "waiting" {
			break
		}
		heroID := msgData.(int)
		// TODO check heroID

		// TODO set user heroID

		retMsg := &proto.RCPlayerChooseHero{u.Name(), heroID}

		r.Broadcast(proto.Encode(r.serviceName, retMsg))
	case "shoot":
		if u.IsDead() {
			break
		}
		targetName := msgData.(string)
		targetUser := r.group.GetPeer(targetName)
		if targetUser == nil {
			break
		}
		if r.battleStatus != "firing" {
			break
		}
		mobaUser := targetUser.(User)
		if mobaUser.IsDead() {
			break
		}

		hp := mobaUser.GetHP() - (1 + rand.Intn(10))
		if hp <= 0 {
			hp = 0
		}
		mobaUser.SetHP(hp)
		shootMsg := &proto.RCShoot{u.Name(), targetName, hp}
		r.Broadcast(proto.Encode(r.serviceName, shootMsg))
	case "move":
		if u.IsDead() {
			break
		}
		position := msgData.(string)
		var x, y int
		fmt.Sscanf(position, "%d,%d", &x, &y)
		// TODO check x, y
		u.SetPosition(x, y)
		moveMsg := &proto.RCMove{u.Name(), x, y}
		r.Broadcast(proto.Encode(r.serviceName, moveMsg))
	case "skill":
		if r.battleStatus != "firing" {
			break
		}
	}
}
