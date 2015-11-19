package hero

import (
	"errors"
	"fmt"

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
	strHeroID := fmt.Sprintf("%d", heroID)
	heroConfig, ok := configs[strHeroID]
	if !ok {
		return errors.New(fmt.Sprintf("HeroID error, userName=%s heroID=%d", srcUser.Name(), heroID))
	}

	if skillID >= len(heroConfig.Skills) {
		return errors.New(fmt.Sprintf("SkillID error, userName=%s heroID=%d skillID=%d", srcUser.Name(), heroID, skillID))
	}

	// TODO check CD time

	err, ret := effect.Calc(heroConfig.Skills[skillID].EffectName, srcUser, tarUser, g, "params TODO")
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
