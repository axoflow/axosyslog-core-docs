---
---
- `%a`: The day of week, using the locale's weekday names. Either the abbreviated or full name may be specified.
- `%A`: Same as %`a`.
- `%b`: The month, using the locale's month names. Either the abbreviated or full name may be specified.
- `%B`: The same as `%b`.
- `%c`: The date and time, using the locale's date and time format.
- `%C`: The century number [0,99]. Leading zeros are permitted but not required. This conversion should be used in conjunction with the %y conversion.
- `%d`: The day of month [1,31]. Leading zeros are permitted but not required.
- `%D`: The date as `%m/%d/%y`.
- `%e`: The same as `%d`.
- `%F`: The date as `%Y-%m-%d` (the ISO 8601 date format).
- `%g`: The year corresponding to the ISO week number, without the century. (A NetBSD extension.)
- `%G`: The year corresponding to the ISO week number, with the century. (A NetBSD extension.)
- `%h`: The same as `%b`.
- `%H`: The hour (24-hour clock) [0,23]. Leading zeros are permitted but not required.
- `%I`: The hour (12-hour clock) [1,12]. Leading zeros are permitted but not required.
- `%j`: The day number of the year [1,366]. Leading zeros are permitted but not required.
- `%k`: The same as `%H`.
- `%l`: The same as `%I`.
- `%m`: The month number [1,12]. Leading zeros are permitted but not required.
- `%M`: The minute [0,59]. Leading zeros are permitted but not required.
- `%n`: Any white-space, including none.
- `%p`: The locale's equivalent of a.m. or p.m.
- `%r`: The time (12-hour clock) with `%p`, using the locale's time format.
- `%R`: The time as `%H:%M`.
- `%S`: The seconds [0,60]. Leading zeros are permitted but not required.
- `%s`: The number of seconds since the Epoch, UTC (see mktime(3)). (A NetBSD extension.)
- `%f`: Fraction of the second (with or without a leading dot).
- `%t`: Any white-space, including none.
- `%T`: The time as `%H:%M:%S`.
- `%u`: The day of the week as a decimal number, where Monday = 1. (A NetBSD extension.)
- `%U`: The week number of the year (Sunday as the first day of the week) as a decimal number [0,53]. Leading zeros are permitted but not required.  All days in a year preceding the first Sunday are considered to be in week 0.
- `%V`: The ISO 8601:1988 week number as a decimal number.  If the week (starting on Monday) that contains January 1 has more than three days in the new year, then it is considered the first week of the year. If it has fewer than four days in the new year, then it is considered the last week of the previous year.  Weeks are numbered from 1 to 53. (A NetBSD extension.)
- `%w`: The weekday as a decimal number [0,6], with 0 representing Sunday. Leading zeros are permitted but not required.
- `%W`: The week number of the year (Monday as the first day of the week) as a decimal number [0,53]. Leading zeros are permitted but not required. All days in a year preceding the first Monday are considered to be in week 0.
- `%x`: The date, using the locale's date format.
- `%X`: The time, using the locale's time format.
- `%y`: The year within the 20th century [69,99] or the 21st century [0,68]. Leading zeros are permitted but not required. If specified in conjunction with `%C`, specifies the year [0,99] within that century.
- `%Y`: The year, including the century (i.e., 1996).
- `%Z`: Timezone in ascii format (for example, PST), or in format -/+0000, accepts `:` in the middle of timezones (ISO 8601)
- `%z`:  Timezone in ascii format (for example, PST), or in format -/+0000, accepts `:` in the middle of timezones (ISO 8601)  (Required element)
- `%%`: matches a literal `%`.  No argument is converted.

{{% alert title="Warning" color="warning" %}}

When using the `%z` and `%Z` format codes, consider that while `%z` strictly expects a specified timezone, and triggers a warning if the timezone is missing, `%Z` does not trigger a warning if the timezone is not specified.

For further information about the `%z` and `%Z` format codes, see the 'DESCRIPTION' section on the [srtptime(3) - NetBSD Manual Pages](https://man.netbsd.org/NetBSD-7.0/i386/strptime.3).

{{% /alert %}}

For example, for the date `01/Jan/2016:13:05:05 PST` use the following format string: `"%d/%b/%Y:%H:%M:%S %Z"`
