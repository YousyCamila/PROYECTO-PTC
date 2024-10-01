namespace _17.PrivateInvestigationTechnology_PTC.Models.ViewModels
{
    public class UserRolesViewModel
    {
        public string? UserId { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public List<string> Roles { get; set; }
    }
}
