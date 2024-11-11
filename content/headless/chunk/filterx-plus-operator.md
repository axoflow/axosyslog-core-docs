The plus operator (`+`) adds two arguments, if possible. (For example, you can't add two datetime values.)

- You can use it to add two numbers (two integers, two double values). If you add a double to an integer, the result is a double.
- Adding two strings concatenates the strings. Note that if you want to have spaces between the added elements, you have to add them manually, like in Python, for example:

    ```shell
    ${MESSAGE} = ${HOST} + " first part of the message," + " second part of the message" + "\n";
    ```

- Adding two lists merges the lists. Available in {{< product >}} 4.9 and later.
- Adding two dicts updates the dict with the values of the second operand. For example:

    ```shell
    x = {"element1", "element2", "element3"};
    y = {"element3", "element4", "element5"};
    ${MESSAGE} = x + y; # ${MESSAGE} value is {"element1", "element2", "element3", "element4", "element5"}
    ```

    Available in {{< product >}} 4.9 and later.
