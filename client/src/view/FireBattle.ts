class FireBattle extends egret.DisplayObjectContainer {
    private playerGroup: PlayerGroup;
    private backGround: egret.Shape;
    public constructor() {
        super();
        this.init();
    }
    
    public init():void{
        this.backGround = new egret.Shape();
        this.playerGroup = new PlayerGroup();
        this.addChild(this.backGround);
        this.addChild(this.playerGroup);
    }
    public setBackGround():void{
        this.backGround.graphics.beginFill(0x000000);
        this.backGround.graphics.drawRect(0,30,this.stage.stageWidth,500);
        this.backGround.graphics.endFill();
        this.backGround.x = 0;
        this.backGround.y = 30;
    }
    public getPlayerGroup():PlayerGroup {
        return this.playerGroup;
    }
    public enterWar():void {
        this.setBackGround();
        this.backGround.touchEnabled = true;
        this.backGround.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shootOrMove, this);
    }
    private shootOrMove(event:egret.TouchEvent):void {
        if(this.playerGroup.isMyselfAlive()){
            MessageCenter.send({ Service: MessageCenter.battle.getRoomService(),Type: "move",Data: event.stageX + ',' + event.stageY});
        }
    }
}
