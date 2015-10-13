package room

import (
	"github.com/yangsf5/claw/engine/net"
)

const (
	RoomCount = 25 // config to xml
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

type RoomUser interface {
	net.Peer
}

type Room struct {
	ID          int
	serviceName string

	group    *net.Group
	sessions map[int]User

	battleStatus string // firing or waiting or finished
}

func NewRoom(ID int, serviceName string) *Room {
	r := &Room{}
	r.ID = ID
	r.serviceName = serviceName
	r.group = net.NewGroup()
	r.sessions = make(map[int]User)
	r.battleStatus = "waiting"
	return r
}

func (r *Room) Enter(session int, u User) bool {
	ret := r.group.AddPeer(u.Name(), u)
	if ret {
		u.EnterService(r.serviceName)
		r.sessions[session] = u

		r.NotifyHCPlayerInfos()

		if len(r.sessions) >= 2 {
			r.battleStatus = "firing"
			r.NotifyHCBattleStatus()
		}
	}

	return ret
}

func (r *Room) Leave(session int) {
	if u, ok := r.sessions[session]; ok {
		r.group.DelPeer(u.Name())
		delete(r.sessions, session)
	}
}

func (r *Room) Broadcast(msg string) {
	r.group.Broadcast([]byte(msg))
}
