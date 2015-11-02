class RoomList extends egret.Sprite {
    private battle: Battle;
    private roomInfos: any;
    
    private skin;
    
	public constructor(battle:Battle, roomInfos:any) {
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
        
        this.roomInfos = roomInfos;
        this.initRadioButtonWithGroup();
	}
	
    private initRadioButtonWithGroup(): void {
        var scrollerSkin =
            `<s:Skin xmlns:s="http://ns.egret.com/eui">
                <s:VScrollBar id="verticalScrollBar" width="30" height="100%" right="0">
                <s:Skin>
                <s:Image width="100%" height="100%" source="resource/assets/track.png" scale9Grid="1,1,4,4"/>
                <s:Image id="thumb" width="30" height="30" source="resource/assets/thumb.png"  scale9Grid="1,1,4,4"/>
                </s:Skin>
                </s:VScrollBar>
            </s:Skin>`;
        var group = new eui.Group();
        var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        
        for(var i = 1;i <= this.battle.getRoomCount(); i++) {
            var roomInfo: any = this.roomInfos["MobaRoom" + i];
            var item: eui.RadioButton = new eui.RadioButton();
            item.x = 50;
            item.y = i * 30;
            item.setMeasuredSize(40,30);
            item.label = "room" + i + "  (" + roomInfo.CurrentCount + "/" + roomInfo.MaxCount + ")";
            item.skinName = this.skin;
            item.value = i;
            item.group = radioGroup;
            group.addChild(item);
        }
        var scrollar = new eui.Scroller();
        scrollar.width = 400;
        scrollar.height = 600;
        scrollar.viewport = group;
        scrollar.skinName = scrollerSkin;
        scrollar.throwSpeed = 100;
        scrollar.scrollPolicyV = eui.ScrollPolicy.ON;
        scrollar.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.addChild(scrollar);
    }
    
    private radioChangeHandler(evt:eui.UIEvent):void {
        var roomService = "MobaRoom" + evt.target.selectedValue;
        this.battle.switchToRoom(roomService);
        MessageCenter.send({Service:"MobaHall", Type:"enterRoom", Data: roomService});
    }
}
