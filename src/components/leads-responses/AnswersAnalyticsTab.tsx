import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Clock, CheckCircle, TrendingUp, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnswersAnalyticsTab = () => {
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<string>("");

  // Mock data
  const questionnairesList = [
    { id: "1", name: "ביטוח רכב - גרסה 3" },
    { id: "2", name: "ייעוץ עסקי" },
    { id: "3", name: "משכנתא" },
  ];

  const overallStats = {
    totalAnswers: 428,
    avgResponseTime: "3:47",
    completionRate: 78,
    closureRate: 32,
  };

  const topQuestionnaires = [
    { name: "ביטוח רכב", answers: 120, completion: 82, closure: 38 },
    { name: "ייעוץ עסקי", answers: 95, completion: 76, closure: 42 },
    { name: "משכנתא", answers: 87, completion: 64, closure: 29 },
  ];

  const answerSources = [
    { name: "וואטסאפ", percentage: 45 },
    { name: "אתר", percentage: 30 },
    { name: "לינק ישיר", percentage: 15 },
    { name: "QR", percentage: 10 },
  ];

  const specificQuestionnaireStats = {
    name: "ביטוח רכב - גרסה 3",
    totalAnswers: 87,
    avgResponseTime: "4:12",
    completionRate: 82,
    closureRate: 38,
    sources: [
      { name: "וואטסאפ", percentage: 52 },
      { name: "אתר", percentage: 33 },
      { name: "QR", percentage: 10 },
      { name: "אחר", percentage: 5 },
    ],
    questionBreakdown: [
      {
        question: "איך תרצה שניצור איתך קשר?",
        answers: [
          { option: "וואטסאפ", percentage: 60 },
          { option: "טלפון", percentage: 30 },
          { option: "מייל", percentage: 10 },
        ],
      },
      {
        question: "מתי תרצה להתחיל?",
        answers: [
          { option: "השבוע", percentage: 45 },
          { option: "החודש", percentage: 35 },
          { option: "לא בטוח", percentage: 20 },
        ],
      },
    ],
    recentAnswers: [
      { date: "07.10.25", name: "רון לוי", summary: "מבקש הצעת מחיר", channel: "וואטסאפ", status: "בטיפול" },
      { date: "06.10.25", name: "דנה כהן", summary: "מעוניינת בשיחת ייעוץ", channel: "אתר", status: "חדש" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <img src="/hoogi-new-avatar.png" alt="ינשוף הוגי - ניתוח תשובות" className="h-6 w-6 rounded-full" />
            📊 ניתוח תשובות הלקוחות
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            צפי בתובנות על כל השאלונים שלך, או בחרי שאלון לניתוח ממוקד.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedQuestionnaire} onValueChange={setSelectedQuestionnaire}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="בחרי שאלון" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">תצוגה כללית</SelectItem>
              {questionnairesList.map((q) => (
                <SelectItem key={q.id} value={q.id}>
                  {q.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => {}}>הצג ניתוח</Button>
        </div>
      </div>

      {/* Content - Overall or Specific */}
      {!selectedQuestionnaire ? (
        // Overall View
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">💬 סה"כ תשובות</p>
                    <p className="text-3xl font-bold mt-2">{overallStats.totalAnswers}</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">🕒 זמן מענה ממוצע</p>
                    <p className="text-3xl font-bold mt-2">{overallStats.avgResponseTime}</p>
                    <p className="text-xs text-muted-foreground">דקות</p>
                  </div>
                  <Clock className="h-8 w-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">📈 שיעור השלמה</p>
                    <p className="text-3xl font-bold mt-2">{overallStats.completionRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">✅ שיעור סגירה</p>
                    <p className="text-3xl font-bold mt-2">{overallStats.closureRate}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Questionnaires */}
          <Card>
            <CardHeader>
              <CardTitle>השאלונים הפופולריים ביותר</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topQuestionnaires.map((q, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="font-medium">{q.name}</div>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">תשובות: </span>
                        <span className="font-semibold">{q.answers}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">השלמה: </span>
                        <span className="font-semibold">{q.completion}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">סגירה: </span>
                        <span className="font-semibold">{q.closure}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Answer Sources */}
            <Card>
              <CardHeader>
                <CardTitle>מאיפה מגיעות התשובות?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {answerSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{source.name}</span>
                        <span className="font-semibold">{source.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${["bg-primary","bg-primary/80","bg-primary/60","bg-primary/40"][index % 4]}`}
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Times */}
            <Card>
              <CardHeader>
                <CardTitle>מתי מתקבלות הכי הרבה תשובות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-40 gap-2">
                  {[15, 25, 35, 45, 60, 50, 40].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-primary rounded-t transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {["א", "ב", "ג", "ד", "ה", "ו", "ש"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        // Specific Questionnaire View
        <>
          {/* Specific KPI Cards */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">שאלון: {specificQuestionnaireStats.name}</h3>
              <p className="text-sm text-muted-foreground">
                מבוסס על {specificQuestionnaireStats.totalAnswers} תשובות אחרונות
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">💬 סה"כ תשובות</p>
                  <p className="text-3xl font-bold mt-2">{specificQuestionnaireStats.totalAnswers}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">🕒 זמן מענה ממוצע</p>
                  <p className="text-3xl font-bold mt-2">{specificQuestionnaireStats.avgResponseTime}</p>
                  <p className="text-xs text-muted-foreground">דקות</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">📈 שיעור השלמה</p>
                  <p className="text-3xl font-bold mt-2">{specificQuestionnaireStats.completionRate}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">✅ שיעור סגירה</p>
                  <p className="text-3xl font-bold mt-2">{specificQuestionnaireStats.closureRate}%</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Source Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>מאיפה ענו על השאלון הזה?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {specificQuestionnaireStats.sources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{source.name}</span>
                        <span className="font-semibold">{source.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Activity */}
            <Card>
              <CardHeader>
                <CardTitle>מתי מתקבלות תשובות לשאלון הזה?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-40 gap-2">
                  {[20, 30, 45, 55, 65, 48, 35].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-primary rounded-t transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {["א", "ב", "ג", "ד", "ה", "ו", "ש"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>איך המשתמשים עונים על השאלות שלך?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {specificQuestionnaireStats.questionBreakdown.map((q, qIndex) => (
                  <div key={qIndex} className="space-y-3 p-4 border rounded-lg">
                    <h4 className="font-medium">{q.question}</h4>
                    <div className="space-y-2">
                      {q.answers.map((answer, aIndex) => (
                        <div key={aIndex} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{answer.option}</span>
                            <span className="font-semibold">{answer.percentage}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${answer.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Answers */}
          <Card>
            <CardHeader>
              <CardTitle>תשובות אחרונות לשאלון זה</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-right">
                      <th className="pb-3 pr-4 font-medium text-sm text-muted-foreground">תאריך</th>
                      <th className="pb-3 pr-4 font-medium text-sm text-muted-foreground">לקוח</th>
                      <th className="pb-3 pr-4 font-medium text-sm text-muted-foreground">תשובה קצרה</th>
                      <th className="pb-3 pr-4 font-medium text-sm text-muted-foreground">ערוץ</th>
                      <th className="pb-3 pr-4 font-medium text-sm text-muted-foreground">סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specificQuestionnaireStats.recentAnswers.map((answer, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-3 pr-4 text-sm">{answer.date}</td>
                        <td className="py-3 pr-4 text-sm font-medium">{answer.name}</td>
                        <td className="py-3 pr-4 text-sm text-muted-foreground">"{answer.summary}"</td>
                        <td className="py-3 pr-4 text-sm">{answer.channel}</td>
                        <td className="py-3 pr-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {answer.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Footer Note */}
      <div className="bg-muted/30 border border-muted rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium mb-1">💡 מידע שימושי:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>אם לא נבחר שאלון – מוצגת תצוגה כוללת של כלל השאלונים שלך</li>
          <li>הנתונים מתעדכנים בזמן אמת</li>
          <li>ניתן לעבור בין תצוגה כללית לתצוגה ממוקדת בכל עת</li>
        </ul>
      </div>
    </div>
  );
};

export default AnswersAnalyticsTab;
