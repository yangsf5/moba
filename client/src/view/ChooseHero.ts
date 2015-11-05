class ChooseHero extends eui.Group {
    private myPannel: eui.Panel;
    private choosenHero: number = null;
    private select = new eui.Image();
    private herosContainer: any = [];
    private heroConfig: any;
        
    public constructor() {
        super();
    }
        
    protected createChildren() {
        super.createChildren();
        var exml = `<s:Skin class="skins.PannelSkin" xmlns:s="http://ns.egret.com/eui">
        <s:Image width="100%" height="100%" source="resource/assets/track.png" scale9Grid="1,1,4,4"/>
        <s:Group id="moveArea" width="100%" height="40">
        <s:Image width="100%" height="100%" source="resource/assets/thumb.png" scale9Grid="1,1,4,4"/>
        <s:Label id="titleDisplay" text="Title" textColor="0" horizontalCenter="0" verticalCenter="0"/>
        </s:Group>
        <s:Button id="closeButton" right="0" y="0">
        <s:Skin states="up,down,disabled">
        <s:Image width="30" height="30" source="resource/assets/close.png" scaleX.up="1" scaleX.down="0.95" scaleY.up="1" scaleY.down="0.95"/>
        </s:Skin>
        </s:Button>
        </s:Skin>`;
        this.heroConfig = RES.getRes("heroConfig");
        this.select.source = "resource/assets/select.png";
        this.myPannel = new eui.Panel();
        this.myPannel.skinName = exml;
        this.myPannel.width = 800;
        this.myPannel.height = 600;
        this.addHero();
          
        this.addChild(this.myPannel);
        this.addChooseButton();
    }
          
    private addHero():void{
        var xOffset: number = 0;
        var yOffset: number = 0;
        for(var key in this.heroConfig){
            try {
                var hero = new Hero();
                hero.setHero(parseInt(key), this.heroConfig[key].name, this.heroConfig[key].skin);
                hero.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseHero, this);
                if(10 + 160 * (xOffset + 1) > 800){//超出panel的width则换行
                    xOffset = 0;
                    yOffset++;
                }
                hero.x = 10 + 160 * (xOffset ++);
                hero.y = 50 + 150 * yOffset;
                
                this.herosContainer[key] = hero;
                this.myPannel.addChild(hero);
            }catch(e){
                            
            }
        }
    }
          
    private addChooseButton():void{
        var buttonSkin =
        `<s:Skin class="skins.ButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:s="http://ns.egret.com/eui">
        <s:Image width="100%" height="100%" scale9Grid="1,3,8,8" alpha.disabled="0.5"
        source="resource/assets/button/button_up.png"
        source.down="resource/assets/button/button_down.png"/>
        <s:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
        textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>
        <s:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/>
        </s:Skin>`;
                        
        var chooseHero = new eui.Button();
        chooseHero.height = 50;
        chooseHero.width = 100;
        chooseHero.label = "选择英雄";
        chooseHero.x = 350;
        chooseHero.y = 500;
        chooseHero.skinName = buttonSkin;
        this.myPannel.addChild(chooseHero);
        chooseHero.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveHero, this);
    }
          
    private chooseHero(event:egret.TouchEvent):void{
        this.choosenHero = event.target.parent.getHeroID();
        this.removeAllChoosen();
        this.select.x = 120;
        this.select.y = 120;
        this.herosContainer[this.choosenHero].addChild(this.select);         
    }
          
    private removeAllChoosen():void{
        for(var key in this.heroConfig){
            if(this.herosContainer[key].contains(this.select))
                this.herosContainer[key].removeChild(this.select);
            }
        }
    private saveHero(event:egret.TouchEvent):void{
        if(this.herosContainer[this.choosenHero] != null){
            MessageCenter.send({ Service: MessageCenter.battle.getRoomService(),Type: "chooseHero",Data: this.choosenHero});
            Battle.myHeroID = this.choosenHero;
            this.myPannel.removeChildren();
            this.myPannel.close();
            this.parent.removeChild(this);
        }
    }
}
    
class Hero extends egret.DisplayObjectContainer{
    private heroImage: eui.Image;
    private heroID: number;
    private nameLable: eui.Label;
    public constructor() {
        super();
    }
    public setHero(heroID:number, heroName:string, skin:string):void{
        this.heroImage = new eui.Image();
        this.heroImage.source = skin;
        this.heroImage.width = 150;
        this.heroImage.height = 150;

        this.nameLable = new eui.Label();
        this.nameLable.text = heroName;
        this.nameLable.x = 0;
        this.nameLable.y = 150;
        this.nameLable.width = 150;//设置宽度
        this.nameLable.height = 50;//设置高度
        this.nameLable.fontFamily = "Tahoma";//设置字体
        this.nameLable.textColor = 0x000000;//设置颜色
        this.nameLable.size = 15;//设置文本字号
        this.nameLable.textAlign = egret.HorizontalAlign.CENTER;
        
        this.addChild(this.heroImage);
        this.addChild(this.nameLable);
        
        this.heroID = heroID;
    }
    public getHeroID():number {
        return this.heroID;
    }
}
    
