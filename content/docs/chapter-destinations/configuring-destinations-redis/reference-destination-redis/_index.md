---
title: "redis() destination options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `redis()` driver sends messages as name-value pairs to a [Redis](https://redis.io/) key-value store.

The `redis()` destination has the following options:

## auth() {#redis-option-auth}

|          |                        |
| -------- | ---------------------- |
| Type:    | hostname or IP address |
| Default: | N/A                    |

*Description:* The password used for authentication on a password-protected Redis server. Available in {{% productparam "abbrev" %}} version {{% conditional-text include-if="ose" %}}3.10{{% /conditional-text %}} and later.

{{% include-headless "chunk/option-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

## command() {#redis-option-command}

|          |                                                                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type:    | comma-separated list of strings ("\<redis-command\>", "\<first-command-parameter\>", "\<second-command-parameter\>", "\<third-command-parameter\>") |
| Default: | empty string                                                                                                                                        |

*Description:* The [Redis command](https://redis.io/commands) to execute, for example, LPUSH, INCR, or HINCRBY. Using the HINCRBY command with an increment value of 1 allows you to create various statistics. For example, the **command("HINCRBY" "${HOST}/programs" "${PROGRAM}" "1")** command counts the number of log messages on each host for each program.

Note the following points when using the `redis()` destination:

  - You can use macros and templates in the parameters of the Redis command.

  - Currently you can use only one command in a redis() destination.

  - The {{% productparam "abbrev" %}} application ignores the return value of the command. If the Redis server returns an error, {{% productparam "abbrev" %}} closes the connection.

{{% include-headless "chunk/option-destination-diskbuffer.md" %}}

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

{{% include-headless "chunk/option-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

{{% include-headless "chunk/option-destination-hook.md" %}}

## host() {#redis-option-host}

|          |                        |
| -------- | ---------------------- |
| Type:    | hostname or IP address |
| Default: | 127.0.0.1              |

*Description:* The hostname or IP address of the Redis server.

## port() {#redis-option-port}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 6379   |

*Description:* The port number of the Redis server.

{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}


## workers()

|          |         |
| -------- | ------- |
| Type:    | integer |
| Default: | 1       |

{{% include-headless "chunk/option-destination-description-workers.md" %}}

