class Player extends egret.DisplayObjectContainer {
    private hpBar:eui.ProgressBar;
    private nameText:egret.TextField;
    
    public constructor(x:number, y:number, color:number, listener) {
        super();

        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawRect(x,y,50,50);
        shape.graphics.endFill();
        this.addChild(shape);
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            MessageCenter.sendShoot({Service:"MobaHall", Type:"shoot", Data: this.nameText.text});
            listener(event);
        }, this);
        
        this.initNameText(x, y, color);
        this.initHPBar(x, y, color);
    }
    
    private initNameText(x:number, y:number, color:number):void {
        this.nameText = new egret.TextField();
        this.nameText.textColor = color;
        this.nameText.text = "";
        this.nameText.size = 20;
        this.nameText.x = x;
        this.nameText.y = y - 50;
        this.addChild(this.nameText);
    }
    
    private initHPBar(x:number, y:number, color:number):void {
        var exml =
            `<s:ProgressBar xmlns:s="http://ns.egret.com/eui">
                <s:Skin>
                    <s:Image id="thumb" width="100%" height="100%" source="resource/thumb.png" scale9Grid="1,1,4,4"/>
                    <s:Label id="labelDisplay" textColor="${color}" size="20" horizontalCenter="0" verticalCenter="0" percentHeight="100%" percentWidth="100%"/>
                </s:Skin>
            </s:ProgressBar>`;
        var clazz = EXML.parse(exml);
        this.hpBar = new clazz();
        this.hpBar.maximum = 9;
        this.hpBar.minimum = 0;
        this.hpBar.width = 50;
        this.hpBar.height = 20;
        this.hpBar.x = x;
        this.hpBar.y = y-25;
        this.addChild(this.hpBar);
        this.hpBar.value = 9;
    }
    
    public setPlayerName(name:string):void {
        this.nameText.text = name;
    }
}
