package hero

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

type HeroConfig struct {
	Name   string        `json:"name"`
	Skin   string        `json:"skin"`
	Skills []SkillConfig `json:"skills"`
}

type SkillConfig struct {
	Name         string `json:"name"`
	Desc         string `json:"desc"`
	EffectName   string `json:"effectName"`
	EffectParams string `json:"effectParams"`
}

var (
	configs map[string]HeroConfig
)

func init() {
	configs = make(map[string]HeroConfig)
}

func ReadConfig(fileName string) {
	content, err := ioutil.ReadFile(fileName)
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(content, &configs)
	if err != nil {
		panic(err)
	}

	fmt.Println(configs)
}
