using Microsoft.EntityFrameworkCore.Migrations;

namespace BL.Migrations
{
    public partial class storeproceduredelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sp = @"CREATE PROCEDURE dbo.DeleteAppointment
                    @Id int, @UserId nvarchar(450)
                AS
                BEGIN
                    Declare @DeleteCnt INT
                    SELECT * FROM  [dbo].[Appointments] WHERE Id =@Id AND UserId=@UserId;
                    DELETE FROM [dbo].[Appointments]  WHERE Id =@Id AND UserId=@UserId;
                    SET @DeleteCnt =@@ROWCOUNT
                    RETURN @DeleteCnt
                END";

            migrationBuilder.Sql(sp);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
