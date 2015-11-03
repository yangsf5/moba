class ChooseHero extends eui.Group {
    private myPannel: eui.Panel;
    private choosenHero: string = null;
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
        this.myPannel.width = 600;
        this.myPannel.height = 400;
        this.addHero();
          
        this.addChild(this.myPannel);
        this.addChooseButton();
    }
          
    private addHero():void{
        var iHero: number = 0;
        for(var key in this.heroConfig){
            try {
                var hero = new Hero();
                hero.setHero(this.heroConfig[key].name, this.heroConfig[key].skin);
                hero.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseHero, this);
                hero.x = 10 + 160 * (iHero ++);
                hero.y = 50;
                
                this.herosContainer[this.heroConfig[key].name] = hero;
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
        chooseHero.x = 200;
        chooseHero.y = 300;
        chooseHero.skinName = buttonSkin;
        this.myPannel.addChild(chooseHero);
        chooseHero.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveHero, this);
    }
          
    private chooseHero(event:egret.TouchEvent):void{
        this.choosenHero = event.target.name;
        this.removeAllChoosen();
        this.select.x = 120;
        this.select.y = 120;
        this.herosContainer[this.choosenHero].addChild(this.select);         
    }
          
    private removeAllChoosen():void{
        for(var key in this.heroConfig){
            if(this.herosContainer[this.heroConfig[key].name].numChildren > 1)
                this.herosContainer[this.heroConfig[key].name].removeChild(this.select);
            }
        }
    private saveHero(event:egret.TouchEvent):void{
        if(null != this.choosenHero){
            if(this.herosContainer[this.choosenHero] != null){
                MessageCenter.send({ Service: MessageCenter.battle.getRoomService(),Type: "chooseHero",Data: 1});
                Battle.myHeroID = this.choosenHero;
                this.myPannel.removeChildren();
                this.myPannel.close();
                this.parent.removeChild(this);
            }
        }
    }
}
    
class Hero extends egret.DisplayObjectContainer{
    private heroImage: eui.Image;
    private heroName: string;
    public constructor() {
        super();
    }
    public setHero(heroName:string, skin:string):void{
        this.heroImage = new eui.Image();
        this.heroImage.source = skin;
        this.heroImage.width = 150;
        this.heroImage.height = 150;
        this.heroImage.name = heroName;
        this.addChild(this.heroImage);
        this.heroName = heroName;
    }
}
    
