package proto

type Chat struct {
	Name string
	Content string
}

type HCChat Chat

type HCTeamMember struct {
	Members []string
}

type HCShoot struct {
	Source string
	Target string
	Harm int
}
