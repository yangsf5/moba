package service

import (
	"github.com/golang/glog"
	"github.com/yangsf5/claw/center"

	"golang.org/x/net/websocket"

	"github.com/yangsf5/moba/server/user"
)

type Websocket struct {
	sessionIdGenerator int
	conns map[int]*websocket.Conn
}

func (s* Websocket) ClawCallback(session int, source string, msgType int, msg interface{}) {
	glog.Infof("Service.Websocket recv type=%v msg=%v", msgType, msg)
	switch msgType {
	case center.MsgTypeSystem:
		if conn, ok := msg.(*websocket.Conn); ok {
			s.sessionIdGenerator += 1
			s.conns[s.sessionIdGenerator] = conn

			s.login(s.sessionIdGenerator, conn)
		}
	}
}

func (s* Websocket) ClawStart() {
	s.conns = make(map[int]*websocket.Conn)
}

func (s* Websocket) AddClient() {
}

func (s* Websocket) login(sessionId int, conn *websocket.Conn) {
	userName := conn.Request().FormValue("user")

	recvMsg := make(chan string, 1024)
	recvErr := make(chan error)
	go func() {
		defer close(recvMsg)
		defer close(recvErr)

		var msg string
		for {
			err := websocket.Message.Receive(conn, &msg)
			if err != nil {
				recvErr <- err
				return
			}
			recvMsg <- msg
		}
	}()

	sendMsg := make(chan string, 1024)
	sendErr := make(chan error)
	go func() {
		defer close(sendErr)
		for {
			select {
			case msg, ok := <-sendMsg:
				// If the channel is closed, we kick them.
				if !ok {
					conn.Close()
					return
				}

				if err := websocket.Message.Send(conn, msg); err != nil {
					sendErr <- err
					return
				}
			}
		}
	}()

	u := user.NewUser(sessionId, userName, recvMsg, sendMsg, recvErr, sendErr)
	send("MobaWebsocket", "MobaHall", sessionId, center.MsgTypeSystem, u)
}

