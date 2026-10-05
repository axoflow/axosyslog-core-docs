---
title: "Get started with FilterX"
linkTitle: "Get started"
description: "Build your first FilterX block: filter, parse a key=value message, set a field, and check the output in a file."
weight: 100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

In this tutorial, you build a FilterX block that processes iptables log messages. You learn how to filter messages, parse key=value pairs, modify a field, and send the result to a destination.

## Prerequisites

- Docker. For details, see {{% xref "/install/docker/_index.md" %}}. To use Podman instead, see {{% xref "/install/podman/_index.md" %}} and replace all `docker` commands with `podman`.
- Basic knowledge of {{< product >}} configuration: sources, destinations, and log paths.

## Sample messages

You use two sample messages in this tutorial. The first one is an iptables message from the kernel. It's an RFC3164-formatted message with space-separated key=value pairs:

```shell
Dec 08 12:00:00 hostname.example kernel: IN=eth0 OUT= MAC=11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00 SRC=192.0.2.2 DST=192.168.0.1 LEN=40 TOS=0x00 PREC=0x00 TTL=232 ID=12345 PROTO=TCP SPT=54321 DPT=22 WINDOW=1023 RES=0x00 SYN URGP=0
```

The second one is an sshd message. Your FilterX block must not let it through:

```shell
Dec 08 12:00:01 hostname.example sshd[1234]: Accepted publickey for alice from 192.0.2.2 port 54321 ssh2
```

## Step 1: Start {{< product >}} without FilterX {#step-1}

First, you run a minimal configuration that reads messages from a file and writes them to another file.

1. Create an empty directory and an empty input file:

    ```shell
    mkdir filterx-tutorial
    cd filterx-tutorial
    touch input.log
    ```

1. Create a file called `filterx-tutorial.conf` with the following content:

    ```shell
    @version: current

    source s_tutorial {
        file("/tutorial/input.log" follow-freq(1));
    };

    destination d_tutorial {
        file("/tutorial/output.log" template("${PROGRAM}: ${MESSAGE}\n"));
    };

    log {
        source(s_tutorial);
        destination(d_tutorial);
    };
    ```

1. Start {{< product >}} in a container. The container mounts the current directory as `/tutorial`, and keeps running in the background.

    ```shell
    docker run -d --name filterx-tutorial -v "$PWD:/tutorial" ghcr.io/axoflow/axosyslog:latest -f /tutorial/filterx-tutorial.conf
    ```

1. Append the two sample messages to the input file:

    ```shell
    echo 'Dec 08 12:00:00 hostname.example kernel: IN=eth0 OUT= MAC=11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00 SRC=192.0.2.2 DST=192.168.0.1 LEN=40 TOS=0x00 PREC=0x00 TTL=232 ID=12345 PROTO=TCP SPT=54321 DPT=22 WINDOW=1023 RES=0x00 SYN URGP=0' >> input.log
    echo 'Dec 08 12:00:01 hostname.example sshd[1234]: Accepted publickey for alice from 192.0.2.2 port 54321 ssh2' >> input.log
    ```

1. Check the output file:

    ```shell
    tail -n 2 output.log
    ```

    You should see both messages:

    ```shell
    kernel: IN=eth0 OUT= MAC=11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00 SRC=192.0.2.2 DST=192.168.0.1 LEN=40 TOS=0x00 PREC=0x00 TTL=232 ID=12345 PROTO=TCP SPT=54321 DPT=22 WINDOW=1023 RES=0x00 SYN URGP=0
    sshd: Accepted publickey for alice from 192.0.2.2 port 54321 ssh2
    ```

Keep the container running. In the next steps, you edit `filterx-tutorial.conf`, then apply the changes with the following command:

```shell
docker exec filterx-tutorial syslog-ng-ctl reload
```

You should see:

```shell
Config reload successful
```

## Step 2: Filter the messages {#step-2}

Now you add a FilterX block that lets only iptables messages through.

1. Replace the log path in `filterx-tutorial.conf` with the following:

    ```shell
    log {
        source(s_tutorial);
        filterx {
            ${PROGRAM} == "kernel";
            ${MESSAGE} =~ "PROTO=";
        };
        destination(d_tutorial);
    };
    ```

    A message passes the FilterX block only if every statement in the block is true. For details, see [Truthy and falsy values]({{< relref "/filterx/filterx-language/_index.md#truthy-falsy" >}}). The `=~` operator checks if the message matches a regular expression. For details, see {{% xref "/filterx/operator-reference.md" %}}.

1. Reload the configuration:

    ```shell
    docker exec filterx-tutorial syslog-ng-ctl reload
    ```

1. Append the two sample messages again:

    ```shell
    echo 'Dec 08 12:00:00 hostname.example kernel: IN=eth0 OUT= MAC=11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00 SRC=192.0.2.2 DST=192.168.0.1 LEN=40 TOS=0x00 PREC=0x00 TTL=232 ID=12345 PROTO=TCP SPT=54321 DPT=22 WINDOW=1023 RES=0x00 SYN URGP=0' >> input.log
    echo 'Dec 08 12:00:01 hostname.example sshd[1234]: Accepted publickey for alice from 192.0.2.2 port 54321 ssh2' >> input.log
    ```

1. Check the output file:

    ```shell
    tail -n 3 output.log
    ```

    You should see:

    ```shell
    kernel: IN=eth0 OUT= MAC=11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00 SRC=192.0.2.2 DST=192.168.0.1 LEN=40 TOS=0x00 PREC=0x00 TTL=232 ID=12345 PROTO=TCP SPT=54321 DPT=22 WINDOW=1023 RES=0x00 SYN URGP=0
    sshd: Accepted publickey for alice from 192.0.2.2 port 54321 ssh2
    kernel: IN=eth0 OUT= MAC=11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00 SRC=192.0.2.2 DST=192.168.0.1 LEN=40 TOS=0x00 PREC=0x00 TTL=232 ID=12345 PROTO=TCP SPT=54321 DPT=22 WINDOW=1023 RES=0x00 SYN URGP=0
    ```

    The first two lines are from step 1. The last line is new: the kernel message passed the filter, but the sshd message didn't.

## Step 3: Parse the key=value pairs {#step-3}

Next, you parse the iptables message into separate fields, and send them as JSON.

1. Add the following lines to the end of the FilterX block, after the two filter statements:

    ```shell
    iptables = parse_kv(${MESSAGE}, value_separator="=", pair_separator=" ");
    ${MESSAGE} = format_json(iptables);
    ```

    - [`parse_kv`]({{< relref "/filterx/filterx-parsing/key-value-parser/_index.md" >}}) splits the message into key=value pairs, and stores them in the `iptables` variable.
    - `iptables` is a local FilterX variable, because its name doesn't start with `$`. {{< product >}} doesn't send local variables to the destination, unless you assign them to a name-value pair. For details, see [FilterX variables in destinations]({{< relref "/filterx/filterx-language/_index.md#variables-in-destinations" >}}).
    - [`format_json`]({{< relref "/filterx/function-reference.md#format-json" >}}) converts `iptables` to a JSON string, and the line assigns it to `${MESSAGE}`.

1. Reload the configuration, and append the two sample messages again, the same way as in [Step 2](#step-2).

1. Check the output file:

    ```shell
    tail -n 1 output.log
    ```

    You should see the parsed message as JSON:

    ```shell
    kernel: {"IN":"eth0","OUT":"","MAC":"11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00","SRC":"192.0.2.2","DST":"192.168.0.1","LEN":"40","TOS":"0x00","PREC":"0x00","TTL":"232","ID":"12345","PROTO":"TCP","SPT":"54321","DPT":"22","WINDOW":"1023","RES":"0x00","URGP":"0"}
    ```

    The word `SYN` isn't in the output, because it isn't a key=value pair.

## Step 4: Rename a field {#step-4}

Finally, you rename the `SRC` field to `src_ip`.

1. Add the following lines to the FilterX block, before the `format_json` line:

    ```shell
    iptables.src_ip = iptables.SRC;
    unset(iptables.SRC);
    ```

    The first line copies the value of `SRC` to a new `src_ip` field. The [`unset`]({{< relref "/filterx/function-reference.md#unset" >}}) function deletes the `SRC` field.

    The FilterX block now looks like this:

    ```shell
    filterx {
        ${PROGRAM} == "kernel";
        ${MESSAGE} =~ "PROTO=";

        iptables = parse_kv(${MESSAGE}, value_separator="=", pair_separator=" ");
        iptables.src_ip = iptables.SRC;
        unset(iptables.SRC);
        ${MESSAGE} = format_json(iptables);
    };
    ```

1. Reload the configuration, and append the two sample messages again, the same way as in [Step 2](#step-2).

1. Check the output file:

    ```shell
    tail -n 1 output.log
    ```

    You should see:

    ```shell
    kernel: {"IN":"eth0","OUT":"","MAC":"11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00","DST":"192.168.0.1","LEN":"40","TOS":"0x00","PREC":"0x00","TTL":"232","ID":"12345","PROTO":"TCP","SPT":"54321","DPT":"22","WINDOW":"1023","RES":"0x00","URGP":"0","src_ip":"192.0.2.2"}
    ```

    The `SRC` field is gone, and the `src_ip` field is at the end of the JSON object.

## What you built

You now have a FilterX block that selects iptables messages, parses them into fields, and renames a field. {{< product >}} sends the result to a file as JSON. Your complete `filterx-tutorial.conf` file looks like this:

```shell
@version: current

source s_tutorial {
    file("/tutorial/input.log" follow-freq(1));
};

destination d_tutorial {
    file("/tutorial/output.log" template("${PROGRAM}: ${MESSAGE}\n"));
};

log {
    source(s_tutorial);
    filterx {
        ${PROGRAM} == "kernel";
        ${MESSAGE} =~ "PROTO=";

        iptables = parse_kv(${MESSAGE}, value_separator="=", pair_separator=" ");
        iptables.src_ip = iptables.SRC;
        unset(iptables.SRC);
        ${MESSAGE} = format_json(iptables);
    };
    destination(d_tutorial);
};
```

## Clean up

To stop and remove the container, run:

```shell
docker rm -f filterx-tutorial
```

## Next steps

- {{% xref "/filterx/reuse-filterx-block.md" %}}
- {{% xref "/filterx/update-filters.md" %}}
- {{% xref "/filterx/function-reference.md" %}}
- [Create an iptables parser]({{< relref "/filterx/filterx-examples/_index.md#create-an-iptables-parser" >}})
