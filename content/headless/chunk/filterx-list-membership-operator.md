---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{< product >}} 4.12 and later.

You can check whether a value is in a list using the `in` and `not in` membership operators. For example:

```sh
my_array = json_array(['hostname_one', 'hostname_two', 'hostname_three']);
if (${HOST} in my_array) {
    # ...
}
```

The `in` operator can be used to replicate the functionality of the {{% xref "/chapter-routing-filters/filters/reference-filters/filter-inlist/_index.md" %}} filter function in FilterX. If you want to populate the list from a file, use the [cache_json_file()]({{< relref "/filterx/function-reference.md#cache-json-file" >}}) FilterX function.
