# Kubernetes Learning 🚀

A hands-on journey learning the fundamentals of Kubernetes — from running a pre-built container to deploying a custom Node.js app with rolling updates and load balancing, all on a local cluster (Docker Desktop).

## 📖 About

This repo contains two progressive examples that walk through the core Kubernetes concepts: **Pods, Deployments, Services, replicas, rolling updates, and load balancing**.

## 🛠️ Tech Stack

- **Docker Desktop** (with Kubernetes enabled)
- **kubectl** — Kubernetes CLI
- **Node.js** — for the custom app example

## 📁 Project Structure

```
k8s-learning/
├── 1-hello-world-containers/   # Example 1: deploy a pre-built image
│   ├── hello-deployment.yaml
│   └── hello-service.yaml
├── 2-nodejs-app/               # Example 2: build & deploy your own app
│   ├── my-hello-app/
│   │   ├── Dockerfile
│   │   └── server.js
│   ├── my-app-deployment.yaml
│   └── my-app-service.yaml
├── commands.md                 # Quick reference of useful kubectl commands
└── README.md
```

## ✅ Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed
- Kubernetes enabled in Docker Desktop (`Settings → Kubernetes → Enable Kubernetes`)
- `kubectl` available (bundled with Docker Desktop)
- [Node.js](https://nodejs.org) — only needed for Example 2

Verify your cluster is running:

```bash
kubectl get nodes
```

You should see `docker-desktop` in `Ready` status.

---

## 🟢 Example 1: Deploy a Pre-Built Container

Deploys Google's `hello-app` image to learn the basic flow: **Deployment + Service**.

```bash
cd 1-hello-world-containers
kubectl apply -f hello-deployment.yaml
kubectl apply -f hello-service.yaml
```

Then open **http://localhost:8085** in your browser. Refresh to see different pod hostnames as the load balancer rotates between replicas.

Clean up:

```bash
kubectl delete -f hello-service.yaml
kubectl delete -f hello-deployment.yaml
```

---

## 🟣 Example 2: Build & Deploy Your Own Node.js App

A custom Node.js HTTP server, containerized with Docker, and deployed to Kubernetes.

### 1. Build the Docker image

```bash
cd 2-nodejs-app/my-hello-app
docker build -t my-hello-app:1.0 .
```

### 2. Deploy to Kubernetes

```bash
cd ..
kubectl apply -f my-app-deployment.yaml
kubectl apply -f my-app-service.yaml
```

### 3. Open the app

Visit **http://localhost:3000**.

### 🔄 Deploying a new version

When you change `server.js`:

1. Rebuild with a new tag:
   ```bash
   docker build -t my-hello-app:2.0 .
   ```
2. Update the image tag in `my-app-deployment.yaml`:
   ```yaml
   image: my-hello-app:2.0
   ```
3. Apply — Kubernetes performs a zero-downtime rolling update:
   ```bash
   kubectl apply -f my-app-deployment.yaml
   ```

---

## 🧩 Kubernetes Concepts Covered

| Concept | What it does |
|---------|--------------|
| **Pod** | Smallest deployable unit — wraps containers |
| **Deployment** | Manages replicas, rolling updates, rollbacks |
| **Service (LoadBalancer)** | Stable network endpoint, load-balances across pods |
| **Labels & Selectors** | How a Service finds its pods |
| **ReplicaSets** | Created automatically by Deployments to manage pod versions |

## 🎯 Useful Commands

A full reference is in [`commands.md`](./commands.md). The essentials:

```bash
kubectl apply -f file.yaml                       # create/update from YAML
kubectl get pods                                 # list pods
kubectl get all                                  # everything in the namespace
kubectl describe pod <pod-name>                  # debug a pod
kubectl logs <pod-name>                          # container logs
kubectl scale deployment <name> --replicas=N     # scale up/down
kubectl rollout undo deployment <name>           # rollback to previous version
kubectl delete -f file.yaml                      # clean up
```

## 🧠 What I Learned

- Pods are the smallest unit — they wrap containers, not the other way around
- Deployments keep pods alive and handle rolling updates automatically
- Services give pods a stable address (pods come and go with new IPs)
- Labels are the glue between Services and Pods — not names
- Kubernetes is **declarative**: describe the desired state, and it makes it happen
- Old ReplicaSets are kept around so you can roll back easily

## 📚 Next Steps

- [ ] ConfigMaps & Secrets — externalize configuration & credentials
- [ ] Liveness & readiness probes — health checks
- [ ] Ingress — route multiple services through one entry point
- [ ] Persistent Volumes — storage for stateful apps
- [ ] Helm — package manager for Kubernetes

## 📄 License

MIT