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
        
        this.socket.connectByUrl("ws://127.0.0.1:2015?user=" + name);
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
        if(msgObj.Type == "HCTeamMember") {
            this.indexs = [];
            for(var i = 0;i < 6; i++) {
                var name = msgObj.Data.Members[i];
                this.battle.getPlayerGroup().updateField(i, "name", name);
                this.indexs[name] = i;
            }
        } else if(msgObj.Type == "HCShoot") {
            var name = msgObj.Data.Target;
            var index = this.indexs[name];
            if(index != null) {
                this.battle.getPlayerGroup().updateField(index, "hp", msgObj.Data.Harm);
            }
        } else if(msgObj.Type == "HCBattleStatus") {
            this.battle.setBattleStatus(msgObj.Data.Status);
        }
        console.log(msg);
    }
}