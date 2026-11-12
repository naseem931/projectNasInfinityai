// =========================================================================
// NasInfinity AI - Interactive Sandbox Code Generators & Fallback Engines
// =========================================================================

    // =========================================================================
    // Code Generators & Synthesis Engines (Offline & Fallback Capable)
    // =========================================================================

    // 1. Interactive Calendar Generator
    function generateCalendarCodeResponse() {
      return `### 📅 Simple Interactive Calendar

Here is a complete, modern, and responsive interactive calendar application built with **HTML, CSS, and JavaScript**. 

> 💡 **Live Preview:** You can click the **▶ Run / Preview Live** button on the code card below to navigate months, view dates, and pick days interactively right now inside NasInfinity!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Interactive Calendar</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body {
      background: #0f172a;
      color: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 16px;
    }
    .calendar-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 20px;
      padding: 24px;
      width: 100%;
      max-width: 380px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .month-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #38bdf8;
    }
    .nav-btn {
      background: #334155;
      border: none;
      color: #f8fafc;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .nav-btn:hover {
      background: #475569;
      color: #38bdf8;
      transform: scale(1.05);
    }
    .nav-btn:active {
      transform: scale(0.95);
    }
    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-weight: 600;
      font-size: 0.8rem;
      color: #94a3b8;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
    }
    .day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.15s ease;
      background: #0f172a80;
      border: 1px solid transparent;
      user-select: none;
    }
    .day:hover:not(.empty) {
      background: #334155;
      border-color: #64748b;
    }
    .day.empty {
      cursor: default;
      background: transparent;
      border: none;
    }
    .day.today {
      border: 2px solid #38bdf8;
      color: #38bdf8;
      font-weight: 700;
    }
    .day.selected {
      background: #6366f1 !important;
      color: #ffffff;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    }
    .footer {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .selected-info {
      font-size: 0.85rem;
      color: #94a3b8;
    }
    .today-btn {
      background: #6366f1;
      border: none;
      color: white;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .today-btn:hover {
      background: #4f46e5;
    }
  </style>
</head>
<body>
  <div class="calendar-card">
    <div class="header">
      <button class="nav-btn" onclick="prevMonth()" title="Previous Month">‹</button>
      <div id="monthYear" class="month-title"></div>
      <button class="nav-btn" onclick="nextMonth()" title="Next Month">›</button>
    </div>
    
    <div class="weekdays">
      <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
    </div>
    
    <div id="daysGrid" class="days-grid"></div>

    <div class="footer">
      <div id="selectedInfo" class="selected-info">Select a date</div>
      <button class="today-btn" onclick="goToToday()">Today</button>
    </div>
  </div>

  <script>
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();
    let selectedDate = null;

    function renderCalendar() {
      const monthYearEl = document.getElementById('monthYear');
      const daysGridEl = document.getElementById('daysGrid');
      
      monthYearEl.textContent = monthNames[currentMonth] + ' ' + currentYear;
      daysGridEl.innerHTML = '';

      const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'day empty';
        daysGridEl.appendChild(emptyDiv);
      }

      const isCurrentMonthYear = now.getFullYear() === currentYear && now.getMonth() === currentMonth;

      for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'day';
        dayEl.textContent = day;

        if (isCurrentMonthYear && day === now.getDate()) {
          dayEl.classList.add('today');
        }

        if (selectedDate && selectedDate.year === currentYear && selectedDate.month === currentMonth && selectedDate.day === day) {
          dayEl.classList.add('selected');
        }

        dayEl.addEventListener('click', () => {
          selectedDate = { year: currentYear, month: currentMonth, day: day };
          document.getElementById('selectedInfo').textContent = monthNames[currentMonth].slice(0, 3) + ' ' + day + ', ' + currentYear;
          renderCalendar();
        });

        daysGridEl.appendChild(dayEl);
      }
    }

    function prevMonth() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    }

    function nextMonth() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    }

    function goToToday() {
      currentYear = now.getFullYear();
      currentMonth = now.getMonth();
      selectedDate = { year: currentYear, month: currentMonth, day: now.getDate() };
      document.getElementById('selectedInfo').textContent = 'Today: ' + monthNames[currentMonth].slice(0, 3) + ' ' + now.getDate() + ', ' + currentYear;
      renderCalendar();
    }

    renderCalendar();
  <\/script>
</body>
</html>
\`\`\`

---

### 🐍 Python Console Alternative
If you prefer a calendar script in Python using Python's standard \`calendar\` module:

\`\`\`python
import calendar
from datetime import datetime

def display_calendar():
    now = datetime.now()
    year = now.year
    month = now.month
    
    print("=== Calendar for " + calendar.month_name[month] + " " + str(year) + " ===\\n")
    cal = calendar.TextCalendar(calendar.SUNDAY)
    month_str = cal.formatmonth(year, month)
    print(month_str)
    print("Current Date: " + now.strftime('%A, %B %d, %Y'))

if __name__ == '__main__':
    display_calendar()
\`\`\`

You can preview the interactive HTML calendar live right inside NasInfinity using the **▶ Run / Preview Live** button above, or copy the code with one click!`;
    }

    // Helper: Detect target programming language from prompt
    function detectProgrammingLanguage(prompt) {
      if (!prompt) return null;
      const p = prompt.toLowerCase();
      if (/(c\+\+|cpp|\bc\s*plus\s*plus\b)/i.test(p)) return 'cpp';
      if (/(python|\bpy\b)/i.test(p)) return 'python';
      if (/(\bjava\b)(?!script)/i.test(p)) return 'java';
      if (/(c#|csharp|\bc\s*sharp\b)/i.test(p)) return 'csharp';
      if (/(rust|rustlang)/i.test(p)) return 'rust';
      if (/(golang|\bgo\b)/i.test(p) && /(code|program|build|write|create|make|in\s+go|using\s+go|with\s+go|app)/i.test(p)) return 'go';
      if (/(\bc\b|\bc\s+language|\bc\s+programming)/i.test(p) && /(in\s+c\b|using\s+c\b|with\s+c\b|code\s+in\s+c|program\s+in\s+c|c\s+calculator|c\s+code)/i.test(p)) return 'c';
      if (/(javascript|\bjs\b|node|nodejs)/i.test(p)) return 'javascript';
      if (/(html|css|web|browser|frontend)/i.test(p)) return 'html';
      return null;
    }

    // 2. Interactive Calculator Generator (Language-Aware: C++, Python, Java, C, C#, Rust, Go, JS, Web)
    function generateCalculatorCodeResponse(prompt) {
      const lang = detectProgrammingLanguage(prompt);

      // --- 2A. C++ Console Calculator ---
      if (lang === 'cpp') {
        return `### 🧮 How to Build a Calculator Using C++ (Step-by-Step Practical Guide)

Building a calculator in C++ is a foundational milestone. It teaches you how to handle standard input/output (\`std::cin\`, \`std::cout\`), control flow with \`switch\` statements, input validation loops, and critical edge cases such as **preventing division by zero**.

---

#### 🛠️ Key Concepts & Architecture:
1. **Header Streams (\`<iostream>\`, \`<iomanip>\`, \`<cmath>\`):** Used for formatted console input/output and math operations like powers.
2. **Double Precision (\`double\`):** Enables support for both integers and floating-point decimal calculations.
3. **\`switch(op)\` Dispatcher:** Selects the corresponding arithmetic function cleanly.
4. **Division-by-Zero Guard:** Checks \`if (b == 0.0)\` before dividing to prevent \`inf\` or undefined behavior.
5. **Continuous REPL Loop:** Keeps the calculator running until the user enters \`'q'\` to quit.

---

#### 💻 Complete, Runnable C++ Source Code:

\`\`\`cpp
#include <iostream>
#include <iomanip>
#include <cmath>
#include <limits>

using namespace std;

// Function prototypes
void displayMenu();
double calculate(double a, double b, char op, bool &error);

int main() {
    cout << "==========================================\\n";
    cout << "       🧮 C++ CONSOLE CALCULATOR          \\n";
    cout << "==========================================\\n";

    while (true) {
        double num1 = 0.0, num2 = 0.0;
        char op = '+';

        // 1. Prompt first number with robust input validation
        cout << "\\nEnter first number (or type 'q' to quit): ";
        if (!(cin >> num1)) {
            cin.clear();
            string token;
            cin >> token;
            if (token == "q" || token == "Q") break;
            cout << "❌ Invalid number! Please try again.\\n";
            cin.ignore(numeric_limits<streamsize>::max(), '\\n');
            continue;
        }

        // 2. Select operator
        displayMenu();
        cout << "Choose operator (+, -, *, /, ^): ";
        cin >> op;
        if (op == 'q' || op == 'Q') break;

        // 3. Prompt second number with validation
        cout << "Enter second number: ";
        while (!(cin >> num2)) {
            cout << "❌ Invalid input! Enter second number: ";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\\n');
        }

        // 4. Perform calculation
        bool hasError = false;
        double result = calculate(num1, num2, op, hasError);

        // 5. Display formatted output
        cout << "\\n------------------------------------------\\n";
        if (hasError) {
            cout << "❌ Error: Invalid operator or Division by Zero!\\n";
        } else {
            cout << fixed << setprecision(4);
            cout << "✅ Result: " << num1 << " " << op << " " << num2 << " = " << result << "\\n";
        }
        cout << "------------------------------------------\\n";
    }

    cout << "\\nThank you for using the C++ Calculator! Goodbye.\\n";
    return 0;
}

void displayMenu() {
    cout << "Operations: [+] Addition | [-] Subtraction | [*] Multiplication | [/] Division | [^] Power\\n";
}

double calculate(double a, double b, char op, bool &error) {
    error = false;
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0.0) {
                error = true;
                return 0.0;
            }
            return a / b;
        case '^':
            return pow(a, b);
        default:
            error = true;
            return 0.0;
    }
}
\`\`\`

---

#### 🚀 How to Compile and Run:

1. **Save the code:** Create a file named \`calculator.cpp\` and paste the code above.
2. **Compile with GCC / G++ (Linux, macOS, Windows MinGW):**
   \`\`\`bash
   g++ -std=c++17 -O2 calculator.cpp -o calculator
   \`\`\`
3. **Execute:**
   * **Linux / macOS:**
     \`\`\`bash
     ./calculator
     \`\`\`
   * **Windows (PowerShell / Command Prompt):**
     \`\`\`powershell
     .\\calculator.exe
     \`\`\`

---

#### 💡 Pro Tips for Extending Your C++ Calculator:
* **Add Memory Storage:** Add a \`double memory = 0.0;\` variable with commands \`M+\`, \`M-\`, and \`MR\`.
* **String Parsing:** Use the *Shunting-Yard algorithm* with \`std::stack\` to evaluate full mathematical expressions like \`"3 + 5 * (2 - 8)"\`.
`;
      }

      // --- 2B. Python Console Calculator ---
      if (lang === 'python') {
        return `### 🧮 How to Build a Calculator in Python (Step-by-Step Guide)

Python makes building a calculator clean and readable thanks to functions, dictionary dispatching, and built-in exception handling.

---

#### 🛠️ Key Concepts:
1. **Modular Functions:** Each math operation (\`add\`, \`subtract\`, \`multiply\`, \`divide\`) is encapsulated in its own function.
2. **Dictionary Dispatcher:** Avoids long \`if-elif-else\` chains by mapping operator symbols to functions: \`OPERATIONS[op](a, b)\`.
3. **Exception Handling:** Uses \`try...except\` to handle non-numeric text gracefully and catches \`ZeroDivisionError\`.
4. **Interactive REPL Loop:** Runs continuously until the user types \`'q'\`.

---

#### 💻 Complete Python Source Code:

\`\`\`python
# calculator.py - Complete Python Calculator
def add(x, y): return x + y
def subtract(x, y): return x - y
def multiply(x, y): return x * y
def divide(x, y):
    if y == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return x / y
def power(x, y): return x ** y

OPERATIONS = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
    '^': power
}

def main():
    print("=" * 44)
    print("        🧮 PYTHON CONSOLE CALCULATOR       ")
    print("=" * 44)
    print("Supported: +, -, *, /, ^  (Type 'q' to exit)")

    while True:
        first_input = input("\\nEnter first number (or 'q' to quit): ").strip()
        if first_input.lower() == 'q':
            print("Goodbye! Thanks for calculating.")
            break

        try:
            num1 = float(first_input)
        except ValueError:
            print("❌ Invalid input! Please enter a valid number.")
            continue

        op = input("Choose operator (+, -, *, /, ^): ").strip()
        if op.lower() == 'q':
            break
        if op not in OPERATIONS:
            print(f"❌ Unknown operator '{op}'! Choose +, -, *, /, or ^.")
            continue

        second_input = input("Enter second number: ").strip()
        try:
            num2 = float(second_input)
            calc_fn = OPERATIONS[op]
            result = calc_fn(num1, num2)
            print("-" * 44)
            print(f"✅ Result: {num1} {op} {num2} = {result}")
            print("-" * 44)
        except ValueError:
            print("❌ Invalid second number! Calculation canceled.")
        except ZeroDivisionError as e:
            print(f"❌ Error: {e}!")

if __name__ == '__main__':
    main()
\`\`\`

---

#### 🚀 How to Run:
\`\`\`bash
python calculator.py
\`\`\`
`;
      }

      // --- 2C. Java Console Calculator ---
      if (lang === 'java') {
        return `### 🧮 How to Build a Calculator in Java (Step-by-Step Guide)

Java provides strong typing and object-oriented structure. Here is a complete, production-ready console calculator using \`java.util.Scanner\`.

---

#### 💻 Complete Java Source Code:

\`\`\`java
// Calculator.java
import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("==========================================");
        System.out.println("        🧮 JAVA CONSOLE CALCULATOR         ");
        System.out.println("==========================================");

        while (true) {
            System.out.print("\\nEnter first number (or type 'q' to quit): ");
            String input1 = scanner.next();
            if (input1.equalsIgnoreCase("q")) break;

            double num1;
            try {
                num1 = Double.parseDouble(input1);
            } catch (NumberFormatException e) {
                System.out.println("❌ Invalid input! Please enter a valid number.");
                continue;
            }

            System.out.print("Choose operator (+, -, *, /, ^): ");
            char op = scanner.next().charAt(0);
            if (op == 'q' || op == 'Q') break;

            System.out.print("Enter second number: ");
            double num2;
            try {
                num2 = Double.parseDouble(scanner.next());
            } catch (NumberFormatException e) {
                System.out.println("❌ Invalid second number! Canceled.");
                continue;
            }

            System.out.println("------------------------------------------");
            switch (op) {
                case '+':
                    System.out.printf("✅ Result: %.4f + %.4f = %.4f%n", num1, num2, (num1 + num2));
                    break;
                case '-':
                    System.out.printf("✅ Result: %.4f - %.4f = %.4f%n", num1, num2, (num1 - num2));
                    break;
                case '*':
                    System.out.printf("✅ Result: %.4f * %.4f = %.4f%n", num1, num2, (num1 * num2));
                    break;
                case '/':
                    if (num2 == 0) {
                        System.out.println("❌ Error: Division by zero is not allowed!");
                    } else {
                        System.out.printf("✅ Result: %.4f / %.4f = %.4f%n", num1, num2, (num1 / num2));
                    }
                    break;
                case '^':
                    System.out.printf("✅ Result: %.4f ^ %.4f = %.4f%n", num1, num2, Math.pow(num1, num2));
                    break;
                default:
                    System.out.println("❌ Error: Unsupported operator '" + op + "'");
            }
            System.out.println("------------------------------------------");
        }

        System.out.println("\\nGoodbye! Thanks for using Java Calculator.");
        scanner.close();
    }
}
\`\`\`

---

#### 🚀 How to Compile and Run:
\`\`\`bash
javac Calculator.java
java Calculator
\`\`\`
`;
      }

      // --- 2D. C Console Calculator ---
      if (lang === 'c') {
        return `### 🧮 How to Build a Calculator in C (Step-by-Step Guide)

Here is a fast, lightweight C calculator using standard \`<stdio.h>\` and \`<math.h>\`.

---

#### 💻 Complete C Source Code:

\`\`\`c
#include <stdio.h>
#include <math.h>

int main() {
    double num1, num2, result;
    char op;
    int running = 1;

    printf("==========================================\\n");
    printf("         🧮 C CONSOLE CALCULATOR          \\n");
    printf("==========================================\\n");

    while (running) {
        printf("\\nEnter first number: ");
        if (scanf("%lf", &num1) != 1) {
            printf("Invalid input! Exiting.\\n");
            break;
        }

        printf("Enter operator (+, -, *, /, ^): ");
        scanf(" %c", &op);

        printf("Enter second number: ");
        if (scanf("%lf", &num2) != 1) {
            printf("Invalid input! Exiting.\\n");
            break;
        }

        printf("------------------------------------------\\n");
        switch (op) {
            case '+':
                result = num1 + num2;
                printf("✅ Result: %.4lf + %.4lf = %.4lf\\n", num1, num2, result);
                break;
            case '-':
                result = num1 - num2;
                printf("✅ Result: %.4lf - %.4lf = %.4lf\\n", num1, num2, result);
                break;
            case '*':
                result = num1 * num2;
                printf("✅ Result: %.4lf * %.4lf = %.4lf\\n", num1, num2, result);
                break;
            case '/':
                if (num2 == 0) {
                    printf("❌ Error: Division by zero!\\n");
                } else {
                    result = num1 / num2;
                    printf("✅ Result: %.4lf / %.4lf = %.4lf\\n", num1, num2, result);
                }
                break;
            case '^':
                result = pow(num1, num2);
                printf("✅ Result: %.4lf ^ %.4lf = %.4lf\\n", num1, num2, result);
                break;
            default:
                printf("❌ Error: Unknown operator '%c'\\n", op);
        }
        printf("------------------------------------------\\n");

        printf("Calculate again? (1 = yes, 0 = no): ");
        if (scanf("%d", &running) != 1 || running == 0) {
            break;
        }
    }

    printf("\\nGoodbye! Thanks for using C Calculator.\\n");
    return 0;
}
\`\`\`

---

#### 🚀 How to Compile and Run:
\`\`\`bash
gcc -O2 calculator.c -o calculator -lm
./calculator
\`\`\`
`;
      }

      // --- 2E. C# Console Calculator ---
      if (lang === 'csharp') {
        return `### 🧮 How to Build a Calculator in C# (.NET)

Here is a modern C# console application using clean string parsing and \`switch\` expressions.

---

#### 💻 Complete C# Source Code (\`Program.cs\`):

\`\`\`csharp
using System;

class Program {
    static void Main() {
        Console.WriteLine("==========================================");
        Console.WriteLine("        🧮 C# CONSOLE CALCULATOR          ");
        Console.WriteLine("==========================================");

        while (true) {
            Console.Write("\\nEnter first number (or 'q' to quit): ");
            string input1 = Console.ReadLine()?.Trim() ?? "";
            if (input1.ToLower() == "q") break;

            if (!double.TryParse(input1, out double num1)) {
                Console.WriteLine("❌ Invalid number! Please try again.");
                continue;
            }

            Console.Write("Enter operator (+, -, *, /, ^): ");
            string op = Console.ReadLine()?.Trim() ?? "";

            Console.Write("Enter second number: ");
            if (!double.TryParse(Console.ReadLine(), out double num2)) {
                Console.WriteLine("❌ Invalid second number!");
                continue;
            }

            Console.WriteLine("------------------------------------------");
            switch (op) {
                case "+": Console.WriteLine($"✅ Result: {num1} + {num2} = {num1 + num2}"); break;
                case "-": Console.WriteLine($"✅ Result: {num1} - {num2} = {num1 - num2}"); break;
                case "*": Console.WriteLine($"✅ Result: {num1} * {num2} = {num1 * num2}"); break;
                case "/": 
                    if (num2 == 0) Console.WriteLine("❌ Error: Cannot divide by zero!");
                    else Console.WriteLine($"✅ Result: {num1} / {num2} = {num1 / num2}");
                    break;
                case "^": Console.WriteLine($"✅ Result: {num1} ^ {num2} = {Math.Pow(num1, num2)}"); break;
                default: Console.WriteLine($"❌ Unknown operator '{op}'"); break;
            }
            Console.WriteLine("------------------------------------------");
        }

        Console.WriteLine("\\nGoodbye! Thanks for using C# Calculator.");
    }
}
\`\`\`

---

#### 🚀 How to Run:
\`\`\`bash
dotnet run
\`\`\`
`;
      }

      // --- 2F. Rust Console Calculator ---
      if (lang === 'rust') {
        return `### 🧮 How to Build a Calculator in Rust

Rust ensures memory safety and robust error handling. Here is an idiomatic Rust calculator.

---

#### 💻 Complete Rust Source Code (\`src/main.rs\`):

\`\`\`rust
use std::io::{self, Write};

fn read_line(prompt: &str) -> String {
    print!("{}", prompt);
    io::stdout().flush().unwrap();
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    input.trim().to_string()
}

fn main() {
    println!("==========================================");
    println!("        🧮 RUST CONSOLE CALCULATOR        ");
    println!("==========================================");

    loop {
        let first = read_line("\\nEnter first number (or 'q' to quit): ");
        if first.eq_ignore_ascii_case("q") { break; }

        let num1: f64 = match first.parse() {
            Ok(n) => n,
            Err(_) => { println!("❌ Invalid number!"); continue; }
        };

        let op = read_line("Enter operator (+, -, *, /): ");
        let second = read_line("Enter second number: ");
        let num2: f64 = match second.parse() {
            Ok(n) => n,
            Err(_) => { println!("❌ Invalid second number!"); continue; }
        };

        println!("------------------------------------------");
        match op.as_str() {
            "+" => println!("✅ Result: {} + {} = {}", num1, num2, num1 + num2),
            "-" => println!("✅ Result: {} - {} = {}", num1, num2, num1 - num2),
            "*" => println!("✅ Result: {} * {} = {}", num1, num2, num1 * num2),
            "/" => {
                if num2 == 0.0 { println!("❌ Error: Cannot divide by zero!"); }
                else { println!("✅ Result: {} / {} = {}", num1, num2, num1 / num2); }
            },
            _ => println!("❌ Unsupported operator '{}'", op),
        }
        println!("------------------------------------------");
    }
    println!("Goodbye!");
}
\`\`\`

---

#### 🚀 How to Run:
\`\`\`bash
cargo run
\`\`\`
`;
      }

      // --- 2G. Go (Golang) Console Calculator ---
      if (lang === 'go') {
        return `### 🧮 How to Build a Calculator in Go (Golang)

---

#### 💻 Complete Go Source Code (\`main.go\`):

\`\`\`go
package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("==========================================")
	fmt.Println("         🧮 GO CONSOLE CALCULATOR         ")
	fmt.Println("==========================================")

	for {
		fmt.Print("\\nEnter first number (or 'q' to quit): ")
		input1, _ := reader.ReadString('\\n')
		input1 = strings.TrimSpace(input1)
		if strings.ToLower(input1) == "q" { break }

		num1, err := strconv.ParseFloat(input1, 64)
		if err != nil {
			fmt.Println("❌ Invalid number! Please try again.")
			continue
		}

		fmt.Print("Enter operator (+, -, *, /, ^): ")
		op, _ := reader.ReadString('\\n')
		op = strings.TrimSpace(op)

		fmt.Print("Enter second number: ")
		input2, _ := reader.ReadString('\\n')
		input2 = strings.TrimSpace(input2)
		num2, err := strconv.ParseFloat(input2, 64)
		if err != nil {
			fmt.Println("❌ Invalid second number!")
			continue
		}

		fmt.Println("------------------------------------------")
		switch op {
		case "+": fmt.Printf("✅ Result: %.4f + %.4f = %.4f\\n", num1, num2, num1+num2)
		case "-": fmt.Printf("✅ Result: %.4f - %.4f = %.4f\\n", num1, num2, num1-num2)
		case "*": fmt.Printf("✅ Result: %.4f * %.4f = %.4f\\n", num1, num2, num1*num2)
		case "/":
			if num2 == 0 {
				fmt.Println("❌ Error: Division by zero!")
			} else {
				fmt.Printf("✅ Result: %.4f / %.4f = %.4f\\n", num1, num2, num1/num2)
			}
		case "^": fmt.Printf("✅ Result: %.4f ^ %.4f = %.4f\\n", num1, num2, math.Pow(num1, num2))
		default: fmt.Printf("❌ Unknown operator '%s'\\n", op)
		}
		fmt.Println("------------------------------------------")
	}
	fmt.Println("Goodbye!")
}
\`\`\`

---

#### 🚀 How to Run:
\`\`\`bash
go run main.go
\`\`\`
`;
      }

      // --- 2H. JavaScript / Node.js Console Calculator ---
      if (lang === 'javascript') {
        return `### 🧮 How to Build a Calculator in JavaScript / Node.js

Here is a command-line calculator for Node.js using the standard \`readline\` module.

---

#### 💻 Complete Node.js Source Code (\`calculator.js\`):

\`\`\`javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('==========================================');
console.log('    🧮 NODE.JS CONSOLE CALCULATOR         ');
console.log('==========================================');

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function startCalculator() {
  while (true) {
    const input1 = await askQuestion('\\nEnter first number (or "q" to quit): ');
    if (input1.trim().toLowerCase() === 'q') break;

    const num1 = parseFloat(input1);
    if (isNaN(num1)) {
      console.log('❌ Invalid number! Please try again.');
      continue;
    }

    const op = await askQuestion('Choose operator (+, -, *, /, ^): ');
    const input2 = await askQuestion('Enter second number: ');
    const num2 = parseFloat(input2);

    if (isNaN(num2)) {
      console.log('❌ Invalid second number!');
      continue;
    }

    console.log('------------------------------------------');
    switch (op.trim()) {
      case '+': console.log(\`✅ Result: \${num1} + \${num2} = \${num1 + num2}\`); break;
      case '-': console.log(\`✅ Result: \${num1} - \${num2} = \${num1 - num2}\`); break;
      case '*': console.log(\`✅ Result: \${num1} * \${num2} = \${num1 * num2}\`); break;
      case '/':
        if (num2 === 0) console.log('❌ Error: Division by zero!');
        else console.log(\`✅ Result: \${num1} / \${num2} = \${num1 / num2}\`);
        break;
      case '^': console.log(\`✅ Result: \${num1} ^ \${num2} = \${Math.pow(num1, num2)}\`); break;
      default: console.log(\`❌ Unknown operator "\${op}"\`);
    }
    console.log('------------------------------------------');
  }

  console.log('\\nGoodbye! Thanks for using Node.js Calculator.');
  rl.close();
}

startCalculator();
\`\`\`

---

#### 🚀 How to Run:
\`\`\`bash
node calculator.js
\`\`\`
`;
      }

      // --- 2I. Default: Interactive Web Calculator (HTML/CSS/JS) with Live Preview ---
      return `### 🧮 Interactive Web Calculator

Here is a complete, modern, and responsive calculator built with **HTML, CSS, and JavaScript**. 

> 💡 **Live Preview:** You can click the **▶ Run / Preview Live** button on the code card below to test and use this calculator interactively right now inside NasInfinity!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Simple Calculator</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    body {
      background: #0f172a;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      color: #fff;
    }
    .calculator {
      background: #1e293b;
      padding: 24px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      width: 320px;
      border: 1px solid #334155;
    }
    .display {
      background: #090d16;
      border-radius: 12px;
      padding: 16px 20px;
      text-align: right;
      font-size: 32px;
      font-weight: bold;
      color: #38bdf8;
      min-height: 72px;
      word-break: break-all;
      margin-bottom: 20px;
      border: 1px solid #1e293b;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    button {
      padding: 18px 0;
      font-size: 18px;
      font-weight: 600;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      background: #334155;
      color: #fff;
      transition: all 0.15s ease;
    }
    button:hover { background: #475569; }
    button:active { transform: scale(0.95); }
    button.op { background: #6366f1; color: white; }
    button.op:hover { background: #4f46e5; }
    button.clear { background: #ef4444; color: white; }
    button.clear:hover { background: #dc2626; }
    button.equals { background: #10b981; color: white; grid-column: span 2; }
    button.equals:hover { background: #059669; }
  </style>
</head>
<body>
  <div class="calculator">
    <div id="display" class="display">0</div>
    <div class="buttons">
      <button class="clear" onclick="clearDisplay()">C</button>
      <button onclick="deleteLast()">⌫</button>
      <button class="op" onclick="appendOp('/')">÷</button>
      <button class="op" onclick="appendOp('*')">×</button>
      
      <button onclick="appendNum('7')">7</button>
      <button onclick="appendNum('8')">8</button>
      <button onclick="appendNum('9')">9</button>
      <button class="op" onclick="appendOp('-')">−</button>
      
      <button onclick="appendNum('4')">4</button>
      <button onclick="appendNum('5')">5</button>
      <button onclick="appendNum('6')">6</button>
      <button class="op" onclick="appendOp('+')">+</button>
      
      <button onclick="appendNum('1')">1</button>
      <button onclick="appendNum('2')">2</button>
      <button onclick="appendNum('3')">3</button>
      <button class="op" onclick="appendNum('.')">.</button>
      
      <button onclick="appendNum('0')">0</button>
      <button class="equals" onclick="calculate()">=</button>
    </div>
  </div>

  <script>
    let currentInput = '0';
    const display = document.getElementById('display');

    function updateDisplay() {
      display.textContent = currentInput;
    }

    function appendNum(num) {
      if (currentInput === '0' && num !== '.') {
        currentInput = num;
      } else {
        if (num === '.' && currentInput.includes('.') && !/[-+*/]/.test(currentInput.split(/[-+*/]/).pop())) return;
        currentInput += num;
      }
      updateDisplay();
    }

    function appendOp(op) {
      const lastChar = currentInput.slice(-1);
      if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
      } else {
        currentInput += op;
      }
      updateDisplay();
    }

    function clearDisplay() {
      currentInput = '0';
      updateDisplay();
    }

    function deleteLast() {
      if (currentInput.length <= 1) {
        currentInput = '0';
      } else {
        currentInput = currentInput.slice(0, -1);
      }
      updateDisplay();
    }

    function calculate() {
      try {
        const sanitized = currentInput.replace(/[^0-9+*/.-]/g, '');
        const result = Function('"use strict"; return (' + sanitized + ')')();
        currentInput = String(Number(result.toFixed(8)));
      } catch (e) {
        currentInput = 'Error';
      }
      updateDisplay();
    }
  </script>
</body>
</html>
\`\`\`

---

### 🐍 Python Console Alternative
If you prefer a lightweight Python calculator for the command line:

\`\`\`python
# Simple Python Calculator
def calculator():
    print("=== Simple Python Calculator ===")
    print("Operations: +, -, *, /  (Type 'q' to exit)")
    
    while True:
        first = input("\\nEnter first number: ")
        if first.lower() == 'q':
            print("Goodbye!")
            break
            
        op = input("Enter operator (+, -, *, /): ").strip()
        second = input("Enter second number: ")
        
        try:
            a, b = float(first), float(second)
            if op == '+': res = a + b
            elif op == '-': res = a - b
            elif op == '*': res = a * b
            elif op == '/': res = a / b if b != 0 else "Error (Cannot divide by 0)"
            else: res = "Error (Invalid operator)"
            
            print(f"Result: {a} {op} {b} = {res}")
        except ValueError:
            print("Error: Please enter valid numbers.")

if __name__ == '__main__':
    calculator()
\`\`\`

You can preview the HTML calculator live using the button above or copy the code with one click!`;
    }

    // 3. Interactive To-Do List Generator (Language-Aware: C++, Python, Java, Web)
    function generateTodoListCodeResponse(prompt) {
      const lang = detectProgrammingLanguage(prompt);

      if (lang === 'cpp') {
        return `### 📝 How to Build a To-Do List Application in C++

Here is a complete, interactive console To-Do List manager written in modern C++ using \`std::vector\` and structured tasks.

---

#### 💻 Complete C++ Source Code:

\`\`\`cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct Task {
    string description;
    bool completed;
};

int main() {
    vector<Task> tasks;
    cout << "==========================================\\n";
    cout << "         📝 C++ TASK MANAGER              \\n";
    cout << "==========================================\\n";

    while (true) {
        cout << "\\n--- Current Tasks (" << tasks.size() << ") ---\\n";
        if (tasks.empty()) {
            cout << "  (No tasks yet!)\\n";
        } else {
            for (size_t i = 0; i < tasks.size(); ++i) {
                cout << "  [" << (tasks[i].completed ? "✓" : " ") << "] " << (i + 1) << ". " << tasks[i].description << "\\n";
            }
        }

        cout << "\\nCommands: [1] Add Task  [2] Complete Task  [3] Delete Task  [4] Quit\\n";
        cout << "Choose action (1-4): ";
        int choice;
        if (!(cin >> choice)) {
            cin.clear();
            cin.ignore(1000, '\\n');
            continue;
        }
        cin.ignore(1000, '\\n');

        if (choice == 1) {
            cout << "Enter task description: ";
            string desc;
            getline(cin, desc);
            if (!desc.empty()) {
                tasks.push_back({desc, false});
                cout << "✅ Task added successfully!\\n";
            }
        } else if (choice == 2) {
            cout << "Enter task number to mark complete: ";
            int num;
            if (cin >> num && num >= 1 && num <= static_cast<int>(tasks.size())) {
                tasks[num - 1].completed = true;
                cout << "🎉 Task #" << num << " marked completed!\\n";
            } else {
                cout << "❌ Invalid task number!\\n";
            }
        } else if (choice == 3) {
            cout << "Enter task number to delete: ";
            int num;
            if (cin >> num && num >= 1 && num <= static_cast<int>(tasks.size())) {
                tasks.erase(tasks.begin() + (num - 1));
                cout << "🗑️ Task deleted!\\n";
            } else {
                cout << "❌ Invalid task number!\\n";
            }
        } else if (choice == 4) {
            cout << "Goodbye!\\n";
            break;
        }
    }
    return 0;
}
\`\`\`

---

#### 🚀 How to Compile and Run:
\`\`\`bash
g++ -std=c++17 -O2 todo.cpp -o todo
./todo
\`\`\`
`;
      }

      if (lang === 'python') {
        return `### 📝 How to Build a To-Do List in Python

Here is a clean, interactive Python To-Do List script.

---

#### 💻 Complete Python Source Code:

\`\`\`python
# todo.py - Python Console To-Do List
def todo_app():
    tasks = []
    print("=" * 44)
    print("        📝 PYTHON TASK MANAGER            ")
    print("=" * 44)

    while True:
        print(f"\\n--- My Tasks ({len(tasks)}) ---")
        if not tasks:
            print("  (Your task list is empty!)")
        else:
            for i, task in enumerate(tasks, 1):
                status = "✓" if task['done'] else " "
                print(f"  [{status}] {i}. {task['text']}")

        print("\\nOptions: [a] Add  [c] Complete  [d] Delete  [q] Quit")
        choice = input("Select option: ").strip().lower()

        if choice == 'a':
            text = input("Task description: ").strip()
            if text:
                tasks.append({'text': text, 'done': False})
                print("✅ Task added!")
        elif choice == 'c':
            try:
                idx = int(input("Task number to complete: ")) - 1
                if 0 <= idx < len(tasks):
                    tasks[idx]['done'] = True
                    print("🎉 Marked complete!")
                else:
                    print("❌ Task number out of range.")
            except ValueError:
                print("❌ Invalid number!")
        elif choice == 'd':
            try:
                idx = int(input("Task number to delete: ")) - 1
                if 0 <= idx < len(tasks):
                    removed = tasks.pop(idx)
                    print(f"🗑️ Deleted: {removed['text']}")
                else:
                    print("❌ Task number out of range.")
            except ValueError:
                print("❌ Invalid number!")
        elif choice == 'q':
            print("Goodbye! Thanks for using Python Task Manager.")
            break

if __name__ == '__main__':
    todo_app()
\`\`\`

---

#### 🚀 How to Run:
\`\`\`bash
python todo.py
\`\`\`
`;
      }

      if (lang === 'java') {
        return `### 📝 How to Build a To-Do List in Java

Here is a complete console To-Do List application in Java using \`java.util.ArrayList\`.

---

#### 💻 Complete Java Source Code (\`TodoList.java\`):

\`\`\`java
import java.util.ArrayList;
import java.util.Scanner;

public class TodoList {
    static class Task {
        String description;
        boolean isDone;
        Task(String desc) { this.description = desc; this.isDone = false; }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<Task> tasks = new ArrayList<>();

        System.out.println("==========================================");
        System.out.println("         📝 JAVA TASK MANAGER             ");
        System.out.println("==========================================");

        while (true) {
            System.out.println("\\n--- My Tasks (" + tasks.size() + ") ---");
            if (tasks.isEmpty()) {
                System.out.println("  (No tasks yet!)");
            } else {
                for (int i = 0; i < tasks.size(); i++) {
                    Task t = tasks.get(i);
                    System.out.println("  [" + (t.isDone ? "✓" : " ") + "] " + (i + 1) + ". " + t.description);
                }
            }

            System.out.println("\\nOptions: [1] Add  [2] Complete  [3] Delete  [4] Quit");
            System.out.print("Choose (1-4): ");
            String choice = scanner.nextLine().trim();

            if (choice.equals("1")) {
                System.out.print("Enter task description: ");
                String desc = scanner.nextLine().trim();
                if (!desc.isEmpty()) {
                    tasks.add(new Task(desc));
                    System.out.println("✅ Added!");
                }
            } else if (choice.equals("2")) {
                System.out.print("Task number to complete: ");
                try {
                    int num = Integer.parseInt(scanner.nextLine().trim());
                    if (num >= 1 && num <= tasks.size()) {
                        tasks.get(num - 1).isDone = true;
                        System.out.println("🎉 Completed!");
                    } else {
                        System.out.println("❌ Invalid task number.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("❌ Please enter a valid number.");
                }
            } else if (choice.equals("3")) {
                System.out.print("Task number to delete: ");
                try {
                    int num = Integer.parseInt(scanner.nextLine().trim());
                    if (num >= 1 && num <= tasks.size()) {
                        tasks.remove(num - 1);
                        System.out.println("🗑️ Deleted!");
                    } else {
                        System.out.println("❌ Invalid task number.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("❌ Please enter a valid number.");
                }
            } else if (choice.equals("4")) {
                System.out.println("Goodbye!");
                break;
            }
        }
        scanner.close();
    }
}
\`\`\`

---

#### 🚀 How to Compile and Run:
\`\`\`bash
javac TodoList.java
java TodoList
\`\`\`
`;
      }

      // Default: HTML/CSS/JS To-Do List with Live Preview
      return `### 📝 Interactive To-Do List

Here is a complete, responsive, and modern To-Do List application built with **HTML, CSS, and JavaScript**, featuring local storage persistence, task completion, and item counters.

> 💡 **Live Preview:** You can click the **▶ Run / Preview Live** button on the code card below to test adding, completing, and clearing tasks right now inside NasInfinity!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern To-Do List</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    body {
      background: #0f172a;
      color: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 16px;
    }
    .todo-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 20px;
      padding: 24px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    h2 { font-size: 1.3rem; color: #38bdf8; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
    .input-row { display: flex; gap: 8px; margin-bottom: 16px; }
    input[type="text"] {
      flex: 1;
      background: #0f172a;
      border: 1px solid #334155;
      color: #fff;
      padding: 10px 14px;
      border-radius: 10px;
      outline: none;
      font-size: 0.95rem;
    }
    input[type="text"]:focus { border-color: #38bdf8; }
    .add-btn {
      background: #38bdf8;
      color: #0f172a;
      border: none;
      padding: 10px 18px;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s;
    }
    .add-btn:hover { background: #0284c7; color: #fff; }
    ul { list-style: none; display: flex; flex-direction: column; gap: 8px; max-height: 320px; overflow-y: auto; }
    li {
      background: #0f172a80;
      border: 1px solid #33415560;
      padding: 12px 14px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: all 0.15s ease;
    }
    li:hover { border-color: #38bdf840; background: #0f172a; }
    li.completed span { text-decoration: line-through; color: #64748b; }
    .task-content { display: flex; align-items: center; gap: 10px; flex: 1; cursor: pointer; }
    .task-content input[type="checkbox"] { cursor: pointer; accent-color: #38bdf8; width: 16px; height: 16px; }
    .del-btn {
      background: none;
      border: none;
      color: #ef4444;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
    }
    .del-btn:hover { background: #ef444420; }
    .stats {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid #334155;
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: #94a3b8;
      align-items: center;
    }
    .clear-btn { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 0.8rem; }
    .clear-btn:hover { color: #ef4444; }
  </style>
</head>
<body>
  <div class="todo-card">
    <h2><span>📝 Task Master</span> <span id="taskCount" style="font-size: 0.85rem; color: #94a3b8;">0 tasks</span></h2>
    <div class="input-row">
      <input type="text" id="taskInput" placeholder="Add a new task..." onkeydown="if(event.key==='Enter') addTask()">
      <button class="add-btn" onclick="addTask()">Add</button>
    </div>
    <ul id="taskList"></ul>
    <div class="stats">
      <span id="completedCount">0 completed</span>
      <button class="clear-btn" onclick="clearCompleted()">Clear Completed</button>
    </div>
  </div>

  <script>
    let tasks = JSON.parse(localStorage.getItem('nasinfinity_tasks') || '[]');

    function saveAndRender() {
      localStorage.setItem('nasinfinity_tasks', JSON.stringify(tasks));
      const list = document.getElementById('taskList');
      list.innerHTML = '';

      tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        if (task.done) li.classList.add('completed');

        li.innerHTML = '<div class="task-content" onclick="toggleTask(' + idx + ')">' +
          '<input type="checkbox" ' + (task.done ? 'checked' : '') + ' onclick="event.stopPropagation(); toggleTask(' + idx + ')">' +
          '<span>' + task.text + '</span>' +
        '</div>' +
        '<button class="del-btn" onclick="deleteTask(' + idx + ')">✕</button>';
        list.appendChild(li);
      });

      const completed = tasks.filter(t => t.done).length;
      document.getElementById('taskCount').textContent = tasks.length + ' tasks';
      document.getElementById('completedCount').textContent = completed + ' of ' + tasks.length + ' done';
    }

    function addTask() {
      const input = document.getElementById('taskInput');
      const text = input.value.trim();
      if (!text) return;
      tasks.push({ text: text, done: false });
      input.value = '';
      saveAndRender();
    }

    function toggleTask(idx) {
      tasks[idx].done = !tasks[idx].done;
      saveAndRender();
    }

    function deleteTask(idx) {
      tasks.splice(idx, 1);
      saveAndRender();
    }

    function clearCompleted() {
      tasks = tasks.filter(t => !t.done);
      saveAndRender();
    }

    if (tasks.length === 0) {
      tasks = [
        { text: "Learn NasInfinity AI features", done: true },
        { text: "Test the code sandbox preview", done: false },
        { text: "Build an awesome web project", done: false }
      ];
    }

    saveAndRender();
  </script>
</body>
</html>
\`\`\`

---

### 🐍 Python Console Alternative
\`\`\`python
# Simple Python To-Do List
def todo_app():
    tasks = []
    while True:
        print("\\n=== TO-DO LIST ===")
        for i, task in enumerate(tasks, 1):
            status = "✓" if task['done'] else " "
            print(f"[{status}] {i}. {task['text']}")
        print("\\nOptions: [a] Add, [c] Complete, [d] Delete, [q] Quit")
        choice = input("Select option: ").strip().lower()
        
        if choice == 'a':
            text = input("Task description: ").strip()
            if text: tasks.append({'text': text, 'done': False})
        elif choice == 'c':
            idx = int(input("Task number to complete: ")) - 1
            if 0 <= idx < len(tasks): tasks[idx]['done'] = True
        elif choice == 'd':
            idx = int(input("Task number to delete: ")) - 1
            if 0 <= idx < len(tasks): tasks.pop(idx)
        elif choice == 'q':
            break

if __name__ == '__main__':
    todo_app()
\`\`\`
`;
    }

    // 4. Interactive Stopwatch & Timer Generator (Language-Aware: C++, Python, Web)
    function generateTimerCodeResponse(prompt) {
      const lang = detectProgrammingLanguage(prompt);

      if (lang === 'cpp') {
        return `### ⏱️ How to Build a Countdown Timer & Stopwatch in C++

Here is a complete C++ countdown timer using standard modern C++ (\`<chrono>\` and \`<thread>\`).

---

#### 💻 Complete C++ Source Code:

\`\`\`cpp
#include <iostream>
#include <chrono>
#include <thread>

using namespace std;

int main() {
    cout << "==========================================\\n";
    cout << "       ⏱️ C++ COUNTDOWN TIMER             \\n";
    cout << "==========================================\\n";

    int seconds;
    cout << "Enter countdown time in seconds: ";
    if (!(cin >> seconds) || seconds <= 0) {
        cout << "Invalid input! Please enter a positive number of seconds.\\n";
        return 1;
    }

    cout << "\\nStarting countdown from " << seconds << " seconds...\\n";
    for (int i = seconds; i > 0; --i) {
        int mins = i / 60;
        int secs = i % 60;
        cout << "\\r⏳ Time Remaining: [" << mins << "m " << secs << "s] " << flush;
        this_thread::sleep_for(chrono::seconds(1));
    }

    cout << "\\n\\n🔔 TIME'S UP! Timer complete! 🎉\\n";
    return 0;
}
\`\`\`

---

#### 🚀 How to Compile and Run:
\`\`\`bash
g++ -std=c++17 -O2 timer.cpp -o timer
./timer
\`\`\`
`;
      }

      if (lang === 'python') {
        return `### ⏱️ How to Build a Stopwatch & Timer in Python

Here is a clean Python terminal stopwatch and countdown timer.

---

#### 💻 Complete Python Source Code:

\`\`\`python
import time

def countdown(seconds):
    print(f"\\nStarting countdown for {seconds} seconds...")
    for i in range(seconds, 0, -1):
        mins, secs = divmod(i, 60)
        print(f"\\r⏳ Time Remaining: [{mins:02d}:{secs:02d}]", end="", flush=True)
        time.sleep(1)
    print("\\n\\n🔔 TIME'S UP! Timer finished! 🎉")

def stopwatch():
    input("Press Enter to start stopwatch...")
    start_time = time.time()
    try:
        while True:
            elapsed = time.time() - start_time
            mins, secs = divmod(elapsed, 60)
            print(f"\\r⏱️ Elapsed: [{int(mins):02d}:{secs:05.2f}] (Press Ctrl+C to stop)", end="", flush=True)
            time.sleep(0.05)
    except KeyboardInterrupt:
        total = time.time() - start_time
        print(f"\\n\\n⏹️ Stopped at: {total:.2f} seconds")

if __name__ == '__main__':
    print("1. Countdown Timer\\n2. Stopwatch")
    choice = input("Select (1 or 2): ").strip()
    if choice == '1':
        s = int(input("Enter seconds: "))
        countdown(s)
    else:
        stopwatch()
\`\`\`

---

#### 🚀 How to Run:
\`\`\`bash
python timer.py
\`\`\`
`;
      }

      // Default: Interactive HTML/CSS/JS Stopwatch & Timer with Live Preview
      return `### ⏱️ Simple Interactive Stopwatch & Timer

Here is a complete, modern, and responsive Stopwatch application built with **HTML, CSS, and JavaScript**, featuring millisecond precision, lap tracking, and dark mode UI.

> 💡 **Live Preview:** You can click the **▶ Run / Preview Live** button on the code card below to test and run the stopwatch interactively right now inside NasInfinity!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Stopwatch</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    body {
      background: #0f172a;
      color: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 16px;
    }
    .timer-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 20px;
      padding: 28px;
      width: 100%;
      max-width: 360px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      text-align: center;
    }
    .display {
      font-size: 3rem;
      font-weight: 800;
      color: #38bdf8;
      font-variant-numeric: tabular-nums;
      margin: 20px 0;
      letter-spacing: 1px;
    }
    .controls {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    button {
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .start-btn { background: #10b981; color: white; }
    .start-btn:hover { background: #059669; }
    .stop-btn { background: #ef4444; color: white; }
    .stop-btn:hover { background: #dc2626; }
    .lap-btn { background: #6366f1; color: white; }
    .lap-btn:hover { background: #4f46e5; }
    .reset-btn { background: #334155; color: #f8fafc; }
    .reset-btn:hover { background: #475569; }
    .laps {
      max-height: 160px;
      overflow-y: auto;
      text-align: left;
      border-top: 1px solid #334155;
      padding-top: 12px;
    }
    .lap-item {
      display: flex;
      justify-content: space-between;
      padding: 6px 8px;
      font-size: 0.85rem;
      color: #94a3b8;
      border-bottom: 1px solid #33415540;
    }
  </style>
</head>
<body>
  <div class="timer-card">
    <h2 style="font-size: 1.1rem; color: #94a3b8;">STOPWATCH</h2>
    <div id="display" class="display">00:00.00</div>
    <div class="controls">
      <button id="toggleBtn" class="start-btn" onclick="toggleTimer()">Start</button>
      <button id="lapBtn" class="lap-btn" onclick="recordLap()" disabled>Lap</button>
      <button class="reset-btn" onclick="resetTimer()">Reset</button>
    </div>
    <div id="laps" class="laps"></div>
  </div>

  <script>
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval = null;
    let lapCount = 1;

    function formatTime(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      const hundredths = Math.floor((ms % 1000) / 10);
      return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0') + '.' + String(hundredths).padStart(2, '0');
    }

    function toggleTimer() {
      const btn = document.getElementById('toggleBtn');
      const lapBtn = document.getElementById('lapBtn');
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsedTime += Date.now() - startTime;
        btn.textContent = 'Resume';
        btn.className = 'start-btn';
        lapBtn.disabled = true;
      } else {
        startTime = Date.now();
        timerInterval = setInterval(() => {
          const current = elapsedTime + (Date.now() - startTime);
          document.getElementById('display').textContent = formatTime(current);
        }, 10);
        btn.textContent = 'Pause';
        btn.className = 'stop-btn';
        lapBtn.disabled = false;
      }
    }

    function recordLap() {
      if (!timerInterval) return;
      const current = elapsedTime + (Date.now() - startTime);
      const lapsDiv = document.getElementById('laps');
      const item = document.createElement('div');
      item.className = 'lap-item';
      item.innerHTML = '<span>Lap ' + (lapCount++) + '</span><span>' + formatTime(current) + '</span>';
      lapsDiv.prepend(item);
    }

    function resetTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
      elapsedTime = 0;
      lapCount = 1;
      document.getElementById('display').textContent = '00:00.00';
      document.getElementById('toggleBtn').textContent = 'Start';
      document.getElementById('toggleBtn').className = 'start-btn';
      document.getElementById('lapBtn').disabled = true;
      document.getElementById('laps').innerHTML = '';
    }
  </script>
</body>
</html>
\`\`\`

---

### 🐍 Python Console Alternative
\`\`\`python
import time

def stopwatch():
    input("Press Enter to start stopwatch...")
    start_time = time.time()
    try:
        while True:
            elapsed = time.time() - start_time
            mins, secs = divmod(elapsed, 60)
            print(f"\\rTime: {int(mins):02d}:{secs:05.2f} (Ctrl+C to stop)", end="")
            time.sleep(0.05)
    except KeyboardInterrupt:
        total = time.time() - start_time
        print(f"\\nStopped at: {total:.2f} seconds")

if __name__ == '__main__':
    stopwatch()
\`\`\`
`;
    }

    // 5. Small Interactive Games Generator (Arcade, Snake, Tic-Tac-Toe, Cosmic Star Catcher, Pong, Flappy Bird, RPS, Python, C++, Java)
    function generateSmallGameCodeResponse(prompt) {
      const p = (prompt || '').toLowerCase();

      // 1. Language-Specific: Python Console Game
      if (/\b(python|py)\b/i.test(p)) {
        return `### 🎮 Python Terminal Arcade: Dungeon Treasure Hunt

Here is a complete, fun, and interactive **Python Console Game** built with zero external dependencies (pure Python standard library).

* 🕹️ **Features:** Random dungeon rooms, traps, monster battles, potions, inventory, and score tracking!
* 🚀 **How to Run:**
  1. Save this code into a file named \`game.py\`.
  2. Open terminal/command prompt and run: \`python game.py\`

\`\`\`python
# =====================================================================
# Dungeon Treasure Hunt - Terminal Arcade Game in Python
# =====================================================================
import random
import time

def start_game():
    player = {
        'name': 'Hero',
        'hp': 100,
        'max_hp': 100,
        'gold': 0,
        'potions': 2,
        'floor': 1
    }

    print("=" * 55)
    print("   ⚔️  WELCOME TO DUNGEON TREASURE HUNT (PYTHON)  ⚔️")
    print("=" * 55)
    name = input("Enter your hero name (press Enter for 'Hero'): ").strip()
    if name:
        player['name'] = name

    print(f"\\nWelcome, {player['name']}! Explore 5 dungeon floors to defeat the Dungeon Lord.\\n")

    while player['hp'] > 0 and player['floor'] <= 5:
        print("-" * 55)
        print(f"🏰 Floor {player['floor']} / 5 | ❤️ HP: {player['hp']}/{player['max_hp']} | 💰 Gold: {player['gold']} | 🧪 Potions: {player['potions']}")
        print("-" * 55)
        print("Choose your action:")
        print(" [1] 🚪 Open Left Door")
        print(" [2] 🚪 Open Right Door")
        print(" [3] 🧪 Drink Healing Potion (+35 HP)")
        print(" [4] 🏃 Retreat & End Game")

        choice = input("Your choice (1-4): ").strip()

        if choice in ['1', '2']:
            event = random.choice(['treasure', 'monster', 'trap', 'fountain'])
            
            if event == 'treasure':
                found_gold = random.randint(20, 50) * player['floor']
                player['gold'] += found_gold
                print(f"\\n✨ You discovered a hidden golden chest! +{found_gold} Gold! (Total: {player['gold']})\\n")
            
            elif event == 'trap':
                dmg = random.randint(10, 20)
                player['hp'] -= dmg
                print(f"\\n💥 WATCH OUT! You stepped on a spike trap and took {dmg} damage!\\n")
            
            elif event == 'fountain':
                heal = 25
                player['hp'] = min(player['max_hp'], player['hp'] + heal)
                print(f"\\n💧 You found an ancient spring of life! Healed +{heal} HP!\\n")

            elif event == 'monster':
                monsters = [
                    ('Goblin Scout', 35, 12, 25),
                    ('Skeleton Warrior', 50, 16, 40),
                    ('Shadow Drake', 75, 22, 65)
                ]
                m_name, m_hp, m_atk, m_reward = random.choice(monsters)
                print(f"\\n⚠️ An angry {m_name} leaps from the shadows! (Enemy HP: {m_hp})")

                while m_hp > 0 and player['hp'] > 0:
                    battle_choice = input("[A]ttack or [H]eal? ").strip().lower()
                    if battle_choice == 'h':
                        if player['potions'] > 0:
                            player['potions'] -= 1
                            player['hp'] = min(player['max_hp'], player['hp'] + 35)
                            print(f"🧪 You drank a potion! Current HP: {player['hp']}/{player['max_hp']}")
                        else:
                            print("❌ You have no potions left!")
                    else:
                        dmg = random.randint(18, 32)
                        m_hp -= dmg
                        print(f"⚔️ You struck {m_name} for {dmg} damage!")

                    if m_hp > 0:
                        counter_dmg = random.randint(8, m_atk)
                        player['hp'] -= counter_dmg
                        print(f"🩸 {m_name} hit you back for {counter_dmg} damage! (Your HP: {player['hp']})")

                if player['hp'] > 0:
                    player['gold'] += m_reward
                    print(f"🏆 Victory! You defeated the {m_name} and looted {m_reward} Gold!\\n")

            if player['hp'] > 0:
                player['floor'] += 1
                if random.random() > 0.6:
                    player['potions'] += 1
                    print("🎁 You found a spare Healing Potion on the ground!")

        elif choice == '3':
            if player['potions'] > 0:
                player['potions'] -= 1
                player['hp'] = min(player['max_hp'], player['hp'] + 35)
                print(f"\\n🧪 Restored +35 HP! (Current HP: {player['hp']}/{player['max_hp']})\\n")
            else:
                print("\\n❌ No potions left!\\n")

        elif choice == '4':
            print(f"\\n🏃 You retreated safely with {player['gold']} Gold!\\n")
            break

    print("=" * 55)
    if player['hp'] <= 0:
        print("💀 GAME OVER! You fell in the dungeon.")
    elif player['floor'] > 5:
        print(f"🎉 CONGRATULATIONS {player['name']}! You conquered all 5 floors!")
    print(f"🏆 Final Score: {player['gold']} Gold looted!")
    print("=" * 55)

if __name__ == '__main__':
    start_game()
\`\`\`
`;
      }

      // 2. Language-Specific: C++ Console Game
      if (p.includes('c++') || p.includes('cpp')) {
        return `### 🎮 C++ Terminal Arcade: Gladiator Arena Duel

Here is a complete, clean, and compilable **C++ Console Game** built using modern C++.

* 🚀 **How to Compile & Run:**
  \`\`\`bash
  g++ -std=c++17 game.cpp -o game
  ./game        # (or game.exe on Windows)
  \`\`\`

\`\`\`cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>

using namespace std;

int main() {
    srand(static_cast<unsigned int>(time(nullptr)));

    int playerHp = 100;
    int bossHp = 120;
    int potions = 2;
    int round = 1;

    cout << "============================================" << endl;
    cout << "     ⚔️  GLADIATOR ARENA BATTLE (C++)  ⚔️" << endl;
    cout << "============================================" << endl;

    while (playerHp > 0 && bossHp > 0) {
        cout << "\\n--- ROUND " << round << " ---" << endl;
        cout << "Hero HP: [" << playerHp << "/100] | Boss HP: [" << bossHp << "/120] | Potions: " << potions << endl;
        cout << "1. Light Attack (15-22 DMG)\\n";
        cout << "2. Heavy Slash (28-45 DMG, 65% hit rate)\\n";
        cout << "3. Drink Potion (+30 HP)\\n";
        cout << "Select move (1-3): ";

        int choice;
        if (!(cin >> choice)) {
            cin.clear();
            cin.ignore(1000, '\\n');
            continue;
        }

        if (choice == 1) {
            int dmg = 15 + rand() % 8;
            bossHp -= dmg;
            cout << "🗡️ Quick slash dealt " << dmg << " damage!\\n";
        } else if (choice == 2) {
            if (rand() % 100 < 65) {
                int dmg = 28 + rand() % 18;
                bossHp -= dmg;
                cout << "💥 CRITICAL STRIKE! Heavy blow dealt " << dmg << " damage!\\n";
            } else {
                cout << "💨 You swung wide and MISSED!\\n";
            }
        } else if (choice == 3) {
            if (potions > 0) {
                potions--;
                playerHp = min(100, playerHp + 30);
                cout << "🧪 Drank potion! HP restored to " << playerHp << ".\\n";
            } else {
                cout << "❌ No potions left!\\n";
            }
        }

        if (bossHp > 0) {
            int bossDmg = 12 + rand() % 14;
            playerHp -= bossDmg;
            cout << "👹 Boss hit you for " << bossDmg << " damage!\\n";
        }

        round++;
    }

    cout << "\\n============================================" << endl;
    if (playerHp > 0) cout << "🎉 VICTORY! You defeated the Cyber Gladiator!\\n";
    else cout << "💀 DEFEAT! Train harder and try again.\\n";
    cout << "============================================" << endl;

    return 0;
}
\`\`\`
`;
      }

      // 3. Language-Specific: Java Game
      if (p.includes('java') && !p.includes('javascript')) {
        return `### 🎮 Java Console Arcade: Cyber Number Battle

Here is a complete, self-contained **Java Game** built with standard Java.

* 🚀 **How to Compile & Run:**
  \`\`\`bash
  javac Game.java
  java Game
  \`\`\`

\`\`\`java
import java.util.Scanner;
import java.util.Random;

public class Game {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        int playerHp = 100;
        int enemyHp = 100;
        int score = 0;

        System.out.println("============================================");
        System.out.println("    🎮 CYBER NUMBER BATTLE (JAVA EDITION)    ");
        System.out.println("============================================");

        while (playerHp > 0 && enemyHp > 0) {
            System.out.printf("\\nYour HP: %d | Enemy HP: %d | Score: %d\\n", playerHp, enemyHp, score);
            System.out.println("1. Laser Blast (20-30 DMG)");
            System.out.println("2. Energy Shield (Heal 15 HP)");
            System.out.print("Choose action (1-2): ");

            String input = scanner.nextLine();
            if (input.equals("1")) {
                int dmg = 20 + random.nextInt(11);
                enemyHp -= dmg;
                score += dmg * 10;
                System.out.println("⚡ Laser blast hits for " + dmg + " damage!");
            } else if (input.equals("2")) {
                playerHp = Math.min(100, playerHp + 15);
                System.out.println("🛡️ Shield deployed! Healed 15 HP.");
            }

            if (enemyHp > 0) {
                int enemyDmg = 15 + random.nextInt(12);
                playerHp -= enemyDmg;
                System.out.println("🤖 Enemy fires back dealing " + enemyDmg + " damage!");
            }
        }

        System.out.println("\\n============================================");
        if (playerHp > 0) System.out.println("🎉 YOU WON! Final Score: " + score);
        else System.out.println("💀 GAME OVER! Try again.");
        System.out.println("============================================");
    }
}
\`\`\`
`;
      }

      // A. Classic Snake Game
      if (p.includes('snake')) {
        return `### 🎮 Classic Retro Snake Arcade Game

Here is a complete, self-contained, and responsive **Retro Snake Game** built with **HTML, CSS, and modern JavaScript**.

* 🕹️ **Controls:** Use <kbd>Arrow Keys</kbd> or on-screen D-Pad buttons to control the snake direction. Press <kbd>Space</kbd> to restart.
* 🍎 **Objective:** Eat food to grow longer and gain 10 points. Don't run into your own tail!
* 🏆 **High Score:** Automatically saved in your browser's \`localStorage\`.

> 💡 **Live Preview:** Click the **▶ Run / Preview Live** button on the code card below to play interactively right now inside NasInfinity AI!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Retro Snake Arcade</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body {
      background: #090d16;
      color: #f8fafc;
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 16px;
      overflow: hidden;
    }
    .game-card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 20px;
      padding: 16px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      max-width: 400px;
      width: 100%;
    }
    .hud {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-weight: bold;
      font-size: 14px;
    }
    .score-txt { color: #38bdf8; }
    .high-txt { color: #fbbf24; }
    canvas {
      background: #030712;
      border: 2px solid #374151;
      border-radius: 12px;
      width: 100%;
      max-width: 360px;
      height: 360px;
      display: block;
    }
    .d-pad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      width: 180px;
      margin-top: 4px;
    }
    .btn {
      background: #1f2937;
      border: 1px solid #374151;
      color: white;
      padding: 10px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
    }
    .btn:active { background: #374151; }
    .btn-up { grid-column: 2; }
    .btn-left { grid-column: 1; }
    .btn-down { grid-column: 2; }
    .btn-right { grid-column: 3; }
  </style>
</head>
<body>
  <div class="game-card">
    <div class="hud">
      <span class="score-txt">SCORE: <span id="score">0</span></span>
      <span class="high-txt">HIGH: <span id="high">0</span></span>
    </div>
    <canvas id="gameCanvas" width="360" height="360"></canvas>
    <div class="d-pad">
      <button class="btn btn-up" id="upBtn">▲</button>
      <button class="btn btn-left" id="leftBtn">◀</button>
      <button class="btn btn-down" id="downBtn">▼</button>
      <button class="btn btn-right" id="rightBtn">▶</button>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score');
    const highEl = document.getElementById('high');

    const gridSize = 18;
    const tileCount = canvas.width / gridSize;

    let snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
    let velocity = {x: 1, y: 0};
    let nextVelocity = {x: 1, y: 0};
    let food = {x: 15, y: 10};
    let score = 0;
    let high = parseInt(localStorage.getItem('snake_high') || '0', 10);
    highEl.textContent = high;
    let isGameOver = false;

    function placeFood() {
      food.x = Math.floor(Math.random() * tileCount);
      food.y = Math.floor(Math.random() * tileCount);
      for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) return placeFood();
      }
    }

    function reset() {
      snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
      velocity = {x: 1, y: 0};
      nextVelocity = {x: 1, y: 0};
      score = 0;
      scoreEl.textContent = score;
      isGameOver = false;
      placeFood();
    }

    function gameLoop() {
      if (isGameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 15);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '14px sans-serif';
        ctx.fillText('Press Space or Tap to Restart', canvas.width/2, canvas.height/2 + 20);
        return;
      }

      velocity = nextVelocity;
      const head = {x: snake[0].x + velocity.x, y: snake[0].y + velocity.y};

      // Wrap-around edges
      if (head.x < 0) head.x = tileCount - 1;
      if (head.x >= tileCount) head.x = 0;
      if (head.y < 0) head.y = tileCount - 1;
      if (head.y >= tileCount) head.y = 0;

      // Self collision
      for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
          isGameOver = true;
          if (score > high) {
            high = score;
            localStorage.setItem('snake_high', high);
            highEl.textContent = high;
          }
          return;
        }
      }

      snake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.textContent = score;
        placeFood();
      } else {
        snake.pop();
      }

      // Render
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Food
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 1, 0, Math.PI * 2);
      ctx.fill();

      // Snake
      snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? '#10b981' : '#34d399';
        ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && velocity.y === 0) nextVelocity = {x: 0, y: -1};
      if (e.key === 'ArrowDown' && velocity.y === 0) nextVelocity = {x: 0, y: 1};
      if (e.key === 'ArrowLeft' && velocity.x === 0) nextVelocity = {x: -1, y: 0};
      if (e.key === 'ArrowRight' && velocity.x === 0) nextVelocity = {x: 1, y: 0};
      if (e.key === ' ' && isGameOver) reset();
    });

    document.getElementById('upBtn').onclick = () => { if (velocity.y === 0) nextVelocity = {x: 0, y: -1}; };
    document.getElementById('downBtn').onclick = () => { if (velocity.y === 0) nextVelocity = {x: 0, y: 1}; };
    document.getElementById('leftBtn').onclick = () => { if (velocity.x === 0) nextVelocity = {x: -1, y: 0}; };
    document.getElementById('rightBtn').onclick = () => { if (velocity.x === 0) nextVelocity = {x: 1, y: 0}; };
    canvas.onclick = () => { if (isGameOver) reset(); };

    reset();
    setInterval(gameLoop, 100);
  </script>
</body>
</html>
\`\`\`
`;
      }

      // B. Modern Tic-Tac-Toe Game
      if (p.includes('tic') || p.includes('tictactoe')) {
        return `### 🎮 Modern Neon Tic-Tac-Toe Game

Here is a complete, self-contained, responsive **Tic-Tac-Toe Game** with **Human vs AI** and **2-Player Local** modes, score counter, and winning animations built with **HTML, CSS, and modern JavaScript**.

> 💡 **Live Preview:** Click the **▶ Run / Preview Live** button on the code card below to play right now inside NasInfinity AI!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neon Tic-Tac-Toe</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; font-family: system-ui, sans-serif; }
    body {
      background: #090d16;
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 16px;
    }
    .card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      max-width: 360px;
      width: 100%;
    }
    .mode-bar {
      display: flex;
      gap: 8px;
      background: #030712;
      padding: 4px;
      border-radius: 10px;
      width: 100%;
    }
    .mode-btn {
      flex: 1;
      background: transparent;
      border: none;
      color: #94a3b8;
      padding: 8px;
      font-size: 12px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
    }
    .mode-btn.active {
      background: #6366f1;
      color: white;
    }
    .status {
      font-size: 16px;
      font-weight: bold;
      color: #38bdf8;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      width: 270px;
      height: 270px;
    }
    .cell {
      background: #1f2937;
      border: 2px solid #374151;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: 900;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .cell:hover { background: #374151; }
    .cell.x { color: #38bdf8; }
    .cell.o { color: #f43f5e; }
    .cell.win { background: #064e3b; border-color: #10b981; }
    .btn-reset {
      background: #374151;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      width: 100%;
    }
    .btn-reset:hover { background: #4b5563; }
  </style>
</head>
<body>
  <div class="card">
    <div class="mode-bar">
      <button class="mode-btn active" id="btnAi">VS Computer</button>
      <button class="mode-btn" id="btnPvp">2 Players</button>
    </div>
    <div class="status" id="statusTxt">Your Turn (X)</div>
    <div class="grid" id="grid">
      <div class="cell" data-i="0"></div>
      <div class="cell" data-i="1"></div>
      <div class="cell" data-i="2"></div>
      <div class="cell" data-i="3"></div>
      <div class="cell" data-i="4"></div>
      <div class="cell" data-i="5"></div>
      <div class="cell" data-i="6"></div>
      <div class="cell" data-i="7"></div>
      <div class="cell" data-i="8"></div>
    </div>
    <button class="btn-reset" id="resetBtn">Restart Game</button>
  </div>

  <script>
    let board = Array(9).fill('');
    let turn = 'X';
    let vsAi = true;
    let gameOver = false;

    const cells = document.querySelectorAll('.cell');
    const statusTxt = document.getElementById('statusTxt');
    const resetBtn = document.getElementById('resetBtn');
    const btnAi = document.getElementById('btnAi');
    const btnPvp = document.getElementById('btnPvp');

    const WIN_COMBOS = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    function checkWin(b, player) {
      for (let combo of WIN_COMBOS) {
        if (combo.every(idx => b[idx] === player)) return combo;
      }
      return null;
    }

    function checkDraw(b) {
      return b.every(c => c !== '');
    }

    function handleClick(e) {
      const idx = parseInt(e.target.dataset.i, 10);
      if (board[idx] || gameOver) return;

      board[idx] = turn;
      render();

      const winCombo = checkWin(board, turn);
      if (winCombo) {
        gameOver = true;
        winCombo.forEach(i => cells[i].classList.add('win'));
        statusTxt.textContent = turn + ' Wins! 🎉';
        return;
      }

      if (checkDraw(board)) {
        gameOver = true;
        statusTxt.textContent = "It's a Draw! 🤝";
        return;
      }

      turn = turn === 'X' ? 'O' : 'X';
      statusTxt.textContent = (vsAi && turn === 'O') ? 'Computer Thinking...' : "Turn: " + turn;

      if (vsAi && turn === 'O' && !gameOver) {
        setTimeout(aiMove, 300);
      }
    }

    function aiMove() {
      // 1. Can AI win?
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          board[i] = 'O';
          if (checkWin(board, 'O')) { render(); endGame('O', checkWin(board, 'O')); return; }
          board[i] = '';
        }
      }
      // 2. Must AI block human?
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          board[i] = 'X';
          if (checkWin(board, 'X')) {
            board[i] = 'O';
            render();
            checkGameState();
            return;
          }
          board[i] = '';
        }
      }
      // 3. Take center
      if (!board[4]) { board[4] = 'O'; render(); checkGameState(); return; }
      // 4. Random available
      const empty = board.map((v, i) => v === '' ? i : null).filter(v => v !== null);
      if (empty.length > 0) {
        const choice = empty[Math.floor(Math.random() * empty.length)];
        board[choice] = 'O';
        render();
        checkGameState();
      }
    }

    function checkGameState() {
      const win = checkWin(board, 'O');
      if (win) { endGame('O', win); return; }
      if (checkDraw(board)) { gameOver = true; statusTxt.textContent = "It's a Draw! 🤝"; return; }
      turn = 'X';
      statusTxt.textContent = 'Your Turn (X)';
    }

    function endGame(winner, combo) {
      gameOver = true;
      combo.forEach(i => cells[i].classList.add('win'));
      statusTxt.textContent = (vsAi && winner === 'O' ? 'Computer Wins! 🤖' : winner + ' Wins! 🎉');
    }

    function render() {
      cells.forEach((cell, i) => {
        cell.textContent = board[i];
        cell.className = 'cell' + (board[i] ? ' ' + board[i].toLowerCase() : '');
      });
    }

    function reset() {
      board = Array(9).fill('');
      turn = 'X';
      gameOver = false;
      statusTxt.textContent = vsAi ? 'Your Turn (X)' : 'Turn: X';
      render();
    }

    cells.forEach(c => c.addEventListener('click', handleClick));
    resetBtn.addEventListener('click', reset);

    btnAi.onclick = () => { vsAi = true; btnAi.classList.add('active'); btnPvp.classList.remove('active'); reset(); };
    btnPvp.onclick = () => { vsAi = false; btnPvp.classList.add('active'); btnAi.classList.remove('active'); reset(); };

    reset();
  </script>
</body>
</html>
\`\`\`
`;
      }

      // C. Retro Neon Pong Arcade Game
      if (p.includes('pong') || p.includes('ping pong') || p.includes('paddle')) {
        return `### 🎮 Retro Neon Pong Arcade Game

Here is a complete, self-contained, responsive **Retro Neon Pong Game** with player paddle, AI computer opponent, ball physics, score counter, and sound synthesis built with **HTML, CSS, and modern JavaScript**.

* 🕹️ **Controls:** Move player paddle with **<kbd>&uarr;</kbd> / <kbd>&darr;</kbd> Arrow Keys**, **<kbd>W</kbd> / <kbd>S</kbd>**, or **Mouse / Touch Drag**!
* 🏆 **First to 5 Points Wins!**

> 💡 **Live Preview:** Click the **▶ Run / Preview Live** button on the code card below to play interactively right now inside NasInfinity AI!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neon Pong Arcade</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body {
      background: #090d16;
      color: #f8fafc;
      font-family: system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
      touch-action: none;
    }
    .card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 20px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
    }
    .hud {
      display: flex;
      justify-content: space-around;
      width: 100%;
      font-size: 20px;
      font-weight: 900;
    }
    .p-score { color: #38bdf8; }
    .ai-score { color: #f43f5e; }
    canvas {
      background: #030712;
      border: 2px solid #374151;
      border-radius: 12px;
      display: block;
      width: 100%;
      height: 300px;
      cursor: ns-resize;
    }
    .hint { font-size: 11px; color: #94a3b8; }
    .btn {
      background: #374151;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="hud">
      <span class="p-score">YOU: <span id="pScore">0</span></span>
      <span class="ai-score">CPU: <span id="aiScore">0</span></span>
    </div>
    <canvas id="c" width="400" height="300"></canvas>
    <div class="hint">Move: Arrow Keys Up/Down, W/S, or Drag Mouse/Finger</div>
    <button class="btn" id="restartBtn">Reset Match</button>
  </div>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const pScoreEl = document.getElementById('pScore');
    const aiScoreEl = document.getElementById('aiScore');

    let pScore = 0;
    let aiScore = 0;
    let gameOver = false;

    const paddleW = 10;
    const paddleH = 60;
    let playerY = canvas.height/2 - paddleH/2;
    let aiY = canvas.height/2 - paddleH/2;

    const ball = {
      x: canvas.width/2,
      y: canvas.height/2,
      vx: 4,
      vy: 3,
      r: 6
    };

    function resetBall(direction) {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.vx = (direction || (Math.random() > 0.5 ? 1 : -1)) * 4;
      ball.vy = (Math.random() * 4 - 2);
    }

    function gameLoop() {
      if (!gameOver) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) {
          ball.vy = -ball.vy;
        }

        const aiTarget = ball.y - paddleH/2;
        aiY += (aiTarget - aiY) * 0.085;
        aiY = Math.max(0, Math.min(canvas.height - paddleH, aiY));

        if (ball.x - ball.r < 18 && ball.y > playerY && ball.y < playerY + paddleH) {
          ball.vx = Math.abs(ball.vx) * 1.05;
          const hitOffset = (ball.y - (playerY + paddleH/2)) / (paddleH/2);
          ball.vy = hitOffset * 5;
        }

        if (ball.x + ball.r > canvas.width - 18 && ball.y > aiY && ball.y < aiY + paddleH) {
          ball.vx = -Math.abs(ball.vx) * 1.05;
          const hitOffset = (ball.y - (aiY + paddleH/2)) / (paddleH/2);
          ball.vy = hitOffset * 5;
        }

        if (ball.x < 0) {
          aiScore++;
          aiScoreEl.textContent = aiScore;
          if (aiScore >= 5) gameOver = true;
          else resetBall(1);
        } else if (ball.x > canvas.width) {
          pScore++;
          pScoreEl.textContent = pScore;
          if (pScore >= 5) gameOver = true;
          else resetBall(-1);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, 0);
      ctx.lineTo(canvas.width/2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(8, playerY, paddleW, paddleH);

      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(canvas.width - 18, aiY, paddleW, paddleH);

      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = pScore >= 5 ? '#10b981' : '#f43f5e';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pScore >= 5 ? '🏆 YOU WIN!' : '🤖 CPU WINS!', canvas.width/2, canvas.height/2 - 10);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px sans-serif';
        ctx.fillText('Click Reset Match to play again', canvas.width/2, canvas.height/2 + 25);
      } else {
        requestAnimationFrame(gameLoop);
      }
    }

    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') playerY = Math.max(0, playerY - 20);
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') playerY = Math.min(canvas.height - paddleH, playerY + 20);
    });

    function handlePointer(e) {
      const rect = canvas.getBoundingClientRect();
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const y = ((clientY - rect.top) / rect.height) * canvas.height;
      playerY = Math.max(0, Math.min(canvas.height - paddleH, y - paddleH/2));
    }
    canvas.addEventListener('mousemove', handlePointer);
    canvas.addEventListener('touchmove', handlePointer, { passive: true });

    document.getElementById('restartBtn').onclick = () => {
      pScore = 0; aiScore = 0;
      pScoreEl.textContent = 0; aiScoreEl.textContent = 0;
      gameOver = false;
      resetBall();
      requestAnimationFrame(gameLoop);
    };

    resetBall();
    requestAnimationFrame(gameLoop);
  </script>
</body>
</html>
\`\`\`
`;
      }

      // D. Retro Flappy Bird Arcade Game
      if (p.includes('flappy') || p.includes('bird')) {
        return `### 🎮 Retro Flappy Bird Arcade Game

Here is a complete, self-contained, responsive **Flappy Bird Arcade Game** with gravity physics, procedural pipes, score tracking, high score saving, and instant restart built with **HTML, CSS, and modern JavaScript**.

* 🕹️ **Controls:** Tap screen or press <kbd>Spacebar</kbd> / <kbd>&uarr; Arrow</kbd> to flap wings!
* 🏆 **High Score:** Automatically saved in \`localStorage\`.

> 💡 **Live Preview:** Click the **▶ Run / Preview Live** button on the code card below to play interactively right now inside NasInfinity AI!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flappy Bird Arcade</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body {
      background: #090d16;
      color: #f8fafc;
      font-family: system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
      touch-action: none;
    }
    .card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 20px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      max-width: 360px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
    }
    .hud {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-weight: bold;
      font-size: 14px;
    }
    .score-txt { color: #facc15; }
    .best-txt { color: #38bdf8; }
    canvas {
      background: #0284c7;
      border: 2px solid #374151;
      border-radius: 12px;
      display: block;
      width: 100%;
      height: 380px;
      cursor: pointer;
    }
    .hint { font-size: 11px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="card">
    <div class="hud">
      <span class="score-txt">SCORE: <span id="scoreVal">0</span></span>
      <span class="best-txt">BEST: <span id="bestVal">0</span></span>
    </div>
    <canvas id="c" width="320" height="380"></canvas>
    <div class="hint">Tap screen or Press Spacebar to Jump</div>
  </div>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const scoreVal = document.getElementById('scoreVal');
    const bestVal = document.getElementById('bestVal');

    let score = 0;
    let highScore = parseInt(localStorage.getItem('flappy_best') || '0', 10);
    bestVal.textContent = highScore;

    let gameOver = false;
    let birdY = canvas.height / 2;
    let velocity = 0;
    const gravity = 0.38;
    const jump = -6.2;
    const birdX = 50;
    const birdRadius = 12;

    let pipes = [];
    const pipeWidth = 44;
    const pipeGap = 100;
    let frame = 0;

    function reset() {
      birdY = canvas.height / 2;
      velocity = 0;
      pipes = [];
      score = 0;
      scoreVal.textContent = 0;
      gameOver = false;
      frame = 0;
      loop();
    }

    function flap() {
      if (gameOver) { reset(); return; }
      velocity = jump;
    }

    function loop() {
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 26px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 20);
        ctx.fillStyle = '#fff';
        ctx.font = '16px sans-serif';
        ctx.fillText('Score: ' + score, canvas.width/2, canvas.height/2 + 15);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '13px sans-serif';
        ctx.fillText('Tap to play again', canvas.width/2, canvas.height/2 + 45);
        return;
      }

      frame++;
      velocity += gravity;
      birdY += velocity;

      if (frame % 85 === 0) {
        const topH = Math.floor(Math.random() * (canvas.height - pipeGap - 80)) + 30;
        pipes.push({ x: canvas.width, top: topH, passed: false });
      }

      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = pipes.length - 1; i >= 0; i--) {
        const p = pipes[i];
        p.x -= 2.2;

        ctx.fillStyle = '#22c55e';
        ctx.fillRect(p.x, 0, pipeWidth, p.top);
        ctx.fillRect(p.x, p.top + pipeGap, pipeWidth, canvas.height - (p.top + pipeGap));

        ctx.fillStyle = '#15803d';
        ctx.fillRect(p.x + pipeWidth - 4, 0, 4, p.top);
        ctx.fillRect(p.x + pipeWidth - 4, p.top + pipeGap, 4, canvas.height);

        if (!p.passed && p.x + pipeWidth < birdX) {
          p.passed = true;
          score++;
          scoreVal.textContent = score;
          if (score > highScore) {
            highScore = score;
            localStorage.setItem('flappy_best', highScore);
            bestVal.textContent = highScore;
          }
        }

        const hitX = birdX + birdRadius > p.x && birdX - birdRadius < p.x + pipeWidth;
        const hitY = birdY - birdRadius < p.top || birdY + birdRadius > p.top + pipeGap;
        if (hitX && hitY) gameOver = true;

        if (p.x + pipeWidth < 0) pipes.splice(i, 1);
      }

      if (birdY + birdRadius >= canvas.height || birdY - birdRadius <= 0) {
        gameOver = true;
      }

      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(birdX, birdY, birdRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(birdX + 4, birdY - 3, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(birdX + 8, birdY);
      ctx.lineTo(birdX + 16, birdY + 3);
      ctx.lineTo(birdX + 8, birdY + 6);
      ctx.fill();

      requestAnimationFrame(loop);
    }

    window.addEventListener('keydown', e => { if (e.code === 'Space' || e.key === 'ArrowUp') flap(); });
    canvas.addEventListener('click', flap);
    canvas.addEventListener('touchstart', e => { e.preventDefault(); flap(); });

    reset();
  </script>
</body>
</html>
\`\`\`
`;
      }

      // E. Cyber Rock-Paper-Scissors Arena
      if (p.includes('rock') || p.includes('paper') || p.includes('scissors') || p.includes('rps')) {
        return `### 🎮 Cyber Rock-Paper-Scissors Arena

Here is a complete, self-contained, responsive **Rock-Paper-Scissors Game** with animated weapon choices, sound effects, win streak tracker, and statistics built with **HTML, CSS, and modern JavaScript**.

> 💡 **Live Preview:** Click the **▶ Run / Preview Live** button on the code card below to play interactively right now inside NasInfinity AI!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cyber Rock Paper Scissors</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body {
      background: #090d16;
      color: #f8fafc;
      font-family: system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 16px;
    }
    .card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 20px;
      padding: 24px;
      max-width: 380px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      text-align: center;
    }
    .scoreboard {
      display: flex;
      justify-content: space-between;
      width: 100%;
      background: #030712;
      padding: 10px 16px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: bold;
    }
    .battle-arena {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      height: 120px;
      background: #030712;
      border-radius: 14px;
      border: 1px solid #1f2937;
    }
    .fighter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .fighter-icon { font-size: 48px; }
    .fighter-label { font-size: 11px; color: #94a3b8; font-weight: bold; }
    .vs { font-size: 20px; font-weight: 900; color: #f43f5e; }
    .status-banner {
      font-size: 16px;
      font-weight: 800;
      color: #38bdf8;
      min-height: 24px;
    }
    .choices {
      display: flex;
      gap: 10px;
      width: 100%;
    }
    .btn-choice {
      flex: 1;
      background: #1f2937;
      border: 2px solid #374151;
      border-radius: 12px;
      padding: 14px 6px;
      color: white;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      transition: all 0.15s;
    }
    .btn-choice:hover { background: #374151; border-color: #6366f1; transform: translateY(-2px); }
    .btn-choice:active { transform: scale(0.95); }
    .btn-choice span { font-size: 11px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Cyber Arena: RPS</h2>
    <div class="scoreboard">
      <span style="color:#38bdf8">WINS: <span id="wCount">0</span></span>
      <span style="color:#fbbf24">DRAWS: <span id="dCount">0</span></span>
      <span style="color:#f43f5e">LOSSES: <span id="lCount">0</span></span>
    </div>
    <div class="battle-arena">
      <div class="fighter">
        <div class="fighter-icon" id="pIcon">❔</div>
        <div class="fighter-label">YOU</div>
      </div>
      <div class="vs">VS</div>
      <div class="fighter">
        <div class="fighter-icon" id="aiIcon">🤖</div>
        <div class="fighter-label">AI</div>
      </div>
    </div>
    <div class="status-banner" id="statusTxt">Choose your weapon!</div>
    <div class="choices">
      <button class="btn-choice" onclick="play('rock')">🪨<span>ROCK</span></button>
      <button class="btn-choice" onclick="play('paper')">📄<span>PAPER</span></button>
      <button class="btn-choice" onclick="play('scissors')">✂️<span>SCISSORS</span></button>
    </div>
  </div>
  <script>
    const icons = { rock: '🪨', paper: '📄', scissors: '✂️' };
    let wins = 0, draws = 0, losses = 0;

    function play(playerChoice) {
      const choices = ['rock', 'paper', 'scissors'];
      const aiChoice = choices[Math.floor(Math.random() * choices.length)];

      document.getElementById('pIcon').textContent = icons[playerChoice];
      document.getElementById('aiIcon').textContent = icons[aiChoice];

      const statusEl = document.getElementById('statusTxt');

      if (playerChoice === aiChoice) {
        draws++;
        document.getElementById('dCount').textContent = draws;
        statusEl.textContent = "It's a Tie! 🤝";
        statusEl.style.color = '#fbbf24';
      } else if (
        (playerChoice === 'rock' && aiChoice === 'scissors') ||
        (playerChoice === 'paper' && aiChoice === 'rock') ||
        (playerChoice === 'scissors' && aiChoice === 'paper')
      ) {
        wins++;
        document.getElementById('wCount').textContent = wins;
        statusEl.textContent = "You Win! 🎉 " + playerChoice.toUpperCase() + " beats " + aiChoice.toUpperCase();
        statusEl.style.color = '#10b981';
      } else {
        losses++;
        document.getElementById('lCount').textContent = losses;
        statusEl.textContent = "AI Wins! 💥 " + aiChoice.toUpperCase() + " beats " + playerChoice.toUpperCase();
        statusEl.style.color = '#f43f5e';
      }
    }
  </script>
</body>
</html>
\`\`\`
`;
      }

      // F. Cyber Vault Cracker (Guessing Game)
      if (p.includes('guess') || p.includes('guessing') || p.includes('number game')) {
        return `### 🎮 Cyber Mystery Vault Cracker (Guess the Number)

Here is a complete, self-contained, responsive **Mystery Vault Code Cracker Game** with an interactive on-screen cyberpunk keypad, hot/cold radar clues, attempts counter, sound effects, and victory animations built with **HTML, CSS, and modern JavaScript**.

* 🕹️ **Objective:** Guess the secret 2-digit vault PIN (between 1 and 100) before you run out of energy attempts!
* 📡 **Radar Clues:** Tells you if your guess was **TOO HIGH** or **TOO LOW**.

> 💡 **Live Preview:** Click the **▶ Run / Preview Live** button on the code card below to play interactively right now inside NasInfinity AI!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cyber Vault Cracker</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; font-family: system-ui, -apple-system, sans-serif; }
    body {
      background: #090d16;
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 16px;
    }
    .vault-card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 20px;
      padding: 24px;
      max-width: 360px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      text-align: center;
    }
    .header { font-size: 18px; font-weight: 800; color: #38bdf8; }
    .display {
      background: #030712;
      border: 2px solid #374151;
      border-radius: 12px;
      width: 100%;
      padding: 16px;
      font-size: 32px;
      font-weight: 900;
      color: #10b981;
      letter-spacing: 4px;
      min-height: 68px;
    }
    .status {
      font-size: 13px;
      font-weight: bold;
      color: #fbbf24;
      min-height: 20px;
    }
    .attempts { font-size: 12px; color: #94a3b8; }
    .keypad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      width: 100%;
    }
    .key {
      background: #1f2937;
      border: 1px solid #374151;
      border-radius: 10px;
      padding: 14px;
      color: white;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.15s;
    }
    .key:active { background: #374151; }
    .key-clear { background: #881337; border-color: #9f1239; }
    .key-enter { background: #065f46; border-color: #047857; color: #a7f3d0; font-weight: 900; }
  </style>
</head>
<body>
  <div class="vault-card">
    <div class="header">🔐 Cyber Vault Cracker</div>
    <div class="attempts">Attempts Left: <span id="tries" style="color:#f43f5e;font-weight:bold">7</span> / 7</div>
    <div class="display" id="disp">--</div>
    <div class="status" id="status">Enter a number between 1 and 100</div>
    <div class="keypad">
      <button class="key" onclick="press('1')">1</button>
      <button class="key" onclick="press('2')">2</button>
      <button class="key" onclick="press('3')">3</button>
      <button class="key" onclick="press('4')">4</button>
      <button class="key" onclick="press('5')">5</button>
      <button class="key" onclick="press('6')">6</button>
      <button class="key" onclick="press('7')">7</button>
      <button class="key" onclick="press('8')">8</button>
      <button class="key" onclick="press('9')">9</button>
      <button class="key key-clear" onclick="clearInput()">C</button>
      <button class="key" onclick="press('0')">0</button>
      <button class="key key-enter" onclick="submitGuess()">↵</button>
    </div>
  </div>
  <script>
    let target = Math.floor(Math.random() * 100) + 1;
    let triesLeft = 7;
    let inputVal = '';
    let solved = false;

    const disp = document.getElementById('disp');
    const status = document.getElementById('status');
    const tries = document.getElementById('tries');

    function press(n) {
      if (solved || triesLeft <= 0) return;
      if (inputVal.length < 3) {
        inputVal += n;
        disp.textContent = inputVal;
      }
    }

    function clearInput() {
      if (solved || triesLeft <= 0) { reset(); return; }
      inputVal = '';
      disp.textContent = '--';
    }

    function reset() {
      target = Math.floor(Math.random() * 100) + 1;
      triesLeft = 7;
      inputVal = '';
      solved = false;
      disp.textContent = '--';
      disp.style.color = '#10b981';
      status.textContent = 'Enter a number between 1 and 100';
      status.style.color = '#fbbf24';
      tries.textContent = triesLeft;
    }

    function submitGuess() {
      if (solved || triesLeft <= 0) { reset(); return; }
      const g = parseInt(inputVal, 10);
      if (isNaN(g) || g < 1 || g > 100) {
        status.textContent = '⚠️ Enter a number 1 to 100!';
        return;
      }

      triesLeft--;
      tries.textContent = triesLeft;
      inputVal = '';

      if (g === target) {
        solved = true;
        disp.textContent = 'OPEN!';
        disp.style.color = '#38bdf8';
        status.textContent = '🎉 ACCESS GRANTED! You cracked the vault!';
        status.style.color = '#10b981';
      } else if (triesLeft <= 0) {
        disp.textContent = target;
        disp.style.color = '#f43f5e';
        status.textContent = '💀 LOCKDOWN! PIN was ' + target + '. Tap C to restart.';
        status.style.color = '#f43f5e';
      } else if (g < target) {
        disp.textContent = g;
        status.textContent = '📈 TOO LOW! Aim higher.';
        status.style.color = '#38bdf8';
      } else {
        disp.textContent = g;
        status.textContent = '📉 TOO HIGH! Aim lower.';
        status.style.color = '#f43f5e';
      }
    }
  </script>
</body>
</html>
\`\`\`
`;
      }
      return `### 🎮 Cosmic Star Catcher & Dodger Arcade Game

Here is a complete, self-contained, and responsive **Cosmic Star Catcher Arcade Game** built with **HTML, CSS, and modern JavaScript**.

* 🕹️ **Controls:** Move with **<kbd>&larr;</kbd>/<kbd>&rarr;</kbd> Arrow Keys**, **<kbd>A</kbd>/<kbd>D</kbd>**, **Mouse/Touch Drag**, or On-Screen Touch Buttons!
* ⭐ **Objective:** Catch glowing **Golden Stars (+10 pts)** and **Emerald Gems (+25 pts)** while dodging falling **Red Asteroids**!
* 🔊 **Audio:** Built-in retro 8-bit sound effects synthesized dynamically using the Web Audio API (zero audio files needed).
* 🏆 **High Score:** Automatically recorded in your browser's \`localStorage\`.

> 💡 **Live Preview:** Click the **▶ Run / Preview Live** button on the code card below to play right now inside NasInfinity AI!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cosmic Star Catcher Arcade</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body {
      background: #090d16;
      color: #f8fafc;
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
      touch-action: none;
    }
    #gameCard {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 20px;
      padding: 16px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      max-width: 420px;
      width: 100%;
    }
    .hud {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0 4px;
      font-size: 14px;
      font-weight: bold;
    }
    .score-badge { color: #38bdf8; }
    .high-badge { color: #fbbf24; font-size: 12px; }
    .lives-badge { color: #f43f5e; letter-spacing: 2px; }
    canvas {
      background: #030712;
      border: 2px solid #374151;
      border-radius: 12px;
      width: 100%;
      height: 380px;
      display: block;
      cursor: crosshair;
    }
    .controls-hint {
      color: #9ca3af;
      font-size: 11px;
      text-align: center;
    }
    .touch-bar {
      display: flex;
      gap: 12px;
      width: 100%;
    }
    .touch-btn {
      flex: 1;
      background: #1f2937;
      color: white;
      border: 1px solid #374151;
      padding: 12px;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
    .touch-btn:active { background: #374151; }
  </style>
</head>
<body>
  <div id="gameCard">
    <div class="hud">
      <div>
        <div class="score-badge">SCORE: <span id="scoreVal">0</span></div>
        <div class="high-badge">BEST: <span id="highVal">0</span></div>
      </div>
      <div id="livesVal" class="lives-badge">❤️❤️❤️</div>
    </div>
    <canvas id="c" width="380" height="380"></canvas>
    <div class="controls-hint">Move: Arrow Keys, Mouse Drag, or Tap Buttons</div>
    <div class="touch-bar">
      <button class="touch-btn" id="leftBtn">◀ Left</button>
      <button class="touch-btn" id="rightBtn">Right ▶</button>
    </div>
  </div>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const scoreVal = document.getElementById('scoreVal');
    const highVal = document.getElementById('highVal');
    const livesVal = document.getElementById('livesVal');

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;
    function playBeep(freq, type, duration) {
      try {
        if (!audioCtx) audioCtx = new AudioCtx();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {}
    }

    let score = 0;
    let highScore = parseInt(localStorage.getItem('cosmic_high') || '0', 10);
    highVal.textContent = highScore;
    let lives = 3;
    let gameOver = false;
    let animationId = null;

    const player = {
      x: canvas.width / 2 - 20,
      y: canvas.height - 40,
      w: 40,
      h: 24,
      speed: 6,
      movingLeft: false,
      movingRight: false
    };

    let entities = [];
    let spawnTimer = 0;
    let baseSpeed = 2.2;

    function spawnEntity() {
      const rand = Math.random();
      let type = 'star';
      if (rand > 0.8) type = 'asteroid';
      else if (rand > 0.65) type = 'gem';

      entities.push({
        type: type,
        x: Math.random() * (canvas.width - 24) + 12,
        y: -20,
        radius: type === 'asteroid' ? 14 : type === 'gem' ? 10 : 8,
        speed: baseSpeed + Math.random() * 1.5
      });
    }

    function resetGame() {
      score = 0;
      lives = 3;
      baseSpeed = 2.2;
      entities = [];
      gameOver = false;
      player.x = canvas.width / 2 - 20;
      scoreVal.textContent = score;
      updateLivesDisplay();
      if (animationId) cancelAnimationFrame(animationId);
      loop();
    }

    function updateLivesDisplay() {
      livesVal.textContent = '❤️'.repeat(Math.max(0, lives)) || '💀';
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#1e293b';
      for (let i = 0; i < 20; i++) {
        ctx.fillRect((i * 37 + score * 2) % canvas.width, (i * 29) % canvas.height, 2, 2);
      }

      if (!gameOver) {
        if (player.movingLeft && player.x > 0) player.x -= player.speed;
        if (player.movingRight && player.x < canvas.width - player.w) player.x += player.speed;

        spawnTimer++;
        if (spawnTimer > 35) {
          spawnEntity();
          spawnTimer = 0;
        }

        baseSpeed = 2.2 + Math.min(score / 150, 4.5);
      }

      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.moveTo(player.x + player.w / 2, player.y - 6);
      ctx.lineTo(player.x + player.w, player.y + player.h);
      ctx.lineTo(player.x, player.y + player.h);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(player.x + player.w / 2, player.y + 10, 5, 0, Math.PI * 2);
      ctx.fill();

      if (!gameOver) {
        ctx.fillStyle = Math.random() > 0.5 ? '#f97316' : '#eab308';
        ctx.beginPath();
        ctx.moveTo(player.x + player.w / 2 - 6, player.y + player.h);
        ctx.lineTo(player.x + player.w / 2 + 6, player.y + player.h);
        ctx.lineTo(player.x + player.w / 2, player.y + player.h + 8 + Math.random() * 6);
        ctx.fill();
      }

      for (let i = entities.length - 1; i >= 0; i--) {
        const e = entities[i];
        if (!gameOver) e.y += e.speed;

        if (e.type === 'star') {
          ctx.fillStyle = '#facc15';
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(e.x - 2, e.y - 2, 4, 4);
        } else if (e.type === 'gem') {
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        const hitX = e.x > player.x && e.x < player.x + player.w;
        const hitY = e.y + e.radius > player.y && e.y - e.radius < player.y + player.h;

        if (!gameOver && hitX && hitY) {
          if (e.type === 'star') {
            score += 10;
            scoreVal.textContent = score;
            playBeep(600, 'triangle', 0.1);
          } else if (e.type === 'gem') {
            score += 25;
            scoreVal.textContent = score;
            playBeep(850, 'sine', 0.15);
          } else {
            lives -= 1;
            updateLivesDisplay();
            playBeep(180, 'sawtooth', 0.25);
            if (lives <= 0) {
              gameOver = true;
              playBeep(120, 'sawtooth', 0.5);
              if (score > highScore) {
                highScore = score;
                localStorage.setItem('cosmic_high', highScore);
                highVal.textContent = highScore;
              }
            }
          }
          entities.splice(i, 1);
          continue;
        }

        if (e.y > canvas.height + 20) {
          entities.splice(i, 1);
        }
      }

      if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 26px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 25);

        ctx.fillStyle = '#fff';
        ctx.font = '16px sans-serif';
        ctx.fillText('Final Score: ' + score, canvas.width / 2, canvas.height / 2 + 10);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '14px sans-serif';
        ctx.fillText('Tap screen or Press Space to Restart', canvas.width / 2, canvas.height / 2 + 45);
      } else {
        animationId = requestAnimationFrame(loop);
      }
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') player.movingLeft = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') player.movingRight = true;
      if (e.key === ' ' || e.key === 'Enter') {
        if (gameOver) resetGame();
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') player.movingLeft = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') player.movingRight = false;
    });

    function handlePointerMove(e) {
      if (gameOver) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = ((clientX - rect.left) / rect.width) * canvas.width;
      player.x = Math.max(0, Math.min(canvas.width - player.w, x - player.w / 2));
    }
    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
    canvas.addEventListener('click', () => { if (gameOver) resetGame(); });

    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const startLeft = () => player.movingLeft = true;
    const stopLeft = () => player.movingLeft = false;
    const startRight = () => player.movingRight = true;
    const stopRight = () => player.movingRight = false;

    leftBtn.addEventListener('mousedown', startLeft);
    leftBtn.addEventListener('mouseup', stopLeft);
    leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startLeft(); });
    leftBtn.addEventListener('touchend', stopLeft);

    rightBtn.addEventListener('mousedown', startRight);
    rightBtn.addEventListener('mouseup', stopRight);
    rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRight(); });
    rightBtn.addEventListener('touchend', stopRight);

    resetGame();
  </script>
</body>
</html>
\`\`\`
`;
    }

    // 6. Generic Code Boilerplate Generator (Fallback for other code prompts)
    function generateGenericCodeFallback(prompt) {
      const safeTitle = (prompt || 'App Component').replace(/[#*`]/g, '').trim().slice(0, 40) || 'Web Component';
      return `### ⚡ Offline Code Starter: ` + safeTitle + `

> ⚠️ **Notice:** The public online AI endpoint is currently experiencing high load or network latency. NasInfinity has generated this clean, responsive starter boilerplate for you offline!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>` + safeTitle + `</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    body {
      background: #0f172a;
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 24px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    }
    h1 { font-size: 1.4rem; color: #38bdf8; margin-bottom: 12px; }
    p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px; }
    .btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn:hover { background: #4f46e5; }
  </style>
</head>
<body>
  <div class="card">
    <h1>` + safeTitle + `</h1>
    <p>This is a starter template generated by NasInfinity AI. You can test and modify this code using the live preview button below.</p>
    <button class="btn" onclick="alert('Hello from NasInfinity!')">Click Me</button>
  </div>
</body>
</html>
\`\`\`

💡 **To get full, custom code generation without public timeouts:**
Select **Google Gemini** or **OpenAI** in the sidebar's **AI Engine** dropdown and enter your free API key for instant, uninterrupted AI synthesis!`;
    }

    // Matcher for game generation queries (e.g. "write a small game codes", "make a small game", "game in python", etc.)
    function isSmallGamePrompt(prompt) {
      if (!prompt) return false;
      const p = prompt.trim().toLowerCase();

      // 1. Action + Game subject (specifically asking to code/generate a playable browser game)
      const gameAction = /(write|create|make|code|build|give\s*me|show\s*me|program|develop|draft|generate|provide|can\s*you\s*(write|make|create|give|code))\b/i;
      const gameSubject = /(small\s*game|simple\s*game|mini\s*game|quick\s*game|arcade\s*game|2d\s*game|browser\s*game|casual\s*game|game\s*codes?|game\s*program|game\s*script|game\s*in\s*(html|javascript|js|python|py|c\+\+|cpp|java|c#)|snake\s*game|pong\s*game|tic\s*tac\s*toe|flappy\s*bird|rock\s*paper\s*scissors|guessing\s*game|breakout|brick\s*breaker)/i;

      if (gameAction.test(p) && gameSubject.test(p)) {
        if (!/(game\s+of\s+thrones|game\s+theory|olympic\s+game|board\s+game|watch\s+(a\s+)?game|mind\s+game|word\s+game)\b/i.test(p)) {
          return true;
        }
      }

      // 2. Exact or short phrases: "small game codes", "game code", "small game", "snake game", etc.
      if (/^((a\s+)?(small|simple|mini|quick|arcade|2d|browser)\s+game(\s+codes?)?|game\s+codes?|game\s+script)$/i.test(p)) {
        return true;
      }

      // 3. Named games: "snake game code", "pong game", "tic tac toe code", "flappy bird", "guess the number game", etc.
      if (/(snake|pong|tictactoe|tic\s*tac\s*toe|flappy|rock\s*paper\s*scissors|breakout|brick\s*breaker)/i.test(p)) {
        if (/(code|codes|script|program|build|make|write|generate)/i.test(p)) {
          return true;
        }
      }

      return false;
    }

    // Intent detection: checks whether query is asking for code / programming / building
    function isCodeGenerationPrompt(text) {
      if (!text) return false;
      const t = text.trim().toLowerCase();
      
      const codeVerbs = /(build|create|make|write|generate|give me|show me|code|program|develop|implement|design|draft)/i;
      const codeNouns = /(code|codes|script|program|html|css|javascript|js|python|py|react|component|widget|app|function|algorithm|class|regex|api|backend|frontend|markup|template|game|games)/i;
      const commonWidgets = /(calculator|calendar|calender|date picker|todo|to-do|timer|stopwatch|counter|navbar|modal|form|accordion|carousel|clock|periodic table|periodic grid|elements table|game|arcade|snake|pong|tictactoe|tic tac toe|flappy|mini game)/i;
      
      if (/(\bcode\b|\bcodes\b|\bscript\b|in (html|css|javascript|js|python|py|c\+\+|java|react))\b/i.test(t)) {
        return true;
      }
      
      if (codeVerbs.test(t) && (commonWidgets.test(t) || codeNouns.test(t))) {
        return true;
      }
      
      if (commonWidgets.test(t) && /(code|program|app|html|js|script)/i.test(t)) {
        return true;
      }

      return false;
    }

    // Code fallback synthesizer: routes code requests when online AI times out
    function synthesizeCodeFallback(prompt) {
      const p = (prompt || '').toLowerCase();
      if (isSmallGamePrompt(prompt) || /(game|arcade|snake|pong|tictactoe|tic tac toe|flappy|mini game|catcher|dodger|rock paper|guessing)/i.test(p)) {
        return generateSmallGameCodeResponse(prompt);
      }
      if (/(periodic table|periodic grid|elements table)/i.test(p)) {
        if (typeof generatePeriodicTableCodeResponse === 'function') {
          return generatePeriodicTableCodeResponse();
        } else if (typeof window !== 'undefined' && typeof window.generatePeriodicTableCodeResponse === 'function') {
          return window.generatePeriodicTableCodeResponse();
        }
      }
      if (/(calendar|calender|date picker)/i.test(p)) {
        return generateCalendarCodeResponse(prompt);
      }
      if (/(calculator|calc)/i.test(p)) {
        return generateCalculatorCodeResponse(prompt);
      }
      if (/(todo|to-do|task list|task tracker)/i.test(p)) {
        return generateTodoListCodeResponse(prompt);
      }
      if (/(timer|stopwatch|countdown|alarm)/i.test(p)) {
        return generateTimerCodeResponse(prompt);
      }
      return generateGenericCodeFallback(prompt);
    }

    // Global exports for browser window and Node environments
    if (typeof window !== 'undefined') {
      window.generateSmallGameCodeResponse = generateSmallGameCodeResponse;
      window.isSmallGamePrompt = isSmallGamePrompt;
      window.isCodeGenerationPrompt = isCodeGenerationPrompt;
      window.synthesizeCodeFallback = synthesizeCodeFallback;
      window.generateCalendarCodeResponse = generateCalendarCodeResponse;
      window.detectProgrammingLanguage = detectProgrammingLanguage;
      window.generateCalculatorCodeResponse = generateCalculatorCodeResponse;
      window.generateTodoListCodeResponse = generateTodoListCodeResponse;
      window.generateTimerCodeResponse = generateTimerCodeResponse;
      window.generateGenericCodeFallback = generateGenericCodeFallback;
    }

    if (typeof module !== 'undefined' && module.exports) {
      module.exports = {
        generateSmallGameCodeResponse,
        isSmallGamePrompt,
        isCodeGenerationPrompt,
        synthesizeCodeFallback,
        generateCalendarCodeResponse,
        detectProgrammingLanguage,
        generateCalculatorCodeResponse,
        generateTodoListCodeResponse,
        generateTimerCodeResponse,
        generateGenericCodeFallback
      };
    }
