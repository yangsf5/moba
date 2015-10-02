class Shoot extends egret.DisplayObjectContainer {
    private shape: egret.Shape;
    
    public constructor() {
        super();
    }
    
    public action(from:any, to:any, color:number):void {        
        var shape:egret.Shape = new egret.Shape();
        this.shape = shape;
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(from.x, from.y, 10);
        shape.graphics.endFill();
        this.addChild(shape);
        
        egret.Tween.get(shape, {
            loop: false,
            onChange: this.onChange,
            onChangeObj: this
        })
        .to({x: to.x-from.x, y: to.y-from.y}, 1000)
        .wait(100)
        .call(this.onComplete, this);
    }
    
    private onChange():void {
    }
    
    private onComplete():void {
        egret.Tween.removeTweens(this.shape);
        this.removeChild(this.shape);
    }
}
