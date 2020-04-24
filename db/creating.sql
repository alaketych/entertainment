create table State(
	ID int not null identity,
	Name nvarchar(20) not null,
	CapitalCity nvarchar(30) not null,
	LargestCity nvarchar(30) null,
	Admission nvarchar(20) null,
	Population nvarchar(20) not null,

	primary key(ID),
)

create table Team(
	ID int not null identity,
	Name nvarchar(30) not null,
	Conference nvarchar(10) not null,
	Division nvarchar(20) not null,
	Founder int not null,
	Arena nvarchar(50) not null,
	MainSponsor nvarchar(50) not null,
	President nvarchar(75) not null,
	GeneralManager nvarchar(75) not null,
	Headcoach nvarchar(75) not null,

	primary key(ID)
)

create table Stadium(
	ID int not null identity,
	Name nvarchar(100) not null,
	Adress nvarchar(200) not null,
	Owner nvarchar(200) not null

	primary key(ID)
)

create table Player(
	ID int not null identity,
	Name nvarchar(75) not null,
	Position nvarchar(2) not null,
	Height nvarchar(5) not null,
	Weight int not null,
	Age int not null,
	CurrentTeam nvarchar(50) not null,
	PreDraftTeam nvarchar(50) not null,
	Drafted nvarchar(50) not null,
	Nationality nvarchar(20) not null

	primary key(id)
)