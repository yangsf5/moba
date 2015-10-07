package script

import (
	"fmt"

	"github.com/qiniu/py"
)

func init() {
}

type FooModule struct {
}

func (r *FooModule) Py_bar(args *py.Tuple) (ret *py.Base, err error) {
	var i int
	var s string
	err = py.Parse(args, &i, &s)
	if err != nil {
		return
	}
	fmt.Println("call foo.bar:", i, s)
	return py.IncNone(), nil
}

func (r *FooModule) Py_bar2(args *py.Tuple) (ret *py.Base, err error) {
	var i int
	var s []string
	err = py.ParseV(args, &i, &s)
	if err != nil {
		return
	}
	fmt.Println("call foo.bar2:", i, s)
	return py.IncNone(), nil
}


//func InitGoModule(name string, module interface{}) error {
func InitGoModule(name string) error {
	mod, err := py.NewGoModule(name, "", new(FooModule))
	if err != nil {
		return err
	}
	defer mod.Decref()

	// TODO register go modules

	return nil
}

const pyCode = `

import foo
foo.bar(1, 'Hello')
foo.bar2(1, 'Hello', 'world!')
`

func ExecPythonFile(fileName string) error {
	gomod, err := py.NewGoModule("foo", "", new(FooModule))
	if err != nil {
		return err
	}
	defer gomod.Decref()


	//InitGoModule("foo")
	fmt.Println(fileName)
	code, err := py.Compile(pyCode, "", py.FileInput)
	//code, err := py.CompileFile(fileName, py.FileInput)
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer code.Decref()

	mod, err := py.ExecCodeModule("test", code.Obj())
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer mod.Decref()
	return nil
}
