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
		if user, ok := msg.(room.User); ok {
			if ret := s.logicRoom.Enter(session, user); !ret {
				glog.Infof("Service.%s enter room failed", s.name)
				return
			}
			center.Send(s.name, "MobaHall", session, center.MsgTypeSystem, &proto.RoomInfo{s.logicRoom.GetMaxPlayerCount(), s.logicRoom.GetCurrentPlayerCount()})
			glog.Infof("Service.%s enter room userName=%s", s.name, user.Name())
		} else {
			glog.Infof("Service.%s msg is not a net.Peer", s.name)
		}
	case center.MsgTypeText:
		if msg, ok := msg.(string); ok {
			if msg == "LEAVE" {
				s.logicRoom.Leave(session)
				s.logicRoom.NotifyRCPlayerInfos()
				center.Send(s.name, "MobaHall", 0, center.MsgTypeSystem, &proto.RoomInfo{s.logicRoom.GetMaxPlayerCount(), s.logicRoom.GetCurrentPlayerCount()})
			}
		}
	case center.MsgTypeClient:
		if pack, ok := msg.(*proto.Pack); ok {
			s.logicRoom.HandleClientMessage(session, pack.Type, pack.Data)
		} else {
			glog.Errorf("Service.%s MsgTypeClient msg is not a *proto.Pack", s.name)
		}
	}
}

func (s *Room) ClawStart() {
	glog.Infof("%s service start", s.name)
	// 向Hall汇报自己的初始信息
	center.Send(s.name, "MobaHall", 0, center.MsgTypeSystem, &proto.RoomInfo{s.logicRoom.GetMaxPlayerCount(), 0})
}

func NewRoomService(roomID int, roomServiceName string) *Room {
	roomService := &Room{}
	r := room.NewRoom(roomID, roomServiceName)
	roomService.logicRoom = r
	roomService.name = roomServiceName
	return roomService
}
