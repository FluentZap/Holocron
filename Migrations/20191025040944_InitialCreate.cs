using Microsoft.EntityFrameworkCore.Migrations;

namespace Holocron.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Characteristics",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    BR = table.Column<int>(nullable: false),
                    AG = table.Column<int>(nullable: false),
                    INT = table.Column<int>(nullable: false),
                    CUN = table.Column<int>(nullable: false),
                    WIL = table.Column<int>(nullable: false),
                    PR = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Characteristics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Name = table.Column<string>(nullable: true),
                    ConnectionId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    ASTRO = table.Column<int>(nullable: false),
                    ATHL = table.Column<int>(nullable: false),
                    BRAWL = table.Column<int>(nullable: false),
                    CHARM = table.Column<int>(nullable: false),
                    COERC = table.Column<int>(nullable: false),
                    COMP = table.Column<int>(nullable: false),
                    COOL = table.Column<int>(nullable: false),
                    COORD = table.Column<int>(nullable: false),
                    CORE = table.Column<int>(nullable: false),
                    CYBERNETICS = table.Column<int>(nullable: false),
                    DECEP = table.Column<int>(nullable: false),
                    DISC = table.Column<int>(nullable: false),
                    EDU = table.Column<int>(nullable: false),
                    GUNN = table.Column<int>(nullable: false),
                    LEAD = table.Column<int>(nullable: false),
                    LORE = table.Column<int>(nullable: false),
                    LTSABER = table.Column<int>(nullable: false),
                    MECH = table.Column<int>(nullable: false),
                    MED = table.Column<int>(nullable: false),
                    MELEE = table.Column<int>(nullable: false),
                    NEG = table.Column<int>(nullable: false),
                    OUT = table.Column<int>(nullable: false),
                    PERC = table.Column<int>(nullable: false),
                    PILOTPL = table.Column<int>(nullable: false),
                    PILOTSP = table.Column<int>(nullable: false),
                    RANGHVY = table.Column<int>(nullable: false),
                    RANGLT = table.Column<int>(nullable: false),
                    RESIL = table.Column<int>(nullable: false),
                    SKUL = table.Column<int>(nullable: false),
                    STEAL = table.Column<int>(nullable: false),
                    SURV = table.Column<int>(nullable: false),
                    SW = table.Column<int>(nullable: false),
                    UND = table.Column<int>(nullable: false),
                    VIGIL = table.Column<int>(nullable: false),
                    WARF = table.Column<int>(nullable: false),
                    XEN = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    SessionToken = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GroupInventory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Location = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    GroupId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupInventory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupInventory_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GroupShip",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Name = table.Column<string>(nullable: true),
                    GroupId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupShip", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupShip_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Characters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Name = table.Column<string>(nullable: true),
                    Credits = table.Column<int>(nullable: false),
                    Career = table.Column<string>(nullable: true),
                    FreeCareerRanks = table.Column<int>(nullable: false),
                    FreeSpecRanks = table.Column<int>(nullable: false),
                    Wound = table.Column<int>(nullable: false),
                    WoundThreshold = table.Column<int>(nullable: false),
                    Strain = table.Column<int>(nullable: false),
                    StrainThreshold = table.Column<int>(nullable: false),
                    Xp = table.Column<int>(nullable: false),
                    UnusedXp = table.Column<int>(nullable: false),
                    Specializations = table.Column<string>(nullable: true),
                    CharacteristicsId = table.Column<int>(nullable: true),
                    CharacteristicsBuyId = table.Column<int>(nullable: true),
                    Soak = table.Column<int>(nullable: false),
                    SkillsCareer = table.Column<string>(nullable: true),
                    SkillsCareerFree = table.Column<string>(nullable: true),
                    SkillsSpec = table.Column<string>(nullable: true),
                    SkillsSpecFree = table.Column<string>(nullable: true),
                    SkillsBuyId = table.Column<int>(nullable: true),
                    Species = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Characters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Characters_Characteristics_CharacteristicsBuyId",
                        column: x => x.CharacteristicsBuyId,
                        principalTable: "Characteristics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Characters_Characteristics_CharacteristicsId",
                        column: x => x.CharacteristicsId,
                        principalTable: "Characteristics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Characters_Skills_SkillsBuyId",
                        column: x => x.SkillsBuyId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Characters_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    GroupId = table.Column<int>(nullable: true),
                    UserId = table.Column<int>(nullable: true),
                    PermissionGroup = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Permissions_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Permissions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CharacterInventory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Location = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CharacterId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CharacterInventory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CharacterInventory_Characters_CharacterId",
                        column: x => x.CharacterId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CharacterShip",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Name = table.Column<string>(nullable: true),
                    CharacterId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CharacterShip", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CharacterShip_Characters_CharacterId",
                        column: x => x.CharacterId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GroupCharacters",
                columns: table => new
                {
                    GroupId = table.Column<int>(nullable: false),
                    CharacterId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupCharacters", x => new { x.GroupId, x.CharacterId });
                    table.ForeignKey(
                        name: "FK_GroupCharacters_Characters_CharacterId",
                        column: x => x.CharacterId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupCharacters_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CharacterInventory_CharacterId",
                table: "CharacterInventory",
                column: "CharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_Characters_CharacteristicsBuyId",
                table: "Characters",
                column: "CharacteristicsBuyId");

            migrationBuilder.CreateIndex(
                name: "IX_Characters_CharacteristicsId",
                table: "Characters",
                column: "CharacteristicsId");

            migrationBuilder.CreateIndex(
                name: "IX_Characters_SkillsBuyId",
                table: "Characters",
                column: "SkillsBuyId");

            migrationBuilder.CreateIndex(
                name: "IX_Characters_UserId",
                table: "Characters",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterShip_CharacterId",
                table: "CharacterShip",
                column: "CharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupCharacters_CharacterId",
                table: "GroupCharacters",
                column: "CharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupInventory_GroupId",
                table: "GroupInventory",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupShip_GroupId",
                table: "GroupShip",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_GroupId",
                table: "Permissions",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_UserId",
                table: "Permissions",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CharacterInventory");

            migrationBuilder.DropTable(
                name: "CharacterShip");

            migrationBuilder.DropTable(
                name: "GroupCharacters");

            migrationBuilder.DropTable(
                name: "GroupInventory");

            migrationBuilder.DropTable(
                name: "GroupShip");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "Characters");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "Characteristics");

            migrationBuilder.DropTable(
                name: "Skills");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
