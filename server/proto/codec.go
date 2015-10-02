package proto

import (
	"encoding/json"
	"reflect"
)

type Pack struct {
	Service string
	Type string
	Data interface{}
}

func Encode(service string, v interface{}) string {
	msgName := reflect.TypeOf(v).String()
	msgName = msgName[7:] //TODO better way to remove *proto.

	pack := &Pack{service, msgName, v}
	b, err := json.Marshal(pack)
	if err != nil {
		panic(err)
	}
	return string(b)
}

func Decode(str string) *Pack {
	pack := &Pack{}
	if err := json.Unmarshal([]byte(str), pack); err != nil {
		panic(err)
	}
	return pack
}
