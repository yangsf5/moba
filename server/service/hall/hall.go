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
)

func init() {
	group = net.NewGroup()
	sessions = make(map[int]User)
}

func Enter(session int, u User) bool {
	ret := group.AddPeer(u.Name(), u)
	if ret {
		u.EnterService("MobaHall")
		sessions[session] = u
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

