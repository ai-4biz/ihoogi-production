import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Clock, AlertCircle, Mail, MessageCircle, Smartphone } from "lucide-react";

interface QuestionnaireResponse {
  id: string;
  enabled: boolean;
  channels: {
    email: boolean;
    whatsapp: boolean;
    sms: boolean;
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
          <div className="flex items-center justify-between pb-3 border-b">
            <Label htmlFor="questionnaire-enabled" className="font-medium text-right">הפעל מענה אוטומטי</Label>
            <Switch
              id="questionnaire-enabled"
              checked={questionnaireResponse.enabled}
              onCheckedChange={(checked) =>
                setQuestionnaireResponse(prev => ({ ...prev, enabled: checked }))
              }
            />
          </div>

          {questionnaireResponse.enabled && (
            <>
              <div className="space-y-3">
                <Label className="font-medium text-right">ערוצי מענה</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center p-3 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
                    <Checkbox
                      id="qr-email"
                      checked={questionnaireResponse.channels.email}
                      onCheckedChange={() => toggleQuestionnaireChannel('email')}
                      className="mb-2"
                    />
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <Label htmlFor="qr-email" className="cursor-pointer text-sm font-medium text-green-800">מייל</Label>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer">
                    <Checkbox
                      id="qr-whatsapp"
                      checked={questionnaireResponse.channels.whatsapp}
                      onCheckedChange={() => toggleQuestionnaireChannel('whatsapp')}
                      className="mb-2"
                    />
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <Label htmlFor="qr-whatsapp" className="cursor-pointer text-sm font-medium text-blue-800">וואטסאפ</Label>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer">
                    <Checkbox
                      id="qr-sms"
                      checked={questionnaireResponse.channels.sms}
                      onCheckedChange={() => toggleQuestionnaireChannel('sms')}
                      className="mb-2"
                    />
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                      <Smartphone className="h-4 w-4 text-white" />
                    </div>
                    <Label htmlFor="qr-sms" className="cursor-pointer text-sm font-medium text-purple-800">SMS</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-medium">תזמון שליחה</Label>
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
