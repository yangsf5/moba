package effect

import (
	"github.com/yangsf5/claw/engine/net"

	"github.com/yangsf5/moba/server/user"
)

type Hurt struct {
}

func (e *Hurt) Calc(u *user.User, g *net.Group, params interface{}) error {
	effUserNames := []string{}
	effFn := func(peerId string, peer net.Peer) {
		targetUser := peer.(*user.User)
		// TODO check position
		// TODO set HP
		// targetUser.SetHP()
		effUserNames = append(effUserNames, peerId)
	}
	g.Walk(effFn)

	// TODO broadcast effected
	return nil
}
