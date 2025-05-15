# Load-Balancer Prototype (TypeScript)

A **modular, pattern-driven** demo that shows how to design a lightweight load-balancer
using:

| Pattern | Role in this project |
|---------|---------------------|
| **Singleton** | Guarantees a single `ServerPool` registry shared across the app. |
| **Observer** | Lets any component subscribe to routing events (e.g., a `MetricsCollector`). |
| **Chain of Responsibility** | Builds a configurable middleware pipeline (auth, logging …). |
| **Round-Robin algorithm** | Evenly distributes incoming requests across backend nodes. |

The code is intentionally compact (≈150 LOC) so you can grasp the ideas quickly, fork
them, and plug in real infrastructure later.

---

## 📁 Folder structure

```text
src/
├─ core/
│  ├─ Request.ts            # DTO for incoming requests
│  └─ Observer.ts           # Observable / Observer contracts
├─ servers/
│  ├─ Server.ts             # Fake backend node
│  └─ ServerPool.ts         # ***Singleton*** registry
├─ middleware/
│  ├─ Handler.ts            # Abstract chain link
│  ├─ AuthHandler.ts        # Auth middleware
│  └─ LoggingHandler.ts     # Logging middleware
├─ loadbalancer/
│  ├─ LoadBalancer.ts       # Routing engine (Round-Robin + Observer)
│  └─ MetricsCollector.ts   # Example observer
├─ factory.ts               # Helper to wire everything
└─ index.ts                 # Tiny demo / smoke test
```

## 1.	Clone & install

```
git clone https://github.com/<you>/ts-load-balancer.git
cd ts-load-balancer
npm install        # installs TypeScript + ts-node dev deps
```


## 2.	Run demo

`npx ts-node src/index.ts`

Expected output
```
ℹ️   Incoming request #1 -> /api/pets
🟢  Server 1 processed request #1
📈  Total handled: 1
```


## 3.	Build JS

`npx tsc          # emits dist/ with compiled .js files
`




### 🛠️ How it works (high-level)
**1.	Bootstrapping (index.ts)**
- Registers three Server instances in the global ServerPool.
- Creates the default load-balancer (createLoadBalancer), which is a
LoadBalancer wired with two middleware links:
AuthHandler → LoggingHandler.

**2.	Routing flow**
   1.	A caller invokes lb.route(request).
   2.	The Chain of Responsibility walks through each Handler:
   •	AuthHandler rejects when authToken is missing.
   •	LoggingHandler logs and always passes onward.
   3.	When the chain completes, LoadBalancer picks the next backend node
via Round-Robin and calls server.handle(request).
   4.	It then fires notify("request_routed", { … }); observers such as the
MetricsCollector increment counters, ship metrics, etc.
5. Scaling out
   •	Add more concrete Handler classes (rate-limiting, header rewrite, …).
   •	Register N additional Server nodes—ServerPool remains a Singleton,
guaranteeing global consistency.
   •	Replace the Round-Robin logic with any strategy (random, least-busy,
consistent hash) by refactoring that section into a pluggable
“strategy” interface.

---




## 📚 References
- Gamma, Helm, Johnson & Vlissides – Design Patterns (GoF)
- Martin Fowler – Patterns of Enterprise Application Architecture
- Nginx docs – Load-balancing algorithms overview

⸻

License

MIT – do whatever you want; attribution appreciated.

Save the above text as **`README.md`** at the project root and you’re good to go.  
Need CI pipelines, Dockerfile, or testing sketches? Ping me!