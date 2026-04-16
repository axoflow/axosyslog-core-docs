---
title: "Using the interactive debugger"
weight: 600
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The {{% param "product.abbrev" %}} interactive debugger lets you step through a running log pipeline one log path at a time and inspect individual messages. Use it when you need to understand why {{% param "product.abbrev" %}} drops, routes, or transforms a message in an unexpected way.

## Start the debugger

Pass the `-i` (or `--interactive`) flag when starting {{% param "product.abbrev" %}}. The process must run in the foreground, so use it together with the `-F` (`--foreground`) flag.

```shell
syslog-ng -i -F
```

After startup, the debugger presents the prompt (in [_interrupt context_](#contexts)):

```shell
axosyslog interactive debugger
Waiting for breakpoint...
```

<details><summary>Show sample session</summary>
The following session demonstrates a typical debugging workflow. It starts {{% param "product.abbrev" %}}, waits for a message to arrive, steps to the first log path, inspects the message, and then traces its path through the rest of the pipeline.

```shell
$ syslog-ng -i -F

axosyslog interactive debugger
^C
  Stopping on Interrupt...
(syslog-ng) step
(continuing)
Breakpoint hit /etc/syslog-ng/syslog-ng.conf:30:5
   28 | filter f_auth { facility(auth, authpriv); };
   29 | 
▶  30 | log {
   31 |   source(s_local);
   32 |   filter(f_auth);

2026-04-15T10:23:44+00:00 server01 sshd[1234]: Accepted publickey for alice
(syslog-ng) print
HOST=server01
HOST_FROM=127.0.0.1
MESSAGE=Accepted publickey for alice
PROGRAM=sshd
PID=1234
LEGACY_MSGHDR=sshd[1234]:
MSGFORMAT=syslog:rfc3164
TAGS=.source.s_net
(syslog-ng) info pipe
LogPipe 0x5645a3b1c200 at /etc/syslog-ng/syslog-ng.conf:30:5
(syslog-ng) trace
(continuing)
[1713175464.001234567 +0] Tracing log@/etc/syslog-ng/syslog-ng.conf:30:5
[1713175464.001256789 +22222] Tracing filter@/etc/syslog-ng/syslog-ng.conf:32:3
[1713175464.001278901 +22112] Tracing destination@/etc/syslog-ng/syslog-ng.conf:34:3
  Stopping on Interrupt...
(syslog-ng) quit
(continuing)
```

The following commands are available:

- `help` Display this help
- `info` Display information about the current execution state
- `list` Display source code at the current location
- `continue` Continue until the next breakpoint
- `display` Set the displayed message template
- `trace` Display timing information as the message traverses the config
- `print` Print the current log message
- `drop` Drop the current message
- `quit` Exit from {{% param "product.abbrev" %}}

</details>

## Execution contexts {#contexts}

The debugger is always in one of two contexts. The context determines which commands are available.

| Context | When it's active | Commands available |
|---|---|---|
| Interrupt context | At startup or after pressing Ctrl+C | `help`, [`list`](#list), `step`, `continue`, [`display`](#display), `quit` |
| Pipeline context | After `step` or `follow` pauses at a log path | [All commands](#commands) |

- When the debugger is in _interrupt context_, the prompt appears immediately and you can issue initial navigation commands.
- When the debugger pauses at a log path (_pipeline context_), the console shows the location in the configuration file. It also displays the current message before presenting the prompt.

## Navigate the pipeline

At startup the debugger is in interrupt context. Use the following commands to move through the pipeline:

- `continue` (or `c`): resume processing until you press Ctrl+C again.
- `step` (or `s`): advance execution to the next log path and pause there. This works from either context.
- Ctrl+C: interrupt a running pipeline at any point and return to interrupt context.

When you press Ctrl+C, the console shows:

```shell
  Stopping on Interrupt...
(syslog-ng) 
```

When `step` or `follow` pauses at a log path, the console shows the location in the configuration and the current message using the active display template, for example:

```shell
Breakpoint hit /etc/syslog-ng/syslog-ng.conf:42:10
   40 | source s_local { system(); internal(); };
   41 | 
▶  42 | log {
   43 |   source(s_local);
   44 |   filter(f_auth);

2026-04-15T10:23:44+00:00 server01 sshd[1234]: Accepted publickey for alice
(syslog-ng) 
```

## Inspect a message

### The `print` command {#print}

The `print` command (or `p`) is available in pipeline context.

Without arguments, `print` lists every name-value pair of the current message, one per line in `name=value` format. {{% param "product.abbrev" %}} displays binary values as hex. Tags appear space-separated in the `TAGS=` line:

```shell
HOST=server01
PROGRAM=sshd
PID=1234
MSG=Accepted publickey for alice
TAGS=ssh .source.s_local
```

With a template argument, `print` evaluates the template using the current message and prints the result, for example:

```shell
print $HOST - $MSGHDR$MSG
```

### The `display` command {#display}

The `display` command controls what {{% param "product.abbrev" %}} prints automatically each time execution pauses at a log path. Without arguments it shows the current template. With a template argument it sets a new one.

```shell
display $TIMESTAMP $PROGRAM($PID): $MSG
```

After setting the template, the debugger confirms:

```shell
display: The template is set to: "$TIMESTAMP $PROGRAM($PID): $MSG"
```

The default display template is `$DATE $HOST $MSGHDR$MSG`. The `display` command is available in both contexts.

## Trace message flow

Two commands let you follow a single message through the entire pipeline.

### The `follow` command

Available in {{% param "product.abbrev" %}} 4.25 and later.

`follow` (or `f`) is available in pipeline context. It follows the current message through the pipeline and pauses at every log path the message reaches. Messages from other sources don't trigger pauses. At each stop you can use `print`, `info pipe`, `drop`, and other pipeline-context commands to inspect the state.

When the message exits the pipeline ({{% param "product.abbrev" %}} has finished processing the message), execution returns to interrupt context.

### The `trace` command

`trace` (or `t`) is available in pipeline context. It follows the current message without pausing. It prints one timestamped line for each log path the message passes through, then returns to interrupt context automatically. Use `trace` when you want to see the full route a message takes, or when you are investigating performance.

Each line of `trace` output has the following format:

```shell
[1713175464.001234567 +0] Tracing log@/etc/syslog-ng/syslog-ng.conf:30:5
[1713175464.001256789 +22222] Tracing filter@/etc/syslog-ng/syslog-ng.conf:32:3
[1713175464.001278901 +22112] Tracing destination@/etc/syslog-ng/syslog-ng.conf:34:3
```

The fields are:

- `1713175200`: monotonic clock seconds.
- `123456789`: nanoseconds within that second.
- `+12345`: nanoseconds elapsed since the previous trace event (0 for the first event).
- `filter@/etc/syslog-ng.conf:42:5`: the type of the log path and its location in the configuration file.

## Browse the configuration source

### The `list` command {#list}

The `list` command (or `l`) shows approximately 11 lines of configuration source at a time, with a column indicator marking the current execution point. The debugger remembers the list position between calls. `list` is available in both contexts.

Arguments:

- `list` or `l`: show the next window from the current position.
- `list +`: scroll forward 11 lines.
- `list -`: scroll back 11 lines.
- `list .`: re-center the view at the current log path's location in the configuration file.
- `list 55`: jump to line 55.

### The `info pipe` command

The `info pipe` command (or `i pipe`) is available in pipeline context. It shows the type and configuration-file location of the log path where execution is currently paused:

```shell
LogPipe 0x5645a3b1c200 at /etc/syslog-ng/syslog-ng.conf:30:5
```
<!-- FIXME what is the hex code? -->

## Drop a message

The `drop` command (or `d`) is available in pipeline context. It discards the current message immediately and doesn't forward it to any downstream log paths. Use this to test what happens when a specific message is suppressed, without modifying the configuration file.

## Command reference {#commands}

| Command | Short form | Pipeline context required | Description |
|---|---|---|---|
| `help` | `h`, `?` | No | Show context-aware help. |
| `continue` | `c` | No | Resume processing until the next Ctrl+C. |
| `step` | `s` | No | Advance execution to the next log path and pause there. |
| `follow` | `f` | Yes | Follow this message through the entire pipeline, pausing at each log path it reaches. {{% param "product.abbrev" %}} ignores other messages. |
| `trace` | `t` | Yes | Follow this message and print a timestamped line for each log path it passes through. Doesn't pause. |
| `print [template]` | `p` | Yes | Without arguments: print all name-value pairs and tags. With a template argument: evaluate the template using the message and print the result. |
| `display [template]` | (none) | No | Without arguments: show the current display template. With a template argument: set the template used to show the message at each pipeline stop. Default: `$DATE $HOST $MSGHDR$MSG`. |
| `list [arg]` | `l` | No | Show configuration source around the current location. Arguments: `+` scroll down, `-` scroll up, `.` re-center at current log path, a line number to jump to that line. |
| `info pipe` | `i pipe` | Yes | Show the type and configuration-file location of the current log path. |
| `drop` | `d` | Yes | Drop the current message. {{% param "product.abbrev" %}} doesn't forward it to any downstream log paths. |
| `quit` | `q` | No | Exit {{% param "product.abbrev" %}}. |
