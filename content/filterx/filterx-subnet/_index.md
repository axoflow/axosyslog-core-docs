---
title: "IP addresses and subnets"
linkTitle: "IP addresses and subnets"
weight:  3100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{< product >}} 4.25 and later.

FilterX has two types to work with network addresses:

- [`ip()`](#ip) represents a single IPv4 or IPv6 address, while
- [`subnet()`](#subnet) represents an IPv4 or IPv6 subnet in CIDR notation.

You can use these types together with the [list membership operator (`in`)]({{< relref "/filterx/operator-reference.md#list-membership-operator" >}}) to check whether an address belongs to a subnet, which is useful for filtering messages based on the source or destination network of the traffic they describe.

## ip {#ip}

The `ip()` type represents a single IPv4 or IPv6 address as a string. {{< product >}} returns an error if the argument cannot be parsed as a valid IP address.

For example:

```shell
filterx {
    addr4 = ip("192.168.2.10");
    addr6 = ip("2001:db8::1");
};
```

You can also pass a variable that contains the address as a string:

```shell
filterx {
    src = "192.168.2.10";
    addr = ip(src);
};
```

## subnet {#subnet}

The `subnet()` type represents an IPv4 or IPv6 subnet as a string in CIDR notation. {{< product >}} returns an error if the argument cannot be parsed as a valid subnet.

- For IPv4, you can use either prefix length notation (for example, `/24`) or a full netmask (for example, `/255.255.255.0`).
- For IPv6, only prefix length notation is accepted (for example, `/64`).

If the address part contains host bits, {{< product >}} masks them out so the resulting subnet always represents the network address. For example, `subnet("192.0.2.5/24")` is equivalent to `subnet("192.0.2.0/24")`.

For example:

```shell
filterx {
    net4 = subnet("192.0.2.0/24");
    net4_netmask = subnet("192.0.2.0/255.255.255.0");
    net6 = subnet("2001:db8::/32");
};
```

## Check whether an IP address is in a subnet {#in-subnet}

To check whether an IP address belongs to a subnet, use the [list membership operator (`in`)]({{< relref "/filterx/operator-reference.md#list-membership-operator" >}}). The left-hand side can be a string that contains an IP address, or an `ip()` object. The right-hand side must be a `subnet()` object.

The following example checks whether a string IP address is in an IPv4 subnet:

```shell
filterx {
    net = subnet("192.0.2.0/24");
    result = json();
    result.member = "192.0.2.100" in net;     # true
    result.non_member = "198.51.100.1" in net; # false
    ${MESSAGE} = result;
};
```

The same works for IPv6 subnets:

```shell
filterx {
    net = subnet("2001:db8::/32");
    result = json();
    result.member = "2001:db8::1" in net;     # true
    result.non_member = "2001:db9::1" in net; # false
    ${MESSAGE} = result;
};
```

You can also use an `ip()` object on the left-hand side, which is useful when the address is already stored as an `ip()` value:

```shell
filterx {
    net = subnet("192.0.2.0/24");
    addr = ip("192.0.2.100");
    addr in net; # true
};
```

{{< warning >}}The address family of the IP and the subnet must match. Comparing an IPv4 address to an IPv6 subnet (or the other way around) evaluates to false, so the surrounding statement is treated as falsy and the message is dropped from the log path. Wrap the check in a conditional if you want to keep processing the message in this case.{{< /warning >}}

## Filter messages based on the source network {#filter-source-network}

A typical use case is to filter or tag messages based on the network the message originated from. The following example tags messages that come from the `192.168.2.0/24` internal network:

```shell
filterx {
    internal_net = subnet("192.168.2.0/24");
    ${labels} = json();
    if (${SOURCEIP} in internal_net) {
        ${labels.network} = "internal";
    } else {
        ${labels.network} = "external";
    };
};
```

You can combine multiple subnets with logical operators to match a list of allowed networks:

```shell
filterx {
    office = subnet("192.0.2.0/24");
    datacenter = subnet("198.51.100.0/24");
    ${labels} = json();
    if (${SOURCEIP} in office or ${SOURCEIP} in datacenter) {
        ${labels.network} = "trusted";
    };
};
```
