---
---
- Like the `awk` and other similar tools, {{< product >}} always returns the broadest match as the `0` capturing group. If you don't need it, you must explicitly unset it, for example:

    ```shell
    $MY-LIST = json();
    $MY-LIST = regexp_search("first-word second-part third", /(first-word)(second-part)(third)/);
    # $MY-LIST contains: ["first-word second-part third", "first-word", "second-part", "third"]
    unset($MY-LIST[0]);
    # $MY-LIST contains: ["first-word", "second-part", "third"]
    ```
