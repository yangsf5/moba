package service

import (
	"fmt"
	"github.com/yangsf5/claw/center"

	"github.com/yangsf5/moba/server/service/room"
)

func Register() {
	services := map[string]center.Service{
		"MobaWebsocket": &Websocket{},
		"MobaHall":      &Hall{},
	}

	for i := 1; i <= room.RoomCount; i++ {
		roomServiceName := fmt.Sprintf("MobaRoom%d", i)
		s := NewRoomService(i, roomServiceName)
		services[roomServiceName] = s
	}

	for name, cb := range services {
		center.Register(name, cb)
	}
}

func send(source, destination string, session int, msgType int, msg interface{}) {
	center.Send(source, destination, session, msgType, msg)
}
