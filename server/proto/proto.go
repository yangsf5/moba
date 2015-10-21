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
	CurrentHP int
	X, Y      int
}

type RCPlayerInfos struct {
	Players []PlayerInfo
}

type RCBattleStatus struct {
	Status string
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
