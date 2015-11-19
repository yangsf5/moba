class FunctionBar extends egret.DisplayObjectContainer{
    private currentRoomText: egret.TextField;
    private battleStatusText: egret.TextField;
    private skillButton: any = [];
    
    private roomList: RoomList;
    private roomCount: number;
    private roomService: string;
    public constructor() {
        super();
        this.initCurrentRoomText();
        this.initBattleStatusText();
        this.addChild(this.currentRoomText);
        this.addChild(this.battleStatusText);
    }
    
    public setCurrentRoomText(roomText:string):void {
        this.currentRoomText.text = roomText;
    }
    
    public setBattleStatusText(status:string):void {
        this.battleStatusText.text = status;
    }
	
    private initCurrentRoomText():void {
        this.currentRoomText = new egret.TextField();
        this.currentRoomText.text = "";
    }
    
    private initBattleStatusText():void {
        this.battleStatusText = new egret.TextField();
        this.battleStatusText.x = 200;
        this.battleStatusText.y = 20;
        this.battleStatusText.text = "waiting";
    }
    	
    public addSkillButton():void{
        var exml = `<s:Skin class="skins.ButtonSkin" states="up,down,disabled" xmlns:s="http://ns.egret.com/eui">
        <s:Image width="100%" height="100%" scale9Grid="1,3,8,8" alpha.disabled="0.5"
        source="resource/assets/button/button_up.png"
        source.down="resource/assets/button/button_down.png"/>
        <s:Label id="labelDisplay" top="0" bottom="0" left="0" right="0"
        textColor="0xFFFFFF" verticalAlign="middle" textAlign="center" size="15"/>
        <s:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/>
        </s:Skin>`;
        var myHero = RES.getRes("heroConfig");
        var skills = myHero[Battle.myHeroID].skills;
                
        for(var key in skills){
            this.skillButton[key] = skills[key];
            var newButton = new eui.Button();
            newButton.skinName = exml;
            newButton.label = skills[key].name;
            newButton.width = 80;
            newButton.height = 40;
            newButton.x = 800 - key * 100;
            newButton.y = 570;
            this.addChild(newButton);
            this.skillButton["button"] = newButton;
            
            newButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.genListenFunction(parseInt(key)), this);
        }
    }
    
    private genListenFunction(value:number) {
        return function(e) {
            MessageCenter.send({ Service: MessageCenter.battle.getRoomService(), Type: "skill", Data: value });
        }
    }
    
    public getRoomCount():number {
        return this.roomCount;
    }
        	
    public setBattleStatus(status:string):void {
        this.battleStatusText.text = status;
    }
        	
    public setRoomService(service:string):void {
        this.roomService = service;
    }
        	
    public getRoomService():string {
        return this.roomService;
    }
}
