/**
 * System Design Masterclass - Topic Data
 * All content is original and structured for optimal learning flow.
 */

const topics = [
  {
    id: "foundations-1",
    title: "The System Design Mindset",
    category: "Foundations",
    difficulty: "Beginner",
    time: "20 min",
    tags: ["HLD", "Backend", "Mindset"],
    description: "Learn how to think like a systems architect and understand the core goals of system design.",
    content: `
      <h3>What is System Design?</h3>
      <p>System design is the process of defining the architecture, modules, interfaces, and data for a system to satisfy specified requirements. In an interview, it's not about finding the "perfect" solution, but about demonstrating your ability to navigate <strong>trade-offs</strong>.</p>
      
      <div class="bg-blue-50 dark:bg-blue-900/30 p-8 rounded-3xl border-l-8 border-blue-600 my-10 shadow-lg">
        <h4 class="text-blue-700 dark:text-blue-300 font-black text-xl mb-3">The Golden Rule</h4>
        <p class="italic text-lg">"There are no right answers in system design, only trade-offs." — Every Senior Architect ever.</p>
      </div>

      <h3>Why is System Design Hard?</h3>
      <p>Unlike coding problems (LeetCode) where there's usually an optimal solution, system design is open-ended. You must consider:</p>
      <ul class="space-y-4 my-8">
        <li><strong>Ambiguity:</strong> Requirements are often vague. You must ask clarifying questions.</li>
        <li><strong>Scale:</strong> What works for 1,000 users will fail for 1,000,000.</li>
        <li><strong>Cost:</strong> Infinite scalability is expensive. You must be cost-effective.</li>
        <li><strong>Complexity:</strong> More components mean more points of failure.</li>
      </ul>

      <h3>HLD vs LLD: The Big Picture</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div class="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-sm">
          <h4 class="font-black text-blue-600 dark:text-blue-400 text-xl mb-4">High-Level Design (HLD)</h4>
          <p>Focuses on the overall architecture, services, databases, and how they interact. It's about data flow, scalability, and availability.</p>
        </div>
        <div class="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-sm">
          <h4 class="font-black text-emerald-600 dark:text-emerald-400 text-xl mb-4">Low-Level Design (LLD)</h4>
          <p>Focuses on class diagrams, design patterns, and code-level logic. It's about maintainability, readability, and extensibility.</p>
        </div>
      </div>

      <h3>Core Goals of a System</h3>
      <ul>
        <li><strong>Scalability:</strong> Can the system handle 10x or 100x more traffic? (Vertical vs Horizontal).</li>
        <li><strong>Availability:</strong> Is the system up 99.99% of the time? (Redundancy, Failover).</li>
        <li><strong>Reliability:</strong> Does the system perform correctly under stress? (Fault tolerance).</li>
        <li><strong>Maintainability:</strong> Can other engineers easily update the system? (Clean code, Documentation).</li>
      </ul>

      <h3>Common Pitfalls in Interviews</h3>
      <ul class="space-y-4 my-8">
        <li><strong>Over-engineering:</strong> Don't suggest Kafka for a simple blog site.</li>
        <li><strong>Ignoring Scale:</strong> Don't assume a single SQL server can handle billions of rows without sharding.</li>
        <li><strong>Silent Assumptions:</strong> Always state your assumptions (e.g., "I'm assuming we have a 10:1 read-to-write ratio").</li>
      </ul>

      <h3>Real Interview Question</h3>
      <div class="bg-slate-900 dark:bg-black p-8 rounded-[2rem] my-10 border-2 border-blue-500/30 shadow-2xl">
        <p class="font-mono text-xl text-blue-400 leading-relaxed">
          "How would you design a system that needs to handle 1 million concurrent users while maintaining sub-100ms latency?"
        </p>
      </div>
      <p class="mt-8 text-lg">To answer this, you'd need to discuss Load Balancing, Caching, Database Sharding, and potentially Asynchronous processing—all of which we'll cover in this course.</p>
    `,
    quiz: [
      { q: "What is the primary goal of HLD?", a: "Defining the overall architecture and service interactions." },
      { q: "Why are trade-offs important?", a: "Because no system can be perfect in all dimensions (Speed, Cost, Reliability). Improving one often degrades another." },
      { q: "What does '99.99% availability' mean in terms of downtime?", a: "Approximately 52.56 minutes of downtime per year." }
    ],
    interviewQuestions: [
      "How would you design a system that needs to handle 1 million concurrent users while maintaining sub-100ms latency?",
      "What are the most important trade-offs you've made in your previous system design projects?",
      "Explain the difference between vertical and horizontal scaling with real-world examples."
    ]
  },
  {
    id: "foundations-2",
    title: "CAP Theorem & PACELC",
    category: "Foundations",
    difficulty: "Intermediate",
    time: "25 min",
    tags: ["Distributed Systems", "Database", "Theory"],
    description: "The fundamental theorem of distributed systems that every architect must know.",
    content: `
      <h3>The CAP Theorem</h3>
      <p>In a distributed system, you can only provide two of the following three guarantees:</p>
      <div class="space-y-6 my-10">
        <div class="flex gap-6 items-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border-2 border-blue-100 dark:border-blue-900/30">
          <div class="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-blue-500/30 shrink-0">C</div>
          <div><strong class="text-xl block mb-1">Consistency</strong>Every read receives the most recent write or an error. (Strong Consistency).</div>
        </div>
        <div class="flex gap-6 items-center p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border-2 border-emerald-100 dark:border-emerald-900/30">
          <div class="bg-emerald-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-emerald-500/30 shrink-0">A</div>
          <div><strong class="text-xl block mb-1">Availability</strong>Every request receives a (non-error) response, without the guarantee that it contains the most recent write.</div>
        </div>
        <div class="flex gap-6 items-center p-6 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border-2 border-amber-100 dark:border-amber-900/30">
          <div class="bg-amber-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-amber-500/30 shrink-0">P</div>
          <div><strong class="text-xl block mb-1">Partition Tolerance</strong>The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network.</div>
        </div>
      </div>

      <div class="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border-l-4 border-amber-500 my-6">
        <h4 class="text-amber-600 dark:text-amber-400 font-bold mb-2">The Reality</h4>
        <p class="text-xl">In the real world, network partitions <strong>will</strong> happen. Therefore, you must choose between <strong>Consistency (CP)</strong> or <strong>Availability (AP)</strong> when a partition occurs. A "CA" system is only possible in a single-node setup, which isn't distributed.</p>
      </div>

      <h3>PACELC: The Extension</h3>
      <p>PACELC extends CAP by describing system behavior when there is <strong>no partition</strong>:</p>
      <p class="font-bold text-center my-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        If (P)artition, choose between (A)vailability and (C)onsistency; (E)lse, choose between (L)atency and (C)onsistency.
      </p>
      
      <h3>Real-world Examples</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <h5 class="font-bold mb-1">DynamoDB / Cassandra</h5>
          <p class="text-lg">PA/EL: Favors availability during partitions and latency during normal operations.</p>
        </div>
        <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <h5 class="font-bold mb-1">HBase / MongoDB</h5>
          <p class="text-lg">PC/EC: Favors consistency during partitions and consistency during normal operations.</p>
        </div>
      </div>

      <h3>Interview Deep Dive</h3>
      <p>When asked about SQL vs NoSQL, use CAP to justify your choice. For example, "I'd choose Cassandra (AP) for a social media feed because availability is more important than immediate consistency, whereas I'd choose PostgreSQL (CP) for a banking system where consistency is non-negotiable."</p>
      
      <h3>Trade-off Analysis</h3>
      <p>Choosing <strong>Consistency</strong> means your system might return errors if it can't guarantee the latest data. Choosing <strong>Availability</strong> means your system might return stale data, but it will always return something.</p>
    `,
    quiz: [
      { q: "Can a distributed system be CA?", a: "No, because network partitions are inevitable in distributed systems. You must handle P." },
      { q: "What does PACELC stand for?", a: "Partition, Availability, Consistency, Else, Latency, Consistency." }
    ],
    interviewQuestions: [
      "Explain CAP Theorem in the context of a banking system vs. a social media feed.",
      "What is PACELC and why is it a more complete model than CAP?",
      "How does Amazon's Dynamo handle the trade-off between consistency and availability?"
    ]
  },
  {
    id: "ood-1",
    title: "Object-Oriented Design Core",
    category: "LLD",
    difficulty: "Beginner",
    time: "20 min",
    tags: ["LLD", "OOP", "Basics"],
    description: "Master the building blocks of software: Classes, Objects, and the 4 Pillars of OOP.",
    content: `
      <h3>The 4 Pillars of OOP</h3>
      <div class="space-y-6 my-8">
        <div class="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition-all">
          <h4 class="font-bold text-xl mb-2 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-600"></span>
            Encapsulation
          </h4>
          <p class="text-lg text-slate-800 dark:text-slate-200">Bundling data and methods into a single unit (class) and restricting direct access to some components. Think of it as a "protective shield". Use <strong>private</strong> and <strong>protected</strong> access modifiers to control visibility.</p>
        </div>
        <div class="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition-all">
          <h4 class="font-bold text-xl mb-2 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
            Abstraction
          </h4>
          <p class="text-lg text-slate-800 dark:text-slate-200">Hiding complex implementation details and showing only necessary features. Use interfaces or abstract classes to define "what" an object does, not "how". This reduces <strong>coupling</strong> between components.</p>
        </div>
        <div class="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition-all">
          <h4 class="font-bold text-xl mb-2 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-purple-600"></span>
            Inheritance
          </h4>
          <p class="text-lg text-slate-800 dark:text-slate-200">Mechanism where one class acquires properties of another. Promotes code reuse but can lead to tight coupling. <strong>Favor Composition over Inheritance.</strong> Inheritance is for "is-a" relationships.</p>
        </div>
        <div class="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition-all">
          <h4 class="font-bold text-xl mb-2 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-rose-600"></span>
            Polymorphism
          </h4>
          <p class="text-lg text-slate-800 dark:text-slate-200">Ability of an object to take many forms. <strong>Method Overloading</strong> (Compile-time) and <strong>Method Overriding</strong> (Runtime). This allows for <strong>dynamic dispatch</strong> and flexible code.</p>
        </div>
      </div>

      <h3>Composition vs Inheritance</h3>
      <p>Inheritance is an <strong>"is-a"</strong> relationship (A Dog is an Animal). Composition is a <strong>"has-a"</strong> relationship (A Car has an Engine). Composition is generally more flexible because you can change behavior at runtime by swapping components. In modern design, we prefer composition to avoid deep inheritance hierarchies that are hard to maintain.</p>
      
      <h3>Case Study: Design a Library Management System</h3>
      <p>In an LLD interview, you might be asked to design a library system. Key entities:</p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>Book:</strong> Title, Author, ISBN, Status.</li>
        <li><strong>User:</strong> Name, ID, List of borrowed books.</li>
        <li><strong>Library:</strong> List of books, List of users, Search functionality.</li>
      </ul>
      <p>Use <strong>Abstraction</strong> for different types of users (Student, Librarian) and <strong>Encapsulation</strong> to protect book status from direct modification.</p>
    `,
    quiz: [
      { q: "Which pillar is about hiding complexity?", a: "Abstraction." },
      { q: "Why is composition often better than inheritance?", a: "It reduces tight coupling and allows for more flexible, interchangeable designs." }
    ],
    interviewQuestions: [
      "Design an elevator control system using OOP principles.",
      "How would you apply the Open-Closed Principle when designing a payment processing gateway?",
      "Explain the difference between composition and inheritance with a design example."
    ]
  },
  {
    id: "principles-1",
    title: "SOLID Principles",
    category: "Design Principles",
    difficulty: "Intermediate",
    time: "35 min",
    tags: ["LLD", "Best Practices", "Product Interview"],
    description: "The gold standard for writing maintainable and scalable object-oriented code.",
    content: `
      <h3>S.O.L.I.D: The Architect's Handbook</h3>
      
      <div class="space-y-8 my-10">
        <section>
          <h4 class="font-black text-2xl mb-2">S: Single Responsibility</h4>
          <p class="text-slate-800 dark:text-slate-200">A class should have one, and only one, reason to change. If a class handles both "User Data" and "Email Sending", it's violating SRP. Split them! This makes code easier to test and maintain.</p>
        </section>

        <section>
          <h4 class="font-black text-2xl mb-2">O: Open/Closed</h4>
          <p class="text-slate-800 dark:text-slate-200">Software entities should be <strong>open for extension</strong> but <strong>closed for modification</strong>. Use interfaces to add new features without changing existing code. This prevents regression bugs in stable code.</p>
        </section>

        <section>
          <h4 class="font-black text-2xl mb-2">L: Liskov Substitution</h4>
          <p class="text-slate-800 dark:text-slate-200">Objects of a superclass should be replaceable with objects of its subclasses without breaking the application. If a Square inherits from Rectangle but breaks the "setHeight" logic, it violates LSP. Subclasses must adhere to the contract of the parent.</p>
        </section>

        <section>
          <h4 class="font-black text-2xl mb-2">I: Interface Segregation</h4>
          <p class="text-slate-800 dark:text-slate-200">Don't force clients to depend on methods they do not use. Large interfaces should be split into smaller, more specific ones. This prevents "fat" interfaces that are hard to implement.</p>
        </section>

        <section>
          <h4 class="font-black text-2xl mb-2">D: Dependency Inversion</h4>
          <p class="text-slate-800 dark:text-slate-200">Depend on abstractions, not concretions. High-level modules should not depend on low-level modules; both should depend on interfaces. This allows you to swap out low-level details (like a database) without changing high-level logic.</p>
        </section>
      </div>

      <h3>SOLID in Action: A Payment Gateway Example</h3>
      <p>Imagine a <code>PaymentProcessor</code> class. To follow <strong>Open/Closed</strong>, we define a <code>PaymentMethod</code> interface. Now, we can add <code>StripePayment</code>, <code>PayPalPayment</code>, and <code>CryptoPayment</code> without touching the <code>PaymentProcessor</code> code.</p>

      <div class="bg-slate-900 text-white p-8 rounded-[2rem] my-8">
        <h4 class="text-blue-400 font-bold mb-4">Interview Tip</h4>
        <p class="text-xl leading-relaxed">When designing a system in an LLD interview, explicitly mention which SOLID principle you are applying. For example: "I'm using the Strategy Pattern here to adhere to the Open/Closed principle, allowing us to add new payment methods without modifying the core processor."</p>
      </div>
      
      <h3>Why SOLID is Hard to Follow</h3>
      <p>SOLID often requires more boilerplate code and more files. In small projects, it might feel like over-engineering. However, in large, long-lived systems, the cost of NOT following SOLID is much higher due to technical debt and fragility.</p>
    `,
    quiz: [
      { q: "What does SRP stand for?", a: "Single Responsibility Principle." },
      { q: "Which principle is violated if a subclass cannot replace its parent?", a: "Liskov Substitution Principle." }
    ],
    interviewQuestions: [
      "Explain Liskov Substitution Principle with a code example.",
      "How do SOLID principles help in making a system more testable?",
      "Can you give an example of where you've seen SOLID principles violated in a codebase?"
    ]
  },
  {
    id: "hld-1",
    title: "Scalability & Load Balancing",
    category: "HLD",
    difficulty: "Intermediate",
    time: "30 min",
    tags: ["HLD", "Scalability", "Backend"],
    description: "Vertical vs Horizontal scaling, and how to handle millions of users using Load Balancers.",
    content: `
      <h3>Scaling: Up vs Out</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        <div class="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h4 class="font-bold text-blue-600 mb-4">Vertical Scaling (Up)</h4>
          <ul class="text-lg space-y-2 text-slate-800 dark:text-slate-200">
            <li>+ Simple to implement</li>
            <li>+ No code changes needed</li>
            <li>- Hard hardware limit</li>
            <li>- Single point of failure (SPOF)</li>
          </ul>
        </div>
        <div class="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h4 class="font-bold text-emerald-600 mb-4">Horizontal Scaling (Out)</h4>
          <ul class="text-lg space-y-2 text-slate-800 dark:text-slate-200">
            <li>+ Virtually infinite scale</li>
            <li>+ High availability (redundancy)</li>
            <li>- Complex to manage (Data sharding)</li>
            <li>- Requires Load Balancers</li>
          </ul>
        </div>
      </div>

      <h3>Load Balancing Algorithms</h3>
      <p>A Load Balancer (LB) sits in front of your servers and distributes incoming traffic. Common algorithms include:</p>
      <ul class="space-y-4 my-6">
        <li><strong>Round Robin:</strong> Requests are distributed sequentially. Simple but doesn't account for server load.</li>
        <li><strong>Least Connections:</strong> Sends requests to the server with the fewest active connections. Great for long-lived requests.</li>
        <li><strong>IP Hash:</strong> Uses the client's IP to determine which server gets the request. Useful for session persistence.</li>
        <li><strong>Consistent Hashing:</strong> Minimizes reorganization when nodes are added or removed. Crucial for distributed caches.</li>
      </ul>

      <h3>Layer 4 vs Layer 7 LB</h3>
      <ul>
        <li><strong>Layer 4 (Transport):</strong> Fast, based on IP and Port. Doesn't look at the message content. Good for simple TCP/UDP traffic.</li>
        <li><strong>Layer 7 (Application):</strong> Smarter, can route based on URL, Cookies, or Headers. Allows for "Sticky Sessions" and path-based routing.</li>
      </ul>

      <h3>Global Server Load Balancing (GSLB)</h3>
      <p>For systems serving users worldwide, GSLB uses DNS to route users to the nearest data center. This reduces latency and provides disaster recovery across regions.</p>
      
      <div class="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-2xl border-l-4 border-rose-600 my-6">
        <h4 class="text-rose-600 dark:text-rose-400 font-bold mb-2">The SPOF Problem</h4>
        <p class="text-xl">If your Load Balancer goes down, your whole system is offline. Solution: Use <strong>Active-Passive</strong> or <strong>Active-Active</strong> LB pairs with a floating IP (VIP).</p>
      </div>
    `,
    quiz: [
      { q: "Which scaling method is more resilient to hardware failure?", a: "Horizontal Scaling." },
      { q: "What is the main advantage of Layer 7 Load Balancing?", a: "It can make routing decisions based on the content of the request (e.g., URL paths)." }
    ],
    interviewQuestions: [
      "How would you handle a sudden spike in traffic for a flash sale website?",
      "Explain different load balancing algorithms (Round Robin, Least Connections, IP Hash).",
      "What is a 'Single Point of Failure' and how do you eliminate it in a load balancer setup?"
    ]
  },
  {
    id: "db-1",
    title: "SQL vs NoSQL: The Deep Dive",
    category: "Storage",
    difficulty: "Intermediate",
    time: "40 min",
    tags: ["HLD", "Database", "Tradeoffs"],
    description: "Choosing the right storage engine for your specific use case. ACID vs BASE.",
    content: `
      <h3>Relational (SQL) - The Structured Choice</h3>
      <p>SQL databases use a predefined schema and are best for structured data with complex relationships. They follow <strong>ACID</strong> properties:</p>
      <ul class="text-lg text-slate-800 dark:text-slate-200 my-4">
        <li><strong>Atomicity:</strong> All or nothing transactions.</li>
        <li><strong>Consistency:</strong> Data follows all rules/constraints.</li>
        <li><strong>Isolation:</strong> Transactions don't interfere.</li>
        <li><strong>Durability:</strong> Committed data is permanent.</li>
      </ul>
      <p><strong>Use Case:</strong> Financial systems, ERPs, where data integrity is paramount.</p>

      <h3>Non-Relational (NoSQL) - The Flexible Choice</h3>
      <p>NoSQL databases are schema-less and scale horizontally easily. They follow <strong>BASE</strong> properties:</p>
      <ul class="text-lg text-slate-800 dark:text-slate-200 my-4">
        <li><strong>Basically Available:</strong> System guarantees availability.</li>
        <li><strong>Soft State:</strong> State may change without input (eventual consistency).</li>
        <li><strong>Eventual Consistency:</strong> Data will become consistent over time.</li>
      </ul>

      <h3>Types of NoSQL</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <h5 class="font-bold mb-1">Key-Value</h5>
          <p class="text-lg text-slate-900 dark:text-slate-100">Redis, DynamoDB. Fast, simple lookups. Best for caching and sessions.</p>
        </div>
        <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <h5 class="font-bold mb-1">Document</h5>
          <p class="text-lg text-slate-900 dark:text-slate-100">MongoDB, CouchDB. Stores JSON-like data. Great for content management.</p>
        </div>
        <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <h5 class="font-bold mb-1">Columnar</h5>
          <p class="text-lg text-slate-900 dark:text-slate-100">Cassandra, HBase. Great for big data analytics and time-series data.</p>
        </div>
        <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <h5 class="font-bold mb-1">Graph</h5>
          <p class="text-lg text-slate-900 dark:text-slate-100">Neo4j. Best for social networks, recommendation engines, or fraud detection.</p>
        </div>
      </div>

      <h3>Replication Strategies</h3>
      <ul class="space-y-2 my-4">
        <li><strong>Master-Slave:</strong> Master handles writes, Slaves handle reads. Good for read-heavy systems.</li>
        <li><strong>Multi-Master:</strong> Multiple nodes handle both reads and writes. High availability but complex conflict resolution.</li>
      </ul>

      <h3>Sharding vs Partitioning</h3>
      <p><strong>Partitioning</strong> is splitting a table into smaller pieces on the same server. <strong>Sharding</strong> is distributing those pieces across multiple servers. Sharding is the key to scaling databases to petabytes of data, but it introduces complexity in cross-shard joins.</p>
    `,
    quiz: [
      { q: "What does ACID stand for?", a: "Atomicity, Consistency, Isolation, Durability." },
      { q: "Which NoSQL type is best for a social network's 'Friends of Friends' query?", a: "Graph Database (e.g., Neo4j)." }
    ],
    interviewQuestions: [
      "Compare SQL and NoSQL for a social media application like Instagram.",
      "What are the challenges of database sharding and how do you handle them?",
      "Explain ACID properties in the context of a distributed database."
    ]
  },
  {
    id: "cache-1",
    title: "Caching & Content Delivery",
    category: "Performance",
    difficulty: "Intermediate",
    time: "30 min",
    tags: ["HLD", "Caching", "Latency"],
    description: "How to use caching to reduce latency and database load. CDN, Redis, and Invalidation.",
    content: `
      <h3>The Caching Hierarchy</h3>
      <p>Caching can happen at multiple levels:</p>
      <ol>
        <li><strong>Client-side:</strong> Browser cache. Use <code>Cache-Control</code> headers.</li>
        <li><strong>CDN:</strong> Edge servers close to the user (Static assets). Reduces origin server load.</li>
        <li><strong>Load Balancer:</strong> Caching common responses at the entry point.</li>
        <li><strong>Application:</strong> In-memory cache (Redis, Memcached). Fast, but volatile.</li>
        <li><strong>Database:</strong> Internal buffer pools and query caches.</li>
      </ol>

      <h3>Cache Invalidation: The Hardest Problem</h3>
      <p>Keeping the cache in sync with the database is tricky. Common strategies:</p>
      <ul class="space-y-4 my-6">
        <li><strong>Write-through:</strong> Data is written to cache and DB at the same time. High consistency, higher latency.</li>
        <li><strong>Write-around:</strong> Data written to DB only. Cache is updated only on a miss. Reduces "cache pollution".</li>
        <li><strong>Write-back:</strong> Data written to cache only. DB is updated asynchronously. Fast, but risk of data loss on crash.</li>
      </ul>

      <h3>Cache Eviction Policies</h3>
      <ul>
        <li><strong>LRU (Least Recently Used):</strong> Discards the least recently used items first. Most common.</li>
        <li><strong>LFU (Least Frequently Used):</strong> Discards items used the least often. Great for "hot" items.</li>
        <li><strong>FIFO:</strong> First in, first out. Simple but often inefficient.</li>
      </ul>

      <div class="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-2xl border-l-4 border-rose-600 my-6">
        <h4 class="text-rose-600 dark:text-rose-400 font-bold mb-2">The Thundering Herd Problem</h4>
        <p class="text-xl">When a popular cache key expires, multiple requests hit the DB simultaneously, potentially crashing it. Solution: Use <strong>locking</strong> or <strong>probabilistic early recomputation</strong> (PER).</p>
      </div>

      <h3>Distributed Caching: Consistent Hashing</h3>
      <p>In a distributed cache, we need to know which node stores which key. <strong>Consistent Hashing</strong> ensures that when a node is added or removed, only a small fraction of keys need to be re-mapped, preventing a massive cache miss storm.</p>
    `,
    quiz: [
      { q: "What is a CDN?", a: "Content Delivery Network - a distributed network of servers that deliver content based on user location." },
      { q: "Which invalidation strategy is fastest for writes?", a: "Write-back." }
    ],
    interviewQuestions: [
      "How do you handle cache invalidation in a high-traffic system?",
      "Explain the 'Thundering Herd' problem and how to prevent it.",
      "When would you use a Write-Through cache vs. a Write-Back cache?"
    ]
  },
  {
    id: "case-1",
    title: "Design a URL Shortener (Bitly)",
    category: "Case Studies",
    difficulty: "Intermediate",
    time: "50 min",
    tags: ["HLD", "Interview", "Product Interview"],
    description: "A classic interview problem: Design a system like Bitly or TinyURL.",
    content: `
      <h3>1. Requirements & Goals</h3>
      <ul>
        <li><strong>Functional:</strong> Shorten URL, Redirect (301 vs 302), Custom aliases.</li>
        <li><strong>Non-Functional:</strong> High Availability, Low Latency, Non-guessable IDs.</li>
      </ul>

      <h3>2. Capacity Estimation (Back-of-the-envelope)</h3>
      <p>Assume 100M new URLs/month. Read:Write ratio = 100:1.</p>
      <ul>
        <li><strong>Storage:</strong> 100M * 12 months * 10 years * 500 bytes per URL ≈ 6 TB.</li>
        <li><strong>QPS:</strong> 100M / (30 * 24 * 3600) ≈ 40 writes/sec. Reads ≈ 4,000/sec.</li>
      </ul>

      <h3>3. The Core Logic: Encoding</h3>
      <p>We need a unique ID for each URL. We can use <strong>Base62 encoding</strong> ([a-z, A-Z, 0-9]).</p>
      <p>A 7-character string gives 62^7 ≈ 3.5 Trillion combinations. More than enough!</p>

      <h3>4. High-Level Architecture</h3>
      <div class="my-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
        <p class="font-mono text-lg leading-relaxed">
          Client -> Load Balancer -> App Servers -> Cache (Redis) -> Database (NoSQL/SQL)
        </p>
      </div>

      <h3>5. Deep Dive: Redirection</h3>
      <ul>
        <li><strong>301 (Permanent):</strong> Browser caches the redirect. Reduces server load but harder to track analytics.</li>
        <li><strong>302 (Temporary):</strong> Browser hits our server every time. Better for analytics.</li>
      </ul>

      <h3>6. Database Choice: SQL vs NoSQL</h3>
      <p>A <strong>NoSQL</strong> database like Cassandra or DynamoDB is ideal due to its horizontal scalability and simple key-value lookups. However, if we need ACID transactions for custom aliases, SQL might be easier to manage initially.</p>

      <h3>7. Handling Custom Aliases</h3>
      <p>If a user wants a custom alias (e.g., <code>bit.ly/my-cool-link</code>), we must check if it's already taken. This requires a unique constraint in the database. To handle this at scale, we can use a <strong>Bloom Filter</strong> to quickly check for existence before hitting the DB.</p>

      <h3>Real Interview Question</h3>
      <p class="italic">"How would you handle a sudden viral link that gets 1 million hits in 1 minute?"</p>
      <p>Answer: Use a distributed cache (Redis) and potentially a CDN for the redirection service if the content is static.</p>
    `,
    quiz: [
      { q: "Why use Base62 instead of Base64?", a: "Base62 avoids characters like '+' and '/' which can be problematic in URLs." },
      { q: "Which HTTP status code is better for analytics?", a: "302 (Temporary Redirect)." }
    ],
    interviewQuestions: [
      "How would you design a URL shortener that handles 10 billion URLs?",
      "What happens if two users try to shorten the same URL at the same time?",
      "How do you prevent malicious users from spamming the URL shortening service?"
    ]
  },
  {
    id: "case-2",
    title: "Design a Rate Limiter",
    category: "Case Studies",
    difficulty: "Advanced",
    time: "45 min",
    tags: ["HLD", "Security", "Big Tech"],
    description: "Protect your APIs from abuse and cascading failures. Token Bucket vs Leaky Bucket.",
    content: `
      <h3>Why Rate Limiting?</h3>
      <ul>
        <li>Prevent DoS attacks.</li>
        <li>Reduce costs (e.g., third-party API limits).</li>
        <li>Prevent resource starvation.</li>
      </ul>

      <h3>Algorithms Comparison</h3>
      <div class="overflow-x-auto my-6">
        <table class="w-full text-lg text-left border-collapse">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800">
              <th class="p-3 border dark:border-slate-700">Algorithm</th>
              <th class="p-3 border dark:border-slate-700">Pros</th>
              <th class="p-3 border dark:border-slate-700">Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-3 border dark:border-slate-700 font-bold">Token Bucket</td>
              <td class="p-3 border dark:border-slate-700">Handles bursts, memory efficient.</td>
              <td class="p-3 border dark:border-slate-700">Hard to tune parameters.</td>
            </tr>
            <tr>
              <td class="p-3 border dark:border-slate-700 font-bold">Leaky Bucket</td>
              <td class="p-3 border dark:border-slate-700">Smooths traffic, stable rate.</td>
              <td class="p-3 border dark:border-slate-700">Discards bursts.</td>
            </tr>
            <tr>
              <td class="p-3 border dark:border-slate-700 font-bold">Sliding Window</td>
              <td class="p-3 border dark:border-slate-700">Very accurate.</td>
              <td class="p-3 border dark:border-slate-700">Memory intensive.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Distributed Rate Limiting</h3>
      <p>In a distributed system, you need a centralized store like <strong>Redis</strong> to keep track of counts across multiple app servers. Use <code>INCR</code> and <code>EXPIRE</code> commands.</p>

      <h3>Interview Deep Dive</h3>
      <p>Ask the interviewer: "Should we rate limit by IP, User ID, or API Key?" Each has trade-offs (e.g., multiple users behind one NAT IP).</p>
    `,
    quiz: [
      { q: "Which algorithm is used by AWS API Gateway?", a: "Token Bucket." },
      { q: "Where should the rate limiter sit?", a: "Ideally at the API Gateway or a dedicated middleware layer." }
    ],
    interviewQuestions: [
      "How would you design a rate limiter for a distributed system?",
      "What are the pros and cons of Token Bucket vs. Leaky Bucket?",
      "How do you handle the 'Race Condition' problem in distributed rate limiting?"
    ]
  },
  {
    id: "case-3",
    title: "Design a News Feed (Facebook/Twitter)",
    category: "Case Studies",
    difficulty: "Advanced",
    time: "60 min",
    tags: ["HLD", "Social Media", "Big Tech"],
    description: "Design a system that scales to billions of users. Fan-out, Push vs Pull.",
    content: `
      <h3>1. Requirements</h3>
      <ul>
        <li>Post a status update.</li>
        <li>See a feed of posts from friends/followed users.</li>
        <li>Like/Comment on posts.</li>
        <li>Feed should be sorted by time or relevance.</li>
      </ul>

      <h3>2. The Fan-out Problem</h3>
      <p>When a user posts, how do their followers see it? Two main models:</p>
      <ul class="space-y-4 my-6">
        <li><strong>Push Model (Fan-out on Write):</strong> When a user posts, we push the post to all followers' pre-computed feeds. 
          <br><span class="text-lg text-slate-900 dark:text-slate-100">+ Fast reads. - Slow writes for "Celebrities" (millions of followers).</span>
        </li>
        <li><strong>Pull Model (Fan-out on Load):</strong> When a user opens their feed, we fetch posts from all friends and merge them.
          <br><span class="text-lg text-slate-900 dark:text-slate-100">+ Fast writes. - Slow reads (heavy computation on every load).</span>
        </li>
      </ul>

      <h3>3. The Hybrid Approach</h3>
      <p>Most big tech companies use a hybrid model. Use <strong>Push</strong> for regular users and <strong>Pull</strong> for celebrities to avoid the "Celebrity Problem".</p>

      <h3>4. Storage & Caching</h3>
      <ul>
        <li><strong>Posts:</strong> NoSQL (Document) or SQL with Sharding.</li>
        <li><strong>Friendships:</strong> Graph Database (Neo4j) or SQL with adjacency lists.</li>
        <li><strong>Feed Cache:</strong> Redis (List or Sorted Set) to store the latest ~1000 posts for each user.</li>
      </ul>
    `,
    quiz: [
      { q: "What is 'Fan-out'?", a: "The process of delivering a message to multiple destinations (followers)." },
      { q: "How does Twitter handle celebrities?", a: "They use a Pull model for celebrities to avoid massive write amplification." }
    ],
    interviewQuestions: [
      "How would you design a news feed for a system with 1 billion users?",
      "Explain the 'Celebrity Problem' in news feed design and how to solve it.",
      "How do you handle feed ranking and relevance in real-time?"
    ]
  },
  {
    id: "async-1",
    title: "Message Queues & Async Processing",
    category: "Async Systems",
    difficulty: "Advanced",
    time: "35 min",
    tags: ["HLD", "Messaging", "Scalability"],
    description: "Decoupling services using Pub/Sub and Message Brokers.",
    content: `
      <h3>Why Async?</h3>
      <p>Don't make the user wait for heavy tasks (e.g., sending emails, processing videos). Push the task to a queue and return a 'Success' response immediately.</p>
      
      <h3>Message Broker vs Pub/Sub</h3>
      <ul>
        <li><strong>Message Queue:</strong> Point-to-point. One message is consumed by exactly one consumer. (e.g., RabbitMQ, SQS).</li>
        <li><strong>Pub/Sub:</strong> One message can be consumed by multiple subscribers. (e.g., Kafka, Google Pub/Sub).</li>
      </ul>

      <h3>Apache Kafka: The Big Tech Favorite</h3>
      <p>Kafka is a distributed streaming platform. It's used for log aggregation, real-time analytics, and as a source of truth in event-driven architectures.</p>
      
      <h3>Interview Use Case</h3>
      <p>Designing a system like <strong>Uber</strong> where multiple services (Driver Matching, Billing, Analytics) need to react to a "Ride Completed" event.</p>
    `,
    quiz: [
      { q: "What is the main benefit of decoupling services?", a: "Services can scale and fail independently without affecting the entire system." },
      { q: "When should you NOT use async processing?", a: "When the user needs an immediate result to proceed (e.g., checking if a username is available)." }
    ],
    interviewQuestions: [
      "How would you design a distributed message queue from scratch?",
      "Explain the difference between RabbitMQ and Kafka.",
      "How do you handle message delivery guarantees (At-most-once, At-least-once, Exactly-once)?"
    ]
  },
  {
    id: "hld-2",
    title: "Consistent Hashing",
    category: "HLD",
    difficulty: "Advanced",
    time: "25 min",
    tags: ["HLD", "Distributed Systems", "Caching"],
    description: "The secret sauce behind distributed caches like Memcached and DynamoDB.",
    content: `
      <h3>The Problem with Simple Hashing</h3>
      <p>If you have <code>n</code> servers and use <code>hash(key) % n</code>, adding or removing a server causes almost all keys to be remapped. This causes a <strong>cache miss storm</strong>.</p>
      
      <h3>The Solution: Consistent Hashing</h3>
      <p>Imagine a hash ring (0 to 2^32-1). Both servers and keys are hashed onto this ring. A key is assigned to the first server it encounters moving clockwise.</p>
      
      <h3>Virtual Nodes</h3>
      <p>To ensure even distribution (since servers might not be perfectly spaced), we use <strong>virtual nodes</strong>. Each physical server is mapped to multiple points on the ring.</p>
      
      <h3>Real-World Use</h3>
      <p>Amazon's <strong>Dynamo</strong> and Apache <strong>Cassandra</strong> use consistent hashing for data partitioning.</p>
    `,
    quiz: [
      { q: "What happens when a server is added in consistent hashing?", a: "Only a small fraction of keys (1/n) need to be moved." },
      { q: "Why are virtual nodes used?", a: "To prevent 'hot spots' and ensure data is distributed more uniformly across servers." }
    ],
    interviewQuestions: [
      "Why is consistent hashing preferred over simple modulo hashing in distributed caches?",
      "How do you implement virtual nodes in consistent hashing?",
      "What are the trade-offs of using a large number of virtual nodes?"
    ]
  },
  {
    id: "case-4",
    title: "Design a Chat System (WhatsApp/Slack)",
    category: "Case Studies",
    difficulty: "Advanced",
    time: "55 min",
    tags: ["HLD", "Real-time", "WebSockets"],
    description: "How to handle millions of persistent connections and real-time message delivery.",
    content: `
      <h3>1. Requirements</h3>
      <ul>
        <li>1-on-1 and Group chats.</li>
        <li>Online/Offline status (Presence).</li>
        <li>Message delivery receipts (Sent, Delivered, Read).</li>
        <li>Support for media (images, videos).</li>
      </ul>

      <h3>2. Communication Protocol</h3>
      <ul>
        <li><strong>HTTP Long Polling:</strong> Old school, inefficient.</li>
        <li><strong>WebSockets:</strong> Best for real-time. Bi-directional, persistent connection.</li>
        <li><strong>SSE (Server-Sent Events):</strong> Good for one-way updates (e.g., status changes).</li>
      </ul>

      <h3>3. High-Level Architecture</h3>
      <p>You need a <strong>Chat Service</strong> to handle message metadata and a <strong>Presence Service</strong> to track user status. Messages should be stored in a NoSQL database like <strong>Cassandra</strong> for high write throughput.</p>

      <h3>4. The Presence Problem</h3>
      <p>How do you know if a user is online? Use a <strong>Heartbeat</strong> mechanism. The client sends a small packet every 5-10 seconds. If the server doesn't receive it, the user is marked offline.</p>
    `,
    quiz: [
      { q: "Why use WebSockets instead of HTTP?", a: "WebSockets provide low-latency, bi-directional communication without the overhead of repeated HTTP headers." },
      { q: "Which database is ideal for storing chat history?", a: "Wide-column stores like Cassandra or HBase due to their high write scalability." }
    ],
    interviewQuestions: [
      "How would you design a chat system like WhatsApp to handle 100 million concurrent users?",
      "Explain the difference between WebSockets and HTTP Long Polling.",
      "How do you handle message synchronization across multiple devices for the same user?"
    ]
  },
  {
    id: "case-5",
    title: "Design a Web Crawler (Googlebot)",
    category: "Case Studies",
    difficulty: "Advanced",
    time: "50 min",
    tags: ["HLD", "Big Data", "Search"],
    description: "How to crawl the entire internet while respecting robots.txt and avoiding traps.",
    content: `
      <h3>1. Components</h3>
      <ul>
        <li><strong>URL Frontier:</strong> Stores URLs to be crawled. Prioritizes based on "freshness" and "importance".</li>
        <li><strong>HTML Downloader:</strong> Fetches pages from the web.</li>
        <li><strong>Content Parser:</strong> Extracts links and text.</li>
        <li><strong>Duplicate Eliminator:</strong> Uses <strong>Bloom Filters</strong> or <strong>SimHash</strong> to avoid crawling the same content twice.</li>
      </ul>

      <h3>2. Politeness & Robots.txt</h3>
      <p>A good crawler must not overwhelm a server. Use a delay between requests to the same domain and always check the <code>robots.txt</code> file.</p>

      <h3>3. Distributed Crawling</h3>
      <p>Use a distributed URL Frontier (e.g., using Kafka) to coordinate multiple crawler workers.</p>
    `,
    quiz: [
      { q: "What is a Bloom Filter?", a: "A space-efficient probabilistic data structure used to test if an element is a member of a set." },
      { q: "Why is SimHash used in web crawling?", a: "To detect 'near-duplicate' content, which is common on the web." }
    ],
    interviewQuestions: [
      "How would you design a web crawler that can crawl 1 billion pages per day?",
      "Explain how to handle 'Spider Traps' in web crawling.",
      "How do you prioritize URLs in the URL Frontier?"
    ]
  },
  {
    id: "lld-case-1",
    title: "Design a Parking Lot",
    category: "LLD Case Studies",
    difficulty: "Intermediate",
    time: "40 min",
    tags: ["LLD", "OOP", "Interview"],
    description: "A classic LLD problem focusing on class relationships and design patterns.",
    content: `
      <h3>Core Entities</h3>
      <ul>
        <li>ParkingLot (Singleton)</li>
        <li>Level</li>
        <li>ParkingSpot (Abstract) -> Small, Medium, Large</li>
        <li>Vehicle (Abstract) -> Bike, Car, Truck</li>
        <li>Ticket</li>
      </ul>
      <h3>Key Logic</h3>
      <p>Use the <strong>Factory Pattern</strong> to create vehicles and the <strong>Strategy Pattern</strong> for different pricing models.</p>
    `,
    interviewQuestions: [
      "Design a parking lot with multiple levels and different types of spots.",
      "How would you implement the pricing logic to be flexible for different vehicle types and durations?",
      "Explain the design patterns you would use for this problem and why."
    ]
  },
  {
    id: "case-6",
    title: "Design a Distributed ID Generator (Snowflake)",
    category: "Case Studies",
    difficulty: "Advanced",
    time: "30 min",
    tags: ["HLD", "Distributed Systems", "Twitter"],
    description: "How to generate unique, sortable IDs across thousands of servers without a central database.",
    content: `
      <h3>1. Why not UUID?</h3>
      <p>UUIDs are 128-bit, which is large. They are also not sortable by time, which makes database indexing inefficient.</p>
      
      <h3>2. Twitter Snowflake Approach</h3>
      <p>A 64-bit ID structure:</p>
      <ul>
        <li><strong>1 bit:</strong> Unused (sign bit).</li>
        <li><strong>41 bits:</strong> Timestamp (milliseconds since epoch). Gives ~69 years.</li>
        <li><strong>10 bits:</strong> Machine ID (up to 1024 nodes).</li>
        <li><strong>12 bits:</strong> Sequence number (rolled over every millisecond).</li>
      </ul>

      <h3>3. Benefits</h3>
      <p>IDs are roughly sortable by time, unique across the cluster, and only 64 bits (fits in a standard <code>bigint</code>).</p>
    `,
    quiz: [
      { q: "How many IDs can Snowflake generate per millisecond per node?", a: "2^12 = 4096 IDs." },
      { q: "What happens if the system clock moves backward?", a: "The generator should wait for the clock to catch up or throw an error to prevent duplicate IDs." }
    ],
    interviewQuestions: [
      "How would you design a unique ID generator for a distributed system?",
      "What are the pros and cons of using a central database for ID generation?",
      "Explain the structure of a Twitter Snowflake ID."
    ]
  },
  {
    id: "case-7",
    title: "Design a Distributed Cache (Redis)",
    category: "Case Studies",
    difficulty: "Advanced",
    time: "45 min",
    tags: ["HLD", "Caching", "Distributed Systems"],
    description: "How to build a highly available, distributed in-memory key-value store.",
    content: `
      <h3>1. Core Components</h3>
      <ul>
        <li><strong>Data Partitioning:</strong> Use Consistent Hashing to distribute keys across nodes.</li>
        <li><strong>Replication:</strong> Use Master-Slave replication for high availability.</li>
        <li><strong>Eviction:</strong> Implement LRU or LFU at the node level.</li>
      </ul>

      <h3>2. Handling Hot Keys</h3>
      <p>If a single key is extremely popular, it can overwhelm a single node. Solution: Use <strong>local caching</strong> on the application servers or <strong>replicate</strong> the hot key across multiple cache nodes.</p>

      <h3>3. Consistency Models</h3>
      <p>Usually, distributed caches favor <strong>Availability</strong> over <strong>Consistency</strong> (Eventual Consistency). Use <strong>Quorum</strong> based reads/writes if higher consistency is needed.</p>
    `,
    quiz: [
      { q: "What is a 'Hot Key'?", a: "A key that receives a disproportionately high amount of traffic, potentially bottlenecking a single node." },
      { q: "How does Redis handle persistence?", a: "Using RDB (Snapshots) and AOF (Append Only File)." }
    ],
    interviewQuestions: [
      "How would you design a distributed cache that can handle 1 million requests per second?",
      "Explain how to handle node failures in a distributed cache cluster.",
      "What is the difference between Redis and Memcached?"
    ]
  }
];

const learningPaths = [
  {
    id: "beginner",
    title: "Beginner Path",
    description: "Start here if you are new to system design. Focus on OOP and Foundations.",
    topics: ["foundations-1", "foundations-2", "ood-1", "principles-1", "hld-1"]
  },
  {
    id: "product",
    title: "Product Company Path",
    description: "Focus on scalability, databases, and real-world case studies.",
    topics: ["hld-1", "db-1", "cache-1", "case-1", "case-2", "case-3", "case-6"]
  },
  {
    id: "big-tech",
    title: "Big Tech Interview Path",
    description: "Advanced concepts, messaging systems, and complex design problems.",
    topics: ["async-1", "hld-2", "case-3", "case-4", "case-5", "case-7", "lld-case-1"]
  }
];

const glossary = [
  { term: "Scalability", definition: "The ability of a system to handle increased load by adding resources." },
  { term: "Latency", definition: "The time it takes for a request to travel from the client to the server and back." },
  { term: "Throughput", definition: "The number of requests a system can handle in a given time period." },
  { term: "Availability", definition: "The percentage of time a system is operational and accessible." },
  { term: "Consistency", definition: "Ensuring all nodes in a distributed system see the same data at the same time." },
  { term: "Sharding", definition: "Horizontal partitioning of data across multiple database instances." },
  { term: "CDN", definition: "Content Delivery Network - a distributed network of servers that deliver content based on user location." },
  { term: "Microservices", definition: "An architectural style that structures an application as a collection of loosely coupled services." },
  { term: "Idempotency", definition: "The property of certain operations in mathematics and computer science whereby they can be applied multiple times without changing the result beyond the initial application." },
  { term: "Bloom Filter", definition: "A space-efficient probabilistic data structure used to test if an element is a member of a set." },
  { term: "Consistent Hashing", definition: "A special kind of hashing such that when a hash table is resized, only K/n keys need to be remapped on average." }
];

const checklist = [
  { category: "Foundations", items: ["Understand LLD vs HLD", "Explain Vertical vs Horizontal Scaling", "Know CAP Theorem & PACELC", "Understand Load Balancing Algorithms"] },
  { category: "Databases", items: ["SQL vs NoSQL tradeoffs", "ACID vs BASE properties", "Database sharding vs partitioning", "Indexing & Query Optimization"] },
  { category: "Caching", items: ["Cache-aside vs Write-through vs Write-back", "LRU vs LFU eviction policies", "CDN & Edge Caching", "Cache Invalidation strategies"] },
  { category: "Async Systems", items: ["Message Queues vs Pub/Sub", "Event-driven architecture", "Handling message delivery guarantees (At-least-once, Exactly-once)"] },
  { category: "Interview", items: ["Requirement clarification", "Back-of-the-envelope estimation", "High-level design diagrams", "Identifying & resolving bottlenecks"] }
];

// Exporting data for use in React
export { topics, learningPaths, glossary, checklist };
