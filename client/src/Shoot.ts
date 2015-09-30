class Shoot extends egret.DisplayObjectContainer {
    public constructor(from:any, to:any, color:number) {
        super();
        
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(from.x, from.y, 10);
        shape.graphics.endFill();
        //shape.x = shape.y = 100;
        this.addChild(shape);
        
        egret.Tween.get(shape, {
            loop: true,
            onChange: this.onChange,
            onChangeObj: this
        })
        .to({x: to.x, y: to.y}, 1000)
        .wait(1000)
        .call(this.onComplete, this, ["param1", {key: "key", value: 3}]);
    }
    
    private onChange():void {
        console.log("onChange");
    }
    
    private onComplete(param1:string, param2:any):void {
        console.log("onComplete");
        console.log(param1);
        console.log(param2);
    }
}
