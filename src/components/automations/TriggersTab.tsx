import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Clock, AlertCircle, Mail, MessageCircle, Smartphone, Facebook, Instagram, Linkedin } from "lucide-react";

interface QuestionnaireResponse {
  id: string;
  enabled: boolean;
  channels: {
    email: boolean;
    whatsapp: boolean;
    sms: boolean;
  };
  templates: {
    email?: string;
    whatsapp?: string;
    sms?: string;
  };
  timing: "immediate" | "scheduled";
  scheduledTime?: {
    days: number;
    hours: number;
    minutes: number;
  };
}

interface Reminder {
  id: string;
  leadStatus: string;
  timing: "immediate" | "scheduled";
  daysDelay?: number;
  timeOfDay?: string;
  templateId?: string;
  channels: {
    email: boolean;
    whatsapp: boolean;
    sms: boolean;
  };
}
const TriggersTab = () => {
  const [questionnaireResponse, setQuestionnaireResponse] = useState<QuestionnaireResponse>({
    id: "questionnaire_response",
    enabled: true,
    channels: {
      email: true,
      whatsapp: false,
      sms: false,
    },
    templates: {
      email: "",
      whatsapp: "",
      sms: "",
    },
    timing: "immediate",
  });

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "reminder_1",
      leadStatus: "new",
      timing: "scheduled",
      daysDelay: 1,
      timeOfDay: "09:00",
      channels: {
        email: true,
        whatsapp: false,
        sms: false,
      },
    },
  ]);

  const toggleQuestionnaireChannel = (channel: keyof QuestionnaireResponse['channels']) => {
    setQuestionnaireResponse(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: !prev.channels[channel],
      },
    }));
  };

  const toggleReminderChannel = (reminderId: string, channel: keyof Reminder['channels']) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === reminderId
          ? {
              ...reminder,
              channels: {
                ...reminder.channels,
                [channel]: !reminder.channels[channel],
              },
            }
          : reminder
      )
    );
  };

  const addReminder = () => {
    const newReminder: Reminder = {
      id: `reminder_${Date.now()}`,
      leadStatus: "new",
      timing: "scheduled",
      daysDelay: 1,
      timeOfDay: "09:00",
      channels: {
        email: true,
        whatsapp: false,
        sms: false,
      },
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const removeReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(r => r.id !== reminderId));
  };

  const updateReminder = (reminderId: string, updates: Partial<Reminder>) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === reminderId ? { ...reminder, ...updates } : reminder
      )
    );
  };

  const handleSave = () => {
    toast({
      title: "נשמר בהצלחה",
      description: "הגדרות הטריגרים נשמרו",
    });
  };

  return (
    <div className="space-y-4" dir="rtl">
      {/* Questionnaire Response Trigger */}
      <Card className="p-5 bg-primary/5 border-primary/20">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-right">
            <Clock className="h-5 w-5 text-primary" />
            טריגר לשאלון חדש
          </h2>
          <p className="text-muted-foreground text-right text-sm">מענה אוטומטי ללקוח לאחר מילוי השאלון</p>
        </div>

        <div className="space-y-4">
          {/* שורה אחת: כותרת + סטטוס */}
          <div className="flex items-center justify-between pb-3 border-b">
            <div className="flex-1">
              <Label className="font-medium text-right">ערוצי מענה</Label>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="questionnaire-enabled" className="font-medium text-sm text-muted-foreground">הפעל מענה אוטומטי</Label>
              <Switch
                id="questionnaire-enabled"
                checked={questionnaireResponse.enabled}
                onCheckedChange={(checked) =>
                  setQuestionnaireResponse(prev => ({ ...prev, enabled: checked }))
                }
              />
            </div>
          </div>

          {questionnaireResponse.enabled && (
            <>
              <div className="space-y-4">
                {/* ערוצי מענה - רוחב מצומצם */}
                <div className="flex justify-center gap-2 max-w-xs mx-auto">
                  <div className="flex flex-col items-center p-2 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors cursor-pointer flex-1">
                    <Checkbox
                      id="qr-email"
                      checked={questionnaireResponse.channels.email}
                      onCheckedChange={() => toggleQuestionnaireChannel('email')}
                      className="mb-1"
                    />
                    <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center mb-1">
                      <Mail className="h-3 w-3 text-white" />
                    </div>
                    <Label htmlFor="qr-email" className="cursor-pointer text-xs font-medium text-green-800">מייל</Label>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors cursor-pointer flex-1">
                    <Checkbox
                      id="qr-whatsapp"
                      checked={questionnaireResponse.channels.whatsapp}
                      onCheckedChange={() => toggleQuestionnaireChannel('whatsapp')}
                      className="mb-1"
                    />
                    <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center mb-1">
                      <MessageCircle className="h-3 w-3 text-white" />
                    </div>
                    <Label htmlFor="qr-whatsapp" className="cursor-pointer text-xs font-medium text-green-800">וואטסאפ</Label>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer flex-1">
                    <Checkbox
                      id="qr-sms"
                      checked={questionnaireResponse.channels.sms}
                      onCheckedChange={() => toggleQuestionnaireChannel('sms')}
                      className="mb-1"
                    />
                    <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center mb-1">
                      <Smartphone className="h-3 w-3 text-white" />
                    </div>
                    <Label htmlFor="qr-sms" className="cursor-pointer text-xs font-medium text-purple-800">SMS</Label>
                  </div>
                </div>

                {/* בחירת תבניות */}
                <div className="space-y-3 max-w-lg mx-auto">
                  {questionnaireResponse.channels.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      <Label className="text-sm w-20">תבנית מייל</Label>
                      <Select
                        value={questionnaireResponse.templates.email}
                        onValueChange={(value) =>
                          setQuestionnaireResponse(prev => ({
                            ...prev,
                            templates: { ...prev.templates, email: value }
                          }))
                        }
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="בחר תבנית למייל" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email_template_1">תבנית מייל 1</SelectItem>
                          <SelectItem value="email_template_2">תבנית מייל 2</SelectItem>
                          <SelectItem value="email_template_3">תבנית מייל 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {questionnaireResponse.channels.whatsapp && (
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      <Label className="text-sm w-20">תבנית וואטסאפ</Label>
                      <Select
                        value={questionnaireResponse.templates.whatsapp}
                        onValueChange={(value) =>
                          setQuestionnaireResponse(prev => ({
                            ...prev,
                            templates: { ...prev.templates, whatsapp: value }
                          }))
                        }
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="בחר תבנית לוואטסאפ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="whatsapp_template_1">תבנית וואטסאפ 1</SelectItem>
                          <SelectItem value="whatsapp_template_2">תבנית וואטסאפ 2</SelectItem>
                          <SelectItem value="whatsapp_template_3">תבנית וואטסאפ 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {questionnaireResponse.channels.sms && (
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-purple-600" />
                      <Label className="text-sm w-20">תבנית SMS</Label>
                      <Select
                        value={questionnaireResponse.templates.sms}
                        onValueChange={(value) =>
                          setQuestionnaireResponse(prev => ({
                            ...prev,
                            templates: { ...prev.templates, sms: value }
                          }))
                        }
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="בחר תבנית SMS" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sms_template_1">תבנית SMS 1</SelectItem>
                          <SelectItem value="sms_template_2">תבנית SMS 2</SelectItem>
                          <SelectItem value="sms_template_3">תבנית SMS 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 max-w-lg mx-auto">
                <Label className="font-medium text-right">תזמון שליחה</Label>
                <Select
                  value={questionnaireResponse.timing}
                  onValueChange={(value: "immediate" | "scheduled") =>
                    setQuestionnaireResponse(prev => ({ ...prev, timing: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">מיידי</SelectItem>
                    <SelectItem value="scheduled">תזמן זמן מותאם</SelectItem>
                  </SelectContent>
                </Select>

                {questionnaireResponse.timing === "scheduled" && (
                  <div className="flex gap-3 items-center pt-2">
                    <div className="flex-1">
                      <Label className="text-sm mb-2 block">ימים</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={questionnaireResponse.scheduledTime?.days || 0}
                        onChange={(e) =>
                          setQuestionnaireResponse(prev => ({
                            ...prev,
                            scheduledTime: {
                              ...prev.scheduledTime,
                              days: parseInt(e.target.value) || 0,
                              hours: prev.scheduledTime?.hours || 0,
                              minutes: prev.scheduledTime?.minutes || 0,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm mb-2 block">שעות</Label>
                      <Input
                        type="number"
                        min="0"
                        max="23"
                        placeholder="0"
                        value={questionnaireResponse.scheduledTime?.hours || 0}
                        onChange={(e) =>
                          setQuestionnaireResponse(prev => ({
                            ...prev,
                            scheduledTime: {
                              ...prev.scheduledTime,
                              days: prev.scheduledTime?.days || 0,
                              hours: parseInt(e.target.value) || 0,
                              minutes: prev.scheduledTime?.minutes || 0,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm mb-2 block">דקות</Label>
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="0"
                        value={questionnaireResponse.scheduledTime?.minutes || 0}
                        onChange={(e) =>
                          setQuestionnaireResponse(prev => ({
                            ...prev,
                            scheduledTime: {
                              ...prev.scheduledTime,
                              days: prev.scheduledTime?.days || 0,
                              hours: prev.scheduledTime?.hours || 0,
                              minutes: parseInt(e.target.value) || 0,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Reminders Section */}
      <Card className="p-5 bg-secondary/5 border-secondary/20">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-right">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 justify-end">
              <AlertCircle className="h-5 w-5 text-secondary" />
              טריגרים לתזכורות
            </h2>
            <p className="text-muted-foreground text-sm">תזכורות אוטומטיות על בסיס סטטוס ליד וזמן</p>
          </div>
          <Button onClick={addReminder} variant="outline" size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Plus className="ml-2 h-4 w-4" />
            הוסף תזכורת
          </Button>
        </div>

        <div className="space-y-3">
          {reminders.map((reminder, index) => (
            <Card key={reminder.id} className="p-4 bg-background/50 border">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-medium text-right">תזכורת {index + 1}</Label>
                  {reminders.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeReminder(reminder.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      מחק
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm mb-2 block">בחר תבנית</Label>
                    <Select
                      value={reminder.templateId || ""}
                      onValueChange={(value) =>
                        updateReminder(reminder.id, { templateId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="בחר תבנית" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="template_1">תבנית תזכורת 1</SelectItem>
                        <SelectItem value="template_2">תבנית תזכורת 2</SelectItem>
                        <SelectItem value="template_3">תבנית תזכורת 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">סטטוס ליד</Label>
                    <Select
                      value={reminder.leadStatus}
                      onValueChange={(value) =>
                        updateReminder(reminder.id, { leadStatus: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">חדש</SelectItem>
                        <SelectItem value="contacted">יצר קשר</SelectItem>
                        <SelectItem value="qualified">מוסמך</SelectItem>
                        <SelectItem value="proposal">הצעה</SelectItem>
                        <SelectItem value="negotiation">משא ומתן</SelectItem>
                        <SelectItem value="closed">סגור</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">תזמון שליחה</Label>
                    <Select
                      value={reminder.timing}
                      onValueChange={(value: "immediate" | "scheduled") =>
                        updateReminder(reminder.id, { timing: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">מיידי</SelectItem>
                        <SelectItem value="scheduled">תזמן זמן מותאם</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {reminder.timing === "scheduled" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm mb-2 block">מספר ימים</Label>
                        <Input
                          type="number"
                          min="0"
                          value={reminder.daysDelay || 0}
                          onChange={(e) =>
                            updateReminder(reminder.id, {
                              daysDelay: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          הזמן נמדד מיצירת הליד
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm mb-2 block">שעת שליחה</Label>
                        <Input
                          type="time"
                          value={reminder.timeOfDay || "09:00"}
                          onChange={(e) =>
                            updateReminder(reminder.id, { timeOfDay: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm mb-2 block">ערוצי תזכורת</Label>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`${reminder.id}-email`}
                          checked={reminder.channels.email}
                          onCheckedChange={() => toggleReminderChannel(reminder.id, 'email')}
                        />
                        <Label htmlFor={`${reminder.id}-email`} className="cursor-pointer">
                          מייל
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`${reminder.id}-whatsapp`}
                          checked={reminder.channels.whatsapp}
                          onCheckedChange={() =>
                            toggleReminderChannel(reminder.id, 'whatsapp')
                          }
                        />
                        <Label htmlFor={`${reminder.id}-whatsapp`} className="cursor-pointer">
                          וואטסאפ
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`${reminder.id}-sms`}
                          checked={reminder.channels.sms}
                          onCheckedChange={() => toggleReminderChannel(reminder.id, 'sms')}
                        />
                        <Label htmlFor={`${reminder.id}-sms`} className="cursor-pointer">
                          הודעה
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Button onClick={handleSave} className="w-full" size="default">
        <Save className="ml-2 h-4 w-4" />
        שמירת הגדרות
      </Button>
    </div>
  );
};

export default TriggersTab;
