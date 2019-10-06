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
                name: "Group",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Name = table.Column<int>(nullable: false),
                    ConnectionId = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Group", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Group_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Item",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Name = table.Column<string>(nullable: true),
                    CharacterId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Item", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Item_Characters_CharacterId",
                        column: x => x.CharacterId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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
                name: "IX_Group_UserId",
                table: "Group",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Item_CharacterId",
                table: "Item",
                column: "CharacterId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Group");

            migrationBuilder.DropTable(
                name: "Item");

            migrationBuilder.DropTable(
                name: "Characters");

            migrationBuilder.DropTable(
                name: "Characteristics");

            migrationBuilder.DropTable(
                name: "Skills");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
