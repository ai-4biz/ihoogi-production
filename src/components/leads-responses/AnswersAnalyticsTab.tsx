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
    { name: "ביטוח רכב", answers: 120, completion: 82, closure: 38, avgTime: "3:45" },
    { name: "ייעוץ עסקי", answers: 95, completion: 76, closure: 42, avgTime: "4:20" },
    { name: "משכנתא", answers: 87, completion: 64, closure: 29, avgTime: "5:15" },
  ];

  const popularQuestions = [
    { question: "איך תרצה שניצור איתך קשר?", totalAnswers: 302, topAnswer: "וואטסאפ (65%)", avgTime: "0:18" },
    { question: "מתי תרצה להתחיל?", totalAnswers: 289, topAnswer: "השבוע (48%)", avgTime: "0:22" },
    { question: "מה התקציב שלך?", totalAnswers: 267, topAnswer: "200-400 ש״ח (38%)", avgTime: "0:28" },
    { question: "איזה סוג שירות מעניין אותך?", totalAnswers: 254, topAnswer: "שירות מלא (55%)", avgTime: "0:25" },
  ];

  const quickInsights = [
    {
      icon: "🎯",
      title: "השאלה הפופולרית ביותר",
      value: "איך תרצה שניצור איתך קשר?",
      description: "302 תשובות • 65% מעדיפים וואטסאפ"
    },
    {
      icon: "⚡",
      title: "השאלה המהירה ביותר",
      value: "0:18 דקות ממוצע",
      description: "'איך תרצה שניצור איתך קשר?' - תשובה מהירה"
    },
    {
      icon: "📊",
      title: "שיעור השלמה הגבוה ביותר",
      value: "98%",
      description: "'איזה סוג ביטוח מעניין אותך?' - כמעט כולם מסיימים"
    },
    {
      icon: "🕒",
      title: "הזמן הכי פעיל",
      value: "יום ראשון",
      description: "35% מהתשובות מגיעות ביום ראשון"
    }
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
        totalResponses: 87,
        completionRate: 95,
        answers: [
          { option: "וואטסאפ", percentage: 60, count: 52 },
          { option: "טלפון", percentage: 30, count: 26 },
          { option: "מייל", percentage: 10, count: 9 },
        ],
        insights: ["וואטסאפ הוא הערוץ המועדף", "רק 10% מעדיפים מייל"]
      },
      {
        question: "מתי תרצה להתחיל?",
        totalResponses: 82,
        completionRate: 94,
        answers: [
          { option: "השבוע", percentage: 45, count: 37 },
          { option: "החודש", percentage: 35, count: 29 },
          { option: "לא בטוח", percentage: 20, count: 16 },
        ],
        insights: ["45% מהלקוחות מוכנים להתחיל מיד", "20% זקוקים לזמן החלטה"]
      },
      {
        question: "איזה סוג ביטוח מעניין אותך?",
        totalResponses: 85,
        completionRate: 98,
        answers: [
          { option: "ביטוח מקיף", percentage: 55, count: 47 },
          { option: "ביטוח צד ג'", percentage: 30, count: 25 },
          { option: "ביטוח חובה בלבד", percentage: 15, count: 13 },
        ],
        insights: ["רוב הלקוחות מעוניינים בביטוח מקיף", "רק 15% מסתפקים בחובה בלבד"]
      },
      {
        question: "מה התקציב שלך?",
        totalResponses: 78,
        completionRate: 90,
        answers: [
          { option: "עד 200 ש״ח", percentage: 40, count: 31 },
          { option: "200-400 ש״ח", percentage: 35, count: 27 },
          { option: "מעל 400 ש״ח", percentage: 25, count: 20 },
        ],
        insights: ["40% מהלקוחות מחפשים ביטוח זול", "25% מוכנים לשלם יותר"]
      }
    ],
    questionRanking: [
      { question: "איך תרצה שניצור איתך קשר?", completionRate: 95, avgTime: "0:15" },
      { question: "איזה סוג ביטוח מעניין אותך?", completionRate: 98, avgTime: "0:22" },
      { question: "מתי תרצה להתחיל?", completionRate: 94, avgTime: "0:18" },
      { question: "מה התקציב שלך?", completionRate: 90, avgTime: "0:25" },
    ],
    smartInsights: [
      {
        type: "success",
        title: "🎯 שאלה מצוינת!",
        description: "'איזה סוג ביטוח מעניין אותך?' - 98% השלמה, רק 2 שניות ממוצע",
        action: "השאלה הזו עובדת מעולה - אל תשנה אותה!"
      },
      {
        type: "warning", 
        title: "⚠️ יכול להשתפר",
        description: "'מה התקציב שלך?' - 90% השלמה, 25 שניות ממוצע",
        action: "השאלה הזו ארוכה מדי - שקלו לקצר או לפצל"
      },
      {
        type: "info",
        title: "📊 תובנה מעניינת",
        description: "60% מהלקוחות מעדיפים וואטסאפ - התמקדו בערוץ הזה",
        action: "הגדילו את זמינות הוואטסאפ שלכם"
      }
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

          {/* Quick Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickInsights.map((insight, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{insight.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{insight.title}</p>
                      <p className="text-lg font-bold">{insight.value}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Top Questionnaires */}
          <Card>
            <CardHeader>
              <CardTitle>השאלונים הפופולריים ביותר</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topQuestionnaires.map((q, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-green-100 text-green-700' :
                        index === 1 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="font-medium">{q.name}</div>
                    </div>
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
                      <div>
                        <span className="text-muted-foreground">זמן ממוצע: </span>
                        <span className="font-semibold">{q.avgTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Questions Across All Questionnaires */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔥 השאלות הפופולריות ביותר
                <span className="text-sm font-normal text-muted-foreground">בכל השאלונים שלך</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularQuestions.map((q, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-red-100 text-red-700' :
                        index === 1 ? 'bg-orange-100 text-orange-700' :
                        index === 2 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{q.question}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>📊 {q.totalAnswers} תשובות</span>
                          <span>⚡ {q.avgTime} ממוצע</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-primary">תשובה פופולרית:</p>
                      <p className="text-sm text-muted-foreground">{q.topAnswer}</p>
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

          {/* Smart Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💡 תובנות חכמות
                <span className="text-sm font-normal text-muted-foreground">המלצות אוטומטיות לשיפור</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specificQuestionnaireStats.smartInsights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    insight.type === 'success' ? 'bg-green-50 border-green-400' :
                    insight.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="text-lg">{insight.type === 'success' ? '🎯' : insight.type === 'warning' ? '⚠️' : '📊'}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                        <p className="text-xs font-medium mt-2 text-primary">{insight.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Question Performance Ranking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📈 דירוג ביצועי השאלות
                <span className="text-sm font-normal text-muted-foreground">איזה שאלות עובדות הכי טוב</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specificQuestionnaireStats.questionRanking.map((q, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-green-100 text-green-700' :
                        index === 1 ? 'bg-blue-100 text-blue-700' :
                        index === 2 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{q.question}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>השלמה: {q.completionRate}%</span>
                          <span>זמן ממוצע: {q.avgTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {index === 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">הטובה ביותר</span>}
                      {index === 1 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">טובה מאוד</span>}
                      {index === 2 && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">טובה</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Question Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔍 ניתוח מפורט של כל שאלה
                <span className="text-sm font-normal text-muted-foreground">מה הלקוחות באמת חושבים</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {specificQuestionnaireStats.questionBreakdown.map((q, qIndex) => (
                  <div key={qIndex} className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                    {/* Question Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-base">{q.question}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>📊 {q.totalResponses} תשובות</span>
                          <span>✅ {q.completionRate}% השלמה</span>
                        </div>
                      </div>
                    </div>

                    {/* Answer Breakdown */}
                    <div className="space-y-3">
                      {q.answers.map((answer, aIndex) => (
                        <div key={aIndex} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">{answer.option}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">{answer.count} איש</span>
                              <span className="font-semibold text-primary">{answer.percentage}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                aIndex === 0 ? 'bg-green-500' :
                                aIndex === 1 ? 'bg-blue-500' :
                                aIndex === 2 ? 'bg-yellow-500' :
                                'bg-purple-500'
                              }`}
                              style={{ width: `${answer.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Insights */}
                    {q.insights && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h5 className="text-sm font-medium text-blue-800 mb-2">💡 תובנות מפתח:</h5>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {q.insights.map((insight, insightIndex) => (
                            <li key={insightIndex} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
