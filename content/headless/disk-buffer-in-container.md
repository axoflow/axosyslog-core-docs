## How to use disk-buffers in containers and Kubernetes {#disk-buffer-container-kubernetes}

When you are running {{% param "product_name" %}} in a container or in Kubernetes, and you want to use disk-buffers, there are some additional things to configure.

- Make sure to mount the disk-buffer files and the persist file (by default, both are stored in `/var/lib/syslog-ng`) in a way they are not lost when the pod or container is restarted.
    - In Kubernetes, add a persistent volume to your pod and store the disk buffer files (`/var/lib/syslog-ng`) there.
    - In a container, mount the disk-buffer directory from the host, or store it on a local volume.
- Use a reliable disk-buffer only if your storage is fast enough. For example, a low-speed persistent volume in Kubernetes can cause a significant performance degradation for {{% param "product_name" %}}.
- Use the latest available version of {{% param "product_name" %}}, as many related improvements  and performance improvements (for example, disk-buffer related metrics) are only supported in recent versions.

If you are using `syslog-ng` without disk-buffering configured, `syslog-ng` stores everything in memory, which results in great performance. If you enable disk-buffering, the performance decreases. Make sure to size your observability pipeline appropriately.
