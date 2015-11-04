package hero

import (
	"github.com/yangsf5/claw/engine/net"

	"github.com/yangsf5/moba/server/hero/effect"
	"github.com/yangsf5/moba/server/user"
)

type Hero struct {
}

func (h *Hero) CheckHeroID(heroID int) bool {
	//TODO
	return true
}

func (h *Hero) CheckSkillID(heroID, skillID int) bool {
	//TODO
	return true
}

func DoSkill(u *user.User, g *net.Group, heroID, skillID int) error {
	// TODO check skill ID

	// TODO check CD time

	effect.Calc("", u, g, "params TODO")
	return nil
}
