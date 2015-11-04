package effect

import (
	"errors"
	"github.com/yangsf5/claw/engine/net"

	"github.com/yangsf5/moba/server/user"
)

type Effect interface {
	Calc(u *user.User, g *net.Group, params interface{}) error
}

var (
	effects map[string]Effect
)

func init() {
	effects = make(map[string]Effect)
	effects["freeze"] = &Freeze{}
}

func Calc(effectName string, u *user.User, g *net.Group, params interface{}) error {
	eff, ok := effects[effectName]
	if !ok {
		return errors.New("not found effect")
	}

	return eff.Calc(u, g, params)
}
