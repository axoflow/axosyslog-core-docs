---
title: Troubleshooting
weight: 3200
---

To help troubleshooting FilterX blocks, {{< product >}} includes some specific functions that allow you to track failures in FilterX code:

- `failure_info_enable()`: Collect failure information from this point downwards through all branches of the pipeline. By default, only truthy expressions are collected. To collect collect falsy evaluations as well, use `failure_info_enable(collect_falsy=true);`
- `failure_info_clear()`: Clear all failure information collected so far.
- `failure_info_meta({})`: Attach metadata to the given section of FilterX code. The metadata remains in effect until the next call, or until the end of the enclosing FilterX block, whichever comes first. For example, you can use this function to mark where you are in a decision tree:

    ```sh
    failure_info_meta({"step": "#1 step-description"});
    ```

- `failure_info()`: Return the collected failure information as a FilterX dictionary. Call this function as late as possibly, for example, in the last log path of your {{< product >}} configuration, or within a fallback path. The output looks like:

    ```json
    [
      {
        "meta": {
          "step": "Setting common fields"
        },
        "location": "/etc/syslog-ng/syslog-ng.conf:33:7",
        "line": "nonexisting.key = 13;",
        "error": "No such variable: nonexisting"
      }
    ]
    ```

The following is an example configuration that uses these functions:

```sh
destination console_output {
  stdout(template("$a\n"));
};

source input {
  channel {
    source { stdin(); network(port(4444)); };

    filterx {
      # it can be enabled for a subset of messages
      failure_info_enable(collect_falsy=true);
    };
  };
};

log {
  source(input);

  log "log-path-1" {
    filterx {
      # "log-path-1" was successful, clear accumulated errors
      failure_info_clear();
    };
  };

  log "log-path-2" {
    filterx {

      # Step #1: abc
      failure_info_meta({"step": "#1 log-path-2"});
      a = 1;
      b = 3;
      1 == 1;
      true;

      # Step #2: cba
      failure_info_meta({"step": "#2 log-path-2"});
      declare g = 33;
      nonexisting.key = g;
    };
  };

  log "log-path-3" {
    filterx {
      failure_info_meta({"step": "falsystep"});
      1 == 0;
      true;
    };
  };
};

# WARNING: use the last logpath in the config file, or a real fallback path
log "fallback" {
  source(input);

  filterx {
    $a = failure_info();
  };

  destination(console_output);
};
```

If you start {{< product >}} with this configuration, the output will look like this (because it's trying to assign a value to a non-existing variable):

```json
[
    {
    "meta": {
        "step": "Setting common fields"
    },
    "location": "/etc/syslog-ng/syslog-ng.conf:33:7",
    "line": "nonexisting.key = 13;",
    "error": "No such variable: nonexisting"
    }
]
```
