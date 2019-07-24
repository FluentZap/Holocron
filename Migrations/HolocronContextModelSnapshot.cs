﻿// <auto-generated />
using System;
using Holocron.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Holocron.Migrations
{
    [DbContext(typeof(HolocronContext))]
    partial class HolocronContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("Holocron.Context.Character", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Agility");

                    b.Property<int>("Brawn");

                    b.Property<string>("Career");

                    b.Property<int>("Credits");

                    b.Property<int>("Cunning");

                    b.Property<int>("Intelect");

                    b.Property<string>("Name");

                    b.Property<int>("Presence");

                    b.Property<string>("Specializations");

                    b.Property<int>("Strain");

                    b.Property<int>("StrainThreashold");

                    b.Property<int?>("UserId");

                    b.Property<int>("Willpower");

                    b.Property<int>("Wound");

                    b.Property<int>("WoundThreashold");

                    b.Property<int>("Xp");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Character");
                });

            modelBuilder.Entity("Holocron.Context.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConnectionId");

                    b.Property<int>("Name");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Group");
                });

            modelBuilder.Entity("Holocron.Context.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CharacterId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CharacterId");

                    b.ToTable("Item");
                });

            modelBuilder.Entity("Holocron.Context.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("SessionToken");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Holocron.Context.Character", b =>
                {
                    b.HasOne("Holocron.Context.User")
                        .WithMany("Characters")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Holocron.Context.Group", b =>
                {
                    b.HasOne("Holocron.Context.User")
                        .WithMany("Groups")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Holocron.Context.Item", b =>
                {
                    b.HasOne("Holocron.Context.Character")
                        .WithMany("Inventory")
                        .HasForeignKey("CharacterId");
                });
#pragma warning restore 612, 618
        }
    }
}
