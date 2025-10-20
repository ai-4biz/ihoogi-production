-- טבלת הגדרות ניתוב פניות - contact_support
-- יצירת טבלה למנהל הגדרות ניתוב פניות הלקוחות

CREATE TABLE contact_support (
    -- מזהה ייחודי לכל כלל ניתוב
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- נושא הפנייה (למשל: "תמיכה טכנית", "שירות לקוחות")
    subject TEXT NOT NULL,
    
    -- המדינה (למשל: "ישראל", "USA")
    country TEXT NOT NULL DEFAULT 'ישראל',
    
    -- כתובת המייל אליה תישלח הפנייה
    email TEXT NOT NULL,
    
    -- האם הכלל פעיל או לא
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    -- תאריך יצירת הכלל
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- תאריך עדכון אחרון
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- בדיקה שהמייל תקין
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    
    -- בדיקה שהנושא לא ריק
    CONSTRAINT non_empty_subject CHECK (LENGTH(TRIM(subject)) > 0),
    
    -- בדיקה שהמדינה לא ריקה
    CONSTRAINT non_empty_country CHECK (LENGTH(TRIM(country)) > 0)
);

-- יצירת אינדקסים לביצועים טובים יותר
CREATE INDEX idx_contact_support_country ON contact_support(country);
CREATE INDEX idx_contact_support_subject ON contact_support(subject);
CREATE INDEX idx_contact_support_active ON contact_support(is_active);
CREATE INDEX idx_contact_support_country_subject ON contact_support(country, subject);

-- טריגר לעדכון אוטומטי של השדה updated_at
CREATE OR REPLACE FUNCTION update_contact_support_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_support_updated_at
    BEFORE UPDATE ON contact_support
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_support_updated_at();

-- הוספת RLS (Row Level Security) אם נדרש
-- ALTER TABLE contact_support ENABLE ROW LEVEL SECURITY;

-- יצירת פוליסה בסיסית (תוכל לשנות לפי הצרכים שלך)
-- CREATE POLICY "Users can view contact support rules" ON contact_support
--     FOR SELECT USING (true);

-- CREATE POLICY "Admins can manage contact support rules" ON contact_support
--     FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- הוספת נתונים לדוגמה (אופציונלי)
INSERT INTO contact_support (subject, country, email, is_active) VALUES
('תמיכה טכנית', 'ישראל', 'support@example.com', true),
('שירות לקוחות', 'ישראל', 'service@example.com', true),
('בעיה בתשלום', 'ישראל', 'billing@example.com', true),
('דיווח על באג', 'ישראל', 'bugs@example.com', true),
('בקשת פיצ''ר', 'ישראל', 'features@example.com', true),
('משוב על המוצר', 'ישראל', 'feedback@example.com', true),
('שאלה על השימוש', 'ישראל', 'support@example.com', true),
('שאלה כללית', 'ישראל', 'info@example.com', true),
('Technical Support', 'USA', 'support-en@example.com', true),
('Customer Service', 'USA', 'service-en@example.com', true),
('Billing Issue', 'USA', 'billing-en@example.com', true),
('Bug Report', 'USA', 'bugs-en@example.com', true);

-- הערה למפתח: 
-- 1. תוכל להסיר את הוספת הנתונים לדוגמה אם לא נדרש
-- 2. תוכל להתאים את פוליסות ה-RLS לפי הצרכים שלך
-- 3. הטקסטים בעברית יוצגו נכון ב-Supabase
