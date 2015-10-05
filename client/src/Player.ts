class Player extends egret.DisplayObjectContainer {
    private hpBar:eui.ProgressBar;
    private nameText:egret.TextField;
    private shape: egret.Shape;
    
    public constructor(listener) {
        super();

        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawRect(0,0,50,50);
        shape.graphics.endFill();
        this.addChild(shape);
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            MessageCenter.sendShoot({Service:"MobaHall", Type:"shoot", Data: this.nameText.text});
            listener(event);
        }, this);
        
        this.shape = shape;
        
        this.initNameText();
        this.initHPBar();
    }
    
    private initNameText():void {
        this.nameText = new egret.TextField();
        this.nameText.textColor = 0x00ff00;
        this.nameText.text = "";
        this.nameText.size = 20;
        this.addChild(this.nameText);
    }
    
    private initHPBar():void {
        var exml =
            `<s:ProgressBar xmlns:s="http://ns.egret.com/eui">
                <s:Skin>
                    <s:Image id="thumb" width="100%" height="100%" source="resource/thumb.png" scale9Grid="1,1,4,4"/>
                    <s:Label id="labelDisplay" textColor="0xff0000" size="20" horizontalCenter="0" verticalCenter="0" percentHeight="100%" percentWidth="100%"/>
                </s:Skin>
            </s:ProgressBar>`;
        var clazz = EXML.parse(exml);
        this.hpBar = new clazz();
        this.hpBar.maximum = 9;
        this.hpBar.minimum = 0;
        this.hpBar.width = 50;
        this.hpBar.height = 20;
        this.addChild(this.hpBar);
        this.hpBar.value = 0;
    }
    
    private setPosition(x:number, y:number):void {
        this.shape.x = x;
        this.shape.y = y;
        this.nameText.x = x;
        this.nameText.y = y - 50;
        this.hpBar.x = x;
        this.hpBar.y = y - 25;
    }
    
    public update(item:any):void {
        this.nameText.text = item.name;
        this.hpBar.value = item.hp;
        
        this.setPosition(item.x, item.y);
    }
}
