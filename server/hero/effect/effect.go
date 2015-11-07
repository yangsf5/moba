package effect

import (
	"errors"
	"github.com/yangsf5/claw/engine/net"

	"github.com/yangsf5/moba/server/user"
)

type Return struct {
	Targets []string
}

type Effect interface {
	Calc(srcUser, tarUser *user.User, g *net.Group, params interface{}) (error, *Return)
}

var (
	effects map[string]Effect
)

func init() {
	effects = make(map[string]Effect)
	effects["freeze"] = &Freeze{}
}

func Calc(effectName string, srcUser, tarUser *user.User, g *net.Group, params interface{}) (error, *Return) {
	eff, ok := effects[effectName]
	if !ok {
		return errors.New("not found effect"), nil
	}

	return eff.Calc(srcUser, tarUser, g, params)
}
