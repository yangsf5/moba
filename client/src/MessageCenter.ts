class MessageCenter {
    public static battle: Battle;
    
    private static net: Net;
    
    public constructor() {
    }
    
    public static setNet(net:Net) {
        this.net = net;
    }
	
    public static send(msg:any):void {
        this.net.sendData(JSON.stringify(msg));
    }
}
