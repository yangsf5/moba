class Net extends egret.DisplayObjectContainer {
    private socket:egret.WebSocket;
    
    private battle: Battle;
    
    public constructor(battle:Battle) {
        super();
        this.battle = battle;
        
        MessageCenter.setNet(this);
    }
    
    public connect():string {
        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_STRING;
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        
        var chars = "abcdefghijklmnopqrstuvwzxy1234567890";
        var name: string = "";
        for(var i = 0;i < 5;i++) {
            var index = Math.round(Math.random() * 35);
            name += chars[index];
        }
        
        this.socket.connectByUrl("ws://127.0.0.1:2015/socket?user=" + name);
        return name;
    }
    
    public sendData(msg:string):void {
        this.socket.writeUTF(msg);
    }
    
    private onSocketOpen():void {
        console.log("connect server ok");
    }
    
    private onSocketClose():void {
        console.log("disconnected from server");
    }
    
    private onSocketError():void {
        console.log("WebSocketError");
    }
    
    private indexs: any[];
    private onReceiveMessage(e:egret.Event):void {
        var msg:string = this.socket.readUTF();
        var msgObj = JSON.parse(msg);
        if(msgObj.Type == "HCRoomInfos") {
            this.battle.switchToHall(msgObj.Data.Rooms);
        } else if(msgObj.Type == "RCPlayerInfos") {
            this.battle.switchToRoom();
            this.indexs = [];
            var cnt = msgObj.Data.Players.length;
            if(cnt > 6) {
                cnt = 6;
            }
            for(var i = 0;i < cnt; i++) {
                var player = msgObj.Data.Players[i];
                this.battle.getPlayerGroup().updateField(i, "name", player.Name);
                this.battle.getPlayerGroup().updateField(i, "hp", player.CurrentHP);
                this.indexs[player.Name] = i;
            }
        } else if(msgObj.Type == "RCShoot") {
            var targetIndex = this.indexs[msgObj.Data.Target];
            var targetX, targetY = 0;
            if(targetIndex != null) {
                this.battle.getPlayerGroup().updateField(targetIndex, "hp", msgObj.Data.Harm);
                targetX = this.battle.getPlayerGroup().getField(targetIndex, "x");
                targetY = this.battle.getPlayerGroup().getField(targetIndex, "y");
                
            }
            
            var sourceIndex = this.indexs[msgObj.Data.Source];
            if(sourceIndex != null) {
                var sourceX = this.battle.getPlayerGroup().getField(sourceIndex, "x");
                var sourceY = this.battle.getPlayerGroup().getField(sourceIndex, "y");
                
                var shoot: Shoot = new Shoot();
                shoot.action({x: sourceX+25, y: sourceY+25},{x: targetX+25, y: targetY+25}, 0xff0000);
                this.addChild(shoot);
            }
        } else if(msgObj.Type == "RCBattleStatus") {
            this.battle.setBattleStatus(msgObj.Data.Status);
        }
        console.log(msg);
    }
}