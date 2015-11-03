class Battle extends egret.DisplayObjectContainer {
    public static myName: string;
    public static myHeroID: number;
    private isInWar: boolean = false;
    
    private roomList: RoomList;
    private roomCount: number;
    private roomService: string;
    
    private net: Net;
    
    private playerGroup: PlayerGroup;
    
    private currentRoomText: egret.TextField;
    private battleStatusText: egret.TextField;
    
    private chooseHeroPanel: ChooseHero;
    private chooseHeroButton: eui.Button;
    
	public constructor() {
        super();
        
        MessageCenter.battle = this;

        this.initPlayers();
        this.net = new Net(this);
        this.addChild(this.net);
        Battle.myName = this.net.connect();
        
        this.initCurrentRoomText();
        this.initBattleStatusText();
	}
	
	private initCurrentRoomText():void {
        this.currentRoomText = new egret.TextField();
        this.currentRoomText.text = "";
	}
	
	private initBattleStatusText():void {
        this.battleStatusText = new egret.TextField();
        this.battleStatusText.x = 200;
        this.battleStatusText.y = 50;
        this.battleStatusText.text = "waiting";
	}
	
    private initPlayers(): void {
        this.playerGroup = new PlayerGroup();
    }
	
	public switchToHall(roomInfos:any):void {
        if(this.currentRoomText.parent) {
            this.currentRoomText.parent.removeChild(this.currentRoomText);
        }
        if(this.battleStatusText.parent) {
            this.battleStatusText.parent.removeChild(this.battleStatusText);
        }
    	  if(this.playerGroup.parent) {
            this.playerGroup.parent.removeChild(this.playerGroup);
        }
             
        this.roomCount = Object.keys(roomInfos).length;
        this.roomList = new RoomList(this, roomInfos);
            
        this.addChild(this.roomList);     
   	}
   	

	
	public switchToRoom(service:string) {
        if(this.roomList.parent) {
            this.roomList.parent.removeChild(this.roomList);
        }
        
        this.setRoomService(service);
        
        this.currentRoomText.text = this.roomService;
        this.addChild(this.currentRoomText);
        this.addChild(this.battleStatusText);     

        this.addChooseButton();
	}
	
	public enterWar():void{
    	  if(!this.isInWar){
            if(this.chooseHeroButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.chooseHeroButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loadChooseHero, this);
            }
            if(this.contains(this.chooseHeroButton)) {
                this.removeChild(this.chooseHeroButton);
            }
            
            this.addChild(this.playerGroup);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shootOrMove, this);
            this.isInWar = true;
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
        
        this.chooseHeroButton = new eui.Button();
        this.chooseHeroButton.height = 100;
        this.chooseHeroButton.width = 100;
        this.chooseHeroButton.label = "选择英雄";
        this.chooseHeroButton.x = 400;
        this.chooseHeroButton.y = 400;
        this.chooseHeroButton.skinName = buttonSkin;
        this.addChild(this.chooseHeroButton);
        this.chooseHeroButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loadChooseHero, this);
	}
	
    private loadChooseHero(event:egret.TouchEvent):void{
        this.chooseHeroPanel = new ChooseHero();
        this.chooseHeroPanel.x = 100;
        this.chooseHeroPanel.y = 50;
        this.addChild(this.chooseHeroPanel);
    }
	
    private shootOrMove(event:egret.TouchEvent):void {
        var isShoot: boolean = false;
        this.playerGroup.walkPlayers(function(target: any) {
            if(null != target && target.hp > 0 && !target.flee && target.name != Battle.myName) {
                if(Math.abs(target.x - event.stageX) < Player.TANK_OFFSET
                    && Math.abs(target.y - event.stageY) < Player.TANK_OFFSET) {
                    MessageCenter.send({ Service: MessageCenter.battle.getRoomService(),Type: "shoot",Data: target.name });
                    isShoot = true;//点击到其他坦克的区域则视为攻打坦克
                }
            }          
        });
        //没有攻打到坦克，则移动.已阵亡的玩家不再移动
        if(!isShoot && this.playerGroup.isMyselfAlive()){
            MessageCenter.send({ Service: MessageCenter.battle.getRoomService(),Type: "move",Data: event.stageX + ',' + event.stageY});
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
	
	public getPlayerGroup():PlayerGroup {
        return this.playerGroup;
	}
}
