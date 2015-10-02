package proto

import (
	"fmt"
	"testing"
)

type data struct {
	V1 int
	V2 string
}

func TestCodec(t *testing.T) {
	// Encode
	d := &data{12, "haha"}
	str := Encode(d)
	fmt.Println(d, str)

	// Decode
	d2 := Decode(str)
	if d2.Type != "data" {
		t.Fail()
	}
	fmt.Println(d2)
}
