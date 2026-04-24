namespace MoldovaGuide.BusinessLayer.Core
{
    public static class ValidationHelper
    {
        public static (bool isValid, string? error) ValidateEmail(string? email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return (false, "Email-ul este obligatoriu.");
            if (!email.Contains("@") || !email.Contains("."))
                return (false, "Formatul email-ului este invalid.");
            if (email.Length > 80)
                return (false, "Email-ul nu poate depăși 80 de caractere.");
            return (true, null);
        }

        public static (bool isValid, string? error) ValidatePassword(string? password)
        {
            if (string.IsNullOrWhiteSpace(password))
                return (false, "Parola este obligatorie.");
            if (password.Length < 6)
                return (false, "Parola trebuie să aibă minim 6 caractere.");
            if (password.Length > 60)
                return (false, "Parola nu poate depăși 60 de caractere.");
            return (true, null);
        }

        public static (bool isValid, string? error) ValidateRequired(string? value, string fieldName, int maxLength = 0)
        {
            if (string.IsNullOrWhiteSpace(value))
                return (false, $"{fieldName} este obligatoriu.");
            if (maxLength > 0 && value.Length > maxLength)
                return (false, $"{fieldName} nu poate depăși {maxLength} caractere.");
            return (true, null);
        }

        public static (bool isValid, string? error) ValidatePrice(decimal price)
        {
            if (price < 0)
                return (false, "Prețul nu poate fi negativ.");
            if (price > 99999)
                return (false, "Prețul depășește limita maximă.");
            return (true, null);
        }

        public static (bool isValid, string? error) ValidateRating(decimal rating)
        {
            if (rating < 0 || rating > 5)
                return (false, "Rating-ul trebuie să fie între 0 și 5.");
            return (true, null);
        }

        public static (bool isValid, string? error) ValidateDate(string? dateStr)
        {
            if (string.IsNullOrWhiteSpace(dateStr))
                return (false, "Data este obligatorie.");
            if (!DateTime.TryParse(dateStr, out var date))
                return (false, "Formatul datei este invalid. Folosiți YYYY-MM-DD.");
            if (date < DateTime.Today)
                return (false, "Data nu poate fi în trecut.");
            return (true, null);
        }

        public static (bool isValid, string? error) ValidateParticipants(int count, int max = 0)
        {
            if (count <= 0)
                return (false, "Numărul de participanți trebuie să fie minim 1.");
            if (max > 0 && count > max)
                return (false, $"Numărul maxim de participanți este {max}.");
            return (true, null);
        }
    }
}
