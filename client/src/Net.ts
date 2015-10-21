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
    
    private onReceiveMessage(e:egret.Event):void {
        var msg:string = this.socket.readUTF();
        var msgObj = JSON.parse(msg);
        console.log("the receive msg: ",msg);
                
        if(msgObj.Type == "HCRoomInfos") {
            this.battle.switchToHall(msgObj.Data.Rooms);
        } else if(msgObj.Type == "RCPlayerInfos") {
            // TODO (重新处理) 这里当前处理不好，就暂时将所有的清除，包括离开的玩家
            this.battle.getPlayerGroup().clearAll();
            var cnt = msgObj.Data.Players.length;
            for(var i = 0;i < cnt; i++) {
                var player = msgObj.Data.Players[i];
                this.battle.getPlayerGroup().updateField(player.Name,[{ key: "hp",value: player.CurrentHP },{ key: "x",value: player.X },{key:"y", value:player.Y}]);
            }
        } else if(msgObj.Type == "RCShoot") {
            var targetName = msgObj.Data.Target;
            var targetX, targetY = 0;

            this.battle.getPlayerGroup().updateField(targetName, [{ key: "hp",value: msgObj.Data.Harm }]);
            targetX = this.battle.getPlayerGroup().getField(targetName, "x");
            targetY = this.battle.getPlayerGroup().getField(targetName, "y");

            
            var sourceName = msgObj.Data.Source;
            var sourceX = this.battle.getPlayerGroup().getField(sourceName, "x");
            var sourceY = this.battle.getPlayerGroup().getField(sourceName, "y");
            
            var shoot: Shoot = new Shoot();
            shoot.action({x: sourceX+25, y: sourceY+25},{x: targetX+25, y: targetY+25}, 0xff0000);
            this.addChild(shoot);
        } else if(msgObj.Type == "RCBattleStatus") {
            this.battle.setBattleStatus(msgObj.Data.Status);
        } else if(msgObj.Type == "RCMove") {
            var data = msgObj.Data;
            this.battle.getPlayerGroup().updateField(data.Name, [{ key: "x",value: data.X },{key:"y", value: data.Y}]);
        }
    }
}