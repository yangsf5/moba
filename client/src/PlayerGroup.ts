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
    
    public clearAll():void {
        this.collection.removeAll();
        this.playerIndexes = [];
    }
    
    public updateField(playerName:string, keyValues:any[]):void {
        if(this.playerIndexes[playerName] == null) {
            var item:any = { name: playerName,x: 0,y: 0,color: 0,hp: 99, flee:false};
            for(var i in keyValues) {
                var kv: any = keyValues[i];
                item[kv.key] = kv.value;
            }
            this.collection.addItem(item);
            this.playerIndexes[playerName] = this.collection.length - 1;
        } else {
            var item = this.collection.getItemAt(this.playerIndexes[playerName]);
            for(var i in keyValues) {
                var kv: any = keyValues[i];
                item[kv.key] = kv.value;
            }
            this.collection.itemUpdated(item);
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
    protected dataChanged(): void {
        var lastPosition: any = this.playerWidget.getPosition();
        var newX: number = this.data.x - lastPosition.x;
        var newY: number = this.data.y - lastPosition.y;
        egret.Tween.get(this.playerWidget,{
            loop: false
        }).to({
            x: this.data.x - lastPosition.x,
            y: this.data.y - lastPosition.y,
        },1000).call(this.onComplete, this);
        
        this.playerWidget.update(this.data);
    }
    
    private onComplete():void {
        
    }
}