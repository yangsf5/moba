class MessageCenter {
    private static net: Net;
    
    public constructor() {
    }
    
    public static setNet(net:Net) {
        this.net = net;
    }
	
    public static sendShoot(msg:any):void {
        this.net.sendData(JSON.stringify(msg));
    }
}
