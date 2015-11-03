package proto

type RoomInfo struct {
	MaxCount     int
	CurrentCount int
}

type RHRoomInfo struct {
	RoomInfo
}

type Chat struct {
	Name    string
	Content string
}

type HCChat Chat

type HCRoomInfos struct {
	Rooms map[string]*RoomInfo
}

type PlayerInfo struct {
	Name      string
	HeroID    int
	CurrentHP int
	X, Y      int
}

type RCPlayerInfos struct {
	Players []PlayerInfo
}

type RCPlayerLeave struct {
	Name string
}

type RCBattleStatus struct {
	Status string
}

type RCChooseHeroRet struct {
	Result int
}

type RCShoot struct {
	Source string
	Target string
	Harm   int
}

type RCMove struct {
	Name string
	X, Y int
}
