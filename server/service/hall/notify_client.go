package hall

import (
	"github.com/yangsf5/moba/server/proto"
)

func NotifyHCTeamMember() {
	members := []string{}
	for _, user := range sessions {
		members = append(members, user.Name())
	}
	msg := &proto.HCTeamMember{members}
	Broadcast(proto.Encode("MobaHall", msg))
}
