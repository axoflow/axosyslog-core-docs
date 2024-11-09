---
title: "Windows Event Log"
weight: 1100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

Available in {{< product >}} 4.9 and later.

The `parse_windows_eventlog_xml()` FilterX function parses Windows Event Logs XMLs. It's a specialized version of the [`parse_xml()` parser]({{< relref "/filterx/filterx-parsing/xml/_index.md" >}}) that:

- validates that the data matches the Windows Event Log schema, and
- automatically handles named `Data` elements.

For example, the following converts the input XML into a JSON object:

```shell
filterx {
  xml = "<xml-input/>"
  $MSG = json(parse_windows_eventlog_xml(xml));
};
```

Given the following input:

```xml
<Event xmlns='http://schemas.microsoft.com/win/2004/08/events/event'>
    <System>
        <Provider Name='EventCreate'/>
        <EventID Qualifiers='0'>999</EventID>
        <Version>0</Version>
        <Level>2</Level>
        <Task>0</Task>
        <Opcode>0</Opcode>
        <Keywords>0x80000000000000</Keywords>
        <TimeCreated SystemTime='2024-01-12T09:30:12.1566754Z'/>
        <EventRecordID>934</EventRecordID>
        <Correlation/>
        <Execution ProcessID='0' ThreadID='0'/>
        <Channel>Application</Channel>
        <Computer>DESKTOP-2MBFIV7</Computer>
        <Security UserID='S-1-5-21-3714454296-2738353472-899133108-1001'/>
    </System>
    <RenderingInfo Culture='en-US'>
        <Message>foobar</Message>
        <Level>Error</Level>
        <Task></Task>
        <Opcode>Info</Opcode>
        <Channel></Channel>
        <Provider></Provider>
        <Keywords>
            <Keyword>Classic</Keyword>
        </Keywords>
    </RenderingInfo>
    <EventData>
        <Data Name='param1'>foo</Data>
        <Data Name='param2'>bar</Data>
    </EventData>
</Event>
```

The parser creates the following JSON object:

```json
{
    "Event": {
        "@xmlns": "http://schemas.microsoft.com/win/2004/08/events/event",
        "System": {
            "Provider": {"@Name": "EventCreate"},
            "EventID": {"@Qualifiers": "0", "#text": "999"},
            "Version": "0",
            "Level": "2",
            "Task": "0",
            "Opcode": "0",
            "Keywords": "0x80000000000000",
            "TimeCreated": {"@SystemTime": "2024-01-12T09:30:12.1566754Z"},
            "EventRecordID": "934",
            "Correlation": "",
            "Execution": {"@ProcessID": "0", "@ThreadID": "0"},
            "Channel": "Application",
            "Computer": "DESKTOP-2MBFIV7",
            "Security": {"@UserID": "S-1-5-21-3714454296-2738353472-899133108-1001"},
        },
        "RenderingInfo": {
            "@Culture": "en-US",
            "Message": "foobar",
            "Level": "Error",
            "Task": "",
            "Opcode": "Info",
            "Channel": "",
            "Provider": "",
            "Keywords": {"Keyword": "Classic"},
        },
        "EventData": {
            "Data": {
                "param1": "foo",
                "param2": "bar",
            },
        },
    },
}
```
