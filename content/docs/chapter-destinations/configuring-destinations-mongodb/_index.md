---
title: "mongodb(): Storing messages in a MongoDB database"
weight:  3100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `mongodb()` driver sends messages to a [MongoDB](https://www.mongodb.com/) database. MongoDB is a schema-free, document-oriented database. For the list of available optional parameters, see {{% xref "/docs/chapter-destinations/configuring-destinations-mongodb/reference-destination-mongodb/_index.md" %}}.


## Declaration

```c

    mongodb(parameters);

```


The `mongodb()` driver does not support creating indexes, as that can be a very complex operation in MongoDB. If needed, the administrator of the MongoDB database must ensure that indexes are created on the collections.

The `mongodb()` driver does not add the `_id` field to the message: the MongoDB server will do that automatically, if none is present. If you want to override this field from {{% param "product.abbrev" %}}, use the **key()** parameter of the `value-pairs()` option.

The {{% param "product.abbrev" %}} `mongodb()` driver is compatible with MongoDB server version 1.4 and newer.

{{% include-headless "wnt/note-typehinting.md" %}}


## Example: Using the mongodb() driver {#example-destination-mongodb}

The following example creates a `mongodb()` destination using only default values.

```c

    destination d_mongodb {
        mongodb();
    };

```

The following example displays the default values.

```c

    destination d_mongodb {
        mongodb(
            uri("mongodb://localhost:27017/syslog")
            collection("messages")
            value-pairs(
                scope("selected-macros" "nv-pairs" "sdata")
            )
        );
    };

```

The following example shows the same setup using the deprecated libmongo-client syntax (as used in {{% param "product.abbrev" %}} version {{% conditional-text include-if="ose" %}}3.7{{% /conditional-text %}}), and is equivalent with the previous example.

```c

    destination d_mongodb {
        mongodb(
            servers("localhost:27017")
            database("syslog")
            collection("messages")
            value-pairs(
                scope("selected-macros" "nv-pairs" "sdata")
            )
        );
    };

```

