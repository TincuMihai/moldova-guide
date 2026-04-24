namespace MoldovaGuide.BusinessLayer.Structure
{
    public class TokenService
    {
        public string GenerateToken() { return Guid.NewGuid().ToString(); }
    }
}
