package handler

import (
	"github.com/yangsf5/claw/service/web"
)

func RegisterHandler() {
	web.RegisterWebSocketHandler("/socket", socketHandler)
	web.StaticDirHandler("/", "./public/")
}
