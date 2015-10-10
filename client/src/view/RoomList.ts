class RoomList extends egret.Sprite {
	public constructor() {
        super();
        
        this.initRadioButtonWithGroup();
	}
	
    private initRadioButtonWithGroup():void {
        var skinExml =
            `<s:Skin class="skins.RadioButtonSkin" states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected" xmlns:s="http://ns.egret.com/eui">
                <s:Image includeIn="disabledAndSelected" source="resource/assets/radio_button/radiobutton_select_disabled.png"/>
                <s:Image includeIn="downAndSelected" source="resource/assets/radio_button/radiobutton_select_down.png"/>
                <s:Image includeIn="upAndSelected" source="resource/assets/radio_button/radiobutton_select_up.png"/>
                <s:Image includeIn="up,down,disabled" source="resource/assets/radio_button/radiobutton_unselect.png"/>
                <s:Label x="38" id="labelDisplay" textColor="0xffffff" size="18"/>
            </s:Skin>`;
        var clazz = EXML.parse(skinExml);
        
        var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
        
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        var rdb: eui.RadioButton = new eui.RadioButton();
        //rdb.x = 50;
        rdb.y = 400;
        rdb.label = "选择我1";
        rdb.skinName = clazz;
        
        rdb.value = 145;
        rdb.group = radioGroup;
        this.addChild(rdb);
        var rdb2: eui.RadioButton = new eui.RadioButton();
        rdb2.skinName = clazz;
        rdb2.y = 430;
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
