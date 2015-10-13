package service

import (
	"github.com/golang/glog"
	"github.com/yangsf5/claw/center"

	"github.com/yangsf5/moba/server/proto"
	"github.com/yangsf5/moba/server/service/hall"
)

type Hall struct {
}

func (s *Hall) ClawCallback(session int, source string, msgType int, msg interface{}) {
	glog.Infof("Service.MobaHall recv session=%d type=%v msg=%v", session, msgType, msg)
	switch msgType {
	case center.MsgTypeSystem:
		if user, ok := msg.(hall.User); ok {
			if ret := hall.Enter(session, user); !ret {
				glog.Info("Service.MobaHall enter hall failed")
				user.Kick("Repeated login")
				return
			}
			user.Login()
			go user.Tick()
		} else if roomInfo, ok := msg.(*proto.RoomInfo); ok {
			hall.UpdateRoomInfo(source, roomInfo)
		} else {
			glog.Info("Service.MobaHall msg is undefined")
		}
	case center.MsgTypeText:
		if msg, ok := msg.(string); ok {
			if msg == "LEAVE" {
				hall.Leave(session)
			}
		}
	case center.MsgTypeClient:
		if pack, ok := msg.(*proto.Pack); ok {
			hall.HandleClientMessage(session, pack.Type, pack.Data)
		} else {
			glog.Errorf("Service.MobaHall MsgTypeClient msg is not a *proto.Pack")
		}
	}
}

func (s *Hall) ClawStart() {
}
