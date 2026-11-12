// =========================================================================
// NasInfinity AI - Code Writer Studio (How to Write Code from Scratch)
// Practical, step-by-step guides on how to write code in all major languages.
// =========================================================================

(function(window) {
  'use strict';

  // --- 1. The Universal 4-Step Formula to Write ANY Code from Scratch ---
  const UNIVERSAL_WRITING_FORMULA = {
    step1: {
      title: 'Step 1: Write Pseudocode (Plain English Plan)',
      description: 'Never start typing syntax on a blank page immediately! Write out what the computer needs to do in plain human words first.',
      example: `# Goal: Ask for the user's age and tell them if they can vote.
# 1. Ask user for their age
# 2. Convert answer into a whole number
# 3. If age is 18 or older -> print "You can vote!"
# 4. Otherwise -> print "You have to wait X more years."`
    },
    step2: {
      title: 'Step 2: Anatomy of a Source Code File',
      description: 'Almost every program in every language follows the exact same 4-part structure from top to bottom:',
      parts: [
        '1. **Headers & Imports:** Load existing tools (e.g., `import random` or `#include <stdio.h>`)',
        '2. **Variables & State:** Store information the program needs',
        '3. **Functions (Recipes):** Reusable blocks that perform specific calculations or actions',
        '4. **Main Execution:** The entry point where the computer actually starts running instructions'
      ]
    },
    step3: {
      title: 'Step 3: Line-by-Line Construction',
      description: 'Translate each line of your pseudocode into code syntax one small piece at a time. Run after every 3-5 lines to test!'
    },
    step4: {
      title: 'Step 4: Test, Read Errors & Debug',
      description: 'Errors are normal. Look at the line number, verify closed brackets `() {} []`, matching quotes `""`, and test edge cases.'
    }
  };

  // --- 2. Language-by-Language "How to Write Code" Blueprints ---
  const WRITE_GUIDES = {
    python: {
      name: 'Python',
      icon: '🐍',
      fileExt: '.py',
      starterSteps: [
        '1. Create a file named `app.py`.',
        '2. Open it in any text editor (like VS Code or Notepad).',
        '3. Write your instructions. Notice that Python uses **indentation (4 spaces)** to group code blocks—no curly braces needed!',
        '4. Run it in terminal: `python app.py`.'
      ],
      walkthrough: {
        title: 'How to Write an Interactive Tip Calculator in Python',
        steps: [
          {
            part: '1. Welcome message and get user input',
            explanation: 'The `input()` function pauses the program and waits for the user to type something.',
            code: `print("=== Welcome to the Tip Calculator ===")\n# input() returns text (string), so float() turns it into a number with decimals\nbill = float(input("What was the total bill? \$"))`
          },
          {
            part: '2. Get tip percentage & number of people',
            explanation: 'int() converts text into a whole number (integer).',
            code: `tip_percent = int(input("How much tip would you like to give? (10, 15, or 20) "))\npeople = int(input("How many people to split the bill? "))`
          },
          {
            part: '3. Write the math calculation',
            explanation: 'Store intermediate results in clearly named variables.',
            code: `tip_amount = bill * (tip_percent / 100)\ntotal_bill = bill + tip_amount\nbill_per_person = total_bill / people`
          },
          {
            part: '4. Print the formatted result',
            explanation: 'An f-string (`f"..."`) lets you insert variables directly using `{variable:.2f}` for 2 decimal places.',
            code: `print(f"\\nEach person should pay: \${bill_per_person:.2f}")`
          }
        ],
        fullCode: `# Complete app.py
print("=== Welcome to the Tip Calculator ===")
bill = float(input("What was the total bill? \$"))
tip_percent = int(input("How much tip would you like to give? (10, 15, or 20) "))
people = int(input("How many people to split the bill? "))

tip_amount = bill * (tip_percent / 100)
total_bill = bill + tip_amount
bill_per_person = total_bill / people

print(f"\\nEach person should pay: \${bill_per_person:.2f}")`
      }
    },

    javascript: {
      name: 'JavaScript',
      icon: '⚡',
      fileExt: '.js',
      starterSteps: [
        '1. Create a file named `script.js` (or open browser DevTools with F12 -> Console).',
        '2. Use `const` for values that never change, and `let` for variables that can change.',
        '3. End statements with semicolons `;` (best practice).',
        '4. Run with Node.js in terminal: `node script.js`, or link to an HTML file using `<script src="script.js"></script>`.'
      ],
      walkthrough: {
        title: 'How to Write an Interactive To-Do List in JavaScript',
        steps: [
          {
            part: '1. Create the data structure',
            explanation: 'Use an Array `[]` to hold a list of task objects.',
            code: `// Array to store our tasks\nconst todoList = [];`
          },
          {
            part: '2. Write a function to add a task',
            explanation: 'Functions accept parameters and perform actions. `.push()` adds an item to the end of an array.',
            code: `function addTask(taskName) {\n  const task = {\n    id: todoList.length + 1,\n    title: taskName,\n    completed: false\n  };\n  todoList.push(task);\n  console.log(\`Added: "\${taskName}"\`);\n}`
          },
          {
            part: '3. Write a function to complete a task',
            explanation: '`.find()` searches through the array to find an item matching a condition.',
            code: `function completeTask(taskId) {\n  const task = todoList.find(t => t.id === taskId);\n  if (task) {\n    task.completed = true;\n    console.log(\`Task #\${taskId} marked as complete! ✓\`);\n  } else {\n    console.log(\`Task #\${taskId} not found.\`);\n  }\n}`
          },
          {
            part: '4. Write a function to display tasks',
            explanation: '`.forEach()` loops through every item in the array to print its status.',
            code: `function showTasks() {\n  console.log("\\n=== MY TO-DO LIST ===");\n  todoList.forEach(t => {\n    const status = t.completed ? "[✓]" : "[ ]";\n    console.log(\`\${status} #\${t.id}: \${t.title}\`);\n  });\n}`
          }
        ],
        fullCode: `// Complete script.js
const todoList = [];

function addTask(taskName) {
  const task = {
    id: todoList.length + 1,
    title: taskName,
    completed: false
  };
  todoList.push(task);
  console.log(\`Added: "\${taskName}"\`);
}

function completeTask(taskId) {
  const task = todoList.find(t => t.id === taskId);
  if (task) {
    task.completed = true;
    console.log(\`Task #\${taskId} marked as complete! ✓\`);
  }
}

function showTasks() {
  console.log("\\n=== MY TO-DO LIST ===");
  todoList.forEach(t => {
    const status = t.completed ? "[✓]" : "[ ]";
    console.log(\`\${status} #\${t.id}: \${t.title}\`);
  });
}

// Test the program
addTask("Learn to write code with NasInfinity AI");
addTask("Build a web project");
completeTask(1);
showTasks();`
      }
    },

    c: {
      name: 'C',
      icon: '⚙️',
      fileExt: '.c',
      starterSteps: [
        '1. Create a file named `main.c`.',
        '2. Every C program must `#include <stdio.h>` for printing and input.',
        '3. Every C program must have an `int main() { ... return 0; }` function. Execution always starts here.',
        '4. Compile with GCC: `gcc main.c -o myprogram` and run `./myprogram`.'
      ],
      walkthrough: {
        title: 'How to Write a Temperature Converter in C',
        steps: [
          {
            part: '1. Include standard libraries & declare main',
            explanation: '`#include <stdio.h>` provides `printf` (print formatted) and `scanf` (scan input).',
            code: `#include <stdio.h>\n\nint main() {\n    // Code goes here\n    return 0;\n}`
          },
          {
            part: '2. Declare typed variables',
            explanation: 'In C, you must explicitly state variable types (`float` for decimal numbers).',
            code: `    float celsius = 0.0f;\n    float fahrenheit = 0.0f;`
          },
          {
            part: '3. Prompt user and read input using scanf',
            explanation: 'The `&` (address-of) operator tells `scanf` where in memory to write the user value.',
            code: `    printf("Enter temperature in Celsius: ");\n    scanf("%f", &celsius);`
          },
          {
            part: '4. Perform calculation and print',
            explanation: '`%.2f` prints a float with 2 decimal digits.',
            code: `    fahrenheit = (celsius * 9.0f / 5.0f) + 32.0f;\n    printf("%.2f C is equal to %.2f F\\n", celsius, fahrenheit);`
          }
        ],
        fullCode: `#include <stdio.h>

int main() {
    float celsius = 0.0f;
    float fahrenheit = 0.0f;

    printf("=== Celsius to Fahrenheit Converter ===\\n");
    printf("Enter temperature in Celsius: ");
    if (scanf("%f", &celsius) == 1) {
        fahrenheit = (celsius * 9.0f / 5.0f) + 32.0f;
        printf("%.2f C is equal to %.2f F\\n", celsius, fahrenheit);
    } else {
        printf("Invalid input! Please enter a number.\\n");
    }

    return 0;
}`
      }
    },

    cpp: {
      name: 'C++',
      icon: '🚀',
      fileExt: '.cpp',
      starterSteps: [
        '1. Create a file named `main.cpp`.',
        '2. Use `#include <iostream>` for input/output with `std::cout` and `std::cin`.',
        '3. Use `std::vector` for dynamic arrays.',
        '4. Compile with g++: `g++ main.cpp -o app` and run `./app`.'
      ],
      walkthrough: {
        title: 'How to Write a Simple RPG Battle Simulator in C++',
        steps: [
          {
            part: '1. Setup includes and namespaces',
            explanation: '`<iostream>` handles printing; `<string>` handles text objects.',
            code: `#include <iostream>\n#include <string>\nusing namespace std;`
          },
          {
            part: '2. Write a Character Class (Object-Oriented Programming)',
            explanation: 'A class bundles data (health, attack) and behaviors (attack, heal) together.',
            code: `class Hero {\npublic:\n    string name;\n    int hp;\n    int attackPower;\n\n    Hero(string n, int health, int power) {\n        name = n;\n        hp = health;\n        attackPower = power;\n    }\n\n    void attack(Hero &target) {\n        target.hp -= attackPower;\n        cout << name << " strikes " << target.name << " for " << attackPower << " damage!\\n";\n    }\n};`
          },
          {
            part: '3. Instantiate objects and simulate battle in main()',
            explanation: 'Create two heroes and run a while loop until one loses all HP.',
            code: `int main() {\n    Hero knight("Sir Arthur", 100, 25);\n    Hero dragon("Red Drake", 80, 20);\n\n    knight.attack(dragon);\n    cout << dragon.name << " HP remaining: " << dragon.hp << "\\n";\n    return 0;\n}`
          }
        ],
        fullCode: `#include <iostream>
#include <string>
using namespace std;

class Hero {
public:
    string name;
    int hp;
    int attackPower;

    Hero(string n, int health, int power) {
        name = n;
        hp = health;
        attackPower = power;
    }

    void attack(Hero &target) {
        target.hp -= attackPower;
        cout << name << " strikes " << target.name << " for " << attackPower << " damage!\\n";
    }

    bool isAlive() const {
        return hp > 0;
    }
};

int main() {
    cout << "=== Mini Arena Battle ===\\n";
    Hero warrior("Warrior", 50, 15);
    Hero monster("Goblin", 35, 10);

    while (warrior.isAlive() && monster.isAlive()) {
        warrior.attack(monster);
        if (monster.isAlive()) {
            monster.attack(warrior);
        }
    }

    if (warrior.isAlive()) cout << "🏆 Warrior won the battle!\\n";
    else cout << "💀 Monster was victorious!\\n";

    return 0;
}`
      }
    },

    java: {
      name: 'Java',
      icon: '☕',
      fileExt: '.java',
      starterSteps: [
        '1. The filename **MUST match the class name** exactly (e.g. `Main.java` must contain `public class Main`).',
        '2. The entry point is always `public static void main(String[] args)`.',
        '3. Compile: `javac Main.java` -> produces `Main.class` bytecode.',
        '4. Run: `java Main`.'
      ],
      walkthrough: {
        title: 'How to Write a Bank Account Manager in Java',
        steps: [
          {
            part: '1. Create class and state variables',
            explanation: 'Use `private` variables for data protection (encapsulation).',
            code: `public class BankAccount {\n    private String owner;\n    private double balance;\n\n    public BankAccount(String owner, double initialBalance) {\n        this.owner = owner;\n        this.balance = initialBalance;\n    }\n}`
          },
          {
            part: '2. Write methods for deposit and withdrawal',
            explanation: 'Check for valid inputs (e.g., cannot withdraw more than you have).',
            code: `    public void deposit(double amount) {\n        if (amount > 0) {\n            balance += amount;\n            System.out.printf("Deposited \$%.2f. New Balance: \$%.2f%n", amount, balance);\n        }\n    }\n\n    public void withdraw(double amount) {\n        if (amount <= balance) {\n            balance -= amount;\n            System.out.printf("Withdrew \$%.2f. Remaining: \$%.2f%n", amount, balance);\n        } else {\n            System.out.println("Insufficient funds!");\n        }\n    }`
          }
        ],
        fullCode: `// Save as Main.java
public class Main {
    public static void main(String[] args) {
        System.out.println("=== Bank Account Demo ===");
        Account account = new Account("Maya", 100.0);
        account.deposit(50.0);
        account.withdraw(30.0);
        account.withdraw(200.0); // should warn
    }
}

class Account {
    private String owner;
    private double balance;

    public Account(String owner, double initial) {
        this.owner = owner;
        this.balance = initial;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println(owner + " deposited: \$" + amount + " | Balance: \$" + balance);
        }
    }

    public void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            System.out.println(owner + " withdrew: \$" + amount + " | Balance: \$" + balance);
        } else {
            System.out.println("❌ Cannot withdraw \$" + amount + " (Insufficient funds)");
        }
    }
}`
      }
    },

    rust: {
      name: 'Rust',
      icon: '🦀',
      fileExt: '.rs',
      starterSteps: [
        '1. In terminal, run `cargo new my_app` -> Cargo creates a project folder with `src/main.rs`.',
        '2. Open `src/main.rs`. By default, variables are immutable (`let x = 5`). Use `let mut x = 5` if you want to modify it.',
        '3. Test and run with `cargo run`.'
      ],
      walkthrough: {
        title: 'How to Write a Word Counter CLI Tool in Rust',
        steps: [
          {
            part: '1. Create main function',
            explanation: '`fn main()` is the entry point. `let` binds a value to a variable.',
            code: `fn main() {\n    let text = "Writing Rust code with NasInfinity AI is fast and safe!";\n    println!("Input text: {}", text);\n}`
          },
          {
            part: '2. Split words and count safely',
            explanation: '`.split_whitespace()` splits words by spaces; `.count()` tallies them.',
            code: `    let word_count = text.split_whitespace().count();\n    let char_count = text.chars().count();\n    println!("Total Words: {}", word_count);\n    println!("Total Characters: {}", char_count);`
          }
        ],
        fullCode: `fn main() {
    println!("=== Rust Text Inspector ===");
    let text = "Coding in Rust teaches memory safety and high performance.";
    
    let words: Vec<&str> = text.split_whitespace().collect();
    let word_count = words.len();
    let char_count = text.chars().count();

    println!("Original Text: \\"{}\\"", text);
    println!("Word Count: {}", word_count);
    println!("Character Count: {}", char_count);

    println!("\\nFirst 3 words:");
    for (i, word) in words.iter().take(3).enumerate() {
        println!(" {}. {}", i + 1, word);
    }
}`
      }
    },

    go: {
      name: 'Go (Golang)',
      icon: '🐹',
      fileExt: '.go',
      starterSteps: [
        '1. Create a file named `main.go`.',
        '2. The first line must be `package main`.',
        '3. Import the standard formatting library: `import "fmt"`.',
        '4. Run instantly without separate compile step: `go run main.go`.'
      ],
      walkthrough: {
        title: 'How to Write a Fast Web Health Checker in Go',
        steps: [
          {
            part: '1. Declare package and imports',
            explanation: 'Every executable Go file starts with `package main`.',
            code: `package main\n\nimport (\n    "fmt"\n    "time"\n)`
          },
          {
            part: '2. Define a struct for our service status',
            explanation: 'Go uses structs instead of classes.',
            code: `type ServiceCheck struct {\n    URL string\n    Status string\n    Latency time.Duration\n}`
          },
          {
            part: '3. Write a function to check a URL',
            explanation: 'Functions specify parameter types and return types.',
            code: `func checkService(url string) ServiceCheck {\n    return ServiceCheck{\n        URL: url,\n        Status: "200 OK",\n        Latency: 45 * time.Millisecond,\n    }\n}`
          }
        ],
        fullCode: `package main

import (
    "fmt"
    "time"
)

type Service struct {
    Name string
    Port int
    Healthy bool
}

func main() {
    fmt.Println("=== Go Microservice Monitor ===")

    services := []Service{
        {Name: "Auth API", Port: 4001, Healthy: true},
        {Name: "Database Cluster", Port: 5432, Healthy: true},
        {Name: "AI Inference Engine", Port: 8080, Healthy: true},
    }

    for _, s := range services {
        status := "🟢 ONLINE"
        if !s.Healthy {
            status = "🔴 OFFLINE"
        }
        fmt.Printf("%s (Port %d) -> %s [Checked at %s]\\n", s.Name, s.Port, status, time.Now().Format("15:04:05"))
    }
}`
      }
    },

    html_css: {
      name: 'HTML & CSS',
      icon: '🎨',
      fileExt: '.html',
      starterSteps: [
        '1. Create a file named `index.html`.',
        '2. Type `!` and press Tab in VS Code (or copy the boilerplate below).',
        '3. Put your visible content inside the `<body>` tag.',
        '4. Put your styles inside `<style>` in the `<head>` tag, or link a `style.css` file.',
        '5. Double-click `index.html` to open it in Chrome, Edge, or Safari!'
      ],
      walkthrough: {
        title: 'How to Write a Modern Responsive Landing Card in HTML & CSS',
        steps: [
          {
            part: '1. Write the HTML Skeleton',
            explanation: 'HTML tags wrap content: `<h1>` for title, `<p>` for text, `<button>` for clickable actions.',
            code: `<div class="card">\n  <span class="badge">New</span>\n  <h2>Build Fast Web Apps</h2>\n  <p>Learn to write code step-by-step with NasInfinity AI.</p>\n  <button>Get Started →</button>\n</div>`
          },
          {
            part: '2. Add CSS Styling with Flexbox',
            explanation: 'CSS selectors target HTML classes (`.card`) to customize colors, padding, and layout.',
            code: `<style>\n  body { background: #0f172a; font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }\n  .card { background: #1e293b; color: white; padding: 24px; border-radius: 16px; width: 300px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }\n  .badge { background: #6366f1; font-size: 11px; padding: 4px 8px; border-radius: 99px; text-transform: uppercase; font-weight: bold; }\n  button { background: #4f46e5; color: white; border: none; padding: 10px 16px; border-radius: 8px; width: 100%; cursor: pointer; font-weight: bold; margin-top: 12px; }\n  button:hover { background: #4338ca; }\n</style>`
          }
        ],
        fullCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Modern Card</title>
  <style>
    body {
      background: #090d16;
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: #111827;
      border: 1px solid #1f2937;
      color: #f3f4f6;
      padding: 28px;
      border-radius: 20px;
      max-width: 320px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    }
    .icon { font-size: 40px; margin-bottom: 12px; }
    h2 { margin: 0 0 8px 0; font-size: 20px; color: #fff; }
    p { color: #9ca3af; font-size: 13px; line-height: 1.5; margin-bottom: 20px; }
    .btn {
      background: #4f46e5;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition: transform 0.1s, background 0.2s;
    }
    .btn:hover { background: #4338ca; transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🚀</div>
    <h2>Launch Your Code</h2>
    <p>Writing code is a superpower. Start with small, working pieces and build upwards!</p>
    <button class="btn" onclick="alert('Awesome job writing HTML & CSS!')">Explore Lessons</button>
  </div>
</body>
</html>`
      }
    },

    sql: {
      name: 'SQL',
      icon: '🗄️',
      fileExt: '.sql',
      starterSteps: [
        '1. SQL operates on tables with rows (records) and columns (fields).',
        '2. The 4 primary actions are CRUD: Create (`INSERT`), Read (`SELECT`), Update (`UPDATE`), Delete (`DELETE`).',
        '3. Run in SQLite, PostgreSQL, MySQL Workbench, or online at DB-Fiddle.'
      ],
      walkthrough: {
        title: 'How to Write a Student Grade Database in SQL',
        steps: [
          {
            part: '1. Create Table (Schema)',
            explanation: 'Specify column names and their types (INTEGER, TEXT, REAL).',
            code: `CREATE TABLE students (\n    id INTEGER PRIMARY KEY,\n    name TEXT NOT NULL,\n    major TEXT,\n    gpa REAL\n);`
          },
          {
            part: '2. Insert sample rows',
            explanation: '`INSERT INTO table (columns) VALUES (data);`',
            code: `INSERT INTO students (id, name, major, gpa) VALUES\n(1, 'Amina', 'Computer Science', 3.9),\n(2, 'Lucas', 'Data Science', 3.7),\n(3, 'Zara', 'Engineering', 3.8);`
          },
          {
            part: '3. Write a filtered query',
            explanation: '`WHERE` filters rows; `ORDER BY` sorts; `LIMIT` caps output.',
            code: `SELECT name, major, gpa\nFROM students\nWHERE gpa >= 3.8\nORDER BY gpa DESC;`
          }
        ],
        fullCode: `-- Complete SQL Script
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    major TEXT,
    gpa REAL
);

INSERT INTO students (id, name, major, gpa) VALUES
(1, 'Amina', 'Computer Science', 3.9),
(2, 'Lucas', 'Data Science', 3.7),
(3, 'Zara', 'Engineering', 3.8);

-- Find top students
SELECT name, major, gpa
FROM students
WHERE gpa >= 3.8
ORDER BY gpa DESC;

-- Calculate average GPA
SELECT AVG(gpa) AS average_gpa, COUNT(*) AS total_students FROM students;`
      }
    }
  };

  // --- 3. Matcher for "How to Write / Build Code" Queries ---
  function isWriteCodeQuery(prompt) {
    if (!prompt) return false;
    const p = prompt.trim().toLowerCase();

    // Specific coding intent: "how to write code", "teach me to write code", "how do i write code", "writing code"
    // Must NOT match general writing like "how to write an email", "how to write a song", "how to build a house", etc.
    const writeCodeIntent = /(teach\s+(me\s+)?to\s+write\s+(code|coding|software|programs?)|how\s+(to|do\s+i)\s+write\s+(code|coding|programs?|scripts?|software)|write\s+(clean\s+)?code|writing\s+code|write\s+a\s+program|start\s+writing\s+code|guide\s+to\s+writing?\s+code|how\s+to\s+write\s+(python|javascript|js|html|css|c\+\+|cpp|java|rust|golang|go|sql|c#|csharp)\s+(code|programs?|scripts?))/i;
    if (writeCodeIntent.test(p)) return true;

    // Specific app / tool building queries: "how to build a calculator using c++", "how to build a todo list in python", etc.
    const buildProjectIntent = /(how\s+(to|do\s+i)\s+(build|make|create|code|program|develop|write)|can\s+you\s+(build|make|create|code|write)|(build|make|create|write|code|develop)\s+(a\s+)?)\s*(simple\s+|basic\s+|interactive\s+|console\s+)?(calculator|calc|todo\s*list|todo\s*app|to-do|timer|stopwatch|countdown|converter|guessing\s*game|unit\s*converter)\s*(in|using|with|for)?\s*(c\+\+|cpp|c\s*plus\s*plus|python|py|java|javascript|js|c#|csharp|rust|golang|go|\bc\b|html|css|web)?/i;
    if (buildProjectIntent.test(p)) return true;

    return false;
  }

  // --- 4. Generate Interactive Writing Response ---
  function getWriteCodeResponse(prompt) {
    const p = prompt.trim().toLowerCase();

    // If a specific project is requested, delegate to the dedicated project code generator!
    if (/(calculator|calc)\b/i.test(p)) {
      if (typeof generateCalculatorCodeResponse === 'function') {
        return generateCalculatorCodeResponse(prompt);
      } else if (typeof window !== 'undefined' && typeof window.generateCalculatorCodeResponse === 'function') {
        return window.generateCalculatorCodeResponse(prompt);
      } else if (typeof global !== 'undefined' && typeof global.generateCalculatorCodeResponse === 'function') {
        return global.generateCalculatorCodeResponse(prompt);
      }
    }

    if (/(todo|to-do|task\s*list|task\s*tracker|task\s*app)\b/i.test(p)) {
      if (typeof generateTodoListCodeResponse === 'function') {
        return generateTodoListCodeResponse(prompt);
      } else if (typeof window !== 'undefined' && typeof window.generateTodoListCodeResponse === 'function') {
        return window.generateTodoListCodeResponse(prompt);
      } else if (typeof global !== 'undefined' && typeof global.generateTodoListCodeResponse === 'function') {
        return global.generateTodoListCodeResponse(prompt);
      }
    }

    if (/(timer|stopwatch|countdown)\b/i.test(p)) {
      if (typeof generateTimerCodeResponse === 'function') {
        return generateTimerCodeResponse(prompt);
      } else if (typeof window !== 'undefined' && typeof window.generateTimerCodeResponse === 'function') {
        return window.generateTimerCodeResponse(prompt);
      } else if (typeof global !== 'undefined' && typeof global.generateTimerCodeResponse === 'function') {
        return global.generateTimerCodeResponse(prompt);
      }
    }

    // Detect target language
    let langKey = 'python'; // default
    if (p.includes('python')) langKey = 'python';
    else if (p.includes('javascript') || p.includes(' js')) langKey = 'javascript';
    else if (p.includes('html') || p.includes('css')) langKey = 'html_css';
    else if (p.includes('c++') || p.includes('cpp')) langKey = 'cpp';
    else if (p.includes('java') && !p.includes('javascript')) langKey = 'java';
    else if (p.includes('rust')) langKey = 'rust';
    else if (p.includes('go') || p.includes('golang')) langKey = 'go';
    else if (p.includes('sql')) langKey = 'sql';
    else if (p.includes('c ') || p.endsWith(' c')) langKey = 'c';

    const guide = WRITE_GUIDES[langKey] || WRITE_GUIDES.python;

    return `### ✍️ How to Write Code in ${guide.name} (Step-by-Step Practical Guide)

Writing code is like writing a recipe: you start with an empty bowl, gather ingredients, follow step-by-step instructions, and test the taste!

---

#### 🛠️ The 4 Universal Steps to Write Any Code:
1. **Plan First (Pseudocode):** Write what you want the computer to do in plain English before writing syntax.
2. **Setup File:** Create a file named \`program${guide.fileExt}\`.
3. **Write in Small Chunks:** Declare variables, write functions, and test every 3–5 lines.
4. **Run & Observe:** Run your code and fix error messages calmly.

---

#### 🚀 How to Start Writing ${guide.name}:
${guide.starterSteps.join('\n')}

---

#### 📖 Walkthrough: ${guide.walkthrough.title}

${guide.walkthrough.steps.map((s, idx) => `
##### ${s.part}
*${s.explanation}*
\`\`\`${guide.fileExt.slice(1)}
${s.code}
\`\`\`
`).join('\n')}

---

#### 💻 Complete Code:
\`\`\`${guide.fileExt.slice(1)}
${guide.walkthrough.fullCode}
\`\`\`

---

#### 🎯 Practice Writing Challenge for You:
1. Open your code editor and type out the complete code above by hand (do not copy-paste!). Typing builds muscle memory.
2. Try changing one variable (e.g., change the numbers or message) and run it again.
3. Ask me: *"How do I write a calculator in ${guide.name}?"* or *"Review the code I wrote"*!`;
  }

  // --- 5. Interactive Code Writer Modal UI ---
  function renderCodeWriterModal() {
    let modal = document.getElementById('codeWriterModal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'codeWriterModal';
    modal.className = 'fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 hidden';
    modal.setAttribute('onclick', 'if(event.target===this) closeCodeWriterModal()');

    const langBtns = Object.entries(WRITE_GUIDES).map(([key, data]) => `
      <button onclick="selectCodeWriterLang('${key}')" class="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 cursor-pointer transition flex items-center gap-2 group text-left active:scale-[0.98]">
        <span class="text-xl">${data.icon}</span>
        <div>
          <h4 class="font-bold text-xs text-slate-100 group-hover:text-emerald-300 transition">${data.name}</h4>
          <span class="text-[10px] text-slate-500 font-mono">${data.fileExt}</span>
        </div>
      </button>
    `).join('');

    modal.innerHTML = `
      <div class="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Header -->
        <div class="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/60 shrink-0">
          <div class="flex items-center gap-2.5">
            <span class="text-xl sm:text-2xl">✍️</span>
            <div>
              <h3 class="font-bold text-xs sm:text-sm text-slate-100 flex items-center gap-2">
                Code Writer Studio
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Hands-On Writing</span>
              </h3>
              <p class="text-[11px] text-slate-400">Step-by-step guides on how to construct and write code from a blank file</p>
            </div>
          </div>
          <button onclick="closeCodeWriterModal()" class="h-8 w-8 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 flex items-center justify-center text-sm font-bold transition">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-200 text-xs sm:text-sm">
          
          <!-- 4-Step Writing Blueprint Card -->
          <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <h4 class="font-bold text-xs sm:text-sm text-emerald-300 flex items-center gap-2 mb-3">
              <span>📐</span> The Universal 4-Step Formula to Write Any Code
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span class="font-bold text-amber-400 text-xs">1. Pseudocode</span>
                <p class="text-[11px] text-slate-400 mt-1">Write your goal in plain words. Plan before typing syntax.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span class="font-bold text-indigo-400 text-xs">2. Setup File</span>
                <p class="text-[11px] text-slate-400 mt-1">Create file, import needed modules, define initial variables.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span class="font-bold text-emerald-400 text-xs">3. Build Logic</span>
                <p class="text-[11px] text-slate-400 mt-1">Write functions & conditionals. Test every 3-5 lines.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span class="font-bold text-purple-400 text-xs">4. Run & Refine</span>
                <p class="text-[11px] text-slate-400 mt-1">Execute in terminal, inspect output, fix any errors.</p>
              </div>
            </div>
          </div>

          <!-- Select Language to Write -->
          <div>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
              <span>⌨️</span> Choose a Language to Start Writing
            </h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              ${langBtns}
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-4 sm:px-6 py-3 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <span>💡 Click any language to launch a step-by-step writing walkthrough in chat</span>
          <button onclick="closeCodeWriterModal()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition">
            Close
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  window.openCodeWriterModal = function() {
    const modal = renderCodeWriterModal();
    modal.classList.remove('hidden');
  };

  window.closeCodeWriterModal = function() {
    const modal = document.getElementById('codeWriterModal');
    if (modal) modal.classList.add('hidden');
  };

  window.selectCodeWriterLang = function(langKey) {
    const g = WRITE_GUIDES[langKey];
    if (!g) return;
    window.closeCodeWriterModal();
    const ui = document.getElementById('userInput');
    if (ui) {
      ui.value = `Teach me how to write code in ${g.name} step by step from scratch`;
      if (typeof window.handleSendMessage === 'function') {
        window.handleSendMessage();
      } else if (typeof handleSendMessage === 'function') {
        handleSendMessage();
      }
    }
  };

  // Keyboard shortcut: Escape closes modal
  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        window.closeCodeWriterModal();
      }
    });
  }

  // Exported APIs
  window.WRITE_GUIDES = WRITE_GUIDES;
  window.UNIVERSAL_WRITING_FORMULA = UNIVERSAL_WRITING_FORMULA;
  window.isWriteCodeQuery = isWriteCodeQuery;
  window.getWriteCodeResponse = getWriteCodeResponse;

})(window);
