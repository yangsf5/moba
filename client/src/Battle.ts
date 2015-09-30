class Battle extends egret.DisplayObjectContainer {
    private enemies: Array<Player>;
    private teammates: Array<Player>;
    
	public constructor() {
        super();
        
        this.enemies = new Array<Player>();
        this.teammates = new Array<Player>();
        this.init();
	}
	
	public init() {
        var enemy1: Player = new Player(100,150,0xff0000);
        var enemy2: Player = new Player(200,150,0xff0000);
        var enemy3: Player = new Player(300,150,0xff0000);
        
        this.enemies.push(enemy1);
        this.enemies.push(enemy2);
        this.enemies.push(enemy3);
        this.addChild(enemy1);
        this.addChild(enemy2);
        this.addChild(enemy3);
        
        var teammate1: Player = new Player(100,600,0x00ff00);
        var teammate2: Player = new Player(200,600,0x00ff00);
        var teammate3: Player = new Player(300,600,0x00ff00);
        
        this.teammates.push(teammate1);
        this.teammates.push(teammate2);
        this.teammates.push(teammate3);
        this.addChild(teammate1);
        this.addChild(teammate2);
        this.addChild(teammate3);
        
        var shoot: Shoot = new Shoot({ x: 200,y: 400 },{x:300, y:600}, 0xff0000);
        this.addChild(shoot);
	}
}
