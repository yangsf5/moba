class Battle extends egret.DisplayObjectContainer {
    private myName: string;
    private enemies: Array<Player>;
    private teammates: Array<Player>;
    private net: Net;
    
	public constructor() {
        super();
        
        this.enemies = new Array<Player>();
        this.teammates = new Array<Player>();
        this.net = new Net(this);
        this.myName = this.net.connect();
        this.init();
	}
	
	public init() {
        var enemy1: Player = new Player(100,250,0xff0000, this.onPlayerAttacked);
        var enemy2: Player = new Player(200,250,0xff0000, this.onPlayerAttacked);
        var enemy3: Player = new Player(300,250,0xff0000, this.onPlayerAttacked);
        enemy1.setPlayerName(this.myName);
        
        this.enemies.push(enemy1);
        this.enemies.push(enemy2);
        this.enemies.push(enemy3);
        this.addChild(enemy1);
        this.addChild(enemy2);
        this.addChild(enemy3);
        
         
        var teammate1: Player = new Player(100,600,0x00ff00, this.onPlayerAttacked);
        var teammate2: Player = new Player(200,600,0x00ff00, this.onPlayerAttacked);
        var teammate3: Player = new Player(300,600,0x00ff00, this.onPlayerAttacked);
        
        this.teammates.push(teammate1);
        this.teammates.push(teammate2);
        this.teammates.push(teammate3);
        this.addChild(teammate1);
        this.addChild(teammate2);
        this.addChild(teammate3);
        
        
	}
	
	private onPlayerAttacked(event) {
        var shoot: Shoot = new Shoot();
        shoot.action({ x: 200,y: 400 },{x:event.stageX, y:event.stageY}, 0xff0000);
        event.target.stage.addChild(shoot);
	}
}
