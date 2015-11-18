package hero

import (
	"testing"
)

func TestParseConfig(t *testing.T) {
	ReadConfig("../../client/resource/config/hero.json")
}
