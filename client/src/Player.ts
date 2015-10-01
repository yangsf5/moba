class Player extends egret.DisplayObjectContainer {
    public constructor(x:number, y:number, color:number, listener) {
        super();

        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawRect(x,y,50,50);
        shape.graphics.endFill();
        this.addChild(shape);
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_TAP, listener, shape);
    }
}
