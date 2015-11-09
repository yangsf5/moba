package hero

import (
	"github.com/yangsf5/claw/engine/net"

	"github.com/yangsf5/moba/server/hero/effect"
	"github.com/yangsf5/moba/server/proto"
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

func DoSkill(serviceName string, srcUser, tarUser *user.User, g *net.Group, heroID, skillID int) error {
	// TODO check skill ID

	// TODO check CD time

	// TODO hurt暂时写死
	err, ret := effect.Calc("hurt", srcUser, tarUser, g, "params TODO")
	if err != nil {
		return err
	}

	msg := &proto.RCSkill{
		Source:  srcUser.Name(),
		Targets: ret.Targets,
		SkillID: skillID,
	}
	g.Broadcast([]byte(proto.Encode(serviceName, msg)))
	return nil
}
