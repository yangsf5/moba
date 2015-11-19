package main

import (
	"fmt"
	"time"

	"github.com/golang/glog"
	"github.com/yangsf5/claw/center"
	"github.com/yangsf5/claw/service"

	"github.com/yangsf5/moba/server/handler"
	"github.com/yangsf5/moba/server/hero"
	myService "github.com/yangsf5/moba/server/service"
	"github.com/yangsf5/moba/server/service/room"
)

var ()

func main() {
	glog.Info("MOBA server start!")

	service.Register()
	myService.Register()

	handler.RegisterHandler()

	hero.ReadConfig("client/resource/config/hero.json")

	willUseServices := []string{"Error", "Web", "MobaWebsocket", "MobaHall"}

	for i := 1; i <= room.RoomCount; i++ {
		name := fmt.Sprintf("MobaRoom%d", i)
		willUseServices = append(willUseServices, name)
	}
	center.Use(willUseServices)

	for {
		time.Sleep(100 * time.Millisecond)
	}

	glog.Info("MOBA server exit!")
	glog.Flush()
}
