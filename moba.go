package main

import (
	"time"

	"github.com/golang/glog"
	"github.com/yangsf5/claw/center"
	"github.com/yangsf5/claw/service"

//	myService "github.com/yangsf5/moba/app/service"
)

var (
)

func main() {
	glog.Info("MOBA start!")

	service.Register()
//	myService.Register()

	center.Use([]string{"Error"})

	for {
		time.Sleep(100 * time.Millisecond)
	}

	glog.Info("MOBA exit!")
	glog.Flush()
}

