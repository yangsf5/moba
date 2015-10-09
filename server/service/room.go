package service

import (
	"github.com/golang/glog"
	"github.com/yangsf5/claw/center"

	"github.com/yangsf5/moba/server/proto"
	"github.com/yangsf5/moba/server/service/room"
)

type Room struct {
	name      string
	logicRoom *room.Room
}

func (s *Room) ClawCallback(session int, source string, msgType int, msg interface{}) {
	glog.Infof("Service.%s recv session=%d type=%v msg=%v", s.name, session, msgType, msg)
	switch msgType {
	case center.MsgTypeSystem:
	case center.MsgTypeText:
	case center.MsgTypeClient:
		if pack, ok := msg.(*proto.Pack); ok {
			room.HandleClientMessage(session, pack.Type, pack.Data)
		} else {
			glog.Errorf("Service.%s MsgTypeClient msg is not a *proto.Pack", s.name)
		}
	}
}

func (s *Room) ClawStart() {
	glog.Infof("%s service start", s.name)
}

func NewRoomService(roomID int, roomServiceName string) *Room {
	roomService := &Room{}
	r := room.NewRoom(roomID)
	roomService.logicRoom = r
	roomService.name = roomServiceName
	return roomService
}
