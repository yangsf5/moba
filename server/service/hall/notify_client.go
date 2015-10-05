package hall

import (
	"github.com/yangsf5/moba/server/proto"
)

func NotifyHCPlayerInfos() {
	players := []proto.PlayerInfo{}
	for _, user := range sessions {
		player := proto.PlayerInfo{
			Name: user.Name(),
			CurrentHP: user.GetHP(),
		}
		players = append(players, player)
	}
	msg := &proto.HCPlayerInfos{players}
	Broadcast(proto.Encode("MobaHall", msg))
}

func NotifyHCBattleStatus() {
	msg := &proto.HCBattleStatus{battleStatus}
	Broadcast(proto.Encode("MobaHall", msg))
}
