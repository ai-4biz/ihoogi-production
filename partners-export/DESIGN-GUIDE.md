# 🎨 מדריך עיצוב בלבד - Partners Management

## 📋 סקירה כללית

מדריך זה מכיל את כל ה-classes, colors, spacing, ו-animations המשמשים במערכת ניהול השותפים.

**⚠️ חשוב:** זהו מדריך עיצוב בלבד - לא קוד, רק הנחיות!

---

## 🎨 Colors (צבעים)

### Primary Colors:

```css
/* כחול - עיקרי */
bg-blue-50, bg-blue-100, bg-blue-200, bg-blue-500, bg-blue-600, bg-blue-700
text-blue-600, text-blue-800
border-blue-200, border-blue-400

/* ירוק - הצלחה/הכנסות */
bg-green-50, bg-green-100, bg-green-500, bg-green-600
text-green-600, text-green-400
border-green-200

/* כתום - שותפים פעילים */
bg-orange-50, bg-orange-100, bg-orange-500, bg-orange-600
text-orange-600, text-orange-400
border-orange-200, border-orange-300

/* סגול - עמלות */
bg-purple-50, bg-purple-100, bg-purple-500, bg-purple-600
text-purple-600, text-purple-400
border-purple-200

/* אדום - מסמכים משפטיים */
bg-red-50, bg-red-100, bg-red-200
text-red-600, text-red-800
border-red-200
```

### Gradients:

```css
/* רקעים */
bg-gradient-to-br from-blue-50 to-indigo-50
bg-gradient-to-br from-green-500/10 to-green-500/5
bg-gradient-to-br from-orange-500/10 to-orange-500/5
bg-gradient-to-br from-purple-500/10 to-purple-500/5
bg-gradient-to-br from-blue-600 to-indigo-600
bg-gradient-to-r from-green-50 to-blue-50
bg-gradient-to-r from-orange-50 via-yellow-50 to-amber-50
```

---

## 📏 Spacing (רווחים)

### Padding:

```css
p-2, p-3, p-4, p-6, p-8
px-3, px-4, px-6, px-8
py-2, py-3, py-4, py-6
pt-2, pt-3, pt-4, pt-6
pb-2, pb-3, pb-4, pb-6
```

### Margin:

```css
m-1, m-2, m-3, m-4, m-6, m-8
mx-auto, mx-1, mx-2, mx-4
my-2, my-4, my-6, my-8
mb-2, mb-3, mb-4, mb-6, mb-8
mt-2, mt-3, mt-4, mt-6, mt-auto
```

### Gap:

```css
gap-1, gap-2, gap-3, gap-4, gap-6
```

---

## 📐 Layout (פריסה)

### Grid:

```css
grid grid-cols-1
grid grid-cols-2
grid grid-cols-3
grid grid-cols-4
grid grid-cols-1 md:grid-cols-2
grid grid-cols-1 md:grid-cols-3
grid grid-cols-1 md:grid-cols-6
```

### Flex:

```css
flex items-center
flex items-center justify-between
flex items-center justify-end
flex items-start gap-3
flex flex-col
flex flex-wrap
flex-1
```

---

## 🔲 Borders & Shadows

### Borders:

```css
border
border-0
border-2
border-t, border-b, border-r, border-l
border-gray-200, border-gray-300
border-blue-200, border-green-200, border-orange-200, border-purple-200
border-blue-200/50, border-orange-300/50
rounded-lg, rounded-xl, rounded-2xl
rounded-full
```

### Shadows:

```css
shadow-sm
shadow-md
shadow-lg
shadow-xl
shadow-2xl
hover:shadow-lg
hover:shadow-xl
hover:shadow-2xl
```

---

## 🎭 Transitions & Animations

### Transitions:

```css
transition-colors
transition-shadow
transition-all
duration-300
```

### Animations:

```css
animate-pulse
animate-bounce
```

---

## 📱 Responsive

### Breakpoints:

```css
/* Mobile First */
/* Default: mobile */
md: /* tablet and up */
lg: /* desktop and up */

/* Examples: */
grid-cols-1 md:grid-cols-3
text-sm md:text-base
p-4 md:p-6
```

---

## 🌓 Dark Mode

### Dark Mode Classes:

```css
dark:bg-gray-800
dark:bg-gray-900
dark:text-gray-100
dark:text-gray-400
dark:border-gray-700
dark:border-gray-800
dark:from-purple-950/20
dark:to-purple-900/20
dark:border-purple-800/50
```

---

## 🎯 Component-Specific Styles

### Cards:

```css
/* Card Container */
bg-white rounded-lg shadow-sm border border-gray-200
dark:bg-gray-900 dark:border-gray-700

/* Card Header */
bg-blue-100/50 rounded-t-lg
p-4 md:p-6

/* Card Content */
p-4 md:p-6 !pt-4
```

### Buttons:

```css
/* Primary Button */
bg-blue-600 hover:bg-blue-700 text-white
px-6 py-3 rounded-lg

/* Outline Button */
border border-blue-200 text-blue-600 hover:bg-blue-50

/* Ghost Button */
variant="ghost" size="sm"
```

### Inputs:

```css
text-right border-blue-200 focus:border-blue-400
text-sm rounded-xl
dir="rtl"
```

### Tabs:

```css
/* Tabs Container */
bg-orange-100/50 dark:bg-orange-900/20 rounded-xl p-2 gap-2 border-2 border-orange-300/50

/* Tab Trigger */
rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white
data-[state=active]:shadow-lg font-bold text-base py-3
transition-all hover:bg-orange-400/80
```

### Tables:

```css
/* Table Container */
border rounded-lg overflow-hidden

/* Table Header */
bg-gray-50 dark:bg-gray-800
p-2 text-right font-semibold

/* Table Cell */
p-2 text-right
```

### Badges:

```css
bg-primary text-white
bg-green-500 text-white
bg-orange-500 text-white
variant="outline" className="text-green-600"
```

---

## 📝 Typography

### Font Sizes:

```css
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl
```

### Font Weights:

```css
font-normal, font-medium, font-semibold, font-bold
```

### Text Colors:

```css
text-foreground
text-muted-foreground
text-gray-600, text-gray-700, text-gray-800
text-blue-600, text-green-600, text-orange-600, text-purple-600
```

### Text Alignment:

```css
text-right (RTL)
text-center
text-left
```

---

## 🎨 Special Effects

### Hover Effects:

```css
hover:bg-blue-50
hover:bg-green-50
hover:opacity-90
hover:shadow-lg
hover:shadow-xl
```

### Focus States:

```css
focus:border-blue-400
focus:ring-blue-500
```

### Active States:

```css
data-[state=active]:bg-orange-500
data-[state=active]:text-white
data-[state=active]:shadow-lg
```

---

## 📋 Checklist לעיצוב

כשמטמיעים ב-Angular, ודא:

- [ ] כל ה-colors תואמים
- [ ] כל ה-spacing תואם
- [ ] כל ה-borders תואמים
- [ ] כל ה-shadows תואמים
- [ ] כל ה-transitions תואמים
- [ ] Responsive עובד (mobile, tablet, desktop)
- [ ] Dark mode עובד
- [ ] RTL עובד (text-right, dir="rtl")
- [ ] Hover effects עובדים
- [ ] Focus states עובדים

---

**בהצלחה! 🎉**

