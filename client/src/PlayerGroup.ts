class PlayerGroup extends eui.Group {
    private sourceData: any[];
    private dataGroup: eui.DataGroup;
    private collection: eui.ArrayCollection;
    
	public constructor() {
        super();
        this.sourceData = [];
        
        for (var i:number = 1; i < 7; i++){
            this.sourceData.push({name:"", x:0, y:0, color:0, hp:9});
        }
	}
	
    protected createChildren():void {
        var myCollection:eui.ArrayCollection = new eui.ArrayCollection(this.sourceData);
        
        var dataGroup:eui.DataGroup = new eui.DataGroup();
        dataGroup.dataProvider = myCollection;
        dataGroup.percentWidth = 100;
        dataGroup.percentHeight = 100;
        this.addChild(dataGroup);
        
        dataGroup.itemRenderer = PlayerRenderer;
        this.dataGroup = dataGroup;
        this.collection = myCollection;
    }
    
    public refixPosition():void {
        this.sourceData[0].x = this.sourceData[3].x = 100;
        this.sourceData[1].x = this.sourceData[4].x = 200;
        this.sourceData[2].x = this.sourceData[5].x = 300;
        this.sourceData[0].y = this.sourceData[1].y = this.sourceData[2].y = 250;
        this.sourceData[3].y = this.sourceData[4].y = this.sourceData[5].y = 600;
    }
    
    public updateField(index:number, key:string, value:any):void {
        var item = this.collection.getItemAt(index);
        item[key] = value;
        this.collection.replaceItemAt(item, index);
    }
}

class PlayerRenderer extends eui.ItemRenderer {
    private playerWidget: Player;
    public constructor(){
        super();
        this.touchChildren = true;
        this.playerWidget = new Player(this.onPlayerAttacked);
        this.addChild(this.playerWidget);
    }
    protected dataChanged():void{
        this.playerWidget.setPlayerName(this.data.name);
        this.playerWidget.setPosition(this.data.x, this.data.y);
        this.playerWidget.setColor(this.data.color);
        this.playerWidget.setHP(this.data.hp);
    }
    
    private onPlayerAttacked(event) {
        var shoot: Shoot = new Shoot();
        // TODO from my position
        shoot.action({ x: 200,y: 400 },{x:event.stageX, y:event.stageY}, 0xff0000);
        event.target.stage.addChild(shoot);
    }
}