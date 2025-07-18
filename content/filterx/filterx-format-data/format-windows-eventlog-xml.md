---
title: Windows Event Logs XML
---

Available in {{< product >}} 4.13 and later.

Formats a dictionary into Windows Event Logs XML. It's a specialized version of the [`format_xml()` function]({{< relref "/filterx/filterx-format-data/format-xml.md" >}}), all generic formatting tips apply to `format_windows_eventlog_xml()` as well.

Usage: `format_windows_eventlog_xml(input_dictionary)`

Example usage:

```json
$MESSAGE = format_windows_eventlog_xml({
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
        "EventData":
            {eventdata}
    }});"""
```

This JSON becomes the following XML:

```xml
<Event xmlns='http://schemas.microsoft.com/win/2004/08/events/event'><System><Provider Name='EventCreate'/><EventID Qualifiers='0'>999</EventID><Version>0</Version><Level>2</Level><Task>0</Task><Opcode>0</Opcode><Keywords>0x80000000000000</Keywords><TimeCreated SystemTime='2024-01-12T09:30:12.1566754Z'/><EventRecordID>934</EventRecordID><Correlation/><Execution ProcessID='0' ThreadID='0'/><Channel>Application</Channel><Computer>DESKTOP-2MBFIV7</Computer><Security UserID='S-1-5-21-3714454296-2738353472-899133108-1001'/></System><RenderingInfo Culture='en-US'><Message>foobar</Message><Level>Error</Level><Task/><Opcode>Info</Opcode><Channel/><Provider/><Keywords><Keyword>Classic</Keyword></Keywords></RenderingInfo><EventData><Data>foo</Data><Data>bar</Data></EventData></Event>
```
