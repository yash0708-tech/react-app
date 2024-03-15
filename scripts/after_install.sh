kubectl delete pods --all -n eks-cluster
kubectl port-forward -n eks-cluster $(kubectl get pods -n eks-cluster -l app=eks-sample-linux-app -o jsonpath="{.items[0].metadata.name}") --address 0.0.0.0 3001:3001
