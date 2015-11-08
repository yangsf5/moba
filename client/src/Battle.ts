class Battle extends egret.DisplayObjectContainer {
    public static myName: string;
    public static myHeroID: number;
    
    private isInWar: boolean = false;
    private chooseHeroPanel: ChooseHero;
    private functionBar: FunctionBar;
    private fireBattle: FireBattle;

    
    private roomList: RoomList;
    private roomCount: number;
    private roomService: string;   
    private net: Net;
    
	public constructor() {
        super();
        
        MessageCenter.battle = this;

        this.net = new Net(this);
        this.addChild(this.net);
        Battle.myName = this.net.connect();
        
        this.init();
	}
	
	private init():void {
        this.functionBar = new FunctionBar();
        this.fireBattle = new FireBattle();
	}
	
	public switchToHall(roomInfos:any):void {
    	
    	  if(this.contains(this.functionBar)){
            this.removeChild(this.functionBar);
    	  }
    	  if(this.contains(this.fireBattle)){
            this.removeChild(this.fireBattle);
    	  }
             
        this.roomCount = Object.keys(roomInfos).length;
        this.roomList = new RoomList(this, roomInfos);
            
        this.addChild(this.roomList);     
   	}

	public switchToRoom(service:string) {
        this.addChild(this.functionBar);
        if(this.roomList.parent) {
            this.roomList.parent.removeChild(this.roomList);
        }
        
        this.setRoomService(service);     
        this.functionBar.setCurrentRoomText(this.roomService);  
        this.loadChooseHero();
	}
	
	public enterWar(msgObj:any):void{
    	  if(!this.isInWar){     
            if(!this.contains(this.functionBar)){
                this.addChild(this.functionBar);
            }
            this.addChild(this.fireBattle);
            this.fireBattle.enterWar();
            this.functionBar.addSkillButton();
            this.isInWar = true;
    	  }
        this.updatePlayer(msgObj);
	}
	
	private updatePlayer(msgObj:any):void{
        for(var i = 0;i < msgObj.Data.Players.length;i++) {
            var player = msgObj.Data.Players[i];
            var skin = RES.getRes("heroConfig")[player.HeroID].skin;
            this.getPlayerGroup().updateField(player.Name, [
                { key: "hp", value: player.CurrentHP },
                { key: "x", value: player.X },
                { key: "y", value: player.Y },
                { key: "skin", value: skin }
            ]);
        }
	}
	
    private loadChooseHero():void{
        this.chooseHeroPanel = new ChooseHero();
        this.chooseHeroPanel.x = 80;
        this.chooseHeroPanel.y = 50;
        this.addChild(this.chooseHeroPanel);
    }
    
    public shoot(sourceX:number, sourceY:number, targetX:number, targetY:number):void{
        var shoot: Shoot = new Shoot();
        shoot.action({x: sourceX, y: sourceY},{x: targetX, y: targetY}, 0xff0000);
        this.addChild(shoot);
    }
	
	public getRoomCount():number {
        return this.roomCount;
	}
	
	public setBattleStatus(status:string):void {
        this.functionBar.setBattleStatusText(status);
	}
	
	public setRoomService(service:string):void {
        this.roomService = service;
	}
	
	public getRoomService():string {
        return this.roomService;
	}
	
	public getPlayerGroup():PlayerGroup {
        return this.fireBattle.getPlayerGroup();
	}
}
