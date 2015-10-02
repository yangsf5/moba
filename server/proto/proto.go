package proto

type Chat struct {
	Name string
	Content string
}

type HCChat Chat

type Room struct {
	Name string
	OnlineCount int
	Href string
}

type HCRoomList struct {
	Rooms []Room
}

type HCEnter struct {
	RoomName string
}
