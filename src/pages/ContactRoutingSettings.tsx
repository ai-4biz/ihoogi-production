import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";

interface RoutingRule {
  id: string;
  subject: string;
  email: string;
  country: string;
  enabled: boolean;
}

const ContactRoutingSettings = () => {
  const [routingRules, setRoutingRules] = useState<RoutingRule[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingRule, setEditingRule] = useState<RoutingRule | null>(null);
  const [newRule, setNewRule] = useState({ subject: "", email: "", country: "" });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("הכל");

  // Load routing rules on component mount
  useEffect(() => {
    loadRoutingRules();
  }, []);

  const loadRoutingRules = () => {
    // In a real app, this would fetch from an API
    // For now, we'll use the same data as in ContactForm
    const defaultRules: RoutingRule[] = [
      { id: "1", subject: "תמיכה טכנית", email: "support@example.com", country: "ישראל", enabled: true },
      { id: "2", subject: "שירות לקוחות", email: "service@example.com", country: "ישראל", enabled: true },
      { id: "3", subject: "בעיה בתשלום", email: "billing@example.com", country: "ישראל", enabled: true },
      { id: "4", subject: "דיווח על באג", email: "bugs@example.com", country: "ישראל", enabled: true },
      { id: "5", subject: "בקשת פיצ'ר", email: "features@example.com", country: "ישראל", enabled: true },
      { id: "6", subject: "משוב על המוצר", email: "feedback@example.com", country: "ישראל", enabled: true },
      { id: "7", subject: "שאלה על השימוש", email: "support@example.com", country: "ישראל", enabled: true },
      { id: "8", subject: "שאלה כללית", email: "info@example.com", country: "ישראל", enabled: true },
      { id: "9", subject: "Technical Support", email: "support-en@example.com", country: "USA", enabled: true },
      { id: "10", subject: "Customer Service", email: "service-en@example.com", country: "USA", enabled: true },
      { id: "11", subject: "Billing Issue", email: "billing-en@example.com", country: "USA", enabled: true },
      { id: "12", subject: "Bug Report", email: "bugs-en@example.com", country: "USA", enabled: true },
    ];
    setRoutingRules(defaultRules);
  };

  const handleEdit = (rule: RoutingRule) => {
    setIsEditing(rule.id);
    setEditingRule({ ...rule });
  };

  const handleSaveEdit = () => {
    if (!editingRule) return;
    
    setRoutingRules(prev => 
      prev.map(rule => 
        rule.id === editingRule.id ? editingRule : rule
      )
    );
    
    setIsEditing(null);
    setEditingRule(null);
    
    toast({
      title: "✅ הכלל עודכן בהצלחה",
      description: `הכלל "${editingRule.subject}" עודכן`,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditingRule(null);
  };

  const handleDelete = (id: string) => {
    const rule = routingRules.find(r => r.id === id);
    if (rule) {
      setRoutingRules(prev => prev.filter(r => r.id !== id));
      toast({
        title: "🗑️ הכלל נמחק",
        description: `הכלל "${rule.subject}" נמחק`,
      });
    }
  };

  const handleAddNew = () => {
    if (!newRule.subject || !newRule.email || !newRule.country) {
      toast({
        title: "שגיאה",
        description: "יש למלא את כל השדות",
        variant: "destructive",
      });
      return;
    }

    const newRuleObj: RoutingRule = {
      id: Date.now().toString(),
      subject: newRule.subject,
      email: newRule.email,
      country: newRule.country,
      enabled: true,
    };

    setRoutingRules(prev => [...prev, newRuleObj]);
    setNewRule({ subject: "", email: "", country: "" });
    setIsAddingNew(false);
    
    toast({
      title: "✅ כלל חדש נוסף",
      description: `הכלל "${newRuleObj.subject}" נוסף בהצלחה`,
    });
  };

  const toggleEnabled = (id: string) => {
    setRoutingRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  // Get unique countries for filter
  const getUniqueCountries = () => {
    const countries = [...new Set(routingRules.map(rule => rule.country))];
    return ["הכל", ...countries];
  };

  // Filter rules by selected country
  const getFilteredRules = () => {
    if (selectedCountry === "הכל") {
      return routingRules;
    }
    return routingRules.filter(rule => rule.country === selectedCountry);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">הגדרות ניתוב פניות</h1>
        <p className="text-gray-600">נהל את כללי הניתוב של פניות הלקוחות לצוותים השונים</p>
      </div>

      {/* Current Rules Table */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              📧 כללי ניתוב נוכחיים
            </CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="country-filter" className="text-sm font-medium">סינון לפי מדינה:</Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger id="country-filter" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getUniqueCountries().map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-right p-4 font-semibold">נושא הפנייה</th>
                  <th className="text-right p-4 font-semibold">מדינה</th>
                  <th className="text-right p-4 font-semibold">כתובת מייל</th>
                  <th className="text-center p-4 font-semibold">פעיל</th>
                  <th className="text-center p-4 font-semibold">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredRules().map((rule) => (
                  <tr key={rule.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      {isEditing === rule.id ? (
                        <Input
                          value={editingRule?.subject || ""}
                          onChange={(e) => setEditingRule(prev => 
                            prev ? { ...prev, subject: e.target.value } : null
                          )}
                          className="w-full"
                        />
                      ) : (
                        <span className="font-medium">{rule.subject}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {isEditing === rule.id ? (
                        <Input
                          value={editingRule?.country || ""}
                          onChange={(e) => setEditingRule(prev => 
                            prev ? { ...prev, country: e.target.value } : null
                          )}
                          className="w-full"
                        />
                      ) : (
                        <span className="font-medium text-green-600">{rule.country}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {isEditing === rule.id ? (
                        <Input
                          value={editingRule?.email || ""}
                          onChange={(e) => setEditingRule(prev => 
                            prev ? { ...prev, email: e.target.value } : null
                          )}
                          className="w-full font-mono text-sm"
                        />
                      ) : (
                        <span className="font-mono text-sm text-blue-600">{rule.email}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={() => toggleEnabled(rule.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="p-4 text-center">
                      {isEditing === rule.id ? (
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(rule)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(rule.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add New Rule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            הוסף כלל ניתוב חדש
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isAddingNew ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="new-subject">נושא הפנייה</Label>
                <Input
                  id="new-subject"
                  value={newRule.subject}
                  onChange={(e) => setNewRule(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="לדוגמה: שאלות על מחירים"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="new-country">מדינה</Label>
                <Input
                  id="new-country"
                  value={newRule.country}
                  onChange={(e) => setNewRule(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="ישראל / USA / UK"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="new-email">כתובת מייל</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newRule.email}
                  onChange={(e) => setNewRule(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="pricing@yourcompany.com"
                  className="mt-1 font-mono"
                />
              </div>
              <div className="md:col-span-3 flex gap-2">
                <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  הוסף כלל
                </Button>
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                  <X className="w-4 h-4 mr-2" />
                  ביטול
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setIsAddingNew(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              הוסף כלל חדש
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 מידע חשוב</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• כללים לא פעילים לא יופיעו ברשימת הנושאים בדף צור הקשר</li>
          <li>• שינויים נשמרים אוטומטית ומשפיעים מיד על המשתמשים</li>
          <li>• מומלץ להשתמש בכתובות מייל מקצועיות (לדוגמה: support@yourcompany.com)</li>
          <li>• ניתן לערוך כללים קיימים על ידי לחיצה על כפתור העריכה</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactRoutingSettings;
