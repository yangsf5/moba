package room

import (
	"math/rand"

	"github.com/yangsf5/claw/engine/net"
)

const (
	RoomCount = 25 // config to xml
)

type User interface {
	net.Peer
	Name() string

	EnterService(service string)

	GetHP() int
	SetHP(hp int)
	IsDead() bool

	GetPosition() (x, y int)
	SetPosition(x, y int)

	GetHeroID() int
	SetHeroID(int)
}

type Room struct {
	ID          int
	serviceName string

	maxPlayerCount int

	group    *net.Group
	sessions map[int]User

	battleStatus string // firing or waiting or finished
}

func NewRoom(ID int, serviceName string) *Room {
	r := &Room{}
	r.ID = ID
	r.serviceName = serviceName
	r.maxPlayerCount = 6
	r.group = net.NewGroup()
	r.sessions = make(map[int]User)
	r.battleStatus = "waiting"
	return r
}

func (r *Room) GetMaxPlayerCount() int {
	return r.maxPlayerCount
}

func (r *Room) GetCurrentPlayerCount() int {
	return len(r.sessions)
}

func (r *Room) UpdateBattleStatus() {
	if len(r.sessions) >= 2 {
		r.battleStatus = "firing"
		r.NotifyRCBattleStatus()
	}
}

func (r *Room) Enter(session int, u User) bool {
	ret := r.group.AddPeer(u.Name(), u)
	if ret {
		u.SetPosition(101+rand.Intn(200), 100+rand.Intn(200))

		u.EnterService(r.serviceName)
		r.sessions[session] = u
	}

	return ret
}

func (r *Room) Leave(session int) {
	if u, ok := r.sessions[session]; ok {
		r.group.DelPeer(u.Name())
		delete(r.sessions, session)

		r.NotifyRCPlayerLeave(u.Name())
	}
}

func (r *Room) Broadcast(msg string) {
	r.group.Broadcast([]byte(msg))
}
