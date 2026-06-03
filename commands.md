# Kubernetes Commands Cheat Sheet 🎯

A quick reference of the most useful `kubectl` commands for this project.

## 🚀 Apply & Delete

```bash
kubectl apply -f my-app-deployment.yaml     # Create or update resources from YAML
kubectl delete -f my-app-deployment.yaml    # Delete the resources defined in YAML
```

## 🔍 Inspect

```bash
kubectl get pods                # List pods (add -w to watch live)
kubectl get all                 # See everything in the current namespace
kubectl describe pod <name>     # Detailed info + events (great for debugging)
kubectl logs <name>             # View a container's logs
```

> 💡 **Tip:** `describe` and `logs` are your two best friends when something breaks.

## 📈 Scale

```bash
kubectl scale deployment <name> --replicas=N    # Scale up or down on the fly
```

Example:
```bash
kubectl scale deployment my-hello-app --replicas=5
```

## ↩️ Rollback

```bash
kubectl rollout undo deployment <name>          # Roll back to the previous version
kubectl rollout history deployment <name>       # See past revisions
```

---

## 🔄 Deploying a New Release

When you change `server.js`, follow these three steps:

### 1. Rebuild with a new tag

```bash
docker build -t my-hello-app:3.0 .
```

### 2. Update the YAML to point to the new tag

```yaml
image: my-hello-app:3.0
```

### 3. Apply

```bash
kubectl apply -f my-app-deployment.yaml
```

Kubernetes will perform a **zero-downtime rolling update** automatically. ✨