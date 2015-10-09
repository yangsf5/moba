package proto

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

type HCPlayerInfos struct {
	Players []PlayerInfo
}

type HCShoot struct {
	Source string
	Target string
	Harm   int
}

type HCBattleStatus struct {
	Status string
}
