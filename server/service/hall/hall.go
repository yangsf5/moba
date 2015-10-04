package hall

import (
	"github.com/yangsf5/claw/engine/net"
)

type User interface {
	net.Peer
	Name() string

	//TODO remove
	Login()
	Tick()
	Kick(reason string)

	EnterService(service string)
}

var (
	group *net.Group
	sessions map[int]User
	battleStatus string // firing or waiting or finished
)

func init() {
	group = net.NewGroup()
	sessions = make(map[int]User)
	battleStatus = "waiting"
}

func Enter(session int, u User) bool {
	ret := group.AddPeer(u.Name(), u)
	if ret {
		u.EnterService("MobaHall")
		sessions[session] = u

		NotifyHCTeamMember()
		if(len(sessions) >= 4) {
			battleStatus = "firing"
			NotifyHCBattleStatus()
		}
	}

	return ret
}

func Leave(session int) {
	if u, ok := sessions[session]; ok {
		group.DelPeer(u.Name())
		delete(sessions, session)
	}
}

func Broadcast(msg string) {
	group.Broadcast([]byte(msg))
}

