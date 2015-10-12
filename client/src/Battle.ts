class Battle extends egret.DisplayObjectContainer {
    public static myName: string;
    public static myX: number;
    public static myY: number;
    
    private roomList: RoomList;
    
    private net: Net;
    
    private playerGroup: PlayerGroup;
    
    private battleStatusText: egret.TextField;
    
	public constructor() {
        super();

        this.initPlayers();
        this.net = new Net(this);
        this.addChild(this.net);
        Battle.myName = this.net.connect();
        this.initBattleStatusText();
        
                
        this.roomList = new RoomList();
	}
	
	private initBattleStatusText():void {
        this.battleStatusText = new egret.TextField();
        this.battleStatusText.x = 200;
        this.battleStatusText.y = 50;
        this.battleStatusText.text = "waiting";
	}
	
	private initPlayers():void {
        this.playerGroup = new PlayerGroup();
        this.playerGroup.refixPosition();
	}
	
	private onPlayerAttacked(event) {
        var shoot: Shoot = new Shoot();
        shoot.action({ x: 200,y: 400 },{x:event.stageX, y:event.stageY}, 0xff0000);
        event.target.stage.addChild(shoot);
	}
	
	public switchToHall():void {
    	  if(this.playerGroup.parent) {
            this.playerGroup.parent.removeChild(this.playerGroup);
        }
        if(this.battleStatusText.parent) {
            this.battleStatusText.parent.removeChild(this.battleStatusText);
        }
                      
        this.addChild(this.roomList);
   	}
	
	public switchToRoom() {
    	  if(this.roomList.parent) {
            this.roomList.parent.removeChild(this.roomList);
    	  }
        this.removeChild(this.roomList);
        
        this.addChild(this.playerGroup);
        this.addChild(this.battleStatusText);
	}
	
	public setBattleStatus(status:string):void {
        this.battleStatusText.text = status;
	}
	
	public getPlayerGroup():PlayerGroup {
        return this.playerGroup;
	}
}
