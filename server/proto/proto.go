package proto

type RHPlayerCount struct {
	MaxCount     int
	CurrentCount int
}

type Chat struct {
	Name    string
	Content string
}

type HCChat Chat

type HCRoomCount struct {
	Count int
}

type PlayerInfo struct {
	Name      string
	CurrentHP int
}

type RCPlayerInfos struct {
	Players []PlayerInfo
}

type RCShoot struct {
	Source string
	Target string
	Harm   int
}

type RCBattleStatus struct {
	Status string
}
