package room

import (
	"github.com/yangsf5/moba/server/proto"
)

func (r *Room) NotifyRCPlayerInfos() {
	players := []proto.PlayerInfo{}
	for _, user := range r.sessions {
		x, y := user.GetPosition()
		player := proto.PlayerInfo{
			Name:      user.Name(),
			CurrentHP: user.GetHP(),
			HeroID:    user.GetHeroID(),
			X:         x,
			Y:         y,
		}
		players = append(players, player)
	}
	msg := &proto.RCPlayerInfos{players}
	r.Broadcast(proto.Encode(r.serviceName, msg))
}

func (r *Room) NotifyRCPlayerLeave(userName string) {
	msg := &proto.RCPlayerLeave{userName}
	r.Broadcast(proto.Encode(r.serviceName, msg))
}

func (r *Room) NotifyRCBattleStatus() {
	msg := &proto.RCBattleStatus{r.battleStatus}
	r.Broadcast(proto.Encode(r.serviceName, msg))
}
