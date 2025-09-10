1️⃣ Todo App Metrics

### Current todos
<pre> ```bash
todo_items_current ``` </pre>


### Total todos added

todo_items_added_total


### Total todos deleted

todo_items_deleted_total 


### Net change per minute

rate(todo_items_added_total[1m]) - rate(todo_items_deleted_total[1m])


### Total adds per minute

rate(todo_items_added_total[1m])


### Total deletes per minute

rate(todo_items_deleted_total[1m])

2️⃣ Container CPU Usage (todo app)

### CPU usage % of todo container

rate(container_cpu_usage_seconds_total{container="proemtheus-final-todo-app"}[1m]) * 100


### CPU usage % per container core

rate(container_cpu_usage_seconds_total{container="proemtheus-final-todo-app"}[1m]) * 100 / count(node_cpu_seconds_total{mode="system"})


### Max CPU usage % in last 5 minutes

max_over_time(rate(container_cpu_usage_seconds_total{container="proemtheus-final-todo-app"}[5m]) * 100)

3️⃣ Host CPU Usage (Node Exporter)

### Total CPU usage %

100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)


### CPU usage % by user processes

rate(node_cpu_seconds_total{mode="user"}[5m]) * 100


### CPU usage % by system/kernel processes

rate(node_cpu_seconds_total{mode="system"}[5m]) * 100


### CPU usage % per core

100 - (rate(node_cpu_seconds_total{mode="idle"}[5m]) * 100)

4️⃣ Memory Usage (Container & Host)

### Container memory usage (bytes)

container_memory_usage_bytes{container="proemtheus-final-todo-app"}


### Container memory usage %

(container_memory_usage_bytes{container="proemtheus-final-todo-app"} / container_spec_memory_limit_bytes{container="proemtheus-final-todo-app"}) * 100


### Host memory usage %

100 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100)


### Memory available on host (bytes)

node_memory_MemAvailable_bytes

5️⃣ Disk Usage (Node Exporter)

### Disk space usage %

100 - (node_filesystem_free_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"} * 100)


### Disk space free (bytes)

node_filesystem_free_bytes{mountpoint="/"}

6️⃣ Network / System Metrics

### Network received bytes per second

rate(node_network_receive_bytes_total[1m])


### Network transmitted bytes per second

rate(node_network_transmit_bytes_total[1m])


### Install prom client

npm install prom-client


