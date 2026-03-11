---
title: Kubernetes Debugging Tips for SREs
description: Practical commands and patterns I reach for when something breaks in a Kubernetes cluster.
date: 2025-12-01
---

# Kubernetes Debugging Tips for SREs

Kubernetes is great — until something goes wrong. Here are the commands and techniques I actually use when debugging production incidents.

## Start with the Pod

The first thing I do when alerted to an issue is check the pod state:

```bash
kubectl get pod <pod-name> -n <namespace> -o wide
kubectl describe pod <pod-name> -n <namespace>
```

`describe` gives you events, resource limits, and the last container exit code. The exit code alone often tells you what happened:

| Exit Code | Meaning |
|-----------|---------|
| 0 | Success |
| 1 | General error |
| 137 | OOM killed (128 + 9) |
| 143 | Graceful termination (128 + 15) |

## Logs

Current logs:

```bash
kubectl logs <pod-name> -n <namespace>
```

Previous container instance (very useful after a crash loop):

```bash
kubectl logs <pod-name> -n <namespace> --previous
```

Follow logs in real time across multiple pods using a label selector:

```bash
kubectl logs -f -l app=my-service -n <namespace> --max-log-requests=10
```

## Exec into a Running Container

Sometimes you need to poke around inside the container:

```bash
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh
```

If `sh` is not available (distroless images), you can use an ephemeral debug container:

```bash
kubectl debug -it <pod-name> --image=busybox --target=<container-name> -n <namespace>
```

## Check Resource Pressure

Node-level resource pressure can cause pods to be evicted or throttled:

```bash
kubectl top nodes
kubectl top pods -n <namespace> --sort-by=memory
```

## Investigate a CrashLoopBackOff

This is one of the most common states. The workflow:

1. `kubectl describe pod` — look at the `Last State` exit code
2. `kubectl logs --previous` — read the last crash output
3. Check resource limits — the pod may be OOM-killed
4. Check liveness probe configuration — a misconfigured probe causes restarts even when the app is healthy

## Port Forward for Local Testing

To hit a service locally without exposing it:

```bash
kubectl port-forward svc/my-service 8080:80 -n <namespace>
```

Then `curl localhost:8080` from your machine.

## Useful One-Liners

Get all pods not in Running state:

```bash
kubectl get pods -A --field-selector=status.phase!=Running
```

Restart a deployment:

```bash
kubectl rollout restart deployment/<name> -n <namespace>
```

Watch a rollout:

```bash
kubectl rollout status deployment/<name> -n <namespace> --watch
```

---

These are the commands I find myself typing repeatedly during on-call. Bookmark them and you will save yourself a lot of time hunting through docs at 2am.
