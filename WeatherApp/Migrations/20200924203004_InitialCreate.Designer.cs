﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WeatherApp.Models;

namespace WeatherApp.Migrations
{
    [DbContext(typeof(WeatherInfoContext))]
    [Migration("20200924203004_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("WeatherApp.Models.Location", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("Place")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("WeatherApp.Models.WeatherInfo", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<DateTime>("Date")
                        .HasColumnType("Date");

                    b.Property<string>("Place")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<decimal>("Rain")
                        .HasColumnType("Decimal (10,2)");

                    b.Property<decimal>("Temperature")
                        .HasColumnType("Decimal (10,2)");

                    b.Property<decimal>("Wind")
                        .HasColumnType("Decimal (10,2)");

                    b.HasKey("Id");

                    b.ToTable("WeatherInfos");
                });
#pragma warning restore 612, 618
        }
    }
}
