package main

import (
	"time"

	"github.com/golang/glog"
	"github.com/yangsf5/claw/center"
	"github.com/yangsf5/claw/service"

	"github.com/yangsf5/moba/server/handler"
	myService "github.com/yangsf5/moba/server/service"
)

var (
)

func main() {
	glog.Info("MOBA server start!")

	service.Register()
	myService.Register()

	handler.RegisterHandler()

	center.Use([]string{"Error", "Web", "MobaWebsocket", "MobaHall"})

	for {
		time.Sleep(100 * time.Millisecond)
	}

	glog.Info("MOBA server exit!")
	glog.Flush()
}

