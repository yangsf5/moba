class PlayerGroup extends eui.Group {
    private collection: eui.ArrayCollection;
    
    private playerIndexes: any;
    
	public constructor() {
        super();
        
        this.playerIndexes = {};
	}
	
    protected createChildren():void {
        this.collection = new eui.ArrayCollection();
        
        var dataGroup:eui.DataGroup = new eui.DataGroup();
        dataGroup.dataProvider = this.collection;
        dataGroup.percentWidth = 100;
        dataGroup.percentHeight = 100;
        this.addChild(dataGroup);
        
        dataGroup.itemRenderer = PlayerRenderer;
    }
    
    public updateField(playerName:string, key:string, value:any):void {
        if(this.playerIndexes[playerName] == null) {
            var item:any = { name: playerName,x: 0,y: 0,color: 0,hp: 99, flee:false};
            item[key] = value;
            this.collection.addItem(item);
            this.playerIndexes[playerName] = this.collection.length - 1;
        } else {
            var item = this.collection.getItemAt(this.playerIndexes[playerName]);
            item[key] = value;
            this.collection.replaceItemAt(item, this.playerIndexes[playerName]);
        }
    }
    
    public getField(playerName:number, key:string):any {
        if(this.playerIndexes[playerName] == null) {
            return null;
        }
        
        var item = this.collection.getItemAt(this.playerIndexes[playerName]);
        return item[key];
    }
}

class PlayerRenderer extends eui.ItemRenderer {
    private playerWidget: Player;
    public constructor() {
        super();
        this.touchChildren = true;
        this.playerWidget = new Player();
        this.addChild(this.playerWidget);
    }
    protected dataChanged():void {
        this.playerWidget.update(this.data);
    }
}