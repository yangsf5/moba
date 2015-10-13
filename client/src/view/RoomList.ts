class RoomList extends egret.Sprite {
    private battle: Battle;
    
    private skin;
    
	public constructor(battle:Battle) {
        super();
        
        var skinExml =
            `<s:Skin class="skins.RadioButtonSkin" states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected" xmlns:s="http://ns.egret.com/eui">
                <s:Image includeIn="disabledAndSelected" source="resource/assets/radio_button/radiobutton_select_disabled.png"/>
                <s:Image includeIn="downAndSelected" source="resource/assets/radio_button/radiobutton_select_down.png"/>
                <s:Image includeIn="upAndSelected" source="resource/assets/radio_button/radiobutton_select_up.png"/>
                <s:Image includeIn="up,down,disabled" source="resource/assets/radio_button/radiobutton_unselect.png"/>
                <s:Label x="38" id="labelDisplay" textColor="0xffffff" size="18"/>
            </s:Skin>`;
        this.skin = EXML.parse(skinExml);
        
        this.battle = battle;
        this.initRadioButtonWithGroup();
	}
	
    private initRadioButtonWithGroup():void {
        var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        
        for(var i = 1;i <= this.battle.getRoomCount(); i++) {
            var item: eui.RadioButton = new eui.RadioButton();
            item.x = 50;
            item.y = i * 30;
            item.label = "room" + i;
            item.skinName = this.skin;
            item.value = i;
            item.group = radioGroup;
            this.addChild(item);
        }
    }
    
    private radioChangeHandler(evt:eui.UIEvent):void {
        var roomService = "MobaRoom" + evt.target.selectedValue;
        this.battle.setRoomService(roomService);
        MessageCenter.sendShoot({Service:"MobaHall", Type:"enterRoom", Data: roomService});
    }
}
