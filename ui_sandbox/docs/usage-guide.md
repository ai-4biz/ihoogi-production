# מדריך שימוש - Hoogi UI Sandbox

## סקירה כללית

מדריך זה מסביר כיצד להשתמש ב-UI Sandbox של Hoogi כדי לשלב את העיצוב בפרויקטים שלך. המדריך מכסה אינטגרציה עם Frameworks שונים ודפוסי עבודה מומלצים.

## הכנה ראשונית

### 1. הורדת הקבצים
```bash
# העתק את התיקייה ui_sandbox לפרויקט שלך
cp -r ui_sandbox/ /path/to/your/project/

# או שכפל את הקבצים הנדרשים
cp ui_sandbox/design-tokens/_tokens.css src/styles/
cp ui_sandbox/components/* src/components/
```

### 2. הוספת טוקנים לפרויקט
```css
/* ב-CSS הראשי שלך */
@import url('./design-tokens/_tokens.css');

/* או העתק את התוכן ישירות */
:root {
  --color-primary: #10B3B3;
  --color-secondary: #F9A826;
  /* ... שאר הטוקנים */
}
```

### 3. הגדרת Tailwind
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./ui_sandbox/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // ... שאר הצבעים
      },
      fontFamily: {
        'hebrew': ['Assistant', 'Heebo', 'Arial Hebrew', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## אינטגרציה עם Frameworks

### React

#### 1. יצירת רכיב כפתור
```tsx
// src/components/Button.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  size = 'default', 
  className, 
  children, 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-primary text-white hover:bg-primary-hover",
    secondary: "bg-secondary text-white hover:bg-secondary-hover",
    outline: "border border-primary bg-transparent text-primary hover:bg-primary-light",
    ghost: "bg-transparent text-primary hover:bg-primary-light",
    destructive: "bg-error text-white hover:bg-red-600",
    link: "bg-transparent text-primary underline-offset-4 hover:underline",
  };
  
  const sizes = {
    sm: "h-8 px-3",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

#### 2. שימוש ברכיב
```tsx
// src/pages/Dashboard.tsx
import React from 'react';
import Button from '@/components/Button';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-surface text-text-primary p-8">
      <h1 className="text-3xl font-bold mb-6">לוח בקרה</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border-2 border-secondary/40 rounded-2xl p-6 bg-card shadow-sm">
          <h3 className="text-xl font-bold text-text-primary mb-4">תגובות</h3>
          <p className="text-3xl font-bold text-secondary">156</p>
        </div>
        
        <div className="border-2 border-primary/40 rounded-2xl p-6 bg-card shadow-sm">
          <h3 className="text-xl font-bold text-text-primary mb-4">לידים</h3>
          <p className="text-3xl font-bold text-primary">23</p>
        </div>
      </div>
      
      <Button variant="primary" size="lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        שאלון חדש
      </Button>
    </div>
  );
};

export default Dashboard;
```

### Vue.js

#### 1. יצירת רכיב כפתור
```vue
<!-- src/components/Button.vue -->
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
});

const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default: "bg-primary text-white hover:bg-primary-hover",
  secondary: "bg-secondary text-white hover:bg-secondary-hover",
  outline: "border border-primary bg-transparent text-primary hover:bg-primary-light",
  ghost: "bg-transparent text-primary hover:bg-primary-light",
  destructive: "bg-error text-white hover:bg-red-600",
  link: "bg-transparent text-primary underline-offset-4 hover:underline",
};

const sizes = {
  sm: "h-8 px-3",
  default: "h-10 px-4 py-2",
  lg: "h-12 px-8",
  icon: "h-10 w-10",
};

const buttonClasses = computed(() => [
  baseClasses,
  variants[props.variant],
  sizes[props.size],
]);
</script>
```

#### 2. שימוש ברכיב
```vue
<!-- src/pages/Dashboard.vue -->
<template>
  <div class="bg-surface text-text-primary p-8">
    <h1 class="text-3xl font-bold mb-6">לוח בקרה</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="border-2 border-secondary/40 rounded-2xl p-6 bg-card shadow-sm">
        <h3 class="text-xl font-bold text-text-primary mb-4">תגובות</h3>
        <p class="text-3xl font-bold text-secondary">{{ responses }}</p>
      </div>
      
      <div class="border-2 border-primary/40 rounded-2xl p-6 bg-card shadow-sm">
        <h3 class="text-xl font-bold text-text-primary mb-4">לידים</h3>
        <p class="text-3xl font-bold text-primary">{{ leads }}</p>
      </div>
    </div>
    
    <Button variant="primary" size="lg" @click="createQuestionnaire">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      שאלון חדש
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/Button.vue';

const responses = ref(156);
const leads = ref(23);

const createQuestionnaire = () => {
  // לוגיקה ליצירת שאלון
};
</script>
```

### Angular

#### 1. יצירת רכיב כפתור
```typescript
// src/app/components/button/button.component.ts
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button 
      [class]="buttonClasses"
      [disabled]="disabled"
      [attr.type]="type"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' = 'default';
  @Input() size: 'sm' | 'default' | 'lg' | 'icon' = 'default';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @HostBinding('class') get buttonClasses() {
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "bg-primary text-white hover:bg-primary-hover",
      secondary: "bg-secondary text-white hover:bg-secondary-hover",
      outline: "border border-primary bg-transparent text-primary hover:bg-primary-light",
      ghost: "bg-transparent text-primary hover:bg-primary-light",
      destructive: "bg-error text-white hover:bg-red-600",
      link: "bg-transparent text-primary underline-offset-4 hover:underline",
    };
    
    const sizes = {
      sm: "h-8 px-3",
      default: "h-10 px-4 py-2",
      lg: "h-12 px-8",
      icon: "h-10 w-10",
    };

    return `${baseClasses} ${variants[this.variant]} ${sizes[this.size]}`;
  }
}
```

#### 2. שימוש ברכיב
```html
<!-- src/app/pages/dashboard/dashboard.component.html -->
<div class="bg-surface text-text-primary p-8">
  <h1 class="text-3xl font-bold mb-6">לוח בקרה</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div class="border-2 border-secondary/40 rounded-2xl p-6 bg-card shadow-sm">
      <h3 class="text-xl font-bold text-text-primary mb-4">תגובות</h3>
      <p class="text-3xl font-bold text-secondary">{{ responses }}</p>
    </div>
    
    <div class="border-2 border-primary/40 rounded-2xl p-6 bg-card shadow-sm">
      <h3 class="text-xl font-bold text-text-primary mb-4">לידים</h3>
      <p class="text-3xl font-bold text-primary">{{ leads }}</p>
    </div>
  </div>
  
  <app-button variant="primary" size="lg" (click)="createQuestionnaire()">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    שאלון חדש
  </app-button>
</div>
```

## דפוסי עבודה מומלצים

### 1. יצירת Design System

#### מבנה תיקיות מומלץ:
```
src/
├── components/
│   ├── ui/           # רכיבי UI בסיסיים
│   ├── forms/        # רכיבי טפסים
│   ├── layout/       # רכיבי פריסה
│   └── features/     # רכיבי תכונות
├── styles/
│   ├── tokens.css    # טוקני עיצוב
│   ├── base.css      # סגנונות בסיסיים
│   └── components.css # סגנונות רכיבים
└── utils/
    └── cn.ts         # פונקציית classnames
```

#### פונקציית cn (Classnames):
```typescript
// src/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 2. יצירת רכיבים מורכבים

#### רכיב כרטיס:
```tsx
// src/components/ui/Card.tsx
import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
}

const Card: React.FC<CardProps> = ({ variant = 'default', className, children, ...props }) => {
  const variants = {
    default: "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
    elevated: "rounded-lg border border-border bg-card text-card-foreground shadow-lg",
    outlined: "rounded-lg border-2 border-primary bg-card text-card-foreground shadow-sm",
    filled: "rounded-lg border border-border bg-primary-light text-card-foreground shadow-sm",
  };

  return (
    <div
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight text-text-primary", className)} {...props} />
);

const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn("text-sm text-text-muted", className)} {...props} />
);

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
```

### 3. שימוש ברכיבים

```tsx
// src/components/features/StatsCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-text-muted">
          {title}
        </CardTitle>
        {icon && (
          <div className="p-2 bg-primary-light rounded-lg">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-text-primary">{value}</div>
        {trend && (
          <p className={`text-xs ${trend.isPositive ? 'text-success' : 'text-error'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}% מהחודש הקודם
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
```

## התאמות מתקדמות

### 1. יצירת טוקנים מותאמים אישית
```css
/* src/styles/tokens.css */
:root {
  /* טוקנים מותאמים לפרויקט */
  --color-brand-primary: #10B3B3;
  --color-brand-secondary: #F9A826;
  
  /* טוקנים מותאמים לתכונות */
  --color-success-light: #10B98120;
  --color-warning-light: #F59E0B20;
  --color-error-light: #EF444420;
  
  /* טוקנים מותאמים לפריסה */
  --spacing-section: 2rem;
  --spacing-component: 1rem;
  --spacing-element: 0.5rem;
}
```

### 2. יצירת רכיבים מותאמים אישית
```tsx
// src/components/features/QuestionnaireCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface QuestionnaireCardProps {
  title: string;
  description: string;
  status: 'active' | 'draft' | 'paused';
  responses: number;
  leads: number;
  lastUpdated: string;
  onView?: () => void;
  onEdit?: () => void;
}

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({
  title,
  description,
  status,
  responses,
  leads,
  lastUpdated,
  onView,
  onEdit,
}) => {
  const statusConfig = {
    active: { label: 'פעיל', variant: 'success' as const },
    draft: { label: 'טיוטה', variant: 'warning' as const },
    paused: { label: 'מושהה', variant: 'secondary' as const },
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-text-muted mt-1">{description}</p>
          </div>
          <Badge variant={statusConfig[status].variant}>
            {statusConfig[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-muted">תגובות:</span>
              <span className="font-medium text-text-primary mr-2">{responses}</span>
            </div>
            <div>
              <span className="text-text-muted">לידים:</span>
              <span className="font-medium text-text-primary mr-2">{leads}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">עדכון אחרון: {lastUpdated}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onView}>
                צפה
              </Button>
              <Button variant="ghost" size="sm" onClick={onEdit}>
                ערוך
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionnaireCard;
```

## בדיקות ואיכות

### 1. בדיקות יחידה לרכיבים
```typescript
// src/components/__tests__/Button.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

### 2. בדיקות נגישות
```typescript
// src/components/__tests__/Button.a11y.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from '../Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## תחזוקה ועדכונים

### 1. עדכון טוקנים
```bash
# העתק טוקנים חדשים
cp ui_sandbox/design-tokens/_tokens.css src/styles/

# עדכן את Tailwind config
# tailwind.config.js
```

### 2. עדכון רכיבים
```bash
# העתק רכיבים חדשים
cp ui_sandbox/components/button.html src/components/ui/Button.tsx

# התאם ל-Framework שלך
# עדכן את התיעוד
```

### 3. בדיקות לאחר עדכון
```bash
# הרץ בדיקות
npm test

# בדוק build
npm run build

# בדוק linting
npm run lint
```

## תמיכה ועזרה

### מקורות מידע נוספים:
- [components-map.md](./components-map.md) - מפת רכיבים מלאה
- [screens-spec.md](./screens-spec.md) - מפרטי מסכים
- [policy.md](./policy.md) - מדיניות עיצוב

### צור קשר:
- **שאלות טכניות**: צור קשר עם צוות הפיתוח
- **שאלות עיצוב**: צור קשר עם צוות העיצוב
- **באגים**: דווח במערכת הניהול

---

**עדכון אחרון**: 15 במרץ 2024  
**גרסה**: 1.0  
**מחבר**: צוות העיצוב Hoogi
