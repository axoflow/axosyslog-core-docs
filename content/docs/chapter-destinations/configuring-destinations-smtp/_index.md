---
title: "smtp: Generating SMTP messages (email) from logs"
weight:  5300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The destination is aimed at a fully controlled local, or near-local, trusted SMTP server. The goal is to send mail to trusted recipients, through a controlled channel. It hands mails over to an SMTP server, and that is all it does, therefore the resulting solution is as reliable as sending an email in general. For example, {{% param "product.abbrev" %}} does not verify whether the recipient exists.

The `smtp()` driver sends email messages triggered by log messages. The `smtp()` driver uses SMTP, without needing external applications. You can customize the main fields of the email, add extra headers, send the email to multiple recipients, and so on.

The `subject()`, `body()`, and `header()` fields may include macros which get expanded in the email. For more information on available macros see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" %}}.

The `smtp()` driver has the following required parameters: `host()`, `port()`, `from()`, `to()`, `subject()`, and `body()`. For the list of available optional parameters, see {{% xref "/docs/chapter-destinations/configuring-destinations-smtp/reference-destination-smtp/_index.md" %}}.

{{% alert title="Note" color="info" %}}

The `smtp()` destination driver is available only in {{% conditional-text include-if="ose" %}}{{% param "product.abbrev" %}} 3.4{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}5 F2{{% /conditional-text %}} and later.

{{% /alert %}}

## Declaration:

```c

    smtp(host() port() from() to() subject() body() options());

```


## Example: Using the smtp() driver {#example-destination-smtp}

The following example defines an `smtp()` destination using only the required parameters.

```c

    destination d_smtp {
        smtp(
            host("localhost")
            port(25)
            from("syslog-ng alert service" "noreply@example.com")
            to("Admin #1" "admin1@example.com")
            subject("[ALERT] Important log message of $LEVEL condition received from $HOST/$PROGRAM!")
            body("Hi!\nThe syslog-ng alerting service detected the following important log message:\n $MSG\n-- \nsyslog-ng\n")
        );
    };

```

The following example sets some optional parameters as well.

```c

    destination d_smtp {
        smtp(
            host("localhost")
            port(25)
            from("syslog-ng alert service" "noreply@example.com")
            to("Admin #1" "admin1@example.com")
            to("Admin #2" "admin2@example.com")
            cc("Admin BOSS" "admin.boss@example.com")
            bcc("Blind CC" "blindcc@example.com")
            subject("[ALERT] Important log message of $LEVEL condition received from $HOST/$PROGRAM!")
            body("Hi!\nThe syslog-ng alerting service detected the following important log message:\n $MSG\n-- \nsyslog-ng\n")
            header("X-Program", "$PROGRAM")
            );
    };

```



<span id="example-destination-smtp-alerting"></span>

## Example: Simple email alerting with the smtp() driver {#example-destination-smtp-alerting}

The following example sends an email alert if the eth0 network interface of the host is down.

```c

    filter f_linkdown {
        match("eth0: link down" value("MESSAGE"));
    };
    destination d_alert {
        smtp(
            host("localhost") port(25)
            from("syslog-ng alert service" "syslog@localhost")
            reply-to("Admins" "root@localhost")
            to("Ennekem" "me@localhost")
            subject("[SYSLOG ALERT]: eth0 link down")
            body("Syslog received an alert:\n$MSG")
            );
    };
    
    log {
        source(s_local);
        filter(f_linkdown);
        destination(d_alert);
    };

```

