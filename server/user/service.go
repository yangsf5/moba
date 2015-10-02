package user

import (
	"github.com/yangsf5/claw/center"
)

func (u *User) EnterService(service string) {
	u.services.PushBack(service)
}

func (u *User) LeaveService(service string) {
	for e := u.services.Front(); e != nil; e = e.Next() {
		if e.Value == service {
			u.services.Remove(e)
			break
		}
	}
}

func (u *User) LeaveAllService() {
	for e := u.services.Front(); e != nil; e = u.services.Front() {
		center.Send("", e.Value.(string), u.sessionId, center.MsgTypeText, "LEAVE")
		u.services.Remove(e)
	}
}
