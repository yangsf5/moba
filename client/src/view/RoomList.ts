class RoomList extends egret.DisplayObjectContainer {
	public constructor() {
        super();
        
        this.initRadioButtonWithGroup();
	}
	
    private initRadioButtonWithGroup():void {
        var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
        
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        var rdb: eui.RadioButton = new eui.RadioButton();
        rdb.x = 50;
        rdb.y = 400;
        rdb.label = "选择我1";
        
        rdb.value = 145;
        rdb.group = radioGroup;
        this.addChild(rdb);
        var rdb2: eui.RadioButton = new eui.RadioButton();
        rdb2.y = 30;
        rdb2.label = "选择我2";
        rdb2.value = 272;
        rdb2.selected = true;//默认选项
        rdb2.group = radioGroup;
        this.addChild(rdb2);
        console.log("roomlist");
    }
    
    private radioChangeHandler(evt:eui.UIEvent):void {
        var radioGroup: eui.RadioButtonGroup = evt.target;
        console.log(radioGroup.selectedValue);
    }
}
