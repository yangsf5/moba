package effect

import (
	"github.com/yangsf5/claw/engine/net"

	"github.com/yangsf5/moba/server/user"
)

type Hurt struct {
}

func (e *Hurt) Calc(srcUser, tarUser *user.User, g *net.Group, params interface{}) (error, *Return) {
	effUserNames := []string{}
	effFn := func(peerId string, peer net.Peer) {
		targetUser := peer.(*user.User)
		// TODO check position
		// TODO set HP
		hp := targetUser.GetHP()
		targetUser.SetHP(hp - 3) // TODO set from params
		effUserNames = append(effUserNames, peerId)
	}
	g.Walk(effFn)

	return nil, &Return{Targets: effUserNames}
}
