package hall

import (
	"github.com/yangsf5/claw/engine/net"

	"github.com/yangsf5/moba/server/proto"
	"github.com/yangsf5/moba/server/script"
	"github.com/yangsf5/moba/server/service/room"
)

type User interface {
	net.Peer
	Name() string

	//TODO remove
	Login()
	Tick()
	Kick(reason string)

	EnterService(service string)

	GetHP() int
	SetHP(hp int)
}

var (
	group    *net.Group
	sessions map[int]User
)

func init() {
	group = net.NewGroup()
	sessions = make(map[int]User)

	//TODO temp
	script.ExecPythonFile("./server/script/python/1.py")
}

func Enter(session int, u User) bool {
	ret := group.AddPeer(u.Name(), u)
	if ret {
		u.EnterService("MobaHall")
		sessions[session] = u

		msg := proto.Encode("MobaHall", &proto.HCRoomCount{room.RoomCount})
		u.Send([]byte(msg))
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
