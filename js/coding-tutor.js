// =========================================================================
// NasInfinity AI - Universal Coding Tutor & Programming Academy
// Teaches all major programming languages with simple, intuitive lessons.
// =========================================================================

(function(window) {
  'use strict';

  // --- 1. Programming Languages Knowledge Base ---
  const TUTOR_LANGUAGES = {
    python: {
      name: 'Python',
      icon: '🐍',
      level: 'Super Beginner-Friendly',
      popularFor: 'AI, Data Science, Web Apps, Automation & Scripting',
      whyLearn: 'Python reads almost like plain English. It removes confusing symbols like semicolons and curly braces, letting you focus on logic and creativity.',
      analogy: 'Imagine writing a to-do list in clean English where every indented line is an action step.',
      helloWorld: `# Python 3
print("Hello, World!")`,
      coreSyntax: `# 1. Variables (No keywords needed, just name = value)
name = "Alex"
age = 20
is_student = True
score = 98.5

# 2. Conditionals (Indentation matters!)
if age >= 18:
    print(f"{name} is an adult.")
else:
    print(f"{name} is a minor.")

# 3. Loops
fruits = ["Apple", "Banana", "Cherry"]
for fruit in fruits:
    print("I like", fruit)

for i in range(1, 4):
    print("Step:", i)

# 4. Functions
def calculate_total(price, tax_rate=0.08):
    """Calculates final price with tax."""
    return price + (price * tax_rate)

final_price = calculate_total(100)
print(f"Total: \${final_price:.2f}")

# 5. Dictionaries (Key-Value pairs like a contact card)
student = {
    "name": "Maya",
    "grade": "A+",
    "skills": ["Python", "HTML"]
}
print(student["name"], "has grade:", student["grade"])`,
      miniProject: {
        title: 'Secret Number Guessing Game',
        code: `import random

secret = random.randint(1, 10)
print("I'm thinking of a number between 1 and 10!")

guess = int(input("Enter your guess: "))
if guess == secret:
    print("🎉 Wow, you got it right!")
else:
    print(f"Nice try! The secret number was {secret}.")`
      },
      howToRun: 'Open terminal or cmd and run `python filename.py`, or use free online runners like Replit or Google Colab.'
    },

    javascript: {
      name: 'JavaScript',
      icon: '⚡',
      level: 'Beginner-Friendly',
      popularFor: 'Websites, Web Apps, Frontend & Backend (Node.js), Mobile Apps',
      whyLearn: 'JavaScript is the language of the internet. Every web browser on Earth has JavaScript built right into it. You can build interactive sites, servers, and games.',
      analogy: 'If HTML is the skeleton of a website and CSS is the clothes, JavaScript is the muscles and brain that makes it move when you click.',
      helloWorld: `// Browser or Node.js
console.log("Hello, World!");`,
      coreSyntax: `// 1. Variables (const for values that don't change, let for values that change)
const siteName = "NasInfinity";
let visitorCount = 42;
let isOpen = true;

// 2. Conditionals
if (visitorCount > 40) {
  console.log(\`\${siteName} is busy today!\`);
} else {
  console.log("Welcome visitor!");
}

// 3. Functions (Standard & Arrow)
function greet(user) {
  return "Hello, " + user + "!";
}
const add = (a, b) => a + b;

console.log(greet("Developer"));
console.log("Sum:", add(10, 25));

// 4. Arrays & Array Methods
const colors = ["indigo", "emerald", "amber"];
colors.push("rose");
colors.forEach((color, index) => {
  console.log(\`Color #\${index + 1}: \${color}\`);
});

// 5. Objects & Web Interaction
const button = {
  text: "Click Me",
  clicked: false,
  click() {
    this.clicked = true;
    console.log("Button clicked!");
  }
};
button.click();`,
      miniProject: {
        title: 'Interactive Counter Widget',
        code: `let count = 0;
function increment() {
  count += 1;
  console.log("Current count:", count);
}
function reset() {
  count = 0;
  console.log("Counter reset to 0.");
}
increment(); // 1
increment(); // 2
reset();     // 0`
      },
      howToRun: 'Press F12 in your browser and click "Console", or run `node file.js` in terminal.'
    },

    typescript: {
      name: 'TypeScript',
      icon: '🔷',
      level: 'Beginner to Intermediate (After JS)',
      popularFor: 'Large Web Applications, Enterprise Frontends, Modern Node.js APIs',
      whyLearn: 'TypeScript is JavaScript with static types. It acts like an intelligent spellchecker that spots bugs in your code before you even run it.',
      analogy: 'Imagine driving a sports car (JavaScript), but now it has lane assistance, blind spot alerts, and collision prevention (TypeScript).',
      helloWorld: `const greeting: string = "Hello, TypeScript!";
console.log(greeting);`,
      coreSyntax: `// 1. Explicit Data Types
let username: string = "Jordan";
let userAge: number = 24;
let isSubscribed: boolean = true;

// 2. Interfaces (Contract for an object)
interface UserProfile {
  id: number;
  name: string;
  email: string;
  role?: string; // Optional field
}

const currentUser: UserProfile = {
  id: 101,
  name: "Jordan Lee",
  email: "jordan@example.com"
};

// 3. Typed Functions
function createGreeting(user: UserProfile): string {
  return \`Welcome back, \${user.name} (ID: \${user.id})!\`;
}

console.log(createGreeting(currentUser));`,
      miniProject: {
        title: 'Safe Task Manager',
        code: `type Priority = 'low' | 'medium' | 'high';

interface Task {
  title: string;
  priority: Priority;
  done: boolean;
}

const myTask: Task = {
  title: "Build AI feature",
  priority: "high",
  done: false
};
console.log(\`Task: \${myTask.title} [\${myTask.priority}]\`);`
      },
      howToRun: 'Install with `npm install -g typescript` and compile with `tsc file.ts`, or run directly with `ts-node` or Bun.'
    },

    html_css: {
      name: 'HTML & CSS',
      icon: '🎨',
      level: 'Absolute Beginner',
      popularFor: 'Websites, User Interfaces, Visual Styling, Web Layouts',
      whyLearn: 'HTML defines what content exists on a screen, and CSS determines how beautiful and responsive it looks. Essential for anyone interested in tech.',
      analogy: 'HTML is the bricks and walls of a house; CSS is the paint, furniture, lighting, and interior design.',
      helloWorld: `<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; text-align: center; padding: 50px; }
    h1 { color: #818cf8; }
    button { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
    button:hover { background: #4f46e5; }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>My first modern web page.</p>
  <button onclick="alert('You clicked it!')">Click Me</button>
</body>
</html>`,
      coreSyntax: `<!-- HTML Core Tags -->
<h1>Main Heading</h1>
<p>This is a paragraph with <strong>bold text</strong>.</p>
<a href="https://example.com" target="_blank">Clickable Link</a>
<img src="photo.jpg" alt="Description">

<!-- CSS Selectors & Modern Flexbox -->
<style>
  .card-container {
    display: flex;             /* Align items in a row */
    justify-content: center;   /* Center horizontally */
    gap: 16px;                 /* Space between items */
  }
  .card {
    background: #1e293b;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  }
</style>`,
      miniProject: {
        title: 'Personal Profile Card',
        code: `<div style="max-width:320px; background:#1e293b; color:#f8fafc; border-radius:16px; padding:24px; text-align:center; font-family:sans-serif; margin:auto;">
  <div style="font-size:48px;">🚀</div>
  <h2 style="margin:8px 0;">Dev Explorer</h2>
  <p style="color:#94a3b8; font-size:14px;">Learning to code with NasInfinity AI!</p>
  <button style="background:#6366f1; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:bold; cursor:pointer;">Follow</button>
</div>`
      },
      howToRun: 'Save as `index.html` and double-click to open in Chrome, Edge, or Safari.'
    },

    c: {
      name: 'C',
      icon: '⚙️',
      level: 'Intermediate (Teaches how computers actually work)',
      popularFor: 'Operating Systems (Linux, Windows kernel), Embedded Systems, Hardware, Drivers',
      whyLearn: 'C is the foundational mother of modern languages. Knowing C gives you deep, x-ray vision into computer memory, pointers, and CPU execution.',
      analogy: 'Driving a manual sports car with zero power steering. You have complete control over every gear, wire, and bolt in the engine.',
      helloWorld: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
      coreSyntax: `#include <stdio.h>

// 1. Functions & Data Types
int add(int a, int b) {
    return a + b;
}

int main() {
    // Basic types
    int age = 21;
    float temperature = 98.6f;
    char letter = 'N';

    printf("Age: %d, Temp: %.1f, Letter: %c\\n", age, temperature, letter);

    // 2. Conditionals
    if (age >= 18) {
        printf("Access granted.\\n");
    }

    // 3. Loops & Arrays
    int numbers[5] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++) {
        printf("Index %d = %d\\n", i, numbers[i]);
    }

    // 4. Pointers (A pointer stores a memory address)
    int score = 100;
    int *ptr = &score; // ptr holds the memory address of score
    printf("Score value: %d\\n", *ptr); // dereference to read value
    printf("Memory address: %p\\n", (void*)ptr);

    return 0;
}`,
      miniProject: {
        title: 'Temperature Unit Converter',
        code: `#include <stdio.h>

int main() {
    float celsius = 25.0;
    float fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
    printf("%.1f C is equal to %.1f F\\n", celsius, fahrenheit);
    return 0;
}`
      },
      howToRun: 'Compile with GCC: `gcc program.c -o program` and run `./program`.'
    },

    cpp: {
      name: 'C++',
      icon: '🚀',
      level: 'Intermediate to Advanced',
      popularFor: 'AAA Video Games (Unreal Engine), High-Performance Systems, Browsers, AI Frameworks',
      whyLearn: 'C++ takes C and adds modern Object-Oriented Programming and high-level abstractions without losing a single microsecond of raw machine performance.',
      analogy: 'C with jet thrusters and armor. It is the powerhouse behind game engines and 3D graphics.',
      helloWorld: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
      coreSyntax: `#include <iostream>
#include <vector>
#include <string>

// 1. Classes & Object-Oriented Programming
class Player {
private:
    std::string name;
    int health;

public:
    Player(std::string n, int h) : name(n), health(h) {}

    void takeDamage(int amount) {
        health -= amount;
        std::cout << name << " took " << amount << " damage! Health now: " << health << "\\n";
    }

    void displayStatus() const {
        std::cout << "Player: " << name << " | HP: " << health << "\\n";
    }
};

int main() {
    // 2. Standard Vector (Dynamic Array)
    std::vector<int> scores = {90, 85, 95};
    scores.push_back(100);

    // Modern range-based for loop
    for (int score : scores) {
        std::cout << "Score: " << score << "\\n";
    }

    // 3. Object Instance
    Player hero("Knight", 100);
    hero.displayStatus();
    hero.takeDamage(25);

    return 0;
}`,
      miniProject: {
        title: 'RPG Character Stat Generator',
        code: `#include <iostream>
#include <string>

int main() {
    std::string hero = "Cyber Samurai";
    int attack = 45;
    int defense = 30;
    std::cout << "Character: " << hero << "\\nPower Level: " << (attack * 2 + defense) << "\\n";
    return 0;
}`
      },
      howToRun: 'Compile with G++: `g++ main.cpp -o main` and run `./main`.'
    },

    csharp: {
      name: 'C# (C-Sharp)',
      icon: '🎯',
      level: 'Beginner to Intermediate',
      popularFor: 'Game Development (Unity Engine), Windows Apps, Enterprise Backends, Cloud Services',
      whyLearn: 'Developed by Microsoft, C# is clean, organized, type-safe, and the primary scripting language for the world-famous Unity game engine.',
      analogy: 'A luxury car that drives fast but comes equipped with plush seats, automatic climate control, and supreme safety features.',
      helloWorld: `// Program.cs (.NET 8)
Console.WriteLine("Hello, World!");`,
      coreSyntax: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // 1. Variables & Types
        string gameTitle = "Infinite Realm";
        int level = 5;
        double speed = 14.5;
        bool isAlive = true;

        Console.WriteLine($"Welcome to {gameTitle}! Level: {level}");

        // 2. Collections & LINQ-ready lists
        List<string> inventory = new List<string> { "Sword", "Health Potion", "Compass" };
        inventory.Add("Magic Shield");

        foreach (var item in inventory)
        {
            Console.WriteLine($"- Inventory Item: {item}");
        }

        // 3. Method Call
        int damage = CalculateDamage(level, 10);
        Console.WriteLine($"Calculated Attack: {damage}");
    }

    static int CalculateDamage(int level, int basePower)
    {
        return (level * 2) + basePower;
    }
}`,
      miniProject: {
        title: 'Unity-Style Health System',
        code: `int maxHealth = 100;
int currentHealth = 80;
void Heal(int amount) {
    currentHealth = Math.Min(maxHealth, currentHealth + amount);
    Console.WriteLine($"Healed! HP: {currentHealth}/{maxHealth}");
}
Heal(15);`
      },
      howToRun: 'Install .NET SDK and run `dotnet new console` then `dotnet run`.'
    },

    java: {
      name: 'Java',
      icon: '☕',
      level: 'Beginner to Intermediate',
      popularFor: 'Enterprise Systems, Android Apps, Big Data, Minecraft',
      whyLearn: 'Java has been a backbone of global business for 25+ years. "Write Once, Run Anywhere" via the JVM means Java code runs on any OS without recompiling.',
      analogy: 'A massive cargo train. It takes a little more setup to build the tracks, but once it is rolling, it can carry enormous payloads reliably for years.',
      helloWorld: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      coreSyntax: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // 1. Strong Typing
        String appName = "NasInfinity";
        int users = 1500;
        double uptime = 99.98;

        System.out.printf("App: %s | Active Users: %d | Uptime: %.2f%%\\n", appName, users, uptime);

        // 2. ArrayList Collection
        ArrayList<String> languages = new ArrayList<>();
        languages.add("Java");
        languages.add("Kotlin");
        languages.add("Python");

        for (String lang : languages) {
            System.out.println("Supported Language: " + lang);
        }

        // 3. Method Call
        boolean status = isServerHealthy(uptime);
        System.out.println("Server Healthy: " + status);
    }

    public static boolean isServerHealthy(double uptime) {
        return uptime >= 99.0;
    }
}`,
      miniProject: {
        title: 'Bank Balance Tracker',
        code: `double balance = 500.0;
double deposit = 150.0;
balance += deposit;
System.out.println("Updated Balance: \$" + balance);`
      },
      howToRun: 'Compile with `javac Main.java` and run with `java Main`.'
    },

    rust: {
      name: 'Rust',
      icon: '🦀',
      level: 'Intermediate to Advanced',
      popularFor: 'High Performance, WebAssembly, Operating Systems, CLI Tools, Cryptography',
      whyLearn: 'Voted the most loved programming language year after year. Rust provides C++ speed, but prevents memory crashes and race conditions using its unique "Ownership" model.',
      analogy: 'A strict but brilliant mentor who checks every millimeter of your blueprint before letting you build. If it compiles, it runs safely.',
      helloWorld: `fn main() {
    println!("Hello, World!");
}`,
      coreSyntax: `// 1. Variables are immutable by default!
fn main() {
    let app_name = "NasInfinity";
    let mut counter = 0; // 'mut' allows modification
    counter += 1;

    println!("App: {}, Count: {}", app_name, counter);

    // 2. Ownership & Borrowing
    let message = String::from("Rust is fast!");
    print_message(&message); // Borrowing using &
    println!("Still own message: {}", message);

    // 3. Powerful Pattern Matching (match)
    let grade = 'A';
    match grade {
        'A' => println!("Outstanding work!"),
        'B' => println!("Good job!"),
        _ => println!("Keep practicing!"),
    }

    // 4. Vectors
    let numbers = vec![1, 2, 3, 4, 5];
    for n in &numbers {
        println!("Number: {}", n * 2);
    }
}

fn print_message(msg: &String) {
    println!("Message: {}", msg);
}`,
      miniProject: {
        title: 'Safe Word Counter',
        code: `fn main() {
    let sentence = "Learn Rust with NasInfinity AI";
    let count = sentence.split_whitespace().count();
    println!("Total words: {}", count);
}`
      },
      howToRun: 'Install from rustup.rs and run `cargo new my_project` followed by `cargo run`.'
    },

    go: {
      name: 'Go (Golang)',
      icon: '🐹',
      level: 'Beginner-Friendly',
      popularFor: 'Cloud Computing, Microservices, Docker, Kubernetes, Fast Web APIs',
      whyLearn: 'Created by Google to replace complicated C++ and Java codebases. Go has only 25 keywords, compiles in milliseconds, and makes writing parallel code effortless with goroutines.',
      analogy: 'A sleek, lightweight scooter that starts with one click, zips through heavy traffic, and never breaks down.',
      helloWorld: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
      coreSyntax: `package main

import "fmt"

// 1. Struct (Custom Data Type)
type Server struct {
    Name string
    Port int
    Active bool
}

// 2. Functions with Multiple Return Values!
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    srv := Server{Name: "API Gateway", Port: 8080, Active: true}
    fmt.Printf("Server %s is running on port %d\\n", srv.Name, srv.Port)

    // Slices (Dynamic Arrays)
    endpoints := []string{"/users", "/posts", "/health"}
    for idx, path := range endpoints {
        fmt.Printf("[%d] Route: %s\\n", idx, path)
    }

    result, err := divide(100, 4)
    if err == nil {
        fmt.Println("Result:", result)
    }
}`,
      miniProject: {
        title: 'Fast Ping Checker',
        code: `package main
import "fmt"

func main() {
    sites := []string{"google.com", "github.com", "localhost"}
    for _, s := range sites {
        fmt.Println("Pinging:", s, "-> OK [200]")
    }
}`
      },
      howToRun: 'Install Go from golang.org and run `go run main.go`.'
    },

    sql: {
      name: 'SQL (Structured Query Language)',
      icon: '🗄️',
      level: 'Beginner-Friendly',
      popularFor: 'Relational Databases (PostgreSQL, MySQL, SQLite), Business Intelligence, Data Analysis',
      whyLearn: 'Every software application stores data. SQL is the universal language for creating, finding, updating, and filtering records in structured tables.',
      analogy: 'Asking polite, precise questions to an infinite Excel spreadsheet: "Show me all customers from California who spent over \$100."',
      helloWorld: `-- Retrieve all records from a table
SELECT 'Hello, World!' AS greeting;`,
      coreSyntax: `-- 1. Create a Table
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    grade CHAR(1),
    score INTEGER
);

-- 2. Insert Records
INSERT INTO students (id, name, grade, score) VALUES 
(1, 'Amina', 'A', 95),
(2, 'Lucas', 'B', 84),
(3, 'Zara', 'A', 98);

-- 3. Query & Filter Data
SELECT name, score 
FROM students 
WHERE score >= 90 
ORDER BY score DESC;

-- 4. Aggregate Calculations
SELECT 
    COUNT(*) AS total_students,
    AVG(score) AS average_score,
    MAX(score) AS top_score
FROM students;

-- 5. Update and Delete
UPDATE students SET score = 88 WHERE name = 'Lucas';
DELETE FROM students WHERE id = 99;`,
      miniProject: {
        title: 'E-Commerce Orders Query',
        code: `SELECT customer_name, SUM(total_price) AS total_spent
FROM orders
WHERE status = 'completed'
GROUP BY customer_name
ORDER BY total_spent DESC
LIMIT 5;`
      },
      howToRun: 'Run in SQLite browser, MySQL Workbench, PostgreSQL pgAdmin, or online at sqlfiddle.com.'
    },

    php: {
      name: 'PHP',
      icon: '🐘',
      level: 'Beginner-Friendly',
      popularFor: 'Web Servers, WordPress, E-Commerce, Content Management Systems',
      whyLearn: 'Powers over 75% of websites with server-side languages, including WordPress and Wikipedia. Modern PHP (8.x) is fast, typed, and easy to deploy.',
      analogy: 'A reliable postal worker delivering requested web pages directly from the server to your screen.',
      helloWorld: `<?php
echo "Hello, World!";
?>`,
      coreSyntax: `<?php
// 1. Variables start with a dollar sign ($)
$site = "NasInfinity AI";
$version = 2.0;
$features = ["Chat", "Game", "NLP", "Code Tutor"];

echo "Welcome to " . $site . " v" . $version . "\\n";

// 2. Associative Arrays (Key-Value)
$user = [
    "username" => "coder99",
    "role" => "Admin"
];

// 3. Conditionals & Loops
if ($user["role"] === "Admin") {
    echo "Access granted for " . $user["username"] . "\\n";
}

foreach ($features as $f) {
    echo "- Feature: " . $f . "\\n";
}

// 4. Functions
function calculateDiscount(float $price, float $percent): float {
    return $price - ($price * ($percent / 100));
}
echo "Discounted: \$" . calculateDiscount(50.0, 10.0);
?>`,
      miniProject: {
        title: 'Contact Form Handler',
        code: `<?php
$email = "user@example.com";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Valid email address!";
} else {
    echo "Invalid email format.";
}
?>`
      },
      howToRun: 'Run `php file.php` in terminal or install XAMPP/LocalWP.'
    },

    ruby: {
      name: 'Ruby',
      icon: '💎',
      level: 'Super Beginner-Friendly',
      popularFor: 'Rapid Web Development (Ruby on Rails), Startups, Prototyping',
      whyLearn: 'Created by Yukihiro Matsumoto to make programmers happy. Its syntax reads so naturally that coding feels like creative writing.',
      analogy: 'Writing a letter in conversational English where the computer intuitively understands what you mean.',
      helloWorld: `puts "Hello, World!"`,
      coreSyntax: `# 1. Variables & Clean Interpolation
app_name = "NasInfinity"
items = 5
puts "Welcome to #{app_name}! You have #{items} new tasks."

# 2. Expressive Loops & Blocks
3.times do |i|
  puts "Loop iteration #{i + 1}"
end

fruits = ["Mango", "Peach", "Berry"]
fruits.each do |fruit|
  puts "Delicious #{fruit}"
end

# 3. Methods (Functions)
def greet(name = "Friend")
  "Hello, #{name}!"
end

puts greet("Rubyist")

# 4. Object-Oriented Simplicity
class Dog
  attr_accessor :name
  def initialize(name)
    @name = name
  end
  def bark
    "#{name} says Woof!"
  end
end

my_dog = Dog.new("Buddy")
puts my_dog.bark`,
      miniProject: {
        title: 'Simple Shopping Cart',
        code: `cart = [12.50, 4.99, 25.00]
total = cart.sum
puts "Cart Total: \$#{total}"`
      },
      howToRun: 'Run `ruby file.rb` in terminal or test at irb.'
    },

    swift: {
      name: 'Swift',
      icon: '🕊️',
      level: 'Beginner to Intermediate',
      popularFor: 'iOS, iPadOS, macOS, watchOS, and Apple Vision Pro apps',
      whyLearn: 'Apple created Swift to make iOS development fast, enjoyable, and safe. Paired with SwiftUI, you can design gorgeous iPhone apps in just a few lines of code.',
      analogy: 'Designing an iPhone screen where every piece snaps into place with Apple-grade polish and fluid animation.',
      helloWorld: `import Foundation
print("Hello, World!")`,
      coreSyntax: `// 1. Variables (let for constant, var for changeable)
let appName = "InfinityiOS"
var score = 100
score += 25

// 2. Optionals (Prevents null crashes)
var userBio: String? = "Mobile Developer"
if let bio = userBio {
    print("User Bio: \\(bio)")
}

// 3. Functions
func buildDevice(name: String, model: Int) -> String {
    return "\\(name) Pro \\(model)"
}
print(buildDevice(name: "iPhone", model: 16))

// 4. SwiftUI View Sample
/*
import SwiftUI
struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, iOS!")
                .font(.title)
                .bold()
        }
        .padding()
    }
}
*/`,
      miniProject: {
        title: 'Battery Indicator Helper',
        code: `let batteryLevel = 85
let status = batteryLevel > 20 ? "Battery OK 🔋" : "Low Battery 🪫"
print(status)`
      },
      howToRun: 'Download Xcode on macOS or use the Swift Playgrounds app on iPad/Mac.'
    },

    kotlin: {
      name: 'Kotlin',
      icon: '📱',
      level: 'Beginner to Intermediate',
      popularFor: 'Modern Android Apps (Google Official), Multiplatform Mobile, Server-Side',
      whyLearn: 'Google officially recommends Kotlin as the premier language for Android app development. It eliminates 50%+ of Java boilerplate and has built-in null-safety.',
      analogy: 'Modern Android at its finest: clean, expressive, and impossible to break with common null-pointer errors.',
      helloWorld: `fun main() {
    println("Hello, World!")
}`,
      coreSyntax: `// 1. Variables (val = read-only, var = mutable)
val appName = "NasInfinity Mobile"
var activeUsers = 120

// 2. Null Safety
var nullableText: String? = null
val length = nullableText?.length ?: 0 // Elvis operator

// 3. Data Classes (Generates getters, setters, toString automatically!)
data class User(val id: Int, val name: String, val role: String)

fun main() {
    val dev = User(1, "Siddharth", "Android Engineer")
    println("User: \${dev.name} - \${dev.role}")

    // 4. Collections & Lambdas
    val frameworks = listOf("Jetpack Compose", "Coroutines", "Room")
    frameworks.filter { it.startsWith("J") }.forEach {
        println("Featured: \$it")
    }
}`,
      miniProject: {
        title: 'Android Notification Builder',
        code: `fun notify(msg: String, priority: Int = 1) {
    println("Notification [Priority \$priority]: \$msg")
}
notify("Your build completed successfully!")`
      },
      howToRun: 'Use Android Studio or run online at play.kotlinlang.org.'
    },

    bash: {
      name: 'Bash / Shell Scripting',
      icon: '💻',
      level: 'Beginner-Friendly',
      popularFor: 'Terminal Automation, DevOps, CI/CD Pipelines, Linux System Administration',
      whyLearn: 'The universal command line language for Linux, macOS, and Git Bash. A quick bash script can automate repetitive daily tasks that would take hours by hand.',
      analogy: 'A superpower command line wand where every terminal spell you cast can be chained together automatically.',
      helloWorld: `#!/usr/bin/env bash
echo "Hello, World!"`,
      coreSyntax: `#!/usr/bin/env bash

# 1. Variables (No spaces around = sign!)
PROJECT_NAME="NasInfinity"
PORT=3000

echo "Deploying \$PROJECT_NAME on port \$PORT..."

# 2. Conditionals
if [ -f "index.html" ]; then
    echo "index.html exists! Ready to serve."
else
    echo "Warning: index.html not found!"
fi

# 3. Loops over files or lists
for file in *.js; do
    echo "Found JavaScript asset: \$file"
done

# 4. Functions
greet_user() {
    local name="\$1"
    echo "Welcome back, \$name!"
}
greet_user "Admin"`,
      miniProject: {
        title: 'Automated Project Backup Script',
        code: `#!/usr/bin/env bash
BACKUP_DIR="./backup_\$(date +%Y%m%d)"
mkdir -p "\$BACKUP_DIR"
cp index.html "\$BACKUP_DIR/"
echo "Project backup created at \$BACKUP_DIR"`
      },
      howToRun: 'Save as `script.sh`, make executable with `chmod +x script.sh`, and run `./script.sh`.'
    }
  };

  // --- 2. Core Computer Science & Programming Concepts ---
  const TUTOR_CONCEPTS = {
    variables: {
      title: 'Variables & Data Types',
      icon: '📦',
      analogy: 'Think of a variable as a labeled storage box in your room. The label on the outside is the variable name (e.g. `age`), and whatever you put inside the box is the value (e.g. `25`).',
      explanation: 'Computers use variables to remember information while a program runs.',
      types: [
        { name: 'String (Text)', example: '"Hello"', desc: 'Words, sentences, letters enclosed in quotes.' },
        { name: 'Integer (Int)', example: '42, -5', desc: 'Whole numbers without decimal fractions.' },
        { name: 'Float / Double', example: '3.14, 99.99', desc: 'Numbers with decimal points.' },
        { name: 'Boolean (Bool)', example: 'true / false', desc: 'Binary state: yes or no, on or off, 1 or 0.' },
        { name: 'List / Array', example: '[1, 2, 3]', desc: 'An ordered collection of multiple items.' }
      ],
      quickCode: `# Python
box_name = "Alex"      # String
box_number = 42        # Integer
box_pi = 3.14          # Float
box_active = True      # Boolean`
    },

    conditionals: {
      title: 'Conditionals (Decision Making)',
      icon: '🚦',
      analogy: 'Conditionals are like traffic lights or forks in a road. If the light is green, proceed. If red, stop. If yellow, slow down.',
      explanation: 'Conditionals let your code make choices dynamically based on conditions (`if`, `else if`, `else`).',
      quickCode: `// JavaScript
let temperature = 32;

if (temperature > 30) {
  console.log("Wear sunglasses and stay hydrated! ☀️");
} else if (temperature > 15) {
  console.log("Pleasant weather outside! 🌤️");
} else {
  console.log("Grab a warm coat! ❄️");
}`
    },

    loops: {
      title: 'Loops (Repetition Without Repeating Yourself)',
      icon: '🔄',
      analogy: 'Imagine your teacher tells you to write "I will practice code" 100 times on a chalkboard. Instead of writing it 100 times by hand, you build a stamp machine that presses it 100 times in 1 second.',
      explanation: 'Loops repeat a block of code as long as a condition is true (`while` loop) or for every item in a list (`for` loop).',
      quickCode: `# Python
# 1. For Loop over a list
superheroes = ["Batman", "Spider-Man", "Iron Man"]
for hero in superheroes:
    print(hero, "is ready!")

# 2. While Loop
battery = 3
while battery > 0:
    print("Device running... battery:", battery)
    battery -= 1
print("Battery empty!")`
    },

    functions: {
      title: 'Functions (Reusable Recipes / Machines)',
      icon: '⚙️',
      analogy: 'A function is like a vending machine or coffee maker. You press a button and give it inputs (coffee beans + water), it does the work inside, and returns the output (fresh hot coffee).',
      explanation: 'Functions bundle a set of steps into a single reusable command. Write once, call a thousand times.',
      quickCode: `// JavaScript
// 1. Define the recipe (Function)
function makePizza(size, topping) {
  return \`Here is your \${size} pizza topped with \${topping}! 🍕\`;
}

// 2. Call the recipe
const dinner1 = makePizza("large", "mushrooms");
const dinner2 = makePizza("medium", "extra cheese");

console.log(dinner1);
console.log(dinner2);`
    },

    oop: {
      title: 'Object-Oriented Programming (OOP)',
      icon: '🧱',
      analogy: 'A Class is a cookie cutter or architectural blueprint. An Object is the actual cookie or house created from that cutter.',
      explanation: 'OOP organizes code into objects that have properties (data/attributes) and methods (actions it can take).',
      quickCode: `# Python
# Blueprint (Class)
class Car:
    def __init__(self, brand, color):
        self.brand = brand   # Property
        self.color = color   # Property
        self.speed = 0

    def accelerate(self, amount):  # Method
        self.speed += amount
        print(f"The {self.color} {self.brand} is zooming at {self.speed} km/h!")

# Create real objects
my_car = Car("Tesla", "Midnight Silver")
friend_car = Car("Porsche", "Ruby Red")

my_car.accelerate(50)`
    },

    debugging: {
      title: 'Debugging (How to Fix Errors Like a Detective)',
      icon: '🔍',
      analogy: 'Debugging is not a sign of failure—it is 80% of what professional software engineers do every single day! Think of it like being Sherlock Holmes solving a puzzle.',
      explanation: 'When an error occurs, read the error message carefully from the bottom up. It tells you the file, line number, and exact reason.',
      tips: [
        '1. **Read the line number:** The error tells you exactly where the computer got confused.',
        '2. **Check for missing symbols:** Mismatched quotes `"`, brackets `}`, or missing colons `:` cause 70% of beginner errors.',
        '3. **Print / Console Log:** Print out variables before the error line to see what values they actually hold.',
        '4. **Google / Ask AI the exact error:** Copy and paste the error message into NasInfinity AI for an instant fix!'
      ]
    }
  };

  // --- 3. Language Selector Recommendation Guide ---
  function getLanguageRecommendation(goal) {
    const g = (goal || '').toLowerCase();
    if (g.includes('game') || g.includes('unity') || g.includes('unreal')) {
      return {
        top: 'C# (for Unity) or C++ (for Unreal Engine)',
        reason: 'C# is the industry standard for Unity (indie, 2D & 3D games). C++ powers massive AAA game engines like Unreal Engine.',
        starter: 'csharp'
      };
    }
    if (g.includes('web') || g.includes('site') || g.includes('frontend')) {
      return {
        top: 'HTML, CSS & JavaScript',
        reason: 'Every website in the world relies on this trio. Once comfortable, add TypeScript and Node.js / Python.',
        starter: 'javascript'
      };
    }
    if (g.includes('ai') || g.includes('data') || g.includes('machine learning') || g.includes('science')) {
      return {
        top: 'Python',
        reason: 'Python dominates artificial intelligence, machine learning (PyTorch, TensorFlow), data analysis, and automation.',
        starter: 'python'
      };
    }
    if (g.includes('mobile') || g.includes('app') || g.includes('iphone') || g.includes('android')) {
      return {
        top: 'Swift (for iPhone) or Kotlin (for Android)',
        reason: 'Swift is native for Apple iOS devices. Kotlin is the modern standard for Android.',
        starter: 'swift'
      };
    }
    if (g.includes('fast') || g.includes('speed') || g.includes('system') || g.includes('hardware') || g.includes('security')) {
      return {
        top: 'Rust or C / C++',
        reason: 'Rust offers lightning-fast execution and zero memory crashes. C and C++ give direct hardware access.',
        starter: 'rust'
      };
    }
    return {
      top: 'Python',
      reason: 'Python has the gentlest learning curve, reads like English, and lets you build real projects on day one.',
      starter: 'python'
    };
  }

  // --- 4. Query Matcher for Conversational AI ---
  function isCodingEducationQuery(prompt) {
    if (!prompt) return false;
    const p = prompt.trim().toLowerCase();

    // Explicit coding intent: "teach me to code", "learn programming", "how to code", "beginner coding"
    const explicitCodeIntent = /(teach\s+(me\s+)?(to\s+)?(code|program)|learn\s+(to\s+)?(code|program)|how\s+to\s+code|how\s+to\s+program|start\s+(coding|programming)|beginner\s+(coding|programming)|coding\s+tutorial|programming\s+tutorial|crash\s+course\s+in\s+(coding|programming))/i;
    if (explicitCodeIntent.test(p)) return true;

    // Check language matches with unambiguous programming words (e.g. "learn python", "python tutorial", "javascript crash course")
    const unambiguousLangs = /(python|javascript|typescript|c\+\+|cpp|c#|csharp|golang|kotlin|php|ruby|sql)\b/i;
    const learnKeywords = /(teach|learn|tutorial|crash\s*course|basics\s*of|syntax\s*for|guide\s*to)\b/i;

    if (unambiguousLangs.test(p) && learnKeywords.test(p)) {
      return true;
    }

    // Common words with other meanings (swift, rust, go, shell, java) require explicit programming context
    const ambiguousLangs = /(swift|rust|go|shell|java)\b/i;
    if (ambiguousLangs.test(p) && learnKeywords.test(p) && /(programming|coding|language|code|script|syntax|dev)\b/i.test(p)) {
      return true;
    }

    // Programming concept questions only if programming context is present
    const concepts = /(variable|variables|loop|loops|function|functions|conditional|conditionals|oop|object\s*oriented|class|classes|data\s*type|data\s*types)\b/i;
    if (concepts.test(p) && /(programming|coding|code|javascript|python|c\+\+|software|in\s+code)\b/i.test(p) && learnKeywords.test(p)) {
      return true;
    }

    // Recommendation queries ("which programming language should I learn?")
    if (/(which|what)\s+(programming\s+)?language\s+should\s+i\s+learn|recommend\s+a\s+(programming\s+)?language/i.test(p)) {
      return true;
    }

    return false;
  }

  // --- 5. Format Lesson for Chat Stream ---
  function getCodingLessonResponse(prompt) {
    const p = prompt.trim().toLowerCase();

    // Check if user is asking "which language should I learn?"
    if (/(which language|what language|should i learn|where do i start|recommend a language|best language for)/i.test(p)) {
      const rec = getLanguageRecommendation(p);
      return `### 🧭 Which Programming Language Should You Learn?

Here is our **NasInfinity AI Beginner Roadmap** based on what you want to build:

* 🎯 **Recommended for you:** **${rec.top}**
* 💡 **Why:** ${rec.reason}

---

#### 🗺️ Quick Direction Finder:
1. 🌐 **Build Websites & Web Apps:** Start with **HTML & CSS**, then learn **JavaScript**.
2. 🤖 **AI, Machine Learning & Automation:** Choose **Python** (gentlest curve, huge community).
3. 🎮 **Video Game Development:** Choose **C#** (Unity Engine) or **C++** (Unreal Engine).
4. 📱 **Mobile Apps:** Choose **Swift** for iPhone or **Kotlin** for Android.
5. ⚡ **High-Speed Systems & Cloud:** Choose **Go** or **Rust**.

> 💡 **Ready to dive in?** Type *"Teach me Python"* or *"Teach me JavaScript"* and we will start with lesson 1!`;
    }

    // Match Specific Language
    let matchedKey = null;
    if (/\bpython\b/i.test(p)) matchedKey = 'python';
    else if (p.includes('c++') || /\bcpp\b/i.test(p)) matchedKey = 'cpp';
    else if (p.includes('c#') || /\bcsharp\b/i.test(p)) matchedKey = 'csharp';
    else if (/\b(javascript|js)\b/i.test(p)) matchedKey = 'javascript';
    else if (/\b(typescript|ts)\b/i.test(p)) matchedKey = 'typescript';
    else if (/\b(html|css)\b/i.test(p)) matchedKey = 'html_css';
    else if (/(?:^|\s)c(?:\s|$)/i.test(p) && !p.includes('c++') && !p.includes('c#') && /(code|program|language|tutorial|learn|teach)/i.test(p)) matchedKey = 'c';
    else if (/\bjava\b/i.test(p) && !/javascript/i.test(p)) matchedKey = 'java';
    else if (/\brust\b/i.test(p)) matchedKey = 'rust';
    else if (/\b(go|golang)\b/i.test(p)) matchedKey = 'go';
    else if (/\bsql\b/i.test(p)) matchedKey = 'sql';
    else if (/\bphp\b/i.test(p)) matchedKey = 'php';
    else if (/\bruby\b/i.test(p)) matchedKey = 'ruby';
    else if (/\bswift\b/i.test(p)) matchedKey = 'swift';
    else if (/\bkotlin\b/i.test(p)) matchedKey = 'kotlin';
    else if (/\b(bash|shell)\b/i.test(p)) matchedKey = 'bash';

    if (matchedKey && TUTOR_LANGUAGES[matchedKey]) {
      const lang = TUTOR_LANGUAGES[matchedKey];
      return `### ${lang.icon} Learn ${lang.name} in 3 Minutes (Simple & Intuitive)

* **Difficulty:** \`${lang.level}\`
* **Best For:** ${lang.popularFor}

---

#### 💡 The Intuitive Mental Model:
> *${lang.analogy}*

${lang.whyLearn}

---

#### 1️⃣ "Hello World"
\`\`\`${matchedKey === 'html_css' ? 'html' : matchedKey === 'cpp' ? 'cpp' : matchedKey === 'csharp' ? 'csharp' : matchedKey}
${lang.helloWorld}
\`\`\`

---

#### 2️⃣ Core Syntax & Key Concepts (Variables, Loops, Functions)
\`\`\`${matchedKey === 'html_css' ? 'html' : matchedKey === 'cpp' ? 'cpp' : matchedKey === 'csharp' ? 'csharp' : matchedKey}
${lang.coreSyntax}
\`\`\`

---

#### 3️⃣ Mini Beginner Project: ${lang.miniProject.title}
\`\`\`${matchedKey === 'html_css' ? 'html' : matchedKey === 'cpp' ? 'cpp' : matchedKey === 'csharp' ? 'csharp' : matchedKey}
${lang.miniProject.code}
\`\`\`

---

#### 🚀 How to Run It:
${lang.howToRun}

> 💬 **Want to practice?** Ask me: *"Give me a beginner challenge in ${lang.name}"* or *"Explain how functions work in ${lang.name}"*!`;
    }

    // Match Specific Concept
    if (/\b(variable|variables|data type|data types)\b/i.test(p)) {
      const c = TUTOR_CONCEPTS.variables;
      return `### ${c.icon} ${c.title} (Explained Simply)

#### 💡 The Real-World Analogy:
> ${c.analogy}

${c.explanation}

#### 📋 The 5 Essential Data Types:
${c.types.map(t => `* **${t.name}:** e.g. \`${t.example}\` — *${t.desc}*`).join('\n')}

#### 💻 Example Code:
\`\`\`python
${c.quickCode}
\`\`\`

> 💡 **Rule of Thumb:** Always name your variables clearly so another human (or future you) knows what is stored inside!`;
    }

    if (/\b(conditional|conditionals|if else|decision)\b/i.test(p)) {
      const c = TUTOR_CONCEPTS.conditionals;
      return `### ${c.icon} ${c.title} (Explained Simply)

#### 💡 The Real-World Analogy:
> ${c.analogy}

${c.explanation}

#### 💻 Example Code:
\`\`\`javascript
${c.quickCode}
\`\`\`

> 💡 **Key Operators:**
> * \`==\` or \`===\` : Is it equal to?
> * \`>\` and \`<\` : Greater than / Less than
> * \`>=\` and \`<=\` : At least / At most
> * \`&&\` (AND), \`||\` (OR), \`!\` (NOT)`;
    }

    if (/\b(loop|loops|for loop|while loop|iteration)\b/i.test(p)) {
      const c = TUTOR_CONCEPTS.loops;
      return `### ${c.icon} ${c.title} (Explained Simply)

#### 💡 The Real-World Analogy:
> ${c.analogy}

${c.explanation}

#### 💻 Example Code:
\`\`\`python
${c.quickCode}
\`\`\`

> ⚠️ **Caution:** Always make sure your \`while\` loop condition eventually becomes false, or you will create an *infinite loop* that freezes your program!`;
    }

    if (/\b(function|functions|method|methods)\b/i.test(p)) {
      const c = TUTOR_CONCEPTS.functions;
      return `### ${c.icon} ${c.title} (Explained Simply)

#### 💡 The Real-World Analogy:
> ${c.analogy}

${c.explanation}

#### 💻 Example Code:
\`\`\`javascript
${c.quickCode}
\`\`\`

> 💡 **3 Steps of Every Function:**
> 1. **Input (Parameters):** What does the function need to do its job?
> 2. **Body:** What actions does it perform?
> 3. **Output (Return):** What result does it give back to you?`;
    }

    if (/\b(oop|object oriented|classes|class|objects)\b/i.test(p)) {
      const c = TUTOR_CONCEPTS.oop;
      return `### ${c.icon} ${c.title} (Explained Simply)

#### 💡 The Real-World Analogy:
> ${c.analogy}

${c.explanation}

#### 💻 Example Code:
\`\`\`python
${c.quickCode}
\`\`\`

> 💡 **Core Pillars of OOP:**
> * **Encapsulation:** Grouping data and methods into one safe unit.
> * **Inheritance:** Creating a new class that inherits from an existing class (e.g. \`ElectricCar\` inherits from \`Car\`).
> * **Polymorphism:** Using the same method name for different objects (e.g. \`dog.speak()\` says Woof, \`cat.speak()\` says Meow).`;
    }

    if (/\b(debug|debugging|error|errors|fix bugs)\b/i.test(p)) {
      const c = TUTOR_CONCEPTS.debugging;
      return `### ${c.icon} ${c.title}

#### 💡 The Mindset:
> ${c.analogy}

${c.explanation}

#### 🕵️ 4 Steps to Solve Any Coding Error:
${c.tips.join('\n')}

> 🚀 **Stuck on an error right now?** Just paste the error message here and I will tell you what it means and how to fix it!`;
    }

    // Generic Coding Tutor Overview
    return `### 🎓 NasInfinity AI Coding Academy

Welcome to our **Zero-Friction Coding Tutor**! We break down programming into plain English with zero jargon.

---

#### 🌟 Pick a Language to Learn:
* 🐍 **Python** — *AI, Data Science, Web, Automation (Easiest to start)*
* ⚡ **JavaScript** — *Interactive Websites, Browsers & Node.js*
* 🔷 **TypeScript** — *Type-safe modern JavaScript*
* 🎨 **HTML & CSS** — *Building and designing web pages*
* ⚙️ **C & C++** — *Hardware, High Performance & 3D Game Engines*
* 🎯 **C#** — *Video Games with Unity & Windows Apps*
* ☕ **Java** — *Enterprise Backends, Android & Minecraft*
* 🦀 **Rust** — *Blazing fast, ultra-safe, memory protected*
* 🐹 **Go (Golang)** — *Google's cloud & server language*
* 🗄️ **SQL** — *Databases and data queries*
* 🕊️ **Swift** — *iPhone and iPad apps*
* 📱 **Kotlin** — *Modern Android apps*
* 🐘 **PHP** — *Web servers and WordPress*
* 💎 **Ruby** — *Clean, expressive web apps*
* 💻 **Bash** — *Automating terminal commands*

---

#### 📚 Or Learn Universal Concepts:
* **Variables & Data Types** — *How computers remember things*
* **Conditionals (\`if/else\`)** — *How computers make choices*
* **Loops (\`for/while\`)** — *How computers repeat tasks*
* **Functions** — *Reusable code recipes*
* **Object-Oriented Programming (OOP)** — *Blueprints & Objects*
* **Debugging** — *Solving errors like a detective*

> 💬 **How to start:** Just ask *"Teach me Python"*, *"How do loops work in C++"*, or *"Which language should I learn?"*!`;
  }

  // --- 6. Coding Tutor Studio Modal UI ---
  function renderCodingTutorModal() {
    let modal = document.getElementById('codingTutorModal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'codingTutorModal';
    modal.className = 'fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 hidden';
    modal.setAttribute('onclick', 'if(event.target===this) closeCodingTutorModal()');

    const langCards = Object.entries(TUTOR_LANGUAGES).map(([key, data]) => `
      <div onclick="selectTutorLanguage('${key}')" class="p-3 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 cursor-pointer transition flex flex-col gap-1.5 group active:scale-[0.98]">
        <div class="flex items-center justify-between">
          <span class="text-xl sm:text-2xl">${data.icon}</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 group-hover:text-amber-300 font-mono">${data.level.split(' ')[0]}</span>
        </div>
        <h4 class="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-amber-300 transition">${data.name}</h4>
        <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">${data.popularFor}</p>
      </div>
    `).join('');

    const conceptCards = Object.entries(TUTOR_CONCEPTS).map(([key, data]) => `
      <div onclick="selectTutorConcept('${key}')" class="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 cursor-pointer transition flex items-center gap-2.5 group active:scale-[0.98]">
        <span class="text-xl shrink-0">${data.icon}</span>
        <div class="min-w-0 flex-1">
          <h4 class="font-bold text-xs text-slate-200 group-hover:text-indigo-300 transition truncate">${data.title.split('(')[0]}</h4>
          <p class="text-[10px] text-slate-400 truncate">${data.analogy.slice(0, 55)}...</p>
        </div>
      </div>
    `).join('');

    modal.innerHTML = `
      <div class="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/60 shrink-0">
          <div class="flex items-center gap-2.5">
            <span class="text-xl sm:text-2xl">🎓</span>
            <div>
              <h3 class="font-bold text-xs sm:text-sm text-slate-100 flex items-center gap-2">
                NasInfinity Coding Academy
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">Simple & Intuitive</span>
              </h3>
              <p class="text-[11px] text-slate-400">Master all major programming languages with plain-English lessons & interactive examples</p>
            </div>
          </div>
          <button onclick="closeCodingTutorModal()" class="h-8 w-8 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 flex items-center justify-center text-sm font-bold transition">
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-200 text-xs sm:text-sm">
          
          <!-- Recommendation Banner -->
          <div class="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 class="font-bold text-xs sm:text-sm text-amber-300 flex items-center gap-1.5">
                <span>🧭</span> Not sure where to begin?
              </h4>
              <p class="text-[11px] text-slate-300 mt-0.5">Let NasInfinity AI recommend the ideal language for your dream project.</p>
            </div>
            <button onclick="askTutorWhichLanguage()" class="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition active:scale-95 shrink-0 flex items-center gap-1.5 shadow-sm shadow-amber-500/20">
              <span>Find My Language</span> <span>→</span>
            </button>
          </div>

          <!-- All Languages Grid -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>⚡</span> Choose a Programming Language
              </h4>
              <span class="text-[11px] text-slate-500">${Object.keys(TUTOR_LANGUAGES).length} Languages Supported</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
              ${langCards}
            </div>
          </div>

          <!-- Core Concepts Section -->
          <div>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
              <span>🧠</span> Universal Coding Concepts (Explain Like I'm 5)
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              ${conceptCards}
            </div>
          </div>

        </div>

        <!-- Modal Footer -->
        <div class="px-4 sm:px-6 py-3 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <span>💡 Click any card to launch an interactive lesson in chat</span>
          <button onclick="closeCodingTutorModal()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition">
            Close
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  // --- 7. Modal Control Functions ---
  window.openCodingTutorModal = function() {
    const modal = renderCodingTutorModal();
    modal.classList.remove('hidden');
  };

  window.closeCodingTutorModal = function() {
    const modal = document.getElementById('codingTutorModal');
    if (modal) modal.classList.add('hidden');
  };

  window.selectTutorLanguage = function(langKey) {
    const lang = TUTOR_LANGUAGES[langKey];
    if (!lang) return;
    window.closeCodingTutorModal();
    const ui = document.getElementById('userInput');
    if (ui) {
      ui.value = `Teach me ${lang.name} as simple as possible with examples and a beginner mini project`;
      if (typeof window.handleSendMessage === 'function') {
        window.handleSendMessage();
      } else if (typeof handleSendMessage === 'function') {
        handleSendMessage();
      }
    }
  };

  window.selectTutorConcept = function(conceptKey) {
    const c = TUTOR_CONCEPTS[conceptKey];
    if (!c) return;
    window.closeCodingTutorModal();
    const ui = document.getElementById('userInput');
    if (ui) {
      ui.value = `Explain ${c.title} simply with real-world analogies and code`;
      if (typeof window.handleSendMessage === 'function') {
        window.handleSendMessage();
      } else if (typeof handleSendMessage === 'function') {
        handleSendMessage();
      }
    }
  };

  window.askTutorWhichLanguage = function() {
    window.closeCodingTutorModal();
    const ui = document.getElementById('userInput');
    if (ui) {
      ui.value = `Which programming language should I learn first? Explain the options simply.`;
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
        window.closeCodingTutorModal();
      }
    });
  }

  // Exported APIs for NasInfinity AI
  window.TUTOR_LANGUAGES = TUTOR_LANGUAGES;
  window.TUTOR_CONCEPTS = TUTOR_CONCEPTS;
  window.isCodingEducationQuery = isCodingEducationQuery;
  window.getCodingLessonResponse = getCodingLessonResponse;
  window.getLanguageRecommendation = getLanguageRecommendation;

})(window);
