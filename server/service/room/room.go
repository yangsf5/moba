package room

import (
	"github.com/yangsf5/claw/engine/net"
)

const (
	RoomCount = 25 // config to xml
)

type RoomUser interface {
	net.Peer
}

type Room struct {
	ID int
	*net.Group
}

func NewRoom(ID int) *Room {
	r := &Room{}
	r.ID = ID
	return r
}

func (r *Room) Enter(userName string, u RoomUser) bool {
	if r.AddPeer(userName, u) {
		return true
	}
	return false
}

func (r *Room) Leave(userName string) {
	r.DelPeer(userName)
}
